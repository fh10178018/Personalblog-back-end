import DropDown from './DropDown.vue'
import DropDownItem from './DropDownItem.vue'
import DropDownMenu from './DropDownMenu.vue'

/* istanbul ignore next */
DropDown.install = function (app) {
  app.component(DropDown.name, DropDown)
}

/* istanbul ignore next */
DropDownMenu.install = function (app) {
  app.component(DropDownMenu.name, DropDownMenu)
}
/* istanbul ignore next */
DropDownItem.install = function (app) {
  app.component(DropDownItem.name, DropDownItem)
}

export {
  DropDown,
  DropDownItem,
  DropDownMenu
}
