<template>
  <div class="markdown-wrap">
    <div class="mkEdit">
      <textarea spellcheck="false"
                :placeholder="showPlaceholder"
                :id="inputId"
                :disabled="inputDisabled"
                :readonly="readonly"
                :class="showClass"
                :autoComplete="autoComplete"
                :minlength="minlength"
                :maxlength="maxlength"
                @compositionstart="handleCompositionStart"
                @compositionupdate="handleCompositionUpdate"
                @compositionend="handleCompositionEnd"
                @input="handleInput"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
                ref="input"
                required />
      <label v-if="placeholder && !readonly">{{ placeholder }}</label>
    </div>
    <div class="resizer"></div>
    <div v-html="compiledMarkdown"
         class="showMk markdown-body"
         v-highlight></div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, nextTick, watch, unref, computed } from 'vue'
import { useInput, useValidate, useInteractive } from './use'
import { useEmitter } from '../../../utils/emmiter'
import 'highlight.js/styles/an-old-hope.css'
import 'github-markdown-css/github-markdown.css'
import marked from 'marked'

export default {
  name: 'MarkdownEditor',
  emits: ['input', 'change', 'blur', 'clear', 'focus', 'update:modelValue'],
  setup (props, { emit }) {
    const compiledMarkdown = computed(() => marked(unref(modelValue)))
    const { modelValue, validateEvent } = toRefs(props)
    const { validateResult } = useValidate()
    const { dispatch } = useEmitter()

    const state = reactive({
      focused: false,
      isComposing: false
    })
    const [
      input,
      inputDisabled,
      nativeInputValue,
      inputId,
      textLength,
      showClass,
      showPlaceholder
    ] = useInput(
      toRefs(props),
      validateResult
    )
    const handleMouseDown = () => {
      const resizerElm = document.getElementsByClassName('resizer')[0]
      const sowMkElm = document.getElementsByClassName('showMk')[0]
      const textareaElm = document.getElementsByClassName('mkEdit')[0]
      resizerElm.onmousedown = function (e) {
        var startX = e.clientX
        var resizeW = resizerElm.clientWidth
        var sumLen = textareaElm.clientWidth + sowMkElm.clientWidth + resizeW
        resizerElm.left = resizerElm.offsetLeft
        document.onmousemove = function (e) {
          var endX = e.clientX
          var moveLen = resizerElm.left + (endX - startX)
          var maxT = sumLen - resizerElm.offsetWidth
          if (moveLen < 0) moveLen = 0
          if (moveLen > maxT) moveLen = maxT
          resizerElm.style.left = moveLen
          textareaElm.style.width = moveLen + 'px'
          sowMkElm.style.width = (sumLen - moveLen - resizeW) + 'px'
        }
        document.onmouseup = function (evt) {
          document.onmousemove = null
          document.onmouseup = null
          resizerElm.releaseCapture && resizerElm.releaseCapture()
        }
        resizerElm.setCapture && resizerElm.setCapture()
        return false
      }
    }

    const [
      focus,
      blur,
      select,
      setNativeInputValue,
      handleBlur,
      handleFocus,
      handleInput,
      handleChange,
      handleCompositionStart,
      handleCompositionUpdate,
      handleCompositionEnd
    ] = useInteractive(
      input,
      nativeInputValue,
      toRefs(props),
      toRefs(state),
      emit,
      validateEvent,
      dispatch
    )
    watch(
      () => unref(modelValue),
      (val) => {
        nextTick(() => {
          setNativeInputValue()
        })
        if (unref(validateEvent)) {
          // 传值验证
          dispatch('FormItem', 'form-change', val)
        }
      }
    )
    onMounted(() => {
      setNativeInputValue()
      handleMouseDown()
    })

    return {
      ...toRefs(props),
      ...toRefs(state),
      validateResult,
      inputDisabled,
      nativeInputValue,
      inputId,
      textLength,
      focus,
      blur,
      select,
      handleBlur,
      handleFocus,
      handleInput,
      handleChange,
      handleCompositionStart,
      handleCompositionUpdate,
      handleCompositionEnd,
      showClass,
      input,
      showPlaceholder,
      compiledMarkdown,
      handleMouseDown
    }
  },
  props: {
    modelValue: {
      type: String,
      default: '',
      require: true
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    suffixIcon: {
      type: String,
      default: ''
    },
    autoComplete: {
      type: String,
      default: 'off'
    },
    placeholder: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'normal'
    },
    minlength: {
      type: Number,
      default: 1
    },
    maxlength: {
      type: Number,
      default: 99999
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    require: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    validateEvent: {
      // 开启验证事件
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less">
.markdown-header {
  line-height: 30px;
  font-size: 12px;
  color: var(--theme-color);
  font-weight: bold;
  top: 0;
}
.markdown-wrap {
  position: relative;
  border: 2px solid var(--light-color);
  width: 100%;
  height: 100%;
  min-height: 550px;
  max-height: 50vh;
  display: flex;
  .resizer {
    width: 17px;
    border: 0.5px solid var(--main-color);
    cursor: col-resize;
    background-color: var(--main-background-color);
    transition: 500ms;
  }
  .resizer:after {
    content: "";
    display: flex;
    background: rgb(117, 117, 117);
    border-radius: 50px;
    position: absolute;
    width: 4px;
    height: 41px;
    top: calc(50% - 20px);
    margin-left: 6px;
    opacity: 1;
  }

  .mkEdit,
  .showMk {
    overflow-y: auto;
    width: calc(50% - 17px);
  }

  .mkEdit {
    overflow-y: hidden;
    > textarea {
      overflow-y: auto;
      width: 100%;
      height: 100%;
      border: none;
      border-right: 1px solid #ccc;
      resize: none;
      outline: none;
      background-color: var(--main-background-color);
      font-size: 14px;
      font-family: "Monaco", courier, monospace;
    }
    > label {
      position: absolute;
      z-index: 11;
      font-weight: bold;
      color: var(--light-color);
      top: 0;
      left: 0;
      transition: 500ms;
    }
    > textarea:valid,
    > textarea:focus {
      + label {
        top: -25px;
        color: var(--theme-color);
      }
    }
  }
}
</style>
