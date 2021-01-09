<template>
  <div class="content">
    <div class="resume-edit-wrapper">
      <div class="edit-box">
        <div class="edit-content">
          <div class="background">
            <ResumeForm></ResumeForm>
          </div>
        </div>
      </div>
      <div class="action">
        <Button @click="showEditAdminModal('add')"
                type="text"
                :circle="false"><i class="fa fa-plus"></i></Button>
      </div>
    </div>
  </div>
</template>

<script>
import ResumeForm from './ResumeForm'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
export default {
  components: { ResumeForm },
  name: 'ReumeEdit',
  setup () {
    const res = ref('asd')
    const store = useStore()
    const getResumes = () => {
      store.dispatch('getResumes')
    }
    onMounted(() => {
      getResumes()
    })
    return {
      res
    }
  }
}
</script>

<style lang="less">
.resume-edit-wrapper {
  height: 100%;
  display: flex;
  padding: 10px;
  .edit-box {
    flex: 1;
    z-index: 1;
    border-radius: 5px 0 5px 5px;
    background-color: var(--main-color);
    box-shadow: 0 5px 0 0 rgba(0, 0, 0, 0.14);
    overflow: scroll;
    padding: 10px;
    .edit-content {
      width: 1019.4px;
      height: 1441.43px;
      position: relative;
      background-color: var(--resume-theme-color);
      .background {
        position: absolute;
        width: calc(100% - 36px);
        height: calc(100% - 36px);
        border-radius: 150px 0 150px 0;
        top: 0;
        left: 0;
        margin: 18px;
        background-color: white;
      }
    }
  }
  > .action {
    z-index: 0;
    transition: 500ms;
    transform: translateX(-35px);
    .btn {
      background: var(--main-color);
      border-radius: 0 5px 5px 0;
      line-height: 50px;
      box-shadow: 0 5px 0 0 rgba(0, 0, 0, 0.14);
      padding: 10px;
      i {
        transition: 500ms;
      }
    }
    .btn:hover {
      color: var(--theme-color) !important;
      i {
        transform: scale(1.4);
      }
    }
    .btn:focus {
      color: var(--theme-color);
    }
  }
}
.resume-edit-wrapper:hover {
  .action {
    transform: translateX(0);
  }
}
.content {
  grid-area: page;
  height: 100%;
  overflow: hidden;
}
</style>
