import path from 'path'
import { defineConfig } from 'vitepress'
import { withViteStory } from 'vitestory'

export default withViteStory(defineConfig({
  title: "ViteStory",
  description: "A ViteStory Site",
  srcDir: "src",
  themeConfig: {
    logo: "/logo.webp",

    nav: [
      { text: "Home", link: "/" },
      {
        text: "Examples",
        items: [
          { text: "API", link: "/examples/api" },
          { text: "Markdown", link: "/examples/markdown" }
        ],
      },
    ],
  },

  vitestory: {
    distDir: 'src/examples',
    pathToTSConfig: path.resolve(__dirname, '../../../tsconfig.app.json'),
    stories: [
      path.resolve(__dirname, '../../../src/components/VSButton.story.vue')
    ]
  }
}))