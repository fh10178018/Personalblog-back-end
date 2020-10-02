<template>
    <div class="login-wraper">
      <div class="box">
        <div class="title">个人博客后端登陆</div>
        <Form :model="loginData" :rules="rules">
          <FormItem rulesName="username">
            <InputString
              placeholder="账号"
              v-model="loginData.username"
              clearable/>
          </FormItem>
          <FormItem rulesName="password">
            <InputString
              placeholder="密码"
              type="password"
              v-model="loginData.password"/>
          </FormItem>
        </Form>
        <transition name="unfold">
          <Verify
            v-if="isUsername && isPassword && DestroyVerify"
            @message="handleVerifyOk"
            ref="verify"
          />
        </transition>
        <div class="btn-login">
          <Button size="large" :loading="isLoading" round type="theme" :style="{width: '100%'}" :disabled="buttonDisabled" @click="login">
            <span>登陆</span>
          </Button>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import InputString from 'components/common/InputString/InputString'
import Button from 'components/common/Button/Button'
import Verify from 'components/common/Verify/Verify'
import FormItem from '../../components/common/FormItem/FormItem'
export default {
  name: 'Login',
  components: { FormItem, Verify, Button, InputString },
  methods: {
    ...mapActions(['LoginAction', 'getUserInfo']),
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
      this.LoginAction(this.loginData).then(res => {
        this.isLoading = false
        this.getUserInfo()
        this.LOGIN({ Authorization: 'Bearer ' + res })
        this.$router.push({ path: '/power' })
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
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 32, message: '长度为 3 到 32 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
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
