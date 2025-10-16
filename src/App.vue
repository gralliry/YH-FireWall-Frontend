<style scoped lang="less">
.wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;

    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow: hidden;
}

.header {
    height: 40px;
    flex-shrink: 0;
    text-align: center;

    .header-content {
        display: flex;
        align-items: center;
        justify-content: center;
        /* 先让整体居中 */
        position: relative;
        /* 为右侧绝对定位做基础 */
        height: 100%;
    }

    /* 标题居中 */
    .header-title {
        margin: 0;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

    /* 右侧暗黑模式切换按钮 */
    .header-right {
        position: absolute;
        right: 10px;
    }
}

.main {
    width: 100%;
    display: flex;
    overflow: hidden;

    .main-nav {
        width: 150px;
        overflow-y: auto;
    }

    .main-content {
        width: 100%;
        overflow: auto;
    }
}

.footer {
    height: 40px;
    flex-shrink: 0;
    text-align: center;
}
</style>

<template>
    <div class="wrapper">
        <el-header class="header">
            <div class="header-content">
                <h3 class="header-title">YH Firewall Web Manager</h3>
                <div class="header-right">
                    <DarkMode />
                </div>
            </div>
        </el-header>

        <el-main class="main">
            <!-- 左侧导航菜单 -->
            <el-menu class="main-nav" default-active="rule" router :unique-opened="true" @select="handleMenuSelect">
                <el-menu-item index="rule">Rule</el-menu-item>
                <el-menu-item index="connection">Connection</el-menu-item>
                <el-menu-item index="interface">Interface</el-menu-item>
                <el-menu-item index="config">Config</el-menu-item>
            </el-menu>
            <!-- 右侧内容区 -->
            <div class="main-content">
                <RuleTable v-show="activeMenu === 'rule'" />
                <ConnectionTable v-show="activeMenu === 'connection'" />
                <InterfaceTable v-show="activeMenu === 'interface'" />
                <ConfigArea v-show="activeMenu === 'config'" />
            </div>
        </el-main>

        <el-footer class="footer">© 2025 梁建烨. All rights reserved.</el-footer>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
//
import RuleTable from '@/views/RuleTable.vue'
import ConnectionTable from '@/views/ConnectionTable.vue'
import InterfaceTable from '@/views/InterfaceTable.vue'
import ConfigArea from '@/views/ConfigArea.vue'
// 
import DarkMode from '@/components/DarkMode.vue'

const activeMenu = ref('rule')

const handleMenuSelect = (index: string) => {
    activeMenu.value = index
}
</script>
