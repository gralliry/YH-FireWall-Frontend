// src/api
import axiosInstance from './instance'

export const getRules = () => axiosInstance.get('/rule').then(res => res.data)
export const createRule = (data: object) => axiosInstance.post('/rule', data).then(res => res.data)
export const updateRule = (id: string, data: object) => axiosInstance.put(`/rule/${id}`, data).then(res => res.data)
export const deleteRule = (id: string) => axiosInstance.delete(`/rule/${id}`).then(res => res.data)
export const enableRule = (id: string) => axiosInstance.put(`/rule/${id}/enable`).then(res => res.data)
export const disableRule = (id: string) => axiosInstance.put(`/rule/${id}/disable`).then(res => res.data)
export const getConfig = () => axiosInstance.get('/config').then(res => res.data)
export const setConfig = (data: object) => axiosInstance.post('/config', data).then(res => res.data)
