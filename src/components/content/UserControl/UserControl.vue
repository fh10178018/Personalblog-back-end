<template>
  <div class="content">
    <div class="user-control-wrapper">
      <UserControlHeader></UserControlHeader>
      <router-view v-slot="{ Component }">
        <component :is="Component"></component>
      </router-view>
    </div>
  </div>
</template>

<script>
import UserControlHeader from './UserControlHeader'
export default {
  name: 'UserControl',
  components: { UserControlHeader }
}
</script>

<style lang="less">
.user-control-wrapper {
  height: 100%;
  display: flex;
}
.content {
  grid-area: page;
  height: 100%;
}
</style>
