import {request} from 'network/request'

// 帐号密码登陆
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

// 登陆时获取用户信息
export function getUser() {
  return request({
    url: '/personnel/user/',
    method: 'get'
  })
}

// 拉取所有用户
export function fetchList(search) {
  return request({
    url: '/personnel/list/',
    method: 'get',
    params: search
  })
}

// 创建用户
export function createUser(data) {
  return request({
    url: '/personnel/register/',
    method: 'post',
    data: data
  })
}

// 更新用户信息
export function updateUser(id, data) {
  return request({
    url: `/personnel/updateuser/${id}/`,
    method: 'post',
    data: data
  })
}

// 更新用户状态
export function updateStatus(id, is_active) {
  return request({
    url: `/personnel/updatestatus/${id}/`,
    method: 'post',
    data: is_active
  })
}

// 拉取用户名列表
export function fetchUserList() {
  return request({
    url: '/personnel/userlist/',
    method: 'get'
  })
}

// 拉取角色权限
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