<template>
  <div class="task-submit-container">
    <el-card class="task-submit-card" shadow="hover">
      <h2>任务提交页面</h2>

      <el-row>
        <el-col :span="12">
          <h3>查看文档课件</h3>
          <el-button type="primary" @click="viewDocument">查看文档</el-button>
        </el-col>

        <el-col :span="12">
          <h3>观看音视频课件</h3>
          <el-button type="primary" @click="viewVideo">观看视频</el-button>
        </el-col>
      </el-row>

      <el-divider></el-divider>

      <h3>提交作业</h3>

      <el-form ref="form" label-width="100px">
        <el-form-item label="文本作业">
          <el-input type="textarea" v-model="textContent" placeholder="输入作业内容..." rows="4"></el-input>
        </el-form-item>

        <el-form-item label="上传文件">
          <el-upload
            class="upload-demo"
            action="/api/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
            :file-list="fileList">
            <el-button size="small" type="primary">上传作业文件</el-button>
          </el-upload>
        </el-form-item>

        <el-button type="primary" @click="submitTask">提交作业</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskId: this.$route.params.taskId, // 获取任务ID
      textContent: '', // 文本内容
      fileList: [] // 上传的文件列表
    };
  },
  methods: {
    viewDocument() {
      // 在这里你可以通过路由或弹窗显示文档内容
      this.$router.push("/article/index");
    },
    viewVideo() {
      // 在这里你可以通过路由或弹窗播放视频课件
      this.$message.success("播放音视频课件");
    },
    submitTask() {
      if (!this.textContent.trim() && this.fileList.length === 0) {
        this.$message.error("请至少提交作业内容或上传文件!");
        return;
      }

      // 在这里可以提交作业到后端 API
      this.$message.success("作业提交成功!");

      this.textContent = '';  // 清空文本内容
      this.fileList = [];     // 清空文件列表
    },

    // 文件上传相关方法
    handlePreview(file) {
      console.log("文件预览", file);
    },
    handleRemove(file, fileList) {
      console.log("删除文件", file);
    },
    handleSuccess(response, file, fileList) {
      console.log("文件上传成功", response, file, fileList);
    },
    beforeUpload(file) {
      console.log("上传文件之前", file);
      return true;
    }
  }
};
</script>

<style scoped>
.task-submit-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.task-submit-card {
  padding: 20px;
}

.el-button {
  margin-top: 10px;
}

.el-form-item {
  margin-bottom: 20px;
}
</style>
