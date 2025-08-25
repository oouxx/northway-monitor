<template>
  <el-dialog title="盈亏曲线" v-if="visible" width="80%" append-to-body top="5vh" :before-close="close">
    <div class="perf-chart-wrapper">
      <module-performance ref="chartContainer" :moduleInitBalance="moduleInitBalance"
        :moduleDealRecords="moduleDealRecords" :largeView="true" />
    </div>
  </el-dialog>
</template>

<script setup>
import ModulePerformance from './ModulePerformance.vue'
import { ref, reactive, watch, nextTick } from 'vue'
const emit = defineEmits(['update:visible'])
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  moduleInitBalance: {
    type: Number,
    default: 0
  },
  moduleDealRecords: {
    type: Array,
    default: () => []
  }
})
let chartContainer = reactive({})
watch(props.visible, (val) => {
  if (val) {
    nextTick(() => {
      chartContainer.refresh()
    })
  }
})
function close() {
  emit('update:visible', false)
}
</script>

<style>
.perf-chart-wrapper {
  height: 80vh;
}
</style>
