const Home = () => import('@/views/functional_page/Home/Home.vue')
const Layout = () => import('@/views/functional_page/Layout.vue')
const Login = () => import('@/views/login_page/Login.vue')
const WebCodeEdit = () => import('@/views/edit_page/WebCodeEdit.vue')
const Articles = () => import('../components/content/Articles/Articles.vue')
const UserControl = () => import('../components/content/UserControl/UserControl.vue')
const AdminBox = () => import('../components/content/UserControl/AdminControl/AdminBox.vue')
const Articleslist = () => import('../components/content/Articles/Articleslist.vue')
const ArticleEdit = () => import('@/views/edit_page/ArticleEdit.vue')
const DirectionEdit = () => import('@/views/edit_page/DirectionEdit.vue')
const Documents = () => import('../components/content/Documents/Documents.vue')
const Document = () => import('../components/content/Documents/Document.vue')
const routes = [
  {
    path: '/',
    redirect: '/power'
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '个人博客后端-登陆界面',
      index: 0
    }
  },
  {
    path: '/power',
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
        component: Home,
        meta: {
          title: '个人博客后端-主页',
          index: 1
        }
      },
      {
        path: 'content',
        component: Articles,
        children: [
          {
            path: '',
            redirect: { name: 'Articleslist', params: { sortname: 'article' } }
          },
          {
            path: ':sortname',
            name: 'Articleslist',
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
        component: Documents,
        children: [
          {
            path: '',
            redirect: { name: 'docs', params: { docsId: 0 } }
          },
          {
            name: 'docs',
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
      },
      {
        path: 'usercontrol',
        component: UserControl,
        children: [
          {
            path: '',
            redirect: '/power/usercontrol/admin'
          },
          {
            path: 'admin',
            name: 'AdminBox',
            component: AdminBox
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

export default routes
