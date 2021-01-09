import {
  computed,
  inject,
  nextTick,
  watch,
  unref,
  ref
} from 'vue'

export const useInput = (
  { modelValue, readonly, disabled, placeholder },
  validateResult
) => {
  const input = ref(null)
  const Form = inject('Form', {})
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

  const showClass = computed(() => {
    return [
      unref(validateResult),
      unref(readonly) ? 'isreadonly' : '',
      unref(disabled) ? 'isdisabled' : ''
    ]
  })
  const showPlaceholder = computed(() => {
    return unref(readonly) ? unref(placeholder) : ''
  })

  return [
    input,
    inputDisabled,
    nativeInputValue,
    inputId,
    textLength,
    showClass,
    showPlaceholder
  ]
}
export const useInteractive = (
  input,
  nativeInputValue,
  { modelValue },
  { focused, isComposing },
  emit,
  validateEvent,
  dispatch
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

  watch( // 及时监听props中modelValue发生变化，进而修改子组件值，形成闭环修改
    () => unref(nativeInputValue),
    () => {
      setNativeInputValue()
    }
  )
  return [
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
    handleCompositionEnd
  ]
}

export const useValidate = () => { // 获取父亲的验证结果
  const FormItem = inject('FormItem', '')
  const validateResult = computed(() => {
    return FormItem ? FormItem.validateResult : ''
  })

  return { validateResult }
}
