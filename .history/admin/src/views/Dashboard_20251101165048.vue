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
              欢迎回来，{{ currentUser.username }}！当前时间：{{ currentTime }}
            </div>
          </div>
          <!-- 用户信息和主题切换 -->
          <div class="flex items-center space-x-4">
            <!-- 用户头像和信息 -->
            <el-dropdown>
              <div class="flex items-center cursor-pointer">
                <el-avatar :size="36" :src="userAvatar">{{ currentUser.username[0] }}</el-avatar>
                <span class="ml-2 font-medium">{{ currentUser.username }}</span>
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleProfile">个人信息</el-dropdown-item>
                  <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            
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
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { ArrowDown } from '@element-plus/icons-vue';

// 主题管理
const currentTheme = ref(localStorage.getItem('admin-theme') || 'default');
const router = useRouter();

// 用户信息管理
const currentUser = ref(JSON.parse(localStorage.getItem('admin-user')) || { username: '管理员' });
const userAvatar = ref('');

// 当前时间（计算属性）
const currentTime = computed(() => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
});

// 切换主题
const switchTheme = (theme) => {
  document.documentElement.className = `theme-${theme}`;
  localStorage.setItem('admin-theme', theme);
};

// 处理个人信息
const handleProfile = () => {
  ElMessage.info('个人信息功能开发中');
};

// 处理退出登录
const handleLogout = () => {
  localStorage.removeItem('admin-user');
  router.push('/login');
};

onMounted(() => {
  switchTheme(currentTheme.value);
  
  // 定时更新时间显示
  setInterval(() => {
    // 触发计算属性更新
    currentTime.value;
  }, 1000);
  
  // 生成随机头像颜色
  const colors = ['#f56c6c', '#e6a23c', '#5cb87a', '#1989fa', '#6f7ad3', '#909399'];
  const avatarColor = colors[Math.floor(Math.random() * colors.length)];
  userAvatar.value = avatarColor;
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