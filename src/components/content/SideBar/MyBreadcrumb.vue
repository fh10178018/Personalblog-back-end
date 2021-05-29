<template>
  <Breadcrumb>
    <template v-for="item in matched" :key="item.path">
      <BreadcrumbItem  v-if="item.meta.title" :to="item">{{ item.meta.title }}</BreadcrumbItem>
    </template>
  </Breadcrumb>
</template>

<script>
import { computed, getCurrentInstance,unref } from 'vue'
import router from '@/router'
import {
  BreadcrumbItem,
  Breadcrumb
} from '@/components/common/Breadcrumb'

export default {
  name: 'MyBreadcrumb',
  components:{
    BreadcrumbItem,
    Breadcrumb
  },
  setup () {
    debugger
    const {proxy} = getCurrentInstance()
    const route = computed(() => unref(proxy.$router.currentRoute))
    const matched = computed(() => unref(route).matched.filter(item => {
        if (item.name) {
          return true
        }
      }))
    console.log(unref(matched))
    return {
      matched
    }
  }
}
</script>

<style lang="less">

</style>
