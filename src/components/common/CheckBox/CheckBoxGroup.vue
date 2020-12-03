<template>
  <div class="check-box-group-wrap">
    <slot></slot>
  </div>
</template>
<script>
import { toRefs } from 'vue'
import { useCheckBoxGroupEvents } from './use'

export default {
  name: 'CheckBoxGroup',
  props: {
    modelValue: [Array]
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const { modelValue } = toRefs(props)
    const [checkBoxGroup, handlePushItem, handleRemoveItem] = useCheckBoxGroupEvents(emit, modelValue)
    return {
      checkBoxGroup, handlePushItem, handleRemoveItem
    }
  }
}
</script>
<style lang="less">
</style>
