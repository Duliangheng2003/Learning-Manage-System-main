<template>
  <div class="login-container">
    <div class="form-container">
      <el-row>
        <el-button @click="addLogin" type="primary" icon="el-icon-edit" circle class="edit-btn"></el-button>
      </el-row>
      <el-row>
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          auto-complete="on"
          label-position="left"
        >
          <div class="title-container">
            <h3 class="title">Welcome Back</h3>
          </div>

          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="Username"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="Password"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>

          <el-form-item>
            <el-checkbox v-model="loginForm.rememberAccount">Remember Account</el-checkbox>
            <el-checkbox v-model="loginForm.rememberPassword">Remember Password</el-checkbox>
          </el-form-item>

          <el-form-item prop="agreePrivacy">
            <el-checkbox v-model="loginForm.agreePrivacy">
              I agree to the
              <a href="https://www.julyedu.com/agreement/priv" class="privacy-link">Privacy Policy</a>
            </el-checkbox>
          </el-form-item>

          <el-button
            :loading="loading"
            type="primary"
            class="login-button"
            @click.native.prevent="handleLogin"
          >
            Login
          </el-button>

          <el-button
            type="text"
            class="register-button"
            @click.native.prevent="redirectToRegister"
          >
            Don't have an account? Register now
          </el-button>
          <el-button
            type="text"
            class="guest-button"
            @click="handleGuestAccess"
          >Visit as GUEST
        </el-button>
        </el-form>
      </el-row>
    </div>
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
      else if ((value == "123456") && this.loginForm.username == "guest") {
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
    handleGuestAccess() {
      this.loginForm.username = "guest";
      this.loginForm.password = "123456";
      this.handleLogin();
    },
    redirectToRegister() {
      this.$router.push("/stu/reg/");
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
<style lang="scss" scoped>
/* 背景渐变与居中布局 */
.login-container {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(to bottom right, #4a90e2, #9013fe);
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container {
  background: #fff;
  padding: 40px 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 400px;
  max-width: 90%;
}

.title-container .title {
  font-size: 28px;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
  font-weight: bold;
}

/* 表单项样式 */
.el-form-item {
  margin-bottom: 20px;
}

.el-input {
  width: 100%;
  height: 45px;

  input {
    padding-left: 40px;
    border-radius: 25px;
    border: 1px solid #ddd;
    transition: all 0.3s ease;

    &:focus {
      border-color: #4a90e2;
      box-shadow: 0 0 5px #4a90e2;
    }
  }
}

/* 图标容器 */
.svg-container {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #4a90e2;
}

.show-pwd {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #888;

  &:hover {
    color: #4a90e2;
  }
}

/* 按钮样式 */
.login-button {
  width: 100%;
  height: 45px;
  border-radius: 25px;
  background: linear-gradient(to right, #4a90e2, #9013fe);
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #9013fe, #4a90e2);
  }
}

/* 隐私协议样式 */
.privacy-link {
  color: #4a90e2;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
}

/* 编辑按钮 */
.edit-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  color: #9013fe;
  background-color: transparent;

  &:hover {
    color: #4a90e2;
  }
}
.register-button {
  margin-top: 15px;
  display: block;
  width: 100%;
  color: #4a90e2;
  font-size: 14px;
  text-align: center;
  transition: color 0.3s ease;

  &:hover {
    color: #9013fe;
  }
}
.guest-button {
  margin-top: 10px;
  display: block;
  width: 100%;
  color: #4a90e2;
  font-size: 14px;
  text-align: center;
  transition: color 0.3s ease;

  &:hover {
    color: #9013fe;
  }
}

</style>
