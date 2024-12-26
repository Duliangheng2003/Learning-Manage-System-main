<template>
    <div class="app-container">
      <!-- 返回按钮 -->
      <el-button type="text" icon="el-icon-back" @click="$router.go(-1)" style="margin-bottom: 20px;">返回</el-button>
  
      <!-- 作业基本信息 -->
      <el-card class="assignment-info" shadow="hover" style="margin-bottom: 20px;">
        <p><strong>作业名称:</strong> {{ assignment.name }}</p>
        <p><strong>截止日期:</strong> {{ formatDate(assignment.dueDate) }}</p>
      </el-card>
  
      <!-- 学生ID -->
      <el-card class="student-id" shadow="hover" style="margin-bottom: 20px;">
        <p><strong>学生ID:</strong> {{ assignment.stuId }}</p>
      </el-card>
  
      <!-- 提交内容 -->
      <el-card class="submission-content" shadow="hover" style="margin-bottom: 20px;">
        <div v-if="assignment.type === 0">
          <p><strong>文本内容:</strong></p>
          <pre>{{ assignment.commit }}</pre>
        </div>
        <div v-else-if="assignment.type === 1">
          <p><strong>文件内容:</strong></p>
          <a :href="assignment.commit" target="_blank"></a>
          <img v-if="isImage(assignment.commit)" :src="assignment.commit" alt="Submitted File" style="max-width: 100%; margin-top: 10px;" />
        </div>
      </el-card>
    </div>
  </template>
  
  <script>
  import { getStuSubmission } from '@/api/course'
  
  export default {
    data() {
      return {
        assignment: {}
      }
    },
    created() {
      const assignmentId = this.$route.params.id;
      this.getAssignment(assignmentId);
    },
    methods: {
      // 获取作业详情
      getAssignment(id) {
        getStuSubmission(id).then(response => {
          this.assignment = response.data.assignment;
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
      },
      // 判断是否为图片文件
      isImage(url) {
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        const extension = url.split('.').pop().toLowerCase();
        return imageExtensions.includes(extension);
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
  
  .assignment-info, .student-id, .submission-content {
    padding: 20px;
  }
  
  .pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  </style>
  
  
  
  