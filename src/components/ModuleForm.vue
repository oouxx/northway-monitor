<template>
  <el-dialog :title="readOnly ? '查看' : isUpdateMode ? '修改' : '新增'" :model-value="visible" class="module-dialog"
    v-loading="loading" :close-on-click-modal="readOnly" element-loading-background="rgba(0, 0, 0, 0.3)"
    :width="`${isMobile ? '80%' : '540px'}`" @close="close">
    <!-- TODO fix ContractFinder component -->
    <!-- <ContractFinder :visible.sync="contractFinderVisible" /> -->
    <el-container>
      <el-aside :width="`${isMobile ? '60px' : '150px'}`" :style="{ overflow: 'hidden' }">
        <el-menu :default-active="activeIndex" @select="handleSelect">
          <el-menu-item index="1">
            <i class="el-icon-setting"></i>
            <template v-slot:title>
              <span v-if="!isMobile">基础信息</span>
            </template>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-s-opportunity"></i>
            <template v-slot:title>
              <span v-if="!isMobile">交易策略</span>
            </template>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-s-custom"></i>
            <template v-slot:title>
              <span v-if="!isMobile">账户绑定</span>
            </template>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-document-copy"></i>
            <template v-slot:title>
              <span v-if="!isMobile">已关联合约</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main-compact"><el-form :model="form" label-width="100px"
          :label-position="`${compactMode ? 'top' : 'right'}`" class="module-form">
          <div v-show="activeIndex === '1'">
            <el-form-item label="模组名称">
              <el-input v-model="form.moduleName" :maxlength="16" :disabled="readOnly || isUpdateMode"></el-input>
            </el-form-item>
            <el-form-item label="分配金额">
              <el-input v-model="form.initBalance" type="number" :disabled="readOnly" />
            </el-form-item>
            <el-form-item label="模组类型">
              <el-select v-model="form.type" :disabled="readOnly">
                <el-option label="投机" value="SPECULATION"></el-option>
                <el-option label="套利" value="ARBITRAGE"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="模组用途">
              <el-select v-model="form.usage" :disabled="readOnly">
                <el-option label="回测" value="PLAYBACK"></el-option>
                <el-option label="模拟盘" value="UAT"></el-option>
                <el-option label="实盘" value="PROD"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="平仓优化">
              <el-select v-model="form.closingPolicy" :disabled="readOnly">
                <el-option label="先开先平" value="FIRST_IN_FIRST_OUT"></el-option>
                <el-option label="平今优先" value="FIRST_IN_LAST_OUT"></el-option>
                <el-option label="平昨锁今" value="CLOSE_NONTODAY_HEGDE_TODAY"
                  :disabled="form.usage !== 'PROD'"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="!module" label="日志级别">
              <el-select v-model="form.logLevel" :disabled="readOnly">
                <el-option label="INFO" value="INFO"></el-option>
                <el-option label="DEBUG" value="DEBUG"></el-option>
                <el-option label="TRACE" value="TRACE"></el-option>
                <el-option label="WARN" value="WARN"></el-option>
                <el-option label="ERROR" value="ERROR"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="K线周期">
              <el-input-number :disabled="readOnly" v-model="form.numOfMinPerBar" :min="1" />
              <span class="ml-10">分钟</span>
            </el-form-item>
            <el-form-item label="预热数据量">
              <el-input-number v-model="form.weeksOfDataForPreparation" :min="0"
                :disabled="readOnly || form.usage === 'PLAYBACK'" />
              <span class="ml-10">周</span>
            </el-form-item>
            <el-form-item label="缓存数据量">
              <el-input-number :disabled="readOnly" v-model="form.moduleCacheDataSize" :min="100">
              </el-input-number>
            </el-form-item>
            <el-form-item label="默认下单数">
              <el-input-number :disabled="readOnly" v-model="form.defaultVolume" :min="1" />
            </el-form-item>
            <el-form-item label="下单超价">
              <el-input-number :disabled="readOnly" v-model="form.orderPlusTick" :min="0" />
              <span class="ml-10">Tick</span>
            </el-form-item>
          </div>
          <div v-show="activeIndex === '2'">
            <el-form-item>
              <template v-slot:label>
                <el-checkbox id="showDemoStrategy" v-model="showDemoStrategy">显示示例策略</el-checkbox>
              </template>
            </el-form-item>
            <el-form-item label="绑定策略">
              <el-select v-model="form.strategySetting" placeholder="请选择" :disabled="readOnly || isUpdateMode"
                filterable>
                <el-option v-for="(p, i) in tradeStrategyOptions" :label="p.componentMeta.name" :value="p"
                  :key="i"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-for="param in form.strategySetting.initParams" :label="param.label" :key="param.field">
              <el-select v-if="['SELECT', 'MULTI_SELECT'].indexOf(param.type) > -1" v-model="param.value"
                :class="param.unit ? 'with-unit' : ''" :multiple="param.type === 'MULTI_SELECT'"
                :placeholder="param.placeholder" collapse-tags :disabled="readOnly">
                <el-option v-for="(item, i) in param.options" :label="item" :value="param.optionsVal[i] || item"
                  :key="i">
                </el-option>
              </el-select>
              <el-input v-else v-model="param.value" :class="param.unit ? 'with-unit' : ''"
                :type="param.type.toLowerCase()" :placeholder="param.placeholder" :disabled="readOnly" />
              <span v-if="param.unit" class="value-unit"> {{ param.unit }}</span>
            </el-form-item>
          </div>
          <div v-show="activeIndex === '3'">
            <el-form-item label="绑定账号">
              <el-select v-model="choseAccounts" placeholder="请选择账户" multiple :disabled="readOnly"
                @change="accountSelected">
                <el-option v-for="(acc, i) in accountOptions" :label="acc.gatewayId" :value="acc" :key="i"></el-option>
              </el-select>
            </el-form-item>
            <div v-for="(acc, i) in form.moduleAccountSettingsDescription" :key="i">
              <el-divider content-position="left">账户：{{ form.moduleAccountSettingsDescription[i].accountGatewayId
              }}</el-divider>
              <el-form-item label="关联合约">
                <el-select class='bindContractSelector'
                  v-model="form.moduleAccountSettingsDescription[i].bindedContracts" multiple filterable>
                  <el-option v-for="(item, i) in bindedContractsOptions[i]" :value="item" :label="item.name" :key="i" />
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div v-show="activeIndex === '4'">
            <el-table :data="jointBindedContracts" style="width: 100%">
              <el-table-column prop="name" label="合约名称" align="center" width="100px">
              </el-table-column>
              <el-table-column prop="unifiedSymbol" label="合约编码" align="center">
                <template v-slot:default="scope">
                  <span style="user-select: all;">{{ scope.row.unifiedSymbol }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form>
      </el-main>
    </el-container>
    <template v-slot:footer>
      <div class="dialog-footer">
        <el-popconfirm v-if="!readOnly && isUpdateMode" class="mr-10" title="确定重置吗？"
          @confirm="saveSettingAndClose(true)">
          <template v-slot:reference>
            <el-button id="resetModuleSettings" size="small" type="warning" title="模组状态将重置为初始状态">
              重置模组
            </el-button>
          </template>
        </el-popconfirm>
        <el-button v-if="!!module" @click="copyModule">复 制</el-button>
        <el-button id="closeModuleSettings" @click="close">取 消</el-button>
        <el-button id="saveModuleSettings" v-if="!readOnly" type="primary" @click="saveSettingAndClose(false)">保存{{
          isUpdateMode ? '' : ` | 关闭` }}</el-button>
        <el-button v-if="!readOnly && !isUpdateMode" type="primary" @click="saveSettingAndMore">保存 | 继续</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import gatewayMgmtApi from '../api/gatewayMgmtApi'
import moduleApi from '../api/moduleApi'
import contractApi from '../api/contractApi'
import MediaListener from '@/utils/media-utils'
import { ref, reactive, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
const initComponent = async (component, arr) => {
  const paramsMap = await moduleApi.componentParams(component)
  arr.push({
    componentMeta: component,
    initParams: Object.values(paramsMap).sort((a, b) => a.order - b.order),
    value: component.name
  })
}
const props = defineProps({
  readOnly: {
    type: Boolean,
    default: false
  },
  visible: {
    type: Boolean,
    default: false
  },
  module: {
    type: Object,
    default: null
  }
})
const emit = defineEmits(['update:visible', 'onSave'])
let contractFinderVisible = ref(false)
let loading = ref(false)
let showDemoStrategy = ref(false)
let isMobile = ref(false)
let accountOptions = ref([])
let bindedContractsOptions = ref([])
let tradeStrategyOptionsSource = ref([])
let activeIndex = ref('1')
let choseAccounts = ref([])
let form = reactive({
  moduleName: '',
  type: 'SPECULATION',
  usage: 'UAT',
  numOfMinPerBar: 1,
  weeksOfDataForPreparation: 0,
  moduleCacheDataSize: 500,
  closingPolicy: 'FIRST_IN_FIRST_OUT',
  initBalance: 0,
  defaultVolume: 1,
  orderPlusTick: 0,
  moduleAccountSettingsDescription: [],
  logLevel: 'INFO',
  strategySetting: {
    componentMeta: {},
    initParams: [],
    value: ''
  }
})
let isUpdateMode = computed(() => !!props.module)
let compactMode = computed(() => isMobile.value && window.innerHeight < 450)
let tradeStrategyOptions = computed(() => {
  if (showDemoStrategy.value) {
    return tradeStrategyOptionsSource.value
  }
  return tradeStrategyOptionsSource.value.filter((item) => !/示例/.test(item.componentMeta.name))
})
let jointBindedContracts = computed(() => {
  console.log('111111', form.moduleAccountSettingsDescription)
  return form.moduleAccountSettingsDescription.map(item => item.bindedContracts).reduce((jointList, list) => jointList.concat(list), [])
})
let listener = new MediaListener(() => {
  isMobile.value = listener.isMobile()
})
async function initData() {
  moduleApi.getStrategies().then((strategyMetas) => {
    strategyMetas.forEach(async (i) => initComponent(i, tradeStrategyOptionsSource.value))
    setTimeout(() => {
      tradeStrategyOptionsSource.value = tradeStrategyOptionsSource.value.sort((a, b) =>
        a.value.localeCompare(b.value)
      )
    }, 500)
  })
  const result = await gatewayMgmtApi.findAll('TRADE')
  accountOptions.value = result.map((item) => {
    item.value = item.gatewayId
    return item
  })
}
function handleSelect(index) {
  activeIndex.value = index
}
async function accountSelected(val) {
  form.moduleAccountSettingsDescription = []
  if (!val.length) return
  form.moduleAccountSettingsDescription = val.map((item) => {
    return {
      accountGatewayId: item.gatewayId,
      moduleAccountInitBalance: 0,
      bindedContracts: []
    }
  })
  const loadContractsPromise = val.map(item => contractApi.getSubscribedContracts(item.gatewayId))
  bindedContractsOptions.value = await Promise.all(loadContractsPromise)
}
async function saveSetting(reset) {
  let pass =
    assertTrue(form.moduleName, '未指定模组名称') &&
    assertTrue(form.type, '未指定模组类型') &&
    assertTrue(form.numOfMinPerBar, '未指定K线周期') &&
    assertTrue(form.strategySetting.componentMeta.name, '未指定交易策略') &&
    assertTrue(form.moduleAccountSettingsDescription.length, '未指定交易账户')

  if (!pass) {
    throw new Error('校验不通过')
  }
  form.moduleAccountSettingsDescription.forEach((desc) => {
    if (!desc.bindedContracts.length) {
      const errMsg = `账户【${desc.accountGatewayId}】未关联合约`
      throw new Error(errMsg)
    }
  })

  const obj = JSON.parse(JSON.stringify(form))
  loading.value = true
  try {
    if (isUpdateMode.value) {
      await moduleApi.updateModule(obj, reset)
    } else {
      await moduleApi.insertModule(obj)
    }
  } finally {
    loading.value = false
  }

  emit('onSave', obj)
}
async function saveSettingAndClose(reset) {
  saveSetting(reset)
    .then(close)
    .catch((e) => ElMessage.error(e.message))
}
function saveSettingAndMore() {
  saveSetting(false).catch((e) => ElMessage.error(e.message))
}
function close() {
  emit('update:visible', false)
  activeIndex.value = '1'
}
function copyModule() {
  const protoModule = Object.assign({}, props.module)

  emit('copyModule')
  form = protoModule
  form.moduleName = ''
}
function assertTrue(expression, errMsg) {
  if (!expression) {
    ElMessage.error(errMsg)
    return false
  }
  return true
}
watch(() => props.visible, async (val) => {
  if (val) {
    // TODO fixme
    // Object.assign(this.$data, this.$options.data())
    showDemoStrategy.value = isUpdateMode.value
    await initData()
    isMobile = listener.isMobile()
    if (!props.module) {
      return
    }
    form = props.module
    form.strategySetting.value = form.strategySetting.componentMeta.name
    const selectedAcc = props.module.moduleAccountSettingsDescription.map((item) => accountOptions.value.filter(acc => acc.gatewayId === item.accountGatewayId)[0])
    const loadContractsPromise = selectedAcc.map(item => contractApi.getSubscribedContracts(item.gatewayId))
    bindedContractsOptions.value = await Promise.all(loadContractsPromise)
    const selectedAccounts = props.module.moduleAccountSettingsDescription.map(item => item.accountGatewayId)
    choseAccounts.value = accountOptions.value.filter(item => selectedAccounts.indexOf(item.gatewayId) >= 0)
  }
})
watch(() => 'form.usage', (val) => {
  if (val === 'PLAYBACK') {
    form.weeksOfDataForPreparation = 0
  }
  if (val === 'PLAYBACK' || val === 'UAT') {
    form.closingPolicy = 'FIRST_IN_FIRST_OUT'
  }
})

</script>

<style scoped>
.main-compact {
  padding-bottom: 0px;
}

.module-dialog {
  min-width: 376px;
}

.module-form .el-input,
.module-form .el-select {
  width: 200px;
}

.value-unit {
  /* font-size: 16px; */
  padding-left: 5px;
}

.module-form .with-unit {
  width: 100px;
}
</style>
<style>
.el-form--label-top .el-form-item__label {
  padding: 0;
}
</style>
