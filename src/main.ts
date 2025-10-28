import { createApp } from 'vue'

import './style.css'

import App from './App.vue'
import router from '@/router/router.ts'

import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'
// 导入 ElementPlus 暗黑模式的样式
import 'element-plus/theme-chalk/dark/css-vars.css'

import { axiosInstance } from '@/api/instance'

// 获取 URL 参数
const params = new URLSearchParams(window.location.search)
// 自动获取当前协议
const protocol = window.location.protocol.replace(':', '')
const host = params.get('host') || window.location.hostname
const port = params.get('port') || (window.location.port || '80')
const token = params.get('token') || ''

axiosInstance.defaults.baseURL = `${protocol}://${host}:${port}/api`
axiosInstance.defaults.headers.common['Authorization'] = `${token}`
axiosInstance.defaults.timeout = 1000
// 测试用
axiosInstance.defaults.baseURL = 'http://172.19.237.114:8080/api'
axiosInstance.defaults.headers.common['Authorization'] = `token`

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')

// 页面加载后自动跳转到 /rule
router.isReady().then(() => {
    if (router.currentRoute.value.path === '/') {
        router.push('/rule')
    }
})