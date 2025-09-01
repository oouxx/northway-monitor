<template>
  <div class="ns-page">
    <div ref="tradeWrap" class="ns-trade">
      <div class="ns-trade__account-profile">
        <el-select class="ns-trade__account" v-model="chosenAccount" placeholder="选择账户" @change="handleAccountChange">
          <el-option v-for="(item, index) in accountOptions" :key="index" :label="item.gatewayId" :value="item">
          </el-option>
        </el-select>
        <div class="ns-trade__account-description">
          权益：{{ accountingFormatter(parseInt(accountBalance)) }}
        </div>
        <div class="ns-trade__account-description">
          可用：{{ accountingFormatter(parseInt(accountAvailable)) }}
        </div>
        <div class="ns-trade__account-description">
          使用率：{{
            accountBalance
              ? (((accountBalance - accountAvailable) * 100) / accountBalance).toFixed(1)
              : 0
          }}
          %
        </div>
      </div>
      <div class="ns-trade__trade-section">
        <div class="ns-trade-action">
          <div class="ns-trade-action__item">
            <el-select id="contractSelector" v-model="contract" filterable remote :remote-method="searchContracts"
              placeholder="合约可搜索，空格搜索全部" @change="handleContractChange">
              <el-option v-for="(item, i) in symbolList" :key="i" :label="item.name" :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="ns-trade-action__item">
            <div class="ns-trade-action__complex-item">
              <div class="ns-trade-action__complex-item-label">数量：</div>
              <el-input-number v-model="dealVol" :min="1" controls-position="right"></el-input-number>
            </div>
          </div>
          <div class="ns-trade-action__item">
            <el-select id="priceType" v-model="dealPriceType" filterable placeholder="价格类型"
              @change="handleDealPriceTypeChange">
              <el-option v-for="item in priceOptionList" :key="item.type" :label="item.label" :value="item.type">
              </el-option>
            </el-select>
          </div>
          <div class="ns-trade-action__item">
            <el-input id="limitPrice" v-model="limitPrice" placeholder="委托价" :disabled="dealPriceType !== 'LIMIT_PRICE'"
              type="number"></el-input>
          </div>
          <div class="ns-trade-action__item">
            <el-input v-model="stopPrice" placeholder="止损价" type="number"></el-input>
          </div>
        </div>
        <div class="ns-trade-info">
          <NsPriceBoard :tick="useMarketCurrentData.curTick" :precision="precision" />
        </div>
      </div>
      <div class="ns-trade__trade-btn-wrap">
        <div class="ns-trade-button">
          <NsButton :price="bkPrice || 0" :color="'rgba(196, 68, 66, 1)'" :label="'买开'" @click="buyOpen" />
        </div>
        <div class="ns-trade-button">
          <NsButton :price="skPrice || 0" :color="'rgba(64, 158, 95, 1)'" :label="'卖开'" @click="sellOpen" />
        </div>
        <div class="ns-trade-button">
          <!-- 优先平今 -->
          <NsButton :price="closePrice || 0" :reverseColor="true" :label="'平仓'" @click="closePosition" />
        </div>
      </div>
      <NsAccountDetail :tableContentHeight="flexibleTblHeight" :positionDescription="useAccount.curInfo.positions"
        :orderDescription="useAccount.curInfo.orders" :transactionDescription="useAccount.curInfo.transactions"
        @chosenPosition="onPositionChosen" @cancelOrder="onCancelOrder" />
    </div>
    <div class="ns-trade__md-wrapper">
      <NsMarketData :marketGatewayId="marketDataGatewayId" :contractUnifiedSymbol="marketDataUnifiedSymbol"
        :precision="precision" embededMode />
    </div>
  </div>
</template>

<script setup>
import NsButton from '@/components/TradeButton'
import NsPriceBoard from '@/components/PriceBoard'
import NsAccountDetail from '@/components/AccountDetail'
import NsMarketData from '@/components/MarketData'
import gatewayMgmtApi from '@/api/gatewayMgmtApi'
import contractApi from '@/api/contractApi'
import tradeOprApi from '@/api/tradeOprApi'
import NumberFilter from '@/filter/number-filter'
import { useContractStore, useAccountStore, useMarketCurrentDataStore } from '@/store'
import { ref, reactive, watch, onMounted, computed, onUnmounted } from 'vue'
import numberFilter from '../filter/number-filter'
import { ElMessage } from 'element-plus'
import { ElSubMenu } from 'element-plus'
let accountCheckTimer
let accountingFormatter = numberFilter.accountingFormatter

let useContract = useContractStore()
let useAccount = useAccountStore()
let useMarketCurrentData = useMarketCurrentDataStore()
let accountOptions = ref([])
let symbolList = ref([])
let priceOptionList = reactive([
  {
    label: '对手价',
    type: 'OPP_PRICE'
  },
  {
    label: '排队价',
    type: 'WAITING_PRICE'
  },
  {
    label: '市价',
    type: 'ANY_PRICE'
  },
  {
    label: '限价',
    type: 'LIMIT_PRICE'
  }
])
let contract = ref('')
let dealContractId = ref('')
let dealVol = ref(1)
let dealPrice = ref('')
let limitPrice = ref('')
let stopPrice = ref('')
let dealPriceType = ref('')
let curTab = ref('position')
let symbolIndexMap = ref({})
let chosenAccount = ref('')
let currentPosition = ref('')
let elementHeight = ref(0)
watch(contract, (v) => {
  if (v && v.value) {
    dealContractId.value = v.value
  }
})

function handleAccountChange() {
  dealContractId.value = ''
  if (!chosenAccount.value) {
    return
  }
  clearTimeout(accountCheckTimer)
  const timelyCheck = () => {
    if (!useAccount.isAccountConnected(chosenAccount.value.gatewayId)) {
      ElMessage.warning(
        `账户【${chosenAccount.value.gatewayId}】超时没有反馈，可能账户未连线或者处于停盘时间`
      )
    }
    accountCheckTimer = setTimeout(timelyCheck, 6000)
  }
  timelyCheck()
  useMarketCurrentData.updateFocusMarketGatewayId(chosenAccount.value.bindedMktGatewayId)
  useAccount.updateCurAccountId(chosenAccount.value.gatewayId)
}
function handleContractChange() {
  dealPriceType.value = 'OPP_PRICE'
  useMarketCurrentData.updateFocusUnifiedSymbol(contract.value.unifiedSymbol)
}
function searchContracts(query) {
  if (chosenAccount.value.gatewayId) {
    contractApi.getSubscribedContracts(chosenAccount.value.gatewayId, query).then(result => {
      symbolList.value = result
    })
  } else {
    ElMessage.warning('请先选择账户')
  }
}
function handleDealPriceTypeChange() {
  if (dealPriceType.value !== 'LIMIT_PRICE') {
    limitPrice.value = ''
  }
}
function onPositionChosen(pos) {
  dealVol.value = pos.position - pos.frozen
  const contractLocal = { value: pos.contract.contractid, unifiedSymbol: pos.contract.unifiedsymbol, name: pos.contract.name, precision: pos.contract.priceprecision }
  symbolList.value = [contractLocal]
  contract.value = contractLocal
  contractApi.getSubscribedContracts(chosenAccount.value.gatewayId, pos.contract.unifiedsymbol).then(result => {
    if (!result.length) {
      ElMessage.warning(`注意，合约 [${pos.contract.name}] 未被订阅，将获取不到行情数据`)
    }
  })
  currentPosition.value = pos
  handleContractChange()
}
function onCancelOrder(order) {
  tradeOprApi.cancelOrder(chosenAccount.value.gatewayId, order.originorderid)
}
function buyOpen() {
  if (stopPrice.value && stopPrice.value >= bkPrice.value) {
    throw new Error('多开止损价需要少于开仓价')
  }
  return tradeOprApi.buyOpen(
    chosenAccount.value.gatewayId,
    dealContractId.value,
    bkPrice.value,
    dealVol.value,
    stopPrice.value,
    dealPriceType.value
  )
}
function sellOpen() {
  if (stopPrice.value && stopPrice.value <= skPrice.value) {
    throw new Error('空开止损价需要大于开仓价')
  }
  return tradeOprApi.sellOpen(
    chosenAccount.value.gatewayId,
    dealContractId.value,
    bkPrice.value,
    dealVol.value,
    stopPrice.value,
    dealPriceType.value
  )
}
function closePosition() {
  if (currentPosition.value.positiondirection === 2) {
    return tradeOprApi.closeLongPosition(
      chosenAccount.value.gatewayId,
      dealContractId.value,
      closePrice.value,
      dealVol.value,
      dealPriceType.value
    )
  }
  if (currentPosition.value.positiondirection === 3) {
    return tradeOprApi.closeShortPosition(
      chosenAccount.value.gatewayId,
      dealContractId.value,
      closePrice.value,
      dealVol.value,
      dealPriceType.value
    )
  }
  throw new Error('没有持仓')
}
onUnmounted(() => {
  clearTimeout(accountCheckTimer)
  useAccount.resetAccountModule()
  useMarketCurrentData.resetMarketCurrentDataModule()
})


let tradeWrap = ref({})
window.addEventListener('resize', () => {
  if (tradeWrap.value) {
    elementHeight.value = tradeWrap.value.clientHeight
  }
})

onMounted(async () => {
  elementHeight.value = tradeWrap.value.clientHeight
  accountOptions.value = await gatewayMgmtApi.findAll('TRADE')
  accountOptions.value = accountOptions.value.map((item) => {
    item.value = item.gatewayId
    return item
  })
})
let flexibleTblHeight = computed(() => {
  return elementHeight.value - 420
})
let marketDataGatewayId = computed(() => {
  return chosenAccount.value.bindedMktGatewayId
})
let marketDataUnifiedSymbol = computed(() => {
  return contract.value.unifiedSymbol
})
let accountInfo = computed(() => {
  return useAccount.curInfo.account
})
let accountBalance = computed(() => {
  if (accountInfo.value.balance) return accountInfo.value.balance
  return 0
})
let accountAvailable = computed(() => {
  if (accountInfo.value.available) return accountInfo.value.available
  return 0
})
let precision = computed(() => {
  if (contract.value) {
    return contract.value.precision
  }
  return 0
})
let bkPrice = computed(() => {
  const price = {
    OPP_PRICE: useMarketCurrentData.curTick.askpriceList[0],
    WAITING_PRICE: useMarketCurrentData.curTick.bidpriceList[0],
    ANY_PRICE: useMarketCurrentData.curTick.upperlimit || 0,
    LIMIT_PRICE: limitPrice.value
  }[dealPriceType.value]

  // 如果是数字，做精度处理
  if (typeof price === "number" && !isNaN(price)) {
    return Number(price.toFixed(precision.value));
  }

  return price ?? 0; // 保证不会返回 undefined
})
let skPrice = computed(() => {
  const price = {
    OPP_PRICE: useMarketCurrentData.curTick.bidpriceList[0],
    WAITING_PRICE: useMarketCurrentData.curTick.askpriceList[0],
    ANY_PRICE: useMarketCurrentData.curTick.lowerlimit || 0,
    LIMIT_PRICE: limitPrice.value
  }[dealPriceType.value]
  // 如果是数字，做精度处理
  if (typeof price === "number" && !isNaN(price)) {
    return Number(price.toFixed(precision.value));
  }

  return price ?? 0; // 保证不会返回 undefined
})
let closePrice = computed(() => {
  if (currentPosition.value && currentPosition.value.positiondirection === 2) {
    return skPrice.value
  }
  if (currentPosition.value && currentPosition.value.positiondirection === 3) {
    return bkPrice.value
  }
  return 0
})


</script>

<style scoped>
.ns-trade-wrapper {
  display: flex;
}

.ns-trade {
  width: 100%;
  margin: auto;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  background-color: rgba(67, 74, 80, 1);
}

.ns-trade__account {
  width: 100%;
  margin-left: 20px;
}

.ns-trade__account-profile {
  display: flex;
  width: 100%;
  grid-template-columns: 1fr repeat(3, 1fr);
  padding: 10px 0;
  line-height: 32px;
  background-color: rgba(20, 20, 20, 0.4);
}

.ns-trade__account-description {
  width: 100%;
  text-align: center;
  font-size: 10px;
}

.ns-trade__trade-btn-wrap {
  display: flex;
}

.ns-trade__trade-section {
  height: 100%;
  max-height: 236px;
  display: flex;
  padding: 0 20px;
}

.ns-trade-action__item {
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.ns-trade-action__item-label {
  width: 100%;
}

.ns-trade-action__item-content {
  width: 100%;
}

.ns-trade-action {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
}

.ns-trade-info {
  width: 100%;
  padding: 10px 0px;
  padding-left: 20px;
  min-height: 200px;
}

.ns-account-table {
  text-align: center;
}

.el-tabs__item {
  padding: 0;
}

.el-table th>.cell {
  padding: 0;
}

.ns-trade__md-wrapper {
  width: 100%;
  height: 100%;
}

.ns-trade-action__complex-item {
  display: flex;
}

.ns-trade-action__complex-item-label {
  width: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.ns-trade-button {
  width: 100%;
  height: 100%;
  padding: 0 20px;
}

/* 桌面端样式 */
@media screen and (min-width: 661px) {
  .ns-trade {
    max-width: 450px;
  }
}

/* 移动端样式 */
@media screen and (max-width: 660px) {
  .ns-trade__md-wrapper {
    display: none;
  }

  .ns-page {
    padding: 0;
  }

  .ns-trade {
    width: 100%;
    margin: auto;
    height: 100%;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    background-color: rgba(67, 74, 80, 1);
  }

  .ns-trade-button {
    padding: 0 10px;
  }

  .ns-trade__trade-btn-wrap {
    margin: 0 10px;
  }

  .ns-trade-action__item {
    max-width: 40vw;
  }
}
</style>
