<template>
  <div class="breadcrumb-wrap">
    <slot></slot>
  </div>
</template>

<script>
import { toRefs,provide } from 'vue'
export default {
  name: 'Breadcrumb',
  props: {
    separator: { // 分割符号
      type: String,
      default: '/'
    }
  },
  setup (props) {
    const { separator } = toRefs(props)
    provide('separator', separator)
  }
}
</script>

<style lang="less">
.breadcrumb-wrap {
  font-size: 14px;
}
</style>
