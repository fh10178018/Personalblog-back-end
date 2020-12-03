<template>
  <div class="verify-img" :class="showClass" :style="transformRotate">
    <i class="fa fa-check"></i>
    <LoadingImg customClass="image"  :src="backgroundImage"></LoadingImg>
  </div>
</template>

<script>
import {
  ref,
  computed,
  toRefs,
  watch,
  unref,
  onMounted,
  inject
} from 'vue'
import allImages from '../../../assets/images/verify_img/index'
import LoadingImg from '../LoadingImg/LoadingImg'

const useVerifyImg = (
  allImages,
  VerifyModel
) => {
  const deg = ref(null)
  const verifyIsOk = ref(false)

  const allVerifyImages = computed(() => {
    return allImages
  })

  const transformRotate = computed(() => {
    return {
      // 获取对应的图片资源并将其设置到`background-image`属性上
      transform: `rotate(${unref(deg)})`
    }
  })

  const dragging = computed(() => {
    return VerifyModel.dragging
  })

  const validateIsOk = computed(() => {
    return VerifyModel.validateState === 'success'
  })

  const backgroundImage = computed(() => {
    // 根据背景图数组的长度随机选择索引
    const randIndex = Math.floor(Math.random() * unref(allVerifyImages).length)
    return unref(allVerifyImages)[randIndex]
  })

  const showClass = computed(() => {
    return [
      unref(validateIsOk) ? 'success' : '',
      unref(dragging) ? 'dragging' : ''
    ]
  })

  return {
    deg,
    transformRotate,
    backgroundImage,
    verifyIsOk,
    dragging,
    showClass
  }
}

const useInteractive = (
  value,
  deg,
  verifyIsOk,
  correctValue
) => {
  const setDeg = value => {
    deg.value = (100 + unref(correctValue) - unref(value)) * 3.60 + 'deg'
  }

  const handleReset = () => { // 重置，暂时不知道具体操作
    verifyIsOk.value = false
  }

  const handleSuccess = () => { // 可以由外部组件调用，当验证成功时进行调用
    verifyIsOk.value = true
  }

  watch(value, newVal => {
    setDeg(newVal)
  })

  return {
    setDeg,
    handleReset,
    handleSuccess
  }
}

export default {
  name: 'VerifyImg',
  components: { LoadingImg },
  props: {
    correctValue: {
      type: Number,
      default: 0.0,
      require: true
    },
    value: {
      type: Number,
      default: 0.0,
      require: true
    }
  },
  injection: ['VerifyModel'],
  setup (props) {
    const VerifyModel = inject('VerifyModel', {})
    const {
      value,
      correctValue
    } = toRefs(props)

    const {
      deg,
      transformRotate,
      backgroundImage,
      verifyIsOk,
      dragging,
      showClass
    } = useVerifyImg(
      allImages,
      VerifyModel
    )

    const {
      setDeg,
      handleReset,
      handleSuccess
    } = useInteractive(
      value,
      deg,
      verifyIsOk,
      correctValue
    )

    onMounted(() => {
      setDeg(value)
    })

    return {
      transformRotate,
      backgroundImage,
      handleSuccess,
      handleReset,
      verifyIsOk,
      dragging,
      showClass
    }
  }
}
</script>

<style lang="less">
  .verify-img{
    width: 300px;
    height: 300px;
    overflow: hidden;
    margin: 0 auto;
    border-radius: 300px;
    transition: 0.5s;
    i{
      position: absolute;
      top: 25%;
      left: 25%;
      z-index: 11;
      opacity: 0;
      font-size: 150px;
      color: var(--theme-color);
      transition: 500ms;
      text-shadow: #b39516 0 0 5px;
    }
    img{
      user-select: none;
    }
  }
  .verify-img.success:before{
    content: '';
    font-size: 50px;
    background: linear-gradient(132deg, var(--main-color), var(--theme-color));
    box-shadow:0 0 50px 30px var(--main-color) inset;
    opacity: 0.6;
    position: relative;
    z-index: 10;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .verify-img.success{
    i{
      opacity: 1;
    }
    .image{
      position: absolute;
      z-index: 5;
      top: 0;
      left: 0;
    }
  }
  .verify-img.dragging{
    transition: none;
  }
</style>
