# EDNL Content “Modo Profe” Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the curated EDNL docs pages so a student can follow a 10‑day study path (4–6h/day) and get tutor-style, exam-aligned explanations without expanding the sidebar.

**Architecture:** Keep the existing curated pages and labs. Expand each page with consistent “modo profe” sections (exam patterns → recipe → common mistakes → guided mini-exercises with hidden solutions → complexity justification). Add a concrete 10‑day plan to `docs/intro.mdx`.

**Tech Stack:** Docusaurus (MDX), existing steppers/labs, GitHub Actions.

---

## Files to Modify

- Modify: `docs/intro.mdx`
- Modify: `docs/arboles/recorridos.mdx`
- Modify: `docs/arboles/avl.mdx`
- Modify: `docs/grafos/dijkstra.mdx`

## Verification Commands

Run in repo root:

- `npm ci`
- `npm run check:guia`
- `npm run typecheck`
- `npm run build`
- `npm run smoke`
