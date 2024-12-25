<template>
    <div class="app-container">
      <!-- 返回按钮 -->
      <el-button type="text" icon="el-icon-back" @click="$router.go(-1)" style="margin-bottom: 20px;">返回</el-button>
  
      <!-- 作业基本信息 -->
      <el-card class="assignment-info" shadow="hover" style="margin-bottom: 20px;">
        <p><strong>标题:</strong> {{ assignment.name }}</p>
        <p><strong>截止日期:</strong> {{ assignment.dueDate }}</p>
      </el-card>
  
      <!-- 提交类型选择 -->
      <el-radio-group v-model="submissionType" style="margin-bottom: 20px;">
        <el-radio label="text">文本</el-radio>
        <el-radio label="file">文件</el-radio>
      </el-radio-group>
  
      <!-- 文本提交区域 -->
      <el-input
        v-if="submissionType === 'text'"
        type="textarea"
        :rows="10"
        placeholder="请输入您的答案..."
        v-model="textSubmission"
        style="margin-bottom: 20px;"
      ></el-input>
  
      <!-- 文件上传区域 -->
      <el-upload
        v-else-if="submissionType === 'file'"
        action="/api/upload"
        :on-success="handleUploadSuccess"
        :before-upload="beforeUpload"
        :show-file-list="true"
        style="margin-bottom: 20px;"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
  
      <!-- 提交按钮 -->
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </div>
  </template>
  
  <script>
  import { getAssignmentById } from '@/api/course'
//   import { submitAssignment } from '@/api/submission'
  
  export default {
    data() {
      return {
        assignment: {},
        submissionType: 'text',
        textSubmission: '',
        fileSubmission: null
      }
    },
    created() {
      this.getAssignment()
    },
    methods: {
      // 获取作业详情
      getAssignment() {
        const assignmentId = this.$route.params.id
        getAssignmentById(assignmentId).then(response => {
          this.assignment = response.data.assignment
        })
      },
      // 处理文件上传成功事件
      handleUploadSuccess(response, file, fileList) {
        this.fileSubmission = response.url // 假设服务器返回文件URL
      },
      // 上传前的检查
      beforeUpload(file) {
        const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt500K = file.size / 1024 < 500
  
        if (!isJPGorPNG) {
          this.$message.error('只能上传 JPG 或 PNG 格式的图片!')
        }
        if (!isLt500K) {
          this.$message.error('上传图片大小不能超过 500KB!')
        }
        return isJPGorPNG && isLt500K
      },
      // 提交作业
      handleSubmit() {
        const submissionData = {
          assignmentId: this.assignment.id,
          studentId: getToken(), 
          type: this.submissionType,
          content: this.submissionType === 'text' ? this.textSubmission : this.fileSubmission
        }
  
        submitAssignment(submissionData).then(response => {
          this.$message({
            type: 'success',
            message: '提交成功!'
          })
          this.$router.push('/stu/assignments')
        }).catch(error => {
          this.$message({
            type: 'error',
            message: '提交失败，请重试!'
          })
        })
      }
    }
  }
  </script>
  
  <style scoped>
  /* 添加一些样式以美化页面 */
  .app-container {
    width: 90%;
    margin: 0 auto;
  }
  
  .assignment-info {
    padding: 20px;
  }
  
  .el-textarea {
    width: 100%;
  }
  
  .el-upload__tip {
    font-size: 12px;
    color: #999;
  }
  </style>
  
  
  
  