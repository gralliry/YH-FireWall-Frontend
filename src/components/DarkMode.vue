<script setup>
// 引入VueUse暗黑模式核心
import { useDark, useToggle } from '@vueuse/core'

// 初始化暗黑模式检测器
const isDark = useDark()
// 生成切换函数（类型安全）
const toggleDark = useToggle(isDark)
</script>

<template>
    <el-button @click="toggleDark()" class="theme-toggle" style="border: none;"
        :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`">
        {{ isDark ? '🌙' : '☀️' }}
    </el-button>
</template>

<style scoped>
/* 通过CSS变量实现主题映射 */
:root {
    --bg-color: #ffffff;
    --text-color: #2c3e50;
}

.dark {
    --bg-color: #1a1a1a;
    --text-color: #f0f0f0;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
}
</style>