<template>
  <el-dialog id="gatewayForm" :title="readOnly ? '查看' : isUpdateMode ? '修改' : '新增'" v-if="visible" width="768px"
    :close-on-click-modal="false" :show-close="false">
    <GatewaySettingsForm v-if="form.channelType !== 'PLAYBACK'" v-model:visible="gatewaySettingsFormVisible"
      :channelType="form.channelType" :gatewaySettingsMetaInfo="gatewaySettingsMetaInfo"
      :gatewaySettingsObject="form.settings" @onSave="(settings) => (form.settings = settings)" />
    <PlaybackForm v-else v-model:visible="gatewaySettingsFormVisible" :subscribedContracts="subscribedContracts"
      :playbackSettingsSrc="form.settings" @onSave="(settings) => (form.settings = settings)" />
    <el-form ref="gatewayForm" :model="form" label-width="100px" width="200px" :rules="formRules">
      <el-row>
        <el-col :span="8">
          <el-form-item :label="`${typeLabel}ID`" prop="gatewayId">
            <el-input v-model="form.gatewayId" autocomplete="off" :disabled="readOnly || isUpdateMode || disableGatewayIdEdit
              "></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item :label="`${typeLabel}描述`" prop="description">
            <el-input v-model="form.description" autocomplete="off" class="mxw-340" :disabled="readOnly"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item :label="`${typeLabel}类型`" prop="channelType">
            <el-select v-model="channelType" placeholder="请选择" @change="onChooseGatewayType"
              :disabled="isUpdateMode || readOnly">
              <el-option v-for="(item, i) in channelTypeOptions" :label="item.name" :value="item" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="自动连接">
            <el-switch v-model="form.autoConnect" :disabled="readOnly"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item :label="`${typeLabel}用途`" prop="gatewayUsage">
            <el-select v-model="form.gatewayUsage" placeholder="未知" @change="onChooseGatewayType" disabled>
              <el-option v-if="gatewayUsage === 'MARKET_DATA'" label="行情" value="MARKET_DATA"></el-option>
              <el-option v-if="gatewayUsage === 'TRADE'" label="交易" value="TRADE"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="gatewayUsage === 'TRADE'">
          <el-form-item v-show="channelType" label="行情网关" prop="bindedMktGatewayId">
            <el-select v-model="form.bindedMktGatewayId" placeholder="请选择" @change="onChooseGatewayType"
              :disabled="readOnly">
              <el-option :id="`bindedGatewayOption_${item.gatewayId}`" :label="item.gatewayId" :value="item.gatewayId"
                v-for="(item, i) in linkedGatewayOptions" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="16" v-if="gatewayUsage === 'MARKET_DATA'">
          <el-form-item v-show="channelType" label="订阅合约">
            <el-select v-model="subscribedContracts" multiple filterable remote :remote-method="searchContracts"
              collapse-tags reserve-keyword placeholder="合约可搜索，空格搜索全部" :loading="loading" :disabled="readOnly">
              <el-option v-for="(item) in contractOptions" :key="item.value" :label="item.name" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="gatewayUsage === 'MARKET_DATA'">
        <el-form-item label="已订阅合约">
          <div class="tag-wrapper" v-if="subscribedContracts && subscribedContracts.length">
            <el-tag v-for="(item, i) in subscribedContracts" :key="i">
              {{ item.name }}
            </el-tag>
          </div>
          <el-tag type="info" v-else>没有订阅合约</el-tag>
        </el-form-item>
      </el-row>
    </el-form>
    <template v-slot:footer>
      <div class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" v-if="!readOnly" @click="gatewaySettingsFormVisible = true"
          :disabled="!form.channelType || form.channelType === 'SIM'">{{ typeLabel }}配置</el-button>
        <el-button v-if="!readOnly" id="saveGatewaySettings" type="primary" @click="saveGateway">保 存</el-button>
      </div>
    </template>

  </el-dialog>
</template>

<script setup>
import GatewaySettingsForm from '@/components/GatewaySettingsForm'
import PlaybackForm from '@/components/PlaybackForm'
import gatewayMgmtApi from '@/api/gatewayMgmtApi'
import contractApi from '@/api/contractApi'

import { defineProps, ref, reactive, computed, watch, nextTick, defineEmits } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
const CONNECTION_STATE = {
  CONNECTING: 'CONNECTING',
  CONNECTED: 'CONNECTED',
  DISCONNECTING: 'DISCONNECTING',
  DISCONNECTED: 'DISCONNECTED'
}
const route = useRoute()
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  gatewayDescription: {
    type: Object,
    default: () => { }
  },
  isUpdateMode: {
    type: Boolean,
    default: false
  },
  readOnly: {
    type: Boolean,
    default: false
  },
  gatewayUsage: {
    type: String,
    default: 'TRADE'
  }
})
const emit = defineEmits(['onSave', 'update:visible'])
let loading = ref(false)
let linkedGatewayOptions = ref([])
let formRules = reactive({
  gatewayId: [{ required: true, message: '不能为空', trigger: 'blur' }],
  channelType: [{ required: true, message: '不能为空', trigger: 'blur' }],
  gatewayUsage: [{ required: true, message: '不能为空', trigger: 'blur' }],
  bindedMktGatewayId: [{ required: true, message: '不能为空', trigger: 'blur' }]
})
let gatewayForm = ref(null)
let gatewaySettingsFormVisible = ref(false)
let form = reactive({
  gatewayId: '',
  description: '',
  channelType: '',
  gatewayUsage: '',
  gatewayAdapterType: '',
  connectionState: CONNECTION_STATE.DISCONNECTED,
  autoConnect: false,
  bindedMktGatewayId: '',
  subscribedContracts: [],
  settings: null
})
let subscribedContracts = ref([])
let channelTypeOptions = ref([])
let contractOptions = ref([])
let channelType = ref('')
let contractType = ref('')
let gatewaySettingsMetaInfo = ref([])
let typeLabel = ref('')
let disableGatewayIdEdit = ref(false)

computed(() => {
  typeLabel.value = props.gatewayUsage === 'TRADE' ? '账户' : '网关'
  disableGatewayIdEdit.value = channelType.value && props.gatewayUsage === 'MARKET_DATA' && !channelType.value.allowDuplication
})

function onChooseGatewayType() {
  if (props.gatewayUsage === 'MARKET_DATA' && !channelType.allowDuplication) {
    form.gatewayId = channelType.name
  } else if (channelType.allowDuplication) {
    form.gatewayId = ''
  }
}
async function saveGateway() {
  if (form.channelType === 'SIM') {
    form.settings = { nothing: 0 }
  }
  if (!form.settings || !Object.keys(form.settings).length) {
    throw new Error('网关配置不能为空')
  }
  if (form.channelType === 'PLAYBACK') {
    if (subscribedContracts.length > 10) {
      ElMessage.warning('回放合约数量不能多于10个')
      return
    }
    form.settings.playContracts = subscribedContracts.value
  }
  gatewayForm.value
    .validate()
    .then(() => {
      if (props.gatewayUsage === 'MARKET_DATA') {
        form.subscribedContracts = subscribedContracts.value
      }
      emit('onSave', form)
      close()
    })
    .catch((e) => {
      console.error(e)
    })
}

function searchContracts(query) {
  if (query !== '') {
    loading.value = true;
    // 获取合约品种列表
    contractApi.getGatewayContracts(form.channelType, query).then(result => {
      if (result.length > 100) {
        ElMessage.warning('返回结果多于100条，请提供更精确的筛选条件')
        return
      }
      contractOptions.value = result
    }).finally(() => {
      loading.value = false;
    })
  } else {
    contractOptions.value = [];
  }
}

function close() {
  emit('update:visible', false)
  // form = this.$options.data().form
  subscribedContracts.value = []
}
watch(() => props.visible, (val) => {
  if (val) {
    if (props.isUpdateMode) {
      Object.keys(props.gatewayDescription).forEach(key => {
        form[key] = props.gatewayDescription[key]
      })
    }
    form.gatewayUsage = props.gatewayUsage
    subscribedContracts.value = form.subscribedContracts
    contractOptions.value = subscribedContracts.value
    nextTick(() => {
      gatewayMgmtApi.findAll('MARKET_DATA').then((result) => {
        linkedGatewayOptions.value = result
      })
      gatewayMgmtApi.getGatewayTypeDescriptions().then((result) => {
        channelTypeOptions.value = result
          .filter((item) => item.usage.indexOf(props.gatewayUsage) > -1)
          .filter((item) => !item.adminOnly || route.query.superuser)
          .map((item) => Object.assign({ value: item.name }, item))
        channelType.value = channelTypeOptions.value.find(item => item.name === form.channelType)
      })
    })
  }
})
watch(channelType, async (val) => {
  if (
    val &&
    props.gatewayUsage === 'MARKET_DATA' &&
    !props.isUpdateMode &&
    subscribedContracts.values
  ) {
    subscribedContracts.value = []
  }
  if (val) {
    form.channelType = val.name

    if (val.name !== 'SIM') {
      // 获取网关配置元信息
      gatewayMgmtApi.getGatewaySettingsMetaInfo(form.channelType).then((result) => {
        gatewaySettingsMetaInfo.value = result
        gatewaySettingsMetaInfo.value.sort((a, b) => (a.order < b.order ? -1 : 1))
      })
    }
  }
})

</script>

<style>
.el-dialog__body {
  padding: 10px 20px 0px;
}

.tag-wrapper {
  overflow: auto;
  max-height: 200px;
}

.tag-wrapper .el-tag {
  margin-right: 10px;
}
</style>
