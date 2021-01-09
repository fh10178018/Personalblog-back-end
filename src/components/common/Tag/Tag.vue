<template>
  <span class="tag"
        :data-color="dataColor">
    <slot />
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
.tag {
  background: var(--main-background-color);
  font-weight: 500;
  font-size: 10px;
  padding: 1px 5px;
  border-radius: 3px;
  color: var(--theme-color);
}
</style>
