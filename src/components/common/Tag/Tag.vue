<template>
  <span class="tag" :data-color="dataColor">
    <slot/>
  </span>
</template>

<script>
export default {
  name: 'Tag',
  props: {
    color: {
      type: String,
      default: 'primary'
    }
  },
  data () {
    return {
      dataColor: this.props
    }
  }
}
</script>

<style scoped>
  .tag{
    background: var(--theme-color);
    padding: 0.5px 5px;
    border-radius: 3px;
    color: white;
  }
</style>
