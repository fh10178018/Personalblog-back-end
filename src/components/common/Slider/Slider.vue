<template>
<div
  :class="showClass"
>
  <div
    class="way"
    ref="slider"
    @click="onSliderClick"
    v-resize="getResize"
  >
    <transition>
      <div v-if="isVerifySlider && !dragging && !isOk" class="message"><h5>请按住滑块拖动</h5></div>
    </transition>
    <ButtonSlider
      v-model="value"
      ref="btnSlider"
      :type="isVerifySlider?'verify':'number'"
    />
    <div class="pass" :style="passStyle"></div>
    <template v-if="markList.length > 0 && !isVerifySlider">
      <div
        v-for="(item, key) in markList"
        class="slider-stop"
        :key="key"
        :style="getStopStyle(item)"
      ></div>
    </template>
  </div>
</div>
</template>

<script>
import {
  toRefs,
  provide,
  reactive,
  onMounted
} from 'vue'
import ButtonSlider from './ButtonSlider'
import { useInteractive, useSlider, useValidate } from './use'
import { useEmitter } from '../../../utils/emmiter'

export default {
  name: 'Slider',
  components: { ButtonSlider },
  props: {
    vertical: { // 滑动方向是否垂直
      type: Boolean,
      default: false
    },
    min: { // 滑动框最大值
      type: Number,
      default: 0
    },
    max: { // 滑动框最小值
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    size: {
      type: String,
      default: 'normal'
    },
    modelValue: {
      type: Number,
      default: 0,
      required: true
    },
    showStops: { // 用于是否显示过程标记点
      type: Boolean,
      default: false
    },
    type: { // 滑动框类型，verify或number
      type: String,
      default: 'number'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  inject: ['FormItem'],
  setup (props, { emit }) {
    const { vertical, min, max, step, modelValue, size, type, showStops, disabled } = toRefs(props)
    const { dispatch } = useEmitter()
    const { validateState, resetValue } = useValidate()

    const {
      passStyle,
      slider,
      precision,
      value,
      oldValue,
      sliderSize,
      markList,
      getStopStyle,
      showClass,
      isVerifySlider,
      sliderDisabled,
      dragging,
      btnSlider,
      isOk
    } = useSlider(
      vertical,
      min,
      max,
      step,
      showStops,
      type,
      size,
      disabled,
      validateState
    )
    const {
      setValue,
      emitChange,
      onSliderClick,
      getResize,
      handleBlur
    } = useInteractive(
      slider,
      vertical,
      min,
      max,
      value,
      oldValue,
      modelValue,
      dispatch,
      emit,
      sliderSize,
      sliderDisabled,
      dragging,
      btnSlider,
      isVerifySlider,
      validateState,
      resetValue,
      type
    )

    provide('Slider',
      reactive({
        name: 'Slider',
        ...toRefs(props),
        value,
        sliderSize,
        precision,
        isVerifySlider,
        sliderDisabled,
        emitChange,
        dragging,
        handleBlur,
        validateState
      })
    )

    onMounted(() => {
      setValue()
    })

    return {
      ...toRefs(props),
      passStyle,
      slider,
      value,
      getStopStyle,
      markList,
      showClass,
      isVerifySlider,
      emitChange,
      onSliderClick,
      resetValue,
      btnSlider,
      getResize,
      dragging,
      isOk,
      validateState
    }
  }
}
</script>

<style lang="less">
.slider{
  width: 100%;
  .way{
    position: relative;
    cursor: pointer;
    width: auto;
  }
  .pass{
    position: absolute;
    z-index: 12;
    transition:0.5s;
  }
  .message{
    position: absolute;
    z-index: 11;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--light-color);
    user-select:none;
  }
}
.slider-number{
  height: 32px;
  .way{
    background-color:var(--main-background-color);
    height: 6px;
    margin: 11px 6px;
    border-radius: 3px;
  }
  .pass{
    height: 6px;
    background-color: var(--theme-color);
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  .slider-stop {
    position: absolute;
    z-index: 11;
    height: 6px;
    width: 6px;
    border-radius: 100%;
    background-color: var(--main-color);
    transform: translateX(-50%);
  }
}
.slider-verify{
  height: 32px;
  .way{
    border-radius: 32px;
    height: 100%;
    background-color:var(--main-background-color);
  }
  .pass{
    height: 100%;
    background-color: var(--theme-color);
    opacity: 0.3;
    border-radius: 32px;
  }
}
</style>
