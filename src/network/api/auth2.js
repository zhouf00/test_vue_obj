import {request} from 'network/request'

export function auth2(code) {
  return request ({
    url: '/personnel/auth2/',
    method: 'post',
    data: {
      code
    }
  })
}

export function queryJsConfig(param) {
  return request({
    url: '/back/jsapi/',
    method: 'post',
    data: param
  })
}