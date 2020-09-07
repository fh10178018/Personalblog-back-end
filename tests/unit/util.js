import { createApp } from 'vue'
let id = 0
// 创建element
const createElm = function () {
  const elm = document.createElement('div')
  elm.id = 'app' + ++id
  document.body.appendChild(elm)
  return elm
}

/**
 * 回收 vm
 * @param  {Object} vm
 */
export const destroyVM = function (vm) {
  vm.$el &&
  vm.$el.parentNode &&
  vm.$el.parentNode.removeChild(vm.$el)
}

/**
 * 创建一个 Vue 的实例对象
 * @param  {Object|String}  Compo   组件配置，可直接传 template
 * @param  {Boolean=false} mounted 是否添加到 DOM 上
 * @return {Object} vm
 */
export const createVue = function (Compo, mounted = false) {
  // Object.prototype.toString.call(obj) === "[object Array]"判断是否为数组
  // Object.prototype用来创建一个对象原型
  // toString对象返回字符串表示
  if (Object.prototype.toString.call(Compo) === '[object String]') {
    Compo = { template: Compo }
  }
  return createApp(Compo).mount(mounted === false ? null : createElm())
}

/**
 * 创建一个测试组件实例
 * @link http://vuejs.org/guide/unit-testing.html#Writing-Testable-Components
 * @param  {Object}  Compo          - 组件对象
 * @param  {Object}  propsData      - props 数据
 * @param  {Boolean=false} mounted  - 是否添加到 DOM 上
 * @return {Object} vm
 */
export const createTest = function (Compo, propsData = {}, mounted = false) {
  // 判断propsData是否为Boolean型，是的话，转为空对象
  if (propsData === true || propsData === false) {
    mounted = propsData
    propsData = {}
  }
  // 创建空Vue实例对象
  const elm = createElm()
  return createApp(Compo, propsData).mount(mounted === false ? null : elm)
}

/**
 * 触发一个事件
 * mouseenter, mouseleave, mouseover, keyup, change, click 等
 * @param  {Element} elm
 * @param  {String} name
 * @param  {*} opts
 */
export const triggerEvent = function (elm, name, ...opts) {
  let eventName
  // RegExpObject.test(string)
  // 如果字符串 string 中含有与 RegExpObject 匹配的文本，则返回 true，否则返回 false
  if (/^mouse|click/.test(name)) {
    eventName = 'MouseEvents'
  } else if (/^key/.test(name)) {
    eventName = 'KeyboardEvent'
  } else {
    eventName = 'HTMLEvents'
  }
  // evt 就是被创建的 Event 对象.
  // eventName是一个字符串，表示要创建的事件类型。事件类型可能包括"UIEvents"、"MouseEvents"、"MutationEvents"、"HTMLEvents"。
  const evt = document.createEvent(eventName)
  // initEvent为初始化新事件对象的属性
  // 定义事件名称为name
  evt.initEvent(name, ...opts)
  elm.dispatchEvent
    ? elm.dispatchEvent(evt)
    : elm.fireEvent('on' + name, evt)

  return elm
}

/**
 * 触发 “mouseup” 和 “mousedown” 事件
 * @param {Element} elm
 * @param {*} opts
 */
export const triggerClick = function (elm, ...opts) {
  triggerEvent(elm, 'mousedown', ...opts)
  triggerEvent(elm, 'mouseup', ...opts)

  return elm
}

/**
 * 触发 keydown 事件
 * @param {Element} elm
 * @param {keyCode} keyCode
 */
export const triggerKeyDown = function (elm, keyCode) {
  const evt = document.createEvent('Events')
  evt.initEvent('keydown', true, true)
  evt.keyCode = keyCode
  elm.dispatchEvent(evt)
}

/**
 * 等待 ms 毫秒，返回 Promise
 * @param {Number} ms
 * 暂时不清楚确切用处
 */
export const wait = function (ms = 50) {
  return new Promise(resolve => setTimeout(() => resolve(), ms))
}

/**
 * 等待一个 Tick，代替 Vue.nextTick，返回 Promise
 * 暂时不清楚用处
 */
export const waitImmediate = () => wait(0)
