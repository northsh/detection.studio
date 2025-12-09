import json
import pathlib
import textwrap
from typing import Sequence, List, Dict, Any, Union, Optional
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
from sigma.plugins import InstalledSigmaPlugins
from sigma.processing.pipeline import ProcessingPipeline
from sigma.rule import SigmaRule
import yaml

plugins = InstalledSigmaPlugins.autodiscover()
backends = plugins.backends
pipelines = plugins.pipelines

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
            
            if pipeline_names:
                # If both pipeline_ymls and pipeline_names are provided,
                # log a warning that we're only using the YAML content
                print(f"Warning: Both pipeline_ymls and pipeline_names provided. Using pipelines from YAML content.")
        except Exception as e:
            raise SigmaError(f"Error processing custom pipeline: {str(e)}")
    elif pipeline_names:
        # If only pipeline_names are provided but no YAML content, 
        # this is an error since we don't use pipeline_resolver anymore
        raise SigmaError("Pipeline names provided without YAML content. Please provide pipeline_ymls content.")
    
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