<template>
<Modal size="sm" modal-status='fade' ref="verifyModal">
  <template v-slot:content>
    <div class="verify-content">
      <p>身份验证</p>
      <h4>滑动图片，使图片角度为正</h4>
      <p>{{verifyMessage}}</p>
      <VerifyImg
        ref="verifyImg"
        :correctValue="correctValue"
        :value="model.value"
      ></VerifyImg>
    </div>
  </template>
  <template v-slot:footer>
    <Form :model="model" :rules="rules">
      <FormItem rulesName="value">
        <Slider
          ref="verifySlider"
          v-model="model.value"
          type="verify"/>
      </FormItem>
    </Form>

  </template>
</Modal>
</template>

<script>
import {
  ref,
  computed,
  unref,
  inject,
  reactive,
  provide,
  watch
} from 'vue'
import Modal from '../Modal/Modal'
import Slider from '../Slider/Slider'
import VerifyImg from './VerifyImg'
import FormItem from '../FormItem/FormItem'
import Form from '../Form/Form'
import { useStore } from 'vuex'

const useVerifyModal = (
  Verify,
  state
) => {
  const model = reactive({
    value: 0
  }) // 用来记录旋转值数值,0-100
  const verifyImg = ref(null) // 获得verifyImg实例
  const verifyModal = ref(null) // 获得verifyModal实例
  const verifySlider = ref(null) // 获得verifySlider实例
  const correctValue = ref(Math.round(Math.random() * (80 - 20) + 20)) // 获得 20 - 80 的一个随机正确值
  const verifyNum = ref(3) // 验证剩余次数，最多三次

  const isPenalty = computed(() => {
    return state.ValidationOvertime.isPenalty
  })

  const verifyCount = computed(() => {
    return state.ValidationOvertime.verifyCount
  })

  const dragging = computed(() => {
    return unref(verifySlider) ? unref(verifySlider).dragging : null
  })
  const validateState = computed(() => { // verifySlider实例创建较晚，注意加上判断
    return unref(verifySlider) ? unref(verifySlider).validateState : null
  })

  const errorRange = computed(() => {
    return Verify.errorRange
  })

  const rules = computed(() => {
    return {
      value: [{
        validator: function (rule, value, callback) {
          const min = unref(correctValue) - unref(errorRange)
          const max = unref(correctValue) + unref(errorRange)
          if (value > min && value < max) {
            callback()
          } else {
            callback(new Error('请旋转指定位置'))
          }
        },
        trigger: 'blur'
      }]
    }
  }) // 验证剩余次数，最多三次

  const verifyMessage = computed(() => {
    return '剩余验证次数：' + (5 - unref(verifyCount))
  })

  return {
    model,
    verifyImg,
    verifySlider,
    correctValue,
    verifyNum,
    verifyMessage,
    rules,
    verifyModal,
    dragging,
    validateState,
    isPenalty
  }
}

const useInteractive = (
  verifyModal,
  validateState,
  verifyNum,
  isPenalty,
  store,
  Verify
) => {
  const getModal = () => {
    return unref(verifyModal)
  }

  const handleShow = () => {
    getModal().handleModalShow()
  }

  const handleFade = () => {
    getModal().handleModalFade()
  }

  watch(validateState, val => { // 监听错误，验证次数减少
    if (unref(val) === 'error') {
      Verify.errorMsg()
      store.dispatch('errorVerification') // 验证成功，修改vuex里的相关状态
    }
    if (unref(val) === 'success') { // 验证成功，关闭模态框
      Verify.successMsg()
      setTimeout(() => {
        handleFade()
      }, 1000)
    }
  })

  watch(isPenalty, val => {
    if (unref(val)) handleFade()
  })

  return {
    handleShow
  }
}

export default {
  name: 'VerifyModel',
  components: { Form, FormItem, VerifyImg, Slider, Modal },
  inject: ['verify'],
  setup () {
    const store = useStore()
    const state = store.state
    const Verify = inject('Verify', {})

    const {
      model,
      verifyImg,
      verifySlider,
      correctValue,
      verifyMessage,
      rules,
      verifyModal,
      dragging,
      validateState,
      verifyNum,
      isPenalty
    } = useVerifyModal(
      Verify,
      state
    )

    provide('VerifyModel',
      reactive({
        name: 'VerifyModel',
        dragging,
        validateState
      })
    )

    const { handleShow } = useInteractive(
      verifyModal,
      validateState,
      verifyNum,
      isPenalty,
      store,
      Verify
    )
    return {
      model,
      verifyImg,
      verifySlider,
      verifyMessage,
      rules,
      verifyModal,
      correctValue,
      handleShow,
      validateState
    }
  }
}
</script>

<style lang = "less">

</style>
