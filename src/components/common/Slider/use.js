import {
  computed,
  unref,
  ref,
  watch
} from 'vue'

/**
 * 以下为滑动父组件的相关函数
 * */

export const useSlider = (
  vertical,
  min,
  max,
  step,
  showStops,
  type,
  size
) => {
  const value = ref(null)
  const slider = ref(null)
  const oldValue = ref(null)
  const sliderSize = ref(0)

  const rangeSize = computed(() => {
    return unref(max) - unref(min)
  })

  const isVerifySlider = computed(() => {
    return unref(type) === 'verify'
  })

  const barSize = computed(() => {
    return `${(100 * (unref(value) - unref(min))) / (unref(max) - unref(min))}%`
  })

  const barStart = computed(() => {
    return '0%'
  })

  const passStyle = computed(() => {
    return unref(vertical)
      ? {
        height: unref(barSize),
        bottom: unref(barStart)
      }
      : {
        width: unref(barSize),
        left: unref(barStart)
      }
  })

  const precision = computed(() => { // 根据用户提供的数据值，决定结果的精度与之匹配符合
    const precision = [unref(max), unref(min), unref(step)].map(item => {
      const decimal = ('' + item).split('.')[1] // 获取小数点后
      return decimal ? decimal.length : 0
    })
    return Math.max.apply(null, precision) // 在调用数组时，用到apply，Math.max.apply(null, ['1','2','3.1','3.2'])
  })

  const markList = computed(() => {
    if (!unref(showStops) || unref(isVerifySlider)) return []
    if (unref(step) > unref(rangeSize) || unref(step)) return []
    if (unref(isVerifySlider)) return [] // 验证不允许有过程点
    if (typeof unref(step) === 'string') console.error('[Element Error][step]step type must be number')
    const res = []
    for (let i = unref(step); i < unref(rangeSize); i += unref(step)) {
      res.push(`${(i / unref(rangeSize)) * 100}%`)
    }
    return res
  })

  const showClass = computed(() => {
    return [
      'slider',
      unref(isVerifySlider) ? 'slider-verify' : 'slider-number',
      `slider-${unref(size)}`
    ]
  })

  const getStopStyle = val => {
    return unref(vertical)
      ? { bottom: unref(val) }
      : { left: unref(val) }
  }

  return {
    passStyle,
    slider,
    precision,
    value,
    oldValue,
    sliderSize,
    markList,
    getStopStyle,
    showClass,
    isVerifySlider
  }
}
export const useInteractive = (
  slider,
  vertical,
  min,
  max,
  value,
  oldValue,
  modelValue,
  dispatch,
  emit,
  sliderSize
) => {
  const getSlider = () => {
    return unref(slider)
  }

  const resetSize = () => { // 用来获取当前滑动框的长度
    const slider = getSlider()
    if (slider) {
      sliderSize.value = slider[
        `client${unref(vertical) ? 'Height' : 'Width'}`]
    }
  }

  const valueChanged = () => { // 判断值是否发生改变
    return unref(value) !== unref(oldValue)
  }

  const handleBlur = () => {
    if (valueChanged()) {
      dispatch('FormItem', 'form-blur', [unref(modelValue)])
    }
  }

  const handleChange = () => {
    if (valueChanged()) {
      dispatch('FormItem', 'form-change', [unref(modelValue)])
      oldValue.value = unref(value)
    }
  }

  const setValue = () => { // 建立和绑定初值,并且当值改变时，向Form派发验证
    if (unref(min) > unref(max)) {
      console.error('[Element Error][Slider]min should not be greater than max.')
      return null
    }
    if (unref(modelValue) < unref(min)) emit('update:modelValue', unref(min))
    else if (unref(modelValue) > unref(max))emit('update:modelValue', unref(max))
    else {
      value.value = unref(modelValue)
      handleChange()
    }
  }

  const resetValue = () => { // 直接设置值为0， 而真正的动画通过css样式实现,详情看.btn-slider-dragging样式
    value.value = 0
    if (valueChanged()) {
      dispatch('FormItem', 'form-change', [unref(modelValue)])
      oldValue.value = unref(value)
    }
  }

  watch(modelValue, () => {
    setValue()
  })

  watch(value, () => {
    emit('update:modelValue', unref(value))
  })

  return {
    resetSize,
    sliderSize,
    setValue,
    resetValue,
    handleBlur
  }
}

/**
 * 以下为滑动按钮组件的相关函数
 * */

export const useButtonSlider = (
  Slider,
  value,
  vertical
) => {
  const btnSlider = ref(null)
  const btnSize = ref(0) // 用于记录拖动按钮宽度,默认为0,不影响计算

  const disabled = computed(() => {
    return Slider.disabled
  })

  const max = computed(() => {
    return Slider.max
  })

  const slidersize = computed(() => {
    return Slider.sliderSize
  })

  const totalDistance = computed(() => {
    return unref(slidersize) - unref(btnSize)
  })

  const min = computed(() => {
    return Slider.min
  })

  const isVerify = computed(() => {
    return Slider.isVerifySlider
  })

  const currentPosition = computed(() => {
    if (unref(isVerify)) {
      /**
       * / unref(slidersize) * unref(totalDistance)
       * 这一步骤主要处理类型为verify时，拖动框距离需要减去一个拖动按钮大小，所产生的变动
       * */
      return `${((unref(value) - unref(min)) / (unref(max) - unref(min))) * 100 / unref(slidersize) * unref(totalDistance)}%`
    }
    return `${((unref(value) - unref(min)) / (unref(max) - unref(min))) * 100}%`
  })

  const step = computed(() => {
    return Slider.step
  })

  const precision = computed(() => {
    return Slider.precision
  })

  const wrapperStyle = computed(() => {
    return unref(vertical)
      ? { bottom: unref(currentPosition) }
      : { left: unref(currentPosition) }
  })

  return {
    disabled,
    max,
    slidersize,
    min,
    currentPosition,
    step,
    precision,
    wrapperStyle,
    btnSlider,
    btnSize,
    isVerify,
    totalDistance
  }
}
export const useMouseEvent = (
  disabled,
  vertical,
  currentPosition,
  slidersize,
  step,
  max,
  min,
  precision,
  emit,
  Slider,
  btnSlider,
  btnSize,
  totalDistance
) => {
  const hovering = ref(false) // 是否接触到按钮
  const dragging = ref(false) // 是否正在拖动该按钮
  const isClick = ref(false) // 按钮是否被点击
  const startY = ref(0) // y轴滑动距离
  const currentY = ref(0) // y轴滑动距离
  const currentX = ref(0) // y轴滑动距离
  const startX = ref(0) // x轴滑动距离
  const startPosition = ref(0.0) // 用于记录开始位置
  const newPosition = ref(null) // 用于记录新的位置

  const getBtnSlider = () => {
    return unref(btnSlider)
  }

  const getBtnSize = () => { // 用来获取当前滑动按钮的宽度或长度
    const btnSlider = getBtnSlider()
    if (btnSlider) {
      btnSize.value = btnSlider[
        `client${unref(vertical) ? 'Height' : 'Width'}`]
    }
  }

  const handleMouseEnter = () => {
    hovering.value = true
  }

  const handleMouseLeave = () => {
    hovering.value = false
  }

  const onButtonDown = event => {
    if (unref(disabled)) return null // 如果被静止，触发事件取消
    event.preventDefault() // 取消事件的默认的动作， 可以防止屏幕滚动等
    onDragStart(event)
    window.addEventListener('mousemove', onDragging) // 添加事件监听
    window.addEventListener('touchmove', onDragging)
    window.addEventListener('mouseup', onDragEnd)
    window.addEventListener('touchend', onDragEnd)
    window.addEventListener('contextmenu', onDragEnd)
  }

  const onDragStart = event => { // 用于初始化拖动前的数值
    dragging.value = true
    isClick.value = true
    if (event.type === 'touchstart') { // 非鼠标操作，即手机端触摸开始时
      event.clientY = event.touches[0].clientY
      event.clientX = event.touches[0].clientX
    }
    if (vertical) {
      startY.value = event.clientY
    } else {
      startX.value = event.clientX
    }
    // 这里运用 * unref(slidersize) / unref(totalDistance) 还原verify类型下的数值
    startPosition.value = parseFloat(unref(currentPosition)) * unref(slidersize) / unref(totalDistance) // 获得当前位置,去除%
    newPosition.value = unref(startPosition)
  }

  const onDragging = event => {
    if (unref(dragging)) {
      isClick.value = false // 拖动时，点击为false
      Slider.resetSize() // 更新获得最新的拖动框长度
      let diff = 0
      if (event.type === 'touchmove') { // 触摸移动时，记录移动
        event.clientY = event.touches[0].clientY
        event.clientX = event.touches[0].clientX
      }
      if (vertical) {
        currentY.value = event.clientY
        diff = ((unref(startY) - unref(currentY)) / unref(totalDistance)) * 100 // 得出当前百分比值对应位置
      } else {
        currentX.value = event.clientX
        diff = ((unref(currentX) - unref(startX)) / unref(totalDistance)) * 100
      }
      newPosition.value = unref(startPosition) + diff
      setPosition(newPosition) // 更新拖动按钮相对位置
    }
  }

  const onDragEnd = () => {
    if (unref(dragging)) {
      // 用来防止mouseup后触发click，导致滑块有机率继续位移一段
      setTimeout(() => {
        dragging.value = false
        if (!unref(isClick)) {
          setPosition(newPosition)
        }
      }, 0)
      Slider.handleBlur() // 触发blur监听事件
      window.removeEventListener('mousemove', onDragging) // 移除监听事件
      window.removeEventListener('touchmove', onDragging)
      window.removeEventListener('mouseup', onDragEnd)
      window.removeEventListener('touchend', onDragEnd)
      window.removeEventListener('contextmenu', onDragEnd)
    }
  }

  const setPosition = newPosition => {
    const val = unref(newPosition)
    if (val !== null && !isNaN(val)) {
      // 限定拖动范围
      if (val < 0) newPosition.value = 0
      else if (val > 100) newPosition.value = 100
      const lengthPerStep = 100 / ((unref(max) - unref(min)) / unref(step))
      const steps = Math.round(unref(newPosition) / lengthPerStep)
      let value = steps * lengthPerStep * (unref(max) - unref(min)) * 0.01 + unref(min)
      value = parseFloat(value.toFixed(unref(precision))) // 根据精度，得到值一定小数点后几位的浮点数值
      emit('update:modelValue', value) // 传值
    }
  }

  return {
    hovering,
    dragging,
    handleMouseEnter,
    handleMouseLeave,
    onButtonDown,
    getBtnSize
  }
}
