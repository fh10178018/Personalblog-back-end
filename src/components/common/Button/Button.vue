<template>
  <div class="btn" :class="'btn-'+border+' btn-'+size+' btn-'+color" :style="style" :disabled="buttonDisabled">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    size: {
      type: String,
      default: 'lg'
    },
    border: {
      type: String,
      default: 'default'
    },
    color: {
      type: String,
      default: 'primary'
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
  computed: {
    buttonDisabled () {
      return this.disabled
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
  .btn-primary{
    color: var(--main-font-color);
    background-color: var(--light-color);
    transition: 500ms;
  }
  .btn-primary:hover{
    color: var(--main-color);
    background-color: var(--theme-color);
  }
  .btn-theme{
    color: var(--main-color);
    background-color: var(--theme-color);
    transition: 500ms;
  }
  .btn-success[disabled="true"]{
    color: var(--theme-color) !important;
    background-color: var(--lighter-color) !important;
    border: 1px solid var(--theme-color);
    transition: 500ms;
  }
  .btn-error[disabled="true"]{
    color: var(--error-color) !important;
    background-color: var(--lighter-error-color) !important;
    border: 1px solid var(--error-color);
    transition: 500ms;
  }
  .btn-theme:hover{
    color: white;
    background-color: var(--theme-color);
    opacity: 0.8;
  }
  .btn-default{
    border-radius: 3px;
  }
  .btn-lg{
    padding: 10px 16px;
    font-size: 18px;
    line-height: 1.3333333;
    border-radius: 6px;
  }
  .btn-sm{
    padding: 5px 10px;
    font-size: 12px;
    line-height: 1.5;
  }
  .btn-xs{
    padding: 1px 5px;
    font-size: 12px;
    line-height: 1.5;
  }
  .btn[disabled="true"] {
    color: white;
    pointer-events: none;
    background: var(--light-color);
  }
  .btn-round{
    border-radius: 200px;
  }
  .btn:focus{
    outline: 0;
  }
</style>
