<template>
<div
  class="slider"
>
  <div class="way" ref="slider">
    <div class="pass" :style="passStyle"></div>
    {{value}}
    <ButtonSlider
      v-model:value="value"
    />
  </div>
</div>
</template>

<script>
import {
  toRefs,
  provide,
  reactive
} from 'vue'
import ButtonSlider from './ButtonSlider'
import { useInteractive, useSlider } from './use'

export default {
  name: 'Slider',
  components: { ButtonSlider },
  props: {
    vertical: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 1
    }
  },
  setup (props) {
    const { vertical, min, max, step } = toRefs(props)
    const { passStyle, slider, value, precision } = useSlider(
      vertical,
      min,
      max,
      step
    )
    const {
      resetSize,
      sliderSize
    } = useInteractive(
      slider,
      vertical
    )

    provide('Slider',
      reactive({
        name: 'Form',
        ...toRefs(props),
        sliderSize,
        resetSize,
        precision
      })
    )

    return {
      passStyle,
      value,
      slider
    }
  }
}
</script>

<style lang="less">
.slider{
  width: 100%;
  height: 32px;
  .way{
    background-color:var(--main-background-color);
    height: 6px;
    width: 100%;
    margin: 11px 0;
    border-radius: 3px;
    position: relative;
    cursor: pointer;
  }
  .pass{
    height: 6px;
    background-color: #409eff;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    position: absolute;
  }
}
</style>
