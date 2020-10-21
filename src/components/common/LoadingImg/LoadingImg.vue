<template>
<div v-if="status === 'error'" class="img-loading"></div>
<img v-if="status === 'success'" :class="nativeClass" :src="src"/>
  <div v-if="status === 'error'" class="img-error">
    <h3>
      无法正常读取图片
    </h3>
  </div>
</template>

<script>
import {
  ref,
  unref,
  onMounted,
  computed
} from 'vue'
export default {
  name: 'LoadingImg',
  props: {
    src: {
      default: null,
      type: String,
      required: true
    },
    customClass: null
  },
  setup (props) {
    const status = ref('loading')
    const { src, customClass } = unref(props)

    const nativeClass = computed(() => {
      return customClass
    })

    const preload = () => {
      const newImg = new Image()
      newImg.src = src
      newImg.onload = () => {
        status.value = 'success'
      }
      newImg.onerror = () => {
        status.value = 'error'
      }
    }

    onMounted(() => {
      preload()
    })

    return {
      ...unref(props),
      status,
      nativeClass
    }
  }
}
</script>
<style lang="less">
  .img-loading{
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, var(--main-color), var(--main-background-color), var(--main-color));
    background-size: 200%;
    animation: sun 8s infinite;
    h3{
      user-select: none;
      color: var(--main-background-color);
      animation: 4s fade-out-in infinite linear;
    }
  }
  .img-error{
    width: 100%;
    height: 100%;
    background: linear-gradient(132deg, var(--main-color), var(--theme-color));
    box-shadow:0 0 50px 30px var(--main-color) inset;
    background-size: 200%;
    display: flex;
    justify-content: center;
    align-items: center;
    h3{
      user-select: none;
      color: var(--theme-color);
      animation: 4s fade-out-in infinite linear;
    }
  }
  @keyframes sun {
    100%{
      background-position: -200% 0;
    }
  }
</style>
