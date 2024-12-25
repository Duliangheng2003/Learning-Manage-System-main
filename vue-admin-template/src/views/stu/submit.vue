<template>
    <div class="app-container">
      <!-- 返回按钮 -->
      <el-button type="text" icon="el-icon-back" @click="$router.go(-1)" style="margin-bottom: 20px;">返回</el-button>
  
      <!-- 作业基本信息 -->
      <el-card class="assignment-info" shadow="hover" style="margin-bottom: 20px;">
        <p><strong>标题:</strong> {{ assignment.name }}</p>
        <p><strong>截止日期:</strong> {{ formatDate(assignment.dueDate) }}</p>
      </el-card>
  
      <!-- 提交类型选择 -->
      <el-form ref="form" :model="submission" label-width="100px">
        <el-form-item label="提交类型">
          <el-radio-group v-model="submission.type">
            <el-radio :label="0">文本</el-radio>
            <el-radio :label="1">文件</el-radio>
          </el-radio-group>
        </el-form-item>
  
        <!-- 文本提交区域 -->
        <el-form-item v-if="submission.type === 0" label="文本内容">
          <el-input
            type="textarea"
            :rows="10"
            placeholder="请输入您的答案..."
            v-model="submission.commit"
          ></el-input>
        </el-form-item>
  
        <!-- 文件上传区域 -->
        <el-form-item v-else-if="submission.type === 1" label="文件内容">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8080/courseware/upload"
            :on-success="handleUploadSuccess"
            :before-upload="beforeUpload"
            :show-file-list="false"
            accept=".jpg,.jpeg,.png"
            style="margin-bottom: 20px;"
          >
            <img v-if="filePreviewUrl" :src="filePreviewUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div slot="tip" class="el-upload__tip">只能上传 JPG 或 PNG 格式的图片, 且不超过 500KB</div>
        </el-form-item>
  
        <!-- 提交按钮 -->
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import { getAssignment, submitAssignment } from '@/api/course'
  import { getToken } from '@/utils/auth'
  
  export default {
    data() {
      return {
        assignment: {},
        submission: {
          type: 0,
          commit: ''
        },
        fileSubmission: null,
        filePreviewUrl: ''
      }
    },
    created() {
      this.getAssignment()
    },
    methods: {
      // 获取作业详情
      getAssignment() {
        const assignmentId = this.$route.params.id
        getAssignment(assignmentId).then(response => {
          this.assignment = response.data.assignment
        })
      },
      // 处理文件上传成功事件
      handleUploadSuccess(res) {
        this.submission.commit = "http://localhost:8080" + res;
        this.filePreviewUrl = "http://localhost:8080" + res;
      },
      // 上传前的检查
      beforeUpload(file) {
        const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt500K = file.size / 1024 < 500;
  
        if (!isJPGorPNG) {
          this.$message.error('只能上传 JPG 或 PNG 格式的图片!');
        }
        if (!isLt500K) {
          this.$message.error('上传图片大小不能超过 500KB!');
        }
  
        return isJPGorPNG && isLt500K;
      },
      // 提交作业
      handleSubmit() {
        const submissionData = {
          id: this.$route.params.id,
          assId: this.assignment.id,
          stuId: getToken(),
          type: this.submission.type,
          commit: this.submission.commit
        };
  
        submitAssignment(submissionData).then(response => {
          this.$message({
            type: 'success',
            message: '提交成功!'
          });
          this.$router.push('/stu/todolist');
        }).catch(error => {
          this.$message({
            type: 'error',
            message: '提交失败，请重试!'
          });
        });
      },
      // 格式化日期时间
      formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
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
  
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  </style>
  
  
  
  