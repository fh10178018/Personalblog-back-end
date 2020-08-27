<template>
  <footer>
    <span>sadas</span>
    <button @click="color"><i class="fa fa-adjust"/></button>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      colorType: 'day'
    }
  },
  methods: {
    color () {
      switch (this.colorType) {
        case 'day':
          document.documentElement.style.setProperty('--main-color', '#2c3e50')
          document.documentElement.style.setProperty('--main-background-color', '#344a5f')
          document.documentElement.style.setProperty('--main-font-color', 'white')
          this.colorType = 'night'
          break
        case 'night':
          document.documentElement.style.setProperty('--main-color', 'white')
          document.documentElement.style.setProperty('--main-background-color', '#f4f4f4')
          document.documentElement.style.setProperty('--main-font-color', '#333')
          this.colorType = 'day'
      }
    }
  }
}
</script>

<style lang="less">
footer{
  grid-area: footer;
  width: 100%;
  background-color: black;
  color: white;
}
</style>
