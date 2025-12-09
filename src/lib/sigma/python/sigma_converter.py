import json
import pathlib
import textwrap
from typing import Sequence, List, Dict, Any, Union, Optional
import sys
import yaml

# Pyodide compatibility: PyYAML in Pyodide doesn't have CSafeLoader
# Add it as an alias to SafeLoader if it doesn't exist
if not hasattr(yaml, 'CSafeLoader'):
    yaml.CSafeLoader = yaml.SafeLoader
if not hasattr(yaml, 'CDumper'):
    yaml.CDumper = yaml.Dumper

from sigma.collection import SigmaCollection
from sigma.conversion.base import Backend
from sigma.exceptions import (
    SigmaError,
    SigmaPipelineNotAllowedForBackendError,
    SigmaPipelineNotFoundError,
)
from sigma.processing.pipeline import ProcessingPipeline
from sigma.rule import SigmaRule

# Pyodide compatibility: Mock MITRE ATT&CK data loading BEFORE importing plugins
# The elasticsearch backend tries to load MITRE ATT&CK data using urllib which doesn't work in Pyodide
import sigma.data.mitre_attack
# Monkey-patch the _load_mitre_attack_data function to return mock data
def _mock_load_mitre_attack_data():
    return {
        'techniques': {},
        'tactics': {},
        'groups': {},
        'software': {}
    }
sigma.data.mitre_attack._load_mitre_attack_data = _mock_load_mitre_attack_data
sigma.data.mitre_attack._cached_data = None  # Reset cache so it uses our mock function

# Also create the module-level attributes that backends try to import
sigma.data.mitre_attack.mitre_attack_tactics = {}
sigma.data.mitre_attack.mitre_attack_techniques = {}
sigma.data.mitre_attack.mitre_attack_groups = {}
sigma.data.mitre_attack.mitre_attack_software = {}

from sigma.plugins import InstalledSigmaPlugins
from sigma.processing.resolver import ProcessingPipelineResolver

# Discover plugins at module level (like sigma-cli does)
plugins = InstalledSigmaPlugins.autodiscover()
backends = plugins.backends

def get_available_pipelines():
    """
    Get a list of all available pipeline names.
    Since plugins aren't discovered until backends are installed, we return
    a list of commonly available pipeline names from sigma backends.
    """
    try:
        # Return commonly available pipeline names from sigma backend packages
        # These are the standard pipelines that ship with various sigma backends
        return [
            # ECS/Elasticsearch pipelines
            'ecs_windows',
            'ecs_windows_old',
            'ecs_zeek_beats',
            'ecs_zeek_corelight',
            'ecs_kubernetes',
            'elasticsearch_windows',
            'elasticsearch_windows_sysmon',

            # Splunk pipelines
            'splunk_windows',
            'splunk_windows_sysmon_acceleration',
            'splunk_cim_dm',

            # Microsoft Sentinel / Azure
            'azure_monitor',
            'azure_monitor_windows',
            'microsoft_365_defender',
            'microsoft_xdr',

            # Loki
            'loki_grafana_logfmt',
            'loki_promtail_sysmon',

            # QRadar
            'qradar_fields',
            'qradar_payload',

            # CrowdStrike
            'crowdstrike_fdr',

            # Carbon Black
            'carbonblack',

            # SentinelOne
            'sentinelone',

            # Datadog
            'datadog',
        ]
    except Exception as e:
        import sys
        import traceback
        print(f"Error getting pipelines: {e}", file=sys.stderr)
        traceback.print_exc(file=sys.stderr)
        return []

def convert_rule(
    rule_yaml: str, 
    target: str, 
    pipeline_names: List[str] = None,
    pipeline_ymls: List[str] = None,
    filter_yml: str = None,
    format: str = "default",
    correlation_method: Optional[str] = None,
    backend_options: Dict[str, Any] = None,
    skip_unsupported: bool = False
) -> Union[str, List[str], List[Dict], Dict, bytes]:
    """
    Convert a Sigma rule to the target format with optional pipeline processing.
    
    Args:
        rule_yaml: YAML string containing the Sigma rule
        target: Target backend identifier
        pipeline_names: Optional list of pipeline names to use (these must be provided as YAML)
        pipeline_ymls: Optional list of YAML strings containing custom pipeline definitions
        filter_yml: Optional YAML containing filter definitions
        format: Output format for the backend
        correlation_method: Optional correlation method
        backend_options: Optional backend-specific options
        skip_unsupported: Skip rules that can't be handled by the backend

    Returns:
        The converted rule in the format specified by the backend
    """

    # Apply filter if provided
    if filter_yml:
        try:
            # Merge filter with rule
            filter_collection = SigmaCollection.from_yaml(filter_yml)
            # For now, we just append the rules - in a real implementation,
            # you would apply proper filtering logic
            rule_yaml = filter_yml + "\n---\n" + rule_yaml
            rule_collection = SigmaCollection.from_yaml(rule_yaml)
        except Exception as e:
            raise SigmaError(f"Filter processing error: {str(e)}")
    else:
        # Parse the rule
        rule_collection = SigmaCollection.from_yaml(rule_yaml)
    
    # Initialize processing pipeline if specified
    processing_pipeline = None

    # First, load built-in pipelines by name if provided
    if pipeline_names and len(pipeline_names) > 0:
        try:
            # Ensure pipeline_names is a list
            if isinstance(pipeline_names, str):
                pipeline_names = [pipeline_names]

            # Create the resolver inside the function to avoid serialization issues
            pipeline_resolver = ProcessingPipelineResolver(plugins.pipelines)

            # The resolve() method expects a list of pipeline specs and returns a resolved pipeline
            # Pass the entire list at once instead of iterating
            processing_pipeline = pipeline_resolver.resolve(pipeline_names)
        except Exception as e:
            raise SigmaError(f"Error loading built-in pipelines {pipeline_names}: {str(e)}")

    # Then, add custom pipelines from YAML if provided
    if pipeline_ymls and len(pipeline_ymls) > 0:
        try:
            # Process each pipeline YAML separately and chain them
            for i, pipeline_yml in enumerate(pipeline_ymls):
                if pipeline_yml:
                    # Load custom pipeline definitions directly from YAML
                    custom_pipeline = ProcessingPipeline.from_yaml(pipeline_yml)

                    if processing_pipeline is None:
                        processing_pipeline = custom_pipeline
                    else:
                        # Chain the pipelines
                        processing_pipeline = processing_pipeline + custom_pipeline
        except Exception as e:
            raise SigmaError(f"Error processing custom pipeline: {str(e)}")
    
    # Initialize backend
    backend_class = backends[target]
    backend_options = backend_options or {}
    
    try:
        backend: Backend = backend_class(
            processing_pipeline=processing_pipeline,
            collect_errors=skip_unsupported,
            **backend_options,
        )
    except TypeError as e:
        param = str(e).split("'")[1]
        raise SigmaError(f"Parameter '{param}' is not supported by backend '{target}'.")
    
    # Check if format is valid
    if format not in backend_class.formats.keys():
        raise SigmaError(f"Output format '{format}' is not supported by backend '{target}'.")
    
    # Check if correlation method is valid
    if correlation_method is not None:
        correlation_methods = backend.correlation_methods
        if correlation_methods is None:
            raise SigmaError(f"Backend '{target}' does not support correlations.")
        elif correlation_method not in correlation_methods.keys():
            raise SigmaError(f"Correlation method '{correlation_method}' is not supported by backend '{target}'.")
    
    # Convert rule
    result = backend.convert(rule_collection, format, correlation_method)
    
    # Process errors
    if backend.errors and not skip_unsupported:
        error_list = []
        for rule, error in backend.errors:
            error_list.append(f"{str(rule.source)}: {str(error)}")
        if error_list:
            raise SigmaError("\n".join(error_list))
    
    # Format result
    if isinstance(result, str):
        return result
    elif isinstance(result, list) and all(isinstance(item, str) for item in result):
        return "\n\n".join(result)
    elif isinstance(result, (list, dict, bytes)):
        return result
    else:
        return str(result)