<!--混合双button组件
可以绑定leftclick，rightclick两个不同的点击事件
-->
<template>
  <div class="btn-merge">
    <button class="btn-merge-left"
            @click="handleLeftClick">
      <slot name="left"></slot>
    </button>
    <button class="btn-merge-center"
            @click="handleCenterClick">
      <slot name="center"></slot>
    </button>
    <button class="btn-merge-right"
            @click="handleRightClick">
      <slot name="right"></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'MergeButton',
  setup (props, { emit }) {
    const handleLeftClick = () => {
      emit('leftclick')
    }
    const handleCenterClick = () => {
      emit('centerclick')
    }
    const handleRightClick = () => {
      emit('rightclick')
    }
    return {
      handleLeftClick,
      handleCenterClick,
      handleRightClick
    }
  }
}
</script>

<style lang="less">
.btn-merge {
  border-radius: 100px;
  overflow: hidden;
  button {
    border: 0;
    padding: 5px 10px;
    color: var(--theme-color);
    background-color: var(--main-background-color);
    cursor: pointer;
    transition: background-color 500ms;
  }
  button:focus {
    outline: 0;
  }
  button:hover {
    color: var(--main-color);
    background-color: var(--theme-color);
  }
  .btn-merge-left {
    border-right: 0.5px solid var(--main-color);
  }
  .btn-merge-right {
    border-left: 0.5px solid var(--main-color);
  }
}
</style>
