// getCurrentInstance获得当前组件的实例
import { getCurrentInstance } from 'vue'
import { capitalize } from '../config/capitalize'

// Symbol 本质上是一种唯一标识符
// 可用作对象的唯一属性名，这样其他人就不会改写或覆盖你设置的属性值。
const EVENT_NAME_KEY = Symbol('ELEMENT_EVENTS')

export function useEmitter(instance = getCurrentInstance()) {
  return {
    on: on(instance),
    dispatch: dispatch(instance)
  }
}

/*
* 监听事件并回调
* */
const on = instance => {
  return (originalEventName, callback) => {
    // 给监听的事件命名，以驼峰形式
    const eventName = 'on' + capitalize(originalEventName)

    // 该节点没有prop对象，添加一个空prop对象
    // 是否具有取决与你的组件是否用到prop对象
    if (!instance.vnode.props) {
      instance.vnode.props = {}
    }

    // 判断该节点的props对象中，是否命名了该对象
    // 没有新建该对象数组
    // new set为ES6属性，该属性返回一个数组对象，且不重复
    if (!props) {
      instance.vnode.props[EVENT_NAME_KEY] = new Set()
    }
    // 并给在数组中添加和记录新的监听事件名称
    instance.vnode.props[EVENT_NAME_KEY].add(eventName)
    console.log(instance.vnode.props)
    if (!instance.vnode.props[eventName]) {
      instance.vnode.props[eventName] = (...params) => {
        const callbacks = instance.vnode.props[eventName].__events
        if (callbacks) {
          callbacks.forEach((cf) => {
            cf(...params)
          })
        }
      }
      instance.vnode.props[eventName].__events = []
    }
    instance.vnode.props[eventName].__events.push(callback)
  }
}

/*
* 向父级派遣事件
* param为参数对象
* */
const dispatch = instance => {
  return (componentName, eventName, ...params) => {
    let parent = instance.parent // 获取父组件的实例（instance）
    while (parent && parent.type.name !== componentName) { // 父亲找不到，就只能选择爷爷了
      parent = parent.parent
    }
    if (parent) {
      parent.emit(eventName, ...params)
    }
  }
}
