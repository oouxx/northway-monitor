import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useMarketCurrentDataStore = defineStore('marketCurrentData', () => {
    // ---------- state ----------
    const curMarketGatewayId = ref('')
    const curUnifiedSymbol = ref('')
    const curRoomId = ref('')
    const curTick = reactive({
        askpriceList: [0, 0, 0, 0, 0],
        askvolumeList: [0, 0, 0, 0, 0],
        bidpriceList: [0, 0, 0, 0, 0],
        bidvolumeList: [0, 0, 0, 0, 0],
        lastprice: 0,
        volumedelta: 0
    })
    const lastBar = ref(null)
    const curBar = ref(null)

    // ---------- getters ----------
    const getCurMarketGatewayId = () => curMarketGatewayId.value
    const getCurUnifiedSymbol = () => curUnifiedSymbol.value
    const getCurTick = () => curTick

    // ---------- actions ----------
    function resetMarketCurrentDataModule() {
        curMarketGatewayId.value = ''
        curUnifiedSymbol.value = ''
        curRoomId.value = ''
        Object.assign(curTick, {
            askpriceList: [0, 0, 0, 0, 0],
            askvolumeList: [0, 0, 0, 0, 0],
            bidpriceList: [0, 0, 0, 0, 0],
            bidvolumeList: [0, 0, 0, 0, 0],
            lastprice: 0,
            volumedelta: 0
        })
        lastBar.value = null
        curBar.value = null
        console.log('重置 marketCurrentDataModule')
    }

    function updateFocusMarketGatewayId(gatewayId) {
        curMarketGatewayId.value = gatewayId
        curUnifiedSymbol.value = ''
        lastBar.value = null
        curBar.value = null
        console.log('当前 curMarketGatewayId', gatewayId)
    }

    function updateFocusUnifiedSymbol(unifiedsymbol) {
        Object.assign(curTick, {
            askpriceList: [0, 0, 0, 0, 0],
            askvolumeList: [0, 0, 0, 0, 0],
            bidpriceList: [0, 0, 0, 0, 0],
            bidvolumeList: [0, 0, 0, 0, 0],
            lastprice: 0,
            volumedelta: 0
        })
        lastBar.value = null
        curBar.value = null
        curUnifiedSymbol.value = unifiedsymbol
        curRoomId.value = `${unifiedsymbol}@${curMarketGatewayId.value}`
        console.log('当前 curUnifiedSymbol', unifiedsymbol)
        console.log('当前 ws 房间ID：' + curRoomId.value)
    }

    function updateTick(tick) {
        if (curMarketGatewayId.value !== tick.gatewayid || curUnifiedSymbol.value !== tick.unifiedsymbol) {
            return
        }

        Object.assign(curTick, tick)

        if (!lastBar.value) {
            lastBar.value = {
                openprice: tick.lastprice,
                closeprice: tick.lastprice,
                openinterest: tick.openinterest,
                volumedelta: tick.volumedelta
            }
        }

        if (curBar.value) {
            curBar.value = {
                openprice: lastBar.value.closeprice,
                closeprice: tick.lastprice,
                highprice: Math.max(tick.lastprice, curBar.value.highprice),
                lowprice: Math.min(tick.lastprice, curBar.value.lowprice),
                volumedelta: tick.volumedelta + curBar.value.volumedelta,
                openinterestdelta: tick.openinterestdelta + curBar.value.openinterestdelta,
                actiontimestamp: tick.actiontimestamp - (tick.actiontimestamp % 60000) + 60000
            }
        } else {
            curBar.value = {
                openprice: lastBar.value.closeprice,
                closeprice: tick.lastprice,
                highprice: tick.lastprice,
                lowprice: tick.lastprice,
                volumedelta: tick.volumedelta,
                openinterestdelta: tick.openinterestdelta,
                actiontimestamp: tick.actiontimestamp - (tick.actiontimestamp % 60000) + 60000
            }
        }
    }

    function updateBar(bar) {
        if (curMarketGatewayId.value !== bar.gatewayid || curUnifiedSymbol.value !== bar.unifiedsymbol) return
        lastBar.value = bar
        curBar.value = null
    }

    return {
        // state
        curMarketGatewayId,
        curUnifiedSymbol,
        curRoomId,
        curTick,
        lastBar,
        curBar,
        // getters
        getCurMarketGatewayId,
        getCurUnifiedSymbol,
        getCurTick,
        // actions
        resetMarketCurrentDataModule,
        updateFocusMarketGatewayId,
        updateFocusUnifiedSymbol,
        updateTick,
        updateBar
    }
})
