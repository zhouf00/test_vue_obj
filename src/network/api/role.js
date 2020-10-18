import {request} from 'network/request'

export function getrole() {
  return request({
    url: '/rbac/role/',
    method: 'get',
  })
}

export function createRole(data) {
  return request({
    url: '/rbac/role/',
    method: 'post',
    data:data
  })
}

// 更新角色信息
export function updateRole(id, data) {
  return request({
    url: `/rbac/updaterole/${id}/`,
    method: 'post',
    data: data
  })
}