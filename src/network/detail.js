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

export function getFacility(id) {
  return request({
    url: `/engineering/facility/${id}/`,
  })
}

export function sendServer(query) {
  return request({
    url: '/engineering/server/',
    params:{
      project
    },
    method: 'post',
  })
}