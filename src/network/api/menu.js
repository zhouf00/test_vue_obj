import {request} from 'network/request'

export function getMenu(data) {
  return request({
    url: '/rbac/menu/',
    method: 'get',
    params: data
  })
}

export function createMenu(data) {
  return request({
    url: '/rbac/menu/',
    method: 'post',
    data: data
  })
}

export function updateMenu(id,data) {
  return request({
    url: `/rbac/updatemenu/${id}/`,
    method: 'post',
    data: data
  })
}

export function updateMenuAuth(id, data) {
  return request({
    url: `/rbac/menu/auth/${id}/`,
    method: 'put',
    data: data
  })
}