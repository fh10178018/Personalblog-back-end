<template>
  <div class="pagination-wrap">
    <h5>共 {{curTotal}} 条</h5>
    <Button :disabled="tableQuery.page == '1'"
            @click="handlePrev"><i class="fa fa-chevron-left"></i></Button>
    <Button v-for="item in pagerList"
            :key="item"
            :active="item == tableQuery.page"
            @click="handlePage(item)"
            :style="{width:'28px'}">
      <span>{{item}}</span>
    </Button>
    <Button :disabled="tableQuery.page == totalPage"
            @click="handleNext"><i class="fa fa-chevron-right"></i></Button>
    <Select v-model="tableQuery.rows"
            :style="{ width: '150px' }"
            @change="handleSelectChange">
      <SelectOption :data="rowsList" />
    </Select>
  </div>
</template>

<script>
import { computed, reactive, toRefs, unref } from 'vue'
import Button from '../Button/Button.vue'
import { Select, SelectOption } from '../Select'

export default {
  components: { Button, Select, SelectOption },
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageSizes: {
      type: Array,
      require: true,
      default: () => []
    },
    pagerCount: {
      type: Number,
      default: 5
    },
    modelValue: {
      type: Object
    }
  },
  setup (props, { emit }) {
    const { total, pageSizes, modelValue, pagerCount } = toRefs(props)
    const curPagerCount = computed(() => unref(pagerCount))
    const tableQuery = reactive(unref(modelValue))
    const curTotal = computed(() => unref(total))
    const rowsList = computed(() => {
      unref(tableQuery).page = 1
      return unref(pageSizes).map(item => {
        return { label: item + '条/页', value: item }
      })
    })
    const totalPage = computed(() => Math.ceil(unref(total) / unref(tableQuery).rows))
    const pagerList = computed(() => {
      const res = []
      if (unref(totalPage) > unref(pagerCount)) {
        if (unref(tableQuery).page * 1 < Math.ceil(unref(curPagerCount) / 2)) {
          for (let i = 1; i <= unref(curPagerCount); i++) {
            res.push(i)
          }
        } else if (unref(tableQuery).page * 1 > unref(totalPage) - Math.ceil(unref(curPagerCount) / 2)) {
          for (let i = unref(totalPage) - unref(curPagerCount) + 1; i <= unref(totalPage); i++) {
            res.push(i)
          }
        } else {
          for (let i = unref(tableQuery).page * 1 - 2; i <= unref(tableQuery).page * 1 + 2; i++) {
            res.push(i)
          }
        }
      } else {
        for (let i = 1; i <= unref(totalPage); i++) {
          res.push(i)
        }
      }
      return res
    })
    const handlePrev = () => {
      unref(tableQuery).page--
      handleChange()
    }
    const handleNext = () => {
      unref(tableQuery).page++
      handleChange()
    }
    const handlePage = val => {
      unref(tableQuery).page = val
      handleChange()
    }
    const handleSelectChange = () => {
      unref(tableQuery).page = 1
      handleChange()
    }
    const handleChange = () => {
      emit('change', unref(tableQuery))
    }
    return {
      pagerList,
      curTotal,
      rowsList,
      totalPage,
      tableQuery,
      curPagerCount,
      handleNext,
      handlePrev,
      handlePage,
      handleSelectChange,
      ...props
    }
  }
}
</script>

<style lang="less">
.pagination-wrap {
  display: flex;
  padding-bottom: 10px;
  justify-content: flex-end;
  align-items: center;
  h5 {
    color: var(--main-font-color);
  }
  h5,
  .btn,
  .form-group {
    margin-right: 8px;
  }
}
</style>
