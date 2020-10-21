<template>
  <div class="verify-wrap" :key="id">
    <Button v-if="!nativeValue" :isButton="false" size="large" round :type="isPenalty?'error':'none'" :style="{width: '100%'}" :disabled="isPenalty" @click="handleShow">
      <template v-if="isPenalty">失败过多，请等待 {{showTimeDifference}}</template>
      <template v-else>点击验证</template>
    </Button>
    <Button v-else :isButton="false" size="large" round :type="'success'" :style="{width: '100%'}" :disabled="true">
      <i class="fa fa-check"></i> 验证成功
    </Button>
    <verify-model ref="verifyModal"></verify-model>
  </div>
</template>

<script>
import {
  ref,
  provide,
  reactive,
  toRefs,
  unref,
  computed,
  onMounted,
  watch
} from 'vue'
import Button from '../Button/Button'
import VerifyModel from './VerifyModel'
import { useStore } from 'vuex'
import { useEmitter } from '../../../utils/emmiter'

const useVerify = (
  getters,
  state,
  modelValue
) => {
  const verifyModal = ref(null) // 用来获得verifyModal的实例
  const isOk = ref(false) // 用来记录验证是否成功

  const isPenalty = computed(() => {
    return state.ValidationOvertime.isPenalty
  })

  const showTimeDifference = computed(() => {
    return getters.showTimeDifference
  })

  const nativeValue = computed(() => {
    console.log(unref(modelValue))
    return unref(modelValue)
  })

  return {
    verifyModal,
    isPenalty,
    showTimeDifference,
    isOk,
    nativeValue
  }
}

const useInteractive = (
  verifyModal,
  emit,
  dispatch,
  id,
  store,
  nativeValue
) => {
  const getModal = () => {
    return unref(verifyModal)
  }

  const handleShow = () => {
    getModal().handleShow()
  }

  const resetVerify = () => {
    id.value = +new Date() // 通过改变key的方式，重新渲染实例，但未重置vuex
    store.commit('RESET')
    emit('update:modelValue', false)
  }

  const successMsg = () => { // 传递给verifyModel
    emit('update:modelValue', true)
    dispatch('FormItem', 'form-change', true)
  }

  const errorMsg = () => { // 传递给verifyModel
    emit('update:modelValue', false)
    dispatch('FormItem', 'form-change', false)
  }

  watch(nativeValue, (newVal, oldVal) => {
    if (oldVal && !newVal) { // 当验证通过，但登陆失败时，重置
      resetVerify()
    }
  })

  return {
    handleShow,
    successMsg,
    errorMsg,
    resetVerify
  }
}

export default {
  name: 'Verify',
  props: {
    errorRange: { // 错误允许范围
      type: Number,
      default: 3
    },
    modelValue: { // 用来记录和绑定验证结果
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const { modelValue } = toRefs(props)
    const store = useStore()
    const id = ref(+new Date()) // 用来做实例的key值
    const getters = store.getters
    const state = store.state
    const { dispatch } = useEmitter()
    const {
      verifyModal,
      isPenalty,
      showTimeDifference,
      nativeValue
    } = useVerify(
      getters,
      state,
      modelValue
    )

    const {
      handleShow,
      successMsg,
      errorMsg,
      resetVerify
    } = useInteractive(
      verifyModal,
      emit,
      dispatch,
      id,
      store,
      nativeValue
    )

    provide(
      'Verify',
      reactive({
        name: 'Verify',
        ...toRefs(props),
        successMsg,
        errorMsg
      })
    )

    onMounted(() => {
      unref(isPenalty) && store.dispatch('countDown')
    })

    return {
      ...unref(props),
      handleShow,
      verifyModal,
      isPenalty,
      showTimeDifference,
      id,
      resetVerify,
      nativeValue
    }
  },
  components: { VerifyModel, Button }
}
</script>

<style lang="less">
  .verify-content{
    text-align: center;
    line-height: 30px;
    p{
      font-size: 12px;
      color: var(--light-color);
    }
  }
</style>
