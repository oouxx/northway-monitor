<template>
  <div class="ns-price-board">
    <div class="ns-price-board__row" role="ask5">
      <div class="ns-price-board__cell ns-price-board__cell--left"></div>
      <div class="ns-price-board__cell ns-price-board__cell--mid">
        {{ askPrice4 }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--right">
        {{ askVol[4] }}
      </div>
    </div>
    <div class="ns-price-board__row" role="ask4">
      <div class="ns-price-board__cell ns-price-board__cell--left"></div>
      <div class="ns-price-board__cell ns-price-board__cell--mid">
        {{ askPrice3 }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--right">
        {{ askVol[3] }}
      </div>
    </div>
    <div class="ns-price-board__row" role="ask3">
      <div class="ns-price-board__cell ns-price-board__cell--left"></div>
      <div class="ns-price-board__cell ns-price-board__cell--mid">
        {{ askPrice2 }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--right">
        {{ askVol[2] }}
      </div>
    </div>
    <div class="ns-price-board__row" role="ask2">
      <div class="ns-price-board__cell ns-price-board__cell--left"></div>
      <div class="ns-price-board__cell ns-price-board__cell--mid">
        {{ askPrice1 }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--right">
        {{ askVol[1] }}
      </div>
    </div>
    <div class="ns-price-board__row" role="ask1">
      <div class="ns-price-board__cell ns-price-board__cell--left"></div>
      <div class="ns-price-board__cell ns-price-board__cell--mid">
        {{ askPrice0 }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--right">
        {{ askVol[0] }}
      </div>
    </div>
    <div class="ns-price-board__row ns-price-board__row--highlight" role="latest">
      <div class="ns-price-board__cell ns-price-board__cell--left">
        {{ volume }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--mid">
        {{ lastPrice.toFixed(precision) }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--right">
        {{ volume }}
      </div>
    </div>
    <div class="ns-price-board__row" role="bid1">
      <div class="ns-price-board__cell ns-price-board__cell--left">
        {{ bidVol[0] }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--mid">
        {{ bidPrice0 }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--right"></div>
    </div>
    <div class="ns-price-board__row" role="bid2">
      <div class="ns-price-board__cell ns-price-board__cell--left">
        {{ bidVol[1] }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--mid">
        {{ bidPrice1 }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--right"></div>
    </div>
    <div class="ns-price-board__row" role="bid3">
      <div class="ns-price-board__cell ns-price-board__cell--left">
        {{ bidVol[2] }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--mid">
        {{ bidPrice2 }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--right"></div>
    </div>
    <div class="ns-price-board__row" role="bid4">
      <div class="ns-price-board__cell ns-price-board__cell--left">
        {{ bidVol[3] }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--mid">
        {{ bidPrice3 }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--right"></div>
    </div>
    <div class="ns-price-board__row" role="bid5">
      <div class="ns-price-board__cell ns-price-board__cell--left">
        {{ bidVol[4] }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--mid">
        {{ bidPrice4 }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--right"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
const props = defineProps({
  tick: {
    type: Object,
    default: () => { }
  },
  precision: {
    type: Number,
    default: 0
  }
})
let askPrice = ref([0, 0, 0, 0, 0])
let askVol = ref([0, 0, 0, 0, 0])
let bidPrice = ref([0, 0, 0, 0, 0])
let bidVol = ref([0, 0, 0, 0, 0])
let lastPrice = ref(0)
let volume = ref(0)
watch(props.tick, (val) => {
  askVol.value = val.askvolumeList
  askPrice.value = val.askpriceList
  bidPrice.value = val.bidpriceList
  bidVol.value = val.bidvolumeList
  lastPrice.value = val.lastprice
  volume.value = val.volumedelta
})
let askPrice4 = computed(() => {
  if (isNaN(askPrice.value[4])) {
    return askPrice.value[4]
  }
  return askPrice.value[4].toFixed(props.precision)
})
let askPrice3 = computed(() => {
  if (isNaN(askPrice.value[3])) {
    return askPrice.value[3]
  }
  return askPrice.value[3].toFixed(props.precision)
})
let askPrice2 = computed(() => {
  if (isNaN(askPrice.value[2])) {
    return askPrice.value[2]
  }
  return askPrice.value[2].toFixed(props.precision)
})
let askPrice1 = computed(() => {
  if (isNaN(askPrice.value[1])) {
    return askPrice.value[1]
  }
  return askPrice.value[1].toFixed(props.precision)
})
let askPrice0 = computed(() => {
  if (isNaN(askPrice.value[0])) {
    return askPrice.value[0]
  }
  return askPrice.value[0].toFixed(props.precision)
})

let bidPrice0 = computed(() => {
  if (isNaN(bidPrice.value[0])) {
    return bidPrice.value[0]
  }
  return bidPrice.value[0].toFixed(props.precision)
})
let bidPrice1 = computed(() => {
  if (isNaN(bidPrice.value[1])) {
    return bidPrice.value[1]
  }
  return bidPrice.value[1].toFixed(props.precision)
})
let bidPrice2 = computed(() => {
  if (isNaN(bidPrice.value[2])) {
    return bidPrice.value[2]
  }
  return bidPrice.value[2].toFixed(props.precision)
})
let bidPrice3 = computed(() => {
  if (isNaN(bidPrice.value[3])) {
    return bidPrice.value[3]
  }
  return bidPrice.value[3].toFixed(props.precision)
})
let bidPrice4 = computed(() => {
  if (isNaN(bidPrice.value[4])) {
    return bidPrice.value[4]
  }
  return bidPrice.value[4].toFixed(props.precision)
})

</script>

<style>
.ns-price-board {
  font-size: 8px;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: rgba(20, 20, 20, 0.4);
  color: lightgray;
}

.ns-price-board__row {
  display: flex;
  width: 100%;
  height: 100%;
}

.ns-price-board__cell {
  width: 100%;
  height: 100%;
  text-align: center;
}

.ns-price-board__row--highlight {
  border-top: 1px solid rgb(206, 48, 48);
  border-bottom: 1px solid rgb(206, 48, 48);
  font-weight: bolder;
  font-size: 14px;
}
</style>
