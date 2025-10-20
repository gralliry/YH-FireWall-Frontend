<template>
    <el-table :data="processData" v-loading="loading" stripe highlight-current-row>
        <el-table-column label="Fd" prop="fd" align="center" width="80" sortable />
        <el-table-column label="Type" align="center" width="100">
            <template #default="{ row }">
                {{ type2str[row.type as 1 | 2] }}({{ family2str[row.family as 2 | 10] }})
            </template>
        </el-table-column>
        <el-table-column label="PID" prop="pid" align="center" width="100" sortable />
        <el-table-column label="Exe" prop="exe" align="center" sortable show-overflow-tooltip />
        <el-table-column label="Name" prop="name" align="center" width="100" />
        <el-table-column label="User" prop="username" align="center" width="100" />
        <el-table-column label="LocalAddr" show-overflow-tooltip>
            <template #default="{ row }">
                <span v-if="row.family === 2">{{ row.localIP }}:{{ row.localPort }}</span>
                <span v-else-if="row.family === 10">[{{ row.localIP }}]:{{ row.localPort }}</span>
            </template>
        </el-table-column>
        <el-table-column label="RemoteAddr" show-overflow-tooltip>
            <template #default="{ row }">
                <span v-if="row.family === 2">{{ row.remoteIP }}:{{ row.remotePort }}</span>
                <span v-else-if="row.family === 10">[{{ row.remoteIP }}]:{{ row.remotePort }}</span>
            </template>
        </el-table-column>
        <el-table-column label="Status" prop="status" width="120" />
        <!-- Action -->
        <el-table-column label="Action" align="center" width="90">
            <template #default="{ $index, row }">
                <el-button size="small" type="danger" @click="handleClose($index, row)"
                    v-if="row.status === 'ESTABLISHED' && row.type === 1">
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

const type2str = {
    1: "TCP",
    2: "UDP",
} as const;

const family2str = {
    2: "v4",
    10: "v6",
} as const;

interface Process {
    fd: number
    family: 2 | 10
    type: 1 | 2
    pid: number
    exe: string
    name: string
    username: string
    localIP: string
    localPort: number
    remoteIP: string
    remotePort: number
    status: string
}

const processData = ref<Process[]>([])

const loading = ref(false)

function handleGetProcesses() {
    loading.value = true
    axiosInstance.get('/process').then(res => {
        processData.value = res.data
        ElMessage.success('Process list refreshed')
    }).catch(err => {
        processData.value = []
        ElMessage.error(err)
    }).finally(() => {
        loading.value = false
    })
}

function handleClose(index: number, row: Process) {
    axiosInstance.delete(`/process/${row.pid}/${row.fd}`).then(() => {
        processData.value.splice(index, 1)
        ElMessage.success('Process closed')
    }).catch(err => {
        ElMessage.error(err.response.data)
    })
}

onActivated(() => {
    handleGetProcesses()
})


</script>