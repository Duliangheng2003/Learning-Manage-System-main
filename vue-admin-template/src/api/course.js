import request from '@/utils/request'

export function getAll() {
  return request({
    url: '/course/all',
    method: 'get',
  })
}

export function deleteByID(id) {
  return request({
    url: '/course/delete',
    method: 'get',
    //  /teacher/delete?id=xxx
    params:{id}
  })
}
// {name:xx,age:xxx}
export function add(course) {
  return request({
    url: '/course/add',
    method: 'post',
    data:course
  })
}

export function get(id) {
  return request({
    url: '/course/get',
    method: 'get',
    params:{id}
  })
}

export function getStudents(id){
  return request({
    url: '/course/students',
    method: 'post',
    params:{id}
  }

  )
}

export function getTeachers(id){
  return request({
    url: '/course/teachers',
    method: 'post',
    params:{id}
  })
}

export function addLessons(cid,tid){
  return request({
    url: 'course/lessons',
    method: 'post',
    params:{cid,tid}
  })
}

export function deleteLessons(cid,tid){
  return request({
    url: 'course/remove',
    method: 'post',
    params:{cid,tid}
  })
}

export function list(id){
  return request({
    url: 'course/canuse',
    method: 'post',
    params:{id}
  })
}

export function collection(id){
  return request({
    url: 'course/collection',
    method: 'post',
    params:{id}
  })
}

export function search(name){
  return request({
    url: 'course/search',
    method: 'get',
    params:{name}
  })
}

export function likeCourse(id) {
  return request({
    url: '/course/like',
    method: 'get',
    params:{id}
  })
}

export function watchCourse(id) {
  return request({
    url: '/course/watch',
    method: 'get',
    params:{id}
  })
}

export function addPersonal(cid,sid){
  return request({
    url: '/course/personals',
    method: 'post',
    params:{cid,sid}
  })
}

export function getCourse(id){
  return request({
    url: '/course/mycourse',
    method: 'post',
    params:{id}
  })
}

export function getCollection(id){
  return request({
    url: '/course/mycollection',
    method: 'post',
    params:{id}
  })
}

export function deleteCollection(cid,sid){
  return request({
    url: '/course/close',
    method: 'post',
    params:{cid,sid}
  })
}

export function deletePersonal(cid,sid){
  return request({
    url: '/course/back',
    method: 'post',
    params:{cid,sid}
  })
}

export function addCollection(cid,sid){
  return request({
    url: '/course/addit',
    method: 'post',
    params:{cid,sid}
  })
}

export function getContain(con){
  return request({
    url: '/course/contain',
    method: 'post',
    params:{con}
  })
}

export function update(course) {
  return request({
    url: '/course/update',
    method: 'post',
    data:course
  })
}

export function getComments(id){
  return request({
    url: '/course/${id}/comments',
    method: 'get',
  })
}

export function postComment(data){
  return request({
    url: '/course/${data.id}/comment',
    method: 'post',
    data:{
      content:data.content,
    }
  })
}

// 更新课程状态（0待发布，1已发布）
export function updateCourseStatus(id, status) {
  return request({
    url: '/course/updateStatus',
    method: 'post',
    params:{id,status}
  })
}

// 新增作业
export function createAssignment(id, assignmentForm) {
  return request({
    url: '/course/createAssignment',
    method: 'post',
    params:{id},
    data:assignmentForm
  })
}

export function getAssignmentsById(id) {
  return request({
    url: '/course/getAssignment',
    method: 'get',
    params:{id}
  })
}

export function listCourseware(id){
  return request({
    url: 'course/courseware',
    method: 'post',
    params:{id}
  })
}