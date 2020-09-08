<template>
  <secondary-navbar>
    <secondary-navbar-item v-for="(item, index) in allDocs" :key="index" :href="'/power/docs/' + item._id" :description="item.name + ' 组件文档'">
      <template v-slot:item-img>
        <img src="https://hbimg.huabanimg.com/b1afeccfc2b665e540f4a73e50c18999eac8cfd4d8981-4nQOHA_fw658/format/webp"/>
      </template>
      <template v-slot:item-title>{{item.name}}</template>
    </secondary-navbar-item>
  </secondary-navbar>
</template>

<script>
import { mapState } from 'vuex'
import SecondaryNavbar from '../../common/SecondaryNavbar/SecondaryNavbar'
import SecondaryNavbarItem from '../../common/SecondaryNavbar/SecondaryNavbarItem'
export default {
  name: 'DocumentsHeader',
  computed: {
    ...mapState({ allDocs: state => state.componentsDocs.allDocs })
  },
  components: { SecondaryNavbarItem, SecondaryNavbar }
}
</script>

<style lang="less">

</style>
