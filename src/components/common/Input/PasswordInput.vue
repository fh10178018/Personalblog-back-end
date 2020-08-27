<template>
  <div class="form-group">
    <input :id="id" v-model="text" class="form-control" type="password" required>
    <label :for="id">{{name}}</label>
  </div>
</template>

<script>
export default {
  name: 'PasswordInput',
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
    text: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('update:value', value)
      }
    }
  }
}
</script>

<style scoped>

</style>
