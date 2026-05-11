use wasm_bindgen::prelude::*;

use std::collections::BTreeSet;

use rsigma_eval::compiler::{CompiledDetection, CompiledDetectionItem};
use rsigma_eval::event::JsonEvent;
use rsigma_eval::pipeline::{merge_pipelines, parse_pipeline};
use rsigma_eval::Engine;
use rsigma_parser::parse_sigma_yaml;
use serde::Serialize;

/// Initialise panic hook so Rust panics show up in the browser console.
#[wasm_bindgen(start)]
pub fn init() {
    console_error_panic_hook::set_once();
}

/// Result of evaluating a Sigma rule against a set of JSON events.
#[derive(Serialize)]
struct EvalResult {
    /// Events that matched, with match metadata attached.
    matches: Vec<MatchedEvent>,
    /// Summary statistics.
    stats: Stats,
    /// Field coverage analysis.
    field_analysis: FieldAnalysis,
    /// Non-empty when the rule or data could not be processed.
    error: Option<String>,
}

#[derive(Serialize)]
struct FieldAnalysis {
    /// Fields referenced in the Sigma rule's detection section (post-pipeline).
    rule_fields: Vec<String>,
    /// Fields present in the dataset (union of all event keys).
    data_fields: Vec<String>,
    /// Rule fields that are NOT present in any event in the dataset.
    missing_fields: Vec<String>,
}

#[derive(Serialize)]
struct MatchedEvent {
    /// The original event object.
    event: serde_json::Value,
    /// Index of this event in the input array.
    index: usize,
    /// Which rule(s) matched this event.
    matched_rules: Vec<RuleMatch>,
}

#[derive(Serialize)]
struct RuleMatch {
    rule_title: String,
    rule_id: Option<String>,
    level: Option<String>,
    tags: Vec<String>,
    matched_selections: Vec<String>,
    matched_fields: Vec<FieldMatchInfo>,
}

#[derive(Serialize)]
struct FieldMatchInfo {
    field: String,
    value: serde_json::Value,
}

#[derive(Serialize)]
struct Stats {
    total_records: usize,
    total_matches: usize,
}

/// Evaluate one or more Sigma rules (YAML, possibly multi-doc) against a JSON
/// string that is either a single object or an array of objects.
///
/// `pipeline_yamls` is a JSON array of pipeline YAML strings. Pass `"[]"` or
/// an empty string if no pipelines are needed.
///
/// `filter_yamls` is a JSON array of Sigma filter rule YAML strings. Pass
/// `"[]"` or an empty string if no external filters are needed.
///
/// Returns a JSON string with the shape of `EvalResult`.
#[wasm_bindgen]
pub fn evaluate(
    rule_yaml: &str,
    events_json: &str,
    pipeline_yamls: &str,
    filter_yamls: &str,
) -> String {
    let result = evaluate_inner(rule_yaml, events_json, pipeline_yamls, filter_yamls);
    serde_json::to_string(&result).unwrap_or_else(|e| {
        format!(r#"{{"matches":[],"stats":{{"total_records":0,"total_matches":0}},"error":"serialization error: {}"}}"#, e)
    })
}

fn error_result(msg: String) -> EvalResult {
    EvalResult {
        matches: vec![],
        stats: Stats { total_records: 0, total_matches: 0 },
        field_analysis: FieldAnalysis {
            rule_fields: vec![],
            data_fields: vec![],
            missing_fields: vec![],
        },
        error: Some(msg),
    }
}

/// Extract all field names from the compiled detections in the engine.
fn collect_rule_fields(engine: &Engine) -> BTreeSet<String> {
    let mut fields = BTreeSet::new();
    for rule in engine.rules() {
        for detection in rule.detections.values() {
            collect_detection_fields(detection, &mut fields);
        }
    }
    fields
}

fn collect_detection_fields(detection: &CompiledDetection, fields: &mut BTreeSet<String>) {
    match detection {
        CompiledDetection::AllOf(items) => {
            for item in items {
                collect_item_field(item, fields);
            }
        }
        CompiledDetection::AnyOf(dets) => {
            for d in dets {
                collect_detection_fields(d, fields);
            }
        }
        CompiledDetection::Keywords(_) => {} // keyword detections have no specific field
    }
}

fn collect_item_field(item: &CompiledDetectionItem, fields: &mut BTreeSet<String>) {
    if let Some(ref field) = item.field {
        fields.insert(field.clone());
    }
}

/// Collect all unique keys from a set of JSON events.
fn collect_event_fields(events: &[serde_json::Value]) -> BTreeSet<String> {
    let mut fields = BTreeSet::new();
    for event in events {
        if let serde_json::Value::Object(map) = event {
            for key in map.keys() {
                fields.insert(key.clone());
            }
        }
    }
    fields
}

fn evaluate_inner(rule_yaml: &str, events_json: &str, pipeline_yamls: &str, filter_yamls: &str) -> EvalResult {
    // 1. Parse processing pipelines.
    let mut pipelines = Vec::new();
    if !pipeline_yamls.is_empty() {
        let yamls: Vec<String> = match serde_json::from_str(pipeline_yamls) {
            Ok(v) => v,
            Err(e) => return error_result(format!("Failed to parse pipeline_yamls JSON array: {e}")),
        };
        for (i, yaml) in yamls.iter().enumerate() {
            if yaml.trim().is_empty() {
                continue;
            }
            match parse_pipeline(yaml) {
                Ok(p) => pipelines.push(p),
                Err(e) => return error_result(format!("Failed to parse pipeline {}: {e}", i + 1)),
            }
        }
        merge_pipelines(&mut pipelines);
    }

    // 2. Parse the Sigma rule(s).
    let collection = match parse_sigma_yaml(rule_yaml) {
        Ok(c) => c,
        Err(e) => return error_result(format!("Failed to parse Sigma rule: {e}")),
    };

    // 3. Apply pipelines and compile into the engine.
    let mut engine = Engine::new();

    if pipelines.is_empty() {
        if let Err(e) = engine.add_collection(&collection) {
            return error_result(format!("Failed to compile Sigma rule: {e}"));
        }
    } else {
        if let Err(e) = engine.add_collection_with_pipelines(&collection, &pipelines) {
            return error_result(format!("Failed to compile Sigma rule with pipelines: {e}"));
        }
    }

    // 4. Parse and apply external filter rules.
    if !filter_yamls.is_empty() {
        let yamls: Vec<String> = match serde_json::from_str(filter_yamls) {
            Ok(v) => v,
            Err(e) => return error_result(format!("Failed to parse filter_yamls JSON array: {e}")),
        };
        for (i, yaml) in yamls.iter().enumerate() {
            if yaml.trim().is_empty() {
                continue;
            }
            // Parse the filter YAML — it may contain filter rules among other doc types.
            let filter_collection = match parse_sigma_yaml(yaml) {
                Ok(c) => c,
                Err(e) => return error_result(format!("Failed to parse filter {}: {e}", i + 1)),
            };
            for filter in &filter_collection.filters {
                if let Err(e) = engine.apply_filter(filter) {
                    return error_result(format!(
                        "Failed to apply filter '{}': {e}",
                        filter.title
                    ));
                }
            }
        }
    }

    // 5. Parse the events JSON (accept a single object, an array, or NDJSON).
    let events: Vec<serde_json::Value> = match serde_json::from_str::<serde_json::Value>(events_json) {
        Ok(serde_json::Value::Array(arr)) => arr,
        Ok(obj @ serde_json::Value::Object(_)) => vec![obj],
        Ok(_) => return error_result("Events JSON must be an object or an array of objects".into()),
        Err(e) => {
            // Try NDJSON: split by newlines and parse each line.
            let mut parsed = Vec::new();
            for line in events_json.lines() {
                let trimmed = line.trim();
                if trimmed.is_empty() {
                    continue;
                }
                match serde_json::from_str::<serde_json::Value>(trimmed) {
                    Ok(v) => parsed.push(v),
                    Err(_) => return error_result(format!("Failed to parse events JSON: {e}")),
                }
            }
            parsed
        }
    };

    // 5. Compute field analysis.
    let rule_fields = collect_rule_fields(&engine);
    let data_fields = collect_event_fields(&events);
    let missing_fields: Vec<String> = rule_fields.difference(&data_fields).cloned().collect();
    let field_analysis = FieldAnalysis {
        rule_fields: rule_fields.into_iter().collect(),
        data_fields: data_fields.into_iter().collect(),
        missing_fields,
    };

    let total_records = events.len();
    let mut matched_events: Vec<MatchedEvent> = Vec::new();

    // 6. Evaluate each event.
    for (idx, event_val) in events.iter().enumerate() {
        let json_event = JsonEvent::borrow(event_val);
        let rule_matches = engine.evaluate(&json_event);

        if !rule_matches.is_empty() {
            let matched_rules: Vec<RuleMatch> = rule_matches
                .iter()
                .map(|m| RuleMatch {
                    rule_title: m.rule_title.clone(),
                    rule_id: m.rule_id.clone(),
                    level: m.level.as_ref().map(|l| format!("{l:?}").to_lowercase()),
                    tags: m.tags.clone(),
                    matched_selections: m.matched_selections.clone(),
                    matched_fields: m
                        .matched_fields
                        .iter()
                        .map(|f| FieldMatchInfo {
                            field: f.field.clone(),
                            value: f.value.clone(),
                        })
                        .collect(),
                })
                .collect();

            matched_events.push(MatchedEvent {
                event: event_val.clone(),
                index: idx,
                matched_rules,
            });
        }
    }

    let total_matches = matched_events.len();

    EvalResult {
        matches: matched_events,
        stats: Stats { total_records, total_matches },
        field_analysis,
        error: None,
    }
}
