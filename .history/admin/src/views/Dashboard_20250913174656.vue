<template>
  <div class="dashboard-wrapper">
    <el-container class="h-screen">
      <!-- 左侧导航条 -->
      <el-aside width="200px" class="bg-container border-r">
        <el-menu 
          default-active="/dashboard/articles" 
          router 
          class="h-full"
        >
          <el-menu-item index="/dashboard/articles">文章管理</el-menu-item>
          <el-menu-item index="/dashboard/banners">轮播图管理</el-menu-item>
          <el-menu-item index="/dashboard/content">内容管理</el-menu-item>
          <el-menu-item index="/dashboard/services">服务管理</el-menu-item>
          <el-menu-item index="/dashboard/cases">案例管理</el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 右侧内容区 -->
      <el-container>
        <el-header class="bg-container border-b py-4 px-6 flex justify-between items-center">
          <h1 class="text-xl font-bold">后台管理系统</h1>
          <!-- 主题切换下拉 -->
          <el-select 
            v-model="currentTheme" 
            placeholder="选择主题"
            @change="switchTheme"
            class="w-40"
          >
            <el-option label="默认蓝" value="default"></el-option>
            <el-option label="深主题" value="dark"></el-option>
            <el-option label="清新绿" value="green"></el-option>
          </el-select>
        </el-header>
        <el-main class="p-6 bg-container">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 主题管理
const currentTheme = ref(localStorage.getItem('admin-theme') || 'default');

const switchTheme = (theme) => {
  document.documentElement.className = `theme-${theme}`;
  localStorage.setItem('admin-theme', theme);
};

onMounted(() => {
  switchTheme(currentTheme.value);
});
</script>

<style scoped>
.dashboard-wrapper {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100vh;
}

.el-aside {
  border-right: 1px solid var(--border-color);
  background: var(--bg-container);
}

.el-header {
  border-bottom: 1px solid var(--border-color);
}

.el-main {
  overflow-y: auto;
  border-radius: 8px;
  margin: 20px;
  box-shadow: var(--shadow-light);
}

/* 现代简约字体 */
body {
  font-family: 'Inter', 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
}
</style>