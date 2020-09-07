<template>
  <div class="verify-wrap">
    <Button v-if="res!=='success'&&res!=='error'" size="large" round type="theme" :style="{width: '100%'}" :disabled="buttonDisabled" @click="handleVerify">
      请完成验证
    </Button>
    <Button v-else size="large" round :type="res" disabled :style="{width: '100%'}">
      <div v-if="res==='success'"><i class="fa fa-check m-r-1"></i>验证成功</div>
      <div v-else><i class="fa fa-times m-r-1"></i>验证失败</div>
    </Button>
    <Modal v-if="res!=='error'" size="sm" modal-status='fade' ref="modal">
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
        <SlideButton
          ref="verifyBtn"
          tips="滑动将图片转正"
          :correctValue="correctValue"
          v-model:value="value"
          @message="slideMessage"
          :error-range="errorRange"/>
      </template>
    </Modal>
  </div>
</template>

<script>
import Button from '../Button/Button'
import Modal from '../Modal/Modal'
import SlideButton from '../Button/SlideButton'
import VerifyImg from './VerifyImg'
export default {
  name: 'Verify',
  data () {
    return {
      hackReset: true,
      correctValue: Math.random() * (0.8 - 0.2) + 0.2,
      value: 0,
      errorRange: 0.03,
      res: 'default',
      verifyNum: 3
    }
  },
  computed: {
    verifyMessage () {
      return '剩余验证次数：' + this.verifyNum
    }
  },
  components: { VerifyImg, SlideButton, Modal, Button },
  methods: {
    reset () {
      this.$refs.verifyBtn.reset()
      this.$refs.verifyImg.reset()
      Object.assign(this.$data, this.$options.data.call(this))
    },
    slideMessage (res) {
      if (!res) {
        this.verifyNum--
        if (this.verifyNum <= 0) {
          this.res = 'error'
          this.$refs.modal.handleModalFade()
        }
        this.$refs.verifyImg.reset()
      } else if (res) {
        this.$refs.verifyImg.handleSuccess()
        setTimeout(() => { this.$refs.modal.handleModalFade() }, 1000)
        this.$emit('message', 'success')
        this.res = 'success'
      } else {
        this.res = 'default'
      }
    },
    handleVerify () {
      this.$refs.modal.handleModalShow()
    }
  }
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
