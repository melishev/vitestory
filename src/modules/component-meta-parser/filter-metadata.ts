import type { ComponentMeta } from 'vue-component-meta';

type FilteredComponentMeta = {
  props: Pick<ComponentMeta['props'][number], 'name' | 'description' | 'required' | 'type' | 'default' | 'schema'>[];
  events: Pick<ComponentMeta['events'][number], 'name' | 'description' | 'type'>[];
  slots: Pick<ComponentMeta['slots'][number], 'name' | 'description'>[];
}

export default function(meta: Partial<ComponentMeta>): FilteredComponentMeta {
  // console.time('      props - reduce')
  const props = meta.props!.reduce((acc, curr) => {
    if (curr.global) return acc

    acc.push({
      name: curr.name,
      description: curr.description,
      required: curr.required,
      type: curr.type,
      default: curr.default,
      schema: structuredClone(curr.schema),
    })

    return acc
  }, [] as FilteredComponentMeta['props'])
  // console.timeEnd('      props - reduce')

  // console.time('      events - map')
  const events: FilteredComponentMeta['events'] = meta.events!.map((curr) => {
    return {
      name: curr.name,
      description: curr.description,
      type: curr.signature,
    }
  })
  // console.timeEnd('      events - map')

  // console.time('      slots - map')
  const slots: FilteredComponentMeta['slots'] = meta.slots!.map((curr) => {
    return {
      name: curr.name,
      description: curr.description,
    }
  })
  // console.timeEnd('      slots - map')

  return {
    props,
    events,
    slots,
  }
}
