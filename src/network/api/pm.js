import {request} from 'network/request'

export function getProjects() {
  return request({
    url: '/engineering/project/',
  })
}

export function createProject(data) {
  return request({
    url: '/engineering/project/create/',
    method: 'post',
    data: data
  })
}

export function getProjectInfo(id) {
  return request({
    url: `/engineering/project/updateInfo/${id}/`,
    method: 'get'
  })
}

export function updateProject(id, data) {
  return request({
    url: `/engineering/project/updateInfo/${id}/`,
    method: 'post',
    data: data
  })
}

export function fetchManufacturers() {
  return request({
    url: '/engineering/project/manufacturer/',
    method: 'get'
  })
}


