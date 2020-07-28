import {request} from './request'

export function getDetail(search) {
  return request({
    url: '/engineering/detail/',
    params:{
      search
    }
  })
}