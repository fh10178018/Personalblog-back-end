import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('@/views/functional_page/Home/Home.vue')
const Layout = () => import('@/views/functional_page/Layout.vue')
const Login = () => import('@/views/login_page/Login.vue')
const WebCodeEdit = () => import('@/views/edit_page/WebCodeEdit.vue')
const Articles = () => import('@/components/content/Articles/Articles.vue')
const ArticleEdit = () => import('@/views/edit_page/ArticleEdit.vue')
const Content = () => import('@/views/functional_page/Content/Content.vue')
const DirectionEdit = () => import('@/views/edit_page/DirectionEdit.vue')

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '个人博客后端-登陆界面',
      index: 0
    }
  },
  {
    path: '/power',
    name: 'Power',
    component: Layout,
    meta: {
      title: '个人博客后端-',
      index: 1
    },
    children: [
      {
        path: '',
        redirect: '/power/home'
      },
      {
        path: 'home',
        name: 'Home',
        component: Home,
        meta: {
          title: '个人博客后端-主页',
          index: 1
        }
      },
      {
        path: 'content',
        name: 'Content',
        component: Content,
        children: [
          {
            path: '',
            redirect: to => {
              to.params.sortname = 'article'
              return '/power/content/article'
            }
          },
          {
            path: ':sortname',
            component: Articles,
            meta: {
              title: '内容页面'
            }
          }
        ],
        meta: {
          title: '内容页面'
        }
      }
    ]
  },
  {
    path: '/edit',
    name: 'Edit',
    meta: {
      title: '个人博客后端编辑-',
      index: 2
    },
    children: [
      {
        path: '/edit/webcodeedit',
        name: 'WebCodeEdit',
        component: WebCodeEdit,
        meta: {
          title: '代码编辑页面',
          keepAlive: false
        }
      },
      {
        path: '/edit/articleedit',
        name: 'ArticleEdit',
        component: ArticleEdit,
        meta: {
          title: '文章编辑页面',
          keepAlive: false
        }
      },
      {
        path: '/edit/directionedit',
        name: 'DirectionEdit',
        component: DirectionEdit,
        meta: {
          title: '文章描述页面编辑',
          keepAlive: false
        }
      }
    ]
  }
]
// vue-router默认是hash模式，在hash模式下，是会有#号在URL上的
const router = createRouter({
  linkActiveClass: 'active',
  history: createWebHistory(),
  routes
})

// 前置钩子(hook)
router.beforeEach((to, from, next) => {
  if (to.params.sortname) {
    document.title = to.matched[0].meta.title + '-' + to.params.sortname
  } else {
    document.title = to.matched[0].meta.title
  }
  if (to.path === '/login') {
    next()
  } else {
    const isToken = !!localStorage.Authorization
    isToken ? next() : next('/login')
  }
})

export default router
