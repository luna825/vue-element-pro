<template>
  <div class="login-container">
    <div class="login-form"></div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      activeName: "email"
    };
  },
  methods: {}
};
</script>

<style lang="scss">
.login-container {
  min-height: 100%;
  width: 100%;

  .el-tabs__nav-wrap::after {
    background-color: transparent; //reset tabs分线为透明
  }
}
</style>
