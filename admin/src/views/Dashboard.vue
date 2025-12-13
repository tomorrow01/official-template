<template>
  <div class="dashboard-wrapper">
    <!-- 顶部导航栏 -->
    <div class="top-nav">
      <div class="nav-left">
        <div class="logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
          <h1>管理后台</h1>
        </div>
      </div>
      <div class="nav-right">
        <div class="user-info">
          <el-avatar size="small" icon="el-icon-user" class="mr-2"></el-avatar>
          <span>{{ currentUser.username }}</span>
          <el-button type="text" size="small" class="ml-4 logout-btn" @click="handleLogout">
            退出登录
          </el-button>
        </div>
      </div>
    </div>
    
    <!-- 主要内容区域 -->
    <div class="main-container">
      <!-- 左侧导航条 -->
      <div class="sidebar">
        <div class="nav-header flex items-center justify-start py-5 pl-20 text-white font-bold text-xl">
          功能导航
        </div>
        <el-menu 
          default-active="/dashboard/config" 
          router 
          class="nav-menu"
          background-color="#2c3e50"
          text-color="#fff"
          active-text-color="#409eff"
        >
          <el-menu-item index="/dashboard/config">基础配置管理</el-menu-item>
          <el-menu-item index="/dashboard/articles">文章管理</el-menu-item>
          <el-menu-item index="/dashboard/banners">轮播图管理</el-menu-item>
          <el-menu-item index="/dashboard/content">内容管理</el-menu-item>
          <el-menu-item index="/dashboard/services">核心服务管理</el-menu-item>
          <el-menu-item index="/dashboard/cases">案例管理</el-menu-item>
          <el-menu-item index="/dashboard/latest-news">最新动态管理</el-menu-item>
          <el-menu-item index="/dashboard/contacts">联系我们管理</el-menu-item>
        </el-menu>
      </div>

      <!-- 右侧内容区 -->
      <div class="content-area">
        <div class="content-header">
          <div class="welcome-message text-gray-600">
            欢迎回来，{{ currentUser.username }}！
          </div>
        </div>
        <div class="content-main">
          <div class="router-view-container">
            <router-view />
          </div>
        </div>
      </div>
    </div>
    
    <!-- 页脚 -->
    <div class="footer">
      <div>© 2023 管理后台系统. All rights reserved.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';


const router = useRouter();
const route = useRoute();

// 用户信息管理
let userData = localStorage.getItem('admin-user');
let initialUser = { username: '管理员' };
try {
  if (userData) {
    initialUser = JSON.parse(userData);
  }
} catch (error) {
  console.error('解析用户信息失败:', error);
  // 解析失败时使用默认值并清除无效数据
  localStorage.removeItem('admin-user');
}
const currentUser = ref(initialUser);
onMounted(() => {
  // 移除主题相关的类名，确保使用默认主题
  document.documentElement.className = '';
  // 清除本地存储中的主题设置
  localStorage.removeItem('admin-theme');
});

// 退出登录处理函数
const handleLogout = () => {
  // 清除本地存储中的用户信息
  localStorage.removeItem('admin-user');
  // 清除可能存在的token信息
  localStorage.removeItem('admin-token');
  // 显示退出成功消息
  ElMessage.success('退出登录成功');
  // 跳转到登录页面
  router.push('/login');
};

</script>

<style scoped>
/* 整体布局 */
.dashboard-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 顶部导航栏样式 */
.top-nav {
  height: 80px;
  background: linear-gradient(135deg, #007bff 0%, #00bfff 40%, #8a2be2 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 4px 15px rgba(0, 191, 255, 0.3);
  z-index: 100;
  position: relative;
  overflow: hidden;
}

/* 添加科技感装饰效果 */
.top-nav::before {
  content: '';
  position: absolute;
  top: 0;
  left: -50%;
  width: 200%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  animation: shine 3s infinite;
}

@keyframes shine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.nav-left .logo {
  display: flex;
  align-items: center;
}

.nav-left .logo svg {
  margin-right: 10px;
  color: #fff;
}

.nav-left h1 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
}

.nav-right .user-info {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.nav-right .user-info .el-avatar {
  margin-right: 8px;
}

.nav-right .user-info span {
  color: #fff;
  font-weight: 500;
}

/* 退出登录按钮样式 */
.nav-right .logout-btn {
  color: rgba(255, 255, 255, 0.85);
  padding: 4px 12px;
  border-radius: 4px;
  transition: all 0.3s ease;
  margin-left: 16px;
}

.nav-right .logout-btn:hover {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.2);
}

.nav-right .logout-btn .el-icon {
  margin-right: 4px;
}

/* 主容器 */
.main-container {
  flex: 1;
  display: flex;
  height: calc(100vh - 80px - 40px); /* 减去顶部导航和底部页脚的高度 */
  overflow: hidden;
}

/* 侧边栏 */
.sidebar {
  width: 220px;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  border-right: 2px solid #34495e;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

/* 内容区域 */
.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
  overflow: hidden;
}

/* 内容头部 */
.content-header {
  height: 50px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  background-color: #fafafa;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.welcome-message {
  font-size: 14px;
  color: #606266;
}

/* 内容主体 */
.content-main {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

/* 页脚 */
.footer {
  height: 40px;
  background-color: #fafafa;
  border-top: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: #606266;
}

/* 侧边栏头部 */
.nav-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  margin: 0;
  background: #34495e;
  border-bottom: 1px solid #1a2530;
  font-size: 18px;
  font-weight: bold;
  color: white;
  text-align: center;
  width: 100%;
  flex-shrink: 0;
  overflow: visible;
  text-indent: 0;
}

/* 导航菜单 */
.nav-menu {
  border-right: none !important;
  flex: 1;
  overflow-y: auto;
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

/* 路由视图容器 */
.router-view-container {
  background: white;
  border-radius: 8px;
  padding: 20px;
  min-height: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 现代简约字体 */
body {
  font-family: 'Inter', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 400;
  background-color: #f5f7fa;
}
</style>