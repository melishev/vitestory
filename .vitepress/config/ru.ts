import { defineConfig } from 'vitepress'

import { sidebarComponents, sidebarComponentsControllers, sidebarComponentsPrimitives } from './utils'

export const ru = defineConfig({
  lang: 'ru-RU',
  description: 'Документация по ViteStory. Плагин для документирования компонентов в VitePress.',

  themeConfig: {
    nav: [
      { text: 'Начало', link: '/ru/getting-started' },
      { text: 'Компоненты', link: '/ru/components' },
    ],

    sidebar: [
      { text: 'Еще один?', link: '/ru/yet-another' },
      { text: 'Начало', link: '/ru/getting-started' },
      {
        text: 'Модули',
        items: [
          { text: 'Парсер API', link: '' },
          { text: 'Парсер Историй', link: '' },
          { text: 'Стратегии рендера', link: '' },
        ],
      },
      {
        text: 'Компоненты',
        items: [
          ...sidebarComponents,
          { text: 'Контроллеры', items: sidebarComponentsControllers },
          { text: 'Примитивы', items: sidebarComponentsPrimitives },
        ],
      },
    ],

    editLink: {
      pattern: 'https://github.com/melishev/vitestory/edit/master/docs/:path',
      text: 'Редактировать эту страницу на GitHub',
    },

    footer: {
      copyright: 'Copyright © 2019-present Matvey Melishev',
    },

    outline: { label: 'Содержание' },
    docFooter: {
      prev: 'Предыдущая страница',
      next: 'Следующая страница',
    },
    lightModeSwitchTitle: 'Переключить на светлую тему',
    darkModeSwitchTitle: 'Переключить на тёмную тему',
    langMenuLabel: 'Изменить язык',
  },
})
