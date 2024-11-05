interface VSSelectOption {
  label: string
  value: string
}

export interface VSSelectProps {
  title: string
  options: VSSelectOption[]
  placeholder?: string
}
