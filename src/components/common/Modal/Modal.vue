<!--Modal组件
初始化属性modalStatus（值为fade或show），来初始化modal的初始出现状态
可以通过父访问子的方式，进行handleModalShow
-->
<template>
  <div class="modal" v-show="visable">
    <transition name="slide-top" appear>
      <div v-show="visable" class="modal" :class="size">
        <button class="close-btn"  @click="handleModalFade"><i class="fa fa-close"></i></button>
        <div class="modal-header" v-if="slots.header">
          <slot name="header"></slot>
        </div>
        <div class="modal-content" v-if="slots.content">
          <slot name="content"></slot>
        </div>
        <div class="modal-footer"  v-if="slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </transition>
    <div v-if="mask" class="modal-mask" @click="handleModalFade"></div>
  </div>
</template>

<script>
import {
  toRefs,
  ref,
  unref,
  onMounted
} from 'vue'

const useModal = (
) => {
  const visable = ref(false)

  return {
    visable
  }
}

const useInteractive = (
  visable
) => {
  const handleModalFade = () => {
    visable.value = false
  }
  const handleModalShow = () => {
    visable.value = true
  }

  return {
    handleModalFade,
    handleModalShow,
    visable
  }
}

export default {
  name: 'Modal',
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'lg'
    },
    mask: { // 决定是否显示遮罩层
      type: Boolean,
      default: true
    }
  },
  setup (props, { slots }) {
    const { showModal } = toRefs(props)

    const {
      visable
    } = useModal()

    const {
      handleModalFade,
      handleModalShow
    } = useInteractive(
      visable
    )

    onMounted(() => {
      visable.value = unref(showModal)
    })

    return {
      slots,
      handleModalFade,
      handleModalShow,
      ...toRefs(props),
      visable
    }
  }
}
</script>

<style lang="less">
  .modal{
    width: 80%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 2000;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0,0,0,.3);
    display: grid;
    grid-auto-rows: minmax(min-content, max-content);
    height: max-content;
    grid-template-areas: "header" "content" "footer";
    transition: 500ms;
    .close-btn{
      position: absolute;
      top: 0;
      right: 0;
      width: 36px;
      height: 36px;
      background-color: transparent;
      border: 0;
      font-size: 25px;
      cursor: pointer;
    }
    .close-btn:hover{
      color: #d2b356;
    }
    .close-btn:focus{
      outline: 0;
    }
    .modal-header{
      grid-area: header;
      padding: 10px;
      font-size: 18px;
    }
    .modal-content{
      grid-area: content;
      padding: 10px;
    }
    .modal-footer{
      grid-area: footer;
      padding: 10px;
    }
  }
  .modal.lg{
    width: 80%;
  }
  .modal.xs{
    width: 50%;
  }
  .modal.sm{
    width: 40%;
  }
  .modal-mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #e5e5e5;
    opacity: 0.6;
    z-index: 1000;
  }
  @media screen and (max-width: 830px){
    .modal{
      width: 100% !important;
      top: auto;
      border-radius: 20px 20px 0 0;
    }
  }
  .slide-top-leave-active{
    opacity: 0;
    transform: translateY(-100%);
  }
  .slide-top-enter-active{
    opacity: 0;
    transform: translateY(100%);
  }
  .fade-enter-active {
    opacity: 0;
  }
  .fade-leave-active {
    opacity: 0;
  }
</style>
