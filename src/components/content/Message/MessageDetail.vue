<template>
  <div class="message-detail">
    <div class="wrapper">
      <div class="header"><span>邮件详细信息</span><span>{{MessageDetail.creatTime}}</span></div>
      <div class="mailbox-address">
        <div><strong>昵称：</strong>{{MessageDetail.name}}</div>
        <div><strong>邮箱：</strong>{{MessageDetail.email}}</div>
        <div><strong>IP地址：</strong>{{MessageDetail.ip}}</div>
      </div>
      <p class="content">{{MessageDetail.message}}</p>
    </div>
    <div class="action">
      <Button @click="showEditAdminModal('add')"
              type="text"
              :circle="false"><i class="fa fa-trash"></i></Button>
      <Button @click="showEditAdminModal('add')"
              type="text"
              :circle="false"><i class="fa fa-trash"></i></Button>
    </div>
  </div>
</template>

<script>
import Button from '../../common/Button/Button'
import { computed, onMounted, reactive, unref, watch, ref } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'
export default {
  name: 'MessageDetail',
  components: { Button },
  setup () {
    const store = useStore()
    const curID = computed(() => unref(router.currentRoute).params.msgId)
    const isLoading = computed(() => unref(store.state.Message.isLoading).detail)
    const MessageDetail = computed(() => unref(store.state.Message.Message))
    const handleChange = val => {
      setData(val)
    }
    const setData = val => {
      store.dispatch('getMessage', { _id: unref(curID) })
    }
    watch(curID, () => {
      setData({ _id: unref(curID) })
    })
    onMounted(() => {
      setTimeout(() => {
        setData({ _id: unref(curID) })
      }, 20)
    })
    return {
      handleChange,
      MessageDetail,
      isLoading
    }
  }
}
</script>

<style lang="less">
.message-detail {
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  display: flex;
  padding: 10px;
  .wrapper {
    flex: 1;
    z-index: 1;
    border-radius: 5px 0 5px 5px;
    padding: 10px;
    background-color: var(--main-color);
    box-shadow: 0 5px 0 0 rgba(0, 0, 0, 0.14);
    > .header {
      font-size: 18px;
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    > .mailbox-address {
      margin-bottom: 20px;
    }
    > .content {
      font-size: 14px;
      color: #303030;
      line-height: 24px;
    }
  }
  .action {
    z-index: 0;
    transition: 500ms;
    transform: translateX(-35px);
    display: flex;
    flex-direction: column;
    .btn {
      background: var(--main-color);
      border-radius: 0 5px 5px 0;
      line-height: 50px;
      box-shadow: 0 5px 0 0 rgba(0, 0, 0, 0.14);
      padding: 10px;
      margin-bottom: 8px;
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
.message-detail:hover {
  .action {
    transform: translateX(0);
  }
}
</style>
