import { defineStore } from 'pinia'
import { reactive } from 'vue'

/**
 * 保存合约信息
 */
const PRODUCT_CLASS_TYPE = {
    2: 'FUTURES',
    3: 'OPTION'
}

const convertToInt = (str) => {
    const alphabic = str.replace(/\d+/, '')
    const numeric = str.replace(/[^\d]+/, '')
    let result = ''
    for (let i = 0; i < alphabic.length; i++) {
        result += alphabic.charCodeAt()
    }
    return parseInt(result + numeric)
}

export const useContractStore = defineStore('contract', () => {
    // ---------- state ----------
    const gatewayContractMap = reactive({})

    // ---------- getters ----------
    const findContractBySymbol = (gatewayId, unifiedsymbol) => {
        if (!(gatewayId in gatewayContractMap)) {
            throw new Error('没有找到网关 ' + gatewayId)
        }
        const contractMap = gatewayContractMap[gatewayId]
        for (const type of Object.values(PRODUCT_CLASS_TYPE)) {
            if (contractMap[type].has(unifiedsymbol)) {
                return contractMap[type].get(unifiedsymbol)
            }
        }
        return null
    }

    const findContractsByType = (gatewayId, type) => {
        if (!(gatewayId in gatewayContractMap)) {
            throw new Error('没有找到网关 ' + gatewayId)
        }
        const contractMap = gatewayContractMap[gatewayId][type]
        return [...contractMap.values()].sort(
            (a, b) => convertToInt(a.symbol) - convertToInt(b.symbol)
        )
    }

    // ---------- actions ----------
    function updateContract(contract) {
        const gatewayId = contract.gatewayid
        if (!gatewayContractMap[gatewayId]) {
            gatewayContractMap[gatewayId] = {
                FUTURES: new Map(),
                OPTION: new Map()
            }
        }

        try {
            const type = PRODUCT_CLASS_TYPE[contract.productclass]
            if (type) {
                gatewayContractMap[gatewayId][type].set(contract.unifiedsymbol, contract)
            }
        } catch (e) {
            console.error(e)
            console.warn(contract.productclass)
        }
    }

    return {
        // state
        gatewayContractMap,
        // getters
        findContractBySymbol,
        findContractsByType,
        // actions
        updateContract
    }
})
