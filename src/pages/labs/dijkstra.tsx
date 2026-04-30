import React from 'react';
import Layout from '@theme/Layout';

import {DijkstraPlayground} from '../../components/labs/DijkstraPlayground';

export default function DijkstraLabPage(): React.JSX.Element {
  return (
    <Layout title="Dijkstra Lab" description="Dijkstra paso a paso (MVP)">
      <main className="container margin-vert--lg">
        <h1>Dijkstra Playground</h1>
        <DijkstraPlayground />
      </main>
    </Layout>
  );
}
