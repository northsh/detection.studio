import { v4 as uuid } from "uuid";

export default function sigmaFileEventTemplate(author: string = "") {
  return `title: Example File Event Rule
id: ${uuid()}
description: Detects suspicious file creation or modification
status: experimental
author: ${author || "Your Name"}
date: 2023-10-01
logsource:
  category: file_event
  product: windows
detection:
  selection:
    TargetFilename|endswith:
      - '.exe'
      - '.dll'
      - '.bat'
    TargetFilename|contains:
      - '\\Temp\\'
      - '\\AppData\\Roaming\\'
  condition: selection
falsepositives:
  - Legitimate software installations
level: medium
tags:
  - attack.defense_evasion
  - attack.t1036
`;
}
