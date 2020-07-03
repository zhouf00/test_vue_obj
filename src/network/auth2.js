import axios from 'axios'

export function initWxConfig(vm) {
  // 1. 创建axios实例
  const instance = axios.create({
    baseURL: 'https://open.weixin.qq.com/',
    timeout: 5000
  })
  // 2.1 请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, err => {

  })
  // 2.2 响应拦截
  instance.interceptors.reqponse.use(res => {
    return res.data
  }, err => {

  })
  // 3. 发送真正的网络请求
  return instance(vm)
}