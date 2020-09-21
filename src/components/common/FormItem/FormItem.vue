<template>
  <div class="form-item">
    <slot></slot>
  </div>
</template>

<script>
import {
  reactive,
  unref,
  getCurrentInstance,
  onMounted,
  onBeforeUnmount,
  toRefs,
  inject
} from 'vue'
const useDispatchFiled = props => {
  const { dispatch } = useEmitter()
  const { ctx } = getCurrentInstance() // 获取当前组件实例中的参数

  onMounted(() => { // 组件渲染时， 将实例缓存在Form中
    if (props.prop) { // 如果没有传入prop，则无需验证，也就无需缓存
      dispatch('Form', 'form-item-add', ctx)
    }
  })

  onBeforeUnmount(() => { // 组件销毁时， 将实例从form的缓存中删除
    dispatch('Form', 'form-item-remove', ctx)
  })
}
import { useEmitter } from '@/utils/emmiter'

export default {
  name: "FormItem",
  inject: ['form'],
  setup (props) {
    const Form = inject('Form', {})
    const FormItem = inject('FormItem')
    useDispatchFiled(props) // 渲染时将组件实例缓存到Form中，并在销毁时，删除该缓存
  }
}
</script>

<style lang="less">
.from-item{

}
</style>
