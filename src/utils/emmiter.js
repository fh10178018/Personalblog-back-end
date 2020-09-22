// 非常经典的事件中心的实现，把所有的事件用vm._events存储起来，
// 当执行vm.$on(event,fn)的时候，按事件的名称event把回调函数fn存储起来vm._events[event].push(fn)。
// 当执行vm.$emit(event)的时候，根据事件名event找到所有的回调函数let cbs = vm._events[event]，然后遍历执行所有的回调函数。
// 当执行vm.$off(event,fn)的时候会移除指定事件名event和指定的fn 。
// 当执行vm.$once(event,fn)的时候，内部就是执行vm.$on，并且当回调函数执行一次后再通过vm.$off移除事件的回调，这样就确保了回调函数只执行一次。

// getCurrentInstance获得当前组件的实例
import { getCurrentInstance } from 'vue'
import { capitalize } from '../config/capitalize'

// 建立一个ELEMENT_EVENTS名称的Symbol数据类型
// 在这里他被名为props中属性名称，防止重复
// 该数据类型，是全局唯一的值
const EVENT_NAME_KEY = Symbol('ELEMENT_EVENTS')

export function useEmitter (instance = getCurrentInstance()) {
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
    if (!instance.vnode.props[EVENT_NAME_KEY]) {
      instance.vnode.props[EVENT_NAME_KEY] = new Set()
    }
    // 并给在数组中添加和记录新的监听事件名称
    instance.vnode.props[EVENT_NAME_KEY].add(eventName)
    console.log(instance.vnode.props, instance.vnode.props[EVENT_NAME_KEY])
    if (!instance.vnode.props[eventName]) {
      instance.vnode.props[eventName] = (...params) => {
        const callbacks = instance.vnode.props[eventName].__events
        if (callbacks) {
          callbacks.forEach((cf) => {
            cf(...params)
          })
        }
      }
      instance.vnode.props[eventName].__events = [] // 新建__events,用于存放回调函数
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
    eventName = capitalize(eventName)
    while (parent && parent.type.name !== componentName) { // 父亲找不到，就只能选择爷爷了
      parent = parent.parent
    }
    if (parent) {
      parent.emit(eventName, ...params)
    }
  }
}
