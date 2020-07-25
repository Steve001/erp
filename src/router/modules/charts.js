/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Charts',
  meta: {
    title: '图表管理',
    icon: 'chart',
    roles: ['admin']
  },
  children: [
    // {
    //   path: 'keyboard',
    //   component: () => import('@/views/charts/keyboard'),
    //   name: 'KeyboardChart',
    //   meta: { title: '键盘表', noCache: true }
    // },
    {
      path: 'line',
      component: () => import('@/views/charts/line'),
      name: 'LineChart',
      meta: { title: '注册用户分析曲线图', noCache: true, roles: 'admin' }
    }
  ]
}

export default chartsRouter
