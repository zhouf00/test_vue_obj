import axios from 'axios'

export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    baseURL: 'http://10.100.30.141',
    timeout: 5000
  })
  // 请求拦截
  instance.interceptors.request.use(config => {
    return config
  },err => {

  })
  // 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  },err => {

  })
  // 发送网络请求
  return instance(config)
}