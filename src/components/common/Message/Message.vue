<template>
  <transition name="slide">
    <div class="message-wrap" :class="type" v-if="visible">
      <div class="info">
        <i class="fa" :class="iconClass"></i>
        <div class="content">
          <h2>{{content}}</h2>
          <p>{{nowDate}}</p>
        </div>
      </div>
      <button @click="hideMessage">知道了</button>
    </div>
</transition>
</template>

<script>
import Format from '@/config/data_format'

export default {
  name: 'Message',
  data () {
    return {
      visible: false,
      content: '正在加载',
      type: 'info'
    }
  },
  methods: {
    showMessage (opt) {
      opt = opt || {}
      this.content = opt.content || '正在加载'
      this.type = opt.type
      this.visible = true
      window.setTimeout(() => {
        this.visible = false
      }, 3000)
    },
    hideMessage () {
      this.visible = false
    }
  },
  computed: {
    nowDate () {
      const date = new Date()
      return Format('yyyy-MM-dd hh:mm:ss', date)
    },
    iconClass () {
      switch (this.type) {
        case 'error':
          return 'fa-exclamation-circle'
        case 'success':
          return 'fa-check-square-o'
        default:
          return 'fa-commenting'
      }
    }
  }
}
</script>

<style lang="less">
  .message-wrap {
    position: fixed;
    background-color: var(--theme-color);
    color: var(--main-color);
    left: 0;
    right: 0;
    margin: auto;
    width: 300px;
    top: 25px;
    padding: 10px;
    height: auto;
    z-index: 1001;
    border-radius: 4px;
    text-align: center;
    transition: 0.5s;
    border: 1px solid #ebeef5;
    .info{
      display: flex;
      justify-content: space-between;
      align-items: center;
      i{
        width: 60px;
        text-align: left;
        font-size: 50px;
      }
      .content {
        flex: 1;
        text-align: left;
        h3{
          line-height: 30px;
        }
        p{
          font-size: 12px;
          opacity: 0.8;
        }
      }
    }
    button{
      margin-top: 10px;
      padding: 10px 0;
      border-radius: 4px;
      color: var(--main-color);
      border: 0;
      width: 100%;
      background-color: rgba(255,255,255,0.5);
      cursor: pointer;
    }
  }
  .error {
    background-color: var(--error-color);
  }
  .success {
    background-color: green;
  }
  .slide-enter-active,.slide-leave-active {
    transform: translateY(-150%);
  }
  .slide-enter,.slide-leave-to {
    transform: translateY(-150%);
  }
</style>
