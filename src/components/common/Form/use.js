import {
  reactive,
  unref,
  watch
} from 'vue'

export const useFileds = (model, on) => {
  const fields = reactive([]) // 用于存储form-item的实例

  on('form-item-add', filed => { // 存储当前实例
    if (filed) {
      fields.push(filed)
    }
  })
  on('form-item-remove', field => { // 删除当前实例
    if (field.prop) {
      fields.splice(fields.indexOf(field), 1)
    }
  })
  const resetFields = () => { // 清空
    if (!unref(model)) {
      console.warn(
        '[Element Warn][Form]model is required for resetFields to work.'
      )
      return
    }

    fields.forEach(field => {
      field.resetField()
    })
  }

  return { fields, resetFields }
}

export const useValidate = (rules, model, fields, validateOnRuleChange) => {
  const clearValidate = (props = []) => { // 清除验证，就可以根据rulesName经行清除
    let clearFileds = ''
    if (props.length) {
      if (typeof props === 'string') {
        clearFileds = fields.filter((field) => { props = field.rulesName }) // 参数是一个字符串，直接筛选出来
      } else {
        clearFileds = fields.filter(field => { props = props.includes(field.rulesName) }) // props参数是一个数组
      }
    } else { // 无任何形参，默认为全部实例
      clearFileds = fields
    }
    clearFileds.forEach(field => {
      field.clearValidate()
    })
  }
  const validate = callback => {
    if (!model) {
      console.warn(
        '[Element Warn][Form]model is required for validate to work!'
      )
      return
    }

    let promise
    if (typeof callback !== 'function') { // if不是callback,则是通过emit调用该函数，则此时 该 return promise
      promise = new window.Promise((resolve, reject) => {
        callback = function (valid) {
          valid ? resolve(valid) : reject(valid)
        }
      })
      return promise
    }
    let valid = true
    let count = 0
    // 如果需要验证的fields为空，调用验证时立刻回调true值
    if (fields.length === 0 && callback) {
      callback(valid)
    }
    let invalidFields = {}
    fields.forEach((field) => { // 遍历调用实例中的validate函数进行验证
      field.validate('', (message, field) => { // 回调函数，返回的形参为，验证信息和验证实例
        if (message) { // 如果存在错误信息，说明验证失败
          valid = false
        }
        invalidFields = Object.assign({}, invalidFields, field) // 暂未了解
        if (typeof callback === 'function' && ++count === fields.length) { // 全部验证完
          callback(valid, invalidFields)
        }
      })
    })
  }
  watch(rules, () => { // 规则改变
    fields.forEach((field) => {
      // 监听事件全部删除
      field.removeValidateEvents()
      // 添加相应实例的事件
      field.addValidateEvents()
    })

    if (unref(validateOnRuleChange)) {
      validate(() => {})
    }
  })
  return { validate, clearValidate }
}
