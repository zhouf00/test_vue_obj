import {request} from './request'

export function getDetail(search) {
  return request({
    url: '/engineering/detail/',
    params:{
      search
    }
  })
}

export function getServer(project) {
  return request({
    url: '/engineering/server/',
    params:{
      project
    }
  })
}