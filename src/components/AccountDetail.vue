<template>
  <div ref="accountDetailWrapper" class="ns-account-detail">
    <el-tabs v-model="curTab" :stretch="true">
      <el-tab-pane label="持仓" name="position" :style="{ overflow: 'auto' }"><el-table :data="allPositions"
          :height="tableContentHeight" highlight-current-row @row-click="choosePosition">
          <el-table-column prop="contract.name" label="合约名称" align="center" width="100px">
          </el-table-column>
          <el-table-column label="方向" width="50px" align="center">
            <template v-slot:default="scope">
              <span :class="{ 2: 'color-red', 3: 'color-green' }[scope.row.positiondirection]">{{
                ['未知', '净', '多', '空'][scope.row.positiondirection]
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="position" label="总仓" width="50px" align="center">
          </el-table-column>
          <el-table-column label="可用" width="50px" align="center">
            <template v-slot:default="scope">
              {{ scope.row.position - scope.row.frozen }}
            </template>
          </el-table-column>
          <el-table-column prop="openprice" label="开仓均价" align="center">
            <template v-slot:default="scope">
              {{ scope.row.openprice.toFixed(scope.row.contract.priceprecision) }}
            </template>
          </el-table-column>
          <el-table-column prop="positionprofit" label="持仓盈亏" align="center">
            <template v-slot:default="scope">
              <span :class="scope.row.positionprofit > 0
                ? 'color-red'
                : scope.row.positionprofit < 0
                  ? 'color-green'
                  : ''
                ">{{ parseInt(scope.row.positionprofit) }}</span>
            </template>
          </el-table-column>
        </el-table></el-tab-pane>
      <el-tab-pane label="挂单" name="activeOrder"><el-table :data="pendingOrders" style="width: 100%"
          :height="tableContentHeight">
          <el-table-column prop="contract.name" label="合约名称" align="center" width="100px">
          </el-table-column>
          <el-table-column prop="dirOpenClose" label="开平" width="50px" align="center">
            <template v-slot:default="scope">
              {{
                `${{ 1: '多', 2: '空' }[scope.row.direction] || ''}${scope.row.offsetflag === 1 ? '开' : '平'
                }`
              }}
            </template>
          </el-table-column>
          <el-table-column prop="price" label="委托价" align="center">
            <template v-slot:default="scope">
              {{ scope.row.price.toFixed(scope.row.contract.priceprecision) }}
            </template>
          </el-table-column>
          <el-table-column prop="totalvolume" label="委托量" width="60px" align="center">
          </el-table-column>
          <el-table-column prop="orderVolPending" label="挂单量" align="center" width="60px">
            <template v-slot:default="scope">{{
              scope.row.totalvolume - scope.row.tradedvolume
            }}</template>
          </el-table-column>
          <el-table-column label="撤单" align="center" width="65px">
            <template v-slot:default="scope">
              <el-popconfirm title="确定撤单吗？" @confirm="cancelOrder(scope.row)">
                <el-button class="compact" slot="reference" size="small" icon="el-icon-delete">
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column> </el-table></el-tab-pane>
      <el-tab-pane label="委托" name="order"><el-table :data="allOrders" style="width: 100%" :height="tableContentHeight">
          <el-table-column prop="contract.name" label="合约名称" align="center" width="100px">
          </el-table-column>
          <el-table-column prop="statusmsg" label="状态" width="60px" align="center">
            <template v-slot:default="scope">{{
              { 1: '全成', 6: '已撤单', 9: '废单' }[scope.row.orderstatus] || '待成交'
            }}</template>
          </el-table-column>
          <el-table-column prop="dirOpenClose" label="开平" width="50px" align="center">
            <template v-slot:default="scope">
              {{
                `${{ 1: '多', 2: '空' }[scope.row.direction]}${scope.row.offsetflag === 1 ? '开' : '平'
                }`
              }}
            </template>
          </el-table-column>
          <el-table-column prop="price" label="委托价" align="center">
            <template v-slot:default="scope">
              {{ scope.row.price.toFixed(scope.row.contract.priceprecision) }}
            </template>
          </el-table-column>
          <el-table-column prop="totalvolume" label="委托量" width="50px" align="center">
          </el-table-column>
          <el-table-column prop="tradedvolume" label="已成交" width="50px" align="center">
          </el-table-column>
          <el-table-column prop="cancelVol" label="已撤单" width="50px" align="center">
            <template v-slot:default="scope">{{
              scope.row.orderstatus === 6 ? scope.row.totalvolume - scope.row.tradedvolume : 0
            }}</template>
          </el-table-column>
          <el-table-column prop="ordertime" label="委托时间" align="center">
          </el-table-column> </el-table></el-tab-pane>
      <el-tab-pane label="成交" name="transaction"><el-table :data="allTransactions" style="width: 100%" align="center"
          :height="tableContentHeight">
          <el-table-column prop="contract.name" label="合约名称" align="center" width="100px">
          </el-table-column>
          <el-table-column label="开平" align="center" width="50px">
            <template v-slot:default="scope">
              {{
                `${{ 1: '多', 2: '空' }[scope.row.direction]}${scope.row.offsetflag === 1 ? '开' : '平'
                }`
              }}
            </template>
          </el-table-column>
          <el-table-column prop="price" label="成交价" align="center">
            <template v-slot:default="scope">
              {{ scope.row.price.toFixed(scope.row.contract.priceprecision) }}
            </template>
          </el-table-column>
          <el-table-column prop="volume" label="成交量" align="center" width="50px">
          </el-table-column>
          <el-table-column prop="tradetime" label="成交时间" align="center">
          </el-table-column> </el-table></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
  tableContentHeight: {
    type: Number,
    default: 100
  },
  positionDescription: {
    type: Object,
    default: () => { }
  },
  orderDescription: {
    type: Object,
    default: () => { }
  },
  transactionDescription: {
    type: Object,
    default: () => { }
  }
})
let curTab = ref('position')
const emit = defineEmits(['chosenPosition', 'cancelOrder'])
function choosePosition(row) {
  emit('chosenPosition', row)
}
function cancelOrder(order) {
  emit('cancelOrder', order)
}




let pendingOrders = computed(() => {
  return allOrders.value.filter(
    (i) => i.orderstatus !== 6 && i.orderstatus !== 9 && i.orderstatus !== 1
  )
})
let allOrders = computed(() => {
  return Object.values(props.orderDescription).sort(
    (a, b) => parseInt(a.brokerorderseq) - parseInt(b.brokerorderseq)
  )
})
let allPositions = computed(() => {
  return Object.values(props.positionDescription).filter((i) => i.position > 0)
})
let allTransactions = computed(() => {
  return Object.values(props.transactionDescription).sort(
    (a, b) => a.tradetimestamp - b.tradetimestamp
  )
})



</script>

<style scoped>
.ns-account-detail {
  height: 100%;
  min-height: 300px;
  margin: 0 20px;
  overflow: hidden;
}
</style>
