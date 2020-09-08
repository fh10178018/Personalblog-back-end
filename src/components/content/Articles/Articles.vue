<template>
  <div class="content">
    <div class="articles-wrapper">
      <ArticlesHeader></ArticlesHeader>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import ArticlesHeader from './ArticlesHeader'
export default {
  name: 'Articles',
  components: { ArticlesHeader }
}
</script>

<style lang="less">
  .articles-wrapper{
    height: 100%;
  }
  .content{
    grid-area: page;
    height: 100%;
  }
</style>
