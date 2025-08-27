/* eslint-disable */
import App from './App.vue'
import router from './router'
import { store } from '@/store'
import '@/assets/style/index.css'
import './utils'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/dist/index.css'
import { ElMessage } from 'element-plus'

import { createApp } from 'vue'
const app = createApp(App)

app.config.productionTip = false



// 统一异常处理
app.config.errorHandler = function (e, v) {
  console.warn('统一异常处理', e)
  ElMessage({
    message: e.message || '遇到未知异常',
    type: 'error',
    duration: 5 * 1000
  })
  if (v) {
    v.loading = false
  }
  console.error(e)
}

app.use(router).use(store).use(ElementPlus).mount('#app')

export default app
