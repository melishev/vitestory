export interface VSVariantProps {
  title?: string
  description?: string
  /** Source code of the variant */
  source?: string
  /** Center content within a variant or not */
  centering?: boolean
  /** Is “VSVariant” playground? Read more about playground */
  playground?: boolean
  /** Strategy with which the code inside the variant will be rendered. Read more about strategies */
  strategy?: 'native' | 'shadow'
}

export interface VSVariantSlots {
  /** Passes the code */
  default(): any
  /** Passes controllers to the component to control the code */
  controls(): any
}
