<template>
  <div class="login-container">
    <div class="login-form">
      <el-form class="login-form-main">
        <div class="login-form-logo">用户登录</div>
        <div class="login-form-content">
          <!-- 用户名form -->
          <el-form-item>
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
            <el-form-item>
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
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      activeName: "email",
      loginForm: {
        username: "admin",
        password: "111111"
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
      axios.post("/dev-api/user/login", this.loginForm).then(res => {
        console.log(res.data);
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
