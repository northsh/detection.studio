import { v4 as uuid } from "uuid";

export default function sigmaNetworkTemplate(author: string = "") {
  return `title: Example Network Connection Rule
id: ${uuid()}
description: Detects suspicious network connections
status: experimental
author: ${author || "Your Name"}
date: 2023-10-01
logsource:
  category: network_connection
  product: windows
detection:
  selection:
    DestinationPort:
      - 4444
      - 1337
    Initiated: 'true'
  condition: selection
falsepositives:
  - Legitimate administrative tools
level: medium
tags:
  - attack.command_and_control
  - attack.t1071
`;
}
