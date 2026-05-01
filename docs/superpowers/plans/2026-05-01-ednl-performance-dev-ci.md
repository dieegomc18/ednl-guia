# EDNL Performance (Dev + CI) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce perceived slowness for studying by (1) guiding users to run the repo from WSL ext4 instead of `/mnt/c` mounts, and (2) speeding up GitHub Actions installs with safe npm flags.

**Architecture:** Keep runtime behavior unchanged. Add a lightweight “doctor” script warning about slow `/mnt/*` mounts and add docs (`DEV-FAST.md`) describing a WSL-first workflow. CI speed-up uses `npm ci --no-audit --fund=false --prefer-offline` (still deterministic) and keeps existing build/smoke checks.

**Tech Stack:** Node.js + npm, Docusaurus, GitHub Actions.

---

## 1) File map

**Create:**
- `scripts/wsl-doctor.mjs`
- `docs/DEV-FAST.md`
- `docs/superpowers/specs/2026-05-01-ednl-performance-dev-ci-design.md`
- `docs/superpowers/plans/2026-05-01-ednl-performance-dev-ci.md` (this plan)

**Modify:**
- `package.json` (add `doctor` script)
- `.github/workflows/test-deploy.yml` (faster npm ci flags)
- `.github/workflows/deploy.yml` (faster npm ci flags)

---

## 2) Task 1: Add WSL doctor script + npm script

**Files:**
- Create: `scripts/wsl-doctor.mjs`
- Modify: `package.json`

- [ ] **Step 1: Create `scripts/wsl-doctor.mjs`**

Create `scripts/wsl-doctor.mjs`:

```js
import {realpathSync} from 'node:fs';

function isSlowMount(cwd) {
  // In WSL, /mnt/c is typically a 9p mount and is much slower for node_modules.
  return cwd.startsWith('/mnt/');
}

const cwd = realpathSync(process.cwd());

if (isSlowMount(cwd)) {
  console.warn('⚠️  EDNL doctor: estás ejecutando desde un path bajo /mnt (Windows mount).');
  console.warn('    Esto suele ser MUCHO más lento para Node (npm ci/build/start).');
  console.warn('');
  console.warn('    Recomendación: clona y trabaja dentro del filesystem de WSL (ext4), por ejemplo:');
  console.warn('      mkdir -p ~/code && cd ~/code');
  console.warn('      git clone https://github.com/dieegomc18/ednl-guia.git');
  console.warn('      cd ednl-guia');
  console.warn('      npm ci');
  console.warn('      npm run start');
  console.warn('');
  process.exitCode = 0;
} else {
  console.log('OK: no estás en /mnt/* (rendimiento local debería ser razonable).');
}
```

- [ ] **Step 2: Add `doctor` script to `package.json`**

In `package.json` add:

```json
{
  "scripts": {
    "doctor": "node scripts/wsl-doctor.mjs"
  }
}
```

- [ ] **Step 3: Run doctor locally (no failure expected)**

Run:
```bash
npm run doctor
```

Expected:
- On `/mnt/*`: prints warning text but exits 0
- Elsewhere: prints OK message

- [ ] **Step 4: Commit**

Run:
```bash
git add scripts/wsl-doctor.mjs package.json
git commit -m "chore: add WSL doctor to warn about slow /mnt mounts"
```

---

## 3) Task 2: Add fast dev quickstart doc

**Files:**
- Create: `docs/DEV-FAST.md`

- [ ] **Step 1: Create `docs/DEV-FAST.md`**

Create `docs/DEV-FAST.md`:

```md
# DEV-FAST (WSL)

Si vas a estudiar y necesitas que todo vaya rápido (npm install, build, start), **no trabajes desde**:

- `/mnt/c/...` (Windows mount)

En WSL suele ser un filesystem tipo **9p** y hace que `npm ci` y `npm run build` sean MUCHO más lentos.

## Flujo recomendado

```bash
mkdir -p ~/code
cd ~/code
git clone https://github.com/dieegomc18/ednl-guia.git
cd ednl-guia

npm ci
npm run doctor
npm run start
```

## Comandos útiles

- `npm run check:guia`  (verifica que `docs/guia-completa.md` está sincronizada)
- `npm run build`       (build producción)
- `npm run smoke`       (checks de artefactos mínimos)

## Si algo va lento

1) Ejecuta `npm run doctor`
2) Si estás en `/mnt/*`, mueve el repo a `~/code/...`
```

- [ ] **Step 2: Commit**

Run:
```bash
git add docs/DEV-FAST.md
git commit -m "docs: add fast dev quickstart for WSL"
```

---

## 4) Task 3: Add performance design note/spec

**Files:**
- Create: `docs/superpowers/specs/2026-05-01-ednl-performance-dev-ci-design.md`

- [ ] **Step 1: Write spec file**

Create `docs/superpowers/specs/2026-05-01-ednl-performance-dev-ci-design.md` with:

```md
# EDNL Performance (Dev + CI) — Design

## Goal

- Make local dev faster for students by recommending WSL ext4 paths
- Reduce CI time safely without changing output

## Decisions

1) WSL-first workflow (avoid `/mnt/*` for node workloads)
2) Add `npm run doctor` to warn about slow mounts
3) CI: use `npm ci --no-audit --fund=false --prefer-offline`

## Acceptance criteria

- `npm run build` and `npm run smoke` still pass in CI
- Running `npm run doctor` never fails the build (exit code 0)
```

- [ ] **Step 2: Commit**

Run:
```bash
git add docs/superpowers/specs/2026-05-01-ednl-performance-dev-ci-design.md
git commit -m "docs: add performance dev/ci design note"
```

---

## 5) Task 4: Speed up CI installs

**Files:**
- Modify: `.github/workflows/test-deploy.yml`
- Modify: `.github/workflows/deploy.yml`

- [ ] **Step 1: Update `npm ci` in workflows**

Change install step to:

```yaml
run: npm ci --no-audit --fund=false --prefer-offline
```

- [ ] **Step 2: Verify workflows via local verification**

Run:
```bash
npm run typecheck
npm run build
npm run smoke
```

Expected: PASS.

- [ ] **Step 3: Commit**

Run:
```bash
git add .github/workflows/test-deploy.yml .github/workflows/deploy.yml
git commit -m "ci: speed up npm ci"
```

---

## 6) Task 5: Push and verify GitHub Actions

**Files:** none

- [ ] **Step 1: Push**

Run:
```bash
git push
```

- [ ] **Step 2: Verify Actions succeeded**

Run:
```bash
gh run list -R dieegomc18/ednl-guia --limit 3
```

Expected: latest run is success.

---

## Plan self-review

- No placeholders: all file paths and contents specified.
- Scope is small and independent.
- Verification commands included.
