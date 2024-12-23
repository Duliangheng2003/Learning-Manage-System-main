<template>
  <div class="app-container">
    <el-form ref="form" :model="courseware" label-width="100px">
      <el-form-item label="课件标题">
        <el-input v-model="courseware.title"></el-input>
      </el-form-item>
      <el-form-item label="课件类型">
        <el-select v-model="courseware.type" placeholder="请选择">
          <el-option label="文档" value="document"></el-option>
          <el-option label="图片" value="image"></el-option>
          <el-option label="视频" value="video"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课件描述">
        <el-input type="textarea" v-model="courseware.description"></el-input>
      </el-form-item>
  
      <!-- 课件内容 -->
      <el-form-item label="课件内容">
        <el-upload
          v-if="courseware.type === 'image'"
          class="avatar-uploader"
          action="http://localhost:8080/courseware/upload"
          :show-file-list="false"
          :on-success="handleContentSuccess"
          :before-upload="beforeContentUpload">
          <img v-if="courseware.content" :src="courseware.content" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-upload
          v-else-if="courseware.type === 'video'"
          class="video-uploader"
          action="http://localhost:8080/courseware/upload"
          :show-file-list="false"
          :on-success="handleContentSuccess"
          :before-upload="beforeContentUpload"
          accept=".mp4,.avi,.mov">
          <video v-if="courseware.content" :src="courseware.content" controls class="video-preview"></video>
          <i v-else class="el-icon-plus video-uploader-icon"></i>
        </el-upload>
        <el-upload
          v-else-if="courseware.type === 'document'"
          class="document-uploader"
          action="http://localhost:8080/courseware/upload"
          :show-file-list="false"
          :on-success="handleContentSuccess"
          :before-upload="beforeContentUpload"
          accept=".pdf,.doc,.docx">
          <el-button size="small" type="primary">点击上传文档</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item> 
        <el-button type="primary" :disabled="disable" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { add, get, update } from '@/api/courseware'

export default {
  data() {
    return {
      courseware: {
        title: '',
        description: '',
        type: '',
        content: ''
      },
      disable: false
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.getInfo(this.$route.params.id)
    }
  },
  methods: {
    onSubmit() {
      if (this.courseware.id) {
        this.updateInfo(this.courseware)
      } else {
        this.addInfo(this.courseware)
      }
    },
    getInfo(id) {
      get(id).then(response => {
        this.courseware = response.data.courseware
      })
    },
    addInfo(courseware) {
      add(courseware).then(response => {
        // 提示信息
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        // 跳转到列表页
        this.$router.push({ path: "/courseware/list" })
      })
    },
    updateInfo(courseware) {
      update(courseware).then(response => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        // 跳转到列表页
        this.$router.push({ path: "/courseware/list" })
      })
    },
    handleContentSuccess(res) {
      console.log("--------------------------------------")
      this.courseware.content = "http://localhost:8080" + res;
    },
    beforeContentUpload(file) {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      const isDocument = /\.(pdf|doc|docx)$/i.test(file.name);

      if (this.courseware.type === 'image') {
        if (!isImage) {
          this.$message.error('上传图片只能是图片格式!');
          return false;
        }
      } else if (this.courseware.type === 'video') {
        if (!isVideo) {
          this.$message.error('上传视频只能是视频格式!');
          return false;
        }
      } else if (this.courseware.type === 'document') {
        if (!isDocument) {
          this.$message.error('上传文档只能是 PDF、DOC 或 DOCX 格式!');
          return false;
        }
      }

      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isLt20M) {
        this.$message.error('上传文件大小不能超过 20MB!');
        return false;
      }

      return true;
    }
  }
}
</script>

<style scoped>
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

.video-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.video-uploader .el-upload:hover {
  border-color: #409EFF;
}
.video-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 356px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.video-preview {
  width: 356px;
  height: 178px;
  display: block;
}

.document-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.document-uploader .el-upload:hover {
  border-color: #409EFF;
}
.document-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
</style>