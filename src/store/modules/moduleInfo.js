import { defineStore } from 'pinia'

export const useModuleInfoStore = defineStore('moduleInfo', {
    state: () => ({
        list: []
    }),

    getters: {
        moduleList: (state) => state.list,
        module: (state) => (moduleName) => state.list.find(item => item.moduleName === moduleName)
    },

    actions: {
        updateList(val) {
            this.list = val
        }
    }
})
