import Message from './Message'
import { createApp } from 'vue'

let messageVue

const createElm = function () {
  const elm = document.createElement('div')
  elm.id = 'message'
  document.body.appendChild(elm)
  return elm
}

function createMessage () {
  const vnode = createApp(Message).mount(createElm())
  return vnode
}
export function showMessage (args, callback) {
  // 为了让当前的实例 只有一个，防止占用太多内存
  if (!messageVue) {
    messageVue = createMessage()
  }
  messageVue.showMessage(args)
  callback && callback()
  return messageVue
}

export default showMessage
