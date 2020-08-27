<template>
  <div class="articles-list">
    <div class="header">
      <div>
        <h1>asd</h1>
      </div>
      <div>
        <Button @click="handleShow"><i class="fa fa-plus m-r-1" />添加文章</Button>
        <Modal modal-status='fade'  ref="modal">
          <template v-slot:header>
            asd
          </template>
          <template v-slot:content>
            asd
          </template>
          <template v-slot:footer>
            asd
          </template>
        </Modal>
      </div>
    </div>
    <ul>
      <li>
        <ArticleBox></ArticleBox>
      </li>
    </ul>
  </div>
</template>

<script>
import ArticleBox from './ArticleBox/ArticleBox'
import Button from '../../common/Button/Button'
import Modal from '../../common/Modal/Modal'
export default {
  name: 'Articleslist',
  methods: {
    handleShow () {
      this.$refs.modal.handleModalShow()
    }
  },
  components: { Modal, Button, ArticleBox }
}
</script>

<style lang="less">
  .articles-list{
    overflow-y: auto;
    overflow-x: hidden;
    .header{
      display: flex;
      align-items: center;
      color: var(--main-font-color);
      justify-content: space-between;
      padding: 15px 15px 5px 15px;
    }
    ul{
      padding: 5px 15px 5px 15px;
      list-style: none;
    }
  }
</style>
