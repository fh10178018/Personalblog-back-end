<template>
  <secondary-navbar>
    <secondary-navbar-item href="/power/usercontrol/admin" description="管理员表单内容">
      <template v-slot:itemTitle>管理员管理</template>
    </secondary-navbar-item>
  </secondary-navbar>
</template>

<script>
import SecondaryNavbar from '../../common/SecondaryNavbar/SecondaryNavbar'
import SecondaryNavbarItem from '../../common/SecondaryNavbar/SecondaryNavbarItem'
export default {
  name: 'UserControlHeader',
  components: { SecondaryNavbarItem, SecondaryNavbar },
  props: {
    isImg: {
      type: Boolean,
      default: true
    }
  }
}
</script>
