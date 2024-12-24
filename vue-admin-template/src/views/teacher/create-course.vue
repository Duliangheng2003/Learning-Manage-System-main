<template>
  <div>
    <el-form ref="courseForm" :model="course" label-width="80px">
      <el-form-item label="课程名称" prop="name">
        <el-input v-model="course.name"></el-input>
      </el-form-item>
      <el-form-item label="课程描述" prop="description">
        <el-input v-model="course.description"></el-input>
      </el-form-item>
      <el-form-item label="讲师" prop="lecturer">
        <el-input v-model="course.lecturer"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">创建课程</el-button>
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
        name: '',
        description: '',
        lecturer: ''
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.courseForm.validate(valid => {
        if (valid) {
          // 在这里调用后端API来创建课程

          // 然后处理成功或失败的响应
          alert('课程创建成功');
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
