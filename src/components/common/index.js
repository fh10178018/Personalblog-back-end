// 公共组件，定义全局组件
import Button from './Button'
import InputString from './InputString'
import Form from './Form'
import FormItem from './FormItem'

const components = [
  Button,
  InputString,
  FormItem,
  Form
]

const install = (app) => {
  components.forEach((component) => {
    app.component(component.name, component)
  })
}

export default install
