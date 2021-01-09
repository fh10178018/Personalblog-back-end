<template>
  <secondary-navbar>
    <secondary-navbar-item href="/power/content/all"
                           description="所有日志">
      <template v-slot:itemTitle>全部日志</template>
    </secondary-navbar-item>
    <secondary-navbar-item v-for="(item,index) in data"
                           :key="index"
                           :href="`/power/content/${item.name}`"
                           :description="item.introduction">
      <template v-slot:itemTitle>{{item.name}}</template>
    </secondary-navbar-item>
  </secondary-navbar>
</template>

<script>
import SecondaryNavbar from '../../common/SecondaryNavbar/SecondaryNavbar'
import SecondaryNavbarItem from '../../common/SecondaryNavbar/SecondaryNavbarItem'
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'

export default {
  name: 'ArticlesHeader',
  components: { SecondaryNavbarItem, SecondaryNavbar },
  props: {
    isImg: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {
    const store = useStore()
    const data = computed(() => store.state.Blog.BlogTypes)
    const setData = tableQuery => {
      store.dispatch('getBlogTypes')
    }
    onMounted(() => {
      setTimeout(() => {
        setData()
      }, 20)
    })
    return {
      data
    }
  }
}
</script>
