import React from 'react';
import Layout from '@theme/Layout';

import {HeapPlayground} from '../../components/labs/HeapPlayground';

export default function HeapLabPage(): React.JSX.Element {
  return (
    <Layout title="Heap Lab" description="Heap interactivo (MVP)">
      <main className="container margin-vert--lg">
        <h1>Heap Playground</h1>
        <HeapPlayground />
      </main>
    </Layout>
  );
}
