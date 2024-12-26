<template>
  <div class="app-container">
    <el-form ref="form" :model="question" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="question.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="question.content" :autosize="{ minRows: 4 }"></el-input>
      </el-form-item>
      <el-form-item label="是否匿名">
        <el-select v-model="valueS" placeholder="请选择">
          <el-option label="是" value="0"></el-option>
          <el-option label="否" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="disable" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { add, get, update } from '@/api/question';
import { getStuById } from '@/api/stu';
import { getToken } from '@/utils/auth';

export default {
  data() {
    return {
      question: {
        cusId: "", 
        title: "",
        content: "",
        type: "",
        addTime: ""
      },
      me: {
        sname: "",
        sid: "",
        name: "",
        avatar: "",
      },
      disable: false,
      valueS: ""
    };
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.getInfo(this.$route.params.id);
    }
    this.getme(getToken());
  },
  methods: {
    onSubmit() {
      this.question.courseId = this.$route.params.id
      if (this.valueS === "0") {
        this.question.cusId = 0;
      } else if (this.valueS === "1") {
        this.question.cusId = this.me.id;
      }

      if (this.question.id) {
        if (this.question.cusId == getToken()) {
          this.updateInfo(this.question);
        } else {
          this.$message({
            type: 'error',
            message: '您没有修改此问题的权限'
          });
        }
      } else {
        this.addInfo(this.question);
        this.$message({
          type: 'success',
          message: '提问成功！'
        });
      }
    },
    getInfo(id) {
      get(id).then(response => {
        this.question = response.data.question;
        this.question.addTime = new Date();
      });
    },
    addInfo(question) {
      add(question).then(response => {
        // 提示信息
        this.$message({
          type: 'success',
          message: '上传成功!'
        });
        // 跳转到列表页
        this.$router.push({ path: "/course/discussion/" + this.question.courseId });
      });
    },
    updateInfo(question) {
      update(question).then(response => {
        this.$message({
          type: 'success',
          message: '修改成功！'
        });
        this.$router.push({ path: "/course/discussion/" + this.question.courseId });
      });
    },
    handleAvatarSuccess(res) {
      console.log("--------------------------------------");
      this.question.avatar = "http://localhost:8080" + res;
    },
    getme(id) {
      getStuById(id).then(res => {
        this.me = res.data.stu;
        console.log(this.me);
      });
    }
  }
};
</script>



