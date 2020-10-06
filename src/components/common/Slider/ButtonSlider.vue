<template>
  <div
    class="btn-slider"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="onButtonDown"
    @touchstart="onButtonDown"
  >

  </div>
</template>

<script>
import {
  unref,
  ref,
  toRefs,
  computed,
  inject
} from 'vue'
const useButtonSlider = (Slider, value) => {
  const disabled = computed(() => {
    return Slider.disabled
  })

  const max = computed(() => {
    return Slider.max
  })

  const min = computed(() => {
    return Slider.min
  })

  const currentPosition = computed(() => {
    return `${((value - unref(min)) / (unref(max) - unref(min))) * 100}%`
  })

  return {
    disabled,
    max,
    min,
    currentPosition
  }
}
const useMouseEvent = (disabled, vertical, currentPosition) => {
  const hovering = ref(false) // 是否接触到按钮
  const dragging = ref(false) // 是否正在拖动该按钮
  const isClick = ref(false) // 按钮是否被点击
  const startY = ref(0) // y轴滑动距离
  const startX = ref(0) // x轴滑动距离
  const startPosition = ref(0.0) // 用于记录开始位置
  const newPosition = ref(0.0) // 用于记录新的位置

  const handleMouseEnter = () => {
    hovering.value = true
  }

  const handleMouseLeave = () => {
    hovering.value = false
  }

  const onButtonDown = event => {
    if (unref(disabled)) return null // 如果被静止，触发事件取消
    event.preventDefault() // 取消事件的默认的动作
    onDragStart(event)
  }

  const  onDragStart = event => { // 用于初始化拖动前的数值
    dragging.value = true
    isClick.value = true
    if (event.type === 'touchstart') { // 非鼠标操作，即手机端触摸
      event.clientY = event.touches[0].clientY
      event.clientX = event.touches[0].clientX
    }
    if (vertical) {
      startY.value = event.clientY
    } else {
      startX.value = event.clientX
    }
    startPosition.value = parseFloat(currentPosition) // 获得当前位置,去除%
    newPosition.value = unref(startPosition)
  }

  const onDragging = event => {
    if (unref(dragging)) {
      isClick.value = false // 拖动时，点击为false
    }
  }

  return {
    hovering,
    handleMouseEnter,
    handleMouseLeave,
    onButtonDown
  }
}
export default {
  name: "ButtonSlider",
  props: {
    value: {
      type: Number,
      default: 0
    },
    vertical: { // 按钮拖动方式是否垂直
      type: Boolean,
      default: false
    }
  },
  inject: ['Slider'],
  setup (props) {
    const { verticcal, value } = toRefs(props)
    const Slider = inject('Slider', {})

    const { disabled, currentPosition } = useButtonSlider(Slider, value)
    const {
      hovering
    } = useMouseEvent(disabled, verticcal, currentPosition)
  }
}
</script>

<style scoped>

</style>
