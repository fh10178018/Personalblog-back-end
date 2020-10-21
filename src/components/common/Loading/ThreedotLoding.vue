<template>
  <div class="three-dot">
    <div v-for="(item, index) in dotList"
         :class="item"
         :key="index"
         :style="dotStyle(index)"></div>
  </div>
</template>

<script>
import {
  ref,
  unref,
  reactive,
  computed
} from 'vue'
export default {
  name: 'ThreedotLoading',
  props: {
    backgroundColor: {
      type: String,
      default: 'var(--theme-color)'
    }
  },
  setup (props) {
    const { backgroundColor } = unref(props)
    const dotLeft = ref(6.4)
    const dotList = reactive(['dot dot1', 'dot dot2', 'dot dot3'])

    const dotStyle = computed(() => {
      return index => {
        return [
          { left: unref(dotLeft) * index + (index + 1) * 6 + 'px' },
          { backgroundColor: unref(backgroundColor) }
        ]
      }
    })
    return {
      dotStyle,
      dotList
    }
  }
}
</script>

<style lang="less">
.dot-wrap{
  width: 51px;
  height: 100%;
}
.three-dot{
  position: relative;
  width: 51px;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    position: absolute;
    top: calc(50% - 5px);
  }
  .dot1 {
    animation: dot-jump 0.5s  alternate infinite;
  }
  .dot2 {
    animation: dot-jump 0.5s 0.2s  alternate infinite;
  }
  .dot3 {
    animation: dot-jump 0.5s 0.4s  alternate infinite;
  }
}
@keyframes dot-jump {
  0% {
    -webkit-transform: translateY(7px);
    transform: translateY(7px);
  }
  100% {
    -webkit-transform: translateY(-7px);
    transform: translateY(-7px);
  }
}
</style>
