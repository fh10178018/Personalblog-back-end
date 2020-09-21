<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
import { useEmitter } from '@/utils/emmiter'
import {
  reactive,
  unref,
  toRefs,
  provide
} from 'vue'

const useFileds = (model) => {
  const fields = reactive([]) // 用于存储form-item的实例
  const { on } = useEmitter()

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

const useValidate = (rules, model, fields) => {
  const validate = callback => {
    if (!model) {
      console.warn(
        '[Element Warn][Form]model is required for validate to work!'
      )
      return
    }

    return new Promise (resolve => {
      /*
      * 对当前所有form-item进行验证
      * */
      let valid  = true // 默认通过
      let count = 0 // 来匹配是否检查完毕
      if (fields.length === 0 && callback) { // 如果验证为空立即返回true
        resolve(valid)
        callback(valid)
      }
      fields.forEach(field => {
        field.validation('', error => {
          if (error) { // 只要有一个错误，就是尚未同过
            valid = false
          }
          if (++count === fileds.length) { // 通过所有form-item的检查才会调用
            resolve(valid) // 通过then方法获取valid
            if (typeof callback === 'function') {
              callback(valid) // 或者直接注入回调函数
            }
          }
        })
      })
    })
  }
  // watch(rules, () => {
  //
  // })
  return { validate }
}

export default {
  name: "Form",
  props: {
    model: object, // 当前form的model
    rules: object, // 验证规则
  },
  emits: ['validate'],
  setup (props, { emit }) {
    const { model, rules } = toRefs(props)
    const { fields, resetFields } = useFileds(model)
    const { validate } = useValidate(
      rules,
      model,
      fields
    )

    provide(
      'Form',
      reactive({
        name: 'Form',
        model,
        rules,
        resetFields,
        validate,
        emit
      })
    )

    return {
      validate,
      resetFields
    }
  }
}
</script>

<style lang="less">

</style>
