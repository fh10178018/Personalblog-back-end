<template>
  <div class="secondary-navbar">
    <div class="bg"></div>
    <div class="input-search">
      <Search></Search>
    </div>
    <ul>
      <slot></slot>
    </ul>
  </div>
</template>

<script>
import Search from '../Search/Search'
export default {
  name: 'SecondaryNavbar',
  components: { Search }
}
</script>

<style lang="less">
  .secondary-navbar{
    width: 200px;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .bg{
      position: fixed;
      width: 200px;
      height: calc(85vh - 70px);
      background-color: var(--main-color);
      opacity: 0.5;
    }
    .input-search{
      padding:15px 10px;
    }
    ul{
      width: 100%;
      color: var(--main-font-color);
      font-size: 13px;
    }
  }
  @media screen and (max-width: 1300px){
    .secondary-navbar{
      .bg{
        height: calc(100vh - 70px);
      }
    }
  }
</style>
