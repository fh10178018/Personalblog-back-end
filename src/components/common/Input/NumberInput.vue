<template>
  <div class="form-group">
    <input :id="id" type="number" v-model.number="number" :placeholder="placeholder">
    <label :for="id">asda</label>
  </div>
</template>

<script>
export default {
  name: 'NumberInput',
  props: {
    value: {
      type: String,
      default: '',
      require: true
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  computed: {
    id () {
      var Num = 'input_'
      for (var i = 0; i < 6; i++) {
        Num += Math.floor(Math.random() * 10)
      }
      return Num
    },
    number: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('update:value', val)
      }
    }
  }
}
</script>

<style scoped>

</style>
