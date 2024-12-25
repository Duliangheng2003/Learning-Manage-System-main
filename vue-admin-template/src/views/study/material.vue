<template>
    <div id="lecture-detail">
      <el-card class="detail-card" shadow="hover">
        <h2>{{ lecture.title }}</h2>
        <p><strong>类型:</strong> {{ getTypeText(lecture.type) }}</p>
        <p><strong>描述:</strong> {{ lecture.description }}</p>
        <div v-if="lecture.type === 'image'">
          <img :src="lecture.content" alt="课程图片" style="max-width: 100%; height: 500px;">
        </div>
        <div v-else-if="lecture.type === 'video'">
          <video controls style="width: 100%; height: 500px;">
            <source :src="lecture.content" type="video/mp4">
            您的浏览器不支持 video 标签。
          </video>
        </div>
        <div v-else-if="lecture.type === 'document'">
          <iframe :src="lecture.content" style="width: 100%; height: 600px;" frameborder="0"></iframe>
        </div>
        <div class="actions">
          <el-button type="success" @click="markAsLearned">完成</el-button>
          <el-button @click="goBack">返回</el-button>
        </div>
      </el-card>
    </div>
  </template>
  
  <style scoped>
  #lecture-detail {
    max-width: 1200px;
    margin: 20px auto;
  }
  
  .detail-card {
    padding: 20px;
    max-width: 960px;
    margin: 0 auto;
  }
  
  h2 {
    font-size: 20px;
    margin-bottom: 20px;
  }
  
  .actions {
    margin-top: 20px;
    text-align: right;
  }
  </style>
  
  <script>
  import { getMaterialById } from "@/api/course";
  
  export default {
    data() {
      return {
        lecture: {}
      };
    },
    created() {
      this.fetchLecture(this.$route.params.id);
    },
    methods: {
      fetchLecture(lectureId) {
        getMaterialById(lectureId).then((response) => {
          this.lecture = response.data.material;
        });
      },
      markAsLearned() {
        // 这里可以添加将学习状态保存到服务器的逻辑
        console.log("Marked as learned:", this.lecture.id);
        this.goBack();
      },
      goBack() {
        this.$router.go(-1);
      },
      getTypeText(type) {
        switch (type) {
          case 'document':
            return '文档';
          case 'image':
            return '图片';
          case 'video':
            return '视频';
          default:
            return '未知';
        }
      }
    }
  };
  </script>
  
  
  
  