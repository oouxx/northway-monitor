<template>
  <div class="ns-mktdata" v-loading.fullscreen.lock="fullscreenLoading" element-loading-background="rgba(0, 0, 0, 0.5)">
    <div class="flex-row mt-10">
      <el-form label-width="100px" :inline="true">
        <el-form-item label="网关列表">
          <el-select v-model="gateway" filterable :disabled="embededMode">
            <el-option v-for="gw in gatewayList" :label="gw" :value="gw" :key="gw"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合约列表">
          <el-select v-model="unifiedSymbol" filterable :disabled="embededMode">
            <el-option v-for="(c, i) in gwContractList" :label="c.name" :value="c.unifiedSymbol"
              :value-key="c.unifiedSymbol" :key="i"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行情延迟">
          <span v-if="latency < 60000">{{ latency }} 毫秒</span>
          <span v-else>（非实时行情）</span>
        </el-form-item>
      </el-form>
    </div>
    <div id="update-k-line" class="ns-mktdata__body">
      {{ !kLineChart ? '未有数据，请先选择合约' : '' }}
    </div>
  </div>
</template>

<script setup name="UpdateKLineChart">
import { dispose, init } from 'klinecharts'
import volumePure from '@/lib/indicator/volume-pure'
import gatewayDataApi from '@/api/gatewayDataApi'
import { useMarketCurrentDataStore } from '@/store'

import { decodeBarField } from '@/lib/xyz/redtorch/pb/core_field_pb'
import KLineUtils from '@/utils/kline-utils.js'
import { ref, reactive, computed, watch, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  marketGatewayId: {
    type: String,
    default: ''
  },
  contractUnifiedSymbol: {
    type: String,
    default: ''
  },
  embededMode: {
    type: Boolean,
    default: false
  },
  precision: {
    type: Number,
    default: 0
  }
})
let kLineChart = ref(null)
let fullscreenLoading = ref(false)
let contractList = reactive([])
let gateway = ref('')
let unifiedSymbol = ref('')
let latency = ref(0)
let gatewayList = reactive([])
let gwContractList = reactive([])


const marketCurrentDataStore = useMarketCurrentDataStore()
// on created
window.addEventListener('resize', () => {
  if (kLineChart.value) {
    kLineChart.value.resize()
  }
})
computed(() => {

})

async function loadBars(timestamp, loadMore) {
  fullscreenLoading.value = true
  try {
    const barDataList = await gatewayDataApi.loadWeeklyBarData(
      marketCurrentDataStore.curMarketGatewayId,
      marketCurrentDataStore.curUnifiedSymbol,
      timestamp,
      !loadMore
    )
    return barDataList
      .map((data) => decodeBarField(data)
        .map((bar) => KLineUtils.createFromBar(bar))
  } catch (e) {
    ElMessage.error(e.message)
  } finally {
    fullscreenLoading.value = false
  }
}
watch(() => props.marketGatewayId, (val) => {
  gateway.value = val

})
watch(() => props.contractUnifiedSymbol, (val) => {
  unifiedSymbol.value = val
  if (kLineChart.value) {
    kLineChart.value.clearData()
    kLineChart.value.resize()
  }
})
watch(gateway, (val) => {
  marketCurrentDataStore.updateFocusMarketGatewayId(marketCurrentDataStore.$state, val)
})

watch(unifiedSymbol, (val) => {
  marketCurrentDataStore.updateFocusUnifiedSymbol(marketCurrentDataStore.$state, val)
})

watch(() => marketCurrentDataStore.curTick, () => {
  latency.value = new Date().getTime() - tick.actiontimestamp
})
watch(() => marketCurrentDataStore.curBar, (bar) => {
  if (kLineChart.value && !!bar) {
    kLineChart.value.updateData(KLineUtils.createFromBar(bar))
  }
})
watch(() => marketCurrentDataStore.lastBar, (bar) => {
  if (kLineChart.value && !!bar) {
    kLineChart.value.updateData(KLineUtils.createFromBar(bar))
  }
})
watch(() => marketCurrentDataStore.curUnifiedSymbol, (val) => {
  if (!kLineChart.value) {
    const kLineChartLocal = init('update-k-line')

    kLineChartLocal.addTechnicalIndicatorTemplate(volumePure)
    kLineChartLocal.createTechnicalIndicator('CJL', false)
    kLineChart.value = kLineChartLocal
    kLineChart.value.setStyleOptions(KLineUtils.getThemeOptions('dark'))

    kLineChart.value.loadMore(async (timestamp) => {
      console.log('加载更多数据')
      if (typeof timestamp !== 'number') {
        console.warn('忽略一个不是数值的时间戳: ' + timestamp)
        return
      }
      if (new Date().getTime() - timestamp < 86400000) {
        console.warn('查询时间间隔少于一天，忽略该查询')
        return
      }
      await new Promise((r) => setTimeout(r, 1000))
      const data = await loadBars(timestamp, true)
      kLineChart.value.applyMoreData(data || [], data.length)
    })
  }
  if (val) {
    kLineChart.value.setPriceVolumePrecision(props.precision, 0)
    kLineChart.value.clearData()
    kLineChart.value.applyNewData((loadBars(new Date().getTime())) || [])
  }

})

onUnmounted(() => {
  dispose('update-k-line')
})
computed(() => {
  const gatewayMap = {}
  contractList.forEach((i) => (gatewayMap[i.gatewayId] = true))
  gatewayList = Object.keys(gatewayMap)
  gwContractList = contractList.filter((i) => i.gatewayId === gateway.value)
})

</script>

<style>
.ns-mktdata {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.ns-mktdata__head {
  height: 30px;
  width: 100%;
  display: flex;
}

.ns-mktdata__body {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
</style>
