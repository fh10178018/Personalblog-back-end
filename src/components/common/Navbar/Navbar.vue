<template>
  <div class="navbar">
    <div class='navbar-content m-0' >
      <ul class="nav m-0 p-0">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style lang="less">
  .navbar{
    .navbar-content{
      >ul{
        font-weight: bold;
        font-size: 18px;
      }
    }
  }
</style>
