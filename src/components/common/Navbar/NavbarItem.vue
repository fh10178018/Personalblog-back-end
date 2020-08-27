<template>
  <li class="navbar-item">
    <router-link :to="href">
      <slot name="item-icon"></slot>
      <span><slot name="item-text"></slot></span>
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'NavbarItem',
  props: {
    href: {
      type: String,
      require: true,
      default: '/'
    }
  }
}
</script>

<style lang="less">
.navbar-item{
  list-style: none;
  line-height: 56px;
  margin: 0 -30px;
  cursor: pointer; //鼠标悬停为手指
  transition: 0.8s;
  >a{
    color: var(--main-font-color);
    text-decoration: none;
    display: block;
    padding: 0 30px;
    i{
      margin-right: 10px;
    }
  }
  >.active{
    color: var(--theme-color);
  }
}
.navbar-item:hover{
  background: var(--main-background-color);
  padding-left:30px;
  font-size: 19px;
  a{
    color: var(--theme-color);
  }
}
@media screen and (max-width: 1300px) {//当设备屏幕小于max-width的值时，则满足条件，且注意权限大小，要将样式放在后边
  .navbar-item{
    margin: 0;
    >a{
      text-align: center;
      padding: 0;
      i{
        margin-right: 0;
      }
      span{
        display: none;
      }
    }
  }
  .navbar-item:hover{
    padding: 0;
    font-size: 25px;
  }
}
</style>
