<template>
  <form class="search-form">
    <input />
    <i class="fa fa-search"/>
  </form>
</template>

<script>
export default {
  name: 'Search'
}
</script>

<style lang="less">
  .search-form{
    position: relative;
    height: 40px;
    >i{
      color: var(--main-font-color);
      font-size: 15px;
      line-height: 40px;
      left: 15px;
      position: absolute;
      transition: 500ms;
    }
    >input{
      color: var(--main-font-color);
      width: 100%;
      height: 100%;
      font-size: 15px;
      padding: 0.4em 0.4em 0.4em 2.5em;
      border-radius: 4px;
      border: 1px solid transparent;
      background-color: var(--main-background-color);
      transition: 500ms;
    }
    transition: 500ms;
  }
  input:focus+i{
    color: var(--theme-color);
    outline: 0;
  }
  input:focus{
    outline: 0;
  }
</style>
