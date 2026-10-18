# /// script
# requires-python = ">=3.14,<3.15"
# dependencies = ["pyodide-build[resolve]==0.39.1"]
# ///
"""Rebuild the bundled jq wheel: uv run --python 3.14 scripts/build-jq-wheel.py."""

import hashlib
import os
from pathlib import Path
import subprocess
import tarfile
import tempfile
import urllib.request

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "packages/pysigma-node/src/wheels"
PYODIDE_VERSION = "314.0.7"
SOURCE_URL = (
    "https://files.pythonhosted.org/packages/67/67/"
    "bd53dc762c2e7728b7b32bdbe59ecb74ae6bc6b7609e5063e6e44553b44f/"
    "jq-1.13.0.tar.gz"
)
SOURCE_SHA256 = "e62bdddeab3b8a0a404581a7bb6f1e8c4cc6082280870031f746074f4cac52c0"


def run(*args: str) -> None:
    subprocess.run(args, check=True)


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    # Keep the environment stable across invocations and allow CI to cache it.
    cache = Path(os.environ.get("PYODIDE_XBUILDENV_PATH", ROOT / ".jq-xbuildenv"))
    run("pyodide", "xbuildenv", "install", PYODIDE_VERSION, "--path", str(cache))

    with tempfile.TemporaryDirectory(prefix="pysigma-jq-") as tmp:
        archive = Path(tmp) / "jq.tar.gz"
        with urllib.request.urlopen(SOURCE_URL) as response:
            data = response.read()
        if hashlib.sha256(data).hexdigest() != SOURCE_SHA256:
            raise RuntimeError("jq source archive checksum mismatch")
        archive.write_bytes(data)
        with tarfile.open(archive) as source:
            source.extractall(tmp, filter="data")
        project = Path(tmp) / "jq-1.13.0"
        setup = project / "setup.py"
        text = setup.read_text()
        original = '["./configure", "CFLAGS=-fPIC -pthread", "--disable-maintainer-mode", "--with-oniguruma=builtin"]'
        replacement = '["./configure", "CFLAGS=-fPIC", "--host=wasm32-unknown-emscripten", "--disable-shared", "--disable-maintainer-mode", "--with-oniguruma=builtin"]'
        if original not in text:
            raise RuntimeError("jq setup.py changed; review the cross-build patch")
        # Build static libraries only, and don't inherit host macOS/Linux linker flags.
        text = text.replace(original, replacement).replace(
            '["make"]',
            '["make", "-C", "vendor/oniguruma", "-j4"], '
            '["make", "src/builtin.inc", "src/config_opts.inc", "src/version.h"], '
            '["make", "-j4", "libjq.la"]',
        )
        setup.write_text(text)

        # Include the notices for the statically linked dependencies in the wheel
        # as well as in the published JavaScript package.
        notices = ["jq.py\n\n" + (project / "LICENSE").read_text()]
        with tarfile.open(project / "deps/jq-1.8.2.tar.gz") as libjq:
            for name, member in (
                ("libjq", "jq-1.8.2/COPYING"),
                ("Oniguruma", "jq-1.8.2/vendor/oniguruma/COPYING"),
            ):
                license_text = libjq.extractfile(member).read().decode()
                (project / f"COPYING.{name}").write_text(license_text)
                notices.append(f"{name}\n\n{license_text}")
        (OUTPUT / "LICENSES.txt").write_text("\n\n".join(notices))
        run(
            "pyodide", "build", str(project),
            "--xbuildenv-path", str(cache), "--outdir", str(OUTPUT),
        )


if __name__ == "__main__":
    main()
