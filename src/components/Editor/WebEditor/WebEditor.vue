<template>
  <div class='editBox'>
    <div class="top">
      <div class="html-resizer"><h2 class="html-left">HTML</h2></div>
      <div class="htmlEdit">
        <h2 class="html-top">HTML</h2>
        <CodeEditor codeType='html'></CodeEditor>
      </div>
      <div class="css-resizer" ><h2 class="css-left">CSS</h2></div>
      <div class="cssEdit">
        <h2 class="css-top">CSS(style)</h2>
        <CodeEditor codeType='css'></CodeEditor>
      </div>
      <div class="js-resizer"><h2 class="js-left">JS</h2></div>
      <div class="jsEdit">
        <h2 class="js-top">JS</h2>
        <CodeEditor codeType='javascript'></CodeEditor>
      </div>
    </div>
    <div class="top-resizer"></div>
    <div class="bottom"></div>
  </div>
</template>

<script>
import CodeEditor from '../CodeEditor/CodeEditor'
export default {
  name: 'WebEditor',
  data () {
    return {
      screenHeight: document.documentElement.clientHeight
    }
  },
  components: { CodeEditor },
  methods: {
    getHeight () {
      const Top = document.getElementsByClassName('top')[0]
      const Bottom = document.getElementsByClassName('bottom')[0]
      const topResize = document.getElementsByClassName('top-resizer')[0]
      const topHeight = Top.clientHeight
      const resizeHeight = topResize.clientHeight
      const bottomHeight = Bottom.clientHeight
      const len = topHeight + bottomHeight
      Top.style.height = (window.innerHeight - resizeHeight) * (topHeight / len) + 'px'
      Bottom.style.height = (window.innerHeight - resizeHeight) * (bottomHeight / len) + 'px'
    },
    getWidth () {
      const cssResize = document.getElementsByClassName('css-resizer')[0]
      const htmlEdit = document.getElementsByClassName('htmlEdit')[0]
      const cssEdit = document.getElementsByClassName('cssEdit')[0]
      const jsEdit = document.getElementsByClassName('jsEdit')[0]
      const cssWidth = cssEdit.clientWidth
      const htmlWidth = htmlEdit.clientWidth
      const jsWidth = jsEdit.clientWidth
      const resizeWidth = cssResize.clientWidth
      const len = cssWidth + htmlWidth + jsWidth
      htmlEdit.style.width = (window.innerWidth - 3 * resizeWidth) * (htmlWidth / len) + 'px'
      jsEdit.style.width = (window.innerWidth - 3 * resizeWidth) * (jsWidth / len) + 'px'
      cssEdit.style.width = (window.innerWidth - 3 * resizeWidth) * (cssWidth / len) + 'px'
    },
    dragControllerDiv () {
      const topResize = document.getElementsByClassName('top-resizer')[0]
      const cssLeft = document.getElementsByClassName('css-left')[0]
      const jsLeft = document.getElementsByClassName('js-left')[0]
      const htmlLeft = document.getElementsByClassName('html-left')[0]
      const htmlTop = document.getElementsByClassName('html-top')[0]
      const cssTop = document.getElementsByClassName('css-top')[0]
      const jsTop = document.getElementsByClassName('js-top')[0]
      const cssResize = document.getElementsByClassName('css-resizer')[0]
      const jsResize = document.getElementsByClassName('js-resizer')[0]
      const htmlEdit = document.getElementsByClassName('htmlEdit')[0]
      const cssEdit = document.getElementsByClassName('cssEdit')[0]
      const jsEdit = document.getElementsByClassName('jsEdit')[0]
      const editBox = document.getElementsByClassName('editBox')[0]
      const Top = document.getElementsByClassName('top')[0]
      const Bottom = document.getElementsByClassName('bottom')[0]
      jsResize.onmousedown = function (e) {
        var startX = e.clientX
        var resizeW = jsResize.clientWidth
        var sumLen = cssEdit.clientWidth + jsEdit.clientWidth + resizeW
        jsResize.left = jsResize.offsetLeft
        document.onmousemove = function (e) {
          var endX = e.clientX
          var moveLen = jsResize.left + (endX - startX) - resizeW * 2 - htmlEdit.clientWidth
          var maxT = sumLen - jsResize.offsetWidth
          if (moveLen < 0) moveLen = 0
          if (moveLen > maxT) moveLen = maxT
          if (moveLen < 120) {
            cssTop.style.opacity = 0
            cssLeft.style.opacity = 1
          } else {
            cssTop.style.opacity = 1
            cssLeft.style.opacity = 0
          }
          if (sumLen - moveLen - resizeW < 120) {
            jsTop.style.opacity = 0
            jsLeft.style.opacity = 1
          } else {
            jsTop.style.opacity = 1
            jsLeft.style.opacity = 0
          }
          jsResize.style.left = moveLen
          cssEdit.style.width = moveLen + 'px'
          jsEdit.style.width = (sumLen - moveLen - resizeW) + 'px'
        }
        document.onmouseup = function (evt) {
          document.onmousemove = null
          document.onmouseup = null
          jsResize.releaseCapture && jsResize.releaseCapture()
        }
        jsResize.setCapture && jsResize.setCapture()
        return false
      }
      cssResize.onmousedown = function (e) {
        var startX = e.clientX
        var resizeW = cssResize.clientWidth
        var sumLen = cssEdit.clientWidth + htmlEdit.clientWidth + resizeW
        cssResize.left = cssResize.offsetLeft
        document.onmousemove = function (e) {
          var endX = e.clientX
          var moveLen = cssResize.left + (endX - startX) - resizeW
          var maxT = sumLen - cssResize.offsetWidth
          if (moveLen < 0) moveLen = 0
          if (moveLen > maxT) moveLen = maxT
          if (moveLen < 120) {
            htmlTop.style.opacity = 0
            htmlLeft.style.opacity = 1
          } else {
            htmlTop.style.opacity = 1
            htmlLeft.style.opacity = 0
          }
          if (sumLen - moveLen - resizeW < 120) {
            cssTop.style.opacity = 0
            cssLeft.style.opacity = 1
          } else {
            cssTop.style.opacity = 1
            cssLeft.style.opacity = 0
          }
          cssResize.style.left = moveLen
          htmlEdit.style.width = moveLen + 'px'
          cssEdit.style.width = (sumLen - moveLen - resizeW) + 'px'
        }
        document.onmouseup = function (evt) {
          document.onmousemove = null
          document.onmouseup = null
          cssResize.releaseCapture && cssResize.releaseCapture()
        }
        cssResize.setCapture && cssResize.setCapture()
        return false
      }
      topResize.onmousedown = function (e) {
        var startY = e.clientY
        topResize.top = topResize.offsetTop
        console.log(topResize.top)
        document.onmousemove = function (e) {
          var endY = e.clientY
          var moveLen = topResize.top + (endY - startY)
          var maxT = editBox.clientHeight - topResize.offsetHeight
          if (moveLen < 0) moveLen = 0
          if (moveLen > maxT) moveLen = maxT
          topResize.style.top = moveLen
          Top.style.height = moveLen + 'px'
          Bottom.style.height = (editBox.clientHeight - moveLen - 16) + 'px'
        }
        document.onmouseup = function (evt) {
          document.onmousemove = null
          document.onmouseup = null
          topResize.releaseCapture && topResize.releaseCapture()
        }
        topResize.setCapture && topResize.setCapture()
        return false
      }
    }
  },
  unmounted () {
    window.removeEventListener('resize', this.getHeight)
    window.removeEventListener('resize', this.getWidth)
  },
  mounted () {
    window.addEventListener('resize', this.getHeight)
    window.addEventListener('resize', this.getWidth)
    this.getHeight()
    this.getWidth()
    this.dragControllerDiv()
  }
}
</script>

<style lang="less">
  .editBox{
    position: absolute;
    width: 100%;
    height: 100%;
    .top{
      position: relative;
      display: flex;
      width: 100%;
      height: calc(50vh - 35px);
      .html-resizer,.js-resizer,.css-resizer{
        width: 17px;
        border: 0.5px solid var(--main-color);
        cursor: col-resize;
        background-color: var(--main-background-color);
        transition: 500ms;
        >h2{
          color: var(--main-font-color);
          opacity: 0;
          margin-top: 17px;
          font-size: 14px;
          transform: rotate(90deg);
          transition: 500ms;
        }
      }
      .html-resizer:hover,.js-resizer:hover,.css-resizer:hover{
        background-color: var(--theme-color);
        >h2{
          color: white;
        }
      }
      .jsEdit,.cssEdit,.htmlEdit{
        overflow: hidden;
        width: calc(100% / 3 - 17px);
        height: 100%;
        >h2{
          color: var(--main-font-color);
          margin-left: 30px;
          line-height: 17px;
          font-size: 14px;
        }
      }
    }
    .top-resizer{
      height: 16px;
      border: 0.5 solid var(--main-color);
      background: var(--main-background-color);
      position: relative;
      z-index: 10;
      cursor: row-resize;
      transition: 500ms;
    }
    .top-resizer:hover{
      background-color: var(--theme-color);
    }
    .bottom{
      background-color: aqua;
      position: relative;
      height: 100%
    }
  }
</style>
