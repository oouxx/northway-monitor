import { defineStore } from 'pinia'

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
        result += alphabic.charAt(i).charCodeAt()
    }
    return parseInt(result + numeric)
}

export const useContractStore = defineStore('contract', {
    state: () => ({
        gatewayContractMap: {}
    }),

    getters: {
        findContractBySymbol: (state) => (gatewayId, unifiedsymbol) => {
            if (!(gatewayId in state.gatewayContractMap)) {
                throw new Error('没有找到网关' + gatewayId)
            }
            const contractMap = state.gatewayContractMap[gatewayId]
            for (const type of Object.values(PRODUCT_CLASS_TYPE)) {
                if (contractMap[type].has(unifiedsymbol)) {
                    return contractMap[type].get(unifiedsymbol)
                }
            }
            return null
        },

        findContractsByType: (state) => (gatewayId, type) => {
            if (!(gatewayId in state.gatewayContractMap)) {
                throw new Error('没有找到网关' + gatewayId)
            }
            const contractMap = state.gatewayContractMap[gatewayId][type]
            return [...contractMap.values()].sort(
                (a, b) => convertToInt(a.symbol) - convertToInt(b.symbol)
            )
        }
    },

    actions: {
        updateContract(contract) {
            const gatewayId = contract.gatewayid
            if (!this.gatewayContractMap[gatewayId]) {
                this.gatewayContractMap[gatewayId] = {
                    FUTURES: new Map(),
                    OPTION: new Map()
                }
            }

            try {
                const type = PRODUCT_CLASS_TYPE[contract.productclass]
                if (type) {
                    this.gatewayContractMap[gatewayId][type].set(
                        contract.unifiedsymbol,
                        contract
                    )
                }
            } catch (e) {
                console.error(e)
                console.warn(contract.productclass)
            }
        }
    }
})
