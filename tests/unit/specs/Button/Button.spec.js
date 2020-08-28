import { mount } from '@vue/test-utils'
import {  CreateVue, destroyVM, createTest } from '../../util'
import Button from '@/components/common/Button/Button'
// 创建测试用例，一个测试组件写一个测试套件
describe('Button', () => {
  let vm
  // afterEach(() => {
  //   destroyVM(vm)
  // })
  // 多个测试用例，用来测试不同的方法或者显示用例
  // 第一个参数是测试用例名称，第二个参数是一个function
  it('create Button component', () => {
    vm = createTest(Button, {
      size: 'sm'
    }, true)
    let buttonElm = vm.$el
    expect(buttonElm.classList.contains('btn-sm')).toBe(true)
  })
  it('renders props.msg when passed', () => {
    // 通过Vue渲染测试用例
    const Comp = {
      template: `<div><Button>default button</Button></div>`
    }
    const wrapper = mount(Comp, {
      global: {
        components: {
          Button
        }
      }
    })
    expect(wrapper.findComponent({ name: "Button" }).text()).toBe("default button")
  })
})
