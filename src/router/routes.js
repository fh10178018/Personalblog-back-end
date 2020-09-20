const Home = () => import('@/views/functional_page/Home/Home.vue')
const Layout = () => import('@/views/functional_page/Layout.vue')
const Login = () => import('@/views/login_page/Login.vue')
const WebCodeEdit = () => import('@/views/edit_page/WebCodeEdit.vue')
const Articles = () => import('../components/content/Articles/Articles.vue')
const Articleslist = () => import('../components/content/Articles/Articleslist.vue')
const ArticleEdit = () => import('@/views/edit_page/ArticleEdit.vue')
const DirectionEdit = () => import('@/views/edit_page/DirectionEdit.vue')
const Documents = () => import('../components/content/Documents/Documents.vue')
const Document = () => import('../components/content/Documents/Document.vue')

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
        component: Articles,
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
            component: Articleslist,
            meta: {
              title: '内容页面'
            }
          }
        ],
        meta: {
          title: '内容页面'
        }
      },
      {
        path: 'docs',
        name: 'Docs',
        component: Documents,
        children: [
          {
            path: '',
            redirect: to => {
              to.params.docsId = '0'
              return '/power/docs/0'
            }
          },
          {
            path: ':docsId',
            component: Document,
            meta: {
              title: '组件属性页面'
            }
          }
        ],
        meta: {
          title: '组件属性页面'
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

export default routes
