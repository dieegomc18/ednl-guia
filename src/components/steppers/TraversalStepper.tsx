import React from 'react';

type Node = {value: string; left?: Node; right?: Node};

const T: Node = {
  value: 'A',
  left: {value: 'B', left: {value: 'D'}, right: {value: 'E'}},
  right: {value: 'C', right: {value: 'F'}},
};

type Mode = 'pre' | 'in' | 'post' | 'bfs';

function pre(n: Node | undefined, out: string[]) {
  if (!n) return;
  out.push(n.value);
  pre(n.left, out);
  pre(n.right, out);
}

function ino(n: Node | undefined, out: string[]) {
  if (!n) return;
  ino(n.left, out);
  out.push(n.value);
  ino(n.right, out);
}

function post(n: Node | undefined, out: string[]) {
  if (!n) return;
  post(n.left, out);
  post(n.right, out);
  out.push(n.value);
}

function bfs(n: Node | undefined) {
  if (!n) return [];
  const q: Node[] = [n];
  const out: string[] = [];
  while (q.length) {
    const x = q.shift()!;
    out.push(x.value);
    if (x.left) q.push(x.left);
    if (x.right) q.push(x.right);
  }
  return out;
}

export function TraversalStepper(): React.JSX.Element {
  const [mode, setMode] = React.useState<Mode>('pre');
  const [k, setK] = React.useState(0);

  const order = React.useMemo(() => {
    const out: string[] = [];
    if (mode === 'pre') pre(T, out);
    if (mode === 'in') ino(T, out);
    if (mode === 'post') post(T, out);
    if (mode === 'bfs') return bfs(T);
    return out;
  }, [mode]);

  React.useEffect(() => setK(0), [mode]);

  return (
    <div style={{display: 'grid', gap: 12}}>
      <div style={{display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center'}}>
        <label>
          Recorrido:{' '}
          <select value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
            <option value="pre">Preorden (Nodo-Izq-Der)</option>
            <option value="in">Inorden (Izq-Nodo-Der)</option>
            <option value="post">Postorden (Izq-Der-Nodo)</option>
            <option value="bfs">Por niveles (BFS)</option>
          </select>
        </label>
        <button onClick={() => setK((x) => Math.min(x + 1, order.length))} disabled={k >= order.length}>
          Paso siguiente
        </button>
        <button onClick={() => setK(0)}>Reset</button>
      </div>

      <div>
        <div style={{opacity: 0.8}}>Orden completo:</div>
        <code>{order.join(' ')}</code>
      </div>

      <div>
        <div style={{opacity: 0.8}}>Progreso:</div>
        <code>{order.slice(0, k).join(' ') || '—'}</code>
      </div>
    </div>
  );
}
