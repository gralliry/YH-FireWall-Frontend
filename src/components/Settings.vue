<template>
    <el-form :model="config">
        <el-form-item label="Core Http Address" label-width="180">
            <el-input v-model="config.address" />
        </el-form-item>
        <el-form-item label="Core Http Token" label-width="180">
            <el-input v-model="config.token" />
        </el-form-item>

    </el-form>
    <el-button type="primary" @click="handleTest">
        Test
    </el-button>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'

import { setConfig, axiosInstance } from '@/api/instance'

const config = reactive({
    address: 'http://172.19.237.114:8080/api',
    token: 'token'
})

onMounted(() => {
    setConfig(config.address, config.token)
})

watch(config, () => {
    setConfig(config.address, config.token)
})

function handleTest() {
    axiosInstance.get('/ping').then(() => {
        ElMessage.success('Test successful')
    }).catch((err) => {
        ElMessage.error(err)
    })
}

</script>