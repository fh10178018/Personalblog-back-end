<template>
  <div class="slide-button">
    <div id="drag-btn" class="slide-drag-btn" :style="{left: btnLeft}" :class="btnStatus?'active':''">
      <i class="fa" :class="'fa-'+(btnStatus?'check':'arrow-right')"></i>
    </div>
    <div class="tips" :class="btnStatus?'active':''">
      <p>{{tips}}</p>
    </div>
    <div class="slide-wrap" :style="{width: wrapWidth}" ></div>
  </div>
</template>

<script>
export default {
  name: 'SlideButton',
  data () {
    return {
      successValue: this.correctValue,
      activeValue: 0,
      btnLeft: 0,
      wrapWidth: '22px',
      btnStatus: false// false为默认以及错误，true为正确
    }
  },
  props: {
    correctValue: {
      type: Number,
      default: 0,
      require: true
    },
    tips: {
      type: String,
      default: '提示信息',
      require: true
    },
    value: {
      type: Number,
      default: 0.0,
      require: true
    },
    errorRange: {
      type: Number,
      default: 0.0,
      require: true
    }
  },
  watch: {
    activeValue (newVal) {
      this.$emit('update:value', this.activeValue)
    },
    correctValue (newVal) {
      this.successValue = newVal
    }
  },
  methods: {
    reset () {
      Object.assign(this.$data, this.$options.data.call(this))
    },
    slide () {
      const slideBtn = document.getElementsByClassName('slide-drag-btn')[0]
      const slideButton = document.getElementsByClassName('slide-button')[0]
      const width = slideButton.clientWidth
      const that = this
      slideBtn.onmousedown = function (e) {
        slideButton.className = 'slide-button active'
        slideBtn.className += ' active'
        const resMax = that.successValue + that.errorRange
        const resMin = that.successValue - that.errorRange
        const startX = e.clientX
        slideBtn.left = slideBtn.offsetLeft
        if (!that.btnStatus) {
          document.onmousemove = function (e) {
            const endX = e.clientX
            let moveLen = slideBtn.left + (endX - startX)
            if (moveLen < 0) { moveLen = 0 }
            if (moveLen > width - 44) { moveLen = width - 44 }
            that.activeValue = moveLen / (width - 44)
            that.btnLeft = moveLen + 'px'
            that.wrapWidth = moveLen + slideBtn.clientWidth / 2 + 'px'
          }
          document.onmouseup = function (evt) {
            slideBtn.className = 'slide-drag-btn'
            slideButton.className = 'slide-button'
            if (that.activeValue <= resMax && that.activeValue >= resMin) {
              that.message(true)
            } else {
              that.message(false)
              slideButton.className += ' shake'
              that.reset()
            }
            document.onmousemove = null
            document.onmouseup = null
            slideBtn.releaseCapture && slideBtn.releaseCapture()
          }
        }
        slideBtn.setCapture && slideBtn.setCapture()
        return false
      }
    },
    message (res) {
      this.btnStatus = res
      this.$emit('message', res)
    }
  },
  unmounted () {
    window.removeEventListener('resize', this.slide)
  },
  mounted () {
    window.addEventListener('resize', this.slide)
    this.slide()
  }
}
</script>

<style lang="less">
.slide-button{
  position: relative;
  font-size: 18px;
  line-height: 44px;
  border-radius: 3px;
  text-align: center;
  user-select:none;
  background-color: var(--main-background-color);
  .slide-wrap{
    position: absolute;
    top: 0;
    border-radius: 3px;
    border:1px solid var(--theme-color);
    color: var(--light-color);
    background-color: var(--lighter-color);
    height: 44px;
    min-width: 22px;
    z-index: 10;
  }
  .slide-drag-btn{
    position: absolute;
    z-index: 11;
    top: 0;
    height: 44px;
    width: 44px;
    background-color: var(--main-color);
    border-radius: 3px;
    display: flex;
    box-shadow: 0 0 3px rgba(0,0,0,.3);
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .slide-drag-btn.active{
    background-color: var(--theme-color);
    color: white;
  }
  .slide-drag-btn.active+.tips{
    color: var(--main-background-color);
  }
  .slide-drag-btn:hover{
    background-color: var(--theme-color);
    color: white;
  }
}
.slide-button.active{
  .tips{
    color: var(--main-background-color);
  }
}
</style>
