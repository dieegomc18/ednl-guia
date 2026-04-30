from __future__ import annotations

import re
from pathlib import Path

import markdown


ROOT = Path(__file__).resolve().parents[2]
EDNL = ROOT / "EDNL"

SRC_MD = EDNL / "Guia-Estudio-EDNL.md"
OUT_HTML = EDNL / "Guia-Estudio-EDNL.html"


def slugify(text: str) -> str:
    t = text.strip().lower()
    # Keep spanish letters, remove punctuation.
    t = re.sub(r"[^a-z0-9áéíóúüñ\s-]", "", t)
    t = re.sub(r"\s+", "-", t)
    t = re.sub(r"-+", "-", t)
    return t.strip("-") or "section"


def inject_ids_into_headings(html: str) -> str:
    """Add stable ids to headings that don't already have them."""
    used: set[str] = set()

    def repl(match: re.Match[str]) -> str:
        level = match.group(1)
        attrs = match.group(2) or ""
        inner = match.group(3)
        if "id=" in attrs:
            # Collect existing ids to reduce collision risk.
            m = re.search(r"id=\"([^\"]+)\"", attrs)
            if m:
                used.add(m.group(1))
            return match.group(0)

        base = slugify(re.sub(r"<[^>]+>", "", inner))
        slug = base
        i = 2
        while slug in used:
            slug = f"{base}-{i}"
            i += 1
        used.add(slug)

        return f"<h{level}{attrs} id=\"{slug}\">{inner}</h{level}>"

    return re.sub(r"<h([1-6])([^>]*)>(.*?)</h\1>", repl, html, flags=re.DOTALL)


def build_toc_from_headings(html: str) -> str:
    headings = re.findall(
        r"<h([1-6])[^>]*id=\"([^\"]+)\"[^>]*>(.*?)</h\1>",
        html,
        flags=re.DOTALL,
    )
    items: list[tuple[int, str, str]] = []
    for level, hid, inner in headings:
        title = re.sub(r"<[^>]+>", "", inner).strip()
        items.append((int(level), hid, title))

    # Keep the TOC manageable.
    items = [it for it in items if it[0] <= 3]

    out = ["<ul class=\"tocList\">"]
    for lvl, hid, title in items:
        out.append(
            f"<li class=\"tocItem tocLevel{lvl}\"><a href=\"#{hid}\">{title}</a></li>"
        )
    out.append("</ul>")
    return "\n".join(out)


def wrap_codeblocks_for_copy_buttons(html: str) -> str:
    def repl(m: re.Match[str]) -> str:
        code = m.group(0)
        return (
            "<div class=\"codeBlock\">"
            "<button class=\"copyBtn\" type=\"button\" data-copy>Copiar</button>"
            f"{code}"
            "</div>"
        )

    return re.sub(r"<pre><code[\s\S]*?</code></pre>", repl, html)


def render() -> None:
    md_text = SRC_MD.read_text(encoding="utf-8")

    md = markdown.Markdown(
        extensions=[
            "fenced_code",
            "tables",
            "sane_lists",
        ]
    )

    body = md.convert(md_text)
    body = inject_ids_into_headings(body)
    body = wrap_codeblocks_for_copy_buttons(body)

    toc_html = build_toc_from_headings(body)

    page = f"""<!doctype html>
<html lang=\"es\">
  <head>
    <meta charset=\"utf-8\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
    <title>Guía de Estudio EDNL</title>
    <link rel=\"stylesheet\" href=\"assets/styles.css\" />
  </head>
  <body>
    <header class=\"topHeader\">
      <div class=\"titleWrap\">
        <h1 class=\"pageTitle\">Guía de Estudio EDNL</h1>
        <p class=\"pageSubtitle\">Modo profe particular · teoría + código + ejercicios</p>
      </div>
      <button id=\"tocButton\" class=\"tocButton\" type=\"button\">Índice</button>
    </header>

    <section class=\"tocSection\">
      <h2>Índice</h2>
      <nav id=\"toc\">{toc_html}</nav>
    </section>

    <aside id=\"tocPanel\" class=\"tocPanel\" aria-hidden=\"true\">
      <div class=\"tocPanelHeader\">
        <strong>Índice</strong>
        <button id=\"tocClose\" class=\"tocClose\" type=\"button\">Cerrar</button>
      </div>
      <nav class=\"tocPanelBody\">{toc_html}</nav>
    </aside>

    <main id=\"content\" class=\"content\">
      {body}
    </main>

    <script src=\"assets/app.js\"></script>
  </body>
</html>
"""

    OUT_HTML.write_text(page, encoding="utf-8")


if __name__ == "__main__":
    render()
    print(f"Wrote: {OUT_HTML}")
