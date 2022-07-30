import Storage from './storage'
// 用于操作token
const TOKEN = 'TOUTIAO_TOKEN'
export const setToken = (value) => Storage.set(TOKEN, value)
export const getToken = () => Storage.get(TOKEN)
export const removeToken = () => Storage.remove(TOKEN)
