# Spec de Diseño — EDNL Docs v2 (núcleo curado + guía completa)

**Fecha:** 2026-05-01  \
**Repo:** `dieegomc18/ednl-guia`  \
**Sitio:** https://dieegomc18.github.io/ednl-guia/  \
**Restricciones del usuario:** no usar Visual Companion; no usar subagentes.

---

## 0) Contexto

El sitio ya está publicado con:

- Docusaurus + búsqueda local.
- Labs interactivos MVP: Heap y Dijkstra.
- Steppers guiados MVP: recorridos, AVL, MST, hash.
- Directorio completo `EDNL/` publicado en `static/ednl/**` (PDFs, guía HTML estática, materiales extra).
- Página `/recursos` enlazando a los recursos estáticos principales.

El contenido en `docs/` existe, pero varias páginas son muy cortas. Se quiere subir el nivel del **contenido** (modo profe), priorizando un **núcleo curado** fácil de estudiar, manteniendo a la vez una **guía completa** buscable.

---

## 1) Objetivo (Goal)

Entregar una iteración “Docs v2” que:

1) Mantenga una **Guía completa** buscable dentro de Docusaurus (para que el buscador funcione sobre todo el material).
2) Añada un **núcleo curado** (8–12 páginas) con calidad alta y formato consistente:
   - teoría corta
   - receta de examen
   - errores típicos
   - ejemplo guiado (stepper/lab cuando aplique)
   - complejidades
   - “ver más” robusto a la guía completa
3) Mejore la navegación: el sidebar debe destacar el núcleo curado.
4) No rompa el despliegue a GitHub Pages ni los checks (`typecheck`, `build`, `smoke`).

---

## 2) No-objetivos

- Reescribir toda la guía completa manualmente.
- Convertir todos los ejercicios tipo examen en páginas independientes (se podrá hacer después).
- Cambiar el enfoque del site (seguimos con Docusaurus + Labs actuales).

---

## 3) Enfoque recomendado (arquitectura de contenido)

### 3.1 Dos capas

**Capa A — Guía completa (buscable):**

- `docs/guia-completa.md` se genera automáticamente desde `static/ednl/Guia-Estudio-EDNL.md`.
- Debe permanecer como “todo en uno” y ser la fuente de referencia para búsquedas.

**Capa B — Núcleo curado (equilibrado):**

- Páginas cortas, estructuradas y muy estudiables.
- Enlazan a labs/steppers y a la guía completa.

### 3.2 Regla editorial para todas las páginas curadas

Cada página curada debe seguir este esquema (en este orden):

1) **Idea clave** (5–10 líneas)
2) **Receta de examen** (pasos concretos)
3) **Errores típicos**
4) **Ejemplo guiado** (mini-ejemplo + stepper/lab)
5) **Complejidad** (tiempo/memoria)
6) **Ver más en guía completa**
   - Link a `/guia-completa`
   - Indicación de qué sección buscar (texto), evitando depender de anchors frágiles.

---

## 4) Núcleo curado (páginas exactas)

Basado en el índice real de `static/ednl/Guia-Estudio-EDNL.md`, el núcleo curado será:

### Árboles

1) `docs/arboles/recorridos.mdx` (mejorar)
2) `docs/arboles/abin-agen.mdx` (nuevo)
3) `docs/arboles/abb.mdx` (nuevo)
4) `docs/arboles/avl.mdx` (nuevo, unifica rotaciones + esAVL + checklist)
5) `docs/arboles/heap.mdx` (nuevo)

### Hash

6) `docs/hash/colisiones.mdx` (mejorar)

### Grafos

7) `docs/grafos/dijkstra.mdx` (nuevo)
8) `docs/grafos/mst.mdx` (mejorar)

### Estrategia de examen

9) `docs/estrategia/examen.mdx` (nuevo)

**Nota:** Floyd/Warshall quedan fuera del núcleo curado por ahora (se pueden añadir en una iteración posterior si hace falta).

---

## 5) Navegación (sidebar)

El sidebar debe:

- Mostrar `intro` y `guia-completa` arriba.
- Agrupar el núcleo curado por categorías (Árboles / Hash / Grafos / Estrategia).
- Mantener el resto fuera (por ahora) para que no se diluya la navegación.

---

## 6) Decisión: AVL rotaciones como redirección

El usuario eligió **A**:

- `docs/arboles/avl-rotaciones.mdx` pasa a ser una página mínima que **redirige** (o enlaza de forma prominente) a `docs/arboles/avl.mdx`.

Implementación sugerida (simple y robusta):

- Mantener `avl-rotaciones.mdx` con un pequeño texto y un link a `/arboles/avl`.
- (Opcional) usar un “redirect plugin” más adelante si se desea un redirect real.

---

## 7) Sincronización de guía completa

Se mantiene el script existente:

- `scripts/generate-guia-completa.mjs`

Regla:

- Antes de commits que cambien `static/ednl/Guia-Estudio-EDNL.md`, regenerar `docs/guia-completa.md`.
- En CI, el build debe fallar si la guía completa está des-sincronizada (esto se puede lograr regenerando durante el workflow y haciendo `git diff --exit-code`, o manteniéndolo como disciplina manual en esta iteración).

---

## 8) Criterios de aceptación

1) Sidebar actualizado y navegación clara.
2) Las 9 páginas del núcleo curado existen y siguen la regla editorial.
3) Enlaces a labs/steppers funcionan.
4) `npm run typecheck && npm run build && npm run smoke` pasan.
5) Deploy a GitHub Pages sigue en verde.

---

## 9) Riesgos y mitigaciones

- **Tiempo editorial**: escribir “modo profe” puede extenderse.
  - Mitigación: núcleo curado limitado (9 páginas) y estructura fija.
- **Roturas por enlaces** (Docusaurus broken links no considera `static/` como rutas).
  - Mitigación: seguir usando `data-noBrokenLinkCheck` para links a `/ednl/*` cuando aplique.
