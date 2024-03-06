import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Anye Docker Proxy',
  tagline: '多平台容器镜像代理服务，支持 Docker Hub, GitHub, Google, k8s, Quay, Microsoft 等镜像仓库',
  favicon: 'img/favicon.png',
  url: 'https://mirror.anye.in',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: undefined,
          },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Anye Docker Proxy',
        items: [
          {
            position: 'left',
            label: '使用文档',
            to: '/doc',
          },
          {
            position: 'left',
            label: '致谢',
            to: '/thanks',
          }
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: '使用文档',
                to: '/doc',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Anyeの小站',
                href: 'https://www.anye.xyz',
              },
              {
                label: 'Anyeの导航站',
                href: 'https://hello.anye.xyz',
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} <a href="/">Anye Docker Proxy</a>. All Rights Reserved.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
