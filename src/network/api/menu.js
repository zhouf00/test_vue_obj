import {request} from 'network/request'

export function getMenu(data) {
  return request({
    url: '/rbac/menu/',
    method: 'get',
    params: data
  })
}