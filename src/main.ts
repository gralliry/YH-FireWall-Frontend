import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './style.css'

import App from './App.vue'
import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'
// 导入 ElementPlus 暗黑模式的样式
import 'element-plus/theme-chalk/dark/css-vars.css'

createApp(App).use(ElementPlus).use(createPinia()).mount('#app')
