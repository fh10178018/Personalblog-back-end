<template>
  <div class="three-dot">
    <div class="dot dot1" :style="{backgroundColor}"></div>
    <div class="dot dot2" :style="{backgroundColor}"></div>
    <div class="dot dot3" :style="{backgroundColor}"></div>
  </div>
</template>

<script>
export default {
  name: 'ThreedotLoading',
  props: {
    backgroundColor: {
      type: String,
      default: 'var(--main-color)'
    }
  }
}
</script>

<style lang="less">
.three-dot{
  position: relative;
  width: 50px;
  height: 27px;
  display: inline-block;
  vertical-align: middle;
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    top: calc(50% - 5px);
  }
  .dot1 {
    left: 0;
    animation: dot-jump 0.5s  alternate infinite;
  }
  .dot2 {
    left: 20px;
    animation: dot-jump 0.5s 0.2s  alternate infinite;
  }
  .dot3 {
    left: 40px;
    animation: dot-jump 0.5s 0.4s  alternate infinite;
  }
}
@keyframes dot-jump {
  0% {
    -webkit-transform: translateY(7px);
    transform: translateY(7px);
  }
  100% {
    -webkit-transform: translateY(-7px);
    transform: translateY(-7px);
  }
}
</style>
