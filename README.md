<p align="center">
  <img src="./.github/images/logo.png" [alt="detection.studio](https://detection.studio/ Logo" width="120" height="120">
</p>

<h1 align="center">detection.studio</h1>

<p align="center">
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT License" /></a>
  <a href="https://vuejs.org/"><img src="https://img.shields.io/badge/Built%20with-Vue%203-42b883" alt="Built with Vue3" /></a>
  <a href="https://pyodide.org/"><img src="https://img.shields.io/badge/Powered%20by-Pyodide-3775A9" alt="Powered by Pyodide" /></a>
  <a href="https://detection.studio"><img src="https://img.shields.io/badge/Visit-Website-7977FE" alt="Visit Website" /></a>
  <a href="https://github.com/northsh/detection.studio/actions/workflows/deploy.yml"><img src="https://img.shields.io/github/actions/workflow/status/northsh/detection.studio/workflows%2Fdeploy.yml" alt="Visit Website" /></a>
</p>

<p align="center">
  <strong>Convert Sigma rules to SIEM queries, directly in your browser.</strong>
</p>

<p align="center">
  You can access the tool at:<br />
  <a href="https://detection.studio"><strong>detection.studio</strong></a>
</p>

## About

[detection.studio](https://detection.studio/) is a privacy-focused tool for security professionals to convert Sigma detection rules to SIEM-specific languages (like Splunk SPL, Elasticsearch ES|QL, Grafana Loki etc.) entirely in the browser. No server processing means your sensitive detection rules never leave your device.

> If you're unfamiliar with the Sigma detection format, or how it can benefit your SIEM detection strategy, [visit the documentation](https://sigmahq.io/) to get yourself familiarized.

## Features

- **In-Browser Conversion**: All conversions happen locally in your browser
- **Pipeline & Filter Templates**: Better support with intuitive UI
- **Persistent Workspaces**: Automatic saving to local storage
- **Share & Export**: Easily share your work or export to ZIP
- **Familiar Interface**: File-manager style UI for managing detection rules

## Build & Deploy Locally

[If you want to run detection.studio](https://detection.studio/) locally, you can follow these steps:

### Installation

After installing `bun` from https://bun.sh/, run the following commands

```bash
# Install dependencies (bun preferred)
bun install

# Start dev server
bun run dev

# Build for production
bun run build
```

## SIEM Support

[detection.studio](https://detection.studio/) currently supports conversion to:

- Splunk SPL
- Elasticsearch ES|QL
- Grafana Loki
- And more via the pySigma ecosystem

## Roadmap

The roadmap is [generally available here on Github](https://github.com/orgs/northsh/projects/1/views/1). The project is open-source and contributions are welcome.

## Contributing

Contributions are welcome! For feature requests, bug reports or questions, please open an issue. If you'd like to contribute code, please open a pull request.

- `bun` is the preferred package manager for the project

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [SigConverter.io](https://sigconverter.io) - Server licensed under Apache 2.0
- [SigmaHQ](https://sigmahq.io/) - For the fantastic Sigma project
- [Pyodide](https://pyodide.org/) - For making Python in the browser possible

---

<p align="center">
  by north.sh
</p>