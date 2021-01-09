<template>
  <div class="admin-modal">
    <Modal size="sm"
           :loading="editIsLoading"
           :closeOnClickMask="false"
           :showClose="false"
           ref="Modal">
      <template v-slot:header>
        <h3>{{showTitle}}</h3>
      </template>
      <template v-slot:content>
        <div class="form-content">
          <Form :model="adminData"
                :rules="rules"
                ref="ruleForm">
            <FormItem rulesName="username">
              <InputString placeholder="账号"
                           v-model="adminData.username"
                           clearable />
            </FormItem>
            <FormItem rulesName="name">
              <InputString placeholder="姓名"
                           v-model="adminData.name"
                           clearable />
            </FormItem>
            <FormItem rulesName="password"
                      v-if="isAdd">
              <InputString placeholder="密码"
                           v-model="adminData.password"
                           clearable />
            </FormItem>
            <FormItem>
              <CheckBox v-model="adminData.isAdmin">是否具有管理员权限</CheckBox>
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
                :loading="editIsLoading"
                @click="submitForm">
          <span>确定</span>
        </Button>
      </template>
    </Modal>
  </div>
</template>
<script>
import Modal from '@/components/common/Modal/Modal.vue'
import { CheckBox } from '@/components/common/CheckBox'
import Button from '@/components/common/Button/Button.vue'
import { ref, unref, reactive, computed } from 'vue'
import reactiveToObject from '@/utils/reactiveToObject'
import { useStore } from 'vuex'

export default {
  components: { Modal, Button, CheckBox },
  name: 'EditAdminModal',
  props: {

  },
  setup (props) {
    const res = ref(false)
    const Modal = ref(null)
    const ruleForm = ref(null)
    const isAdd = ref(false)
    const store = useStore()
    const editIsLoading = computed(() => unref(store.state.User.isLoading).edit)
    const showTitle = computed(() => unref(isAdd) ? '创建管理员用户' : '修改管理员用户')
    const adminData = reactive({
      _id: '',
      username: '',
      name: '',
      isAdmin: false,
      password: ''
    })
    const rules = reactive({
      username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 3, max: 32, message: '长度为 3 到 32 个字符', trigger: 'blur' }
      ],
      name: [
        { required: true, message: '请输入账号昵称', trigger: 'blur' },
        { min: 2, max: 8, message: '长度为 2 到 8 个字符', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 3, max: 18, message: '长度为 3 到 32 个字符', trigger: 'blur' }
      ]
    })
    const getModal = () => {
      return unref(Modal)
    }
    const getRuleForm = () => { // 获得实例对象
      return unref(ruleForm)
    }
    const handleShow = val => {
      if (val !== 'add') {
        adminData._id = val._id
        adminData.username = val.username
        adminData.name = val.name
        adminData.password = val.password
        adminData.isAdmin = val.isAdmin
        isAdd.value = false
      } else {
        adminData._id = ''
        adminData.username = ''
        adminData.name = ''
        adminData.password = ''
        adminData.isAdmin = false
        isAdd.value = true
      }
      const { handleModalShow } = getModal()
      handleModalShow()
    }

    const submitForm = () => {
      const { handleModalFade } = getModal()
      getRuleForm().validate((valid) => {
        if (valid) { // 验证都成功
          store.dispatch('EditAdminUser', { adminDate: reactiveToObject(adminData), handleModalFade })
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
      showTitle,
      isAdd,
      ruleForm,
      editIsLoading
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
