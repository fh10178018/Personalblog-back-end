/**
 * 该函数用来实时监听元素大小，可以用于自适应，或者v-show造成的宽度为0问题
 * */

const oldValue = {
  top: 0,
  left: 0,
  width: 0,
  height: 0
}
const resizeListen = {
  mounted (el, binding) {
    oldValue.top = el.scrollTop
    oldValue.left = el.scrollLeft
    oldValue.width = el.offsetWidth
    oldValue.height = el.offsetHeight
    binding.value(oldValue) // 绑定初始值
    window.addEventListener('resize', function () { // 执行
      console.log(el.offsetLeft)
      oldValue.top = el.offsetTop
      oldValue.left = el.offsetLeft
      oldValue.width = el.offsetWidth
      oldValue.height = el.offsetHeight
      binding.value(oldValue)
    })
  },
  unmounted (el) {
    oldValue.top = 0
    oldValue.left = 0
    oldValue.width = 0
    oldValue.height = 0
    window.removeEventListener('resize')
  }
}

export default resizeListen
