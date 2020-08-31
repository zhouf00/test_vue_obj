import {request} from 'network/request'

export function login(usr, pwd) {
  return request ({
    url: '/personnel/login/',
    method: 'post',
    data: {
      usr,
      pwd
    }
  })
}

export function getUser() {
  return request({
    url: '/personnel/user/',
    method: 'get'
  })
}

export function fetchList(search) {
  return request({
    url: '/personnel/list/',
    method: 'get',
    params: search
  })
}

export function createUser(data) {
  return request({
    url: '/personnel/list/',
    method: 'post',
    data: data
  })
}

export function updateStatus(id, status) {
  return request({
    url: `/personnel/list/${id}/`,
    method: 'post',
    data: status
  })
}

export function fetchAllRoleList() {
  return request({
    url: '/rbac/role/',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/personnel/logout/',
    method: 'post'
  })
}