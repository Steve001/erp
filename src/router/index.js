import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// 导入modules下面的路由模块
// import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 * 不论什么权限一直显示的侧边栏
 */
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: {
          title: '控制台',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  },
  // 个人资料
  // {
  //   path: '/profile',
  //   component: Layout,
  //   // redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'voucherManage',
  //       component: () => import('@/views/profile/index'),
  //       name: 'voucherManage',
  //       meta: {
  //         title: '个人资料',
  //         icon: 'printer',
  //         noCache: true
  //       }
  //     }
  //   ]
  // },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 * 根据不同的权限动态加载出侧边栏目
 */
export const asyncRoutes = [
  // 房源收藏管理
  // {
  //   path: '/houseSelect',
  //   component: Layout,
  //   // redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'houseSelect',
  //       component: () => import('@/views/houseSelect'),
  //       name: 'houseSelect',
  //       meta: {
  //         title: '房源收藏管理',
  //         icon: 'houseSelect',
  //         noCache: true,
  //         roles: ['admin', 'editor']
  //       }
  //     }
  //   ]
  // },
  // // 客户收藏管理
  // {
  //   path: '/cusSelect',
  //   component: Layout,
  //   // redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'cusSelect',
  //       component: () => import('@/views/cusSelect'),
  //       name: 'cusSelect',
  //       meta: {
  //         title: '客户收藏管理',
  //         icon: 'cusSelect',
  //         noCache: true,
  //         roles: ['admin', 'editor']
  //       }
  //     }
  //   ]
  // },
  // // 认购书打印
  // {
  //   path: '/voucherPrint',
  //   component: Layout,
  //   // redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'voucherPrint',
  //       component: () => import('@/views/voucherPrint'),
  //       name: 'voucherPrint',
  //       meta: {
  //         title: '认购书打印',
  //         icon: 'printer',
  //         noCache: true,
  //         roles: ['admin', 'editor']
  //       }
  //     }
  //   ]
  // },
  // 经纪人管理
  {
    path: '/user',
    component: Layout,
    // redirect: '/guide/index',
    children: [
      {
        path: 'userManage',
        component: () => import('@/views/userManage'),
        name: 'userManage',
        meta: {
          title: '销售员管理',
          icon: 'user',
          noCache: true,
          roles: ['admin']
        }
      }
    ]
  },
  // 客户管理
  {
    path: '/cus',
    component: Layout,
    // redirect: '/guide/index',
    children: [
      {
        path: 'cusManage',
        component: () => import('@/views/cusManage'),
        name: 'cusManage',
        meta: {
          title: '客户管理',
          icon: 'cus',
          noCache: true,
          roles: ['admin']
        }
      }
    ]
  }
  // 红包管理
  // {
  //   path: '/redbag',
  //   component: Layout,
  //   // redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'cashoutApply',
  //       component: () => import('@/views/cashoutApply'),
  //       name: 'cashoutApply',
  //       meta: {
  //         title: '红包管理',
  //         icon: 'redbag',
  //         noCache: true,
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // },
  // // 用户意向分析
  // {
  //   path: '/userIntention',
  //   component: Layout,
  //   // redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'userIntention',
  //       component: () => import('@/views/userIntention'),
  //       name: 'userIntention',
  //       meta: {
  //         title: '意向统计',
  //         icon: 'intention',
  //         noCache: true,
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // },
  // 图表管理
  // chartsRouter
  // 用户位置热力图
  // {
  //   path: '/userLocHeat',
  //   component: Layout,
  //   // redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'userLocHeat',
  //       component: () => import('@/views/userLocHeat'),
  //       name: 'userLocHeat',
  //       meta: {
  //         title: '用户位置热力图',
  //         icon: 'heatmap',
  //         noCache: true,
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
