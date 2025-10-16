// src/api/axiosInstance.ts
import axios from 'axios'
// import { Base64 } from 'js-base64';

// 可以在这里改统一前缀，例如 '/api'、'/backend/api' 等
const BASE_API_PREFIX = 'http://172.19.237.114:8080/api'

// 如果你用环境变量，可以改成：
// const BASE_API_PREFIX = import.meta.env.VITE_API_BASE_URL || '/api'

const axiosInstance = axios.create({
    baseURL: BASE_API_PREFIX,
    timeout: 5000,
})

// ✅ 请求拦截器（可选）
axiosInstance.interceptors.request.use(
    config => {
        // 可以在这里统一添加 token 等
        // const token = localStorage.getItem('token')
        // let token = Base64.encode('root:root')
        // config.headers.Authorization = `Basic ${token}`
        return config
    },
    error => Promise.reject(error)
)

// ✅ 响应拦截器（可选）
// axiosInstance.interceptors.response.use(
//     response => response,
//     error => Promise.reject(error)
// )

export default axiosInstance
