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
  })
}

export function logout() {
  return request({
    url: '/personnel/logout/',
    method: 'post'
  })
}