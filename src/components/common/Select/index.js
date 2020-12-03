import Select from './Select.vue'
import SelectOption from './SelectOption.vue'

/* istanbul ignore next */
Select.install = function (app) {
  app.component(Select.name, Select)
}
SelectOption.install = function (app) {
  app.component(SelectOption.name, SelectOption)
}

export {
  Select,
  SelectOption
}
