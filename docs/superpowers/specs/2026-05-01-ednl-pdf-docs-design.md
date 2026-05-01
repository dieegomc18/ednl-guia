---
title: "EDNL: convertir PDFs (Teoría/Prácticas) a Docs navegables"
date: 2026-05-01
---

# EDNL: convertir PDFs (Teoría/Prácticas) a Docs navegables

## Objetivo

Convertir dos PDFs grandes a Docs Docusaurus (texto, navegable, buscable):

- `static/ednl/TeoriaEDNL.pdf`
- `static/ednl/PracticasEDNL.pdf`

PDFs siguen en `/ednl/*.pdf`.

## Alcance

Incluye:
- Generar páginas Docs desde PDFs.
- Índices `/teoria` y `/practicas`.
- CI: check que docs generados estén al día.

No incluye:
- Convertir PDFs sueltos por tema.
- Reescritura manual modo profe capítulo a capítulo.

## Diseño

Salida:
- `docs/teoria/index.mdx` + `docs/teoria/_generated/*.mdx`
- `docs/practicas/index.mdx` + `docs/practicas/_generated/*.mdx`

Split:
- Usar outline/bookmarks PDF.
- Teoría: depth 0–1.
- Prácticas: prácticas (depth 1).

MDX-safe:
- Escapar `{` `}`.

Sidebar:
- Solo 2 entradas: `teoria/index`, `practicas/index`.

## Aceptación

1) `/teoria` y `/practicas` existen.
2) Texto buscable.
3) Build/CI pasan.
4) `check:pdf-docs` detecta desync.
