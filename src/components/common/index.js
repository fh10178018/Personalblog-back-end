// 公共组件，定义全局组件
import Button from './Button'
import InputString from './InputString'

const components = [
  Button,
  InputString
]

const install = (app) => {
  components.forEach((component) => {
    app.component(component.name, component)
  })
}

export default install
