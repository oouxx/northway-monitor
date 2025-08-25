import { createRouter, createWebHistory } from 'vue-router'
import loginApi from '../api/loginApi'
import { ElMessage } from 'element-plus'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/workspace',
    name: 'workspace',
    component: () => import('../views/WorkspaceView.vue'),
    children: [
      {
        path: '/mktgateway',
        name: 'mktgateway',
        props: { gatewayUsage: 'MARKET_DATA' },
        component: () => import('../views/GatewayMgmt.vue')
      },
      {
        path: '/tdgateway',
        name: 'tdgateway',
        props: { gatewayUsage: 'TRADE' },
        component: () => import('../views/GatewayMgmt.vue')
      },
      {
        path: '/module',
        name: 'module',
        component: () => import('../views/ModuleMgmt.vue')
      },
      {
        path: '/mktdata',
        name: 'mktdata',
        component: () => import('../views/NotImplemented.vue')
      },
      {
        path: '/manualfttd',
        name: 'manualfttd',
        component: () => import('../views/TradeView.vue')
      },
      {
        path: '/manualopttd',
        name: 'manualopttd',
        component: () => import('../views/NotImplemented.vue')
      },
      {
        path: '/logger',
        name: 'logger',
        component: () => import('../views/LogTailingView.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.name === 'login') {
    next()
    return
  }
  try {
    await loginApi.test()
    next()
  } catch (e) {
    console.log('test fail')
    ElMessage({
      type: 'error',
      message: '认证失败！请登录！',
      duration: 3000
    })
    next('/')
  }
})

export default router
