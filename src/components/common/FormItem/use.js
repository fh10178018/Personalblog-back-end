import {
  getCurrentInstance,
  onMounted,
  nextTick,
  computed,
  unref,
  ref,
  onBeforeUnmount
} from 'vue'
import AsyncValidator from 'async-validator'
import { getPropByPath } from '../../../utils/getPropByPath'
import { blankFunction } from '../../../utils/blankFunction'

export const useDispatchFiled = (props, dispatch) => { // 如果插入FormItem组件，且有rulesname，则通过item告诉Form，有验证组件传入，并在form中缓存
  const { ctx } = getCurrentInstance() // 获取当前组件实例中的参数

  onMounted(() => { // 组件渲染时， 将实例缓存在Form中
    if (props.rulesName) { // 如果没有传入ruleName，则无需验证，也就无需缓存
      dispatch('Form', 'form-item-add', ctx)
    }
  })

  onBeforeUnmount(() => { // 组件销毁时， 将实例从form的缓存中删除
    dispatch('Form', 'form-item-remove', ctx)
  })
}

export const useRules = (props, Form) => {
  const getRules = () => { // 从Form或者自身的规则获取当前的FormItem的验证规则
    const formRules = Form.rules // 获取父级的规则
    const selfRules = props.rules // 获取自身的prop的规则
    const requiredRule =
      props.required !== undefined ? { required: !!props.required } : [] // 复制当前FormItem规则是否需要被验证
    const rulesName = getPropByPath(formRules, props.rulesName || '') // 根据ruleName名称从formRules获取相应对象，也就是当前Item的实例
    const rules = formRules ? rulesName.o[props.rulesName || ''] || rulesName.v : [] // 获取不到为空数组
    return [].concat(selfRules || rules || []).concat(requiredRule) // 让规则一定是一个数组形式
  }

  const getFilteredRule = (trigger) => { // 为了满足规则在一定的事件中触发进行验证，可以用filter进行筛选，不满足的返回空
    const rules = getRules() // 数组形式,[[...],[...]]
    return rules.filter(rule => {
      if (!rule.trigger || trigger === '') return true
      if (Array.isArray(rule.trigger)) {
        return rule.trigger.indexOf(trigger) > -1
      } else {
        return rule.trigger === trigger
      }
    }).map((rule) => Object.assign({}, rule)) // 合并对象到对象中，{[..],[...]}
  }

  return {
    getRules,
    getFilteredRule
  }
}

export const useFieldValue = (props, Form) => { // 获取该组件的绑定值
  const initialValue = ref() // 用来记录最初的值
  const fieldValue = computed(() => { // 获得当前的value值
    const model = Form.model
    if (!model || !props.rulesName) {
      return
    }
    return getPropByPath(model, props.rulesName, true).v
  })
  onMounted(() => {
    if (props.rulesName) {
      initialValue.value = unref(fieldValue)
      if (Array.isArray(initialValue.value)) { // 作用应该是将引用的数组，数据内容完整的拷贝进，应为原数据不因该是引用方式，数组发生变化会导致最初的值也随之变化
        initialValue.value = initialValue.value.slice()
      }
    }
  })

  return {
    initialValue,
    fieldValue
  }
}

export const useValidate = (props, Form, getFilteredRule) => {
  const { fieldValue, initialValue } = useFieldValue(props, Form)
  const validateMessage = ref('') // 记录验证信息
  const validateResult = ref('') // 验证结果
  const validateDisabled = ref(false) // 检验是否禁止，默认不禁止

  const validate = (trigger, callback = blankFunction) => {
    validateDisabled.value = false
    validateResult.value = 'validating'
    const rules = getFilteredRule(trigger) // 根据事件获取规则，没有会返回
    if ((!rules || rules.length === 0) && props.required === undefined) { // 当没有定下规则，或者非必填条件时，无需验证
      callback()
      return true
    }

    const descriptor = {} // 创建该组件的验证数据对象
    if (rules && rules.length > 0) { // 删除key为trigger的值
      rules.forEach((rule) => {
        delete rule.trigger
      })
    }
    descriptor[props.rulesName] = rules

    const model = {}
    model[props.rulesName] = unref(fieldValue) // 转成所需要的对象形式，获取到对应值

    const validator = new AsyncValidator(descriptor) // 创建异步验证实例对象
    validator.validate(
      model,
      { firstFields: true },
      (errors, invalidFields) => {
        // @errors  type:Array  eg:[ { message: '手机号格式不正确', field: 'phone' } ]
        validateResult.value = errors ? 'error' : 'success'
        validateMessage.value = errors ? errors[0].message : ''
        callback(validateMessage.value, invalidFields) // 回调函数返验证信息和无效字段
        Form.emit( // 给父级Form传递事件
          'validate',
          props.rulesName,
          !errors,
          validateMessage.value || null
        )
      }
    )
  }

  const clearValidate = () => {
    validateResult.value = ''
    validateMessage.value = ''
    validateDisabled.value = false
  }

  const resetField = () => {
    validateResult.value = ''
    validateMessage.value = ''

    const model = Form.model
    const value = unref(fieldValue)
    let path = props.rulesName
    if (path.indexOf(':') !== -1) { // 尚未想到具体干啥
      path = path.replace(/:/, '.')
    }

    const prop = getPropByPath(model, path, true)

    validateDisabled.value = true
    if (Array.isArray(value)) {
      prop.o[prop.k] = [].concat(initialValue.value)
    } else {
      prop.o[prop.k] = initialValue.value
    }

    // reset validateDisabled after onFieldChange triggered
    nextTick(() => {
      validateDisabled.value = false
    })
  }

  return {
    validateResult,
    validateMessage,
    validateDisabled,
    validate,
    clearValidate,
    resetField
  }
}

export const useValidateEvent = (props, validate, getRules, validateDisabled, on, off) => {
  const onFieldBlur = () => { // blur时，经行验证
    validate('blur')
  }

  const onFieldChange = () => { // change时，经行验证
    if (unref(validateDisabled)) { // 当验证禁止时，变为false，且不触发验证
      validateDisabled.value = false
      return
    }

    validate('change')
  }

  const addValidateEvents = () => {
    const rules = getRules()

    if (rules.length || props.required !== undefined) {
      on('form-blur', onFieldBlur) // 监听触发
      on('form-change', onFieldChange) // 监听触发
    }
  }

  onMounted(() => {
    if (props.rulesName) { // 渲染结束，即添加事件监听
      addValidateEvents()
    }
  })

  return {
    removeValidateEvents: off, // 关闭监听事件
    addValidateEvents
  }
}

export const useIsRequired = (getRules) => { // 获得规则中的required
  return computed(() => {
    const rules = getRules()
    let isRequired = false

    if (rules && rules.length) {
      rules.every((rule) => {
        if (rule.required) {
          isRequired = true
          return false
        }
        return true
      })
    }

    return isRequired
  })
}
