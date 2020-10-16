import {request} from 'network/request'

export function getrole() {
  return request({
    url: '/rbac/role/',
    method: 'get',
  })
}