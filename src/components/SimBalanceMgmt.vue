<template>
  <el-dialog width="300px" title="模拟网关出入金" v-if="visible" append-to-body @close="onClose">
    <el-row>
      <el-col :span="24">
        <span class="row-lh">账户ID：{{ simGatewayId }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <span class="row-lh">账户余额： {{ accountingFormatter(accountBalance || 0) }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <span class="row-lh">账户可用金额： {{ accountingFormatter(accountAvailable || 0) }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
        <span class="row-lh">出入金额：</span>
      </el-col>
      <el-col :span="17">
        <el-input v-model="money" clearable type="number" />
      </el-col>
    </el-row>
    <template v-slot:footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="moneyIO">出入金</el-button>
      </div>
    </template>

  </el-dialog>
</template>

<script setup>
import gatewayMgmtApi from '@/api/gatewayMgmtApi'
import numberFilter from '@/filter/number-filter'

import { useAccountStore } from '@/store/modules/account'
import { ref, watch, onMounted } from 'vue'
let accountingFormatter = numberFilter.accountingFormatter
const emit = defineEmits(['update:visible'])
const accountStore = useAccountStore()
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  simGatewayId: {
    type: String,
    default: ''
  }
})
let money = ref('')
let accountBalance = ref('')
let accountAvailable = ref('')
watch(() => props.visible, (val) => {
  if (val) {
    moneyIO()
    updateAmount()
  }
})
onMounted(() => {
  updateAmount()
})

function onClose() {
  emit('update:visible', false)
}
async function moneyIO() {
  console.log(props.simGatewayId)
  await gatewayMgmtApi.moneyIO(props.simGatewayId, money.value || 0)
  money.value = ''
  setTimeout(() => {
    updateAmount()
  }, 600)
}
function updateAmount() {
  accountBalance.value = accountStore.getAccountById(props.simGatewayId).account?.balance
  accountAvailable.value = accountStore.getAccountById(
    props.simGatewayId
  ).account?.available
}

</script>

<style>
.row-lh {
  line-height: 32px;
}
</style>
