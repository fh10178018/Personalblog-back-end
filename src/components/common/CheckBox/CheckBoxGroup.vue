<template>
  <div class="check-box-group-header"
       :class="headerClass"
       role="group"
       v-if="placeholder">{{placeholder}}</div>
  <div class="check-box-group-wrap">
    <slot></slot>
  </div>
</template>
<script>
import { computed, toRefs, unref, provide, getCurrentInstance, watch } from 'vue'
import { useCheckBoxGroupEvents } from './use'
import { useEmitter } from '../../../utils/emmiter'

export default {
  name: 'CheckBoxGroup',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Array,
      default: () => ([])
    },
    validateEvent: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const { modelValue, validateEvent } = toRefs(props)
    const { dispatch } = useEmitter()
    const [checkBoxGroup, handlePushItem, handleRemoveItem] = useCheckBoxGroupEvents(emit, modelValue)
    const headerClass = computed(() => ([unref(modelValue).length > 0 ? 'checkisactive' : '']))
    provide('CheckboxGroup', getCurrentInstance())
    watch(
      () => unref(modelValue),
      () => {
        if (unref(validateEvent)) {
          dispatch('FormItem', 'form-change', unref(modelValue))
        }
      }
    )
    return {
      headerClass, checkBoxGroup, handlePushItem, handleRemoveItem, ...toRefs(props)
    }
  }
}
</script>
<style lang="less">
.check-box-group-header {
  line-height: 30px;
  font-size: 14px;
  font-weight: bold;
  color: var(--light-color);
}
.checkisactive {
  color: var(--theme-color);
}
</style>
