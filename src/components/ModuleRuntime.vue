<template>
  <el-dialog title="模组运行状态" :model-value="visible" fullscreen class="flex-col" @close="close">
    <ModulePositionForm v-if="module.usage !== 'PLAYBACK'" v-model:visible="positionFormVisible"
      :contractOptions="moduleBindedContracts" :moduleName="module.moduleName" @save="onSave" />
    <ModulePerformancePopup v-model:visible="performanceVisible" :moduleInitBalance="moduleInfo.initBalance"
      :moduleDealRecords="dealRecords" />
    <div class="module-rt-wrapper">
      <div class="side-panel">
        <div class="side-panel_content">
          <el-descriptions class="margin-top panel-header" :column="`${isMobile ? 2 : 3}`">
            <template v-slot:title>
              模组用途
              <el-tag class="ml-10" :type="{ PLAYBACK: 'info', UAT: 'warning', PROD: '' }[module.usage]"
                effect="dark">{{ { PLAYBACK: '回测', UAT: '模拟盘', PROD: '实盘' }[module.usage] }}</el-tag>
            </template>
            <template v-slot:extra>
              <el-switch class="ml-10" v-model="isManualUpdate" inactive-text="自动刷新" active-color="#D8DBE1"
                inactive-color="#f7c139">
              </el-switch>
              <el-button class="compact mb-10 ml-10" icon="el-icon-refresh" @click="refresh">刷新数据</el-button>
              <el-button v-if="!isMobile" class="compact mb-10 ml-10" icon="el-icon-download"
                @click="exportDealRecord">导出交易</el-button>
            </template>
          </el-descriptions>
          <el-tabs v-model="infoTab" :stretch="true">
            <el-tab-pane name="moduleInfo" label="模组信息">
              <div class="description-wrapper">
                <el-descriptions class="margin-top" :column="`${isMobile ? 2 : 3}`">
                  <el-descriptions-item label="名称">{{ moduleRuntime.moduleName }}</el-descriptions-item>
                  <el-descriptions-item label="启停状态"><el-tag size="small"
                      :type="`${moduleRuntime.enabled ? 'success' : 'danger'}`">{{
                        moduleRuntime.enabled ? '启用' : '停用'
                      }}</el-tag></el-descriptions-item>
                  <el-descriptions-item label="盘口状态">
                    <el-tag size="small">{{
                      {
                        HOLDING_LONG: '持多单',
                        HOLDING_SHORT: '持空单',
                        EMPTY: '无持仓',
                        EMPTY_HEDGE: '对冲锁仓',
                        HOLDING_HEDGE: '对冲持仓',
                        PENDING_ORDER: '等待成交'
                      }[moduleRuntime.moduleState]
                    }}</el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="当前余额">
                    {{
                      formatter(moduleInfo.initBalance +
                        moduleInfo.accCloseProfit -
                        moduleInfo.accCommission +
                        holdingProfit)

                    }}
                  </el-descriptions-item>
                  <el-descriptions-item label="可用金额">
                    {{ formatter(moduleInfo.availableAmount) }}
                  </el-descriptions-item>
                  <el-descriptions-item label="占用金额">
                    {{ formatter((moduleInfo.initBalance +
                      moduleInfo.accCloseProfit -
                      moduleInfo.accCommission +
                      holdingProfit) - moduleInfo.availableAmount) }}
                  </el-descriptions-item>
                  <el-descriptions-item label="初始金额">
                    {{ formatter(moduleInfo.initBalance) }}
                  </el-descriptions-item>
                  <el-descriptions-item label="总盈亏">
                    {{ formatter(totalProfit) }}
                  </el-descriptions-item>
                  <el-descriptions-item label="总平仓盈亏">
                    {{ formatter(moduleInfo.accCloseProfit) }}
                  </el-descriptions-item>
                  <el-descriptions-item label="总手续费">
                    {{ formatter(moduleInfo.accCommission) }}
                  </el-descriptions-item>
                  <el-descriptions-item label="总持仓盈亏">
                    {{ formatter(holdingProfit) }}
                  </el-descriptions-item>
                  <el-descriptions-item label="交易笔数">
                    {{ dealRecords.length || 0 }}
                  </el-descriptions-item>
                  <el-descriptions-item label="胜率">
                    {{ `${(winningRatio * 100).toFixed(1)} %` }}
                  </el-descriptions-item>
                  <el-descriptions-item label="盈亏比">{{ earningPerLoss }}</el-descriptions-item>
                  <el-descriptions-item label="年化收益率">
                    {{ `${formatter(moduleInfo.annualizedRateOfReturn * 100)}% ` }}
                  </el-descriptions-item>
                  <el-descriptions-item label="最大回撤">
                    {{ formatter(moduleInfo.maxDrawback) }}
                  </el-descriptions-item>
                  <el-descriptions-item label="最大回撤比">
                    {{ `${Math.ceil(moduleInfo.maxDrawbackPercentage * 100 || 0)}%` }}
                  </el-descriptions-item>
                </el-descriptions>
              </div>
            </el-tab-pane>
            <el-tab-pane name="accountInfo" label="账户信息">
              <el-descriptions v-for="(item, i) in accountInfo" :key="i" column="2">
                <template v-slot:title>
                  {{ item.name }}
                </template>
                <el-descriptions-item label="账户余额">
                  {{ formatter(item.balance) }}
                </el-descriptions-item>
                <el-descriptions-item label="可用金额">
                  {{ formatter(item.availableAmount) }}
                </el-descriptions-item>
              </el-descriptions>
            </el-tab-pane>
            <el-tab-pane name="strategyInfo" label="策略信息">
              <div class="description-wrapper">
                <el-descriptions class="margin-top" column="2">
                  <el-descriptions-item v-for="(item, i) in strategyInfo" :label="item.name" :key="i">
                    <el-popover v-if="(item.value instanceof Array)" placement="right" trigger="click">
                      <el-table :data="item.value" max-height="300px">
                        <el-table-column width="100" property="name" label="描述">
                          <template v-slot:default="scope">
                            {{ scope.row.name || scope.$index + 1 }}
                          </template>
                        </el-table-column>
                        <el-table-column width="100" property="value" label="数值"></el-table-column>
                      </el-table>
                      <template v-slot:reference>
                        <el-button :disabled="!item.value.length">{{ item.value.length ? '明细' :
                          '无数据' }}
                        </el-button>
                      </template>

                    </el-popover>
                    <span v-else>{{ item.value }}</span>
                  </el-descriptions-item>
                </el-descriptions>
              </div>
            </el-tab-pane>
          </el-tabs>

          <el-tabs v-model="moduleTab" :stretch="true">
            <el-tab-pane name="holding" label="模组持仓"></el-tab-pane>
            <el-tab-pane name="dealRecord" label="交易历史"></el-tab-pane>
          </el-tabs>
          <div style="height: 1px" />
          <div class="table-wrapper">
            <el-table id="modulePositionTbl" v-show="moduleTab === 'holding'" :data="holdingPositions" height="100%">
              <el-table-column prop="unifiedSymbol" label="合约" align="center" width="100px">
                <template v-slot:default="scope">{{ scope.row.contract.name }}</template>
              </el-table-column>
              <el-table-column prop="positionDir" label="方向" align="center" width="50px">
                <template v-slot:default="scope">{{
                  { 2: '多', 3: '空' }[scope.row.positiondirection] || '未知'
                }}
                </template>
              </el-table-column>
              <el-table-column prop="position" label="数量" align="center" min-width="46px" />
              <el-table-column v-if="!isMobile" prop="openprice" label="成本价" align="center">
                <template v-slot:default="scope">
                  {{ scope.row.openprice.toFixed(scope.row.contract.priceprecision) }}
                </template>
              </el-table-column>
              <el-table-column v-if="!isMobile" prop="lastprice" label="现价" align="center">
                <template v-slot:default="scope">
                  {{ (scope.row.lastprice).toFixed(scope.row.contract.priceprecision) }}
                </template>
              </el-table-column>
              <el-table-column prop="positionprofit" label="持仓盈亏" align="center">
                <template v-slot:default="scope">
                  {{ formatter(scope.row.positionprofit) }}
                </template>
              </el-table-column>
              <el-table-column v-if="module.usage !== 'PLAYBACK'" label="操作" align="center" width="50px">
                <template v-slot:header>
                  <el-button id="editPosition" class="compact" title="调整持仓" size="small" icon="el-icon-edit"
                    @click="positionFormVisible = true"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-table ref="dealTbl" v-show="moduleTab === 'dealRecord'" :data="dealRecords" height="100%">
              <el-table-column prop="contractName" label="合约" align="center" width="100px" />
              <el-table-column prop="direction" label="方向" align="center" width="46px" />
              <el-table-column prop="volume" label="数量" align="center" min-width="60px" />
              <el-table-column prop="openPrice" label="开仓价" align="center" />
              <el-table-column prop="closePrice" label="平仓价" align="center" />
              <el-table-column label="平仓盈亏" align="center" width="70px">
                <template v-slot:default="scope">
                  {{ formatter(scope.row.dealProfit) }}
                </template>
              </el-table-column>
              <el-table-column label="开仓时间" align="center" width="132px">
                <template v-slot:default="scope">
                  {{ `${scope.row.openTrade.tradedate} ${scope.row.openTrade.tradetime}` }}
                </template>
              </el-table-column>
              <el-table-column label="平仓时间" align="center" width="132px">
                <template v-slot:default="scope">
                  {{ `${scope.row.closeTrade.tradedate} ${scope.row.closeTrade.tradetime}` }}
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="performance-min">
            <el-button v-if="!isMobile" class="compact btn-enlarge" title="放大盈亏曲线" size="small" icon="el-icon-zoom-in"
              @click="performanceVisible = true"></el-button>
            <ModulePerformance v-model:visible="performanceVisible" :moduleInitBalance="moduleInfo.initBalance"
              :moduleDealRecords="dealRecords" />
          </div>
        </div>
      </div>
      <div v-if="!isMobile" class="kline-wrapper">
        <div class="kline-header">
          模组当前引用的K线数据（模组仅缓存最近的{{ module.moduleCacheDataSize }}根K线数据）
        </div>
        <div>
          <el-select id="selectContract" class="ml-10 mt-5" v-model="contractNameOfChart" placeholder="请选择合约">
            <el-option v-for="(item, i) in bindedContracts" :key="i" :label="item" :value="item"></el-option>
          </el-select>
          <el-select id="selectIndicator" class="ml-10 mt-5" v-model="indicator.name" filterable placeholder="请选择指标">
            <el-option v-for="(item, i) in indicatorOptions" :key="i" :label="item" :value="item"></el-option>
          </el-select>
          <el-select class="ml-10 mt-5 mr-10" v-model="indicator.paneId" placeholder="请选择绘图位置">
            <el-option :key="0" label="主图" value="candle_pane" />
            <el-option :key="1" label="副图1" value="pane1" />
            <el-option :key="2" label="副图2" value="pane2" />
            <el-option :key="3" label="副图3" value="pane3" />
            <el-option :key="4" label="副图4" value="pane4" />
            <el-option :key="5" label="副图5" value="pane5" />
          </el-select>
          <el-button icon="el-icon-plus" title="绘制指标" @click.native="addIndicator"></el-button>
          <el-button icon="el-icon-minus" title="移除指标" @click.native="removeIndicator"></el-button>
          <el-popover>
            <el-form>
              <el-form-item label="线粗" size="small">
                <el-input-number style="width: 100px" v-model="indicator.lineWidth" :min="1" :max="4"
                  @change="updateIndicator" />
              </el-form-item>
              <el-form-item label="线形" size="small">
                <el-select style="width: 100px" v-model="indicator.lineStyle">
                  <el-option value="line" label="折线" key="1"></el-option>
                  <el-option value="bar" label="柱形" key="2"></el-option>
                  <el-option value="circle" label="圆点" key="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="margin-bottom: 0">
                <el-button style="float: right" type="warning" @click.native="clearIndicators">清空指标</el-button>
              </el-form-item>
            </el-form>
            <template v-slot:reference>
              <el-button class="ml-10 mr-10" icon="el-icon-setting" title="指标样式设置"></el-button>
            </template>
          </el-popover>
          <el-button :icon="`${holdingVisibleOnChart ? 'el-icon-data-board' : 'el-icon-data-line'}`"
            :title="`${holdingVisibleOnChart ? '隐藏持仓线' : '显示持仓线'}`"
            @click.native="holdingVisibleOnChart = !holdingVisibleOnChart"></el-button>
          <el-button icon="el-icon-download" title="下载数据" @click.native="exportData"></el-button>
        </div>
        <div id="module-k-line" class="kline-body" v-loading.lock="loading"
          element-loading-background="rgba(0, 0, 0, 0.5)">
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script setup>
import ModulePositionForm from './ModulePositionForm.vue'
import ModulePerformance from './ModulePerformance.vue'
import ModulePerformancePopup from './ModulePerformancePopup.vue'
import { dispose, init } from 'klinecharts'
import volumePure from '@/lib/indicator/volume-pure'
import simpleVal from '@/lib/indicator/simple-value'
import moduleApi from '@/api/moduleApi'
import KLineUtils from '@/utils/kline-utils.js'
import { downloadData } from '@/utils/file-utils.js'
import { jStat } from 'jstat'
import { Parser } from '@json2csv/plainjs'
import MediaListener from '@/utils/media-utils'

import { decodePositionField, decodeTradeField } from '@/lib/xyz/redtorch/pb/core_field_pb'
import moment from 'moment'
import { ref, reactive, watch, computed, onMounted, onUnmounted, nextTick } from 'vue'
const makeHoldingSegment = (deal) => {
  return {
    name: 'segment',
    points: [
      { timestamp: deal.openTrade.tradetimestamp + 60000, value: deal.openPrice },
      { timestamp: deal.closeTrade.tradetimestamp + 60000, value: deal.closePrice }
    ],
    lock: true,
    styles: {
      line: {
        color:
          deal.direction === '多' ? '#ff0000' : deal.direction === '空' ? '#00ff00' : '#0000ff',
        size: 2
      }
    }
  }
}
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  module: {
    type: Object,
    default: () => { }
  },
  moduleRuntimeSrc: {
    type: Object,
    default: () => { }
  }
})
const dealTbl = ref(null)

let positionFormVisible = ref(false)
let performanceVisible = ref(false)
let holdingVisibleOnChart = ref(false)
let infoTab = ref('moduleInfo')
let moduleTab = ref('holding')
let dealRecords = ref([])
let barDataMap = ref({})
let chart = ref(null)
let loading = ref(false)
let moduleRuntime = ref({})
let contractNameOfChart = ref('')
let indicator = reactive({
  name: '',
  paneId: 'candle_pane',
  lineWidth: 1,
  lineStyle: 'line'
})
let indicatorMap = ref({})
let timer = ref('')
let isManualUpdate = ref(true)
let isMobile = ref(false)
let listener = ref(null)


function formatter(val) {
  return typeof val === 'number' ? val.toFixed(0) : val
}
const emit = defineEmits(['onSave', 'update:visible'])

watch(() => props.visible, (val) => {
  if (!localStorage.getItem(`autoUpdate_${props.module.moduleName}`)) {
    localStorage.setItem(`autoUpdate_${props.module.moduleName}`, true)
  }
  if (val) {
    isMobile.value = listener.value.isMobile()
    moduleRuntime.value = props.moduleRuntimeSrc
    if (isMobile.value) {
      loadDealRecord()
      return;
    }
    setTimeout(() => {
      initChart()
      refresh()
      contractNameOfChart.value = localStorage.getItem(`chartSymbol_${props.module.moduleName}`) || ''
      isManualUpdate.value = localStorage.getItem(`autoUpdate_${props.module.moduleName}`) === 'true'
    }, 100)
  }
})

function refresh() {
  loadRuntime()
  loadDealRecord()
}
function loadRuntime() {
  moduleApi.getModuleRuntime(props.module.moduleName).then((result) => {
    moduleRuntime.value = result
    barDataMap.value = result.dataMap
    updateChart()
  })
}
function loadDealRecord() {
  moduleApi.getModuleDealRecords(props.module.moduleName).then((result) => {
    dealRecords.value = result.map((item) => {
      item.openTrade = decodeTradeField(item.openTrade)
      item.closeTrade = decodeTradeField(item.closeTrade)
      item.volume = item.closeTrade.volume
      item.direction = { 1: '多', 2: '空' }[item.openTrade.direction]
      item.openPrice = item.openTrade.price.toFixed(item.openTrade.contract.priceprecision)
      item.closePrice = item.closeTrade.price.toFixed(item.closeTrade.contract.priceprecision)
      item.tradingDay = item.closeTrade.tradingday
      return item
    })

    nextTick(() => {
      let table = dealTbl.value
      if (table) {
        // TODO 测试是否滚动底部
        // 获取滚动容器
        const scrollWrap = table.$el.querySelector('.el-scrollbar__wrap');
        if (scrollWrap) {
          // 设置滚动位置到底部:cite[5]:cite[6]:cite[8]
          scrollWrap.scrollTop = scrollWrap.scrollHeight;
        }
      }
    })
  })
}
function exportData() {

  const fields = [
    'time',
    'open',
    'high',
    'low',
    'close',
    'volume',
    'openInterest',
    ...(indicatorOptions || []),
    'holding'
  ]
  Object.keys(barDataMap.value).map(symbol => {
    const dataList = barDataMap.value[symbol].map(data => {
      const timeFrameObj = fields.reduce((obj, field) => {
        obj[field] = field === 'time' ? moment(data['timestamp']).format('yyyyMMDD HH:mm') : data[field]
        return obj
      }, {})
      timeFrameObj['holding'] = 0
      dealRecords.value.forEach(deal => {
        const openTime = deal.openTrade.tradetimestamp
        const closeTime = deal.closeTrade.tradetimestamp
        if (data['timestamp'] > openTime && data['timestamp'] < closeTime) {
          const factor = deal.direction === '多' ? 1 : -1
          timeFrameObj['holding'] += factor * deal.volume
        }
      })
      return timeFrameObj
    })
    const parser = new Parser({ fields: fields })
    const csvData = parser.parse(dataList)
    downloadData(csvData, `${symbol}_数据.csv`, 'text/csv,charset=UTF-8')
  })
}
function exportDealRecord() {
  const dealRecordfields = [
    '合约名称',
    '持仓方向',
    '开仓价',
    '开仓时间',
    '平仓价',
    '平仓时间',
    '数量',
    '交易盈亏'
  ]
  const data = dealRecords.value.map((item) => {
    return {
      合约名称: item.contractName,
      持仓方向: item.direction,
      开仓价: item.openPrice,
      开仓时间: `${item.openTrade.tradedate} ${item.openTrade.tradetime}`,
      平仓价: item.closePrice,
      平仓时间: `${item.closeTrade.tradedate} ${item.closeTrade.tradetime}`,
      数量: item.volume,
      交易盈亏: item.dealProfit
    }
  })
  const parser = new Parser({ fields: dealRecordfields })
  const csvData = parser.parse(data)
  downloadData(csvData, `${props.module.moduleName}_交易历史.csv`, 'text/csv,charset=UTF-8')
}
function initChart() {
  const kLineChart = init(`module-k-line`)
  kLineChart.addTechnicalIndicatorTemplate(volumePure)
  kLineChart.createTechnicalIndicator('CJL', false, { id: 'pane1' })
  kLineChart.setStyleOptions(KLineUtils.getThemeOptions('dark'))
  chart.value = kLineChart
}
async function onSave() {
  setTimeout(refresh, 500)
}
function updateChart() {
  if (contractNameOfChart.value && chart.value) {
    chart.value.clearData()
    const contract = moduleBindedContracts.value.find(c => c.name === contractNameOfChart.value) || moduleBindedContracts.value[0]
    chart.value.setPriceVolumePrecision(contract.precision, 0)
    chart.value.applyNewData(barDataMap.value[contractNameOfChart.value] || [])
  }
}
function addIndicator() {
  if (!indicator.name) return
  indicatorMap.value[indicator.name] = Object.assign({}, indicator)
  const indicatorMapLocal = JSON.parse(JSON.stringify(indicatorMap.value))
  clearIndicators()
  indicatorMap.value = indicatorMapLocal
  saveIndicators()
  loadIndicators()
}
function removeIndicator() {
  if (!indicator.name) return
  chart.value.removeTechnicalIndicator(indicator.paneId, 'VAL_' + indicator.name)
  delete indicatorMap.value[indicator.name]
  saveIndicators()
}
function renderIndicator(indicator) {
  const colorIndex = Object.keys(indicatorMap.value).indexOf(indicator.name)
  const contract = moduleBindedContracts.value.find(c => c.name === contractNameOfChart.value) || moduleBindedContracts.value[0]
  chart.value.addTechnicalIndicatorTemplate(simpleVal(indicator, colorIndex, contract.precision))
  chart.value.createTechnicalIndicator('VAL_' + indicator.name, true, {
    id: indicator.paneId
  })
  chart.value.resize()
}
function updateIndicator() {
  indicatorMap.value[indicator.name] = indicator
  const override = {
    name: 'VAL_' + indicator.name,
    styles: {
      margin: {
        top: 0.2,
        bottom: 0.1
      },
      line: {
        size: indicator.lineWidth
      }
    }
  }
  chart.value.overrideTechnicalIndicator(override, indicator.paneId)
  saveIndicators()
}
function visualizeTradeRecords() {
  chart.value.removeShape()
  dealRecords.value
    .filter((deal) => deal.contractName === contractNameOfChart.value)
    .filter((deal) => {
      const dealTime = deal.closeTrade.tradetimestamp
      const dataHeadTime = barDataMap.value[contractNameOfChart.value].length
        ? barDataMap.value[contractNameOfChart.value][0]['timestamp']
        : dealTime
      return dealTime > dataHeadTime
    })
    .forEach((i) => {
      chart.value.createShape(makeHoldingSegment(i), 'candle_pane')
    })
}
function clearIndicators() {
  Object.keys(indicatorMap.value).forEach((indicatorName) => {
    indicator = indicatorMap.value[indicatorName]
    removeIndicator()
  })
}
function loadIndicators() {
  const dataStr =
    localStorage.getItem(`indicatorMap_${props.module.moduleName}_${contractNameOfChart.value}`) ||
    '{}'
  indicatorMap.value = JSON.parse(dataStr)
  for (let i = 1; i < 6; i++) {
    const paneId = 'pane' + i
    Object.keys(indicatorMap.value).forEach((indicatorName) => {
      if (
        !contractNameOfChart.value || moduleRuntime.value.indicatorMap[contractNameOfChart.value].indexOf(indicatorName) < 0
      ) {
        return
      }
      indicator = Object.assign({}, indicatorMap.value[indicatorName])
      if (indicator.paneId === paneId || indicator.paneId === 'candle_pane') {
        renderIndicator(indicator)
      }
    })
  }
}
function saveIndicators() {
  localStorage.setItem(
    `indicatorMap_${props.module.moduleName}_${contractNameOfChart.value}`,
    JSON.stringify(indicatorMap.value)
  )
}
function close() {
  saveIndicators()
  clearTimeout(timer.value)
  try {
    dispose('module-k-line')
  } catch (e) {
    console.error(e)
  }
  emit('update:visible', false)
  setTimeout(() => {
    //TODO 使用vue3的写法重构
    // Object.assign(this.$data, this.$options.data())
  }, 500)
}
watch(() => 'indicator.name', () => {
  indicator.lineStyle = 'line'

})

// isManualUpdate(val) {
//   if (val) {
//     clearTimeout(this.timer)
//   } else {
//     const autoUpdate = () => {
//       this.refresh()
//       this.timer = setTimeout(autoUpdate, 5000)
//     }
//     this.timer = setTimeout(autoUpdate, 5000)
//   }
//   if (this.visible) {
//     localStorage.setItem(`autoUpdate_${this.module.moduleName}`, val)
//   }
// },
watch(() => 'dealRecords.length', () => {
  if (holdingVisibleOnChart.value) {
    visualizeTradeRecords()
  }
})
watch(() => moduleTab.value, (val) => {
  if (val === 'dealRecord') {
    setTimeout(() => {
      let table = dealTbl.value
      if (table) {
        table.bodyWrapper.scrollTop = table.bodyWrapper.scrollHeight
      }
    }, 50)
  }
})
watch(() => contractNameOfChart.value, (val) => {
  if (val) {
    updateChart()
    loadIndicators()
    holdingVisibleOnChart.value = false
  }
  if (props.visible) {
    localStorage.setItem(`chartSymbol_${props.module.moduleName}`, val)
  }
})
watch(() => holdingVisibleOnChart.value, (val) => {
  if (val) {
    console.log('显示持仓线')
    visualizeTradeRecords()
  } else {
    if (chart.value) {
      chart.value.removeShape()
    }
  }
})
let bindedContracts = computed(() => { return Object.keys(barDataMap.value).sort((a, b) => a.localeCompare(b)) || [] })
let strategyInfo = computed(() => { return moduleRuntime.value.strategyInfos || [] })
let moduleInfo = computed(() => { return moduleRuntime.value.moduleAccountRuntime || {} })
let accountInfo = computed(() => { return moduleRuntime.value.accountRuntimes || [] })
let moduleBindedContracts = computed(() => {
  if (!props.module.moduleAccountSettingsDescription) return []
  console.log('22222', props.module.moduleAccountSettingsDescription)
  return props.module.moduleAccountSettingsDescription.reduce((contracts, mad) => contracts.concat(mad.bindedContracts), [])
})
let holdingProfit = computed(() => {
  console.log('33333', holdingPositions.value)
  return holdingPositions.value.map((item) => item.positionprofit).reduce((a, b) => a + b, 0)
})
let totalProfit = computed(() => {
  if (!moduleRuntime.value) return 0
  return holdingProfit.value + moduleInfo.value.accCloseProfit - moduleInfo.value.accCommission
})
let winningRatio = computed(() => {
  if (!dealRecords.value.length) return 0
  const numberOfWinning = dealRecords.value.filter((item) => item.dealProfit > 0).length || 0
  return (numberOfWinning / this.dealRecords.length).toFixed(3)
})
let earningPerLoss = computed(() => {
  if (!dealRecords.value.length) return 'N/A'
  const winningDeals = dealRecords.value.filter((item) => item.dealProfit > 0)
  const lossDeals = dealRecords.value.filter((item) => item.dealProfit <= 0)
  const avgProfit = winningDeals.length
    ? (jStat.sum(winningDeals.map((item) => item.dealProfit)) / winningDeals.length).toFixed(0)
    : '0'
  const avgLoss = lossDeals.length
    ? Math.abs(jStat.sum(lossDeals.map((item) => item.dealProfit)) / lossDeals.length).toFixed(
      0
    )
    : '0'
  return `${avgProfit} : ${avgLoss}`
})
let holdingPositions = computed(() => {
  if (!moduleInfo.value.positionDescription) return []
  const positions = moduleInfo.value.positionDescription.logicalPositions.map((data) =>
    decodePositionField(data)
  )
  return positions.filter((item) => item.position > 0)
})
let indicatorOptions = computed(() => {
  if (!moduleRuntime.value.indicatorMap || !contractNameOfChart.value || !moduleRuntime.value.indicatorMap[contractNameOfChart.value]) return []
  return [...moduleRuntime.value.indicatorMap[contractNameOfChart.value]].sort((a, b) => a.localeCompare(b))
})
onMounted(() => {
  window.addEventListener('resize', () => {
    if (chart.value) {
      chart.value.resize()
    }
  })
  listener.value = new MediaListener(() => {
    isMobile.value = listener.value.isMobile()
  })
})
onUnmounted(() => {
  listener.value.destroy()
  clearTimeout(timer.value)
})

</script>

<style scoped>
.side-panel {
  padding: 10px;
  flex: 1;
}

.table-wrapper {
  flex: 1;
  min-height: 150px;
}

.performance-min {
  position: relative;
  height: 280px;
}

@media screen and (max-height: 600px) {
  .performance-min {
    height: 0px;
  }
}

.kline-wrapper {
  width: 100%;
  border-left: 1px solid;
  display: flex;
  flex-direction: column;
}

#module-k-line {
  flex: 1;
}

.module-rt-wrapper {
  height: calc(100vh - 80px);
  display: flex;
  border-top: 1px solid;
  border-bottom: 1px solid;
}

.cell-content {
  position: absolute;
  bottom: 0;
}

.kline-header {
  margin-left: 8px;
}

.text-wrapper {
  box-sizing: content-box;
  width: 100%;
}

.btn-enlarge {
  position: absolute;
  right: 0;
  margin: 10px 0;
  z-index: 999;
}

.el-tabs__header {
  margin: 0;
}

.el-dialog.is-fullscreen {
  overflow: hidden;
}

.side-panel_content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 桌面端样式 */
@media screen and (min-width: 661px) {
  .side-panel {
    min-width: 520px;
    flex: 1;
  }

  .description-wrapper {
    max-height: 250px;
    overflow: auto;
  }
}

/* 移动端样式 */
@media screen and (max-width: 660px) {
  .side-panel {
    width: 100%;
    padding: 10px 0;
    flex: 1;
  }

  .panel-header {
    height: 30px;
    min-height: 30px;
    overflow: hidden;
  }

  .description-wrapper {
    max-height: 180px;
    overflow: auto;
  }
}
</style>
