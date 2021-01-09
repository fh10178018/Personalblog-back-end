<template>
  <div class="admin-modal">
    <Modal size="sm"
           :loading="pwdIsLoading"
           :closeOnClickMask="false"
           :showClose="false"
           ref="Modal">
      <template v-slot:header>
        <h3>修改密码</h3>
      </template>
      <template v-slot:content>
        <div class="form-content">
          <Form :model="adminData"
                :rules="rules"
                ref="ruleForm">
            <FormItem rulesName="password">
              <InputString placeholder="密码"
                           v-model="adminData.password"
                           clearable />
            </FormItem>
          </Form>
        </div>
      </template>
      <template v-slot:footer>
        <Button type="theme"
                @click="handleCancel">
          <span>取消</span>
        </Button>
        <Button type="theme"
                :loading="pwdIsLoading"
                @click="submitForm">
          <span>确定</span>
        </Button>
      </template>
    </Modal>
  </div>
</template>
<script>
import Modal from '@/components/common/Modal/Modal.vue'
import Button from '@/components/common/Button/Button.vue'
import { ref, unref, reactive, computed } from 'vue'
import reactiveToObject from '@/utils/reactiveToObject'
import { useStore } from 'vuex'

export default {
  components: { Modal, Button },
  name: 'EditAdminPasswordModal',
  props: {

  },
  setup (props) {
    const res = ref(false)
    const Modal = ref(null)
    const ruleForm = ref(null)
    const store = useStore()
    const pwdIsLoading = computed(() => unref(store.state.User.isLoading).password)
    const adminData = reactive({
      _id: '',
      password: ''
    })
    const rules = reactive({
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 3, max: 32, message: '长度为 3 到 32 个字符', trigger: 'blur' }
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
    const getModal = () => {
      return unref(Modal)
    }
    const getRuleForm = () => { // 获得实例对象
      return unref(ruleForm)
    }
    const handleShow = val => {
      adminData._id = val._id
      adminData.password = val.password
      const { handleModalShow } = getModal()
      handleModalShow()
    }

    const submitForm = () => {
      const { handleModalFade } = getModal()
      getRuleForm().validate((valid) => {
        if (valid) { // 验证都成功
          store.dispatch('EditAdminUserPassword', { adminDate: reactiveToObject(adminData), handleModalFade })
        } else {
          return false
        }
      })
    }
    const handleCancel = () => {
      const { handleModalFade } = getModal()
      handleModalFade()
    }

    return {
      Modal,
      handleShow,
      adminData,
      rules,
      submitForm,
      res,
      handleCancel,
      ruleForm,
      pwdIsLoading
    }
  }
}
</script>
<style lang="less">
.admin-modal {
  .form-content {
    margin-top: 10px;
  }
  .modal-footer {
    padding: 0 !important;
    display: flex;
    .btn {
      flex: 1;
      font-weight: 800;
      height: 60px;
      border-radius: 0;
    }
    .btn:hover {
      background-color: var(--theme-color);
    }
  }
}
</style>
