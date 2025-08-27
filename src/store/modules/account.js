import { defineStore } from 'pinia'

const getFromFactory = () => ({
    lastUpdateTime: 0,
    account: {},
    positions: {},
    orders: {},
    transactions: {}
})

export const useAccountStore = defineStore('account', {
    state: () => ({
        curAccountId: '',
        curInfo: getFromFactory()
    }),

    getters: {
        getAccountById: (state) => (gatewayId) => {
            return state[gatewayId] || {}
        },
        isAccountConnected: (state) => (gatewayId) => {
            if (!state[gatewayId]) return false
            return new Date().getTime() - state[gatewayId].lastUpdateTime < 15000
        }
    },

    actions: {
        updateCurAccountId(id) {
            this.curAccountId = id
            if (this[id]) {
                this.curInfo = this[id]
            } else {
                this.curInfo = getFromFactory()
            }
        },

        updateAccount(acc) {
            const gatewayId = acc.gatewayid
            if (!this[gatewayId]) this[gatewayId] = getFromFactory()
            this[gatewayId].account = acc
            this[gatewayId].lastUpdateTime = Date.now()

            if (gatewayId === this.curAccountId) {
                this.curInfo.account = acc
            }
        },

        updatePosition(pos) {
            const gatewayId = pos.gatewayid
            if (!this[gatewayId]) this[gatewayId] = getFromFactory()
            this[gatewayId].positions[pos.positionid] = pos

            if (gatewayId === this.curAccountId) {
                this.curInfo.positions = { ...this[gatewayId].positions }
            }
        },

        updateTrade(trade) {
            const gatewayId = trade.gatewayid
            if (!this[gatewayId]) this[gatewayId] = getFromFactory()
            this[gatewayId].transactions[trade.tradeid] = trade

            if (gatewayId === this.curAccountId) {
                this.curInfo.transactions = { ...this[gatewayId].transactions }
            }
        },

        updateOrder(order) {
            const gatewayId = order.gatewayid
            if (!this[gatewayId]) this[gatewayId] = getFromFactory()
            this[gatewayId].orders[order.orderid] = order

            if (gatewayId === this.curAccountId) {
                this.curInfo.orders = { ...this[gatewayId].orders }
            }
        },

        resetAccountModule() {
            // 重置当前账户信息
            this.curAccountId = ''
            this.curInfo = getFromFactory()
            console.log('重置 account 模块')
        }
    }
})
