<template>
  <div v-html="getDocs" class="markdown-body" v-highlight></div>
</template>

<script>
import { mapState } from 'vuex'
import 'highlight.js/styles/an-old-hope.css'
import 'github-markdown-css/github-markdown.css'
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
  .markdown-body {
    background-color: var(--main-color);
    overflow-y: auto;
    overflow-x: hidden;
    color: var(--main-font-color);
    flex: 1;
    margin: 5px;
    padding: 5px 15px;
    pre {
      background-color: var(--main-background-color);
    }
  }
</style>
