<template>
  <div class="sidebar">
    <div class="left">
      <h2>sa</h2>
    </div>
    <div class="right">
      <MergeButton  v-if = "!$route.meta.keepAlive" @leftclick="back" @rightclick="backHome">
        <template v-slot:left>
          <i class="fa fa-backward"></i>
        </template>
        <template v-slot:right >
          <i class="fa fa-home"></i>
        </template>
      </MergeButton>
    </div>
  </div>
</template>

<script>
import MergeButton from '../Button/MergeButton'
export default {
  name: 'SideBar',
  components: { MergeButton },
  methods: {
    back () {
      if (window.history.length <= 1) {
        this.$router.push({ path: '/' })
        return false
      } else {
        this.$router.go(-1)
      }
    },
    backHome () {
      this.$router.replace({ name: 'Home' })
    }
  }
}
</script>

<style lang="less">
.sidebar{
  color: var(--main-font-color);
  grid-area: sidebar;
  background-color: var(--main-color);
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
