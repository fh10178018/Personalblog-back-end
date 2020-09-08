<template>
  <div v-html="getDocs" class="markdown" v-highlight></div>
</template>

<script>
import { mapState } from 'vuex'
import 'highlight.js/styles/shades-of-purple.css'
export default {
  name: 'Document',
  computed: {
    ...mapState({ allDocs: state => state.componentsDocs.allDocs }),
    getDocs () {
      const id = this.$route.params.docsId * 1
      return this.allDocs[id].docs
    }
  }
}
</script>

<style lang="less">
  .markdown {
    background-color: var(--main-color);
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
    margin: 5px;
    padding: 5px 15px;
  }
</style>
