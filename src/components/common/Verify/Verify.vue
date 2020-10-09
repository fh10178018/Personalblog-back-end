<template>
  <div class="verify-wrap">
    <Button v-if="res!=='success'&&res!=='error'" size="large" round type="theme" :style="{width: '100%'}" :disabled="buttonDisabled" @click="handleShow">
      请完成验证
    </Button>
    <Button v-else size="large" round :type="res" disabled :style="{width: '100%'}">
      <div v-if="res==='success'"><i class="fa fa-check m-r-1"></i>验证成功</div>
      <div v-else><i class="fa fa-times m-r-1"></i>验证失败</div>
    </Button>
    <verify-model v-if="res!=='error'" ref="verifyModal"></verify-model>
  </div>
</template>

<script>
import {
  ref,
  provide,
  reactive,
  toRefs,
  unref
} from 'vue'
import Button from '../Button/Button'
import VerifyModel from './VerifyModel'

const useVerify = () => {
  const verifyModal = ref(null) // 用来获得verifyModal的实例

  return {
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
    getModal().handleShow()
  }

  return {
    handleShow
  }
}

export default {
  name: 'Verify',
  props: {
    errorRange: { // 错误允许范围
      type: Number,
      default: 3
    }
  },
  setup (props) {
    const {
      verifyModal
    } = useVerify()

    const { handleShow } = useInteractive(
      verifyModal
    )

    provide(
      'Verify',
      reactive({
        name: 'Verify',
        ...toRefs(props)
      })
    )

    return {
      handleShow,
      verifyModal
    }
  },
  // data () {
  //   return {
  //     hackReset: true,
  //     correctValue: Math.random() * (0.8 - 0.2) + 0.2,
  //     value: 0,
  //     errorRange: 0.03,
  //     res: 'default',
  //     verifyNum: 3
  //   }
  // },
  // computed: {
  //   verifyMessage () {
  //     return '剩余验证次数：' + this.verifyNum
  //   }
  // },
  components: { VerifyModel, Button }
  // methods: {
  //   reset () {
  //     this.$refs.verifyBtn.reset()
  //     this.$refs.verifyImg.reset()
  //     Object.assign(this.$data, this.$options.data.call(this))
  //   },
  //   slideMessage (res) {
  //     if (!res) {
  //       this.verifyNum--
  //       if (this.verifyNum <= 0) {
  //         this.res = 'error'
  //         this.$refs.modal.handleModalFade()
  //       }
  //       this.$refs.verifyImg.reset()
  //     } else if (res) {
  //       this.$refs.verifyImg.handleSuccess()
  //       setTimeout(() => { this.$refs.modal.handleModalFade() }, 1000)
  //       this.$emit('message', 'success')
  //       this.res = 'success'
  //     } else {
  //       this.res = 'default'
  //     }
  //   },
  //   handleVerify () {
  //     this.$refs.modal.handleModalShow()
  //   }
  // }
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
