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


