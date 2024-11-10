# What is ViteStory?

ViteStory is an extension for [VitePress](https://vitepress.dev/), designed to document UI components within a unified environment. It combines the capabilities of VitePress for creating and managing documentation with functionality similar to [Storybook](https://storybook.js.org/), [Histoire](https://histoire.dev/), and [Styleguidist](https://vue-styleguidist.github.io/), allowing developers not only to describe components but also to visually test them in an isolated environment.

## Why?

Today, many projects use VitePress for showcasing UI Kits, such as [Codex](https://doc.wikimedia.org/codex/main/components/overview.html), [shadcn-vue](https://www.shadcn-vue.com/), [Radix Vue](https://www.radix-vue.com/overview/getting-started), and others. However, developers often spend a significant amount of time manually documenting components, which becomes especially challenging when updates are required.

ViteStory aims to automate this process while retaining flexibility. Developers can configure projects minimally, with ViteStory handling the routine tasks of creating and updating documentation.

## Why Not Storybook?

Storybook was originally developed with React in mind, so full support for Vue components, especially single-file components (SFCs), remained limited for a long time. This led Vue developers to seek alternatives or create custom solutions for documenting their libraries.

With VitePress, which allows Vue to be used for creating and managing documentation, these limitations are removed. Now, Vue developers can build documentation for their UI components in a more native environment. ViteStory gives developers flexibility in organizing and presenting their components without having to adapt to React-oriented solutions.

## Why Not Histoire?

Histoire was a breakthrough in documenting Vue components, solving many of Storybook's issues. However, it has its own limitations that can affect flexibility and scalability.

#### Performance and Build Limitations
Histoire attempts to build all components at startup, slowing down the process in large collections. ViteStory, based on VitePress, instead builds pages on demand as they are visited, improving loading speed and development performance.

#### Limited Customization and Extensibility
Histoire’s documentation for creating plugins is limited, making it challenging to extend and customize for non-standard requirements. Additionally, as a standalone application, Histoire lacks the flexibility of VitePress in terms of integration and customization. ViteStory inherits VitePress's customization options and functionalities, granting users access to a broad plugin ecosystem and the ability to easily adapt documentation to their needs.

#### Dependency on Development Team
Histoire’s future relies entirely on its developers, and any major improvements require their involvement. ViteStory, by contrast, relies on the stable VitePress platform, reducing reliance on a single tool and sharing development between teams working on Vite and VitePress. This makes ViteStory more sustainable and flexible in its growth.

## Future and Goals

ViteStory aims to become the primary tool for documenting UI Kits in the Vite ecosystem. We adhere to a philosophy of minimal complexity and will always build upon the capabilities of VitePress, avoiding excessive solutions.

In the long term, ViteStory will evolve as a simple and flexible tool, providing users with a ready-made structure for describing and showcasing components that integrates easily with the Vue and Vite ecosystem.
