<template>
    <textarea ref="mycode" class="codesql" v-model="code" style="width:100%"></textarea>
</template>

<script>
import 'codemirror/theme/ambiance.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/css/css.js'
import 'codemirror/mode/htmlmixed/htmlmixed.js'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/mode/python/python.js'
import 'codemirror/mode/r/r.js'
import 'codemirror/mode/shell/shell.js'
import 'codemirror/mode/sql/sql.js'
import 'codemirror/mode/swift/swift.js'
import 'codemirror/mode/vue/vue.js'
const CodeMirror = require('codemirror/lib/codemirror')
require('codemirror/addon/edit/matchbrackets')
require('codemirror/addon/selection/active-line')
require('codemirror/addon/hint/show-hint')
require('codemirror/addon/hint/sql-hint')
require('codemirror/mode/sql/sql')

export default {
  name: 'CodeEditor',
  props: {
    codeType: {
      type: String,
      require: true,
      default: 'javascript'
    }
  },
  data () {
    return {
      code: '//按Ctrl键进行代码提示'
    }
  },
  mounted () {
    const mime = 'javascript'
    const editor = CodeMirror.fromTextArea(this.$refs.mycode, {
      mode: mime,
      indentWithTabs: true,
      lineWrapping: true,
      indentUnit: 2,
      smartIndent: true,
      lineNumbers: true,
      matchBrackets: true
    })
    editor.on('cursorActivity', function () {
      editor.showHint()
    })
  }
}
</script>

<style>
  .codesql {
    font-size: 11pt;
    font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  }
  .CodeMirror {
    background-color: var(--main-color);
    border: 1px solid var(--main-background-color);
    height: 100%;
  }
  .CodeMirror-gutters{
    border-color: var(--main-background-color);
    background-color: var(--main-color);
  }
  .CodeMirror-scroll {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
