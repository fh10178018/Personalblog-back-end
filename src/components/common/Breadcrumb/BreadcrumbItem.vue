<template>
  <span
    class="breadcrumb-item"
    role="navigation"
  >
    <span
    :class="['title', to ? 'is-link' : '']"
    ref="link"
    role="link"
    >
      <slot></slot>
    </span>
    <span class="separator">{{ separator }}</span>
  </span>
</template>
<script>
import { onMounted, toRefs, unref,inject,getCurrentInstance,ref } from 'vue'
export default {
  name: 'BreadcrumbItem',
  props: {
    to: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {
    const { to } = toRefs(props)
    const link = ref(null)
    const separator = inject('separator')
    const { proxy } = getCurrentInstance()
    onMounted(() => {
      unref(link).setAttribute('role', 'link')
      unref(link).addEventListener('click', () => {
        if (!unref(to) || !proxy.$router) return
        proxy.$router.push(unref(to))
      })
    })
    return {
      separator,
      link
    }
  }
}
</script>
<style lang="less">
.breadcrumb-item{
  >.title{
    color: #606266;
  }
  >.is-link{
    font-weight: 700;
    text-decoration: none;
    transition: color .2s cubic-bezier(.645,.045,.355,1);
    color: #303133;
  }
  >.separator{
    margin: 0 9px;
    font-weight: 700;
    color: #c0c4cc;
  }
}
.breadcrumb-item:last-child{
  >.separator{
    display: none;
  }
}
</style>