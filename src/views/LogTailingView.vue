<template>
  <div class="ns-page flex-col">
    <div class="ns-page-header">
      <h1 v-if="mode === 'platform'">交易平台日志</h1>
      <h1 v-else>{{ moduleName }}模组日志</h1>
    </div>
    <div class="ns-page-action">
      <el-form inline label-width="70px">
        <el-form-item label="打印级别">
          <el-button-group class="mr-20">
            <el-button :type="logLevel === 'ERROR' ? 'primary' : ''" @click="logLevel = 'ERROR'">
              ERROR
            </el-button>
            <el-button :type="logLevel === 'WARN' ? 'primary' : ''" @click="logLevel = 'WARN'">
              WARN
            </el-button>
            <el-button :type="logLevel === 'INFO' ? 'primary' : ''" @click="logLevel = 'INFO'">
              INFO
            </el-button>
            <el-button :type="logLevel === 'DEBUG' ? 'primary' : ''" @click="logLevel = 'DEBUG'">
              DEBUG
            </el-button>
            <el-button :type="logLevel === 'TRACE' ? 'primary' : ''" @click="logLevel = 'TRACE'">
              TRACE
            </el-button>
          </el-button-group>
        </el-form-item>
        <el-form-item label="刷新频率">
          <el-button-group class="mr-20">
            <el-button :type="updateInterval === 1000 ? 'primary' : ''" @click="updateInterval = 1000">1秒</el-button>
            <el-button :type="updateInterval === 2000 ? 'primary' : ''" @click="updateInterval = 2000">2秒</el-button>
            <el-button :type="updateInterval === 5000 ? 'primary' : ''" @click="updateInterval = 5000">5秒</el-button>
          </el-button-group>
        </el-form-item>
        <el-form-item label="显示行数">
          <el-button-group class="mr-20">
            <el-button :type="numOfLinesInView === 100 ? 'primary' : ''"
              @click="numOfLinesInView = 100">100行</el-button>
            <el-button :type="numOfLinesInView === 200 ? 'primary' : ''"
              @click="numOfLinesInView = 200">200行</el-button>
            <el-button :type="numOfLinesInView === 500 ? 'primary' : ''"
              @click="numOfLinesInView = 500">500行</el-button>
          </el-button-group>
        </el-form-item>
        <el-form-item label="自动滚动">
          <el-switch v-model="autoScroll"></el-switch>
        </el-form-item>
      </el-form>
    </div>

    <div ref="logView" v-if="logContent.length" class="ns-page-body">
      <div v-for="(line, i) in logContent" :key="i">{{ line }}</div>
    </div>
    <div v-else class="ns-page-body-placeholder flex align-center" v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.3)">
      没有日志数据
    </div>
  </div>
</template>

<script setup>
import logApi from '@/api/logApi'
const LOG_UPDATE_INTERVAL = 'logUpdateInterval'
const LOG_NUM_OF_LINES_IN_VIEW = 'numOfLinesInView'
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'

let route = useRoute()

let mode = ref('platform')
let moduleName = ref('')
let logLevel = ref('')
let updateInterval = ref(1000)
let numOfLinesInView = ref(100)
let positionOffset = ref(0)
let logContent = ref([])
let timer = ref('')
let autoScroll = ref(true)
let lastInit = ref(0)
let loading = ref(true)
watch(updateInterval, (val) => {
  localStorage.setItem(LOG_UPDATE_INTERVAL, val)
})
watch(numOfLinesInView, (val) => {
  localStorage.setItem(LOG_NUM_OF_LINES_IN_VIEW, val)

})
watch(logLevel, (val) => {
  if (mode.value === 'platform') {
    logApi.setPlatformLogLevel(val)
  } else {
    logApi.setModuleLogLevel(moduleName.value, val)
  }
})
onMounted(() => {
  pageInit()
})
async function pageInit() {
  const time = new Date().getTime()
  if (time - lastInit.value < 1000) {
    return
  }
  lastInit.value = time
  updateInterval.value = parseInt(localStorage.getItem(LOG_UPDATE_INTERVAL) || 1000)
  numOfLinesInView.value = parseInt(localStorage.getItem(LOG_NUM_OF_LINES_IN_VIEW) || 500)
  const moduleNameLocal = route.params.module
  if (moduleNameLocal) {
    mode.value = 'module'
    moduleName.value = moduleNameLocal
    logLevel.value = await logApi.getModuleLogLevel(moduleNameLocal)
    tailModuleLog(moduleNameLocal)
  } else {
    mode.value = 'platform'
    logLevel.value = await logApi.getPlatformLogLevel()
    tailPlatformLog()
  }
}
function tailPlatformLog() {
  logApi.tailPlatformLog(positionOffset.value, numOfLinesInView.value).then((result) => {
    tailingLog(result)
    timer.value = setTimeout(tailPlatformLog, updateInterval.value)
  })
}
function tailModuleLog(moduleName) {
  logApi
    .tailModuleLog(moduleName, positionOffset.value, numOfLinesInView.value)
    .then((result) => {
      tailingLog(result)
      timer.value = setTimeout(() => {
        tailModuleLog(moduleName)
      }, updateInterval.value)
    })
}
let logView = ref({})
function tailingLog(logDescription) {
  positionOffset.value = logDescription.endPosition
  logContent.value = logContent.value.concat(logDescription.linesOfLog)
  if (logContent.value.length > numOfLinesInView.value) {
    logContent.value = logContent.value.filter(
      (item, i) => i >= logContent.value.length - numOfLinesInView.value
    )
  }
  loading.value = false
  if (autoScroll.value) {
    nextTick(() => {
      if (logView.value) {
        logView.value.scrollTop = logView.value.scrollHeight
      }
    })
  }
}
onUnmounted(() => {
  clearTimeout(timer.value)

})

</script>

<style>
.ns-page-header h1 {
  margin-top: 0;
}

.ns-page-body {
  overflow: auto;
  overflow-wrap: anywhere;
}

.ns-page-body-placeholder {
  height: 100%;
}
</style>
