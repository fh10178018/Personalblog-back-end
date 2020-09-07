<template>
  <div class="content">
    <div class="documents-wrapper">
      <DocumentsHeader :docs="allDocs"></DocumentsHeader>
      <router-view v-slot="{ Component }">
        <component  :docs="allDocs" :is="Component"></component>
      </router-view>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DocumentsHeader from './DocumentsHeader'
export default {
  name: 'Documents',
  components: { DocumentsHeader },
  computed: {
    ...mapState({ allDocs: state => state.componentsDocs.allDocs })
  }
}
</script>

<style lang="less">
  .documents-wrapper{
    height: 100%;
  }
  .content{
    grid-area: page;
    height: 100%;
  }
</style>
