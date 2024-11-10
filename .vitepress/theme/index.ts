/* eslint-disable simple-import-sort/imports */
import 'vitestory/components/style'

import DefaultTheme from 'vitepress/theme'
import './index.css'
import type { Theme } from 'vitepress'

const theme: Theme = {
  ...DefaultTheme,
  async enhanceApp({ app }) {
    const style = await import('vitestory/components/style?raw')
    app.provide('additionalStyles', style.default)
  },
}

export default theme
