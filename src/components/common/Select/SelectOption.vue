<template v-slot="scope">
  <li v-for="(item, index) in list"
      :key="index"
      :class="showClass(item)"
      @click.stop="handleSelect(item)"><span>{{item.label}}</span></li>
</template>

<script>
import {
  unref,
  computed,
  inject,
  ref,
  onMounted
} from 'vue'
export default {
  name: 'SelectOption',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  injection: ['Select'],
  setup (props) {
    const { data } = unref(props)
    const list = computed(() => unref(data))
    const { handleOption, nativeSelectValue, setOption } = inject('Select', {})
    const curValue = ref(unref(nativeSelectValue))
    const showClass = computed(() => {
      return item => {
        return { active: unref(curValue) === unref(item).value }
      }
    })
    const handleSelect = item => {
      curValue.value = item.value
      handleOption(item)
    }
    onMounted(() => {
      for (const item of unref(list)) { // 定义初始label
        if (unref(curValue) === item.value) setOption(item)
      }
    })
    return {
      ...unref(props),
      list,
      handleSelect,
      curValue,
      showClass
    }
  }
}
</script>
<style lang="less">
.select {
  position: relative;
  color: var(--main-font-color);
  font-weight: 100;
  .select-dropdown {
    position: absolute;
    border: 1px solid var(--main-background-color);
    border-radius: 4px;
    background-color: var(--main-color);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    > ul {
      list-style: none;
      margin: 5px 0;
      > li {
        cursor: pointer;
        padding: 0 10px;
        margin: 0 -10px;
        line-height: 34px;
        > span {
          margin-left: 10px;
        }
      }
      .active {
        font-weight: bold;
        background-color: var(--lighter-color) !important;
      }
      > li:hover {
        background-color: var(--main-background-color);
      }
    }
  }
}
</style>
