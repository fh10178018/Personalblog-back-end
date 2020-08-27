<template>
  <div class="tooltip" :data-Adaptation="dataType" :data-content="dataContent" :data-placement="dataPlacement">
    <slot>
      插入需要tooltip的内容
    </slot>
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    content: {
      type: String,
      default: 'Tooltip显示内容',
      required: true
    },
    placement: {
      type: String,
      default: 'Tooltip显示位置',
      required: true
    },
    adaptation_type: {
      type: String,
      default: 'tooltip适配类型，mb ,pc,不填默认都适应并存在'
    }
  },
  data () {
    return {
      dataType: this.adaptation_type,
      dataContent: this.content,
      dataPlacement: this.placement
    }
  }
}
</script>

<style lang="less">
  .tooltip{
    position: relative;
  }

  .tooltip:before{
    display: none;
    position: absolute;
    z-index: 30;
    border: 5px solid;
    content: '';
  }
  .tooltip:after{
    display: none;
    position: absolute;
    line-height: 40px;
    z-index: 30;
    white-space: nowrap;//不换行
    color:white;
    border-radius: 5px;
    padding:0 10px;
    font-size: 15px;
    font-weight: normal;
    background-color: var(--theme-color);
    content: attr(data-content);
  }
  .tooltip[data-placement="right"]:before{
      top: calc(50% - 5px);
      left: 100%;
      border-color: transparent var(--theme-color) transparent transparent;
    }
  .tooltip[data-placement="right"]:after{
    top: calc(50% - 20px);
    left: calc(100% + 10px);//注意大小为宽度+5pxborder宽度*2

  }
    .tooltip[data-placement="left"]:before{
      top: calc(50% - 5px);
      right: 100%;
      border-color:transparent transparent transparent var(--theme-color);
    }
  .tooltip[data-placement="left"]:after{
    top: calc(50% - 20px);
    right: calc(100% + 10px);//注意大小为宽度+5pxborder宽度*2

  }
    .tooltip[data-placement="top"]:before{
      bottom: 100%;
      border-color:var(--theme-color) transparent transparent transparent;
    }
  .tooltip[data-placement="top"]:after{
    bottom: calc(100% + 10px);
    left: -50%;
  }
    .tooltip[data-placement="bottom"]:before{
      top: 100%;
      border-color:transparent transparent var(--theme-color) transparent;

    }
  .tooltip[data-placement="bottom"]:after{
    top: calc(100% + 10px);
    left: -50%;
  }
  .tooltip:hover::after,.tooltip:hover::before{
    display: inline;
  }
  @media screen and (max-width: 830px) {
    .tooltip[data-Adaptation="pc"]:before,.tooltip[data-Adaptation="pc"]:after{
      display: none;
    }
  }
  @media screen and (min-width: 830px) {
    .tooltip[data-Adaptation="mb"]:before,.tooltip[data-Adaptation="mb"]:after{
      display: none;
    }
  }
</style>
