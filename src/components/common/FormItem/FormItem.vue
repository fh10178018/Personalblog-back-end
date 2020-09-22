<template>
  <div class="form-item">
    <slot></slot>
  </div>
</template>

<script>
import {
  unref,
  ref,
  inject
} from 'vue'
import {
  useDispatchFiled,
  useRules,
  useFieldValue,
  useValidate
} from './use'

export default {
  name: 'FormItem',
  props: {
    required: {
      type: Boolean,
      default: undefined
    },
    rulesName: String // 规则名称,进行匹配来获取当前的 form-item 的值
  },
  inject: ['Form'],
  setup (props) {
    const Form = inject('Form', {})
    const FormItem = inject('FormItem')
    useDispatchFiled(props) // 渲染时将组件实例缓存到Form中，并在销毁时，删除该缓存
    const { getRules, getFilteredRule } = useRules(props, Form)

    const {
      validateResult,
      validateMessage,
      validateDisabled,
      validate,
      clearValidate,
      resetField
    } = useValidate(props, Form, getFilteredRule, getRules)

    return {
      Form,
      FormItem
    }
  }
}
</script>

<style lang="less">
.from-item{

}
</style>
