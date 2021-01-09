import MarkdownEditor from './MarkdownEditor.vue'

/* istanbul ignore next */
MarkdownEditor.install = function (app) {
  app.component(MarkdownEditor.name, MarkdownEditor)
}

export default MarkdownEditor
