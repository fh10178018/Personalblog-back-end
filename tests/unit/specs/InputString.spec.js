import { destroyVM, waitImmediate, triggerEvent, createTest, createVue } from '../util'
import { mount } from '@vue/test-utils';
import mitt from 'mitt'
import InputString from '../../../src/components/common/InputString'
window.mitt = mitt()
describe('Button', () => {
  let vm
  //测试用例后销毁
  afterEach(() => {
    destroyVM(vm)
  })
  it('create', async() => {
    vm = createVue({
      template: `
        <InputString
           require
          :minlength="1"
          :maxlength="10"
          placeholder="请输入内容"
          @focus="handleFocus"
          v-model="input">
        </InputString>
      `,
      data() {
        return {
          input: 'input',
          inputFocus: false
        }
      },
      methods: {
        handleFocus() {
          this.inputFocus = true
        }
      }
    }, true)
    const inputElm = vm.$el.querySelector('input')
    expect(vm.inputFocus).toBe(false)
    inputElm.focus()
    expect(vm.inputFocus).toBe(true)
    expect(vm.$el.querySelector('label').innerHTML).toBe('请输入内容')
    expect(inputElm.value).toBe('input')
    expect(inputElm.getAttribute('minlength')).toBe('1')
    expect(inputElm.getAttribute('maxlength')).toBe('10')
    vm.input = 'text'
    await waitImmediate()
    expect(inputElm.value).toBe('text')
  })

  it('[default] input value is empty', () => {
    vm = createVue({
      template: '<InputString/>'
    }, true)
    let inputElm = vm.$el.querySelector('input')
    expect(inputElm.value).toBe('')
  })

  it('[props] disabled', () => {
    vm = createVue({
      template: `<InputString disabled />`
    }, true)
    expect(vm.$el.querySelector('input').getAttribute('disabled') === '').toBe(true)
  })

  it('[props] type', () => {
    vm = createVue({
      template: ` <InputString type="password" />`
    }, true)
    const inputElm = vm.$el.querySelector('input')
    expect(inputElm.getAttribute('type') === 'password').toBe(true)
  })

  it('[props] size', () => {
    vm = createVue({
      template: ` <InputString size="small" />`
    }, true)
    const inputElm = vm.$el.querySelector('input')
    expect(inputElm.classList.contains('input-small')).toBe(true)
  })

  describe('[event] Input', () => {
    it('event:focus & blur', async() => {
      // Mock 函数
      // 1、捕获函数调用情况
      // 2、设置函数返回值
      // 3、 改变函数的内部实现
      // jest.fn() 是最简单的Mock函数，如果内部函数没实现，会返回undefind
      const handleFocus = jest.fn()
      const handleBlur = jest.fn()
      const wrapper = mount({
        render() {
          return <InputString
                onBlur={handleBlur}
                onFocus={handleFocus}/>
        }
      })
      vm = wrapper.vm
      // 触发事件
      wrapper.vm.$el.querySelector('input').focus()
      wrapper.vm.$el.querySelector('input').blur()
      await waitImmediate()
      // toBeCalled
      expect(handleBlur).toBeCalled()
      expect(handleFocus).toBeCalled()
    })
    it('event:change', async() => {
      const handleChange = jest.fn()
      let value = 'a'
      // 测试input和change事件
      const wrapper =  mount({
        render () {
          return <InputString
            v-model={value}
            onChange={handleChange}/>
        }
      })
      vm = wrapper.vm
      const inputElm = wrapper.find('input[type="text"]')
      const simulateEvent = (text, event) => {
        inputElm.element.value = text
        // 自定义触发事件的派发
        inputElm.trigger(event)
      }
      // simplified test, component should emit change when native does
      simulateEvent('1', 'input')
      simulateEvent('2', 'change')
      wrapper.vm.$nextTick()
      // toBeCalledTimes函数为判断函数调用次数
      expect(inputElm.element.value).toBe('2')
      expect(value).toBe('2')
      expect(handleChange).toBeCalledTimes(1)
    })
    it('event:clear', async() => {
      let value = 'a'
      const handleClear = jest.fn()
      const wrapper =  mount({
        render () {
          return <InputString
            onClear = {handleClear}
            v-model={value}
            clearable/>
        }
      })
      // 由于destroy函数不能用给，就需要使用我们的destroyVm函数
      // 但前提是将其赋予给vm
      vm = wrapper.vm
      // find使用了querySelector语法
      const inputElm = wrapper.find('input[type="text"]')
      // 不处于焦点，icon不出现,用exists()函数判定是否存在
      expect(wrapper.find('.fa-close').exists()).toBe(false)
      // input框处于focus才会触发出现clear button
      await inputElm.trigger('focus')
      expect(wrapper.find('.fa-close').exists()).toBe(true)
      await wrapper.find('.fa-close').trigger('click')
      expect(handleClear).toBeCalledTimes(1)
      // 组件的值没发生改变，因为异步emit的原因，组件没有及时更新的‘
      // 但是修改添加了nextTick任然无用，待观察
      expect(value).toBe('')
    })
    it('event:input', async() => {
      const handleInput =jest.fn()
      let value = 'a'
      const wrapper =  mount({
        render () {
          return <InputString
            onInput={handleInput}
            v-model={value}/>
        }
      })
      vm = wrapper.vm
      const inputElm = wrapper.find('input')
      inputElm.element.value = '1'
      await inputElm.trigger('compositionstart')
      await inputElm.trigger('input')
      inputElm.element.value = '2'
      await inputElm.trigger('compositionupdate')
      await inputElm.trigger('input')
      await inputElm.trigger('compositionend')
      // input event 在 composition 期间不会触发，
      // 而唯一一次的input触发，是在composition结束后
      // 也就是compositionend函数中进行触发和修改
      expect(handleInput).toBeCalledTimes(1)
      // 所以在未结束的composition过程中
      // 组件和绑定值尚未变化，且都为a， 父子组件也相互绑定
      expect(inputElm.element.value).toBe('a')
    })
    it('event:passwordVisible', async () => {
      let value = 'a'
      const wrapper =  mount({
        render () {
          return <InputString
            type="password"
            v-model={value}/>
        }
      })
      vm = wrapper.vm
      const inputElm = wrapper.find('input')
      await inputElm.trigger('focus')
      expect(wrapper.find('.fa-eye').exists()).toBe(true)
      await wrapper.find('.fa-eye').trigger('click')
      expect(inputElm.attributes('type')).toBe('text')
      await wrapper.find('.fa-eye-slash').trigger('click')
      expect(inputElm.attributes('type')).toBe('password')
    })
    it('method:select', async() => {
      const value = 'test'
      const wrapper =  mount({
        render () {
          return <InputString
            v-model={value}
            clearable/>
        }
      })
      const inputElm = wrapper.find('input')
      // 默认选中应为4，不知道为啥是0
      expect(inputElm.element.selectionStart).toBe(0)
      expect(inputElm.element.selectionEnd).toBe(0)

      await inputElm.element.select()

      expect(inputElm.element.selectionStart).toBe(0)
      expect(inputElm.element.selectionEnd).toBe(value.length)
    })
  })

  it('[verify] require', async () => {
    let value = ''
    const wrapper = mount({
      render() {
        return <InputString
          v-model={value}
          require/>
      }
    })
    const inputElm = wrapper.find('input[type="text"]')
    await inputElm.trigger('focus')
    await inputElm.trigger('blur')
    expect(wrapper.find('.error-label').exists()).toBe(true)
    expect(inputElm.classes('error')).toBe(true)
  })
})
