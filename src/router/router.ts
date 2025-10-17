import { createRouter, createWebHistory } from 'vue-router'

// 引入页面组件
import RuleTable from '@/components/RuleTable.vue'
import ConnectionTable from '@/components/ConnectionTable.vue'
import InterfaceTable from '@/components/InterfaceTable.vue'
import ConfigArea from '@/components/ConfigArea.vue'

const routes = [
  { path: '/', redirect: '/rule' }, // 默认跳转到 Rule
  { path: '/rule', name: 'Rule', component: RuleTable },
  { path: '/connection', name: 'Connection', component: ConnectionTable },
  { path: '/interface', name: 'Interface', component: InterfaceTable },
  { path: '/config', name: 'Config', component: ConfigArea },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
