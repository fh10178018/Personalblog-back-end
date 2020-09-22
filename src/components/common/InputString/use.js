import {
  computed,
  inject,
  nextTick,
  watch,
  unref,
  ref
} from 'vue'

export const useInput = (
  slots,
  { suffixIcon, size, showWordLimit, type, modelValue, readonly, clearable, maxlength, minlength, require, disabled },
  { focused, passwordVisible, inputTimes }
) => {
  const input = ref(null)
  const Form = inject('Form', {})
  const inputType = computed(() => {
    return (
      unref(type) === 'password' ? (unref(passwordVisible) ? 'text' : 'password') : 'text'
    )
  })
  const inputDisabled = computed(() => {
    return (
      unref(disabled) || (
        unref(Form.disabled) ? unref(Form.disabled) : false
      )
    )
  })
  const inputId = computed(() => {
    let Num = 'input_'
    for (let i = 0; i < 6; i++) {
      Num += Math.floor(Math.random() * 10)
    }
    return Num
  })
  const nativeInputValue = computed(() => {
    // 当绑定值为undefind或null， 计算缓存为''——空字符
    return unref(modelValue) === null || unref(modelValue) === undefined
      ? ''
      : String(unref(modelValue))
  })
  const textLength = computed(() => { // 返回绑定值长度
    if (typeof unref(modelValue) === 'number') {
      return String(unref(modelValue)).length
    }
    return (unref(modelValue) || '').length
  })
  const showError = computed(() => { // 是否出现错误,主要用于提示必填字段，以及长度限制
    if (!require) return false
    return (
      (unref(inputTimes) > 0) && (unref(textLength) < unref(minlength) || unref(textLength) > unref(maxlength))
    )
  })
  const errorMsg = computed(() => {
    if (unref(textLength) === 0) {
      return name + '输入不能能为空！'
    }
    if (unref(textLength) < unref(minlength)) {
      return name + '输入长度最小为' + unref(minlength)
    }
    if (unref(textLength) > unref(maxlength)) {
      return name + '输入长度最大为' + unref(minlength)
    }
  })
  const showClearIcon = computed(() => {
    return (
      unref(clearable) &&
      !unref(showWordLimitVisible) &&
      !unref(showError) &&
      !unref(inputDisabled) &&
      !unref(readonly) &&
      unref(nativeInputValue) &&
      unref(focused)
    )
  })
  const showWordLimitVisible = computed(() => {
    return (
      unref(showWordLimit) &&
      unref(require) &&
      !unref(readonly) &&
      !unref(inputDisabled) &&
      !unref(showPwdVisibleIcon) &&
      !unref(showClearIcon)
    )
  })
  const showPwdVisibleIcon = computed(() => {
    return (
      (unref(type) === 'password') &&
      !unref(showWordLimitVisible) &&
      !unref(showError) &&
      !unref(inputDisabled) &&
      !unref(readonly) &&
      (!!unref(nativeInputValue) || unref(focused))
    )
  })
  const showClass = computed(() => {
    return [
      'input-' + unref(size),
      unref(showError) ? 'error' : ''
    ]
  })
  const showSuffixVisible = computed(() => {
    return (
      slots.suffix ||
      unref(suffixIcon) ||
      unref(showClearIcon) ||
      unref(showPwdVisibleIcon) ||
      unref(showWordLimitVisible) ||
      unref(showError)
    )
  })

  return {
    input,
    inputType,
    inputDisabled,
    nativeInputValue,
    inputId,
    showError,
    errorMsg,
    textLength,
    showClearIcon,
    showPwdVisibleIcon,
    showClass,
    showSuffixVisible
  }
}
export const useInteractive = (
  input,
  nativeInputValue,
  { modelValue },
  { focused, isComposing, passwordVisible, inputTimes },
  emit
) => {
  const getInput = () => {
    return unref(input)
  }
  const focus = () => {
    getInput().focus()
  }
  const blur = () => {
    getInput().blur()
  }
  const select = () => {
    getInput().select()
  }
  const setNativeInputValue = () => {
    const input = getInput()
    if (!input) return
    if (input.value === unref(nativeInputValue)) return
    input.value = unref(nativeInputValue) // 当父级绑定值值发生变化， 实时修改input的值
  }
  const handleFocus = (event) => { // input在获取焦点时触发
    focused.value = true
    emit('focus', event)
  }
  const handleBlur = (event) => { // input在失去焦点时触发
    inputTimes.value++
    focused.value = false
    emit('blur', event)
  }
  const handleInput = async (event) => { // 值发生变化，就会触发，改变父级绑定值
    // 在中文输入字符期间，不进行该事件，输入中文字符之后，再触发
    if (unref(isComposing)) return
    // 修改v-model的值，和：input绑定的值
    emit('update:modelValue', event.target.value)
    emit('input', event.target.value)

    // 以上的数据更新的操作, 不会马上进行， 只有在该函数方法结束，
    // 或者其它异步队列结束，也就是下一个函数开始时,才进行数据更新
    // nextTick可以在数据变化后， 就调用， 并及时更新页面数据
    await nextTick(setNativeInputValue)
  }
  const handleChange = async (event) => { // 当input失去焦点，并且value值发生变化时
    emit('update:modelValue', event.target.value)
    emit('change', event.target.value)

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
    const text = event.target.value
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
  const handleClear = async () => { // 清除重置事件
    emit('update:modelValue', '')
    emit('input', '')
    emit('change', '')
    emit('clear')

    // 及时更新
    await nextTick(setNativeInputValue)
  }
  const handlePasswordVisible = () => { // password可见状态
    passwordVisible.value = !unref(passwordVisible)
    focus()
  }
  watch( // 及时监听props中modelValue发生变化，进而修改子组件值，形成闭环修改
    () => unref(nativeInputValue),
    () => {
      setNativeInputValue()
    }
  )
  return {
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
  }
}