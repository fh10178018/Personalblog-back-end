<template>
  <div class="icon-container">
    <div class="loading-icon perpetuum-mobile"></div>
  </div>
</template>
<script>
export default {
  name: 'LoadingIcon'
}
</script>
<style lang="less">
.icon-container {
  width: 40px;
  display: inline-flex;
  .loading-icon {
    border-radius: 50%;
    width: 18px;
    height: 18px;
    border: 0.25rem solid var(--main-color);
    border-top-color: var(--theme-color);
    display: inline-flex;
    margin: 0 8px;

    -webkit-animation-name: spin;
    -webkit-animation-duration: 1s;
    -webkit-animation-iteration-count: infinite;

    animation-name: spin;
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }
  .perpetuum-mobile {
    -webkit-animation-timing-function: cubic-bezier(0.55, 0.15, 0.45, 0.85);
    animation-timing-function: cubic-bezier(0.55, 0.15, 0.45, 0.85);
  }
}

@keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
