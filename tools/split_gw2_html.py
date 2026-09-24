#!/usr/bin/env python3
"""Separa GW2CV_BCG_BE_v2.html en HTML, CSS y JavaScript externos.

El script usa como base la carpeta donde está ubicado este archivo, por lo
que puede ejecutarse desde cualquier directorio.
"""

from pathlib import Path
import re

BASE_DIR = Path(__file__).resolve().parent.parent
SOURCE = BASE_DIR / "GW2CV_BCG_BE_v2.html"
OUTPUT_HTML = BASE_DIR / "gw2character_viewer.html"
OUTPUT_CSS = BASE_DIR / "gw2character_viewer.css"
OUTPUT_JS = BASE_DIR / "gw2character_viewer.js"


def extract_single(pattern: str, text: str, label: str) -> str:
    matches = re.findall(pattern, text, flags=re.IGNORECASE | re.DOTALL)
    if len(matches) != 1:
        raise RuntimeError(
            f"Se esperaba un bloque {label}; encontrados: {len(matches)}. "
            f"Archivo analizado: {SOURCE}"
        )
    return matches[0]


def main() -> None:
    if not SOURCE.is_file():
        raise FileNotFoundError(
            f"No existe el archivo fuente: {SOURCE}\n"
            "Comprueba que GW2CV_BCG_BE_v2.html está en la raíz del repositorio."
        )

    source = SOURCE.read_text(encoding="utf-8-sig")

    # Importante: en una cadena raw se usa \\b como límite de palabra de regex,
    # no \\\\b. La versión anterior buscaba literalmente "\\b" en el HTML.
    css = extract_single(r"<style\b[^>]*>(.*?)</style\s*>", source, "style")
    javascript = extract_single(
        r"<script\b(?![^>]*\bsrc\s*=)[^>]*>(.*?)</script\s*>",
        source,
        "script inline",
    )

    html = re.sub(
        r"\s*<style\b[^>]*>.*?</style\s*>\s*",
        '\n  <link rel="stylesheet" href="gw2character_viewer.css" />\n',
        source,
        count=1,
        flags=re.IGNORECASE | re.DOTALL,
    )
    html = re.sub(
        r"\s*<script\b(?![^>]*\bsrc\s*=)[^>]*>.*?</script\s*>\s*",
        '\n  <script src="gw2character_viewer.js"></script>\n',
        html,
        count=1,
        flags=re.IGNORECASE | re.DOTALL,
    )

    OUTPUT_CSS.write_text(css.strip() + "\n", encoding="utf-8")
    OUTPUT_JS.write_text(javascript.strip() + "\n", encoding="utf-8")
    OUTPUT_HTML.write_text(html.strip() + "\n", encoding="utf-8")

    print("Extracción completada correctamente:")
    print(f"  HTML: {OUTPUT_HTML}")
    print(f"  CSS:  {OUTPUT_CSS}")
    print(f"  JS:   {OUTPUT_JS}")


if __name__ == "__main__":
    main()
