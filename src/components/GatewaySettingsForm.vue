<template>
  <el-dialog :title="`${channelType}网关配置`" width="300px" :model-value="visible" append-to-body
    :close-on-click-modal="false" :show-close="false" destroy-on-close>
    <el-form :model="gatewaySettings" label-width="100px" width="200px">
      <el-form-item v-for="(item, i) in gatewaySettingsMetaInfo" :label="item.label" :key="i" :required="item.required">
        <el-input v-if="['TEXT', 'PASSWORD', 'NUMBER'].indexOf(item.type) > -1" v-model="gatewaySettings[item.name]"
          :type="item.type === 'NUMBER' ? 'number' : 'text'" :show-password="item.type === 'PASSWORD'"
          :placeholder="item.placeholder" autocomplete="off"></el-input>
        <el-date-picker v-if="item.type === 'DATE'" v-model="gatewaySettings[item.name]" type="date" placeholder="选择日期">
        </el-date-picker>
        <el-select v-if="['SELECT', 'MULTI_SELECT'].indexOf(item.type) > -1" v-model="gatewaySettings[item.name]"
          :multiple="item.type === 'MULTI_SELECT'" collapse-tags>
          <el-option v-for="(val, i) in item.optionsVal" :label="item.options[i]" :value="val" :key="i"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template v-slot:footer>
      <div class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="saveSettings">保 存</el-button>
      </div>
    </template>

  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
const emit = defineEmits(['update:visible', 'onSave'])
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  channelType: {
    type: String,
    default: ''
  },
  gatewaySettingsMetaInfo: {
    type: Array,
    default: () => []
  },
  gatewaySettingsObject: {
    type: Object,
    default: () => { }
  }
})
let gatewaySettings = ref({})
watch(() => props.visible, (val) => {
  if (val) {
    if (!props.gatewaySettingsObject) {
      return
    }
    gatewaySettings.value = Object.assign({}, props.gatewaySettingsObject)
  }
})

function close() {
  emit('update:visible', false)
  gatewaySettings.value = {}
}
function saveSettings() {
  this.gatewaySettingsMetaInfo.forEach((item) => {
    if (!gatewaySettings.value[item.name] && item.required) {
      throw new Error(`【${item.label}】不能为空`)
    }
  })
  let obj = {}
  Object.assign(obj, gatewaySettings.value)
  emit('onSave', obj)
  close()
}

</script>

<style>
.el-dialog__body {
  padding: 10px 20px 0px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
