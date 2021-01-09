import Tag from './Tag.vue'

/* istanbul ignore next */
Tag.install = function (app) {
  app.component(Tag.name, Tag)
}

export default Tag
