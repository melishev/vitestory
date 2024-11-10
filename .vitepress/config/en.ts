import { defineConfig } from 'vitepress'

import { sidebarComponents, sidebarComponentsControllers, sidebarComponentsPrimitives } from './utils'

export const en = defineConfig({
  lang: 'en-US',
  description: 'ViteStory documentation. A plugin for documenting components in VitePress.',

  themeConfig: {
    nav: [
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Components', link: '/components' },
    ],

    sidebar: [
      { text: 'Yet another?', link: '/yet-another' },
      { text: 'Getting Started', link: '/getting-started' },
      {
        text: 'Modules',
        items: [
          { text: 'API Parser', link: '' },
          { text: 'Story Parser', link: '' },
          { text: 'Render Strategies', link: '' },
        ],
      },
      {
        text: 'Components',
        items: [
          ...sidebarComponents,
          { text: 'Controllers', items: sidebarComponentsControllers },
          { text: 'Primitives', items: sidebarComponentsPrimitives },
        ],
      },
    ],

    editLink: {
      pattern: 'https://github.com/melishev/vitestory/edit/master/docs/:path',
      text: 'Edit this page on GitHub',
    },

    footer: {
      copyright: 'Copyright © 2019-present Matvey Melishev',
    },
  },
})
