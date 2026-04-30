import React from 'react';

type Algo = 'kruskal' | 'prim';

const KRUSKAL = [
  'Ordeno aristas por peso.',
  'Recorro en orden: si no forma ciclo, la añado al MST.',
  'Uso Union-Find para detectar ciclos eficientemente.',
  'Paro cuando tengo |V|-1 aristas.',
];

const PRIM = [
  'Elijo un nodo inicial.',
  'Mantengo el conjunto de nodos ya en el MST.',
  'En cada paso, añado la arista mínima que conecta el MST con un nodo fuera.',
  'Repito hasta incluir todos los nodos.',
];

export function MstStepper(): React.JSX.Element {
  const [algo, setAlgo] = React.useState<Algo>('kruskal');
  const [k, setK] = React.useState(0);
  const steps = algo === 'kruskal' ? KRUSKAL : PRIM;
  React.useEffect(() => setK(0), [algo]);

  return (
    <div style={{display: 'grid', gap: 12}}>
      <div style={{display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center'}}>
        <label>
          Algoritmo:{' '}
          <select value={algo} onChange={(e) => setAlgo(e.target.value as Algo)}>
            <option value="kruskal">Kruskal</option>
            <option value="prim">Prim</option>
          </select>
        </label>
        <button onClick={() => setK((x) => Math.min(x + 1, steps.length))} disabled={k >= steps.length}>
          Paso siguiente
        </button>
        <button onClick={() => setK(0)}>Reset</button>
      </div>
      <ol>
        {steps.slice(0, k).map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>
    </div>
  );
}
