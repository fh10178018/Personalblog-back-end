<template>
  <div class="form-group">
    <input class="form-control"
           spellcheck="false"
           :placeholder="showPlaceholder"
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
           required />
    <label v-if="placeholder && !readonly"
           :for="inputId">{{ placeholder }}</label>
    <div class="input-suffix"
         v-if="showSuffixVisible">
      <span class="btn btn-suffix"
            v-if="!showClearIcon || !showPwdVisibleIcon || !showWordLimitVisible">
        <slot name="suffix"></slot>
        <i v-if="suffixIcon"
           class="fa"
           :class="suffixIcon"></i>
      </span>
      <span v-if="showValidate"
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
        <i class="fa"
           :class="'fa-eye' + (!passwordVisible ? '' : '-slash')"></i>
      </span>
      <span v-if="showWordLimit"
            class="btn btn-limit">
        {{ textLength }}/{{ maxlength }}
      </span>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, nextTick, watch, unref } from 'vue'
import { useInput, useValidate, useValidateIcon, useInteractive } from './use'
import { useEmitter } from '../../../utils/emmiter'

export default {
  name: 'InputString',
  emits: ['input', 'change', 'blur', 'clear', 'focus', 'update:modelValue'],
  setup (props, { emit, slots }) {
    const { type, modelValue, validateEvent } = toRefs(props)
    const { validateResult } = useValidate()
    const { dispatch } = useEmitter()

    const state = reactive({
      focused: false,
      isComposing: false,
      passwordVisible: false,
      inputTimes: 0
    })
    const { needValidateIcon } = useValidateIcon() // 父组件是否有Form表单
    const {
      input,
      inputType,
      inputDisabled,
      nativeInputValue,
      inputId,
      textLength,
      showClearIcon,
      showValidate,
      showWordLimitVisible,
      showPwdVisibleIcon,
      showClass,
      showSuffixVisible,
      showPlaceholder
    } = useInput(
      slots,
      toRefs(props),
      toRefs(state),
      validateResult,
      needValidateIcon
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
      emit,
      validateEvent,
      dispatch
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
    })

    return {
      ...toRefs(props),
      ...toRefs(state),
      validateResult,
      showValidate,
      inputType,
      inputDisabled,
      nativeInputValue,
      inputId,
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
      input,
      showPlaceholder
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
.form-group {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  .isreadonly {
    cursor: pointer;
  }
  .isdisabled {
    cursor: not-allowed;
    background-color: var(--lighter-color);
    + .input-suffix {
      .btn {
        color: var(--theme-color);
        cursor: not-allowed !important;
      }
    }
  }
  .input-normal {
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    + label {
      line-height: 30px;
      font-size: 14px;
    }
    + label + .input-suffix {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
    }
  }
  .input-small {
    font-size: 12px;
    height: 28px;
    line-height: 28px;
    + label {
      line-height: 28px;
      font-size: 12px;
    }
    + label + .input-suffix {
      height: 28px;
      line-height: 28px;
      font-size: 12px;
    }
  }
  .input-large {
    font-size: 16px;
    font-weight: 700;
    line-height: 36px;
    height: 36px;
    + label {
      line-height: 36px;
      font-size: 16px;
    }
    + label + .input-suffix {
      height: 36px;
      line-height: 36px;
      font-size: 16px;
    }
  }
  .input-suffix {
    position: absolute;
    z-index: 11;
    right: 0;
    .btn {
      margin: 0 5px;
      cursor: pointer;
      z-index: 11;
      i {
        transition: transform 500ms;
      }
    }
    .btn-clear,
    .btn-eye {
      transition: color 500ms;
      color: var(--light-color);
    }
    .btn-clear:hover,
    .btn-eye:hover {
      color: var(--theme-color);
    }
    .btn-error {
      color: var(--error-color) !important;
    }
    .btn-success {
      color: var(--theme-color) !important;
    }
  }
  > label {
    position: absolute;
    z-index: 11;
    font-weight: bold;
    color: var(--light-color);
    top: 0;
    transition: 500ms;
  }
  input {
    flex: 1;
    background-color: transparent;
    z-index: 10;
    border: 2px solid;
    border-color: transparent transparent var(--light-color) transparent;
    height: 100%;
    transition: 500ms;
    width: 100%;
    color: var(--light-color);
    padding-right: 23px;
  }
  input:hover {
    border-color: transparent transparent var(--theme-color) transparent;
    + label {
      color: var(--theme-color);
    }
  }
  .error {
    color: var(--error-color) !important;
    border-color: transparent transparent var(--error-color) transparent !important;
    + label {
      color: var(--error-color) !important;
    }
  }
  input:focus,
  input:valid {
    border-color: transparent transparent var(--theme-color) transparent;
    outline: 0;
    + label {
      top: -25px;
      font-size: 12px;
      color: var(--theme-color);
    }
  }
  input[disabled] {
    border-color: transparent transparent var(--theme-color) transparent;
    color: var(--theme-color);
    + label {
      top: -25px;
      font-size: 12px;
      color: var(--theme-color);
    }
  }
}
</style>
