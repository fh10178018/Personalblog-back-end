<template>
  <td :style="showStyle">
    <slot>暂无</slot>
  </td>
</template>

<script>
import { computed, toRefs, unref } from 'vue'
export default {
  name: 'TableColumn',
  props: {
    width: [String, Number]
  },
  setup (props) {
    const { width } = toRefs(props)
    const showStyle = computed(() => {
      return {
        width: typeof unref(width) === 'string' ? unref(width) : unref(width) + 'px'
      }
    })
    return {
      ...toRefs(props),
      showStyle
    }
  }
}
</script>
<style lang="less">
td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
