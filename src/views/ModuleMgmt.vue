<template>
  <div class="ns-page">
    <ModuleForm v-model:visible="moduleFormVisible"
      :readOnly="curTableIndex > -1 && curModule.runtime && curModule.runtime.enabled"
      :module="curModule ? JSON.parse(JSON.stringify(curModule)) : null" @onSave="saveModule"
      @copyModule="handleModuleCopy" />
    <ModuleRuntime v-model:visible="ModuleRuntimeVisible" :module="curTableIndex > -1 ? curModule : {}"
      :moduleRuntimeSrc="curTableIndex > -1 ? curModule.runtime : {}" />
    <div class="mobile-header" v-if="isMobile">
      <el-input placeholder="可按模组名称筛选" prefix-icon="el-icon-search" v-model="query" clearable>
      </el-input>
      <el-button icon="el-icon-plus" title="新建模组" size="small" @click.native="handleCreate"></el-button>
    </div>
    <div v-if="isMobile" class="card-wrapper">
      <el-card class="box-card" v-for="(item, i) in filterModuleList" :key="i">
        <el-descriptions :title="item.moduleName" :column="2" border>
          <el-descriptions-item label="持仓状态">
            <el-tag size="small">{{
              !item.runtime ? '-' :
                {
                  HOLDING_LONG: '持多单',
                  HOLDING_SHORT: '持空单',
                  EMPTY: '无持仓',
                  EMPTY_HEDGE: '对冲锁仓',
                  HOLDING_HEDGE: '对冲持仓',
                  PENDING_ORDER: '等待成交'
                }[item.runtime.moduleState] || '-'
            }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="当前状态">
            <span :class="!item.runtime ? '' : item.runtime.enabled ? 'color-green' : 'color-red'">
              {{ !item.runtime ? '加载中' : item.runtime.enabled ? '运行中' : '已停用' }}
            </span>
          </el-descriptions-item>
          <el-descriptions-item label="模组周期">
            {{ `${item.numOfMinPerBar} 分钟` }}
          </el-descriptions-item>
          <el-descriptions-item label="交易策略">
            {{ item.strategySetting.componentMeta.name }}
          </el-descriptions-item>
          <el-descriptions-item label="绑定合约">
            {{
              (() => {
                return item.moduleAccountSettingsDescription
                  .map((item) => item.bindedContracts.map(item => item.name).join('，'))
                  .join('；')
              })()
            }}
          </el-descriptions-item>
        </el-descriptions>
        <div class="card-buttons">
          <el-button v-if="item.runtime && item.runtime.enabled" type="danger" @click.native="toggle(i, item)">停用
          </el-button>
          <el-button v-if="item.runtime && !item.runtime.enabled" type="success" @click.native="toggle(i, item)">
            启用
          </el-button>
          <el-button v-if="item.runtime" @click="handlePerf(i, item)">运行状态
          </el-button>
          <el-button v-if="item.runtime" size="small" @click="handleRow(i, item)">{{ item.runtime.enabled ? '查看' : '修改'
          }}</el-button>
          <el-popconfirm v-if="!item.runtime || !item.runtime.enabled" class="ml-10" title="确定移除吗？"
            @confirm="handleDelete(i, item)">
            <template v-slot:reference>
              <el-button size="small" type="danger"> 删除 </el-button>
            </template>
          </el-popconfirm>
        </div>
      </el-card>
    </div>
    <el-table v-else height="100%" :data="useModuleInfo.moduleList()">
      <el-table-column type="index" width="42px" />
      <el-table-column label="模组名称" prop="moduleName" sortable align="center" width="180px" />
      <el-table-column label="模组类型" prop="type" sortable align="center" width="100px">
        <template v-slot:default="scope">
          {{ { SPECULATION: '投机', ARBITRAGE: '套利' }[scope.row.type] }}
        </template>
      </el-table-column>
      <el-table-column label="模组用途" prop="usage" sortable align="center" width="100px">
        <template v-slot:default="scope">
          {{ { PLAYBACK: '回测', UAT: '模拟盘', PROD: '实盘' }[scope.row.usage] }}
        </template>
      </el-table-column>
      <el-table-column label="模组周期" prop="numOfMinPerBar" sortable align="center" width="100px">
        <template v-slot:default="scope">
          {{ `${scope.row.numOfMinPerBar} 分钟` }}
        </template>
      </el-table-column>
      <el-table-column label="交易策略" align="center" prop="strategySetting.componentMeta.name" sortable width="200px">
        <template v-slot:default="scope">
          {{ scope.row.strategySetting.componentMeta.name }}
        </template>
      </el-table-column>
      <el-table-column label="平仓优化" prop="closingPolicy" align="center" sortable width="100px">
        <template v-slot:default="scope">
          {{
            { FIRST_IN_FIRST_OUT: '先开先平', FIRST_IN_LAST_OUT: '平今优先', CLOSE_NONTODAY_HEGDE_TODAY: '平昨锁今' }[
            scope.row.closingPolicy
            ]
          }}
        </template>
      </el-table-column>
      <el-table-column label="绑定账户" sortable :sort-method="sortAccount" align="center" width="minmax(100px, 200px)"
        min-width="100px">
        <template v-slot:default="scope">
          {{
            scope.row.moduleAccountSettingsDescription
              .map((item) => item.accountGatewayId)
              .join('；')
          }}
        </template>
      </el-table-column>
      <el-table-column label="绑定合约" sortable align="center" width="minmax(100px, auto)" min-width="100px">
        <template v-slot:default="scope">
          <span class="text-selectable">
            {{
              (() => {
                return scope.row.moduleAccountSettingsDescription
                  .map((item) => item.bindedContracts.map(item => item.name).join('，'))
                  .join('；')
              })()
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="持仓状态" sortable align="center" width="100px">
        <template v-slot:default="scope">
          <el-tag size="small">{{
            !scope.row.runtime ? '-' :
              {
                HOLDING_LONG: '持多单',
                HOLDING_SHORT: '持空单',
                EMPTY: '无持仓',
                EMPTY_HEDGE: '对冲锁仓',
                HOLDING_HEDGE: '对冲持仓',
                PENDING_ORDER: '等待成交'
              }[scope.row.runtime.moduleState] || '-'
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="当前状态" prop="runtime.enabled" sortable align="center" width="100px">
        <template v-slot:default="scope">
          <span :class="!scope.row.runtime ? '' : scope.row.runtime.enabled ? 'color-green' : 'color-red'
            ">
            {{ !scope.row.runtime ? '加载中' : scope.row.runtime.enabled ? '运行中' : '已停用' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="400px">
        <template v-slot:header>
          <el-button id="createModule" size="small" type="primary" @click.native="handleCreate">新建</el-button>
          <el-popconfirm v-if="env === 'development'" class="ml-10" title="确定全部启用吗？" @confirm="enableAll">
            <template v-slot="reference">
              <el-button size="small" type="success">启用</el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm v-if="env === 'development'" class="ml-10" title="确定全部停用吗？" @confirm="disableAll">
            <template v-slot="reference">
              <el-button size="small" type="danger">停用</el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm v-if="env === 'development'" class="ml-10" title="确定全部重置吗？" @confirm="resetAll">
            <template v-slot="reference">
              <el-button size="small" type="primary">重置</el-button>
            </template>
          </el-popconfirm>
        </template>
        <template v-slot:default="scope">
          <el-button v-if="scope.row.runtime && scope.row.runtime.enabled" type="danger" size="small"
            @click.native="toggle(scope.$index, scope.row)">停用</el-button>
          <el-button v-if="scope.row.runtime && !scope.row.runtime.enabled" type="success" size="small"
            @click.native="toggle(scope.$index, scope.row)">
            启用
          </el-button>
          <el-button v-if="scope.row.runtime" size="small" @click="handlePerf(scope.$index, scope.row)">运行状态</el-button>
          <el-button size="small" @click="tailModuleLog(scope.row)">日志跟踪</el-button>
          <el-button v-if="scope.row.runtime" size="small" @click="handleRow(scope.$index, scope.row)">{{
            scope.row.runtime.enabled ? '查看' : '修改' }}</el-button>
          <el-button v-else size="small" @click="handleRow(scope.$index, scope.row)">修改</el-button>
          <el-popconfirm v-if="!scope.row.runtime || !scope.row.runtime.enabled" class="ml-10" title="确定移除吗？"
            @confirm="handleDelete(scope.$index, scope.row)">
            <template v-slot:reference>
              <el-button size="small" type="danger"> 删除 </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import ModuleForm from '@/components/ModuleForm'
import ModuleRuntime from '@/components/ModuleRuntime'
import moduleApi from '@/api/moduleApi'
import MediaListener from '@/utils/media-utils'
import { useModuleInfoStore } from '@/store/modules/moduleInfo'
import { computed, ref, onMounted, onUnmounted, inject } from 'vue'
import { ElLoading } from 'element-plus'

let moduleFormVisible = ref(false)
let ModuleRuntimeVisible = ref(false)
let curTableIndex = ref(-1)
let curModule = ref(null)
let timer = ref(-1)
let delayTimer = ref(-1)
let env = ref(process.env.NODE_ENV)
let lock = ref(false)
let isMobile = ref(false)
let query = ref('')

let listener = new MediaListener(() => { })
let filterModuleList = ref([])

let useModuleInfo = useModuleInfoStore()
const handleSelect = inject('handleSelect')

if (!useModuleInfo.moduleList.length) {
  moduleApi.getAllModules().then(modules => {
    useModuleInfo.updateList(modules.sort((a, b) => a.moduleName.localeCompare(b.moduleName)))
  })
}

computed(() => {
  if (!query.value) {
    return filterModuleList.value = useModuleInfo.moduleList
  }
  return useModuleInfo.moduleList.filter(item => item.moduleName.indexOf(query.value) !== -1)
})

onMounted(() => {
  autoRefreshList()
  const resizeHandler = () => {
    isMobile.value = listener.isMobile()
  }
  listener = new MediaListener(resizeHandler)
  resizeHandler()
})

function handleCreate() {
  moduleFormVisible.value = true
  curTableIndex.value = -1
  curModule.value = null
}
async function handlePerf(index, row) {
  curTableIndex.value = index
  curModule.value = row
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.6)'
  });
  try {
    curModule.value.runtime = await moduleApi.getModuleRuntime(row.moduleName)
  } finally {
    loading.close()
  }
  ModuleRuntimeVisible.value = true
}
function handleRow(index, row) {
  curTableIndex.value = index
  curModule.value = row
  moduleFormVisible.value = true
}
async function handleDelete(index, row) {
  await moduleApi.removeModule(row.moduleName)
  useModuleInfo.updateList(useModuleInfo.moduleList.filter((item) => item.moduleName !== row.moduleName))

  // 移除模组时，要把模组图表的指标设置从localStorage移除
  localStorage.removeItem(`autoUpdate_${row.moduleName}`)
  localStorage.removeItem(`chartSymbol_${row.moduleName}`)
}
async function autoRefreshList() {
  moduleApi.getAllModules().then(modules => {
    lock.value = false
    if (modules.length > 0) {
      const statusPromises = modules.map(m => moduleApi.getModuleStatus(m.moduleName))
      const statePromises = modules.map(m => moduleApi.getModuleState(m.moduleName))

      Promise.all([...statusPromises, ...statePromises]).then(results => {
        const statuses = results.slice(0, modules.length);
        const states = results.slice(modules.length);

        // 将对应的状态和状态组合在一起
        const combinedResults = modules.map((module, index) => ({
          ...module,
          runtime: statuses[index] !== null ? {
            moduleState: states[index],
            enabled: statuses[index]
          } : null,
        }));
        if (!lock.value) {
          updateModuleList(combinedResults)
        }
      });
    }
  })
  timer.value = setTimeout(autoRefreshList, 30000)   // 每30秒刷新一次
}
function updateModuleList(modules) {
  useModuleInfo.updateList([])
  useModuleInfo.updateList(modules.sort((a, b) => a.moduleName.localeCompare(b.moduleName)))
}
async function saveModule(module) {
  const rt = await moduleApi.getModuleRuntime(module.moduleName)
  module.runtime = rt
  if (curTableIndex.value < 0) {

    const index = useModuleInfo.moduleList.findIndex((obj) => obj.moduleName === module.moduleName)
    if (index < 0) {
      useModuleInfo.moduleList.push(module)
    } else {
      useModuleInfo.moduleList[index] = module
    }
  } else {
    useModuleInfo.moduleList[curTableIndex.value] = module
  }
  useModuleInfo.updateList([...useModuleInfo.moduleList])
}
function handleModuleCopy() {
  curTableIndex.value = -1
  curModule.value = null
}
function resetAll() {
  useModuleInfo.moduleList.forEach(module => {
    moduleApi.updateModule(module, true)
  })
  clearTimeout(timer.value)
  setTimeout(autoRefreshList, 1000)
}
function enableAll() {
  useModuleInfo.moduleList.forEach((module) => {
    if (module.runtime && !module.runtime.enabled) {
      moduleApi.toggleModuleState(module.moduleName)
      module.runtime.enabled = true
    }
  })
}
function disableAll() {
  useModuleInfo.moduleList.forEach((module) => {
    if (module.runtime && module.runtime.enabled) {
      moduleApi.toggleModuleState(module.moduleName)
      module.runtime.enabled = false
    }
  })
}
async function toggle(index, row) {
  lock.value = true
  clearTimeout(timer.value)
  clearTimeout(delayTimer.value)
  row.runtime.enabled = !row.runtime.enabled
  await moduleApi.toggleModuleState(row.moduleName)
  delayTimer.value = setTimeout(autoRefreshList, 1000)
}
function tailModuleLog(row) {
  handleSelect('9', { module: row.moduleName })
}

function sortAccount(a, b) {
  const ra = a.moduleAccountSettingsDescription.map((item) => item.accountGatewayId).join('；')
  const rb = b.moduleAccountSettingsDescription.map((item) => item.accountGatewayId).join('；')
  return ra.localeCompare(rb)
}

onUnmounted(() => {
  listener.destroy()
  clearTimeout(timer.value)
})

</script>

<style>
/* 桌面端样式 */
@media screen and (min-width: 661px) {
  #moduleCards {
    display: none;
  }
}

/* 移动端样式 */
@media screen and (max-width: 660px) {
  .ns-page {
    display: flex;
    flex-direction: column;
  }

  #moduleTable {
    display: none;
  }

  .card-wrapper {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow: auto;
  }

  .box-card {
    width: 100%;
    margin-bottom: 20px;
    max-height: 200px;
  }

  .card-buttons {
    margin: 10px 0px;
    display: flex;
    justify-content: flex-end;
  }

  .el-card__header {
    padding: 12px 20px;
  }

  .el-card__body {
    padding: 16px 16px 10px 16px;
  }

  .el-descriptions__header {
    padding-bottom: 10px;
  }

  .mobile-header {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
  }

  .mobile-header div:first-child {
    margin-right: 40px;
  }

  td {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;
  }
}
</style>
