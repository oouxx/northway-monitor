import { defineStore } from "pinia";
const getFromFactory = () => {
    return {
        lastUpdateTime: 0,
        account: {},
        positions: {},
        orders: {},
        transactions: {}
    }
}
export const useAccountStore = defineStore('account', {
    state: () => ({
        curAccountId: '',
        curInfo: {
            account: {},
            positions: {},
            orders: {},
            transactions: {}
        }
    }),
    actions: {
        updateCurAccountId(state, id) {
            state.curAccountId = id
            if (state[id]) {
                state.curInfo = state[id]
            } else {
                state.curInfo = getFromFactory()
            }
        },
        updateAccount(state, acc) {
            let gatewayId = acc.gatewayid
            if (!state[gatewayId]) {
                state[gatewayId] = getFromFactory()
            }
            state[gatewayId].account = acc
            state[gatewayId].lastUpdateTime = new Date().getTime()
            if (gatewayId === state.curAccountId) {
                state.curInfo.account = acc
            }
        },
        updatePosition(state, pos) {
            let gatewayId = pos.gatewayid
            if (!state[gatewayId]) {
                state[gatewayId] = getFromFactory()
            }
            state[gatewayId].positions[pos.positionid] = pos
            if (gatewayId === state.curAccountId) {
                state.curInfo.positions = Object.assign({}, state[gatewayId].positions)
            }
        },
        updateTrade(state, trade) {
            let gatewayId = trade.gatewayid
            if (!state[gatewayId]) {
                state[gatewayId] = getFromFactory()
            }
            state[gatewayId].transactions[trade.tradeid] = trade
            if (gatewayId === state.curAccountId) {
                state.curInfo.transactions = Object.assign(
                    {},
                    state[gatewayId].transactions
                )
            }
        },
        updateOrder(state, order) {
            let gatewayId = order.gatewayid
            if (!state[gatewayId]) {
                state[gatewayId] = getFromFactory()
            }
            state[gatewayId].orders[order.orderid] = order
            if (gatewayId === state.curAccountId) {
                state.curInfo.orders = Object.assign({}, state[gatewayId].orders)
            }
        },
        resetAccountModule(state) {
            // TODO fix resetAccountModule
            // Object.assign(state, useAccountStore.state())
        }
    },
    getters: {
        getAccountById: (state) => (gatewayId) => {
            return state[gatewayId] || {}
        },
        isAccountConnected: (state) => (gatewayId) => {
            if (!state[gatewayId]) {
                return false
            }
            return new Date().getTime() - state[gatewayId].lastUpdateTime < 15000
        }
    }

})