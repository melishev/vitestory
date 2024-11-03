import { defineConfig } from 'vitepress'

export default defineConfig({
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
})