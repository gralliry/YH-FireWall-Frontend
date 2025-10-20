import { createRouter, createWebHistory } from 'vue-router'

// 引入页面组件
import RuleTable from '@/components/RuleTable.vue'
import ConnectionTable from '@/components/ConnectionTable.vue'
import ProcessTable  from '@/components/ProcessTable.vue'
import InterfaceTable from '@/components/InterfaceTable.vue'
import ConfigArea from '@/components/ConfigArea.vue'
import Settings from '@/components/Settings.vue'

const routes = [
    { path: '/', redirect: '/settings' }, // 默认跳转到 Settings 页面
    { path: '/rule', name: 'Rule', component: RuleTable },
    { path: '/connection', name: 'Connection', component: ConnectionTable },
    { path: '/process', name: 'Process', component: ProcessTable },
    { path: '/interface', name: 'Interface', component: InterfaceTable },
    { path: '/config', name: 'Config', component: ConfigArea },
    { path: '/settings', name: 'Settings', component: Settings },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
