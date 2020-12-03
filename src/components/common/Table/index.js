import Table from './Table.vue'
import TableColumn from './TableColumn.vue'

/* istanbul ignore next */
Table.install = function (app) {
  app.component(Table.name, Table)
}
TableColumn.install = function (app) {
  app.component(TableColumn.name, TableColumn)
}

export {
  Table,
  TableColumn
}
