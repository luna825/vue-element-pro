<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="selectKey"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
      >
        <sidebar-item
          v-for="route in menuData"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from "./SidebarItem.vue";
import variables from "@/styles/variables.scss";
export default {
  name: "Sidebar",
  components: { SidebarItem },
  computed: {
    variables() {
      return variables;
    }
  },
  watch: {
    "$route.path": function(val) {
      this.selectKey = this.selectKeyMap[val];
    }
  },
  data() {
    this.selectKeyMap = {};
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      menuData,
      selectKey: this.selectKeyMap[this.$route.path]
    };
  },
  methods: {
    getMenuData(routes = [], selectKey) {
      const menuData = [];
      routes.forEach(item => {
        if (item.name && !item.hideInMenu) {
          this.selectKeyMap[item.path] = selectKey || item.path;
          const newItem = { ...item };
          delete newItem.children;
          if (item.children && !item.hideChildrenInMenu) {
            newItem.children = this.getMenuData(item.children);
          } else {
            this.getMenuData(item.children, selectKey || item.path);
          }
          menuData.push(newItem);
        } else if (
          !item.hideInMenu &&
          !item.hideChildrenInMenu &&
          item.children
        ) {
          menuData.push(...this.getMenuData(item.children));
        }
      });
      return menuData;
    }
  }
};
</script>

<style></style>
