"""Sigma rule conversion entry points executed inside Pyodide.

This is the single source of truth for the Python that runs in the engine.
`sigmaConverter.ts` is generated from this file by `scripts/generate-python.mjs`
(run automatically before build) — do not edit the generated file by hand.
"""

from typing import List, Dict, Any, Union, Optional

import yaml

from sigma.collection import SigmaCollection
from sigma.conversion.base import Backend
from sigma.exceptions import SigmaError
from sigma.processing.pipeline import ProcessingPipeline

# Pyodide compatibility: mock MITRE ATT&CK data loading BEFORE importing plugins.
# Some backends load MITRE ATT&CK data via urllib, which doesn't work in Pyodide.
import sigma.data.mitre_attack


def _mock_load_mitre_attack_data():
    return {"techniques": {}, "tactics": {}, "groups": {}, "software": {}}


sigma.data.mitre_attack._load_mitre_attack_data = _mock_load_mitre_attack_data
sigma.data.mitre_attack._cached_data = None  # reset cache so the mock is used
# Module-level attributes some backends import directly.
sigma.data.mitre_attack.mitre_attack_tactics = {}
sigma.data.mitre_attack.mitre_attack_techniques = {}
sigma.data.mitre_attack.mitre_attack_groups = {}
sigma.data.mitre_attack.mitre_attack_software = {}

from sigma.plugins import InstalledSigmaPlugins
from sigma.processing.resolver import ProcessingPipelineResolver

# Discover plugins at module level (like sigma-cli does).
plugins = InstalledSigmaPlugins.autodiscover()
backends = plugins.backends


def get_available_pipelines(backend: str = ""):
    """Return available pipeline names, optionally filtered by backend."""
    try:
        available_pipelines = ProcessingPipelineResolver(
            InstalledSigmaPlugins.autodiscover().pipelines
        ).list_pipelines()

        if not backend:
            return [name for name, _ in available_pipelines]

        # Each entry is (name, pipeline); pipeline.allowed_backends is a frozenset.
        return [
            name
            for name, pipeline in available_pipelines
            if not pipeline.allowed_backends or backend in pipeline.allowed_backends
        ]
    except Exception as e:
        import sys
        import traceback

        print(f"Error getting pipelines: {e}")
        traceback.print_exc(file=sys.stderr)
        return []


def convert_rule(
    rule_yaml: str,
    target: str,
    pipeline_names: Optional[List[str]] = None,
    pipeline_ymls: Optional[List[str]] = None,
    filter_yml: Optional[str] = None,
    format: str = "default",
    correlation_method: Optional[str] = None,
    backend_options: Optional[Dict[str, Any]] = None,
    skip_unsupported: bool = False,
) -> Union[str, List[str], List[Dict], Dict, bytes]:
    """Convert a Sigma rule to the target format with optional pipelines.

    Args:
        rule_yaml: YAML string containing the Sigma rule.
        target: Target backend identifier.
        pipeline_names: Built-in pipeline names to resolve from plugins.
        pipeline_ymls: Custom pipeline definitions as YAML strings.
        filter_yml: Optional Sigma filter definition as YAML.
        format: Backend output format.
        correlation_method: Optional correlation method.
        backend_options: Optional backend-specific options.
        skip_unsupported: Collect (rather than raise) unsupported-rule errors.

    Returns:
        The converted rule in the backend's output format.
    """
    # Parse the rule (optionally prepending a filter document).
    if filter_yml:
        try:
            rule_yaml = filter_yml + "\n---\n" + rule_yaml
            rule_collection = SigmaCollection.from_yaml(rule_yaml)
        except Exception as e:
            raise SigmaError(f"Filter processing error: {str(e)}")
    else:
        rule_collection = SigmaCollection.from_yaml(rule_yaml)

    processing_pipeline = None

    # Resolve built-in pipelines by name.
    if pipeline_names:
        try:
            if isinstance(pipeline_names, str):
                pipeline_names = [pipeline_names]
            processing_pipeline = ProcessingPipelineResolver(plugins.pipelines).resolve(
                pipeline_names
            )
        except Exception as e:
            raise SigmaError(
                f"Error loading built-in pipelines {pipeline_names}: {str(e)}"
            )

    # Chain any custom YAML pipelines.
    if pipeline_ymls:
        try:
            for pipeline_yml in pipeline_ymls:
                if not pipeline_yml:
                    continue
                custom_pipeline = ProcessingPipeline.from_yaml(pipeline_yml)
                if processing_pipeline is None:
                    processing_pipeline = custom_pipeline
                else:
                    processing_pipeline = processing_pipeline + custom_pipeline
        except Exception as e:
            raise SigmaError(f"Error processing custom pipeline: {str(e)}")

    # Resolve and instantiate the backend.
    try:
        backend_class = backends[target]
    except KeyError:
        raise SigmaError(f"Backend '{target}' is not installed or does not exist.")

    try:
        backend: Backend = backend_class(
            processing_pipeline=processing_pipeline,
            collect_errors=skip_unsupported,
            **(backend_options or {}),
        )
    except TypeError as e:
        param = str(e).split("'")[1]
        raise SigmaError(f"Parameter '{param}' is not supported by backend '{target}'.")

    # Validate format and correlation method.
    if format not in backend_class.formats.keys():
        raise SigmaError(f"Output format '{format}' is not supported by backend '{target}'.")

    if correlation_method is not None:
        correlation_methods = backend.correlation_methods
        if correlation_methods is None:
            raise SigmaError(f"Backend '{target}' does not support correlations.")
        if correlation_method not in correlation_methods.keys():
            raise SigmaError(
                f"Correlation method '{correlation_method}' is not supported by backend '{target}'."
            )

    # Convert.
    result = backend.convert(rule_collection, format, correlation_method)

    # Surface collected errors unless explicitly skipping unsupported rules.
    if backend.errors and not skip_unsupported:
        error_list = [f"{str(rule.source)}: {str(error)}" for rule, error in backend.errors]
        if error_list:
            raise SigmaError("\n".join(error_list))

    # Normalise the result to a string (or pass through structured output).
    if isinstance(result, str):
        return result
    if isinstance(result, list) and all(isinstance(item, str) for item in result):
        return "\n\n".join(result)
    if isinstance(result, (list, dict, bytes)):
        return result
    return str(result)
