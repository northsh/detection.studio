import { v4 as uuid } from "uuid";
import { dedentString, indentString } from "@/templates/template_utils.ts";
import type { FileItem, Sigma } from "@/types/types.ts";
import yaml from "js-yaml";

export default function sigmaFilterTemplate(file: FileItem) {
    if (!file?.content) {
        return "";
    }

    let sigma_file = file.content;
    // Yaml parse

    const sigmaYaml = yaml.loadAll(sigma_file) as Sigma[];
    let logsourceYaml = yaml.dump(sigmaYaml[0]?.logsource ?? "").trim();
    const rule_id = sigmaYaml[0]?.id || uuid();

    logsourceYaml = indentString(dedentString(logsourceYaml), 4);

    return (
        `title: Filter Out Domain Controllers
id: ${uuid()}
description: Filter out events from Domain Controllers
logsource:\n` +
        logsourceYaml +
        `
filter:
  rules:
    - ${rule_id}
  selection:
    ComputerName|startswith: "DC-"
  condition: not selection
`
    );
}
