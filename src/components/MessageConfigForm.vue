<template>
  <el-dialog title="消息通知设置" :model-value="visible" :close-on-click-modal="false" :show-close="false" width="200px">
    <el-form label-width="100px">
      <el-form-item label="订阅事件列表">
        <el-select v-model="subEvents" multiple placeholder="可多选">
          <el-option value="TRADE" key="1">成交事件</el-option>
          <el-option value="ORDER" key="2">订单事件</el-option>
          <el-option value="NOTICE" key="3">消息事件</el-option>
          <el-option value="LOGGED_IN" key="4">连线事件</el-option>
          <el-option value="LOGGED_OUT" key="5">离线事件</el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-form :model="settings" label-width="100px" width="160px">
      <el-form-item v-for="(item, i) in fields" :label="item.label" :key="i" :required="item.required">
        <el-input v-if="['TEXT', 'PASSWORD', 'NUMBER'].indexOf(item.type) > -1" v-model="settings[item.name].value"
          :type="item.type === 'NUMBER' ? 'number' : 'text'" :show-password="item.type === 'PASSWORD'"
          :placeholder="item.placeholder" autocomplete="off" clearable></el-input>
        <el-date-picker v-if="item.type === 'DATE'" v-model="settings[item.name].value" type="date" placeholder="选择日期"
          clearable>
        </el-date-picker>
        <el-select v-if="['SELECT', 'MULTI_SELECT'].indexOf(item.type) > -1" v-model="settings[item.name].value"
          :multiple="item.type === 'MULTI_SELECT'" collapse-tags clearable>
          <el-option v-for="(val, i) in item.optionsVal" :label="item.options[i]" :value="val" :key="i"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div v-if="!fields.length" class="warning-text">
      <i class="el-icon-warning" /> 消息告警功能仅对会员开放
    </div>
    <template v-slot:footer>
      <div class="dialog-footer">
        <el-button v-if="fields.length" type="primary" @click="test">消息测试</el-button>
        <el-button @click="close">取 消</el-button>
        <el-button v-if="fields.length" type="primary" @click="saveConfig">保 存</el-button>
      </div>
    </template>

  </el-dialog>
</template>

<script setup>
import alertingApi from '@/api/alertingApi'
import { ElMessage } from 'element-plus'
import { ref, reactive, onMounted, watch, computed } from 'vue'
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:visible'])
let subEvents = ref([])
let settings = ref({})
alertingApi.subEvents().then(events => {
  subEvents.value = events
})
alertingApi.getSettings().then(result => {
  settings.value = result
})
watch(() => 'subEvents.length', () => {
  saveSubEvents()
})
function saveSubEvents() {
  alertingApi.saveEvents(subEvents.value)
}
function saveConfig() {
  Object.values(settings.value).forEach((item) => {
    console.log(item)
    if (!settings.value[item.name].value && item.required) {
      throw new Error(`【${item.label}】不能为空`)
    }
  })
  alertingApi.saveSettings(settings.value)
  close()
}

function close() {
  emit('update:visible', false)
}
function test() {
  alertingApi.testSettings(settings.value).then(() => {
    ElMessage.success('测试消息已发送')
  })
}
let fields = computed(() => {
  if (!Object.values(settings.value).length) {
    return []
  }
  return Object.values(settings.value).sort((a, b) => a.order < b.order ? -1 : 1)
})

</script>

<style></style>
