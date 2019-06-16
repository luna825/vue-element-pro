<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div class="header">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { Sidebar, Navbar, AppMain } from "./components/index.js";
export default {
  name: "BasicLayout",
  components: { Sidebar, Navbar, AppMain }
};
</script>

<style lang="scss" scoped></style>
