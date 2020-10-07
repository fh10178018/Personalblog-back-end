<template>
  <div
    class="btn-slider-wraper"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="onButtonDown"
    @touchstart="onButtonDown"
    :style="wrapperStyle"
    :class="{ hover: hovering, dragging: dragging }"
  >
    <div
      class="btn-slider"
      :class="{ hover: hovering, dragging: dragging }"
    ></div>
  </div>
</template>

<script>
import {
  toRefs,
  inject
} from 'vue'
import { useButtonSlider, useMouseEvent } from './use'

export default {
  name: 'ButtonSlider',
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
  setup (props, { emit }) {
    const { verticcal, value } = toRefs(props)
    const Slider = inject('Slider', {})

    const {
      disabled,
      currentPosition,
      slidersize,
      step,
      max,
      min,
      precision,
      wrapperStyle
    } = useButtonSlider(Slider, value, verticcal)
    const {
      hovering,
      dragging,
      handleMouseEnter,
      handleMouseLeave,
      onButtonDown
    } = useMouseEvent(
      disabled,
      verticcal,
      currentPosition,
      slidersize,
      step,
      max,
      min,
      precision,
      emit,
      Slider
    )

    return {
      hovering,
      dragging,
      wrapperStyle,
      handleMouseEnter,
      handleMouseLeave,
      onButtonDown
    }
  }
}
</script>

<style lang="less">
.btn-slider-wraper{
  height: 32px;
  width: 32px;
  position: absolute;
  top: -13px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition:transform 0.5s;
  .hover{
    cursor: grab;
    transform: scale(1.2);
  }
  .dragging{
    cursor: grabbing;
    transform: scale(1.2);
  }
  .btn-slider{
    height: 16px;
    width: 16px;
    border: 2px solid #409eff;
    background-color: #fff;
    border-radius:50%;
  }
}
</style>
