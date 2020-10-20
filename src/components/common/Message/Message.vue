<!--
这里最重要的第一点，便是handleAfterLeave和v-show的结合
v-show,任然留有缓存
且能实现离开时下个信息向上的补充动画
v-if是两者的结合，但缺点有很多，同时会留下注释痕迹,个人感觉是留有缓存
但切记便是handleAfterLeave和v-if无法结合，v-if会导致节点删除，无法进一步删除，且冲突
-->
<template>
<transition name="message-slide" @after-leave="handleAfterLeave" appear>
  <div class="message-item"
       :class="msgClass"
       v-show="!closed"
       @mouseenter="clearTimer"
       @mouseleave="startTimer"
       role="alert"
  >
    <div class="info">
      <i class="fa" :class="iconClass"></i>
      <div class="content">
        <h5>{{content}}</h5>
        <p v-if="showDate">{{nowDate}}</p>
      </div>
    </div>
    <Button
      v-if="showClose"
      @click="close"
      type="text"
    >
      <i class="fa fa-close"></i>
    </Button>
  </div>
</transition>
</template>

<script>
import {
  toRefs,
  onMounted,
  onUnmounted
} from 'vue'
import {
  useMessage,
  useInteractive
} from './use'
import Button from '../Button/Button'

export default {
  name: 'Message',
  components: { Button },
  props: {
    duration: {
      type: Number,
      default: 3000
    },
    center: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'info',
      validator (val) {
        return ['success', 'warning', 'info', 'error'].indexOf(val) > -1
      }
    },
    content: {
      type: String,
      default: ''
    },
    showClose: {
      type: Boolean,
      default: false
    },
    showDate: {
      type: Boolean,
      default: true
    },
    onClose: {
      type: Function,
      required: true
    }
  },
  setup (props) {
    const { duration, center, type, onClose } = toRefs(props)

    const {
      closed,
      timer,
      msgClass,
      iconClass,
      nowDate
    } = useMessage(
      center,
      type
    )

    const {
      close,
      clearTimer,
      startTimer,
      keydown,
      handleAfterLeave
    } = useInteractive(
      duration,
      onClose,
      timer,
      closed
    )

    onMounted(() => {
      startTimer()
      document.addEventListener('keydown', keydown)
    })

    onUnmounted(() => {
      document.removeEventListener('keydown', keydown)
    })

    return {
      closed,
      msgClass,
      nowDate,
      iconClass,
      clearTimer,
      startTimer,
      close,
      handleAfterLeave,
      ...toRefs(props)
    }
  }
}
</script>

<style lang="less">
  #messageWrap{
    position: fixed;
    z-index: 2000;
    right: 1%;
    top: 1%;
  }
  .message-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--main-color);
    width: 300px;
    padding: 5px;
    margin-bottom: 5px;
    height: auto;
    border-radius: 4px;
    text-align: center;
    transition: 0.5s;
    border: 1px solid #ebeef5;
    .info{
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      i{
        width: 60px;
        text-align: center;
        font-size: 50px;
      }
      .content {
        flex: 1;
        text-align: left;
        p{
          margin-top: 5px;
          font-size: 12px;
          opacity: 0.8;
        }
      }
    }
    button{
      color: white;
    }
  }
  .message-item.message-info {
    background-color: var(--theme-color);
  }
  .message-item.message-error {
    background-color: var(--error-color);
  }
  .message-item.message-success {
    background-color: #00b462;
  }
  .message-item.message-warning {
    background-color: #f2bd1d;
  }
  .message-slide-enter-active,.message-slide-leave-active {
    opacity: 0;
    transform: translateY(-150%);
  }
  .message-slide-enter,.message-slide-leave-to {
    opacity: 0;
    transform: translateY(-150%);
  }
</style>
