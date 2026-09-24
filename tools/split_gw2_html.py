#!/usr/bin/env python3
"""Separa GW2CV_BCG_BE_v2.html en HTML, CSS y JavaScript externos."""

from pathlib import Path
import re

SOURCE = Path("GW2CV_BCG_BE_v2.html")
OUTPUT_HTML = Path("gw2character_viewer.html")
OUTPUT_CSS = Path("gw2character_viewer.css")
OUTPUT_JS = Path("gw2character_viewer.js")


def extract_single(pattern: str, text: str, label: str) -> str:
    matches = re.findall(pattern, text, flags=re.IGNORECASE | re.DOTALL)
    if len(matches) != 1:
        raise RuntimeError(f"Se esperaba un bloque {label}; encontrados: {len(matches)}")
    return matches[0]


def main() -> None:
    if not SOURCE.exists():
        raise FileNotFoundError(f"No existe {SOURCE}")

    source = SOURCE.read_text(encoding="utf-8")
    css = extract_single(r"<style\\b[^>]*>(.*?)</style>", source, "style")
    javascript = extract_single(r"<script\\b(?![^>]*\\bsrc\\s*=)[^>]*>(.*?)</script>", source, "script inline")

    html = re.sub(
        r"\\s*<style\\b[^>]*>.*?</style>\\s*",
        "\\n  <link rel=\"stylesheet\" href=\"gw2character_viewer.css\" />\\n",
        source,
        count=1,
        flags=re.IGNORECASE | re.DOTALL,
    )
    html = re.sub(
        r"\\s*<script\\b(?![^>]*\\bsrc\\s*=)[^>]*>.*?</script>\\s*",
        "\\n  <script src=\"gw2character_viewer.js\"></script>\\n",
        html,
        count=1,
        flags=re.IGNORECASE | re.DOTALL,
    )

    OUTPUT_CSS.write_text(css.strip() + "\\n", encoding="utf-8")
    OUTPUT_JS.write_text(javascript.strip() + "\\n", encoding="utf-8")
    OUTPUT_HTML.write_text(html.strip() + "\\n", encoding="utf-8")

    print(f"Creado: {OUTPUT_HTML}")
    print(f"Creado: {OUTPUT_CSS}")
    print(f"Creado: {OUTPUT_JS}")


if __name__ == "__main__":
    main()
