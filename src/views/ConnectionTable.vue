<template>
    <el-table :data="connectionData" stripe highlight-current-row>
        <el-table-column label="Type" align="center">
            <template #default="{ row }">
                {{ type2protocol[row.type as 1 | 2] }}
            </template>
        </el-table-column>
        <el-table-column label="PID" prop="pid" align="center" sortable />
        <el-table-column label="Name" prop="name" align="center" />
        <el-table-column label="User" prop="username" align="center" />
        <el-table-column label="LocalAddr" prop="localaddr" />
        <el-table-column label="RemoteAddr" prop="remoteaddr" />
        <el-table-column label="Status" prop="status" />
    </el-table>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axiosInstance from '@/api/instance'
import { ElMessage } from 'element-plus'

const type2protocol = {
    1: "TCP",
    2: "UDP",
} as const;

interface Interface {
    type: 1 | 2
    pid: number
    name: string
    username: string
    localaddr: string
    remoteaddr: string
    status: string
}

const connectionData = ref<Interface[]>([])

const handleGetConnections = () => {
    axiosInstance.get('/connection').then(res => {
        connectionData.value = res.data
        ElMessage.success('Connection list refreshed')
    }).catch(err => {
        ElMessage.error('Failed to fetch connections: ' + err)
    })
}

onMounted(() => {
    handleGetConnections()
})


</script>