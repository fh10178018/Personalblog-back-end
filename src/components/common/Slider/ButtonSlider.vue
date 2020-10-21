<template>
  <div
    class="btn-slider-wraper"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="onButtonDown"
    @touchstart="onButtonDown"
    :style="wrapperStyle"
    :class="['btn-slider-' + type, dragging?'btn-slider-dragging':'']"
    ref = "btnSlider"
    v-resize="getBtnSize"
  >
    <div
      class="btn-slider"
      :class="{ hover: hovering, dragging: dragging }"
    >
      <i v-if="type === 'verify'" class="fa" :class="btnIcon"></i>
    </div>
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
    modelValue: {
      type: Number,
      default: 0
    },
    vertical: { // 按钮拖动方式是否垂直
      type: Boolean,
      default: false
    },
    type: { // 用来定义按钮类型样式
      type: String,
      default: 'number'
    }
  },
  inject: ['Slider'],
  setup (props, { emit }) {
    const { verticcal, modelValue } = toRefs(props)
    const Slider = inject('Slider', {})

    const {
      disabled,
      currentPosition,
      slidersize,
      step,
      max,
      min,
      precision,
      wrapperStyle,
      btnSize,
      totalDistance,
      btnIcon
    } = useButtonSlider(
      Slider,
      modelValue,
      verticcal
    )

    const {
      hovering,
      dragging,
      handleMouseEnter,
      handleMouseLeave,
      onButtonDown,
      getBtnSize,
      setPosition
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
      Slider,
      btnSize,
      totalDistance
    )

    return {
      ...toRefs(props),
      hovering,
      dragging,
      wrapperStyle,
      handleMouseEnter,
      handleMouseLeave,
      getBtnSize,
      onButtonDown,
      setPosition,
      btnIcon
    }
  }
}
</script>

<style lang="less">
.btn-slider-wraper{
  height: 32px;
  width: 32px;
  position: absolute;
  z-index: 13;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:0.5s;
  .hover{
    cursor: grab;
  }
  .dragging{
    cursor: grabbing;
  }
}
.btn-slider-number{
  top: -13px;
  transform: translateX(-50%);
  .btn-slider{
    height: 16px;
    width: 16px;
    border: 2px solid var(--theme-color);
    background-color: var(--main-background-color);
    border-radius:50%;
  }
  .hover, .dragging{
    transform: scale(1.2);
  }
}
.btn-slider-verify{
  .btn-slider{
    height: 100%;
    width: 100%;
    border-radius: 100%;
    box-shadow: 0 0 3px rgba(0,0,0,.3);
    background-color: var(--theme-color);
    color: var(--main-color);
    font-weight: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    i{
      transition:transform 0.3s;
    }
  }
  .hover, .dragging{
    i{
      transform: scale(1.2);
    }
  }
}
.btn-slider-dragging{
  transition:none !important;
  +.pass{
    transition:none !important;
  }
}
</style>
