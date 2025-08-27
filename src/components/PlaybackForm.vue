<template>
  <el-dialog width="520px" title="历史回放网关配置" :model-value="visible" append-to-body :close-on-click-modal="false"
    :show-close="false" destroy-on-close>
    <el-form ref="playbackSettings" :model="playbackSettings" label-width="100px" width="200px" :rules="formRules">
      <el-form-item label="预热起始日">
        <el-date-picker style="width: 193px" v-model="preStartDate" type="date" placeholder="请选择">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="回放日期" prop="dateRange">
        <el-date-picker v-model="playbackSettings.dateRange" type="daterange" align="left" unlink-panels
          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="回放精度" prop="precision">
        <el-select v-model="playbackSettings.precision">
          <el-option label="极低（每分钟1个TICK）" value="LITE" key="0"></el-option>
          <el-option label="低（每分钟4个TICK）" value="LOW" key="1"></el-option>
          <el-option label="中（每分钟30个TICK）" value="MEDIUM" key="2"></el-option>
          <el-option label="高（每分钟120个TICK）" value="HIGH" key="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="回放速度" prop="speed">
        <el-select v-model="playbackSettings.speed">
          <el-option label="正常" value="NORMAL" key="1"></el-option>
          <el-option label="快速" value="SPRINT" key="2"></el-option>
          <el-option label="极速" value="RUSH" key="3"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template v-slot:footer>
      <div class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="savePlaybackSetting">保 存</el-button>
      </div>
    </template>

  </el-dialog>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import moment from 'moment'
import { ref, reactive, watch } from 'vue'
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  playbackSettingsSrc: {
    type: Object,
    default: () => { }
  },
  subscribedContracts: {
    type: Array,
    default: () => []
  }
})
let formRules = reactive({
  dateRange: [{ required: true, message: '不能为空', trigger: 'blur' }],
  precision: [{ required: true, message: '不能为空', trigger: 'blur' }],
  speed: [{ required: true, message: '不能为空', trigger: 'blur' }],
  playContracts: [{ required: true, message: '不能为空', trigger: 'blur' }]
})
let pickerOptions = reactive({
  shortcuts: [
    {
      text: '最近一周',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '最近一个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '最近三个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        picker.$emit('pick', [start, end])
      }
    }
  ]
})
let preStartDate = ref('')
let playbackSettings = reactive({
  preStartDate: '',
  dateRange: '',
  startDate: '',
  endDate: '',
  precision: '',
  speed: '',
  playContracts: []
})
let isUpdateMode = ref(false)
watch(() => props.visible, (val) => {
  if (val) {
    if (props.playbackSettingsSrc) {
      isUpdateMode.value = Object.keys(props.playbackSettingsSrc).length > 0
    }
    if (!props.playbackSettingsSrc) {
      return
    }
    Object.assign(playbackSettings, props.playbackSettingsSrc)
    playbackSettings.dateRange = [
      moment(props.playbackSettingsSrc.startDate, 'YYYYMMDD').toDate(),
      moment(props.playbackSettingsSrc.endDate, 'YYYYMMDD').toDate()
    ]
    preStartDate.value = moment(props.playbackSettingsSrc.preStartDate, 'YYYYMMDD').toDate()
  }
})
watch(() => 'playbackSettings.playContracts', (val) => {
  if (val.length >= 10) {
    val.length = 10
  }
})
const emit = defineEmits(['update:visible', 'onSave'])
function close() {
  emit('update:visible', false)
}
function savePlaybackSetting() {
  playbackSettings.validate((valid) => {
    if (valid) {
      const [start, end] = playbackSettings.dateRange
      const startDate = moment(start)
      const preStartDateLocal = moment(preStartDate.value || start)
      if (preStartDateLocal.isAfter(startDate)) {
        ElMessage.error('预热起始日不能晚于' + startDate.format('yyyy-MM-DD'))
        return
      }
      playbackSettings.startDate = startDate.format('yyyyMMDD')
      playbackSettings.endDate = moment(end).format('yyyyMMDD')
      playbackSettings.preStartDate = preStartDate.format('yyyyMMDD')
      let obj = {}
      Object.assign(obj, playbackSettings)
      emit('onSave', obj)
      close()
    }
  })
}

</script>

<style>
.el-range-input {
  background-color: inherit;
}

.el-date-table td.in-range div,
.el-date-table td.in-range div:hover,
.el-date-table.is-week-mode .el-date-table__row.current div,
.el-date-table.is-week-mode .el-date-table__row:hover div {
  background-color: rgba(20, 20, 20, 0.4);
}
</style>
