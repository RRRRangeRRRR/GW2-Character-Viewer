#!/usr/bin/env python3
"""Separa GW2CV_BCG_BE_v2.html en HTML, CSS y JavaScript externos.

El script puede ejecutarse desde cualquier directorio. Todos los bloques
<style> se combinan en un único CSS y todos los bloques <script> inline se
combinan en un único JavaScript, conservando los scripts externos existentes.
"""

from pathlib import Path
import re

BASE_DIR = Path(__file__).resolve().parent.parent
SOURCE = BASE_DIR / "GW2CV_BCG_BE_v2.html"
OUTPUT_HTML = BASE_DIR / "gw2character_viewer.html"
OUTPUT_CSS = BASE_DIR / "gw2character_viewer.css"
OUTPUT_JS = BASE_DIR / "gw2character_viewer.js"

STYLE_PATTERN = re.compile(
    r"<style\b[^>]*>(.*?)</style\s*>",
    flags=re.IGNORECASE | re.DOTALL,
)
INLINE_SCRIPT_PATTERN = re.compile(
    r"<script\b(?![^>]*\bsrc\s*=)[^>]*>(.*?)</script\s*>",
    flags=re.IGNORECASE | re.DOTALL,
)


def main() -> None:
    if not SOURCE.is_file():
        raise FileNotFoundError(
            f"No existe el archivo fuente: {SOURCE}\n"
            "Comprueba que GW2CV_BCG_BE_v2.html está en la raíz del repositorio."
        )

    source = SOURCE.read_text(encoding="utf-8-sig")

    styles = STYLE_PATTERN.findall(source)
    scripts = INLINE_SCRIPT_PATTERN.findall(source)

    if not styles:
        raise RuntimeError(f"No se encontró ningún bloque <style> en {SOURCE}")
    if not scripts:
        raise RuntimeError(f"No se encontró ningún bloque <script> inline en {SOURCE}")

    css = "\n\n".join(style.strip() for style in styles if style.strip())
    javascript = "\n\n".join(script.strip() for script in scripts if script.strip())

    # Elimina todos los estilos inline, no solo el primero.
    html = STYLE_PATTERN.sub("\n", source)

    # Elimina únicamente los scripts inline. Los que tengan src se conservan.
    html = INLINE_SCRIPT_PATTERN.sub("\n", html)

    # Inserta las referencias externas en posiciones válidas del documento.
    if re.search(r"</head\s*>", html, flags=re.IGNORECASE):
        html = re.sub(
            r"</head\s*>",
            '  <link rel="stylesheet" href="gw2character_viewer.css" />\n</head>',
            html,
            count=1,
            flags=re.IGNORECASE,
        )
    else:
        raise RuntimeError(f"El HTML no contiene </head>: {SOURCE}")

    if re.search(r"</body\s*>", html, flags=re.IGNORECASE):
        html = re.sub(
            r"</body\s*>",
            '  <script src="gw2character_viewer.js"></script>\n</body>',
            html,
            count=1,
            flags=re.IGNORECASE,
        )
    else:
        raise RuntimeError(f"El HTML no contiene </body>: {SOURCE}")

    # Comprobaciones de integridad antes de escribir los archivos.
    if STYLE_PATTERN.search(html):
        raise RuntimeError("No se pudieron eliminar todos los bloques <style>")
    if INLINE_SCRIPT_PATTERN.search(html):
        raise RuntimeError("No se pudieron eliminar todos los scripts inline")
    if html.lower().count('href="gw2character_viewer.css"') != 1:
        raise RuntimeError("La referencia al CSS no se insertó exactamente una vez")
    if html.lower().count('src="gw2character_viewer.js"') != 1:
        raise RuntimeError("La referencia al JavaScript no se insertó exactamente una vez")

    OUTPUT_CSS.write_text(css + "\n", encoding="utf-8")
    OUTPUT_JS.write_text(javascript + "\n", encoding="utf-8")
    OUTPUT_HTML.write_text(html.strip() + "\n", encoding="utf-8")

    print("Extracción completada correctamente:")
    print(f"  Bloques CSS encontrados: {len(styles)}")
    print(f"  Scripts inline encontrados: {len(scripts)}")
    print(f"  HTML: {OUTPUT_HTML}")
    print(f"  CSS:  {OUTPUT_CSS}")
    print(f"  JS:   {OUTPUT_JS}")


if __name__ == "__main__":
    main()
