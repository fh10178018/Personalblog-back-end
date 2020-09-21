<template>
  <button class="btn" :class="btnClass" :style="useStyle" :disabled="buttonDisabled">
    <threedot-loading  v-if="loading"></threedot-loading>
    <slot v-else></slot>
  </button>
</template>

<script>
import { computed, inject, toRefs, unref } from 'vue'
import ThreedotLoading from '../../common/Loading/ThreedotLoding'

const useBtnClass = (size, round, type, circle, loading) => {
  const Form = inject('Form', {})
  return computed(() => {
    return [
      'btn-' + type.value,
      'btn-' + size.value,
      loading.value || unref(Form.loading) ? 'is-loading' : '',
      round.value && !circle.value ? 'btn-round' : '',
      !round.value && circle.value ? 'btn-circle' : ''
    ]
  })
}
const useButtonDisabled = (disabled, loading) => {
  const Form = inject('Form', {})
  return computed(() => {
    return !!(loading.value || disabled.value || unref(Form.disabled) || unref(Form.loading));
  })
}

export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'normal'
    },
    loading: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    style: {
      type: Object,
      default () {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: { ThreedotLoading },
  setup (props) {
    const { disabled, size, round, type, loading, circle, style } = toRefs(props)
    const buttonDisabled = useButtonDisabled(disabled, loading)
    const useStyle = style.value
    const btnClass = useBtnClass(size, round, type, circle, loading)
    return {
      btnClass,
      buttonDisabled,
      useStyle
    }
  }
}
</script>

<style lang="less">
  .btn{
    border: 0;
    text-align: center;
    cursor: pointer;
    user-select:none;
   }
  .btn-default{
    color: var(--main-font-color);
    background-color: var(--light-color);
    transition: 500ms;
  }
  .btn-default:hover{
    color: var(--main-color);
    background-color: var(--theme-color);
  }
  .btn-theme{
    color: var(--main-color);
    background-color: var(--theme-color);
    transition: 500ms;
  }
  .btn-theme:hover{
    color: white;
    background-color: var(--theme-color);
    opacity: 0.8;
  }
  .btn-success[disabled]{
    color: var(--theme-color) !important;
    background-color: var(--lighter-color) !important;
    border: 1px solid var(--theme-color);
    transition: 500ms;
  }
  .btn-error[disabled]{
    color: var(--error-color) !important;
    background-color: var(--lighter-error-color) !important;
    border: 1px solid var(--error-color);
    transition: 500ms;
  }
  .btn-large{
    padding: 10px 16px;
    font-size: 18px;
    border-radius: 8px;
    line-height: 1.3333333;
  }
  .btn-normal{
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 4px;
    line-height: 1;
  }
  .btn-small{
    padding: 7px 15px;
    font-size: 12px;
    border-radius: 4px;
    line-height: 1;
  }
  .btn[disabled] {
    color: white;
    pointer-events: none;
    background: var(--light-color);
  }
  .btn-round{
    border-radius: 200px;
    padding: 12px 23px;
  }
  .btn-circle{
    border-radius: 50%;
    padding: 12px;
  }
  .btn:focus{
    outline: 0;
  }
  .is-loading {
    cursor: wait !important;
  }
</style>
