import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

const getFromFactory = () => ({
    lastUpdateTime: 0,
    account: {},
    positions: {},
    orders: {},
    transactions: {}
})

export const useAccountStore = defineStore('account', () => {
    // ---------- state ----------
    const curAccountId = ref('')
    const curInfo = reactive(getFromFactory())
    const accounts = reactive({}) // gatewayId -> accountInfo

    // ---------- getters ----------
    const getAccountById = (gatewayId) => {
        return accounts[gatewayId] || {}
    }

    const isAccountConnected = (gatewayId) => {
        const acc = accounts[gatewayId]
        if (!acc) return false
        return Date.now() - acc.lastUpdateTime < 15000
    }

    // ---------- actions ----------
    function updateCurAccountId(id) {
        curAccountId.value = id
        if (accounts[id]) {
            Object.assign(curInfo, accounts[id]) // 同步到 curInfo
        } else {
            Object.assign(curInfo, getFromFactory())
        }
    }

    function updateAccount(acc) {
        const gatewayId = acc.gatewayId
        if (!accounts[gatewayId]) accounts[gatewayId] = getFromFactory()

        accounts[gatewayId].account = acc
        accounts[gatewayId].lastUpdateTime = Date.now()

        if (gatewayId === curAccountId.value) {
            Object.assign(curInfo, accounts[gatewayId])
        }
    }

    function updatePosition(pos) {
        const gatewayId = pos.gatewayid
        if (!accounts[gatewayId]) accounts[gatewayId] = getFromFactory()

        accounts[gatewayId].positions[pos.positionid] = pos

        if (gatewayId === curAccountId.value) {
            curInfo.positions = { ...accounts[gatewayId].positions }
        }
    }

    function updateTrade(trade) {
        const gatewayId = trade.gatewayid
        if (!accounts[gatewayId]) accounts[gatewayId] = getFromFactory()

        accounts[gatewayId].transactions[trade.tradeid] = trade

        if (gatewayId === curAccountId.value) {
            curInfo.transactions = { ...accounts[gatewayId].transactions }
        }
    }

    function updateOrder(order) {
        const gatewayId = order.gatewayid
        if (!accounts[gatewayId]) accounts[gatewayId] = getFromFactory()

        accounts[gatewayId].orders[order.orderid] = order

        if (gatewayId === curAccountId.value) {
            curInfo.orders = { ...accounts[gatewayId].orders }
        }
    }

    function resetAccountModule() {
        curAccountId.value = ''
        Object.assign(curInfo, getFromFactory())
        for (const key in accounts) delete accounts[key]
        console.log('重置 account 模块')
    }

    return {
        // state
        curAccountId,
        curInfo,
        accounts,
        // getters
        getAccountById,
        isAccountConnected,
        // actions
        updateCurAccountId,
        updateAccount,
        updatePosition,
        updateTrade,
        updateOrder,
        resetAccountModule
    }
})
