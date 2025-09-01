<template>
  <div :id="chartId" class="chart-wrapper"></div>
</template>

<script setup>
import { dispose, init } from 'klinecharts'
import KLineUtils from '@/utils/kline-utils.js'
import { ref, reactive, onMounted, onUnmounted, watch, computed, defineProps } from 'vue'
const props = defineProps({
  moduleInitBalance: {
    type: Number,
    default: 0
  },
  moduleDealRecords: {
    type: Array,
    default: () => []
  },
  largeView: {
    type: Boolean,
    default: false
  }
})
let chartId = ref('perf-chart_' + Math.random())
let kLineChart = ref(null)
onMounted(() => {
  const kLineChartLocal = init(chartId.value)
  kLineChart.value = kLineChartLocal
  kLineChart.value.setStyleOptions(KLineUtils.getThemeOptions('dark'))
  kLineChart.value.setStyleOptions(KLineUtils.getPerformanceChartOptions())
  if (props.largeView) {
    kLineChart.value.addTechnicalIndicatorTemplate({
      name: 'drawback',
      shortName: `回撤统计`,
      plots: [{
        key: 'drawback',
        title: '回撤统计',
        type: 'bar',
        baseValue: 0,
        color: '#FFC107',
        isStroke: false
      }],
      precision: 2,
      styles: {
        margin: {
          top: 0.3,
          bottom: 0.1
        },
        line: {
          size: 1
        },
        bar: {
          upColor: '#EF5350',
          downColor: '#26A69A',
          noChangeColor: '#888888'
        },
      },
      calcTechnicalIndicator: (kLineDataList) => {
        return kLineDataList
      }
    })
    kLineChart.value.addTechnicalIndicatorTemplate({
      name: 'dealProfit',
      shortName: `逐笔盈亏`,
      plots: [{
        key: 'dealProfit',
        title: '逐笔盈亏',
        type: 'bar',
        baseValue: 0,
        color: function color(data, options) {
          var current = data.current;
          var value = current.technicalIndicatorData ? current.technicalIndicatorData.dealProfit : 0
          if (value > 0) {
            return options.bar.upColor;
          } else if (value < 0) {
            return options.bar.downColor;
          } else {
            return options.bar.noChangeColor;
          }
        },
        isStroke: false
      }],
      precision: 2,
      styles: {
        margin: {
          top: 0.3,
          bottom: 0.1
        },
        line: {
          size: 1
        },
        bar: {
          upColor: '#EF5350',
          downColor: '#26A69A',
          noChangeColor: '#888888'
        },
      },
      calcTechnicalIndicator: (kLineDataList) => {
        return kLineDataList
      }
    })
    kLineChart.value.createTechnicalIndicator('drawback', true, { id: 'pane1' })
    kLineChart.value.createTechnicalIndicator('dealProfit', true, { id: 'pane2' })
  }
  updateChart()
})
let performanceData = computed(() => {
  let balance = props.moduleInitBalance
  let initTime = props.moduleDealRecords.length
    ? props.moduleDealRecords[0].openTrade.tradetimestamp
    : 0
  let maxBalance = balance
  let dealArr = props.moduleDealRecords.map((rec) => {
    const closeTrade = rec.closeTrade
    const obj = { timestamp: closeTrade.tradetimestamp }
    balance += rec.dealProfit
    maxBalance = Math.max(maxBalance, balance)
    obj['close'] = balance
    obj['drawback'] = -(maxBalance - balance)
    obj['dealProfit'] = rec.dealProfit
    return obj
  })
  let startObj = { timestamp: initTime, close: props.moduleInitBalance, drawback: 0 }
  return [startObj].concat(dealArr)
})
function updateChart() {
  kLineChart.value.applyNewData(performanceData.value)
  refresh() // 防止偶尔渲染不成功
}
function refresh() {
  console.log('Refreshing chart')
  if (kLineChart.value) {
    kLineChart.value.resize()
  }
}
onMounted(() => {
  window.addEventListener('resize', () => {
    refresh()
  })
})
onUnmounted(() => {
  dispose(chartId.value)
})
watch(() => props.moduleDealRecords, () => {
  if (kLineChart.value) {
    updateChart()
  }
})
defineExpose({ refresh })
</script>

<style>
.chart-wrapper {
  height: 100%;
}
</style>
