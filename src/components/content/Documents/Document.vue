<template>
  <div v-html="getDocs" class="markdown"></div>
</template>

<script>
export default {
  name: 'Document',
  props: {
    docs: {
      type: Array,
      default: null,
      require: true
    }
  },
  computed: {
    getDocs () {
      const id = this.$route.params.docsId * 1
      return this.docs[id].docs
    }
  },
  mounted () {
    console.log(this.docs[0])
  }
}
</script>

<style lang="less">
  .markdown {
    background-color: var(--main-color);
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
  }
</style>
