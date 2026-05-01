# EDNL Performance (Dev + CI) — Design

## Goal

- Acelerar experiencia local (para estudiar) evitando `/mnt/*` en WSL para workloads Node.
- Reducir tiempo de CI de forma segura (sin cambiar output).

## Decisions

1) **WSL-first workflow:** recomendar clonar y trabajar en filesystem ext4 (por ejemplo `~/code/ednl-guia`).
2) Añadir `npm run doctor` (script) que avise si estás ejecutando desde `/mnt/*`.
3) CI: usar flags seguros de npm para ahorrar tiempo:
   - `npm ci --no-audit --fund=false --prefer-offline`

## Acceptance criteria

- CI sigue pasando: `npm run check:guia`, `npm run build`, `npm run smoke`.
- `npm run doctor` no falla (exit code 0) y solo muestra advertencias.
