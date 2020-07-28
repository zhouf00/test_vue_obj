import {request} from './request'

export function getProjects() {
  return request({
    url: '/engineering/project/',
  })
}


