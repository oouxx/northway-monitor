import { defineStore } from "pinia";

export const useModuleInfoStore = defineStore('moduleInfo', {
    state: () => ({
        list: []
    }),
    actions: {
        updateList: (state, val) => {
            state.list = val
        }
    },
    getters: {
        moduleList: (state) => {
            return state.list
        },
        module: (state) => (moduleName) => {
            return state.list.find(item => item.moduleName === moduleName)
        }
    }
})