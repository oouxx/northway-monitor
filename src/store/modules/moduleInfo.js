import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModuleInfoStore = defineStore('moduleInfo', () => {
    // ---------- state ----------
    const list = ref([])

    // ---------- getters ----------
    const moduleList = () => list.value
    const module = (moduleName) => list.value.find(item => item.moduleName === moduleName)

    // ---------- actions ----------
    function updateList(val) {
        list.value = val
    }

    return {
        // state
        list,
        // getters
        moduleList,
        module,
        // actions
        updateList
    }
})
