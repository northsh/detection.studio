import { v4 as uuid } from "uuid";

export default function sigmaCorrelationTemplate() {
  return `title: High-privilege group enumeration
name: privileged_group_enumeration
id: ${uuid()}
status: stable
logsource:
  product: windows
  service: security
detection:
  selection:
    EventID: 4799
    CallerProcessId: 0x0
    TargetUserName:
      - Administrators
      - Remote Desktop Users
      - Remote Management Users
      - Distributed COM Users
  condition: selection
level: informational
falsepositives:
  - Administrative activity
  - Directory assessment tools
---
title: Enumeration of multiple high-privilege groups by tools like BloodHound
id: ${uuid()}
status: stable
correlation:
  type: value_count
  rules:
    - privileged_group_enumeration
  group-by:
    - SubjectUserName
  timespan: 15m
  condition:
    gte: 4
    field: TargetUserName
level: high
falsepositives:
  - Administrative activity
  - Directory assessment tools
`;
}
