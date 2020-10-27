import {request} from 'network/request'

export function getDept(data) {
  return request({
    url: '/personnel/structure/',
    method: 'get',
    params: data
  })
}