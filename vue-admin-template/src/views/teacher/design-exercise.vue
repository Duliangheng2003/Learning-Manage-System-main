<template>
  <div>
    <el-form ref="exerciseForm" :model="exercise" label-width="80px">
      <el-form-item label="习题标题" prop="title">
        <el-input v-model="exercise.title"></el-input>
      </el-form-item>
      <el-form-item label="习题描述" prop="description">
        <el-input v-model="exercise.description"></el-input>
      </el-form-item>
      <el-form-item label="正确答案" prop="correctAnswer">
        <el-input v-model="exercise.correctAnswer"></el-input>
      </el-form-item>
      <el-form-item label="错误答案" prop="wrongAnswers">
        <el-input v-model="exercise.wrongAnswers"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">保存习题</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      exercise: {
        title: '',
        description: '',
        correctAnswer: '',
        wrongAnswers: ''
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.exerciseForm.validate(valid => {
        if (valid) {
          // 在这里调用后端API来保存习题
          // 例如：this.$http.post('/api/exercises', this.exercise)
          // 然后处理成功或失败的响应
          alert('习题保存成功');
          this.resetForm();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.exerciseForm.resetFields();
    }
  }
};
</script>

<style scoped>
</style>
