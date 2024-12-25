<template>
  <div class="login-container">
    <el-row>

      <el-button @click="addLogin" type="primary" icon="el-icon-edit" circle></el-button>

    </el-row>
    <el-row>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
        label-position="left">
        <div class="title-container">
          <h3 class="title">Login Form</h3>
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" type="text"
            tabindex="1" auto-complete="on" />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"
            placeholder="Password" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <!-- 记住账号 -->
        <el-form-item>
          <el-checkbox v-model="loginForm.rememberAccount">记住账号</el-checkbox>
        </el-form-item>

        <!-- 记住密码 -->
        <el-form-item>
          <el-checkbox v-model="loginForm.rememberPassword">记住密码</el-checkbox>
        </el-form-item>

        <!-- 同意隐私协议 -->
        <el-form-item prop="agreePrivacy">
          <el-checkbox v-model="loginForm.agreePrivacy">我同意<a href="https://www.julyedu.com/agreement/priv" class="privacy-link">隐私协议</a></el-checkbox>
        </el-form-item>

        <el-button :loading="loading" type="primary" style="width: 100%; margin-bottom: 30px"
          @click.native.prevent="handleLogin"> <a href="" class="bullshit__return-home">login</a></el-button>



        <div class="tips">
          <span style="margin-right: 20px">username: admin</span>
          <span> password: 123456</span>
        </div>
        <div class="tips">
          <span style="margin-right: 20px">username: 学生id</span>
          <span> password: 数据库中查询</span>
        </div>
        <div class="tips">
          <span style="margin-right: 20px"> </span>
          <span> 左上角进行会员注册</span>
        </div>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { get } from "@/api/stu";
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      this.getInfo(this.loginForm.username);
      var numReg = /^[0-9]*$/;
      var numRe = new RegExp(numReg);
      if (!numRe.test(value)) {
        if (!validUsername(value)) {
          callback(new Error("Please enter the correct admins name"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      this.getInfo(this.loginForm.username);
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      }
      else if ((value == "123456") && this.loginForm.username == "admin") {
        callback();
      }
      else if ((value != this.stu.pwd) && this.check) {
        callback(new Error("The password is false"));
        this.check = 0;
      }
      else if (value == this.stu.pwd) {
        callback();
      }
    };
    return {
      loginRules: {
        accountType: [{ required: true, message: "Please select account type", trigger: "change" }],
        username: [{ required: true, trigger: "blur", validator: validateUsername }],
        password: [{ required: true, trigger: "blur", validator: validatePassword }],
        agreePrivacy: [{ required: true, message: "You must agree to the privacy policy", trigger: "change" }],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      loginForm: {
        username: localStorage.getItem("username") || "",
        password: localStorage.getItem("password") || "",
        accountType: "",
        rememberAccount: localStorage.getItem("rememberAccount") === "true",  // 记住账号的状态
        rememberPassword: localStorage.getItem("rememberPassword") === "true",  // 记住密码的状态
        agreePrivacy: false,  // 默认不勾选同意隐私协议
      },
      stu: {
        id: "",
        pwd: "",
      },
      check: 0,
      disable: false,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    getInfo(id) {
      get(id).then((response) => {
        console.log(id);
        if (response.data.stu == null) {
          this.stu.pwd =123456;
        } else {
          this.stu = response.data.stu;
        }
      });
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    addLogin() {
      this.$router.push("/stu/reg/");
    },
    handleLogin() {
      this.getInfo(this.loginForm.username);
      this.check = 1;
      this.$refs.loginForm.validate((valid) => {
        if(this.loginForm.agreePrivacy == false){
          this.$message({
            type: 'error',
            message: '请勾选同意隐私协议'
          });
          return false;
        }
        if (valid) {

          this.loading = true;

          let redirectPath = "/";
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {

              // 如果勾选了“记住账号”，保存到 localStorage
          if (this.loginForm.rememberAccount) {
            localStorage.setItem("username", this.loginForm.username);
            localStorage.setItem("rememberAccount", true);
          } else {
            localStorage.removeItem("username");
            localStorage.setItem("rememberAccount", false);
          }

          // 如果勾选了“记住密码”，保存到 localStorage
          if (this.loginForm.rememberPassword) {
            localStorage.setItem("password", this.loginForm.password);
            localStorage.setItem("rememberPassword", true);
          } else {
            localStorage.removeItem("password");
            localStorage.setItem("rememberPassword", false);
          }
              this.$router.push({ path: this.redirect || redirectPath  });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

    .el-checkbox {
      font-size: 14px;
      color: #fff;
    }

    .el-button {
      margin-top: 10px;
    }

    .remember-me {
      margin-bottom: 10px;
    }
    .privacy-link {
      color: #3498db; /* Change the text color */
      text-decoration: none; /* Remove underline */
      font-weight: bold; /* Make it bold */
    }
    .privacy-link:hover {
      color: #fff;
    }

}
</style>
