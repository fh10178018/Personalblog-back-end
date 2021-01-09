<template>
  <div class="articles-list"
       v-loading="isLoading">
    <div class="header">
      <div>
        <h1>{{curType===''?'所有日志':curType}}</h1>
      </div>
      <div>
        <Button @click="showEditArticlesModal('add')"><i class="fa fa-plus m-r-1" />添加文章</Button>
      </div>
    </div>
    <ul>
      <li v-for="(item) in BlogList"
          :key="item._id">
        <ArticleBox :item="item"
                    :edit="showEditArticlesModal"></ArticleBox>
      </li>
    </ul>
    <Pagination @change="handleChange"
                v-model="tableQuery"
                :page-sizes="pageSizes"
                :page-size="pageSize"
                :total="total" />
  </div>
  <EditArticlesModal ref="EditModal"
                     :curType="curType" />
</template>

<script>
import ArticleBox from './ArticleBox'
import Button from '../../common/Button/Button'
import Pagination from '../../common/Pagination'
import EditArticlesModal from './EditArticlesModal'
import { computed, onMounted, reactive, unref, watch, ref } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'
export default {
  name: 'Articleslist',
  components: { EditArticlesModal, Button, ArticleBox, Pagination },
  setup () {
    const store = useStore()
    const EditModal = ref(null)
    const curType = computed(() => unref(router.currentRoute).params.sortname === 'all' ? '' : unref(router.currentRoute).params.sortname)
    const total = computed(() => unref(store.state.Blog.totalList))
    const isLoading = computed(() => unref(store.state.Blog.isLoading).table)
    const BlogList = computed(() => unref(store.state.Blog.BlogList))
    const pageSizes = reactive([10, 20, 50, 100])
    const pageSize = ref(20)
    const tableQuery = reactive({
      page: '1',
      rows: unref(pageSize)
    })
    const handleChange = val => {
      setData(val)
    }
    const setData = val => {
      store.dispatch('getBlogList', { ...unref(tableQuery), type: unref(curType) })
    }
    const getModal = () => {
      return unref(EditModal)
    }
    const showEditArticlesModal = val => {
      const { handleShow } = getModal()
      handleShow(val)
    }
    watch(curType, () => {
      setData({ ...unref(tableQuery), type: unref(curType) })
    })
    onMounted(() => {
      setTimeout(() => {
        setData({ ...unref(tableQuery), type: unref(curType) })
      }, 20)
    })
    return {
      curType,
      pageSizes,
      pageSize,
      tableQuery,
      handleChange,
      total,
      BlogList,
      isLoading,
      EditModal,
      showEditArticlesModal
    }
  }
}
</script>

<style lang="less">
.articles-list {
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  .header {
    display: flex;
    align-items: center;
    color: var(--main-font-color);
    justify-content: space-between;
    padding: 15px 15px 5px 15px;
  }
  ul {
    padding: 5px 15px 5px 15px;
    list-style: none;
  }
}
</style>
