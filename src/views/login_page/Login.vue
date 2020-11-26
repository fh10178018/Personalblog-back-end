<template>
    <div class="login-wraper">
      <div class="box">
        <div class="title">个人博客后端登陆</div>
        <Form :model="loginData" :rules="rules" ref="ruleForm">
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
          <FormItem rulesName="verifyRes">
            <Verify
              v-model="loginData.verifyRes"
              ref="verify"
            />
          </FormItem>
          <FormItem style="width: 100%;text-align: center">
            <Button size="large" :loading="isLoading" round type="theme" :style="{width: '100%'}"  @click="submitForm">
              <span>登陆</span>
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
</template>

<script>
import {
  ref,
  unref,
  reactive,
  toRefs
} from 'vue'
import { useStore } from 'vuex'
import InputString from 'components/common/InputString/InputString'
import Button from 'components/common/Button/Button'
import Verify from 'components/common/Verify/Verify'
import FormItem from '../../components/common/FormItem/FormItem'

const useVerify = () => {
  const ruleForm = ref(null) // 用于绑定实例
  const isLoading = ref(false) // 登陆是否处于加载
  const loginData = reactive({
    username: '',
    password: '',
    verifyRes: false
  })

  const rules = reactive({
    username: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
      { min: 3, max: 32, message: '长度为 3 到 32 个字符', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    verifyRes: [{
      validator: function (rule, value, callback) {
        if (value) {
          callback()
        } else {
          callback(new Error('请进行验证'))
        }
      },
      trigger: 'change'
    }]
  })

  return {
    ruleForm,
    loginData,
    isLoading,
    rules
  }
}

const useInteractive = (
  ruleForm,
  store,
  loginData,
  isLoading
) => {
  const getRuleForm = () => { // 获得实例对象
    return unref(ruleForm)
  }

  const resetForm = () => {
    getRuleForm().resetFields()
  }

  const submitForm = () => {
    getRuleForm().validate((valid) => {
      if (valid) { // 验证都成功
        isLoading.value = true
        console.log(...toRefs(loginData))
        store.dispatch('LoginAction', { ...toRefs(loginData) }).then(res => {
          isLoading.value = false
          store.dispatch('getUserInfo')
          store.commit('LOGIN', { Authorization: 'Bearer ' + res })
          this.$router.push({ path: '/power' })
        }).catch(() => {
          console.log('as')
          isLoading.value = false
          resetForm()
        })
      } else {
        return false
      }
    })
  }

  return {
    submitForm
  }
}

export default {
  name: 'Login',
  components: { FormItem, Button, InputString, Verify },
  setup () {
    const store = useStore()

    const {
      ruleForm,
      loginData,
      isLoading,
      rules
    } = useVerify()

    const {
      submitForm
    } = useInteractive(
      ruleForm,
      store,
      loginData,
      isLoading
    )

    return {
      submitForm,
      ruleForm,
      loginData,
      rules,
      isLoading
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
