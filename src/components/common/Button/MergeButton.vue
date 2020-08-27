<!--混合双button组件
可以绑定leftclick，rightclick两个不同的点击事件
-->
<template>
  <div class="btn-merge">
    <button class="btn-left" @click="Click1">
      <slot name="left"></slot>
    </button>
    <button class="btn-right" @click="Click2">
      <slot name="right"></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'MergeButton',
  methods: {
    Click1 () {
      this.$emit('leftclick')
    },
    Click2 () {
      this.$emit('rightclick')
    }
  }
}
</script>

<style lang="less">
  .btn-merge{
    border-radius: 100px;
    overflow: hidden;
    button{
      border: 0;
      padding: 5px 10px;
      color: var(--main-color);
      background-color: var(--light-color);
      cursor: pointer;
      transition: background-color 500ms;
    }
    button:focus{
      outline: 0;
    }
    button:hover{
      background-color: var(--theme-color);
    }
  }
</style>
