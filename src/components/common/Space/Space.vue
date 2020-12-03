<template>
  <div class="space-wrap">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'Space'
}
</script>
<style lang="less">
.space-wrap {
  display: flex;
  justify-content: space-between;
}
</style>
