<template>
  <div class="articles-wrapper">
    <ArticlesHeader></ArticlesHeader>
    <Articleslist></Articleslist>
  </div>
</template>

<script>
import Articleslist from './Articleslist'
import ArticlesHeader from './ArticlesHeader'
export default {
  name: 'Articles',
  components: { ArticlesHeader, Articleslist }
}
</script>

<style lang="less">
  .articles-wrapper{
    margin: 0 auto;
    height: 100%;
    display: grid;
    grid-template-columns: 200px auto;
  }
</style>
