import axios from 'axios'
import {getToken} from 'utils/auth'
import store from '../store'

export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    // baseURL: 'http://aa.windit.com.cn',
    baseURL: 'http://tianle.iok.la',  // API的base_url
    timeout: 15000  // 请求超时时间  
  })
  // request 请求拦截
  instance.interceptors.request.use(config => {
    if (store.getters.token){
      console.log(getToken())
      config.headers['Authorization'] = getToken()
    }
    return config
  },err => {
    console.log(getToken())
    console.log(err)
  })

  // respone 响应拦截
  instance.interceptors.response.use(res => {
    
    return res.data
  },err => {

  })
  // 发送网络请求
  return instance(config)
}