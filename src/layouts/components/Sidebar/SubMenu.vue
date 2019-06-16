<template functional>
  <el-submenu :key="props.menuInfo.path" :index="props.menuInfo.path">
    <template slot="title">
      <i v-if="props.menuInfo.meta.icon" :class="props.menuInfo.meta.icon"></i>
      <span>{{ props.menuInfo.meta.title }}</span>
    </template>
    <template v-for="item in props.menuInfo.children">
      <el-menu-item v-if="!item.children" :index="item.path" :key="item.path">
        <i v-if="item.meta.icon" :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
      <sub-menu v-else :key="item.path" :menu-info="item" />
    </template>
  </el-submenu>
</template>

<script>
export default {
  props: ["menuInfo"]
};
</script>

<style></style>
