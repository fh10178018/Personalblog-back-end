import Pagination from './Pagination.vue'

/* istanbul ignore next */
Pagination.install = function (app) {
  app.component(Pagination.name, Pagination)
}

export default Pagination
