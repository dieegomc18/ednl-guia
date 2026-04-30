from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]  # .../UCA
EDNL = ROOT / "EDNL"
OUT_HTML = EDNL / "Guia-Estudio-EDNL.html"
ASSETS = EDNL / "assets"


def _assert(cond: bool, msg: str) -> None:
    if not cond:
        raise AssertionError(msg)


def main() -> int:
    _assert(OUT_HTML.exists(), f"Missing output HTML: {OUT_HTML}")
    _assert(ASSETS.exists(), f"Missing assets dir: {ASSETS}")

    css = ASSETS / "styles.css"
    js = ASSETS / "app.js"
    _assert(css.exists(), f"Missing CSS: {css}")
    _assert(js.exists(), f"Missing JS: {js}")

    diagrams = ASSETS / "diagrams"
    _assert(diagrams.exists(), f"Missing diagrams dir: {diagrams}")

    required_svgs = [
        "abin-recorridos.svg",
        "agen-hijo-hermano.svg",
        "heap-indices.svg",
        "hash-colisiones.svg",
        "dijkstra-relajacion.svg",
        "mst-kruskal-prim.svg",
    ]
    for name in required_svgs:
        _assert((diagrams / name).exists(), f"Missing diagram: {diagrams / name}")

    html = OUT_HTML.read_text(encoding="utf-8")

    _assert("id=\"toc\"" in html, "Missing TOC container (id=\"toc\").")
    _assert("id=\"tocButton\"" in html, "Missing floating TOC button (id=\"tocButton\").")
    _assert("id=\"tocPanel\"" in html, "Missing TOC panel (id=\"tocPanel\").")

    _assert("<details" in html, "Expected at least one <details> block for spoilers.")
    _assert("data-copy" in html, "Missing copy-button hooks (data-copy).")

    has_heading_id = bool(re.search(r"<h[1-6][^>]*id=\"[^\"]+\"", html))
    _assert(has_heading_id, "No heading ids found; anchors must be stable.")

    print("OK: HTML smoke checks passed")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except AssertionError as e:
        print(f"FAIL: {e}", file=sys.stderr)
        raise SystemExit(1)
