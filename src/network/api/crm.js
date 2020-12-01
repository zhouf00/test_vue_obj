import {request} from 'network/request'

// 商机
export function getMarket(data) {
  return request({
    url: '/crm/market/',
    method: 'get',
    params:data
  })
}

export function getMarketInfo(id) {
  return request({
    url: `/crm/market/update/${id}/`,
    method:'get'
  })
}

export function createMarket(data) {
  return request({
    url: '/crm/market/',
    method: 'post',
    data: data 
  })
}

export function updateMarket(id, data) {
  return request({
    url: `/crm/market/update/${id}/`,
    method: 'post',
    data: data
  })
}

// 联系人
export function getLinkman(data) {
  return request({
    url: '/crm/linkman/',
    params: data
  })
}

export function createLinkman(data) {
  return request({
    url: '/crm/linkman/',
    method: 'post',
    data: data 
  })
}

export function updateLinkman(id, data) {
  return request({
    url: `/crm/linkman/update/${id}/`,
    method: 'post',
    data: data
  })
}


// 商机跟进
export function getMarketTrace(data) {
  return request({
    url: '/crm/markettrace/',
    params: data
  })
}

export function createMarketTrace(data) {
  return request({
    url: '/crm/markettrace/',
    method: 'post',
    data: data 
  })
}