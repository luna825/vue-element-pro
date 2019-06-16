<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
      >
        <template v-for="item in menuData">
          <el-menu-item v-if="!item.children" :key="item.path">
            <i v-if="item.meta.icon" :class="item.meta.icon"></i>
            <span slot="title">{{ item.meta.title }}</span>
          </el-menu-item>

          <sub-menu v-else :menu-info="item" :key="item.path" />
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SubMenu from "./SubMenu.vue";
import variables from "@/styles/variables.scss";
export default {
  name: "Sidebar",
  components: { SubMenu },
  computed: {
    variables() {
      return variables;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    }
  },
  data() {
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      menuData
    };
  },
  methods: {
    getMenuData(routes) {
      const menuData = [];
      routes.forEach(item => {
        if (item.name && !item.hideInMenu) {
          const newItem = { ...item };
          delete newItem.children;
          if (item.children && !item.hideChildrenInMenu) {
            newItem.children = this.getMenuData(item.children);
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
