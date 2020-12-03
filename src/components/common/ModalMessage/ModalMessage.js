import { defineComponent, createVNode, render } from 'vue'
import Main from './ModalMessage.vue'
import merge from '../../../utils/merge'

const ModalMessageConstructor = defineComponent(Main)

let wrap
let instance // 单个msg实例对象
const instances = [] // 多个
let seed = 0 // 记录数量

const createElm = function () {
  const elm = document.createElement('div')
  elm.id = 'modalMessageWrap'
  document.body.appendChild(elm)
  return elm
}

const ModalMessage = function (options) {
  if (window === undefined) return
  if (!wrap) wrap = createElm() // 创建父级信息队列空白容器
  options = options || {}
  const userOnClose = options.onClose // 指向onClose函数
  const id = 'model_msg_' + ++seed // 记录当前msg的id

  options.onClose = function () {
    ModalMessage.close(id, userOnClose) // 调用实例close，注意Message返回的是自身实例
  }

  options = merge({ // 合并，并替换原有值
    id,
    zIndex: 2500 + seed
  }, options
  )

  instance = createVNode(
    ModalMessageConstructor,
    options
  )
  const container = document.createElement('div') // 创建容器
  render(instance, container) // 应该是将组建包上容器,转成html
  instance.el.style.zIndex = 2500 + seed

  wrap.appendChild(instance.el) // 将实例渲染到wrap中
  instances.push(instance) // 实例堆栈
  return instance
}

ModalMessage.close = function (id, userOnClose) {
  const len = instances.length // 获取实例对象总长度
  for (let i = 0; i < len; i++) { // 遍历筛选出实例，并移除该实例
    if (id === instances[i].component.props.id) {
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i])
      }
      instances.splice(i, 1)
      break
    }
  }
}

ModalMessage.closeAll = function () {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].component.ctx.close() // 遍历实例，调用实例关闭函数
  }
}

export default ModalMessage
