<template>
  <div class="check-box-wrap">
    <input :id="labelID"
           type="checkbox"
           ref="checkbox"
           @change="handleChange"
           @input="model = { label, checked: $event.target.checked }" />
    <label :for="labelID"
           :class="[isChecked ? 'isChecked' : '']"
           class="check-box"></label>
    <div class="text"
         v-if="label && showLabel">{{ label }}
    </div>
    <div class="text"
         v-else>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { toRefs, getCurrentInstance, inject } from 'vue'
import { useCheckBox } from './use.js'
import { useEmitter } from '../../../utils/emmiter'

export default {
  name: 'CheckBox',
  props: {
    label: [String, Symbol, Number],
    modelValue: {
      type: Boolean,
      default: false
    },
    validateEvent: { // 开启验证事件
      type: Boolean,
      default: true
    },
    showLabel: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue', 'change'],
  setup (props, { emit, slots }) {
    const { dispatch } = useEmitter()
    const CheckboxGroup = inject('CheckboxGroup', { props: {} })

    const { modelValue, label } = toRefs(props)
    const curInstance = getCurrentInstance()
    const [labelID, model, checkbox, isChecked, handleChange] = useCheckBox(modelValue, curInstance, CheckboxGroup, emit, dispatch, label)

    return {
      labelID,
      model,
      slots,
      checkbox,
      handleChange,
      isChecked,
      ...toRefs(props)
    }
  }
}
</script>
<style lang="less">
input[type="checkbox"] {
  display: none;
}
.check-box-wrap {
  display: inline-flex;
  margin-right: 15px;
  margin-bottom: 8px;
  .text {
    margin-left: 10px;
    color: var(--font-main-color);
    font-weight: 500;
  }
}
.check-box {
  height: 18px;
  width: 18px;
  background-color: transparent;
  border: 2.5px solid var(--light-color);
  border-radius: 2px;
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  transition: border-color ease 0.2s;
  cursor: pointer;
}
.check-box:before {
  box-sizing: border-box;
  opacity: 0;
  position: absolute;
  top: 8px;
  right: -9px;
  width: 16px;
  height: 4px;
  transform: rotate(-45deg);
  background-color: var(--light-color);
  display: inline-block;
  transform-origin: left top;
  border-radius: 1px;
  box-shadow: 0 0 0 2px var(--main-color);
  transition: 500ms;
  content: " ";
}
.check-box:after {
  opacity: 0;
  box-sizing: border-box;
  position: absolute;
  top: 3px;
  right: -0.8px;
  top: 1.5px;
  height: 4px;
  width: 10px;
  transform: rotate(45deg);
  background-color: var(--light-color);
  display: inline-block;
  transform-origin: left top;
  border-radius: 1px;
  transition: 500ms;
  content: " ";
}
.isChecked:before,
.isChecked:after {
  opacity: 1;
  background-color: var(--theme-color);
}
.check-box:hover,
.isChecked {
  border-color: var(--theme-color);
}
.check-box:hover:before,
.check-box:hover:after {
  background-color: var(--theme-color);
}
</style>
