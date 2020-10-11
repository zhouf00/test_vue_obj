import axios from 'axios'
import {getToken} from 'utils/auth'
import store from '../store'

export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    baseURL: 'http://aa.windit.com.cn',
    // baseURL: 'http://tianle.iok.la',  // API的base_url
    // baseURL: 'http://localhost:8000',
    timeout: 15000  // 请求超时时间  
  })
  // request 请求拦截
  instance.interceptors.request.use(config => {
    if (store.getters.token){
      config.headers['Authorization'] = getToken()
    }
    return config
  },err => {
    return err
  })

  // respone 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  },err => {
    return {err:err.response.data}
  })
  // 发送网络请求
  return instance(config)
}