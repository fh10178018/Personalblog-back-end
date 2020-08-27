<template>
  <router-view  v-slot="{ Component }">
    <transition :name="transitionName" mode="out-in">
      <component class="child-view" :key="key" :title="key" :is="Component"></component>
    </transition>
  </router-view>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      transitionName: 'first-enter'
    }
  },
  computed: {
    key () {
      return this.$route.fullPath.split('/')[1]
    }
  },
  watch: {
    '$route' () {
      this.transitionName = 'slide-left'
    }
  }
}
</script>

<style lang="less">
  @import "assets/css/main";
  #app{
    overflow: hidden;
  }
  .child-view{
    overflow: hidden;
    height: 100vh;
    width: 100vw;
    transition: all .5s ease-out;
  }
  .first-enter-enter-active{
    animation: bounce-in .5s;
  }
  .slide-left-leave-active{
    opacity: 0;
    transform: translateX(-100%);
  }
  .slide-left-enter-active{
    opacity: 0;
    transform: translateX(100%);
  }
</style>
