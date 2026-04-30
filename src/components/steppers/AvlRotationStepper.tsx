import React from 'react';

type Case = 'LL' | 'RR' | 'LR' | 'RL';

const EXPLANATIONS: Record<Case, string[]> = {
  LL: [
    'Caso LL: inserción en el subárbol izquierdo del hijo izquierdo.',
    'Solución: rotación simple a la derecha sobre el nodo desbalanceado.',
  ],
  RR: [
    'Caso RR: inserción en el subárbol derecho del hijo derecho.',
    'Solución: rotación simple a la izquierda sobre el nodo desbalanceado.',
  ],
  LR: [
    'Caso LR: inserción en el subárbol derecho del hijo izquierdo.',
    'Solución: rotación izquierda en el hijo izquierdo.',
    'Luego rotación derecha en el nodo desbalanceado.',
  ],
  RL: [
    'Caso RL: inserción en el subárbol izquierdo del hijo derecho.',
    'Solución: rotación derecha en el hijo derecho.',
    'Luego rotación izquierda en el nodo desbalanceado.',
  ],
};

export function AvlRotationStepper(): React.JSX.Element {
  const [c, setC] = React.useState<Case>('LL');
  const [k, setK] = React.useState(0);
  const steps = EXPLANATIONS[c];
  React.useEffect(() => setK(0), [c]);

  return (
    <div style={{display: 'grid', gap: 12}}>
      <div style={{display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center'}}>
        <label>
          Caso:{' '}
          <select value={c} onChange={(e) => setC(e.target.value as Case)}>
            <option value="LL">LL</option>
            <option value="RR">RR</option>
            <option value="LR">LR</option>
            <option value="RL">RL</option>
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
