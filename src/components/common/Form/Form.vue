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
import { useFileds, useValidate } from './use'

export default {
  name: 'Form',
  props: {
    model: Object, // Form的绑定数据对象
    rules: Object, // 验证规则
    validateOnRuleChange: { // 规则更改时验证，默认为true
      type: Boolean,
      default: true
    }
  },
  emits: ['validate'],
  setup (props, { emit }) {
    const { model, rules, validateOnRuleChange } = toRefs(props)
    const { fields, resetFields } = useFileds(model)
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
