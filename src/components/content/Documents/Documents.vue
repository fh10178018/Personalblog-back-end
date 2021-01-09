<template>
  <div class="documents-wrapper">
    <DocumentsHeader></DocumentsHeader>
    <router-view v-slot="{ Component }">
      <component :is="Component"></component>
    </router-view>
  </div>
</template>

<script>
import DocumentsHeader from './DocumentsHeader'
export default {
  name: 'Documents',
  components: { DocumentsHeader }
}
</script>

<style lang="less">
  .documents-wrapper{
    grid-area: page;
    height: 100%;
    display: flex;
  }
  .content{
    grid-area: page;
    height: 100%;
  }
</style>
