import { defineStore } from 'pinia'

export const useMarketCurrentDataStore = defineStore('marketCurrentData', {
    state: () => ({
        curMarketGatewayId: '',
        curUnifiedSymbol: '',
        curRoomId: '',
        curTick: {
            askpriceList: [0, 0, 0, 0, 0],
            askvolumeList: [0, 0, 0, 0, 0],
            bidpriceList: [0, 0, 0, 0, 0],
            bidvolumeList: [0, 0, 0, 0, 0],
            lastprice: 0,
            volumedelta: 0
        },
        lastBar: null,
        curBar: null
    }),

    getters: {
        getCurMarketGatewayId: (state) => state.curMarketGatewayId,
        getCurUnifiedSymbol: (state) => state.curUnifiedSymbol,
        getCurTick: (state) => state.curTick
    },

    actions: {
        resetMarketCurrentDataModule() {
            Object.assign(this, {
                curMarketGatewayId: '',
                curUnifiedSymbol: '',
                curRoomId: '',
                curTick: {
                    askpriceList: [0, 0, 0, 0, 0],
                    askvolumeList: [0, 0, 0, 0, 0],
                    bidpriceList: [0, 0, 0, 0, 0],
                    bidvolumeList: [0, 0, 0, 0, 0],
                    lastprice: 0,
                    volumedelta: 0
                },
                lastBar: null,
                curBar: null
            })
            console.log('重置 marketCurrentDataModule')
        },

        updateFocusMarketGatewayId(gatewayId) {
            this.curMarketGatewayId = gatewayId
            this.curUnifiedSymbol = ''
            this.lastBar = null
            this.curBar = null
            console.log('当前 curMarketGatewayId', gatewayId)
        },

        updateFocusUnifiedSymbol(unifiedsymbol) {
            this.curTick = {
                askpriceList: [0, 0, 0, 0, 0],
                askvolumeList: [0, 0, 0, 0, 0],
                bidpriceList: [0, 0, 0, 0, 0],
                bidvolumeList: [0, 0, 0, 0, 0],
                lastprice: 0,
                volumedelta: 0
            }
            this.lastBar = null
            this.curBar = null
            this.curUnifiedSymbol = unifiedsymbol
            this.curRoomId = `${unifiedsymbol}@${this.curMarketGatewayId}`
            console.log('当前 curUnifiedSymbol', unifiedsymbol)
            console.log('当前 ws 房间ID：' + this.curRoomId)
        },

        updateTick(tick) {
            if (this.curMarketGatewayId !== tick.gatewayid || this.curUnifiedSymbol !== tick.unifiedsymbol) {
                return
            }

            this.curTick = tick

            if (!this.lastBar) {
                this.lastBar = {
                    openprice: tick.lastprice,
                    closeprice: tick.lastprice,
                    openinterest: tick.openinterest,
                    volumedelta: tick.volumedelta
                }
            }

            if (this.curBar) {
                this.curBar = {
                    openprice: this.lastBar.closeprice,
                    closeprice: tick.lastprice,
                    highprice: Math.max(tick.lastprice, this.curBar.highprice),
                    lowprice: Math.min(tick.lastprice, this.curBar.lowprice),
                    volumedelta: tick.volumedelta + this.curBar.volumedelta,
                    openinterestdelta: tick.openinterestdelta + this.curBar.openinterestdelta,
                    actiontimestamp: tick.actiontimestamp - (tick.actiontimestamp % 60000) + 60000
                }
            } else {
                this.curBar = {
                    openprice: this.lastBar.closeprice,
                    closeprice: tick.lastprice,
                    highprice: tick.lastprice,
                    lowprice: tick.lastprice,
                    volumedelta: tick.volumedelta,
                    openinterestdelta: tick.openinterestdelta,
                    actiontimestamp: tick.actiontimestamp - (tick.actiontimestamp % 60000) + 60000
                }
            }
        },

        updateBar(bar) {
            if (this.curMarketGatewayId !== bar.gatewayid || this.curUnifiedSymbol !== bar.unifiedsymbol) return
            this.lastBar = bar
            this.curBar = null
        }
    }
})
