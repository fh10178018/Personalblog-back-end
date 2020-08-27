<template>
  <div class="verify-img" :class="status?'active':''" :style="[backgroundImage,transformRotate]">
    <i class="fa fa-check"></i>
  </div>
</template>

<script>
import allVerifyImages from '../../../assets/images/verify_img/index'
export default {
  name: 'VerifyImg',
  data () {
    return {
      // 将背景图存放在 data 里
      allVerifyImages,
      successValue: this.correctValue,
      deg: 360 - this.correctValue * 360 + 'deg',
      status: false// false为默认和失败，true为成功
    }
  },
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
  watch: {
    value (newVal) {
      this.deg = (1 - this.successValue + newVal) * 360 + 'deg'
    },
    correctValue (newVal) {
      this.deg = 360 - newVal * 360 + 'deg'
      this.successValue = newVal
    }
  },
  methods: {
    reset () {
      Object.assign(this.$data, this.$options.data.call(this))
    },
    handleSuccess () {
      this.status = true
    }
  },
  computed: {
    transformRotate () {
      return {
        // 获取对应的图片资源并将其设置到`background-image`属性上
        transform: `rotate(${this.deg})`
      }
    },
    backgroundImage () {
      // 根据背景图数组的长度随机选择索引
      const randIndex = Math.floor(Math.random() * this.allVerifyImages.length)
      return {
        // 获取对应的图片资源并将其设置到`background-image`属性上
        backgroundImage: `url(${this.allVerifyImages[randIndex]})`
      }
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
