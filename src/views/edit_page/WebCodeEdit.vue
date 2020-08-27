<template>
  <div class="edit-code">
    <WebEditor></WebEditor>
  </div>
</template>

<script>
import WebEditor from 'components/Editor/WebEditor/WebEditor'
export default {
  name: 'WebCodeEdit',
  components: { WebEditor }
}
</script>

<style lang="less">
  .edit-code{
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: relative;
    grid-area: page;
  }
</style>
