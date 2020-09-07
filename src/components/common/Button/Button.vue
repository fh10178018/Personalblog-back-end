<template>
  <button class="btn" :class="btnClass" :style="style" :disabled="buttonDisabled">
    <threedot-loading  v-if="loading"></threedot-loading>
    <slot v-else></slot>
  </button>
</template>

<script>
import ThreedotLoading from 'components/common/Loading/ThreedotLoding'
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
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: { ThreedotLoading },
  computed: {
    btnClass () {
      return [
        'btn-' + this.type,
        'btn-' + this.size,
        this.loading ? 'is-loading' : '',
        this.round && !this.circle ? 'btn-round' : '',
        !this.round && this.circle ? 'btn-circle' : ''
      ]
    },
    buttonDisabled () {
      if (this.loading || this.disabled) {
        return true
      }
      return false
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
</style>
