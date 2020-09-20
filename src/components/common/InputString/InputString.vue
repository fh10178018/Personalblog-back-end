<template>
  <div class="form-group">
    <input
      class="form-control"
      spellcheck="false"
      :type="inputType"
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
      required
    />
    <label v-if="placeholder" :for="inputId">{{placeholder}}</label>
    <div class="input-suffix" v-if="showSuffixVisible">
      <span class="btn btn-suffix" v-if="!showClearIcon || !showPwdVisibleIcon || !showWordLimitVisible">
        <slot name="suffix"></slot>
        <i v-if="suffixIcon" class="fa" :class="suffixIcon"></i>
      </span>
      <span v-if="showError"
            class="btn btn-error">
        <i class="fa fa-warning"></i>
      </span>
      <!--@mousedown.prevent 非常重要，
      在做点击清除的时候会使focus变为blur
      致使清除按钮消失，从而并没由触发@click事件
      而prevent可以有效阻止其他事件的发生，先进行该步骤
      -->
      <span v-if="showClearIcon"
            class="btn btn-clear"
            @mousedown.prevent
            @click="handleClear">
        <i class="fa fa-close"></i>
      </span>
      <span v-if="showPwdVisibleIcon"
            class="btn btn-eye"
            @click="handlePasswordVisible">
        <i class="fa" :class="'fa-eye'+(!passwordVisible?'':'-slash')"></i>
      </span>
      <span v-if="showWordLimit"
            class="btn btn-limit">
        {{ textLength }}/{{maxlength}}
      </span>
    </div>
    <div class="error-label" v-if="showError">{{errorMsg}}</div>
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  onMounted,
  nextTick,
  watch,
  unref
} from 'vue'
import {
  useInput,
  useInteractive
} from './use'

export default {
  name: 'InputString',
  emits: ['input', 'change', 'blur', 'clear', 'focus', 'update:modelValue'],
  setup (props, { emit, slots }) {
    const { type, modelValue } = toRefs(props)
    const state = reactive({
      focused: false,
      isComposing: false,
      passwordVisible: false,
      inputTimes: 0
    })
    const {
      input,
      inputType,
      inputDisabled,
      nativeInputValue,
      inputId,
      showError,
      errorMsg,
      textLength,
      showClearIcon,
      showWordLimitVisible,
      showPwdVisibleIcon,
      showClass,
      showSuffixVisible
    } = useInput(
      slots,
      toRefs(props),
      toRefs(state)
    )
    const {
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
      handleCompositionEnd,
      handleClear,
      handlePasswordVisible
    } = useInteractive(
      input,
      nativeInputValue,
      toRefs(props),
      toRefs(state),
      emit
    )
    watch(
      () => unref(type),
      () => {
        nextTick(() => {
          setNativeInputValue()
        })
      }
    )
    watch(
      () => unref(modelValue),
      () => {
        nextTick(() => {
          setNativeInputValue()
        })
      }
    )
    onMounted(() => {
      setNativeInputValue()
    })

    return {
      ...toRefs(props),
      ...toRefs(state),
      inputType,
      inputDisabled,
      nativeInputValue,
      inputId,
      showError,
      errorMsg,
      textLength,
      showClearIcon,
      showWordLimitVisible,
      showPwdVisibleIcon,
      showSuffixVisible,
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
      handleClear,
      handlePasswordVisible,
      showClass,
      input
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
    type: {
      type: String,
      default: 'text'
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
      default: 999
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
    }
  }
}
</script>

<style lang="less">
  .form-group{
    margin-bottom: 40px;
    position: relative;
    height: 40px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    .input-suffix{
      position: relative;
      .btn{
        position: absolute;
        right: 0;
        margin: 0 5px;
        transform: translateY(-60%);
        cursor: pointer;
        z-index: 11;
      }
      .btn-clear,.btn-eye{
        transition:color 500ms;
        color: var(--light-color);
      }
      .btn-clear:hover,.btn-eye:hover{
        color: var(--theme-color);
      }
      .btn-error{
        color: var(--error-color) !important;
      }
    }
    .error-label{
      position: absolute;
      font-size: 12px;
      top: 100%;
      color: var(--error-color);
    }
    >label{
      position: absolute;
      z-index: 11;
      line-height: 36px;
      font-size: 16px;
      font-weight: bold;
      color: var(--light-color);
      top: 0;
      transition: 500ms;
    }
    input{
      flex: 1;
      background-color: transparent;
      z-index: 10;
      border: 2px solid;
      border-color: transparent transparent var(--light-color) transparent ;
      line-height: 40px;
      height: 100%;
      transition: 500ms;
      font-weight: 700;
      font-size: 16px;
      width: 100%;
      color: var(--light-color);
      padding-right: 23px;
    }
    input:hover{
      border-color:transparent transparent  var(--theme-color) transparent;
      +label{
        color: var(--theme-color);
      }
    }
    .error{
      color: var(--error-color) !important;
      border-color:transparent transparent  var(--error-color) transparent !important;
      +label{
        color: var(--error-color) !important;
      }
    }
    input:focus,input:valid{
      border-color:transparent transparent  var(--theme-color) transparent;
      outline: 0;
      +label{
        top: -25px;
        font-size: 12px;
        color: var(--theme-color);
      }
    }
    input[disabled]{
      border-color:transparent transparent  var(--theme-color) transparent;
      color: var(--theme-color);
      +label{
        top: -25px;
        font-size: 12px;
        color: var(--theme-color);
      }
    }
  }
</style>
