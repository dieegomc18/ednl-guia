import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'guia-completa',
    'teoria/index',
    'practicas/index',
    {
      type: 'category',
      label: 'Árboles (núcleo)',
      items: [
        'arboles/recorridos',
        'arboles/abin-agen',
        'arboles/abb',
        'arboles/avl',
        'arboles/heap',
      ],
    },
    {
      type: 'category',
      label: 'Hash (núcleo)',
      items: ['hash/colisiones'],
    },
    {
      type: 'category',
      label: 'Grafos (núcleo)',
      items: ['grafos/dijkstra', 'grafos/mst'],
    },
    {
      type: 'category',
      label: 'Estrategia de examen',
      items: ['estrategia/examen'],
    },
  ],
};

export default sidebars;
