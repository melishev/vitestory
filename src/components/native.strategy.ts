import type { Ref, VNode } from 'vue'
import { render, watch } from 'vue'

export default function (host: Ref<HTMLElement | null>, template: VNode) {
  watch([host, () => template], () => {
    if (!host.value) return

    render(template, host.value)
  })
}
