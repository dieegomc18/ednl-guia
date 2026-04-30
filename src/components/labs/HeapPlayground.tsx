import React from 'react';

type HeapStep =
  | {type: 'compare'; i: number; j: number; note: string}
  | {type: 'swap'; i: number; j: number; note: string}
  | {type: 'done'; note: string};

function parent(i: number) {
  return Math.floor((i - 1) / 2);
}

function left(i: number) {
  return 2 * i + 1;
}

function right(i: number) {
  return 2 * i + 2;
}

function siftUpWithSteps(heap: number[], startIndex: number): {steps: HeapStep[]; result: number[]} {
  const a = heap.slice();
  const steps: HeapStep[] = [];
  let i = startIndex;
  while (i > 0) {
    const p = parent(i);
    steps.push({type: 'compare', i, j: p, note: `Comparo heap[${i}] con su padre heap[${p}]`});
    if (a[i] >= a[p]) {
      steps.push({type: 'done', note: 'Propiedad de min-heap satisfecha (no hay que flotar más).'});
      return {steps, result: a};
    }
    steps.push({type: 'swap', i, j: p, note: `Intercambio porque ${a[i]} < ${a[p]}`});
    [a[i], a[p]] = [a[p], a[i]];
    i = p;
  }
  steps.push({type: 'done', note: 'Elemento llegó a la raíz.'});
  return {steps, result: a};
}

function siftDownWithSteps(heap: number[], startIndex: number): {steps: HeapStep[]; result: number[]} {
  const a = heap.slice();
  const steps: HeapStep[] = [];
  let i = startIndex;
  while (true) {
    const l = left(i);
    const r = right(i);
    if (l >= a.length) {
      steps.push({type: 'done', note: 'No hay hijos: paro (ya es hoja).'});
      return {steps, result: a};
    }
    let m = l;
    if (r < a.length) {
      steps.push({type: 'compare', i: l, j: r, note: 'Elijo el hijo menor (para min-heap).'});
      if (a[r] < a[l]) m = r;
    }
    steps.push({type: 'compare', i, j: m, note: `Comparo padre heap[${i}] con hijo menor heap[${m}]`});
    if (a[i] <= a[m]) {
      steps.push({type: 'done', note: 'Propiedad de min-heap satisfecha (no hay que hundir más).'});
      return {steps, result: a};
    }
    steps.push({type: 'swap', i, j: m, note: `Intercambio porque ${a[i]} > ${a[m]}`});
    [a[i], a[m]] = [a[m], a[i]];
    i = m;
  }
}

export function HeapPlayground(): React.JSX.Element {
  const [heap, setHeap] = React.useState<number[]>([7, 10, 12, 15, 20, 25]);
  const [value, setValue] = React.useState<string>('');
  const [steps, setSteps] = React.useState<HeapStep[]>([]);
  const [stepIndex, setStepIndex] = React.useState<number>(0);
  const [highlight, setHighlight] = React.useState<{i: number; j: number} | null>(null);
  const [pendingResult, setPendingResult] = React.useState<number[] | null>(null);

  const currentStep = steps[stepIndex] ?? null;

  function resetDemo() {
    setHeap([7, 10, 12, 15, 20, 25]);
    setSteps([]);
    setStepIndex(0);
    setHighlight(null);
    setPendingResult(null);
    setValue('');
  }

  function startInsert() {
    const n = Number(value);
    if (!Number.isFinite(n)) return;
    const next = heap.concat([n]);
    const {steps: s, result} = siftUpWithSteps(next, next.length - 1);
    setHeap(next);
    setSteps(s);
    setStepIndex(0);
    setHighlight(null);
    setPendingResult(result);
  }

  function startExtractMin() {
    if (heap.length === 0) return;
    if (heap.length === 1) {
      setHeap([]);
      setSteps([{type: 'done', note: 'Heap quedó vacío.'}]);
      setStepIndex(0);
      setHighlight(null);
      setPendingResult(null);
      return;
    }
    const next = heap.slice();
    next[0] = next[next.length - 1];
    next.pop();
    const {steps: s, result} = siftDownWithSteps(next, 0);
    setHeap(next);
    setSteps(s);
    setStepIndex(0);
    setHighlight(null);
    setPendingResult(result);
  }

  function nextStep() {
    const s = steps[stepIndex];
    if (!s) return;
    if (s.type === 'compare' || s.type === 'swap') {
      setHighlight({i: s.i, j: s.j});
    } else {
      setHighlight(null);
    }

    const nextIndex = Math.min(stepIndex + 1, steps.length);
    setStepIndex(nextIndex);

    if (nextIndex >= steps.length && pendingResult) {
      setHeap(pendingResult);
      setPendingResult(null);
    }
  }

  return (
    <div style={{display: 'grid', gap: 16}}>
      <p>
        <strong>Min-heap</strong>. Inserta un número y observa <em>flotar</em> (sift-up). Extrae la raíz y observa{' '}
        <em>hundir</em> (sift-down).
      </p>

      <div style={{display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center'}}>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Número"
          aria-label="Número"
        />
        <button onClick={startInsert}>Insertar</button>
        <button onClick={startExtractMin}>Extraer mínimo</button>
        <button onClick={nextStep} disabled={steps.length === 0 || stepIndex >= steps.length}>
          Paso siguiente
        </button>
        <button onClick={resetDemo}>Reset</button>
      </div>

      <div>
        <h3>Array (índices)</h3>
        <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
          {heap.map((x, idx) => {
            const isHi = highlight && (idx === highlight.i || idx === highlight.j);
            return (
              <div
                key={idx}
                style={{
                  border: '1px solid var(--ifm-color-emphasis-300)',
                  padding: 8,
                  borderRadius: 8,
                  minWidth: 56,
                  background: isHi ? 'var(--ifm-color-warning-contrast-background)' : 'var(--ifm-background-surface-color)',
                }}
              >
                <div style={{fontSize: 12, opacity: 0.7}}>i={idx}</div>
                <div style={{fontSize: 18, fontWeight: 700}}>{x}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3>Paso actual</h3>
        <pre style={{whiteSpace: 'pre-wrap'}}>{currentStep ? currentStep.note : '—'}</pre>
      </div>
    </div>
  );
}
