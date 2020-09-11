import {request} from 'network/request'

export function getProjects(data) {
  return request({
    url: '/engineering/project/',
    params:{
      page: data.page,
      pageSize: data.pageSize,
      id:data.id,
      name: data.name,
      area: data.area,
      sn: data.sn,
    }
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

export function createManufacturer(data) {
  return request({
    url: '/engineering/project/manufacturer/',
    method: 'post',
    data: data
  })
}

export function fetchMonitorType() {
  return request({
    url: '/engineering/project/monitortype/',
    method: 'get'
  })
}

