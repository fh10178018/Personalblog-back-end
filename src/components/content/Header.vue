<template>
  <header>
    <navbar>
      <navbar-item href="/power/home">
        <template v-slot:item-icon><i class="fa fa-home"></i></template>
        <template v-slot:item-text>主页</template>
      </navbar-item>
      <navbar-item href="/power/content">
        <template v-slot:item-icon><i class="fa fa-edit"></i></template>
        <template v-slot:item-text>博客内容</template>
      </navbar-item>
      <navbar-item href="/power/message">
        <template v-slot:item-icon><i class="fa fa-edit"></i></template>
        <template v-slot:item-text>联系信息</template>
      </navbar-item>
      <navbar-item href="/power/docs">
        <template v-slot:item-icon><i class="fa fa-file-text"></i></template>
        <template v-slot:item-text>组件文档</template>
      </navbar-item>
      <navbar-item href="/power/usercontrol">
        <template v-slot:item-icon><i class="fa fa-address-book"></i></template>
        <template v-slot:item-text>用户管理</template>
      </navbar-item>
      <navbar-item href="/power/resumeedit">
        <template v-slot:item-icon><i class="fa fa-address-card"></i></template>
        <template v-slot:item-text>简历管理</template>
      </navbar-item>
    </navbar>
  </header>
</template>

<script>
import Navbar from '../common/Navbar/Navbar'
import NavbarItem from '../common/Navbar/NavbarItem'
export default {
  name: 'Header',
  components: { NavbarItem, Navbar }
}
</script>

<style lang="less">
header {
  grid-area: header;
  width: 100%;
  background: var(--main-color);
  position: relative;
  height: 100%;
  z-index: 101;
  padding: 20px 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05), 1px 0 rgba(0, 0, 0, 0.05);
}
@media screen and (max-width: 1300px) {
  header {
    padding: 0;
  }
}
</style>
