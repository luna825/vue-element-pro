<template>
  <div class="login-container">
    <div class="login-form">
      <el-form
        class="login-form-main"
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
      >
        <div class="login-form-logo">用户登录</div>
        <div class="login-form-content">
          <!-- 用户名form -->
          <el-form-item prop="username">
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="请输入邮箱"
              name="username"
              type="text"
              autocomplete="on"
              tabindex="1"
            />
          </el-form-item>

          <!-- 密码form -->
          <el-tooltip
            v-model="capsTooltip"
            content="大写键已打开"
            placement="right"
            manual
          >
            <el-form-item prop="password">
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="请输入密码"
                tabindex="2"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
                @keyup.enter.native="handleLogin"
              />
            </el-form-item>
          </el-tooltip>
          <el-button
            :loading="loading"
            type="primary"
            style="width:100%;margin-bottom:30px;"
            @click.native.prevent="handleLogin"
            >Login</el-button
          >
          <div class="third-login"></div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate.js";
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      console.log(value);
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      activeName: "email",
      loginForm: {
        username: "admin",
        password: "111111"
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false
    };
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && (key >= "a" && key <= "z")) ||
          (!shiftKey && (key >= "A" && key <= "Z"))
        ) {
          this.capsTooltip = true;
        } else {
          this.capsTooltip = false;
        }
      }
      if (key === "CapsLock" && this.capsTooltip === true) {
        this.capsTooltip = false;
      }
    },
    //用户登录
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery
              });
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
    }
  }
};
</script>

<style lang="scss">
.login-container {
  max-width: 1056px;
  padding-left: 16px;
  padding-right: 16px;
  margin-left: auto;
  margin-right: auto;
  height: 100%;

  .login-form {
    padding-top: 96px;
    width: 430px;
    margin: auto;
  }

  .login-form-main {
    background-color: #fff;
    padding: 40px 8px 48px;
    margin-bottom: 64px;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
  }

  .login-form-logo {
    max-width: 320px;
    margin: 0 auto;
    text-align: center;
    padding-bottom: 20px;
  }
}
@media screen and (max-width: 575px) {
  .login-container {
    padding: 0;
    .login-form {
      padding: 0;
    }
    .login-form-main {
      border: none;
    }
  }
}
</style>
