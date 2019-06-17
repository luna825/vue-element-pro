<template>
  <div class="menu-wrapper">
    <app-link v-if="!item.children" :key="item.path" :to="item.path">
      <el-menu-item
        :class="{ 'submenu-title-noDropdown': !isNest }"
        :index="resolvePath(item.path)"
      >
        <item
          :icon="item.meta.icon || (item.meta && item.meta.icon)"
          :title="item.meta.title || item.name"
        />
      </el-menu-item>
    </app-link>

    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title || item.name"
        />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
import { isExternal } from "@/utils/validate";
import Item from "./Item";
import AppLink from "./Link";
export default {
  name: "SidebarItem",
  components: { Item, AppLink },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    isNest: {
      type: Boolean,
      default: true
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  methods: {
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    }
  }
};
</script>

<style></style>
