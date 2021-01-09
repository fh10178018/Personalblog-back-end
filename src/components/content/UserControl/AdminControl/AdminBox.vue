<template>
  <div class="admin-box">
    <div class="table-wrapper">
      <Table :data="data"
             :total="total"
             :head="head"
             @query="handleQuery"
             showID
             v-loading="tableIsLoading">
        <template v-slot="scope">
          <TableColumn>{{scope.item.username}}</TableColumn>
          <TableColumn>{{scope.item.name}}</TableColumn>
          <TableColumn>
            <Tag>{{scope.item.isAdmin?'管理员身份':'普通用户'}}</Tag>
          </TableColumn>
          <TableColumn>{{formatDate(scope.item.loginTime)}}</TableColumn>
          <TableColumn>
            <Button type="text"
                    :disabled="!isAdmin"
                    :style="{marginRight:'5px'}"
                    @click="showEditAdminModal(scope.item)">编辑<span style="display:none">{{scope.item.isAdmin?'用于更新数据，暂无其它方案':'s'}}</span></Button>
            <Button type="text"
                    :disabled="!isAdmin"
                    :style="{marginRight:'5px'}"
                    @click="showEditAdminPasswordModal(scope.item)">修改密码</Button>
            <Button type="text"
                    :disabled="!isAdmin"
                    @click="deleteAdminUser(scope.item)">删除</Button>
          </TableColumn>
        </template>
      </Table>
    </div>
    <div class="action">
      <Button @click="showEditAdminModal('add')"
              type="text"
              :circle="false"><i class="fa fa-plus"></i></Button>
    </div>
  </div>
  <EditAdminModal ref="Modal" />
  <EditAdminPasswordModal ref="pwdModal" />
</template>

<script>
import { Table, TableColumn } from '@/components/common/Table'
import { computed, reactive, onMounted, unref, ref } from 'vue'
import formatDate from '../../../../utils/formatDate'
import { useStore } from 'vuex'
import reactiveToObject from '@/utils/reactiveToObject'
import Button from '@/components/common/Button/Button.vue'
import EditAdminModal from './EditAdminModal'
import EditAdminPasswordModal from './EditAdminPasswordModal'
import ModelMessage from '@/components/common/ModalMessage'
import Tag from '@/components/common/Tag/Tag.vue'
export default {
  components: { Table, TableColumn, Button, EditAdminModal, EditAdminPasswordModal, Tag },
  name: 'AdminBox',
  setup () {
    const store = useStore()
    const Modal = ref(null)
    const pwdModal = ref(null)
    const getModal = () => {
      return unref(Modal)
    }
    const getPwdModal = () => {
      return unref(pwdModal)
    }
    const setData = tableQuery => {
      store.dispatch('getAdminUserList', reactiveToObject(tableQuery))
    }
    const isAdmin = computed(() => unref(store.state.User.userInfo).isAdmin)
    const data = computed(() => store.state.User.AdminUserList)
    const total = computed(() => unref(store.state.User.totalList))
    const tableIsLoading = computed(() => unref(store.state.User.isLoading).table)
    const deleteIsLoading = computed(() => unref(store.state.User.isLoading).delete)
    const head = reactive([
      { name: '账号', prop: 'username' },
      { name: '姓名', prop: 'name' },
      { name: '身份', prop: 'isAdmin' },
      { name: '最近登录日期', prop: 'loginTime' },
      { name: '操作' }
    ])
    const handleQuery = val => {
      setData(val)
    }
    const deleteAdminUser = item => {
      ModelMessage({
        content: '你确定要删除 "' + item.name + '" 管理员用户吗？',
        type: 'warning',
        loading: unref(deleteIsLoading),
        callback: () => {
          store.dispatch('deleteAdminUser', { _id: item._id })
        }
      })
    }
    const showEditAdminModal = val => {
      const { handleShow } = getModal()
      handleShow(val)
    }
    const showEditAdminPasswordModal = val => {
      const { handleShow } = getPwdModal()
      handleShow(val)
    }
    onMounted(() => {
      setTimeout(() => {
        setData(reactive({ page: 1, rows: 20 }))
      }, 20)
    })
    return {
      data,
      head,
      total,
      tableIsLoading,
      handleQuery,
      showEditAdminModal,
      showEditAdminPasswordModal,
      deleteAdminUser,
      Modal,
      formatDate,
      pwdModal,
      isAdmin
    }
  }
}
</script>

<style lang="less">
.admin-box {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 5px;
  z-index: 1;
  display: flex;
  .table-wrapper {
    flex: 1;
    z-index: 1;
    border-radius: 5px 0 5px 5px;
    padding: 10px;
    background-color: var(--main-color);
    margin-bottom: 150px;
    box-shadow: 0 5px 0 0 rgba(0, 0, 0, 0.14);
  }
  .action {
    z-index: 0;
    transition: 500ms;
    transform: translateX(-35px);
    .btn {
      background: var(--main-color);
      border-radius: 0 5px 5px 0;
      line-height: 50px;
      box-shadow: 0 5px 0 0 rgba(0, 0, 0, 0.14);
      padding: 10px;
      i {
        transition: 500ms;
      }
    }
    .btn:hover {
      color: var(--theme-color) !important;
      i {
        transform: scale(1.4);
      }
    }
    .btn:focus {
      color: var(--theme-color);
    }
  }
}
.admin-box:hover {
  .action {
    transform: translateX(0);
  }
}
</style>
