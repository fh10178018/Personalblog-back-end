<template>
  <div class="theme-loader"
       v-if="visible">
    <div class="loader">
      <div class="size">
        <div class="inner triangle a1"></div>
        <div class="inner triangle a2"></div>
        <div class="inner triangle a3"></div>
        <div class="inner triangle a4"></div>
        <div class="inner triangle a5"></div>
        <div class="inner triangle a6"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Loading',
  setup (props, { emit }) {
    const visible = ref(true)
    const show = () => {
      visible.value = true
    }
    return {
      visible,
      show,
      close
    }
  }
}
</script>
<style lang="less">
.loader-wrap {
  position: relative;
}
.theme-loader {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 800px;
  z-index: 2000;
  background-color: var(--main-background-color);
  .loader {
    animation: shade 5s infinite;
    position: relative;
    width: 75px;
    height: 75px;
  }
  .size {
    transform: scale(0.35) translateX(-60px);
  }
  .triangle {
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid var(--theme-color);
  }
  .a1 {
    transform: rotate(-75deg) scale(0.2, 1);
  }
  .a2 {
    left: 43px;
    top: 80px;
    transform: rotate(180deg) scale(0.2, 1.5);
  }
  .a3 {
    left: 10px;
    top: 60px;
    transform: rotate(-75deg) scale(0.15, 0.7);
  }
  .a4 {
    left: 73px;
    top: 80px;
    transform: rotate(180deg) scale(0.2, 1.5);
  }
  .a5 {
    left: 105px;
    top: 60px;
    transform: rotate(75deg) scale(0.15, 0.7);
  }
  .a6 {
    left: 137px;
    top: 60px;
    transform: rotate(160deg) scale(0.2, 1);
  }
  .inner {
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
}

@keyframes shade {
  0% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
