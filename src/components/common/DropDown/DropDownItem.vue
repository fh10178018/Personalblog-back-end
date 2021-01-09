<template>
  <li v-if="type === 'link'">
    <slot></slot>
  </li>
  <div class="drop-down-item-div"
       v-else>
    <slot></slot>
  </div>
</template>

<script>
import { toRefs } from 'vue'
export default {
  name: 'DropDownItem',
  props: {
    type: {
      type: String,
      default: 'link'
    }
  },
  setup (props) {
    return {
      ...toRefs(props)
    }
  }
}
</script>

<style lang="less">
</style>
