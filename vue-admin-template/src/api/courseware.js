import request from '@/utils/request'

export function getAll() {
  return request({
    url: '/courseware/all',
    method: 'get',
  })
}

export function deleteByID(id) {
  return request({
    url: '/courseware/delete',
    method: 'get',
    params: { id }
  })
}

// 添加课件
export function add(courseware) {
  return request({
    url: '/courseware/add',
    method: 'post',
    data: courseware
  })
}

// 搜索课件
export function search(name) {
  return request({
    url: '/courseware/search',
    method: 'get',
    params: { name }
  })
}

// 获取单个课件
export function get(id) {
  return request({
    url: '/courseware/get',
    method: 'get',
    params: { id }
  })
}

// 更新课件
export function update(courseware) {
  return request({
    url: '/courseware/update',
    method: 'post',
    data: courseware
  })
}



