<template>
  <div class="layout-box">
    <Header />
    <SideBar />
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
    <Footer />
  </div>
</template>

<script>
import Header from 'components/content/Header'
import SideBar from 'components/content/SideBar/SideBar'
import Footer from 'components/common/Footer/Footer'
export default {
  name: 'Layout',
  components: { Footer, SideBar, Header }
}
</script>

<style lang="less">
.layout-box {
  height: 85vh;
  max-width: 1300px;
  margin: 40px auto;
  display: grid;
  grid-template-columns: 200px 1100px;
  grid-template-areas:
    "header sidebar"
    "header page"
    "header footer";
  grid-template-rows: 50px calc(85vh - 70px) 20px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
}
@media screen and (max-width: 1300px) {
  .layout-box {
    grid-template-columns: 50px auto;
    grid-template-rows: 50px calc(100vh - 70px) 20px;
    height: 100vh;
    border-radius: 0;
    margin: 0 auto;
  }
}
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
</style>
