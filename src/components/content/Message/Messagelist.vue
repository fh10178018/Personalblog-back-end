<template>
  <div class="articles-list">
    <div class="action">
      <Button><i class="fa fa-bookmark"
           aria-hidden="true"></i></Button>
      <Button><i class="fa fa-eye"
           aria-hidden="true"></i></Button>
      <Button><i class="fa fa-trash-o"
           aria-hidden="true"></i></Button>
    </div>
    <div class="wrap">
      <Table :data="data"
             :total="total"
             :head="head"
             :showThead="false"
             :isPointer="true"
             @query="handleQuery"
             v-loading="isLoading">
        <template v-slot="scope">
          <TableColumn width="30px">
            <CheckBox @change="handleSelect"
                      :showLabel="false"
                      :label="scope.item._id"></CheckBox>
          </TableColumn>
          <TableColumn>
            <router-link class="articles-nav"
                         to="/power/message/detail/werwe">{{scope.item.name}}</router-link>
          </TableColumn>
          <TableColumn @click="handleClick(scope.item)">{{scope.item.message}}</TableColumn>
          <TableColumn width="162px"
                       @click="handleClick(scope.item)">{{formatDate(scope.item.creatTime)}}</TableColumn>
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
import Button from '../../common/Button/Button'
import { Table, TableColumn } from '../../common/Table'
import { CheckBox } from '../../common/CheckBox'
import { computed, onMounted, reactive, unref, watch, ref } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'
import formatDate from '../../../utils/formatDate'
export default {
  name: 'Messagelist',
  components: { Button, Table, TableColumn, CheckBox },
  setup () {
    const store = useStore()
    const curType = computed(() => unref(router.currentRoute).params.sortname === 'all' ? '' : unref(router.currentRoute).params.sortname)
    const total = computed(() => unref(store.state.Message.totalList))
    const isLoading = computed(() => unref(store.state.Message.isLoading).table)
    const data = computed(() => unref(store.state.Message.MessageList))
    const pageSizes = reactive([10, 20, 50, 100])
    const pageSize = ref(20)
    const tableQuery = reactive({
      page: '1',
      rows: unref(pageSize),
      isReady: ''
    })
    const selectData = ([])
    const handleSelect = (item) => {
      if (item.value) {
        selectData.push(item.value)
      } else {
        selectData.splice(selectData.indexOf(item._id), 1)
      }
    }
    const head = reactive([
      { name: '操作' },
      { name: '昵称', prop: 'name' },
      { name: '讯息', prop: 'message' },
      { name: '日期', prop: 'creatTime' }
    ])
    const handleChange = val => {
      setData(val)
    }
    const handleClick = val => {
      router.push({ path: '/power/message/detail/' + unref(val)._id })
    }
    const setData = val => {
      store.dispatch('getMessageList', { ...unref(tableQuery) })
    }
    const handleQuery = val => {
      setData(val)
    }
    watch(curType, () => {
      setData({ ...unref(tableQuery) })
    })
    onMounted(() => {
      setTimeout(() => {
        setData({ ...unref(tableQuery) })
      }, 20)
    })
    return {
      curType,
      pageSizes,
      pageSize,
      tableQuery,
      handleChange,
      handleQuery,
      total,
      data,
      isLoading,
      head,
      formatDate,
      handleSelect,
      handleClick
    }
  }
}
</script>

<style lang="less">
.articles-list {
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;
  > .wrap {
    border-radius: 5px;
    margin: 10px;
    margin-bottom: 150px;
    box-shadow: 0 5px 0 0 rgba(0, 0, 0, 0.14);
    flex: 1;
    .table-wrap {
      border-radius: 5px;
      padding: 5px;
    }
  }
  > .action {
    display: flex;
    padding: 10px 10px 0 10px;
    > button {
      margin-right: 5px;
    }
  }
}
</style>
