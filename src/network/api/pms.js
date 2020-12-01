import {request} from 'network/request'

export function getProduct(data) {
  return request({
    url: '/product/',
    method: 'get',
    params: data
  })
}

export function createProduct(data) {
  return request({
    url: '/product/create/',
    method: 'post',
    data: data
  })
}

export function updateProduct(id, data) {
  return request({
    url: `/product/update/${id}/`,
    method: 'post',
    data: data
  })
}

export function getProduction(data) {
  return request({
    url: '/product/production/',
    method: 'get',
    params: data
  })
}

export function createProduction(data) {
  return request({
    url: '/product/production/create/',
    method: 'post',
    data: data
  })
}

export function updateProduction(id, data) {
  return request({
    url: `/product/production/update/${id}/`,
    method: 'post',
    data: data
  })
}

export function getAisle(data) {
  return request({
    url: '/product/aisle/',
    method: 'get',
    params: data
  })
}

export function createAisle(data) {
  return request({
    url: '/product/aisle/create/',
    method: 'post',
    data: data
  })
}

export function updateAisle(id,data) {
  return request({
    url: `/product/aisle/update/${id}/`,
    method: 'post',
    data: data
  })
}

export function getStatus() {
  return request({
    url: '/product/status/',
    method: 'get',
  })
}

export function createStatus(data) {
  return request({
    url: '/product/status/',
    method: 'post',
    data: data
  })
}

export function updateStatus(id,data) {
  return request({
    url: `/product/status/update/${id}/`,
    method: 'post',
    data: data
  })
}

export function getLifecycle(data) {
  return request({
    url: '/product/lifecycle/',
    method: 'get',
    params: data
  })
}

export function createLifecycle(data) {
  return request({
    url: '/product/lifecycle/create/',
    method: 'post',
    data: data
  })
}

export function updateLifecycle(id,data) {
  return request({
    url: `/product/lifecycle/update/${id}/`,
    method: 'post',
    data: data
  })
}
