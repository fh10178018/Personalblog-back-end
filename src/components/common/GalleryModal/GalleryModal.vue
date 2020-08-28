<template>
  <div class="'modal-' + status">
    <div class="modal" >
      <button class="close-btn"  @click="handleModalFade"><i class="fa fa-close"/></button>
      <div class="modal-header">
        <slot name="header"></slot>
      </div>
      <div class="modal-content">
        <slot name="content"></slot>
      </div>
      <div class="modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
    <div class="modal-mask" @click="handleModalFade"></div>
  </div>
</template>

<script>
export default {
  name: 'GalleryModal',
  props: {
    modalStatus: {
      type: String,
      default: 'show'
    }
  },
  watch: {
    modalStatus: function (newVal) {
      this.status = newVal
    }
  },
  data () {
    return {
      status: this.modalStatus
    }
  },
  methods: {
    handleModalFade () {
      this.status = 'fade'
    },
    handleModalShow () {
      this.status = 'show'
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
  .modal-fade{
    opacity: 0;
    visibility:hidden;
  }
  .modal-show{
    opacity: 1;
    visibility:visible;
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
      width: 100%;
      top: auto;
      border-radius: 20px 20px 0 0;
    }
  }
</style>
