<template>
  <div class="check-box-wrap">

    <input :id="labelID"
           type="checkbox"
           v-model="isChecked" />
    <label :for="labelID"
           class="check-box"
           :class="[isChecked ? 'isChecked' : '']"></label>
    <div class="text"
         v-if="label || slots">{{ label }}<slot></slot>
    </div>
  </div>
</template>
<script>
import { toRefs, unref, watch, nextTick, getCurrentInstance } from 'vue'
import { useCheckBox } from './use.js'
import { useEmitter } from '../../../utils/emmiter'

export default {
  name: 'CheckBox',
  props: {
    label: [String, Symbol, Number],
    value: [String, Symbol, Number],
    modelValue: {
      type: Boolean,
      default: false
    },
    validateEvent: { // 开启验证事件
      type: Boolean,
      default: true
    }
  },
  setup (props, { emit, slots }) {
    const { dispatch } = useEmitter()
    const { modelValue, value, validateEvent } = toRefs(props)
    const curInstance = getCurrentInstance()
    const [isChecked, labelID, parent, isGroup, setValue] = useCheckBox(modelValue, value, curInstance)
    const handleChange = () => {
      if (unref(isGroup)) {
        if (unref(isChecked)) {
          unref(parent).ctx.handlePushItem(unref(setValue))
        } else {
          unref(parent).ctx.handleRemoveItem(unref(setValue))
        }
      }
      emit('update:modelValue', unref(isChecked))
    }

    watch(
      () => unref(isChecked),
      () => {
        nextTick(() => {
          handleChange()
        })
        if (unref(validateEvent)) {
          dispatch('FormItem', 'form-change', unref(isChecked))
        }
      }
    )
    return {
      isChecked,
      labelID,
      handleChange,
      slots,
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
  display: flex;
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
