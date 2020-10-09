<template>
<Modal size="sm" modal-status='fade' ref="verifyModal">
  <template v-slot:content>
    <div class="verify-content">
      <p>身份验证</p>
      <h4>滑动图片，使图片角度为正</h4>
      <p>{{verifyMessage}}</p>
      <VerifyImg
        v-if="hackReset"
        ref="verifyImg"
        :correctValue="correctValue"
        :value="value"
      ></VerifyImg>
    </div>
  </template>
  <template v-slot:footer>
    <Form :model="value" rules="rules">
      <FormItem rulesName="rules">
        <Slider
          ref="verifySlider"
          v-model="value"
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
  inject
} from 'vue'
import Modal from '../Modal/Modal'
import Slider from '../Slider/Slider'
import VerifyImg from './VerifyImg'
import FormItem from '../FormItem/FormItem'
import Form from '../Form/Form'

const useVerifyModal = (
  Verify
) => {
  const value = ref(0) // 用来记录旋转值数值,0-100
  const verifyImg = ref(null) // 获得verifyImg实例
  const verifyModal = ref(null) // 获得verifyModal实例
  const verifySlider = ref(null) // 获得verifySlider实例
  const correctValue = ref(Math.random() * (80 - 20) + 20) // 获得 20 - 80 的一个随机正确值
  const verifyNum = ref(3) // 验证剩余次数，最多三次

  const errorRange = computed(() => {
    return Verify.errorRange
  })

  const rules = computed(() => {
    return {
      value: [
        { min: unref(correctValue) - unref(errorRange), max: unref(correctValue) + unref(errorRange), message: '请旋转指定位置', trigger: 'blur' }
      ]
    }
  }) // 验证剩余次数，最多三次

  const verifyMessage = computed(() => {
    return '剩余验证次数：' + unref(verifyNum)
  })

  return {
    value,
    verifyImg,
    verifySlider,
    correctValue,
    verifyNum,
    verifyMessage,
    rules,
    verifyModal
  }
}

const useInteractive = (
  verifyModal
) => {
  const getModal = () => {
    return unref(verifyModal)
  }

  const handleShow = () => {
    getModal().handleModalShow()
  }

  return {
    handleShow
  }
}

export default {
  name: 'VerifyModel',
  components: { Form, FormItem, VerifyImg, Slider, Modal },
  inject: ['verify'],
  setup () {
    const Verify = inject('Verify', {})

    const {
      value,
      verifyImg,
      verifySlider,
      verifyMessage,
      rules,
      verifyModal
    } = useVerifyModal(
      Verify
    )

    const { handleShow } = useInteractive(verifyModal)

    return {
      value,
      verifyImg,
      verifySlider,
      verifyMessage,
      rules,
      verifyModal,
      handleShow
    }
  }
}
</script>

<style lang = "less">

</style>
