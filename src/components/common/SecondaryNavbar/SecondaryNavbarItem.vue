<template>
  <Tooltip :content="description" :placement="place">
    <router-link class="articles-nav" :to="href">
      <div class="img" v-if="showImg"><slot name="itemImg"></slot></div>
      <div class="info">
        <div class="name"><slot name="itemTitle"></slot></div>
        <div class="description">{{description}}</div>
      </div>
    </router-link>
  </Tooltip>
</template>

<script>
import { computed, ref } from 'vue'
import Tooltip from '../Tooltip/Tooltip'
export default {
  name: 'SecondaryNavbarItem',
  setup (props, { slots }) {
    const place = ref('right')
    const showImg = computed(() => {
      return slots.itemImg
    })
    return {
      place,
      showImg,
      ...props
    }
  },
  props: {
    href: {
      type: String,
      require: true,
      default: '/'
    },
    description: {
      type: String,
      require: true,
      default: '内容描述'
    }
  },
  components: { Tooltip }
}
</script>

<style lang="less" scoped>
  .articles-nav{
    height: 60px;
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    text-decoration: none;
    transition: 500ms;
    .img{
      width: 42px;
      height: 42px;
      border-radius: 100%;
    }
    .info{
      margin-left: 10px;
      width: 130px;
      line-height: 21px;
      color: var(--main-font-color);
      .name{
        font-weight: bold;
      }
      .description{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .articles-nav:hover{
    color: var(--theme-color);
    background-color: var(--main-color);
  }
  .active{
    background-color: var(--main-color);
    .name{
      color: var(--theme-color);
    }
  }
</style>
