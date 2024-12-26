<template>
  <div class="app-container">
    <el-form ref="form" :model="stu" :rules="rules" label-width="80px">
      <el-form-item label="姓名" prop="sname">
        <el-input v-model="stu.sname"></el-input>
      </el-form-item>

      <el-form-item label="学号" prop="sid">
        <el-input v-model="stu.sid"></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="gender">
        <el-input v-model="stu.gender"></el-input>
      </el-form-item>

      <el-form-item label="年龄" prop="age">
        <el-input v-model="stu.age"></el-input>
      </el-form-item>

      <el-form-item label="生日" prop="birthday">
        <div class="block">
          <el-date-picker
            v-model="stu.birthday"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
      </el-form-item>

      <el-form-item label="密码" prop="pwd">
        <el-input
          v-model="stu.pwd"
          type="password"
          @input="checkPasswordStrength">
        </el-input>
        <div class="password-bar">
          <div
            class="strength-bar"
            :class="passwordStrengthClass"
            :style="{ width: passwordStrengthWidth }">
          </div>
        </div>
        <div class="password-strength-text">{{ passwordStrength }}</div>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="stu.email"></el-input>
      </el-form-item>

      <el-form-item label="电话" prop="phone">
        <el-input v-model="stu.phone"></el-input>
      </el-form-item>

      <!-- 学生头像 -->
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8080/stu/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img style="width: 200px; height: 200px; border: none" v-if="stu.avatar" :src="stu.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :disabled="disable || isWeakPassword" @click="onSubmit">保存</el-button>
        <el-button type="default" @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { add, addStu, get, update } from '@/api/stu'

export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }]
      },
      stu: {
        sname: '',
        birthday: '1981-04-01T16:00:00.000+00:00',
        gender: '',
        age: '',
        pwd: '',
        email: '',
        phone: '',
        avatar: 'http://localhost:8080/uploadImg/fba6ae58de8d450ab0d22a77a568bceeuser.jpg'
      },
      rules: {
        sname: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        sid: [{ required: true, message: '学号不能为空', trigger: 'blur' }],
        pwd: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, message: '密码至少6位', trigger: 'blur' }
        ],
        email: [], // 允许邮箱为空
        phone: []  // 允许电话为空
      },
      disable: false,
      passwordStrength: '', // 密码强度文本
      passwordStrengthWidth: '0%', // 条状宽度
      isWeakPassword: false // 是否为弱密码
    }
  },
  computed: {
    passwordStrengthClass() {
      switch (this.passwordStrength) {
        case '弱':
          return 'weak';
        case '中':
          return 'medium';
        case '强':
          return 'strong';
        default:
          return '';
      }
    }
  },
  methods: {
    handleAvatarSuccess(res) {
      this.stu.avatar = "http://localhost:8080" + res;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid && !this.isWeakPassword) {
          this.addInfo(this.stu);
        } else if (this.isWeakPassword) {
          this.$message.error('密码强度太弱，请使用更强的密码');
        } else {
          this.$message.error('请完成表单填写');
        }
      });
    },
    addInfo(stu) {
      add(stu).then(response => {
        this.$alert('你的账号id是' + response.data.id + "\n你的密码是" + this.stu.pwd, '注册成功', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'success',
              message: '注册成功!'
            });
          }
        });
        this.$router.push({ path: "/login" });
      });
    },
    goBack() {
      this.$router.go(-1); // 返回上一页
    },
    checkPasswordStrength() {
      const pwd = this.stu.pwd;
      const hasLowercase = /[a-z]/.test(pwd);
      const hasUppercase = /[A-Z]/.test(pwd);
      const hasNumber = /\d/.test(pwd);

      // 1. 判断强密码（优先匹配）
      if (hasLowercase && hasUppercase && hasNumber && pwd.length > 8) {
        this.passwordStrength = '强';
        this.passwordStrengthWidth = '100%';
        this.isWeakPassword = false;
      }
      // 2. 判断中密码
      else if ((hasLowercase && hasUppercase) ||
               (hasLowercase && hasNumber) ||
               (hasUppercase && hasNumber)) {
        this.passwordStrength = '中';
        this.passwordStrengthWidth = '66%';
        this.isWeakPassword = false;
      }
      // 3. 判断弱密码
      else {
        this.passwordStrength = '弱';
        this.passwordStrengthWidth = '33%';
        this.isWeakPassword = true;
      }
    }
  }
}
</script>

<style scoped>
.password-bar {
  height: 5px;
  background: #e0e0e0;
  margin-top: 5px;
  border-radius: 3px;
  overflow: hidden;
  position: relative;
}
.strength-bar {
  height: 100%;
  transition: width 0.3s;
}
.weak {
  background-color: red;
}
.medium {
  background-color: orange;
}
.strong {
  background-color: green;
}
.password-strength-text {
  margin-top: 5px;
}
</style>



