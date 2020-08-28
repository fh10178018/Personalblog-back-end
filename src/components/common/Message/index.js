import { createApp } from 'vue'
import Message from './Message'
let messageVue

function createMessage () {
  const vnode = createApp(Message).mount('#message')
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
