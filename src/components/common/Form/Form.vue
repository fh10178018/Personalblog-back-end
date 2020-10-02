<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
import { useEmitter } from '@/utils/emmiter'
import {
  reactive,
  toRefs,
  provide
} from 'vue'
import { useFileds, useValidate } from './use'

export default {
  name: 'Form',
  props: {
    model: Object, // Form的绑定数据对象
    rules: Object, // 验证规则
    size: {
      type: String,
      default: 'normal'
    },
    validateOnRuleChange: { // 规则更改时验证，默认为true
      type: Boolean,
      default: true
    },
    showMessage: { // 是否显示错误信息,默认显示
      type: Boolean,
      default: true
    }
  },
  emits: ['validate'],
  setup (props, { emit }) {
    const { on } = useEmitter()
    const { model, rules, validateOnRuleChange, showMessage, size } = toRefs(props)
    const { fields, resetFields } = useFileds(model, on)
    const { validate, clearValidate } = useValidate(
      rules,
      model,
      fields,
      validateOnRuleChange
    )
    provide(
      'Form',
      reactive({
        name: 'Form',
        size,
        showMessage,
        model,
        rules,
        resetFields,
        validate,
        clearValidate,
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
