import Breadcrumb from './Breadcrumb.vue'
import BreadcrumbItem from './BreadcrumbItem.vue'

/* istanbul ignore next */
Breadcrumb.install = function (app) {
  app.component(Breadcrumb.name, Breadcrumb)
}
/* istanbul ignore next */
BreadcrumbItem.install = function (app) {
  app.component(BreadcrumbItem.name, BreadcrumbItem)
}

export {
  BreadcrumbItem,
  Breadcrumb
}
