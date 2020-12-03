<template>
  <div class="table-wrap">
    <table class="table"
           border="0"
           cellpadding="0"
           cellspacing="0">
      <thead>
        <tr>
          <th v-if="showID"
              class="head-id">ID</th>
          <th v-for="(item,index) in head"
              :key="index">{{item.name}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableData"
            :key="index">
          <td>{{index}}</td>
          <slot :item="item"></slot>
        </tr>
      </tbody>
    </table>
    <Pagination @change="handleChange"
                v-model="tableQuery"
                :page-sizes="curPageSizes"
                :page-size="curPageSize"
                :total="curTotal" />
  </div>
</template>

<script>
import { computed, reactive, toRefs, unref } from 'vue'
import Pagination from '../Pagination'

export default {
  components: { Pagination },
  name: 'Table',
  props: {
    data: {
      type: Array,
      require: true,
      default: () => []
    },
    showID: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100]
    },
    head: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  setup (props, { emit }) {
    const { data, total, pageSize, pageSizes } = toRefs(props)
    const curPageSize = computed(() => unref(pageSize))
    const curPageSizes = computed(() => unref(pageSizes))
    const curTotal = computed(() => unref(total))
    const tableQuery = reactive({
      page: '1',
      rows: unref(pageSize)
    })
    const handleChange = () => {
      emit('query', unref(tableQuery))
    }
    const tableData = computed(() => unref(data))
    return {
      tableData,
      tableQuery,
      curTotal,
      curPageSize,
      handleChange,
      curPageSizes,
      ...props
    }
  }
}
</script>

<style lang="less">
.table-wrap {
  background-color: var(--main-color);
}
.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 10px;
  font-size: 14px;
  > thead,
  > tbody,
  > tfoot {
    > tr {
      transition: all 0.3s ease;
      > th,
      > td {
        text-align: left;
        vertical-align: middle;
        border: 0;
        padding: 1rem;
      }
    }
  }
  > thead {
    color: white;
    font-weight: 400;
    table-layout: fixed;
    .head-id {
      width: 40px;
    }
    th {
      background-color: var(--theme-color);
      min-width: 0;
      box-sizing: border-box;
      text-overflow: ellipsis;
      vertical-align: middle;
      position: relative;
      text-align: left;
    }
  }
  > tbody {
    color: var(--main-font-color);
    tr {
      font-weight: 300;
      td {
        border-bottom: solid 1px var(--lighter-color);
      }
    }
  }
}
</style>
