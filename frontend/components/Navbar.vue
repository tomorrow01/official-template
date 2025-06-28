<template>
  <!-- <el-header class=""> -->
    <div class="container">
      <NuxtLink to="/" class="logo">
        <img src="/images/logo.png" alt="官网logo" class="logo-img">
      </NuxtLink>
      <el-menu 
        mode="horizontal" 
        class="nav-menu"
        :default-active="currentRoute.path"
      >
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/about">关于我们</el-menu-item>
        <el-menu-item index="/services">核心服务</el-menu-item>
        <el-menu-item index="/cases">客户案例</el-menu-item>
        <el-menu-item index="/contact">联系我们</el-menu-item>
      </el-menu>
    </div>
  <!-- </el-header> -->
</template>

<script setup>
import { useRoute } from 'vue-router';
const currentRoute = useRoute();
</script>

<style scoped>
.navbar {
  background: var(--bg-container);
  border-bottom: 1px solid var(--border-color);
  padding: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}

.logo-img {
  height: 40px;
}

/* 改为普通 CSS 语法（移除嵌套） */
.nav-menu {
  border-bottom: none;
}

.nav-menu .el-menu-item {
  /* height: 80px; */
  line-height: 80px;
  font-size: 16px;
}
</style>