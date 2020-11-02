import {request} from 'network/request'

export function getProjects(data) {
  return request({
    url: '/engineering/project/',
    params:data
  })
}

export function getProjectInfo(id) {
  return request({
    url: `/engineering/project/updateInfo/${id}/`,
    method: 'get'
  })
}

export function createProject(data) {
  return request({
    url: '/engineering/project/create/',
    method: 'post',
    data: data
  })
}

export function updateProject(id, data) {
  return request({
    url: `/engineering/project/updateInfo/${id}/`,
    method: 'post',
    data: data
  })
}

export function getIdcRoom(data) {
  return request({
    url: '/engineering/idcroom/',
    method: 'get',
    params:data
  })
}

export function createIdcRoom(data) {
  return request({
    url: '/engineering/idcroom/create/',
    method: 'post',
    data:data
  })
}

export function updateIdcRoom(id, data) {
  return request({
    url: `/engineering/idcroom/update/${id}/`,
    method: 'post',
    data:data
  })
}

export function getCargo(data) {
  return request({
    url: '/engineering/cargo/',
    method: 'get',
    params:data
  })
}

export function createCargo(data) {
  return request({
    url: '/engineering/cargo/create/',
    method: 'post',
    data:data
  })
}

export function updateCargo(id, data) {
  return request({
    url: `/engineering/cargo/update/${id}/`,
    method: 'post',
    data:data
  })
}

export function getInvoice(data) {
  return request({
    url: '/engineering/invoice/',
    method: 'get',
    params:data
  })
}

export function createInvoice(data) {
  return request({
    url: '/engineering/invoice/create/',
    method: 'post',
    data:data
  })
}

export function updateInvoice(id, data) {
  return request({
    url: `/engineering/invoice/update/${id}/`,
    method: 'post',
    data:data
  })
}

export function getInvoiceImage(data) {
  return request({
    url: '/engineering/invoice/img/',
    method: 'get',
    params:data
  })
}

export function getTrace(data) {
  return request({
    url: '/engineering/trace/',
    method: 'get',
    params:data
  })
}

export function createTrace(data) {
  return request({
    url: '/engineering/trace/',
    method: 'post',
    data:data
  })
}



// ##########
// 标签路由
// ##########
export function getMonitorType() {
  return request({
    url: '/engineering/projectTag/monitortype/',
    method: 'get'
  })
}

export function createMonitorType(data) {
  return request({
    url: '/engineering/projectTag/monitortype/',
    method: 'post',
    data: data
  })
}

export function updateMonitorType(id,data) {
  return request({
    url: `/engineering/projectTag/monitortype/update/${id}/`,
    method: 'post',
    data: data
  })
}

// 项目类型
export function getType() {
  return request({
    url: '/engineering/projectTag/type/',
    method: 'get'
  })
}

export function createType(data) {
  return request({
    url: '/engineering/projectTag/type/',
    method: 'post',
    data:data
  })
}

export function updateType(id, data) {
  return request({
    url: `/engineering/projectTag/type/update/${id}/`,
    method: 'post',
    data:data
  })
}

// 项目区域
export function getArea() {
  return request({
    url: '/engineering/projectTag/area/',
    method: 'get'
  })
}

export function createArea(data) {
  return request({
    url: '/engineering/projectTag/area/',
    method: 'post',
    data:data
  })
}

export function updateArea(id, data) {
  return request({
    url: `/engineering/projectTag/area/update/${id}/`,
    method: 'post',
    data:data
  })
}

// 工作环境
export function getWorkingenv() {
  return request({
    url: '/engineering/projectTag/workingenv/',
    method: 'get'
  })
}

export function createWorkingenv(data) {
  return request({
    url: '/engineering/projectTag/workingenv/',
    method: 'post',
    data:data
  })
}

export function updateWorkingenv(id, data) {
  return request({
    url: `/engineering/projectTag/workingenv/update/${id}/`,
    method: 'post',
    data:data
  })
}

// 项目状态
export function getStatus() {
  return request({
    url: '/engineering/projectTag/status/',
    method: 'get'
  })
}

export function createStatus(data) {
  return request({
    url: '/engineering/projectTag/status/',
    method: 'post',
    data:data
  })
}

export function updateStatus(id, data) {
  return request({
    url: `/engineering/projectTag/status/update/${id}/`,
    method: 'post',
    data:data
  })
}

// 厂商
export function getManufacturer() {
  return request({
    url: '/engineering/projectTag/manufacturer/',
    method: 'get'
  })
}

export function createManufacturer(data) {
  return request({
    url: '/engineering/projectTag/manufacturer/',
    method: 'post',
    data:data
  })
}

export function updateManufacturer(id, data) {
  return request({
    url: `/engineering/projectTag/manufacturer/update/${id}/`,
    method: 'post',
    data:data
  })
}

// 监测数量
export function getMonitorNumber(data) {
  return request({
    url: '/engineering/projectTag/monitornumber/',
    method: 'get',
    params:data
  })
}

export function createMonitorNumber(data) {
  return request({
    url: '/engineering/projectTag/monitornumber/',
    method: 'post',
    data:data
  })
}

export function updateMonitorNumber(id, data) {
  return request({
    url: `/engineering/projectTag/monitornumber/update/${id}/`,
    method: 'post',
    data:data
  })
}