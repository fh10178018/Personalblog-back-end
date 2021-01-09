<template>
  <Form :model="resumeData"
        :rules="rules"
        ref="editForm">
    <div class="header">
      <div class="line1">
        <FormItem rulesName="name"
                  class="name">
          <ContentEdit v-model="resumeData.name"></ContentEdit>
        </FormItem>
        <FormItem rulesName="jobIntention"
                  class="jobIntention">
          <ContentEdit label="求职意向"
                       v-model="resumeData.jobIntention"></ContentEdit>
        </FormItem>
      </div>
      <div class="line2"></div>
      <div class="line3">
        <FormItem rulesName="birthdate"
                  class="birthdate">
          <ContentEdit label="出生年月"
                       v-model="resumeData.birthdate"></ContentEdit>
        </FormItem>
        <FormItem rulesName="finalEducation"
                  class="finalEducation">
          <ContentEdit label="学历"
                       v-model="resumeData.finalEducation"></ContentEdit>
        </FormItem>
        <FormItem rulesName="major"
                  class="major">
          <ContentEdit label="专业"
                       v-model="resumeData.major"></ContentEdit>
        </FormItem>
        <FormItem rulesName="tel"
                  class="tel">
          <ContentEdit label="联系电话"
                       v-model="resumeData.tel"></ContentEdit>
        </FormItem>
        <FormItem rulesName="email"
                  class="email">
          <ContentEdit label="邮箱"
                       v-model="resumeData.email"></ContentEdit>
        </FormItem>
        <FormItem rulesName="web"
                  class="web">
          <ContentEdit label="个人网站"
                       v-model="resumeData.web"></ContentEdit>
        </FormItem>
      </div>
    </div>
    <div class="content">
      <div class="line4">
        <title>教育背景</title>
      </div>
      <FormItem rulesName="educationBackground"
                class="educationBackground">
        <ContentEdit v-model="resumeData.educationBackground"></ContentEdit>
      </FormItem>
      <div class="line4">
        <title>工作经验</title>
      </div>
      <FormItem rulesName="workExperience"
                class="workExperience">
        <ContentEdit v-model="resumeData.workExperience"></ContentEdit>
      </FormItem>
      <div class="line4">
        <title>项目</title>
      </div>
      <FormItem rulesName="project"
                class="project">
        <ContentEdit v-model="resumeData.project"></ContentEdit>
      </FormItem>
    </div>
  </Form>
  {{resumeData}}
</template>

<script>
import Form from '@/components/common/Form/Form.vue'
import FormItem from '@/components/common/FormItem/FormItem.vue'
import ContentEdit from '@/components/common/ContentEdit/ContentEdit.vue'
import { computed, reactive, ref, unref, watch } from 'vue'
import store from '@/store'
import UploadImage from '@/components/content/Upload/UploadSingleImage.vue'

export default {
  name: 'ResumeForm',
  components: { Form, FormItem, ContentEdit, UploadImage },
  setup () {
    const editForm = ref(null)
    const newResume = computed(() => store.state.Resumes.newResumes)
    const resumeData = reactive(store.state.Resumes.newResumes)
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
    const showClass = computed(() => {
      return key => {
        return [key]
      }
    })

    watch(() => unref(newResume),
      (newVal) => {
        for (const key in newVal) {
          resumeData[key] = newVal[key]
        }
      })
    return {
      resumeData,
      rules,
      editForm,
      showClass
    }
  }
}
</script>

<style lang="less">
.background {
  form {
    display: grid;
    margin: 20px 45px;
    grid-template-columns: 190px auto;
    grid-template-areas:
      "userImg header"
      "content content";
    .form-item {
      margin: 0;
    }
    .userImg {
      width: 189px;
      height: 254px;
      grid-area: userImg;
    }
    .header {
      margin: 0 10px;
      grid-area: header;
      .line1 {
        display: flex;
        align-items: flex-end;
        height: 100px;
        padding: 0 5px 20px 5px;
      }
      .line2 {
        width: 100%;
        height: 3px;
        background-image: linear-gradient(
          to right,
          var(--main-font-color) 0%,
          var(--main-font-color) 50%,
          transparent 50%
        );
        background-size: 23px 3px;
        background-repeat: repeat-x;
      }
      .line3 {
        margin-bottom: 20px;
        display: grid;
        grid-template-columns: 50% 50%;
        font-size: large;
        font-weight: 600;
        .form-item {
          margin-top: 44px;
        }
      }
    }
    .content {
      grid-area: content;
      .line4 {
      }
    }
    .name {
      width: 280px;
      font-size: xxx-large;
      font-weight: 700;
    }
    .jobIntention {
      font-size: x-large;
    }
    .birthdate {
    }
    .finalEducation {
    }
    .major {
    }
    .tel {
    }
    .email {
    }
    .web {
    }
    .educationbackground {
    }
    .workexperience {
    }
    .project {
    }
  }
}
</style>
