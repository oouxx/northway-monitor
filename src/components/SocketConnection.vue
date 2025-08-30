<template>
  <div />
</template>

<script setup>
import protoUtils from '@/utils/proto2js/index.js'
import io from 'socket.io-client'
import { ref, watch, onMounted, reactive, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useAccountStore, useMarketCurrentDataStore, useContractStore, useModuleInfoStore } from '@/store'
import { ElMessage } from 'element-plus'
const useAccount = useAccountStore()
const useMarketCurrentData = useMarketCurrentDataStore()
const useContract = useContractStore()
const useModuleInfo = useModuleInfoStore()
const route = useRoute()
const TYPE = {
  0: 'success',
  1: 'info',
  2: 'warning',
  3: 'error'
}

let socket = ref(null)
let wsHost = ref('')
let wsPort = ref(51688)

const props = defineProps({
  username: {
    type: String,
    default: 'admin'
  },
  password: {
    type: String,
    default: '123456'
  }
})
watch(() => { useMarketCurrentData.curRoomId }, (val, oldVal) => {
  if (oldVal) {
    socket.value.emit('logout', oldVal)
  }
  if (val) {
    socket.value.emit('login', val)
  }
}, { deep: true })

function initSocket() {
  const wsProtocal = process.env.NODE_ENV === 'development' ? 'ws' : 'wss'
  const wsEndpoint = `${wsProtocal}://${wsHost.value}:${wsPort.value}`
  const token = route.query.auth || window.btoa(`${props.username}:${props.password}`)
  console.log('准备连接websocket：' + wsEndpoint, ' token:' + token)
  socket = io(wsEndpoint, {
    transports: ['websocket'],
    query: { auth: token },
    rejectUnauthorized: false
  })
  socket.on('TICK', (data) => {
    nextTick(async () => {
      let tick = await protoUtils.decodeProtoField(data, 'TickField')
      useMarketCurrentData.updateTick(tick)
    })
  })
  socket.on('BAR', (data) => {
    nextTick(async () => {
      let bar = await protoUtils.decodeProtoField(data, 'BarField')
      useMarketCurrentData.updateBar(bar)
    })
  })
  socket.on('ACCOUNT', (data) => {
    nextTick(async () => {
      let account = await protoUtils.decodeProtoField(data, 'AccountField')
      useAccount.updateAccount(account)
    })
  })
  socket.on('POSITION', (data) => {
    nextTick(async () => {
      let position = await protoUtils.decodeProtoField(data, 'PositionField')
      useAccount.updatePosition(position)
    })
  })
  socket.on('TRADE', async (data) => {
    let trade = await protoUtils.decodeProtoField(data, 'TradeField')
    useAccount.updateTrade(trade)
  })
  socket.on('ORDER', async (data) => {
    let order = await protoUtils.decodeProtoField(data, 'OrderField')
    useAccount.updateOrder(order)
  })
  socket.on('CONTRACT', async (data) => {
    let contract = await protoUtils.decodeProtoField(data, 'ContractField')
    useContract.updateContract(contract)
  })
  socket.on('NOTICE', async (data) => {
    let notice = await protoUtils.decodeProtoField(data, 'NoticeField')
    ElMessage[TYPE[notice.status]](notice.content)
  })
  socket.on('error', (e) => {
    console.log('SocketIO连接异常', e)
    ElMessage.error('服务端连接异常')
  })
  socket.on('connect_error', (e) => {
    console.log('SocketIO连接失败', e)
    ElMessage.error('服务端连接失败')
  })
  socket.on('connect', () => {
    console.log('SocketIO连接成功')
    ElMessage.success('服务端连接成功')
  })
}
onMounted(() => {
  wsHost.value = window.remoteHost || location.hostname
  wsHost.value = wsHost.value.split(":")[0]
  wsPort.value = window.socketioPort || localStorage.getItem('socketioPort') || 51688
  initSocket()
})

</script>

<style></style>
