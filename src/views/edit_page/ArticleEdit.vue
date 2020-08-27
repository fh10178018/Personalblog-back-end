<template>
  <div class="edit-article">
    <WangEditor></WangEditor>
  </div>
</template>

<script>
import WangEditor from 'components/Editor/WangEditor/WangEditor'
export default {
  name: 'ArticleEdit',
  components: { WangEditor }
}
</script>

<style lang="less">
.edit-article{
  width: 100%;
  height: 100%;
  background-color: var(--main-color);
  grid-area: page;
}
</style>
