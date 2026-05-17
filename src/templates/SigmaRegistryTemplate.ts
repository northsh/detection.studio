import { v4 as uuid } from "uuid";

export default function sigmaRegistryTemplate(author: string = "") {
  return `title: Example Registry Event Rule
id: ${uuid()}
description: Detects suspicious registry modifications
status: experimental
author: ${author || "Your Name"}
date: 2023-10-01
logsource:
  category: registry_event
  product: windows
detection:
  selection:
    TargetObject|contains:
      - '\\Software\\Microsoft\\Windows\\CurrentVersion\\Run'
      - '\\Software\\Microsoft\\Windows\\CurrentVersion\\RunOnce'
    Details|contains:
      - '.exe'
  condition: selection
falsepositives:
  - Legitimate software installations
level: medium
tags:
  - attack.persistence
  - attack.t1547.001
`;
}
