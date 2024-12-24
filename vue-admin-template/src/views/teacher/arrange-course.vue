<template>
  <div>
    <el-form ref="courseForm" :model="course" label-width="80px">
      <el-form-item label="课程章节" prop="chapter">
        <el-input v-model="course.chapter"></el-input>
      </el-form-item>
      <el-form-item label="课程小节" prop="section">
        <el-input v-model="course.section"></el-input>
      </el-form-item>
      <el-form-item label="课程内容" prop="content">
        <el-input v-model="course.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">编排课程</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      course: {
        chapter: '',
        section: '',
        content: ''
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.courseForm.validate(valid => {
        if (valid) {
          // 在这里调用后端API来编排课程
          // 例如：this.$http.post('/api/courses/arrange', this.course)
          // 然后处理成功或失败的响应
          alert('课程编排成功');
          this.resetForm();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.courseForm.resetFields();
    }
  }
};
</script>

<style scoped>
</style>
