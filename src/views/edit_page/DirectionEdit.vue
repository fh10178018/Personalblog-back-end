<template>
  <div class="direction-edit">
    <form>
      <NumberInput v-model:value="num" ></NumberInput>
      <InputString v-model:value="title" :name="'文章名称是什么？'"></InputString>
    </form>
  </div>
</template>

<script>
import InputString from 'components/common/InputString/InputString'
import NumberInput from 'components/common/Input/NumberInput'
export default {
  name: 'DirectionEdit',
  data () {
    return {
      num: 123,
      title: ''
    }
  },
  methods: {
    change (val) {
      console.log(val)
    }
  },
  components: { NumberInput, InputString }
}
</script>

<style lang="less">
.direction-edit{
  width: 100%;
  height: 100%;
  background-color: var(--main-color);
  grid-area: page;
  form{
    padding: 50px;
  }
}
</style>
