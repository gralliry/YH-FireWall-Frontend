// src/api/axiosInstance.ts
import axios from 'axios'
import router  from '@/router/router'

// 可以在这里改统一前缀，例如 '/api'、'/backend/api' 等
// const BASE_API_PREFIX = 'http://172.19.237.114:8080/api'

export const axiosInstance = axios.create({
    // baseURL: BASE_API_PREFIX,
    timeout: 5000,
})

// ✅ 请求拦截器（可选）
axiosInstance.interceptors.request.use(
    config => { return config },
    error => { return Promise.reject(error) }
)

// ✅ 响应拦截器（可选）
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // 使用 Vue Router 跳转 // 跳转到首页
            router.push('/');
        }
        return Promise.reject(error);
    }
)

// ✅ 提供动态设置 baseURL 的方法
export function setConfig(url: string, token: string) {
    axiosInstance.defaults.baseURL = url
    axiosInstance.defaults.headers.Authorization = `${token}`
}