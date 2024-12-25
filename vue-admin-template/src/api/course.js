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

// 根据学生id获取作业情况
export function getAssignmentsById(id) {
  return request({
    url: '/course/getAssignment',
    method: 'get',
    params:{id}
  })
}
// 根据作业id获取作业信息
export function getAssignment(id) {
  return request({
    url: '/course/assignment',
    method: 'get',
    params:{id}
  })
}

// 提交用户作业
export function submitAssignment(submitForm) {
  return request({
    url: '/course/submit',
    method: 'post',
    data: submitForm
  })
}

// 根据课程id列出课件
export function listCourseware(id){
  return request({
    url: 'course/courseware',
    method: 'post',
    params:{id}
  })
}

// 添加课件到对应课程
export function addMaterial(cid,mid){
  return request({
    url: 'course/material',
    method: 'post',
    params:{cid,mid}
  })
}

// 获取该课程对应的课件
export function getMaterials(id){
  return request({
    url: '/course/getMaterials',
    method: 'post',
    params:{id}
  })
}

// 删除该课程的课件
export function deleteMaterial(cid,mid){
  return request({
    url: 'course/deleteMaterial',
    method: 'post',
    params:{cid,mid}
  })
}