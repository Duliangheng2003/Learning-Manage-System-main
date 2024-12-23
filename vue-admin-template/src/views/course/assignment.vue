<template>
    <div class="app-container">
      <h2>布置作业</h2>
      <el-form :model="assignmentForm" label-width="120px" ref="assignmentForm" :rules="rules">
        <el-form-item label="课程名称">
          <span>{{ course.name }}</span>
        </el-form-item>
        <el-form-item label="作业名称" prop="name">
          <el-input v-model="assignmentForm.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="assignmentForm.description"></el-input>
        </el-form-item>
        <el-form-item label="截止日期" prop="dueDate">
          <el-date-picker
             v-model="assignmentForm.dueDate"
             type="datetime"
             placeholder="选择截止日期和时间"
             format="yyyy-MM-dd HH:mm:ss"
             popper-class="custom-datepicker">
          </el-date-picker>
       </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(course.id, 'assignmentForm')">提交</el-button>
          <el-button @click="resetForm('assignmentForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import { createAssignment, get } from '@/api/course'
  
  export default {
    data() {
      return {
        course: {
          name: ''
        },
        assignmentForm: {
          name: '',
          description: '',
          dueDate: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入作业名称', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请输入作业描述', trigger: 'blur' }
          ],
          dueDate: [
            { required: true, message: '请选择截止日期', trigger: 'change' }
          ]
        }
      }
    },
    created() {
      if (this.$route.params && this.$route.params.id) {
        this.getInfo(this.$route.params.id)
      }
    },
    methods: {
      getInfo(id) {
        get(id).then(response => {
          this.course = response.data.course
        })
      },
      submitForm(id, formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 提交表单数据到后端
            createAssignment(id, this.assignmentForm).then(response => {
              this.$message({
                type: 'success',
                message: '作业布置成功!'
              });
              // 清空表单
              this.resetForm(formName);
              // 跳转到列表页
              this.$router.push({path:"/course/list"})
            }).catch(error => {
              this.$message({
                type: 'error',
                message: '作业布置失败!'
              });
            });
          } else {
            console.log('验证失败!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
  </script>
  
  <style scoped>
  .app-container {
    padding: 20px;
  }
  
  .el-form {
    width: 50%;
    margin: auto;
  }
  
  .el-form-item {
    margin-bottom: 20px;
  }
  </style>
  
  
  
  