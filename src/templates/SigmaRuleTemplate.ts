import {v4 as uuid} from "uuid";

export default function sigmaTemplate() {
    return `title: Example Sigma Rule
id: ${uuid()}
description: Detects suspicious activity
status: experimental
author: Your Name
date: 2023-10-01
logsource:
  category: process_creation
  product: windows
detection:
  selection:
    EventID: 4688
    CommandLine|contains:
      - "suspicious_command"
  condition: selection
falsepositives:
  - Legitimate administrative activity
level: high
tags:
  - attack.execution
  - attack.t1059
`;
}
