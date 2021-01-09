<template>
  <div class="content">
    <div class="articles-wrapper">
      <ArticlesHeader></ArticlesHeader>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component"></component>
        </keep-alive>
      </router-view>
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
.articles-wrapper {
  height: 100%;
  display: flex;
}
.content {
  grid-area: page;
  height: 100%;
}
</style>
