import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Home(): JSX.Element {
  return (
    <Layout title="EDNL" description="Guía modo profe + labs interactivos">
      <main className="container margin-vert--lg">
        <h1>EDNL</h1>
        <p>Guía de estudio (modo profe) + labs interactivos + recursos (PDFs/HTML).</p>

        <div style={{display: 'flex', gap: 12, flexWrap: 'wrap'}}>
          <Link className="button button--primary" to="/intro">
            Empezar (Intro)
          </Link>
          <Link className="button button--secondary" to="/guia-completa">
            Guía completa
          </Link>
          <Link className="button button--secondary" to="/labs/heap">
            Heap Lab
          </Link>
          <Link className="button button--secondary" to="/labs/dijkstra">
            Dijkstra Lab
          </Link>
          <Link className="button button--secondary" to="/recursos">
            Recursos
          </Link>
        </div>
      </main>
    </Layout>
  );
}
