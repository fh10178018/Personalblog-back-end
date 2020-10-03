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
    rules: { // 添加默认值，防止无规则时，监听出错
      type: Object,
      default: () => {
        return {}
      }
    },
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
  emits: ['validate', 'FormItemAdd', 'FormItemRemove'],
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
      fields, // 实例组件用不到，但还是传递出去,在单元测试会用到
      clearValidate,
      validate,
      resetFields
    }
  }
}
</script>

<style lang="less">

</style>
