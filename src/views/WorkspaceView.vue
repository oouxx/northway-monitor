<template>
  <div class="ns-workspace">
    <MessageConfigForm v-model:visible="mailSettingFormVisible" />
    <div class="ns-header">
      <el-menu class="ns-menu" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff"
        active-text-color="#ffd04b" :default-active="curPage">
        <el-menu-item id="tabMarketData" index="1">行情管理</el-menu-item>
        <el-menu-item id="tabAccount" index="2">账户管理</el-menu-item>
        <el-menu-item id="tabModule" index="3">模组管理</el-menu-item>
        <el-menu-item id="tabTrade" index="6">手工交易</el-menu-item>
        <el-menu-item id="tabLog" index="9">日志跟踪</el-menu-item>
      </el-menu>
      <div class="ns-tools">
        <el-popover class="mr-10" placement="left" trigger="click">
          <img src="../assets/wx.jpg" width="400px" />
          <el-button slot="reference" title="加入社群" circle>
            <Flag />
          </el-button>
        </el-popover>
        <el-popover class="mr-10" placement="left" trigger="click">
          <img src="../assets/知识星球.jpg" width="400px" />
          <el-button slot="reference" title="知识星球提问" circle>
            <Help />
          </el-button>
        </el-popover>
        <el-button @click="mailSettingFormVisible = true" title="邮件通知设置" circle>
          <el-icon>
            <Share />
          </el-icon>
        </el-button>
        <el-button class="mr-10" title="退出登录" circle @click="logout">
          <el-icon>
            <SwitchButton />
          </el-icon>

        </el-button>
        <span>版本号：v{{ version }}</span>
      </div>
    </div>
    <div class="ns-body">
      <router-view></router-view>
      <socket-connection />
    </div>
  </div>
</template>

<script setup>
import SocketConnection from '@/components/SocketConnection.vue'
import MessageConfigForm from '@/components/MessageConfigForm.vue'
import { Share, SwitchButton, Help, Flag } from '@element-plus/icons-vue'

import loginApi from '@/api/loginApi'
import MediaListener from '@/utils/media-utils'
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import { ElMessage } from 'element-plus'
const route = useRoute()
const router = useRouter()
// const visible = ref(false)
const pageOpts = {
  1: 'mktgateway',
  2: 'tdgateway',
  3: 'module',
  5: 'manualopttd',
  6: 'manualfttd',
  9: 'logger'
}
const listener = new MediaListener(() => { })
let curPage = ref('0')
let mailSettingFormVisible = ref(false)
let version = ref('0.0.1')

const pageOptsRevert = {}
Object.keys(pageOpts).forEach((key) => (pageOptsRevert[pageOpts[key]] = key))
onMounted(() => {
  fetch(`${window.baseURL || ''}/version`).then(result => {
    if (result.status === 200) {
      return result.text()
    }
    return Promise.reject()
  }).then(v => {
    version.value = v.replace(/"/g, "")
  })
  curPage.value = pageOptsRevert[route.name]
  const resizeHandler = () => {
    if (listener.isMobile() && route.name !== 'module' && route.name !== 'manualfttd') {
      handleSelect('3', ['3'])
    }
  }
  resizeHandler()
})

onBeforeRouteUpdate((to, from, next) => {
  const listener = new MediaListener(() => { })
  if (listener.isMobile() && to.name !== 'module') {
    const newTo = {
      path: '/module',
      query: to.query,
      params: to.params
    }
    next(newTo)
    return
  }
  next()
})

function handleSelect(index, params) {
  if (index === curPage.value) {
    return
  }
  curPage.value = index
  router.push({
    name: pageOpts[index],
    query: Object.assign({}, route.query),
    params: { module: params.module }
  })
}
function logout() {
  loginApi.logout()
  ElMessage.success('退出登录')
  router.push({ name: 'login' })
}
onUnmounted(() => {
  listener.destroy()
  nextTick(() => location.reload())
})

</script>

<style scoped>
.ns-workspace {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.ns-header {
  border-bottom: solid 1px #e6e6e6;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.ns-body {
  height: 100%;
  width: 100%;
  display: flex;
  overflow: hidden;
}

.el-menu.el-menu--horizontal {
  border-bottom: none;
}

.ns-trmkt-wrapper {
  display: flex;
  width: 100%;
}

.ns-tools {
  align-items: center;
  line-height: 60px;
  padding-right: 10px;
}

/* 桌面端样式 */
@media screen and (min-width: 661px) {}

/* 移动端样式 */
@media screen and (max-width: 660px) {

  .ns-tools button,
  .ns-menu li:nth-child(1),
  .ns-menu li:nth-child(2),
  .ns-menu li:nth-child(5) {
    display: none;
  }
}
</style>
