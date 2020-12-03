<template>
  <div class="select"
       :style="selectStyle"
       @click.stop="toggleDropDown"
       v-clickoutside="handleFade">
    <InputString :readonly="true"
                 placeholder="请选择"
                 autocomplete="off"
                 v-model="nativeSelectLabel"
                 v-resize="getInputSize"
                 @focus="handleFocus"
                 @blur="handleBlur"
                 @keydown.esc.stop.prevent="visible = false"
                 :disabled="curDisabled"
                 ref="input">
      <template v-slot:suffix><i class="fa fa-chevron-down"
           :class="{iconReverse:visible}"></i></template>
    </InputString>
    <div class="select-dropdown"
         :style="showStyle"
         v-show="visible">
      <ul @mousedown.prevent>
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  unref,
  reactive,
  computed,
  ref,
  toRefs,
  provide
} from 'vue'
import InputString from '../InputString/InputString.vue'
export default {
  components: { InputString },
  name: 'Select',
  props: {
    modelValue: [String, Number],
    disabled: {
      type: Boolean,
      default: false
    },
    style: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  setup (props, { emit, slots }) {
    const input = ref(null)
    const { modelValue, disabled, style } = toRefs(props)
    const curDisabled = computed(() => unref(disabled))
    const selectStyle = computed(() => unref(style))
    const nativeSelectValue = ref(unref(modelValue))
    const nativeSelectLabel = ref('')
    const inputSize = reactive({
      width: 0,
      height: 0
    })
    const visible = ref(false)
    const inputIsFocus = ref(false)
    const softFocus = ref(false)
    const getInputSize = val => { // 用来获取当前滑动按钮的宽度或长度
      inputSize.width = val.width
      inputSize.height = val.height
    }
    const showStyle = computed(() => {
      return {
        width: unref(inputSize).width + 'px',
        top: unref(inputSize).height + 5 + 'px'
      }
    })
    const handleFade = () => {
      visible.value = false
      inputIsFocus.value = false
      unref(input).blur()
    }
    const handleFocus = () => {
      if (!unref(softFocus)) {
        visible.value = true
        inputIsFocus.value = true
      } else {
        softFocus.value = false
      }
    }
    const handleBlur = () => {
      softFocus.value = false
    }
    const handleOption = item => {
      if (!unref(visible)) {
        toggleDropDown()
      } else {
        nativeSelectLabel.value = item.label
        emit('update:modelValue', item.value)
        emit('change', item.value)
        handleFade()
      }
    }
    const setOption = item => {
      nativeSelectLabel.value = item.label
    }
    const toggleDropDown = () => {
      if (!unref(curDisabled)) {
        if (unref(inputIsFocus)) {
          inputIsFocus.value = false
        } else {
          visible.value = !unref(visible)
        }
        if (unref(visible)) {
          unref(input).focus()
        }
      }
    }
    provide(
      'Select',
      reactive({
        name: 'Select',
        handleOption,
        setOption,
        nativeSelectValue
      })
    )
    return {
      ...unref(props),
      getInputSize,
      showStyle,
      handleFocus,
      handleBlur,
      visible,
      nativeSelectValue,
      handleFade,
      input,
      curDisabled,
      toggleDropDown,
      selectStyle,
      nativeSelectLabel
    }
  }
}
</script>
<style lang="less">
.select {
  position: relative;
  color: var(--main-font-color);
  z-index: 1;
  .iconReverse {
    transform: rotate(180deg);
  }
  font-weight: 100;
  .select-dropdown {
    position: absolute;
    border: 1px solid var(--main-background-color);
    border-radius: 4px;
    background-color: var(--main-color);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    > ul {
      list-style: none;
      margin: 5px 0;
      max-height: 135px;
      overflow-y: auto;
      overflow-x: hidden;
      > li {
        cursor: pointer;
        padding: 0 10px;
        margin: 0 -10px;
        line-height: 34px;
        > span {
          margin-left: 10px;
        }
      }
      .active {
        font-weight: bold;
        background-color: var(--lighter-color) !important;
      }
      > li:hover {
        background-color: var(--main-background-color);
      }
    }
  }
}
</style>
