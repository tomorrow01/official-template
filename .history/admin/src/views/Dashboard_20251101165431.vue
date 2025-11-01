<template>
  <div class="dashboard-wrapper">
    <el-container class="h-screen">
      <!-- 左侧导航条 -->
      <el-aside width="220px" class="border-r">
        <div class="nav-header flex items-center justify-center py-4 text-white font-bold text-lg">
          管理控制台
        </div>
        <el-menu 
          default-active="/dashboard/articles" 
          router 
          class="h-full nav-menu"
          background-color="#2c3e50"
          text-color="#fff"
          active-text-color="#409eff"
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
          <div>
            <h1 class="text-2xl font-bold text-primary">后台管理系统</h1>
            <!-- 欢迎登录模块 -->
            <div class="welcome-message mt-1 text-gray-600">
              欢迎回来，{{ currentUser.username }}！
            </div>
          </div>
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
import { useRouter } from 'vue-router';

// 主题管理
const currentTheme = ref(localStorage.getItem('admin-theme') || 'default');
const router = useRouter();

// 用户信息管理
const currentUser = ref(JSON.parse(localStorage.getItem('admin-user')) || { username: '管理员' });

// 切换主题
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
  padding: 0;
  height: 100vh;
}

.el-aside {
  border-right: 2px solid #34495e;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
}

.nav-header {
  background: #34495e;
  border-bottom: 1px solid #1a2530;
}

.nav-menu {
  border-right: none !important;
}

/* 导航项美化 */
:deep(.el-menu-item) {
  padding: 0 20px !important;
  height: 50px !important;
  line-height: 50px !important;
  font-size: 14px;
  transition: all 0.3s ease;
}

:deep(.el-menu-item:hover) {
  background-color: #34495e !important;
  color: #409eff !important;
  font-weight: 500;
}

:deep(.el-menu-item.is-active) {
  background-color: #409eff !important;
  color: #fff !important;
  font-weight: 500;
}

.el-header {
  border-bottom: 1px solid #e0e0e0;
  background: #fafafa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.el-main {
  overflow-y: auto;
  border-radius: 8px;
  margin: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: white;
}

/* 现代简约字体 */
body {
  font-family: 'Inter', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 400;
  background-color: #f5f7fa;
}

.text-primary {
  color: #409eff;
}

.text-gray-600 {
  color: #606266;
}

.mt-1 {
  margin-top: 4px;
}

.space-x-4 {
  gap: 16px;
}

.cursor-pointer {
  cursor: pointer;
}
</style>