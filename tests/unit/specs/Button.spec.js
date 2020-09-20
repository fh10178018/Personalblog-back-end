import { CreateVue, destroyVM, createTest, createVue } from '../util'
import Button from '@/components/common/Button/Button'
// 创建测试用例，一个测试组件写一个测试套件
describe('Button', () => {
  let vm
  //测试用例后销毁
  afterEach(() => {
    destroyVM(vm)
  })
  // 多个测试用例，用来测试不同的方法或者显示用例
  // 第一个参数是测试用例名称，第二个参数是一个function
  it('[props] type', () => {
    vm = createTest(Button, {
      type: 'success '
    }, true)
    let buttonElm = vm.$el
    expect(buttonElm.classList.contains('btn-success')).toBe(true)
  })
  it('[props] size', () => {
    vm = createTest(Button, {
      size: 'small'
    }, true)
    let buttonElm = vm.$el
    expect(buttonElm.classList.contains('btn-small')).toBe(true)
  })
  it('[props] disabled', () => {
    vm = createTest(Button, {
      disabled: true
    }, true)
    let buttonElm = vm.$el
    expect(buttonElm.getAttribute('disabled') === '').toBe(true)
  })
  it('[props] loading', () => {
    vm = createTest(Button, {
      loading: true
    }, true)
    let buttonElm = vm.$el
    expect(buttonElm.classList.contains('is-loading')
      && buttonElm.getAttribute('disabled') === ''
    ).toBe(true)
  })
  it('[props] round', () => {
    vm = createTest(Button, {
      round: true
    }, true)
    let buttonElm = vm.$el
    expect(buttonElm.classList.contains('btn-round')
      && !buttonElm.classList.contains('is-circle')
    ).toBe(true)
  })
  it('[props] circle', () => {
    vm = createTest(Button, {
      circle: true
    }, true)
    let buttonElm = vm.$el
    expect(buttonElm.classList.contains('btn-circle')
      && !buttonElm.classList.contains('is-round')
    ).toBe(true)
  })
  it('[action] click', done => {
    let result
    vm = createVue({
      template: `<Button @click="handleClick"></Button>`,
      methods: {
        handleClick(evt) {
          result = evt
        }
      },
    }, true)
    vm.$el.click()
    setTimeout(() => {
      // isTrusted属性为true时，为用户鼠标点击触发，否则为脚本触发，也就是测试触发
      expect(result.isTrusted).toBe(false)
      done()
    }, 20)
  })
})
