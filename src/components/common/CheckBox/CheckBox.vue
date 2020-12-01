<template>
  <div class="check-box-wrap">
    <input
      :focus="(focused = true)"
      :blur="(focused = false)"
      :id="labelID"
      type="checkbox"
      v-model="isChecked"
    />
    <label
      :for="labelID"
      class="check-box"
      :class="[isChecked ? 'isChecked' : '']"
    ></label>
    <div class="text" v-if="label">{{ label }}</div>
  </div>
</template>
<script>
import { reactive, ref, toRefs, unref, watch, nextTick, computed } from 'vue'
import randomID from '../../../utils/randomID.js'
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
  setup (props, { emit }) {
    const state = reactive({
      focused: false
    })
    const { dispatch } = useEmitter()
    const { modelValue, value, validateEvent } = toRefs(props)
    const isChecked = ref(modelValue.value)
    const checkbox = ref(null)
    const labelID = ref(randomID())
    const setValue = computed(() => { // 当没有传vlaue值时，传值以isChecked的Boolean为主
      return unref(value) === undefined ? unref(isChecked) : unref(value)
    })
    const handleChange = () => {
      if (unref(isChecked)) {
        emit('push-item', unref(setValue))
      } else {
        emit('remove-item', unref(setValue))
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
      checkbox,
      labelID,
      ...toRefs(props),
      ...toRefs(state)
    }
  }
}
</script>
<style lang="less">
input[type='checkbox'] {
  display: none;
}
.check-box-wrap {
  display: inline;
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
  top: 9px;
  right: -10px;
  width: 18px;
  height: 4px;
  transform: rotate(-45deg);
  background-color: var(--light-color);
  display: inline-block;
  transform-origin: left top;
  border-radius: 1px;
  box-shadow: 0 0 0 2px var(--main-color);
  transition: 500ms;
  content: ' ';
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
  content: ' ';
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
