import { destroyVM } from '../util'
import { mount } from '@vue/test-utils';
import { reactive } from 'vue';
import Form from '../../../src/components/common/Form/Form'
import FormItem from '../../../src/components/common/FormItem/FormItem'
import InputString from '../../../src/components/common/InputString'

describe('Form & FormItem',() => {
  let vm
  //测试用例后销毁

  afterEach(() => {
    destroyVM(vm)
  })
  it('[props]  size', () => {
    const  form = reactive({
      input: ''
    })
    const wrapper = mount({
      render () {
        return (
          <Form model={form} size="small">
            <FormItem>
              <InputString v-model={form.input}/>
            </FormItem>
          </Form>
          )
      }
    })
    vm = wrapper.vm
    const inputElm = wrapper.find('.input-small')
    expect(inputElm.exists()).toBe(true)
  })
  it('[validate] show error message',done => {
    const form = reactive({
      input: ''
    })
    const rules = reactive({
      input: {
        required: true,
        message: '请输入活动名称',
        trigger: 'change',
        min: 3,
        max: 6
      }
    })
    const wrapper = mount({
      render () {
        return (
          <Form model={form} ref="form" rules={rules} size="small">
            <FormItem rulesName="input">
              <InputString v-model={form.input}/>
            </FormItem>
          </Form>
        )
      }
    })
    vm = wrapper.vm
    vm.$refs.form.validate(async valid => {
      expect(valid).toBe(false)
      vm.$refs.form.$nextTick(() => {
        expect(wrapper.find('.form-item-error').exists()).toBe(true)
        done()
      })
    })
  })
  it('[validate] clear validate',done => {
    const form = reactive({
      input: '',
      address: ''
    })
    const rules = reactive({
      input: [
        { required: true, message: '请输入活动名称', trigger: 'blur' }
      ],
      address: [
        { required: true, message: '请选择活动区域', trigger: 'change' }
      ]
    })
    const wrapper = mount({
      render () {
        return (
          <Form model={form} ref="form" rules={rules} size="small">
            <FormItem rulesName="input">
              <InputString v-model={form.input}/>
            </FormItem>
            <FormItem rulesName="address">
              <InputString v-model={form.address}/>
            </FormItem>
          </Form>
        )
      }
    })
    vm = wrapper.vm
    const formElm = vm.$refs.form
    // 获得每个子组件的实例
    const nameField = formElm.fields.filter(field => field.rulesName === 'input')[0]
    const addressField = formElm.fields.filter(field => field.rulesName === 'address')[0]
    formElm.validate()
    formElm.$nextTick(() => {
      expect(nameField.validateMessage).toBe('请输入活动名称')
      formElm.clearValidate(['input']) // 只清除input的验证结果
      formElm.$nextTick(() => {
        expect(nameField.validateMessage).toBe('')
        formElm.clearValidate() // 无参数，默认为全清除
        formElm.$nextTick(() => {
          expect(addressField.validateMessage).toBe('')
          done()
        })
      })
    })
  })
  describe('vlidate && children component', () => {
    it('input', done => {
      const form = reactive({
        input: ''
      })
      const rules = reactive({
        input: {
          required: true,
          message: '请输入活动名称',
          trigger: 'change',
          min: 3,
          max: 6
        }
      })
      const wrapper = mount({
        render () {
          return (
            <Form model={form} ref="form" rules={rules} size="small">
              <FormItem rulesName="input" ref="field">
                <InputString v-model={form.input} />
              </FormItem>
            </Form>
          )
        }
      })
      vm = wrapper.vm
      vm.$refs.form.validate(valid => {
        let field = vm.$refs.field
        expect(valid).toBe(false)
        vm.$refs.form.$nextTick(() => {
          expect(field.validateMessage).toBe('请输入活动名称')
          wrapper.find('input').setValue('aaaaa')
          vm.$refs.form.$nextTick(() => {
            expect(field.validateMessage).toBe('')
            wrapper.find('input').setValue('aa')
            vm.$refs.form.$nextTick(() => {
              expect(field.validateMessage).toBe('请输入活动名称')
              done()
            })
          })
        })
      })
    })
  })
})
