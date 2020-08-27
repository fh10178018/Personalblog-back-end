<template>
  <div class="form-group">
    <input
      :type="inputType"
      ref="input"
      :id="id"
      :value="activeText"
      :disabled="inputDisabled"
      @blur="handleBlur"
      @input="handleInput"
      class="form-control"
      :class="errorStatus?'error':''"
      autoComplete="off"
      spellcheck="false"
      required
    >
    <label :for="id">{{name}}</label>
    <span class="btn-clear" @click="clear" v-if="showClear && activeText && !errorStatus && inputType==='text'"><i class="fa fa-close"></i></span>
    <span class="btn-eye" @click="changeType" v-if="type==='password' && !errorStatus && activeText"><i class="fa" :class="'fa-eye'+(inputType==='text'?'-slash':'')"></i></span>
    <span class="btn-error" v-if="errorStatus"><i class="fa fa-warning"></i></span>
    <div class="error-label color-error" v-if="errorStatus"><p>{{errorMessage}}</p></div>
  </div>
</template>

<script>
export default {
  name: 'StringInput',
  data () {
    return {
      inputType: this.type,
      inputStatus: 0,
      errorStatus: false,
      errorMessage: '',
      activeText: this.value
    }
  },
  props: {
    value: {
      type: String,
      default: '',
      require: true
    },
    name: {
      type: String,
      default: '',
      require: true
    },
    type: {
      type: String,
      default: 'text'
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 999
    },
    disabled: {
      type: Boolean,
      default: false
    },
    require: {
      type: Boolean,
      default: false
    },
    showClear: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    changeType () {
      if (this.inputType === 'text') {
        this.inputType = 'password'
      } else {
        this.inputType = 'text'
      }
      this.$refs.input.focus()
    },
    hidePassword () {
      this.$refs.input.focus()
      this.inputType = 'password'
    },
    verify () {
      const val = this.activeText
      if (val) {
        if (val.length >= this.min && val.length <= this.max) {
          this.$emit('isok', true)
          this.errorStatus = false
        } else {
          if (this.inputStatus > 0) {
            this.errorStatus = true
            this.errorMessage = this.name + '输入长度为' + this.min + '-' + this.max + '之间！'
          }
          this.$emit('isok', false)
        }
      } else {
        if (this.inputStatus > 0) {
          this.errorStatus = true
          this.errorMessage = this.name + '输入不能为空！'
        }
        this.$emit('isok', false)
      }
    },
    handleInput (event) {
      const activeVal = event.target.value
      if (this.require) {
        if (activeVal) {
          if (activeVal.length >= this.min && activeVal.length <= this.max) {
            this.$emit('update:value', activeVal)
          }
        }
      } else {
        this.$emit('update:value', activeVal)
      }
      this.activeText = activeVal
    },
    handleBlur () {
      this.inputStatus = 1
      this.verify()
    },
    clear () {
      if (this.require) {
        this.errorStatus = true
        this.errorMessage = this.name + '输入不能为空！'
      }
      this.activeText = ''
      this.$refs.input.focus()
    }
  },
  watch: {
    value (newVal) {
      this.activeText = newVal
    },
    activeText () {
      if (this.require) {
        this.verify()
      }
    }
  },
  computed: {
    inputDisabled () {
      return this.disabled
    },
    id () {
      var Num = 'input_'
      for (var i = 0; i < 6; i++) {
        Num += Math.floor(Math.random() * 10)
      }
      return Num
    }
  }
}
</script>

<style lang="less">
  .form-group{
    margin-bottom: 40px;
    position: relative;
    height: 40px;
    .btn-error,.btn-clear,.btn-eye{
      position: absolute;
      z-index: 11;
      right: 0;
      margin: 0 5px;
      cursor: pointer;
      transform: translateY(50%);
    }
    .btn-error {
      color: var(--error-color);
    }
    .btn-clear,.btn-eye{
      transition:opacity 500ms;
      opacity: 0;
      color: var(--light-color);
    }
    .btn-clear:hover,.btn-eye:hover{
      color: var(--theme-color);
    }
    .error-label{
      position: absolute;
      font-size: 12px;
      top: 100%;
      color: var(--error-color);
    }
    >label{
      position: absolute;
      z-index: 11;
      line-height: 36px;
      font-size: 16px;
      font-weight: bold;
      color: var(--light-color);
      top: 0;
      transition: 500ms;
    }
    input{
      background-color: transparent;
      position: absolute;
      z-index: 10;
      border: 2px solid;
      border-color: transparent transparent var(--light-color) transparent ;
      line-height: 36px;
      height: 36px;
      transition: 500ms;
      font-weight: 700;
      font-size: 16px;
      width: 100%;
      color: var(--light-color);
      padding-right: 20px;
    }
    input:hover{
      border-color:transparent transparent  var(--theme-color) transparent;
      +label{
        color: var(--theme-color);
      }
    }
    .error{
      color: var(--error-color) !important;
      border-color:transparent transparent  var(--error-color) transparent !important;
      +label{
        color: var(--error-color) !important;
      }
    }
    input:focus,input:valid{
      border-color:transparent transparent  var(--theme-color) transparent;
      outline: 0;
      +label{
        top: -25px;
        font-size: 12px;
        color: var(--theme-color);
      }
    }
    input[disabled]{
      border-color:transparent transparent  var(--theme-color) transparent;
      color: var(--theme-color);
      +label{
        top: -25px;
        font-size: 12px;
        color: var(--theme-color);
      }
      +label+.btn-clear{
        display: none;
      }
      +label+.btn-error{
        display: none;
      }
      +label+.btn-eye{
        display: none;
      }
    }
    input:focus{
      +label+.btn-clear{
        opacity: 1;
      }
      +label+.btn-eye{
        opacity: 1;
      }
    }
  }
</style>
