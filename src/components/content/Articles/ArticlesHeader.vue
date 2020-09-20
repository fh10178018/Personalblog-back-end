<template>
  <secondary-navbar>
    <secondary-navbar-item href="/power/content/article" description="攥写文章的内容">
      <template v-slot:item-img>
        <img src="https://hbimg.huabanimg.com/b1afeccfc2b665e540f4a73e50c18999eac8cfd4d8981-4nQOHA_fw658/format/webp"/>
      </template>
      <template v-slot:item-title>博客文章</template>
    </secondary-navbar-item>
    <secondary-navbar-item href="/power/content/vue" description="攥写Vue的内容">
      <template v-slot:item-img>
        <img src="https://hbimg.huabanimg.com/b1afeccfc2b665e540f4a73e50c18999eac8cfd4d8981-4nQOHA_fw658/format/webp"/>
      </template>
      <template v-slot:item-title>Vue</template>
    </secondary-navbar-item>
    <secondary-navbar-item href="/power/content/web" description="攥写web的内容">
      <template v-slot:item-img>
        <img src="https://hbimg.huabanimg.com/b1afeccfc2b665e540f4a73e50c18999eac8cfd4d8981-4nQOHA_fw658/format/webp"/>
      </template>
      <template v-slot:item-title>web</template>
    </secondary-navbar-item>
  </secondary-navbar>
</template>

<script>
import SecondaryNavbar from '../../common/SecondaryNavbar/SecondaryNavbar'
import SecondaryNavbarItem from '../../common/SecondaryNavbar/SecondaryNavbarItem'
export default {
  name: 'ArticlesHeader',
  components: { SecondaryNavbarItem, SecondaryNavbar },
  props: {
    isImg: {
      type: Boolean,
      default: true
    }
  }
}
</script>
