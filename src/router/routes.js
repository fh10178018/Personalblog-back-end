const Home = () => import('@/views/functional_page/Home/Home.vue')
const Layout = () => import('@/views/functional_page/Layout.vue')
const Login = () => import('@/views/login_page/Login.vue')
const Articles = () => import('../components/content/Articles/Articles.vue')
const Message = () => import('../components/content/Message/Message.vue')
const Messagelist = () => import('../components/content/Message/Messagelist.vue')
const MessageDetail = () => import('../components/content/Message/MessageDetail.vue')
const UserControl = () => import('../components/content/UserControl/UserControl.vue')
const AdminBox = () => import('../components/content/UserControl/AdminControl/AdminBox.vue')
const Articleslist = () => import('../components/content/Articles/Articleslist.vue')
const Documents = () => import('../components/content/Documents/Documents.vue')
const Document = () => import('../components/content/Documents/Document.vue')
const ResumeEdit = () => import('../components/content/ResumeEdit/ResumeEdit.vue')
const routes = [
  {
    path: '/',
    redirect: '/power'
  },
  {
    path: '/login',
    component: Login,
    name:"login",
    meta: {
      title: '个人博客后端-登陆界面',
      index: 0
    }
  },
  {
    path: '/power',
    component: Layout,
    name:"power",
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
        name:"home",
        component: Home,
        meta: {
          title: '个人博客后端-主页',
          index: 1
        }
      },
      {
        path: 'content',
        name:"content",
        component: Articles,
        children: [
          {
            path: '',
            redirect: { name: 'Articleslist', params: { sortname: 'all' } }
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
        path: 'message',
        component: Message,
        children: [
          {
            path: '',
            redirect: '/power/message/all'
          },
          {
            path: 'all',
            name: 'Messagelist',
            component: Messagelist,
            meta: {
              title: '内容页面'
            }
          },
          {
            path: 'detail/:msgId',
            name: 'MessageDetail',
            component: MessageDetail,
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
      },
      {
        path: 'resumeedit',
        component: ResumeEdit,
        meta: {
          title: '内容页面'
        }
      }
    ]
  }
]

export default routes
