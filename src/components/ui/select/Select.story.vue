<script setup lang="ts">
import type { ViteStoryExposeOptions } from 'vitestory'

import Select from './Select.vue'
// import SelectContent from './SelectContent.vue'
import SelectGroup from './SelectGroup.vue'
import SelectItem from './SelectItem.vue'
import SelectItemText from './SelectItemText.vue'
import SelectLabel from './SelectLabel.vue'
import SelectScrollDownButton from './SelectScrollDownButton.vue'
import SelectScrollUpButton from './SelectScrollUpButton.vue'
import SelectSeparator from './SelectSeparator.vue'
import SelectTrigger from './SelectTrigger.vue'
import SelectValue from './SelectValue.vue'

defineExpose<ViteStoryExposeOptions>({
  title: 'Select',
  description: 'Displays a list of options for the user to pick from—triggered by a button.',
  components: [
    Select,
    SelectGroup,
    SelectItem,
    SelectItemText,
    SelectLabel,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
  ],
})
</script>
