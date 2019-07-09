<template>
  <div class="app-wrapper" :class="classObj">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div class="header">
        <navbar />
      </div>
      <app-main />
      <right-panel></right-panel>
    </div>
  </div>
</template>

<script>
import RightPanel from "@/components/RightPanel";
import { mapState } from "vuex";
import { Sidebar, Navbar, AppMain } from "./components/index.js";
export default {
  name: "BasicLayout",
  components: { Sidebar, Navbar, AppMain, RightPanel },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  }
};
</script>

<style lang="scss" scoped></style>
