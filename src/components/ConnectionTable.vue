<template>
    <el-table :data="connectionData" v-loading="loading" stripe highlight-current-row>
        <el-table-column label="Fd" prop="fd" align="center" sortable />
        <el-table-column label="Type" align="center">
            <template #default="{ row }">
                {{ type2protocol[row.type as 1 | 2] }}
            </template>
        </el-table-column>
        <el-table-column label="PID" prop="pid" align="center" sortable />
        <el-table-column label="Exe" prop="exe" align="center" sortable show-overflow-tooltip />
        <el-table-column label="Name" prop="name" align="center" />
        <el-table-column label="User" prop="username" align="center" />
        <el-table-column label="LocalAddr" prop="localaddr" />
        <el-table-column label="RemoteAddr" prop="remoteaddr" />
        <el-table-column label="Status" prop="status" />
        <!-- Action -->
        <el-table-column label="Action" align="center" width="200">
            <template #default="{ $index, row }">
                <el-button size="small" type="danger" @click="handleClose($index, row)">
                    Close
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup lang="ts">
import { ref, onActivated } from 'vue';
import { axiosInstance } from '@/api/instance'
import { ElMessage } from 'element-plus'

const type2protocol = {
    1: "TCP",
    2: "UDP",
} as const;

interface Connection {
    fd: number
    type: 1 | 2
    pid: number
    exe: string
    name: string
    username: string
    localaddr: string
    remoteaddr: string
    status: string
}

const connectionData = ref<Connection[]>([])

const loading = ref(false)

const handleGetConnections = () => {
    loading.value = true
    axiosInstance.get('/connection').then(res => {
        connectionData.value = res.data
        ElMessage.success('Connection list refreshed')
    }).catch(err => {
        connectionData.value = []
        ElMessage.error(err)
    }).finally(() => {
        loading.value = false
    })
}

const handleClose = (index: number, row: Connection) => {
    axiosInstance.delete(`/connection/${row.pid}/${row.fd}`).then(() => {
        connectionData.value.splice(index, 1)
        ElMessage.success('Connection closed')
    }).catch(err => {
        ElMessage.error(err.response.data)
    })
}

onActivated(() => {
    handleGetConnections()
})


</script>