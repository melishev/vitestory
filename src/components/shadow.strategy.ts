import type { Ref, VNode } from 'vue'
import { defineCustomElement, h, inject, render, watch } from 'vue'

export default async function (host: Ref<HTMLElement | null>, template: VNode, name: string) {
  const additionalStyles = inject<string>('additionalStyles')

  watch([host, () => template], async () => {
    if (!host.value) return

    const customName = `shadow-viewer-${name.toLowerCase()}`
    const element = customElements.get(customName)

    // FIXME: when you visit the page with the component again, the connection with the controllers is lost
    if (!element) {
      const ShadowViewerElement = defineCustomElement(template, {
        styles: [additionalStyles],
      })
      customElements.define(customName, ShadowViewerElement)
    }

    render(h(customName), host.value)
  })
}
