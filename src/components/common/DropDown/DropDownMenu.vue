<template>
  <div class="drop-down-menu">
    <ul :class="showClass">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
import { computed, toRefs, unref } from 'vue'
export default {
  name: 'DropDownMenu',
  props: {
    placement: {
      type: String,
      default: 'left',
      validator (val) {
        return ['right', 'left', 'center'].indexOf(val) > -1
      }
    }
  },
  setup (props) {
    const { placement } = toRefs(props)
    const showClass = computed(() => {
      return [unref(placement)]
    })
    return {
      showClass
    }
  }
}
</script>

<style>
</style>
