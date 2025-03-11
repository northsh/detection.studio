import {v4 as uuid} from "uuid";

export default function sigmaCorrelationTemplate() {
  return `title: Windows Failed Logon Event
id: ${uuid()}
name: failed_logon # Rule Reference
description: Detects failed logon events on Windows systems.
logsource:
    product: windows
    service: security
detection:
    selection:
        EventID: 4625
    condition: selection
---
title: Multiple failed logons for a single user (possible brute force attack)
id: ${uuid()}
correlation:
    type: event_count
    rules:
        - failed_logon # Referenced here
    group-by:
        - TargetUserName
        - TargetDomainName
    timespan: 5m
    condition:
        gte: 10
`;
}
