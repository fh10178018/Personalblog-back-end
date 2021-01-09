<template>
  <a class="article-box">
    <div class="article-img">
      <img :src="'/api' + nativeItem.imageUrl" />
    </div>
    <div class="article-info">
      <div class="name">
        <h3>{{nativeItem.title}}
          <Tag v-for="(item, index) in nativeItem.types"
               :key="index"
               class="m-l-1"
               :color="'primary'">{{item}}</Tag>
        </h3>
      </div>
      <div class="description">
        {{nativeItem.introduction}}
      </div>
      <div class="action-info">
        <button><i class="fa fa-clock-o m-r-1" />{{formatDate(nativeItem.editTime)}}</button>
        <button><i class="fa fa-heart m-r-1" />{{nativeItem.likeNums}}</button>
        <button><i class="fa fa-eye m-r-1" />{{nativeItem.viewNums}}</button>
      </div>
    </div>
    <div class="article-action">
      <Button type="text"
              @click="edit(nativeItem)"><i class="fa fa-edit" /></Button>
      <Button type="text"
              @click="deleteArticle(nativeItem)"><i class="fa fa-trash" /></Button>
    </div>
  </a>
</template>

<script>
import formatDate from '../../../utils/formatDate'
import Tag from '../../common/Tag/Tag'
import Button from '../../common/Button'
import { unref, computed, toRefs } from 'vue'
import { useStore } from 'vuex'
import ModelMessage from '@/components/common/ModalMessage'
import router from '@/router'
export default {
  name: 'ArticleBox',
  components: { Tag, Button },
  props: {
    item: Object,
    edit: Function
  },
  setup (props) {
    const store = useStore()
    const { item } = toRefs(props)
    const deleteIsLoading = computed(() => unref(store.state.Blog.isLoading).delete)
    const nativeItem = computed(() => unref(item))
    const curType = computed(() => unref(router.currentRoute).params.sortname === 'all' ? '' : unref(router.currentRoute).params.sortname)
    const deleteArticle = item => {
      ModelMessage({
        content: '你确定要删除 "' + item.title + '" 日志吗？',
        type: 'warning',
        loading: unref(deleteIsLoading),
        callback: () => {
          store.dispatch('deleteBlog', { _id: item._id, type: unref(curType) })
        }
      })
    }
    return {
      ...unref(props),
      nativeItem,
      formatDate,
      deleteArticle
    }
  }
}
</script>

<style lang="less">
.article-box {
  background-color: var(--main-color);
  border-radius: 5px;
  overflow: hidden;
  margin: 5px 0;
  display: flex;
  align-items: center;
  height: 90px;
  .article-img {
    width: 160px;
    height: 100%;
    img {
      height: 100%;
    }
  }
  .article-info {
    color: var(--main-font-color);
    flex: 1;
    padding: 5px 5px;
    .name {
      margin-left: 5px;
    }
    .description {
      margin-left: 5px;
    }
    .action-info {
      display: flex;
      font-size: 10px;
      button {
        color: var(--main-font-color);
        border-radius: 50px;
        border: 1px solid transparent;
        background-color: var(--main-color);
        padding: 0 5px;
        line-height: 20px;
        cursor: pointer;
        margin-right: 10px;
        transition: 500ms;
        i {
          margin-right: 3px;
        }
      }
      button:hover {
        color: var(--theme-color);
        border-color: var(--theme-color);
      }
      button:focus {
        outline: 0;
      }
    }
  }
  .article-action {
    display: flex;
    height: 90px;
    align-items: center;
    background-image: linear-gradient(
      to left,
      var(--main-background-color) 0,
      transparent 55%
    );
    button {
      color: var(--main-font-color);
      transition: 500ms;
      opacity: 0;
      font-size: 20px;
      border: 0;
      background-color: transparent;
      width: 45px;
      height: 90px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    button:hover {
      color: var(--theme-color);
    }
    button:focus {
      outline: 0;
    }
  }
}
.article-box:hover {
  .article-action {
    button {
      background-color: var(--main-color);
      opacity: 1;
    }
  }
}
</style>
