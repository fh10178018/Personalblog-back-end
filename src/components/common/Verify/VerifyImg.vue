<template>
  <div class="verify-img" :class="verifyIsOk?'active':''" :style="[backgroundImage,transformRotate]">
    <i class="fa fa-check"></i>
  </div>
</template>

<script>
import {
  ref,
  computed,
  toRefs,
  watch,
  unref,
  onMounted
} from 'vue'
import allImages from '../../../assets/images/verify_img/index'

const useVerifyImg = (
  allImages
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

  const backgroundImage = computed(() => {
    // 根据背景图数组的长度随机选择索引
    const randIndex = Math.floor(Math.random() * unref(allVerifyImages).length)
    return {
      // 获取对应的图片资源并将其设置到`background-image`属性上
      backgroundImage: `url(${this.unref(allVerifyImages)[randIndex]})`
    }
  })

  return {
    deg,
    transformRotate,
    backgroundImage,
    verifyIsOk
  }
}

const useInteractive = (
  value,
  deg,
  verifyIsOk
) => {
  const setDeg = value => {
    deg.value = (1 - unref(value)) * 360 + 'deg'
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
  setup (props) {
    const {
      value
    } = toRefs(props)

    const {
      deg,
      transformRotate,
      backgroundImage,
      verifyIsOk
    } = useVerifyImg(
      allImages
    )

    const {
      setDeg,
      handleReset,
      handleSuccess
    } = useInteractive(
      value,
      deg,
      verifyIsOk
    )

    onMounted(() => {
      setDeg(value)
    })

    return {
      transformRotate,
      backgroundImage,
      handleSuccess,
      handleReset,
      verifyIsOk
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
    i{
      position: absolute;
      top: 25%;
      left: 25%;
      z-index: 11;
      opacity: 0;
      font-size: 150px;
      color: var(--theme-color);
      transition: 500ms;
    }
  }
  .verify-img.active:before{
    content: '';
    font-size: 50px;
    background: var(--main-color);
    opacity: 0.6;
    position: relative;
    z-index: 10;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .verify-img.active{
    i{
      opacity: 1;
    }
  }
</style>
