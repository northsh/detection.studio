import {v4 as uuid} from "uuid";

export default function sigmaCorrelationTemplate() {
    return `
title: Suspicious Scheduled Task Creation
id: ${uuid()}
name: suspicious_schtask_creation
description: Detects the creation of a scheduled task with suspicious parameters
status: experimental
logsource:
  product: windows
  service: security
  category: process_creation
detection:
  selection:
    Image|endswith: 
      - '\\schtasks.exe'
    CommandLine|contains: 
      - ' /create '
      - ' /sc '
    CommandLine|contains|all:
      - '.exe'
  filter:
    User: 'NT AUTHORITY\\SYSTEM'
  condition: selection and not filter
falsepositives:
  - Legitimate task scheduling by administrators
  - Software installation and updates
tags:
  - attack.persistence
  - attack.t1053.005
---
title: Suspicious Process with System Privileges
id: ${uuid()}
name: suspicious_system_process
description: Detects execution of suspicious processes with SYSTEM privileges
status: experimental
logsource:
  product: windows
  service: security
  category: process_creation
detection:
  selection:
    User: 'NT AUTHORITY\\SYSTEM'
    Image|endswith:
      - '\\powershell.exe'
      - '\\cmd.exe'
      - '\\wscript.exe'
      - '\\cscript.exe'
      - '\\rundll32.exe'
      - '\\regsvr32.exe'
    CommandLine|contains:
      - 'iex'
      - 'Invoke-Expression'
      - 'Invoke-WebRequest'
      - 'wget'
      - 'curl'
      - 'DownloadString'
      - 'DownloadFile'
      - 'WebClient'
      - 'hidden'
      - '-enc'
      - '-encoded'
      - '-e '
      - 'base64'
  condition: selection
falsepositives:
  - Administrative scripts
  - Software updates
tags:
  - attack.execution
  - attack.t1059
---
title: Potential Privilege Escalation via Scheduled Task Chain
id: ${uuid()}
description: Detects a suspicious scheduled task creation followed by execution of suspicious process with SYSTEM privileges
status: experimental
correlation:
  type: temporal
  rules:
    - suspicious_schtask_creation
    - suspicious_system_process
  group-by:
    - Hostname
  timespan: 2m
level: high
tags:
  - attack.privilege_escalation
  - attack.persistence
  - attack.t1053.005
  - attack.execution
  - attack.t1059
falsepositives:
  - Legitimate administrative activity
  - Some automated software updates
references:
  - https://attack.mitre.org/techniques/T1053/005/
  - https://attack.mitre.org/techniques/T1059/
`;
}
