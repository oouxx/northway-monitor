<template>
  <div class="ns-page">
    <NsGatewayForm v-model:visible="dialogFormVisible" :gatewayDescription="curGatewayDescription"
      :gatewayUsage="gatewayUsage" :isUpdateMode="curTableIndex > -1" :readOnly="isReadOnly" @onSave="handleSave" />
    <NsSimBalanceForm v-model:visible="simBalanceFormVisible" :simGatewayId="curGatewayDescription.gatewayId" />
    <el-table :data="tableData.filter(
      (data) => !search || data.name.toLowerCase().includes(search.toLowerCase())
    )
      " height="100%">
      <el-table-column :label="`${typeLabel}ID`" prop="gatewayId" width="200px" header-align="center" align="center">
      </el-table-column>
      <el-table-column :label="`${typeLabel}类型`" prop="channelType" width="90px" header-align="center" align="center">
      </el-table-column>
      <el-table-column label="连接状态" prop="connectionState" width="80px" header-align="center" align="center">
        <template v-slot:default="scope">
          <span :class="scope.row.connectionState === 'CONNECTED'
            ? 'color-green'
            : scope.row.connectionState === 'DISCONNECTED'
              ? 'color-red'
              : ''
            ">{{
              {
                CONNECTING: '连接中',
                CONNECTED: '已连接',
                DISCONNECTING: '断开中',
                DISCONNECTED: '已断开'
              }[scope.row.connectionState]
            }}</span>
        </template>
      </el-table-column>
      <el-table-column label="自动连接" prop="autoConnect" width="80px" header-align="center" align="center">
        <template v-slot:default="scope">
          {{ scope.row.autoConnect ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column v-if="gatewayUsage !== 'TRADE'" label="行情反馈" width="150px" header-align="center" align="center">
        <template v-slot:default="scope">
          {{ scope.row.isActive ? '活跃' : '-' }}
        </template>
      </el-table-column>
      <el-table-column v-if="gatewayUsage === 'TRADE'" label="关联网关" prop="bindedMktGatewayId" width="150px"
        header-align="center" align="center">
        <template v-slot:default="scope">
          {{ scope.row.bindedMktGatewayId }}
        </template>
      </el-table-column>
      <el-table-column :label="`${typeLabel}描述`" prop="description" header-align="center" align="center">
      </el-table-column>
      <el-table-column align="center" width="360px">
        <template v-slot:header>
          <el-button size="small" type="primary" @click="handleCreate">新建</el-button>
        </template>
        <template v-slot:default="scope">
          <el-button v-if="scope.row.connectionState === 'DISCONNECTED'" size="small" type="success"
            @click="connect(scope.row)">连线</el-button>
          <el-button v-if="scope.row.connectionState === 'CONNECTED'" size="small" type="danger"
            @click="disconnect(scope.row)">断开</el-button>
          <el-button size="small" v-if="
            gatewayUsage === 'TRADE' &&
            scope.row.connectionState === 'CONNECTED' &&
            scope.row.channelType === 'SIM'
          " @click="handleMoneyIO(scope.row)">出入金</el-button>
          <el-popconfirm v-if="
            gatewayUsage === 'MARKET_DATA' &&
            scope.row.connectionState === 'DISCONNECTED' &&
            scope.row.channelType === 'PLAYBACK'
          " class="ml-10 mr-10" title="确定要重新回放历史行情吗？" @confirm="handleReset(scope.row)">
            <el-button size="small" v-slot:reference type="warning"> 复位 </el-button>
          </el-popconfirm>
          <el-button v-if="scope.row.connectionState === 'DISCONNECTED'" size="small"
            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button v-if="scope.row.connectionState !== 'DISCONNECTED'" size="small"
            @click="handleView(scope.$index, scope.row)">查看</el-button>
          <el-popconfirm v-if="scope.row.connectionState === 'DISCONNECTED'" class="ml-10" title="确定移除吗？"
            @confirm="handleDelete(scope.$index, scope.row)">
            <el-button size="small" type="danger" slot="reference"
              :disabled="scope.row.connectionState !== 'DISCONNECTED'">删除</el-button></el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import NsGatewayForm from '@/components/GatewayForm'
import NsSimBalanceForm from '@/components/SimBalanceMgmt'
import gatewayMgmtApi from '../api/gatewayMgmtApi'
import { ref, onMounted, onBeforeUnmount, watch, computed, reactive, toRef } from 'vue'
let timer

const props = defineProps({
  gatewayUsage: {
    type: String,
    default: ''
  }

})
let dialogFormVisible = ref(false)
let simBalanceFormVisible = ref(false)
let isReadOnly = ref(false)
let curTableIndex = ref(-1)
let curGatewayDescription = ref({})
let tableData = ref([])
let search = ref('')

function timelyUpdate() {
  updateList().catch(() => clearTimeout(timer))
  timer = setTimeout(timelyUpdate, 5000)
}

async function updateList() {
  const data = await gatewayMgmtApi.findAll(props.gatewayUsage)
  if (props.gatewayUsage === 'MARKET_DATA') {
    const tableDataPromise = data.map(async (item) => {
      item.isActive = await gatewayMgmtApi.isActive(item.gatewayId)
      return item
    })
    tableData.value = await Promise.all(tableDataPromise)
  } else {
    tableData.value = data
  }
}
function handleCreate() {
  dialogFormVisible.value = true
  isReadOnly.value = false
  curTableIndex.value = -1
  curGatewayDescription.value = {}
}
function handleEdit(index, row) {
  curGatewayDescription.value = row
  dialogFormVisible.value = true
  curTableIndex.value = index
  isReadOnly.value = false
}
function handleView(index, row) {
  curTableIndex.value = index
  curGatewayDescription.value = row
  dialogFormVisible.value = true
  isReadOnly.value = true
}
async function handleDelete(index, row) {
  await gatewayMgmtApi.remove(row.gatewayId)
  updateList()
}
async function handleSave(obj) {
  if (curTableIndex.value > -1) {
    await gatewayMgmtApi.update(obj)
    updateList()
    return
  }
  await gatewayMgmtApi.create(obj)
  updateList()
}
async function connect(row) {
  await gatewayMgmtApi.connect(row.gatewayId)
  updateList()
}
async function disconnect(row) {
  await gatewayMgmtApi.disconnect(row.gatewayId)
  updateList()
}
function handleReset(row) {
  gatewayMgmtApi.resetPlayback(row.gatewayId)
}
function handleMoneyIO(row) {
  curGatewayDescription = row
  simBalanceFormVisible.value = true
}
onMounted(() => {
  console.log('GatewayManagement created. Usage:' + props.gatewayUsage)
  timelyUpdate()
})
onBeforeUnmount(() => {
  clearTimeout(timer)
})

watch(() => props.gatewayUsage, () => {
  //gatewayUsage
  tableData.value = []
  clearTimeout(timer)
  timelyUpdate()
})


let typeLabel = computed(() => {
  return props.gatewayUsage === 'TRADE' ? '账户' : '网关'
})

</script>

<style></style>
