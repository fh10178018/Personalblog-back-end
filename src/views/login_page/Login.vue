<template>
    <form class="login-wraper">
      <div class="box">
        <div class="title">个人博客后端登陆</div>
        <StringInput
          name="账号"
          ref="usernameInput"
          v-model:value="loginData.username"
          :require="rules.username.require"
          :min="rules.username.min"
          :max="rules.username.max"
          :disabled="isVerify && isUsername && isPassword"
          @isok = "usernameIsOk"
          showClear />
        <StringInput
          name="密码"
          ref="passwordInput"
          type="password"
          :disabled="isVerify && isUsername && isPassword"
          v-model:value="loginData.password"
          @isok = "passwordIsOk"
          :require="rules.password.require"
           />
        <transition name="unfold">
          <Verify
            v-if="isUsername && isPassword && DestroyVerify"
            @message="handleVerifyOk"
            ref="verify"
          />
        </transition>
        <div class="btn-login">
          <Button size="lg" border="round" color="theme" :style="{width: '100%'}" :disabled="buttonDisabled" @click="login">
            <threedot-loading v-if="isLoading"></threedot-loading>
            <span v-else>登陆</span>
          </Button>
        </div>
      </div>
    </form>
</template>

<script>
import { mapMutations } from 'vuex'
import StringInput from 'components/common/Input/StringInput'
import Button from 'components/common/Button/Button'
import Verify from 'components/common/Verify/Verify'
import { post } from 'http/index'
import ThreedotLoading from '../../components/common/Loading/ThreedotLoding'
export default {
  name: 'Login',
  components: { ThreedotLoading, Verify, Button, StringInput },
  methods: {
    ...mapMutations(['LOGIN']),
    handleVerifyOk () {
      this.isVerify = true
    },
    reset () {
      this.DestroyVerify = false
      this.$nextTick(() => {
        this.DestroyVerify = true
      })
      Object.assign(this.$data, this.$options.data.call(this))
    },
    usernameIsOk (isUsername) {
      this.isUsername = isUsername
    },
    passwordIsOk (isPassword) {
      this.isPassword = isPassword
    },
    login () {
      this.isLoading = true
      const that = this
      post('/user/login', this.loginData).then(res => {
        that.isLoading = false
        that.LOGIN({ Authorization: 'Bearer ' + res })
        that.$router.push({ path: '/power' })
      }).catch(() => {
        this.isLoading = false
        this.reset()
      })
    }
  },
  data () {
    return {
      DestroyVerify: true,
      loginData: {
        username: '',
        password: ''
      },
      isVerify: false,
      isUsername: false,
      isPassword: false,
      isLoading: false,
      rules: {
        username: {
          require: true,
          min: 3,
          max: 32
        },
        password: {
          require: true
        }
      }
    }
  },
  computed: {
    buttonDisabled () {
      if (this.isUsername && this.isPassword && this.isVerify) {
        return this.isLoading
      }
      return true
    }
  }
}
</script>

<style lang="less">
  .login-wraper{
    position: absolute;
    top: calc(50% - 244.4px);
    left: calc(50% - 180px);
    box-shadow: 0 7px 25px rgba(0, 0, 0, .08);
    height: auto;
    transition: 0.5ms;
    width: 360px;
    .box{
      background: var(--main-color);
      height: 100%;
      width: 100%;
      padding: 20px;
      border-radius: 8px;
      .title{
        text-align: center;
        font-weight: 700;
        color: var(--theme-color);
        margin-bottom: 50px;
        margin-top: 30px;
      }
      .btn-login{
        margin-top: 30px;
        margin-bottom: 30px;
      }
    }
  }
  .unfold-leave-active{
    animation: bounce-out .5s;
  }
  .unfold-enter-active {
    animation: bounce-in .5s;
  }
</style>
