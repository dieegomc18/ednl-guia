import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'EDNL',
  tagline: 'Guía modo profe + labs interactivos',
  favicon: 'img/favicon.ico',

  // GitHub Pages
  url: 'https://dieegomc18.github.io',
  baseUrl: '/ednl-guia/',
  organizationName: 'dieegomc18',
  projectName: 'ednl-guia',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/dieegomc18/ednl-guia/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  // Local search (no Algolia)
  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['es'],
        docsRouteBasePath: '/',
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'EDNL',
      items: [
        {to: '/labs/heap', label: 'Heap Lab', position: 'left'},
        {to: '/labs/dijkstra', label: 'Dijkstra Lab', position: 'left'},
        {to: '/recursos', label: 'Recursos', position: 'left'},
        {
          href: 'https://github.com/dieegomc18/ednl-guia',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Sitio',
          items: [
            {label: 'Recursos', to: '/recursos'},
            {label: 'Heap Lab', to: '/labs/heap'},
            {label: 'Dijkstra Lab', to: '/labs/dijkstra'},
          ],
        },
        {
          title: 'PDFs',
          items: [
            {
              label: 'Teoría (PDF)',
              href: '/ednl/TeoriaEDNL.pdf',
              prependBaseUrlToHref: true,
              'data-noBrokenLinkCheck': true,
            },
            {
              label: 'Prácticas (PDF)',
              href: '/ednl/PracticasEDNL.pdf',
              prependBaseUrlToHref: true,
              'data-noBrokenLinkCheck': true,
            },
            {
              label: 'Tipo examen (PDF)',
              href: '/ednl/EjerciciosTipoExamen.pdf',
              prependBaseUrlToHref: true,
              'data-noBrokenLinkCheck': true,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} EDNL`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['cpp'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
