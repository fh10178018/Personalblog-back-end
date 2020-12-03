/**
 * 该函数用来实时监听元素大小，可以用于自适应，或者v-show造成的宽度为0问题
 * */
import elementResizeDetectorMaker from 'element-resize-detector'

let observer
const oldValue = {
  width: 0,
  height: 0
}
const resizeListen = {
  mounted (el, binding) {
    observer = elementResizeDetectorMaker()
    observer.listenTo(el, function (element) {
      const width = element.offsetWidth
      const height = element.offsetHeight
      if (oldValue.width !== width || oldValue.height !== height) { // 数值重复不回调值
        oldValue.width = width
        oldValue.height = height
        binding.value(oldValue)
      }
    })
  },
  unmounted (el) {
    if (observer) {
      oldValue.width = 0
      oldValue.height = 0
      observer.removeListener(el)
    }
  }
}

export default resizeListen
