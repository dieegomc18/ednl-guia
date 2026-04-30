import React from 'react';

type Graph = {
  name: string;
  nodes: string[];
  // adjacency matrix: null means no edge
  w: (number | null)[][];
};

type Step =
  | {type: 'pick'; u: number; note: string}
  | {type: 'relax'; u: number; v: number; old: number; next: number; note: string}
  | {type: 'done'; note: string};

const INF = 1_000_000_000;

const PRESETS: Graph[] = [
  {
    name: 'G1 (pequeño)',
    nodes: ['A', 'B', 'C', 'D', 'E'],
    w: [
      [null, 4, 2, null, null],
      [4, null, 1, 5, null],
      [2, 1, null, 8, 10],
      [null, 5, 8, null, 2],
      [null, null, 10, 2, null],
    ],
  },
  {
    name: 'G2 (con atajos)',
    nodes: ['S', 'A', 'B', 'C', 'T'],
    w: [
      [null, 2, 6, null, null],
      [2, null, 3, 1, null],
      [6, 3, null, 1, 2],
      [null, 1, 1, null, 4],
      [null, null, 2, 4, null],
    ],
  },
];

function fmt(d: number) {
  return d >= INF ? '∞' : String(d);
}

function computeSteps(g: Graph, source: number): {steps: Step[]; dist: number[]; prev: number[]} {
  // Dijkstra requires non-negative weights.
  for (let i = 0; i < g.w.length; i++) {
    for (let j = 0; j < g.w.length; j++) {
      const ww = g.w[i][j];
      if (ww != null && ww < 0) {
        throw new Error('Preset inválido: Dijkstra no admite pesos negativos');
      }
    }
  }

  const n = g.nodes.length;
  const dist = Array(n).fill(INF);
  const prev = Array(n).fill(-1);
  const used = Array(n).fill(false);
  dist[source] = 0;

  const steps: Step[] = [];

  for (let it = 0; it < n; it++) {
    let u = -1;
    for (let i = 0; i < n; i++) {
      if (!used[i] && (u === -1 || dist[i] < dist[u])) u = i;
    }
    if (u === -1 || dist[u] >= INF) {
      steps.push({type: 'done', note: 'No quedan nodos alcanzables: termino.'});
      return {steps, dist, prev};
    }

    used[u] = true;
    steps.push({type: 'pick', u, note: `Fijo ${g.nodes[u]} con dist=${dist[u]}`});

    for (let v = 0; v < n; v++) {
      const ww = g.w[u][v];
      if (ww == null) continue;
      if (used[v]) continue;

      const old = dist[v];
      const cand = dist[u] + ww;
      if (cand < old) {
        dist[v] = cand;
        prev[v] = u;
        steps.push({
          type: 'relax',
          u,
          v,
          old,
          next: cand,
          note: `Relajo ${g.nodes[u]}→${g.nodes[v]} (w=${ww}). dist: ${fmt(old)} → ${cand}`,
        });
      } else {
        steps.push({
          type: 'relax',
          u,
          v,
          old,
          next: old,
          note: `No mejora ${g.nodes[u]}→${g.nodes[v]} (w=${ww}). dist queda en ${fmt(old)}`,
        });
      }
    }
  }

  steps.push({type: 'done', note: 'Terminé.'});
  return {steps, dist, prev};
}

export function DijkstraPlayground(): React.JSX.Element {
  const [presetIndex, setPresetIndex] = React.useState(0);
  const g = PRESETS[presetIndex];
  const [source, setSource] = React.useState(0);

  const [{steps, dist, prev}, setRun] = React.useState(() => computeSteps(g, source));
  const [k, setK] = React.useState(0);
  const [highlight, setHighlight] = React.useState<{u: number; v?: number} | null>(null);

  React.useEffect(() => {
    setRun(computeSteps(g, source));
    setK(0);
    setHighlight(null);
  }, [presetIndex, source]);

  const step = steps[k] ?? null;

  function next() {
    const s = steps[k];
    if (!s) return;
    if (s.type === 'pick') setHighlight({u: s.u});
    else if (s.type === 'relax') setHighlight({u: s.u, v: s.v});
    else setHighlight(null);
    setK((x) => Math.min(x + 1, steps.length));
  }

  function reset() {
    setRun(computeSteps(g, source));
    setK(0);
    setHighlight(null);
  }

  return (
    <div style={{display: 'grid', gap: 16}}>
      <p>
        Dijkstra paso a paso. <strong>Restricción:</strong> pesos no negativos.
      </p>

      <div style={{display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center'}}>
        <label>
          Preset:{' '}
          <select value={presetIndex} onChange={(e) => setPresetIndex(Number(e.target.value))}>
            {PRESETS.map((p, i) => (
              <option key={p.name} value={i}>
                {p.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Origen:{' '}
          <select value={source} onChange={(e) => setSource(Number(e.target.value))}>
            {g.nodes.map((n, i) => (
              <option key={n} value={i}>
                {n}
              </option>
            ))}
          </select>
        </label>

        <button onClick={next} disabled={k >= steps.length}>
          Paso siguiente
        </button>
        <button onClick={reset}>Reset</button>
      </div>

      <div>
        <h3>Distancias</h3>
        <table>
          <thead>
            <tr>
              <th>Nodo</th>
              <th>dist</th>
              <th>prev</th>
            </tr>
          </thead>
          <tbody>
            {g.nodes.map((name, i) => {
              const isU = highlight?.u === i;
              const isV = highlight?.v === i;
              return (
                <tr key={name} style={{background: isU ? '#dbeafe' : isV ? '#ffe8a3' : 'transparent'}}>
                  <td>
                    <strong>{name}</strong>
                  </td>
                  <td>{fmt(dist[i])}</td>
                  <td>{prev[i] === -1 ? '—' : g.nodes[prev[i]]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div>
        <h3>Paso actual</h3>
        <pre style={{whiteSpace: 'pre-wrap'}}>{step ? step.note : '—'}</pre>
      </div>
    </div>
  );
}
