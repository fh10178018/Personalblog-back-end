<template>
  <div class="content-edit-wrap">
    <span v-if="label">{{label}}：</span>
    <div class="content-edit"
         @focus="handleFocus"
         v-html="innerText"
         @blur="handleBlur"
         @input="handleInput"
         @change="handleChange"
         @compositionstart="handleCompositionStart"
         @compositionupdate="handleCompositionUpdate"
         @compositionend="handleCompositionEnd"
         :contenteditable="contentEditAble"></div>
  </div>
</template>

<script>
import { computed, nextTick, ref, toRefs, unref, watch } from 'vue'
import { useEmitter } from '../../../utils/emmiter'
export default {
  name: 'ContentEdit',
  props: {
    modelValue: [String, Number],
    validateEvent: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: String
  },
  setup (props, { emit }) {
    const { modelValue, validateEvent, disabled } = toRefs(props)
    const { dispatch } = useEmitter()
    const focused = ref(false)
    const contentEditAble = computed(() => !unref(disabled))
    const isComposing = ref(false)
    const innerText = ref(modelValue.value)
    const setNativeInputValue = (el) => {
      innerText.value = el.target.innerHTML
      nextTick(() => {
        keepLastIndex(el.target)
      })
    }
    const handleFocus = (event) => { // input在获取焦点时触发
      focused.value = true
      emit('focus', event)
    }
    const handleBlur = (event) => { // input在失去焦点时触发
      focused.value = false
      emit('blur', event)
      if (unref(validateEvent)) {
        dispatch('FormItem', 'form-blur', [unref(modelValue)])
      }
    }
    const handleInput = async (event) => { // 值发生变化，就会触发，改变父级绑定值
      // 在中文输入字符期间，不进行该事件，输入中文字符之后，再触发
      if (unref(isComposing)) return
      // 修改v-model的值，和：input绑定的值
      emit('update:modelValue', event.target.innerHTML)
      emit('input', event.target.innerHTML)
      await nextTick(setNativeInputValue(event))
    }
    const handleChange = async (event) => { // 当input失去焦点，并且value值发生变化时
      emit('update:modelValue', event.target.innerHTML)
      emit('change', event.target.innerHTML(event))
      // 及时更新
      await nextTick(setNativeInputValue)
    }
    const handleCompositionStart = () => { // 表示输入状态为：正在进行中文输入
      isComposing.value = true
    }
    const isKorean = (text) => {
      const reg = /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi
      return reg.test(text)
    }
    const handleCompositionUpdate = (event) => {
      const text = event.target.innerHTML
      const lastCharacter = text[text.length - 1] || ''
      isComposing.value = !isKorean(lastCharacter)
    }
    const handleCompositionEnd = (event) => { // 中文输入状态结束，并进行交互提交
      if (unref(isComposing)) {
        isComposing.value = false
        // 注意该事件触发顺序是在input事件之后，故在该事件要调用一次input的业务逻辑
        handleInput(event)
      }
    }
    const keepLastIndex = (obj) => {
      if (window.getSelection) { // ie11 10 9 ff safari
        obj.focus() // 解决ff不获取焦点无法定位问题
        var range = window.getSelection() // 创建range
        range.selectAllChildren(obj) // range 选择obj下所有子内容
        range.collapseToEnd && range.collapseToEnd() // 光标移至最后
      } else if (document.selection) { // ie10 9 8 7 6 5
        range = document.selection.createRange() // 创建选择对象
        // var range = document.body.createTextRange();
        range.moveToElementText(obj) // range定位到obj
        range.collapse(false) // 光标移至最后
        range.select()
      }
    }
    watch(
      () => unref(modelValue),
      (val) => {
        innerText.value = val
        if (unref(validateEvent)) {
          // 传值验证
          dispatch('FormItem', 'form-change', val)
        }
      }
    )
    return {
      innerText,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur,
      handleCompositionStart,
      handleCompositionUpdate,
      handleCompositionEnd,
      contentEditAble,
      ...toRefs(props)
    }
  }
}
</script>

<style lang="less">
.content-edit-wrap {
  display: flex;
  width: 100%;
}
</style>
