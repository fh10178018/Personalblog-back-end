<template>
  <a class="article-box">
    <div class="article-img">
      <img src="https://assets.codepen.io/3879263/internal/screenshots/pens/JjGVbjY.custom.png?fit=cover&format=auto&ha=false&height=360&quality=75&v=2&version=1596457569&width=640"/>
    </div>
    <div class="article-info">
      <div class="name">
        <h3>哈哈哈<Tag class="m-l-1" :color="'primary'">Js</Tag></h3>
      </div>
      <div class="description">
        asdasdasdasdasda
      </div>
      <div class="action-info">
        <button ><i class="fa fa-clock-o m-r-1"/>2021/05/51 11：00</button>
        <button ><i class="fa fa-heart m-r-1" />21</button>
        <button ><i class="fa fa-eye m-r-1" />7：21</button>
      </div>
    </div>
    <div class="article-action">
      <button><i class="fa fa-edit"/></button>
      <button><i class="fa fa-trash"/></button>
    </div>
  </a>
</template>

<script>
import Tag from '../../../common/Tag/Tag'
export default {
  name: 'ArticleBox',
  components: { Tag }
}
</script>

<style lang="less">
.article-box{
  background-color: var(--main-color);
  border-radius: 5px;
  overflow: hidden;
  margin:5px 0;
  display: flex;
  align-items: center;
  height: 90px;
  .article-img{
    width: 160px;
    height: 100%;
    img{
      height: 100%;
    }
  }
  .article-info{
    color: var(--main-font-color);
    flex: 1;
    padding: 5px 5px;
    .name{
      margin-left: 5px;
    }
    .description{
      margin-left: 5px;
    }
    .action-info{
      display: flex;
      font-size: 10px;
      button{
        color: var(--main-font-color);
        border-radius: 50px;
        border: 1px solid transparent;
        background-color: var(--main-color);
        padding:0 5px;
        line-height: 20px;
        cursor: pointer;
        margin-right: 10px;
        transition: 500ms;
        i{
          margin-right: 3px;
        }
      }
      button:hover{
        color: var(--theme-color);
        border-color: var(--theme-color);
      }
      button:focus{
        outline: 0;
      }
    }
  }
  .article-action{
    display: flex;
    height: 90px;
    align-items: center;
    background-image: linear-gradient(to left, var(--main-background-color) 0,transparent 55%);
    button{
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
    button:hover{
      color: var(--theme-color);
    }
    button:focus{
      outline: 0;
    }
  }
}
  .article-box:hover{
    .article-action{
      button{
        background-color:var(--main-color);
        opacity: 1;
      }
    }
  }
</style>
