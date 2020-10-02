import { createVue, destroyVM, waitImmediate } from '../util'
import { mount } from '@vue/test-utils';
import Form from '../../../src/components/common/Form/Form'
import FormItem from '../../../src/components/common/FormItem/FormItem'
import InputString from '../../../src/components/common/InputString'

describe('Form & FormItem',() => {
  let vm
  //测试用例后销毁
  afterEach(() => {
    destroyVM(vm)
  })
  it('create', () => {
    vm = createVue({
      template: `
      <Form :model="form" size="small">
        <FormItem>
          <InputString v-model="form.input" />
        </FormItem>
      </Form>`,
      data() {
        return {
          form: {
            input: ''
          }
        }
      }
    }, true)
    expect(!!vm.$el.querySelector('.input-small')).toBe(true)
  })
})
