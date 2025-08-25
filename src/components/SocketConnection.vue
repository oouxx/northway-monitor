<template>
  <div />
</template>

<script setup>
// import {

//   TickField,
//   BarField,
//   ContractField,
//   AccountField,
//   PositionField,
//   TradeField,
//   OrderField,
//   NoticeField
// } from '@/lib/xyz/redtorch/pb/core_field_pb'
import {
  decodeAccountField,
  decodeTickField,
  decodeBarField,
  decodeContractField,
  decodePositionField,
  decodeTradeField,
  decodeOrderField,
  decodeNoticeField
} from '@/lib/xyz/redtorch/pb/core_field_pb'
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
watch(() => { '$store.state.marketCurrentDataModule.curRoomId' }, (val, oldVal) => {
  if (oldVal) {
    socket.value.emit('logout', oldVal)
  }
  if (val) {
    socket.value.emit('login', val)
  }
})

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
    nextTick(() => {
      let tick = decodeTickField(data)
      useMarketCurrentData.updateTick(useMarketCurrentData.$state, tick)
    })
  })
  socket.on('BAR', (data) => {
    nextTick(() => {
      let bar = decodeBarField(data)
      useMarketCurrentData.updateBar(useMarketCurrentData.$state, bar)
    })
  })
  socket.on('ACCOUNT', (data) => {
    nextTick(() => {
      let account = decodeAccountField(data)
      useAccount.updateAccount(useAccount.$state, account)
    })
  })
  socket.on('POSITION', (data) => {
    nextTick(() => {
      let position = decodePositionField(data)
      useAccount.updatePosition(useAccount.$state, position)
    })
  })
  socket.on('TRADE', (data) => {
    let trade = decodeTradeField(data)
    useAccount.updateTrade(useAccount.$state, trade)
  })
  socket.on('ORDER', (data) => {
    let order = decodeOrderField(data)
    useAccount.updateOrder(useAccount.$state, order)
  })
  socket.on('CONTRACT', (data) => {
    let contract = decodeContractField(data)
    useContract.updateContract(useContract.$state, contract)
  })
  socket.on('NOTICE', (data) => {
    let notice = decodeNoticeField(data)
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
