import { createPinia } from 'pinia'
import { useAccountStore } from '@/store/modules/account'
import { useContractStore } from '@/store/modules/contract'
import { useMarketCurrentDataStore } from '@/store/modules/marketCurrentData'
import { useModuleInfoStore } from '@/store/modules/moduleInfo'
const store = createPinia()

export { store, useAccountStore, useContractStore, useMarketCurrentDataStore, useModuleInfoStore }

