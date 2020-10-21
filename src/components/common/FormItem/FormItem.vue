<template>
  <div class="form-item">
    <slot></slot>
    <div
      class="form-item-error"
      v-if="validateResult === 'error' && showMessage && Form.showMessage"
      :error="validateMessage"
    >
      {{ validateMessage }}
    </div>
  </div>
</template>

<script>
import {
  inject,
  reactive,
  provide
} from 'vue'
import {
  useDispatchFiled,
  useRules,
  useValidate,
  useIsRequired,
  useValidateEvent
} from './use'
import { useEmitter } from '../../../utils/emmiter'

export default {
  name: 'FormItem',
  props: {
    showMessage: {
      type: Boolean,
      default: true
    },
    required: {
      type: Boolean,
      default: undefined
    },
    rulesName: String // 规则名称,进行匹配来获取当前的 form-item 的值
  },
  inject: ['Form'],
  setup (props) {
    const { dispatch, on, off } = useEmitter()
    const Form = inject('Form', {})
    useDispatchFiled(props, dispatch) // 渲染时将组件实例缓存到Form中，并在销毁时，删除该缓存
    const {
      getRules,
      getFilteredRule
    } = useRules(props, Form)

    const isRequired = useIsRequired(getRules)

    const {
      validateResult,
      validateMessage,
      validateDisabled,
      validate,
      clearValidate,
      resetField
    } = useValidate(props, Form, getFilteredRule, getRules)

    const { removeValidateEvents, addValidateEvents } = useValidateEvent(
      props,
      validate,
      getRules,
      validateDisabled,
      on,
      off
    )

    provide(
      'FormItem',
      reactive({
        name: 'FormItem',
        validateResult,
        resetField
      })
    )

    return {
      ...props,
      validateResult,
      validateMessage,
      validateDisabled,
      validate,
      clearValidate,
      resetField,
      isRequired,
      removeValidateEvents,
      addValidateEvents,
      Form
    }
  }
}
</script>

<style lang="less">
.form-item{
  margin-bottom: 30px;
 .form-item-error{
   text-align: right;
   height: 0;
   color: var(--error-color) !important;
   font-size: 12px;
 }
}
</style>
