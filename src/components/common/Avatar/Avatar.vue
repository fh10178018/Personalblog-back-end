<template>
  <div class="avatar-wrap"
       :class="showClass"
       :style="showStyle">
    <span>
      <img v-if="showImg"
           :src="src">
      <slot></slot>
    </span>
  </div>
</template>

<script>
import { computed, toRefs, unref } from 'vue'
export default {
  name: 'Avatar',
  props: {
    size: {
      type: Number,
      default: 70
    },
    type: {
      type: String,
      default: 'circle'
    },
    src: String
  },
  setup (props, { slots }) {
    const { size, type } = toRefs(props)
    const showStyle = computed(() => {
      return {
        width: unref(size) + 'px',
        height: unref(size) + 'px'
      }
    })
    const showClass = computed(() => {
      return [
        unref(type)
      ]
    })
    const showImg = computed(() => {
      return !slots.default
    })
    return {
      showStyle,
      showClass,
      showImg,
      ...toRefs(props)
    }
  }
}
</script>

<style lang="less">
.avatar-wrap {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: var(--theme-color);
  overflow: hidden;
  span {
    font-weight: 600;
    color: var(--main-background-color);
  }
}
.avatar-wrap.circle {
  border-radius: 50%;
}
.avatar-wrap.square {
  border-radius: 5px;
}
</style>
