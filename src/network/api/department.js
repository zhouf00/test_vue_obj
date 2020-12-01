import {request} from 'network/request'

export function getDeptList(data) {
  return request({
    url: '/personnel/structure/list/',
    method: 'get',
    params: data
  })
}

export function getDept(data) {
  return request({
    url: '/personnel/structure/',
    method: 'get',
    params: data
  })
}

export function createDept(data) {
  return request({
    url: '/personnel/structure/create/',
    method: 'post',
    data: data
  })
}

export function updateDept(id,data) {
  return request({
    url: `/personnel/structure/update/${id}`,
    method: 'post',
    data: data
  })
}