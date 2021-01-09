<template>
  <secondary-navbar>
    <secondary-navbar-item href="/power/message/all">
      <template v-slot:itemTitle>收件箱</template>
    </secondary-navbar-item>
  </secondary-navbar>
</template>

<script>
import SecondaryNavbar from '../../common/SecondaryNavbar/SecondaryNavbar'
import SecondaryNavbarItem from '../../common/SecondaryNavbar/SecondaryNavbarItem'

export default {
  name: 'ArticlesHeader',
  components: { SecondaryNavbarItem, SecondaryNavbar }

}
</script>
