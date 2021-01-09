<template>
  <div class="admin-modal">
    <Modal size="lg"
           top="5vh"
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
            <FormItem rulesName="title">
              <InputString placeholder="标题"
                           v-model="adminData.title"
                           clearable />
            </FormItem>
            <FormItem rulesName="introduction">
              <InputString placeholder="介绍"
                           v-model="adminData.introduction"
                           clearable />
            </FormItem>
            <FormItem rulesName="imageUrl">
              <UploadSingleImage placeholder="日志封面图片"
                                 description="日志图片"
                                 v-model="adminData.imageUrl"
                                 :size="[360,200]" />
            </FormItem>
            <FormItem rulesName="types">
              <CheckBoxGroup placeholder="日志类型"
                             v-model="adminData.types">
                <CheckBox v-for="(item,index) in typesList"
                          :key="index"
                          :value="item.name"
                          :label="item.name" />
              </CheckBoxGroup>
            </FormItem>
            <FormItem rulesName="content">
              <MarkdownEditor placeholder="内容"
                              v-model="adminData.content"></MarkdownEditor>
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
import { CheckBox, CheckBoxGroup } from '@/components/common/CheckBox'
import Button from '@/components/common/Button/Button.vue'
import MarkdownEditor from '@/components/common/MarkdownEditor'
import { ref, unref, reactive, computed, toRefs } from 'vue'
import reactiveToObject from '@/utils/reactiveToObject'
import { useStore } from 'vuex'
import UploadSingleImage from '../Upload/UploadSingleImage.vue'

export default {
  components: { Modal, Button, CheckBox, MarkdownEditor, UploadSingleImage, CheckBoxGroup },
  name: 'EditArticlesModal',
  props: {
    curType: [String]
  },
  setup (props) {
    const { curType } = toRefs(props)
    const res = ref(false)
    const Modal = ref(null)
    const ruleForm = ref(null)
    const isAdd = ref(false)
    const store = useStore()
    const type = computed(() => unref(curType))
    const typesList = computed(() => store.state.Blog.BlogTypes)
    const editIsLoading = computed(() => unref(store.state.User.isLoading).edit)
    const showTitle = computed(() => unref(isAdd) ? '创建日志' : '修改日志')
    const adminData = reactive({
      _id: '',
      title: '',
      introduction: '',
      imageUrl: '',
      content: '',
      types: []
    })
    const rules = reactive({
      title: [
        { required: true, message: '请输入日志标题', trigger: 'blur' },
        { min: 3, max: 32, message: '长度为 3 到 32 个字符', trigger: 'blur' }
      ],
      introduction: [
        { required: true, message: '请输入日志简要介绍', trigger: 'blur' },
        { min: 5, max: 100, message: '长度为 5 到 100 个字符', trigger: 'blur' }
      ],
      imageUrl: [
        { required: true, message: '请上传图片', trigger: 'blur' }
      ],
      content: [
        { required: true, message: '请输入日志内容', trigger: 'blur' },
        { min: 100, max: 99999, message: '长度为 100 到 99999 个字符', trigger: 'blur' }
      ],
      types: [
        { required: true, message: '请选择类别', trigger: 'blur' }
      ]
    })
    const getModal = () => {
      return unref(Modal)
    }
    const getRuleForm = () => { // 获得实例对象
      return unref(ruleForm)
    }
    const handleShow = val => {
      val = unref(val)
      if (val !== 'add') {
        adminData._id = val._id
        adminData.title = val.title
        adminData.introduction = val.introduction
        adminData.imageUrl = val.imageUrl
        adminData.content = val.content
        adminData.types = val.types
        isAdd.value = false
      } else {
        adminData._id = ''
        adminData.title = ''
        adminData.introduction = ''
        adminData.imageUrl = ''
        adminData.content = ''
        adminData.types = []
        isAdd.value = true
      }
      const { handleModalShow } = getModal()
      handleModalShow()
    }

    const submitForm = () => {
      const { handleModalFade } = getModal()
      getRuleForm().validate((valid) => {
        if (valid) { // 验证都成功
          store.dispatch('EditBlog', { adminDate: reactiveToObject(adminData), handleModalFade, type: unref(type) })
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
      editIsLoading,
      typesList
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
