import {request} from 'network/request'

export function getProjects() {
  return request({
    url: '/engineering/project/',
  })
}


