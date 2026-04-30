import React from 'react';

type Mode = 'encadenamiento' | 'abierto';

const STEPS: Record<Mode, string[]> = {
  encadenamiento: [
    'Calculo h(clave) → posición p.',
    'Si hay colisión, inserto en la lista (cadena) de p.',
    'Búsqueda: recorro solo la cadena de p.',
    'Coste esperado: O(1) si el factor de carga es razonable.',
  ],
  abierto: [
    'Calculo h(clave) → posición p.',
    'Si hay colisión, aplico sondeo (p+1, p+2, ... mod m).',
    'Inserto en la primera celda libre encontrada.',
    'Búsqueda: sigo el mismo sondeo hasta encontrar clave o celda vacía.',
  ],
};

export function HashStepper(): React.JSX.Element {
  const [mode, setMode] = React.useState<Mode>('encadenamiento');
  const [k, setK] = React.useState(0);
  const steps = STEPS[mode];
  React.useEffect(() => setK(0), [mode]);

  return (
    <div style={{display: 'grid', gap: 12}}>
      <div style={{display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center'}}>
        <label>
          Método:{' '}
          <select value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
            <option value="encadenamiento">Encadenamiento</option>
            <option value="abierto">Direccionamiento abierto</option>
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
