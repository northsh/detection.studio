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

    // 5. Parse the events text (auto-detect: JSON object, JSON array, NDJSON, or CSV).
    let events: Vec<serde_json::Value> = match parse_events(events_json) {
        Ok(v) => v,
        Err(e) => return error_result(e),
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

/// Parse the user-supplied events text into a vector of JSON values.
///
/// Auto-detects the format by inspecting the first non-empty line:
/// - If it looks like JSON (starts with `{` or `[`) AND does not contain an
///   unquoted comma at the top level, try JSON / NDJSON first.
/// - Otherwise (including a `"`-quoted CSV header row) try CSV first.
/// - In both cases, fall back to the other format if the first attempt
///   fails — so any valid input has two chances to parse.
///
/// Returns `Err(message)` if the input is empty or cannot be parsed in any
/// supported format. The error from whichever format was attempted *first*
/// is preferred, since it tends to be the more relevant diagnostic.
fn parse_events(text: &str) -> Result<Vec<serde_json::Value>, String> {
    let leading = text.trim_start();
    if leading.is_empty() {
        return Err("Events input is empty".to_string());
    }

    let first = leading.as_bytes()[0];
    let prefer_json = first == b'{' || first == b'[';

    if prefer_json {
        match parse_json_or_ndjson(text) {
            Ok(v) => Ok(v),
            Err(json_err) => parse_csv(text).map_err(|_| json_err),
        }
    } else {
        match parse_csv(text) {
            Ok(v) => Ok(v),
            Err(csv_err) => parse_json_or_ndjson(text).map_err(|_| csv_err),
        }
    }
}

/// Parse text as a single JSON value (object or array of objects), falling
/// back to NDJSON (one JSON value per non-empty line) if the whole-buffer
/// parse fails.
fn parse_json_or_ndjson(text: &str) -> Result<Vec<serde_json::Value>, String> {
    match serde_json::from_str::<serde_json::Value>(text) {
        Ok(serde_json::Value::Array(arr)) => Ok(arr),
        Ok(obj @ serde_json::Value::Object(_)) => Ok(vec![obj]),
        Ok(_) => Err("Events JSON must be an object or an array of objects".to_string()),
        Err(e) => {
            // NDJSON fallback.
            let mut parsed = Vec::new();
            for line in text.lines() {
                let trimmed = line.trim();
                if trimmed.is_empty() {
                    continue;
                }
                match serde_json::from_str::<serde_json::Value>(trimmed) {
                    Ok(v) => parsed.push(v),
                    Err(_) => return Err(format!("Failed to parse events JSON: {e}")),
                }
            }
            if parsed.is_empty() {
                return Err(format!("Failed to parse events JSON: {e}"));
            }
            Ok(parsed)
        }
    }
}

/// Parse text as CSV. The first row is treated as the header row. Each
/// subsequent row is converted into a JSON object whose keys are header names
/// and whose values are coerced from the raw cell text via `coerce_csv_value`.
fn parse_csv(text: &str) -> Result<Vec<serde_json::Value>, String> {
    let mut reader = csv::ReaderBuilder::new()
        .has_headers(true)
        .flexible(true) // tolerate rows with fewer/more fields than the header
        .trim(csv::Trim::None)
        .from_reader(text.as_bytes());

    let headers: Vec<String> = match reader.headers() {
        Ok(h) => h.iter().map(|s| s.to_string()).collect(),
        Err(e) => return Err(format!("Failed to parse CSV headers: {e}")),
    };

    if headers.is_empty() {
        return Err("CSV input has no header row".to_string());
    }

    let mut events = Vec::new();
    for (i, record) in reader.records().enumerate() {
        let record = match record {
            Ok(r) => r,
            Err(e) => return Err(format!("Failed to parse CSV row {}: {e}", i + 1)),
        };
        let mut map = serde_json::Map::with_capacity(headers.len());
        for (idx, header) in headers.iter().enumerate() {
            let raw = record.get(idx).unwrap_or("");
            map.insert(header.clone(), coerce_csv_value(raw));
        }
        events.push(serde_json::Value::Object(map));
    }

    if events.is_empty() {
        return Err("CSV input contains a header row but no data rows".to_string());
    }

    Ok(events)
}

/// Best-effort type coercion for a CSV cell. Tries (in order): empty-string
/// -> JSON null, `true`/`false` (case-insensitive) -> JSON bool, integer ->
/// JSON number, float -> JSON number, otherwise the original string.
fn coerce_csv_value(raw: &str) -> serde_json::Value {
    if raw.is_empty() {
        return serde_json::Value::Null;
    }

    // Bool (case-insensitive). Only match the canonical literals so we don't
    // accidentally promote field values like "True positive" to a boolean.
    if raw.eq_ignore_ascii_case("true") {
        return serde_json::Value::Bool(true);
    }
    if raw.eq_ignore_ascii_case("false") {
        return serde_json::Value::Bool(false);
    }

    // Integers (incl. negative). Reject leading-zero ints like "007" so we
    // preserve identifiers / zero-padded codes as strings.
    if let Ok(n) = raw.parse::<i64>() {
        let leading_zero = raw.starts_with('0') && raw.len() > 1;
        let neg_leading_zero = raw.starts_with("-0") && raw.len() > 2;
        if !leading_zero && !neg_leading_zero {
            return serde_json::Value::Number(n.into());
        }
    }

    // Floats. Reject leading-zero ints disguised as floats (e.g. "0078") so
    // we don't lose zero-padded identifiers. A genuine decimal like "0.75"
    // is fine because the integer portion is exactly "0".
    if !has_disqualifying_leading_zero(raw)
        && let Ok(f) = raw.parse::<f64>()
        && f.is_finite()
        && let Some(num) = serde_json::Number::from_f64(f)
    {
        return serde_json::Value::Number(num);
    }

    serde_json::Value::String(raw.to_string())
}

/// True if the integer portion of `raw` has a disqualifying leading zero —
/// i.e. starts with `0` (or `-0`) and has more than one digit before any
/// decimal point. `"0"`, `"-0"`, `"0.75"`, `"-0.5"` are all fine; `"0078"`,
/// `"00"`, `"-00"`, `"0078.5"` are not.
fn has_disqualifying_leading_zero(raw: &str) -> bool {
    let s = raw.strip_prefix('-').unwrap_or(raw);
    let int_part = s.split_once('.').map_or(s, |(i, _)| i);
    int_part.starts_with('0') && int_part.len() > 1
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    // ---------------- JSON / NDJSON ----------------

    #[test]
    fn parses_single_json_object() {
        let events = parse_events(r#"{"EventID": 1, "Image": "cmd.exe"}"#).unwrap();
        assert_eq!(events.len(), 1);
        assert_eq!(events[0], json!({"EventID": 1, "Image": "cmd.exe"}));
    }

    #[test]
    fn parses_json_array() {
        let events = parse_events(r#"[{"EventID": 1}, {"EventID": 2}]"#).unwrap();
        assert_eq!(events.len(), 2);
        assert_eq!(events[1]["EventID"], json!(2));
    }

    #[test]
    fn parses_pretty_printed_json_array() {
        let input = r#"[
            {"EventID": 1, "Image": "a.exe"},
            {"EventID": 2, "Image": "b.exe"}
        ]"#;
        let events = parse_events(input).unwrap();
        assert_eq!(events.len(), 2);
        assert_eq!(events[0]["Image"], json!("a.exe"));
    }

    #[test]
    fn parses_ndjson() {
        let input = "{\"EventID\": 1}\n{\"EventID\": 2}\n{\"EventID\": 3}\n";
        let events = parse_events(input).unwrap();
        assert_eq!(events.len(), 3);
        assert_eq!(events[2]["EventID"], json!(3));
    }

    #[test]
    fn parses_ndjson_with_blank_lines() {
        let input = "\n{\"EventID\": 1}\n\n{\"EventID\": 2}\n\n";
        let events = parse_events(input).unwrap();
        assert_eq!(events.len(), 2);
    }

    #[test]
    fn rejects_empty_input() {
        let err = parse_events("").unwrap_err();
        assert!(err.contains("empty"));
    }

    #[test]
    fn rejects_whitespace_only_input() {
        let err = parse_events("   \n\t  \n").unwrap_err();
        assert!(err.contains("empty"));
    }

    #[test]
    fn rejects_top_level_json_string() {
        // A bare quoted string doesn't start with `{` or `[`, so it falls
        // through to the CSV path. csv treats the first row as a header, so
        // there are no data rows and we get a CSV-specific error.
        let err = parse_events(r#""just a string""#).unwrap_err();
        assert!(
            err.contains("no data rows"),
            "expected CSV no-data-rows error, got: {err}"
        );
    }

    #[test]
    fn rejects_malformed_json_starting_with_brace() {
        let err = parse_events(r#"{"EventID": 1"#).unwrap_err();
        assert!(err.contains("Failed to parse events JSON"));
    }

    // ---------------- CSV ----------------

    #[test]
    fn parses_basic_csv() {
        let input = "EventID,Image\n1,cmd.exe\n2,powershell.exe\n";
        let events = parse_events(input).unwrap();
        assert_eq!(events.len(), 2);
        assert_eq!(events[0], json!({"EventID": 1, "Image": "cmd.exe"}));
        assert_eq!(events[1], json!({"EventID": 2, "Image": "powershell.exe"}));
    }

    #[test]
    fn csv_coerces_integers_and_floats() {
        let input = "id,score\n1,0.75\n42,3.14\n-7,2\n";
        let events = parse_events(input).unwrap();
        assert_eq!(events[0]["id"], json!(1));
        assert_eq!(events[0]["score"].as_f64().unwrap(), 0.75);
        assert_eq!(events[2]["id"], json!(-7));
        assert_eq!(events[2]["score"], json!(2));
    }

    #[test]
    fn csv_coerces_booleans_case_insensitively() {
        let input = "name,enabled\na,true\nb,FALSE\nc,True\n";
        let events = parse_events(input).unwrap();
        assert_eq!(events[0]["enabled"], json!(true));
        assert_eq!(events[1]["enabled"], json!(false));
        assert_eq!(events[2]["enabled"], json!(true));
    }

    #[test]
    fn csv_preserves_zero_padded_identifiers_as_strings() {
        // EventCode "0078" must remain "0078", not become 78.
        let input = "name,code\nfoo,0078\nbar,123\n";
        let events = parse_events(input).unwrap();
        assert_eq!(events[0]["code"], json!("0078"));
        assert_eq!(events[1]["code"], json!(123));
    }

    #[test]
    fn csv_does_not_coerce_compound_strings_with_true_or_false() {
        let input = "name,verdict\nalpha,True positive\nbeta,false alarm\n";
        let events = parse_events(input).unwrap();
        assert_eq!(events[0]["verdict"], json!("True positive"));
        assert_eq!(events[1]["verdict"], json!("false alarm"));
    }

    #[test]
    fn csv_treats_empty_cells_as_null() {
        let input = "a,b,c\n1,,three\n";
        let events = parse_events(input).unwrap();
        assert_eq!(events[0]["a"], json!(1));
        assert_eq!(events[0]["b"], serde_json::Value::Null);
        assert_eq!(events[0]["c"], json!("three"));
    }

    #[test]
    fn csv_handles_quoted_fields_with_commas_and_quotes() {
        let input = "name,description\n\"a,b\",\"He said \"\"hi\"\"\"\n";
        let events = parse_events(input).unwrap();
        assert_eq!(events[0]["name"], json!("a,b"));
        assert_eq!(events[0]["description"], json!(r#"He said "hi""#));
    }

    #[test]
    fn csv_handles_crlf_line_endings() {
        let input = "EventID,Image\r\n1,cmd.exe\r\n2,powershell.exe\r\n";
        let events = parse_events(input).unwrap();
        assert_eq!(events.len(), 2);
        assert_eq!(events[1]["Image"], json!("powershell.exe"));
    }

    #[test]
    fn csv_with_headers_only_is_an_error() {
        let err = parse_events("EventID,Image\n").unwrap_err();
        assert!(err.contains("no data rows"));
    }

    #[test]
    fn csv_tolerates_short_rows() {
        // Row 2 is missing the third column; the missing cell becomes null.
        let input = "a,b,c\n1,2,3\n4,5\n";
        let events = parse_events(input).unwrap();
        assert_eq!(events.len(), 2);
        assert_eq!(events[1]["c"], serde_json::Value::Null);
    }

    #[test]
    fn csv_starting_with_quoted_header_is_detected_as_csv() {
        // Regression: previously the first-byte sniffer routed `"`-prefixed
        // input to the JSON path, so an Elastic Discover export (whose first
        // byte is `"` because every header field is quoted) would error with
        // a JSON-parse message. The fallback chain now tries CSV here.
        let input = "\"@timestamp\",\"event.id\",\"message\"\n\
\"2026-05-25T22:35:17.000Z\",\"abc-123\",\"hello, world\"\n\
\"2026-05-25T22:35:18.000Z\",\"def-456\",\"another\"\n";
        let events = parse_events(input).unwrap();
        assert_eq!(events.len(), 2);
        assert_eq!(events[0]["@timestamp"], json!("2026-05-25T22:35:17.000Z"));
        assert_eq!(events[0]["event.id"], json!("abc-123"));
        assert_eq!(events[0]["message"], json!("hello, world"));
    }

    #[test]
    fn csv_with_realistic_sysmon_like_columns() {
        // Use a raw-ish input via concatenation; each `\` in the input is a
        // single backslash in the resulting string.
        let input = "EventID,Channel,Image,CommandLine,User\n\
1,Microsoft-Windows-Sysmon/Operational,C:\\Windows\\System32\\cmd.exe,\"cmd.exe /c whoami\",DOMAIN\\alice\n\
3,Microsoft-Windows-Sysmon/Operational,C:\\Windows\\System32\\powershell.exe,\"powershell -Enc ZQBjAGgAbwA=\",DOMAIN\\bob\n";
        let events = parse_events(input).unwrap();
        assert_eq!(events.len(), 2);
        assert_eq!(events[0]["EventID"], json!(1));
        assert_eq!(events[0]["CommandLine"], json!("cmd.exe /c whoami"));
        assert_eq!(events[0]["Image"], json!(r"C:\Windows\System32\cmd.exe"));
        assert_eq!(events[1]["User"], json!(r"DOMAIN\bob"));
    }

    // ---------------- end-to-end via `evaluate` ----------------

    #[test]
    fn evaluate_runs_against_csv_input() {
        // Simple endswith on `Image` — using forward slashes to keep the
        // rule YAML and CSV input free of backslash-escaping ambiguity.
        let rule = r#"title: Whoami execution
id: 11111111-1111-1111-1111-111111111111
status: test
logsource:
    product: windows
    category: process_creation
detection:
    selection:
        Image|endswith: 'whoami.exe'
    condition: selection
level: low
"#;

        let csv = "EventID,Image,CommandLine\n\
1,/usr/bin/whoami.exe,whoami\n\
1,/usr/bin/cmd.exe,cmd /c dir\n";

        let raw = evaluate(rule, csv, "[]", "[]");
        let parsed: serde_json::Value = serde_json::from_str(&raw).unwrap();
        assert!(parsed["error"].is_null(), "evaluate returned error: {raw}");
        assert_eq!(parsed["stats"]["total_records"], json!(2));
        assert_eq!(
            parsed["stats"]["total_matches"], json!(1),
            "expected one match, got: {raw}"
        );
        assert_eq!(parsed["matches"][0]["event"]["EventID"], json!(1));
        assert_eq!(
            parsed["matches"][0]["event"]["Image"],
            json!("/usr/bin/whoami.exe")
        );
    }
}

