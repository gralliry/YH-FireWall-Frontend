<template>
    <el-table :data="connectionData" v-loading="loading" stripe highlight-current-row>
        <el-table-column label="Protocol" align="center">
            <template #default="{ row }">
                {{ protocol2str[row.protocol as 6 | 17] }}({{ family2str[row.family as 2 | 10] }})
            </template>
        </el-table-column>
        <el-table-column label="LocalAddr">
            <template #default="{ row }">
                <span v-if="row.family === 2">{{ row.localIP }}:{{ row.localPort }}</span>
                <span v-else-if="row.family === 10">[{{ row.localIP }}]:{{ row.localPort }}</span>
            </template>
        </el-table-column>
        <el-table-column width="50">
            <template #default="{ row }">
                <span v-if="row.direction === 0"> <- </span>
                        <span v-else-if="row.direction === 1">-></span>
                        <span v-else-if="row.direction === 2"><-></span>
            </template>
        </el-table-column>
        <el-table-column label="RemoteAddr">
            <template #default="{ row }">
                <span v-if="row.family === 2">{{ row.remoteIP }}:{{ row.remotePort }}</span>
                <span v-else-if="row.family === 10">[{{ row.remoteIP }}]:{{ row.remotePort }}</span>
            </template>
        </el-table-column>
        <el-table-column label="EstablishedTime">
            <template #default="{ row }">
                {{ formatTimeAgo(row.establishedTime) }}
            </template>
        </el-table-column>
        <!-- Action -->
        <el-table-column label="Action" align="center" width="90">
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

const protocol2str = {
    6: "TCP",
    17: "UDP",
} as const;

const family2str = {
    2: "v4",
    10: "v6",
} as const;

interface Connection {
    id: string
    protocol: 1 | 2
    family: 2 | 10

    localIP: string
    localPort: number

    direction: 0 | 1 | 2

    remoteIP: string
    remotePort: number

    establishedTime: number
}

const connectionData = ref<Connection[]>([])

const loading = ref(false)

function handleGetConnections() {
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

function handleClose(index: number, row: Connection) {
    axiosInstance.delete(`/connection/${row.id}`).then(() => {
        connectionData.value.splice(index, 1)
        ElMessage.success('Connection closed')
    }).catch(err => {
        ElMessage.error(err.response.data)
    })
}

onActivated(() => {
    handleGetConnections()
})


function formatTimeAgo(timestamp: number): string {
    const now = Math.floor(Date.now() / 1000)
    const diff = now - timestamp

    if (diff < 60) {
        return `${diff}s ago`
    } else if (diff < 3600) {
        const minutes = Math.floor(diff / 60)
        return `${minutes}m ago`
    } else if (diff < 86400) {
        const hours = Math.floor(diff / 3600)
        return `${hours}h ago`
    } else {
        const days = Math.floor(diff / 86400)
        return `${days}d ago`
    }
}


</script>