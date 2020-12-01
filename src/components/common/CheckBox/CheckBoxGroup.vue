<template>
  <div class="check-box-group-wrap">
    <slot></slot>
  </div>
</template>
<script>
import { onMounted, reactive, unref } from 'vue'
import { useEmitter } from '../../../utils/emmiter'

export default {
  name: 'CheckBoxGroup',
  props: {
    modelValue: [Array]
  },
  setup (props, { slots }) {
    const { dispatch, on, off } = useEmitter()
    const checkBoxGroup = reactive([])
    const pushItem = val => {
      unref(checkBoxGroup).push(val)
      dispatch('FormItem', 'form-change', unref(checkBoxGroup))
    }
    const removeItem = val => {
      const index = unref(checkBoxGroup).indexOf(val)
      unref(checkBoxGroup).splice(index, 1)
      dispatch('FormItem', 'form-change', unref(checkBoxGroup))
    }
    const addEvents = () => {
      if (slots) {
        on('push-item', pushItem) // 监听触发
        on('remove-item', removeItem) // 监听触发
      }
    }
    onMounted(() => {
      addEvents()
    })
    return {
      removeEvents: off
    }
  }
}
</script>
<style lang="less">
</style>
