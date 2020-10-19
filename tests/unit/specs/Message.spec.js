import Message from '../../../src/components/common/Message/Message'
import { triggerEvent } from '../util'

describe('Message',() => {
  afterEach(() => { // 非实例创建
    const el = document.querySelector('.message-item')
    if (!el) return
    el.parentNode && el.parentNode.removeChild(el)
    el.__vue__ && el.__vue__.$destroy()
  })

  it('[options] type', () => {
    Message({
      content: '成功信息',
      duration: 0,
      type: 'success'
    })
    expect(!!document.querySelector('.message-success')).toBe(true)
  })

  it('[options] default type', () => {
    Message({
      content: '默认信息',
      duration: 0
    })
    expect(!!document.querySelector('.message-info')).toBe(true)
  })

  it('[actions] automatically close', done => {
    Message({
      content: '默认自动关闭',
      duration: 500
    })
    expect(!!document.querySelector('.message-item')).toBe(true)
    expect(document.querySelector('h5').textContent).toBe('默认自动关闭')
    setTimeout(() => {
      expect(!!document.querySelector('.message-item')).toBe(false)
      done()
    }, 1200)
  })

  it('[actions] manually close', done => {
    Message({
      content: '可手动关闭',
      showClose: true
    })
    const elm = document.querySelector('.message-item')
    setTimeout(() => {
      elm.querySelector('button').click()
      // 注意动画消失，有0.5s的时间，做延迟验证
      setTimeout(() => {
        expect(!!document.querySelector('.message-item')).toBe(false)
        done()
      }, 500)
    }, 500)
  })

  it('[triggerEvent] reset timer', done => {
    Message({
      content: '白灵',
      duration: 1000
    })
    setTimeout(() => {
      // 鼠标穿过信息框元素时，时间重置开始
      triggerEvent(document.querySelector('.message-item'), 'mouseenter')
      setTimeout(() => {
        expect(!!document.querySelector('.message-item')).toBe(true)
        done()
      }, 700)
    }, 500)
  })

  it('[actions] close all', done => {
    Message({
      content: '求你关我'
    })
    Message({
      content: '求你关我'
    })
    setTimeout(() => {
      Message.closeAll()
      setTimeout(() => {
        expect(!!document.querySelector('.message-item')).toBe(false)
        done()
      }, 500)
    }, 500)
  })
})
