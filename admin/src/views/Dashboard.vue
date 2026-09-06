<template>
  <div class="dashboard-wrapper">
    <!-- 顶部导航栏 -->
    <div class="top-nav">
      <div class="nav-left">
        <!-- 移动端汉堡按钮 -->
        <button 
          v-if="isMobile" 
          class="hamburger-btn"
          @click="drawerVisible = true"
          aria-label="打开菜单"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
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
        <el-dropdown trigger="click" @command="handleUserCommand">
          <div class="user-info">
            <el-avatar size="small" :style="avatarStyle(currentUser.username)">
              {{ avatarText(currentUser.username) }}
            </el-avatar>
            <span class="username">{{ currentUser.username }}</span>
            <span v-if="currentUser.role === 'admin'" class="role-tag">管理员</span>
            <el-icon class="dropdown-icon"><ArrowDown /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile">个人信息</el-dropdown-item>
              <el-dropdown-item command="password">修改密码</el-dropdown-item>
              <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    
    <!-- 主要内容区域 -->
    <div class="main-container">
      <!-- 左侧导航条（桌面端固定） -->
      <div v-if="!isMobile" class="sidebar">
        <div class="nav-header">功能导航</div>
        <el-menu 
          :default-active="activeMenu" 
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
          <el-menu-item v-if="isAdmin" index="/dashboard/account">账号管理</el-menu-item>
        </el-menu>
      </div>

      <!-- 右侧内容区 -->
      <div class="content-area">
        <div class="content-header">
          <div class="welcome-message">
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
    
    <!-- 页脚（移动端隐藏） -->
    <div v-if="!isMobile" class="footer">
      <div>© 2023 管理后台系统. All rights reserved.</div>
    </div>

    <!-- 移动端侧边栏抽屉 -->
    <el-drawer
      v-if="isMobile"
      v-model="drawerVisible"
      direction="ltr"
      :size="260"
      :show-close="true"
      :with-header="false"
      :modal="true"
      class="mobile-sidebar-drawer"
    >
      <div class="drawer-inner">
        <div class="nav-header">功能导航</div>
        <el-menu 
          :default-active="activeMenu" 
          router 
          class="nav-menu"
          background-color="#2c3e50"
          text-color="#fff"
          active-text-color="#409eff"
          @select="drawerVisible = false"
        >
          <el-menu-item index="/dashboard/config">基础配置管理</el-menu-item>
          <el-menu-item index="/dashboard/articles">文章管理</el-menu-item>
          <el-menu-item index="/dashboard/banners">轮播图管理</el-menu-item>
          <el-menu-item index="/dashboard/content">内容管理</el-menu-item>
          <el-menu-item index="/dashboard/services">核心服务管理</el-menu-item>
          <el-menu-item index="/dashboard/cases">案例管理</el-menu-item>
          <el-menu-item index="/dashboard/latest-news">最新动态管理</el-menu-item>
          <el-menu-item index="/dashboard/contacts">联系我们管理</el-menu-item>
          <el-menu-item v-if="isAdmin" index="/dashboard/account">账号管理</el-menu-item>
        </el-menu>
      </div>
    </el-drawer>

    <!-- 修改密码 dialog -->
    <el-dialog 
      v-model="showPasswordDialog" 
      title="修改密码" 
      width="420px"
      destroy-on-close
    >
      <el-form :model="passwordForm" label-width="100px">
        <el-form-item label="旧密码">
          <el-input v-model="passwordForm.oldPassword" type="password" show-password placeholder="请输入旧密码" />
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="passwordForm.newPassword" type="password" show-password placeholder="至少 6 个字符" />
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input v-model="passwordForm.confirmPassword" type="password" show-password placeholder="再次输入新密码" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showPasswordDialog = false">取消</el-button>
        <el-button type="primary" :loading="passwordLoading" @click="handleChangePassword">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ArrowDown } from '@element-plus/icons-vue';
import { clearAuth, authAPI } from '../utils/api';

const route = useRoute();
const router = useRouter();

// 当前活跃菜单
const activeMenu = computed(() => route.path);

// 移动端判断（<=768px 算移动端）
const MOBILE_BREAKPOINT = 768;
const isMobile = ref(false);
const drawerVisible = ref(false);

function checkMobile() {
  isMobile.value = window.innerWidth <= MOBILE_BREAKPOINT;
  if (!isMobile.value) drawerVisible.value = false;
}

// 用户信息
const currentUser = ref(JSON.parse(localStorage.getItem('admin-user')) || { username: '管理员', role: 'editor' });
// ===== 头像工具 =====
const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #1e90ff, #00bfff)',
  'linear-gradient(135deg, #9370db, #6a5acd)',
  'linear-gradient(135deg, #ff6b6b, #ee5a24)',
  'linear-gradient(135deg, #26de81, #20bf6b)',
  'linear-gradient(135deg, #fd9644, #fa8231)',
  'linear-gradient(135deg, #a55eea, #8854d0)'
];

function avatarText(username) {
  if (!username) return '+';
  const c = username.trim().charAt(0);
  return c ? c.toUpperCase() : '+';
}

function avatarStyle(username) {
  const idx = [...(username || '')].reduce((s, c) => s + c.charCodeAt(0), 0) % AVATAR_GRADIENTS.length;
  return {
    background: AVATAR_GRADIENTS[idx],
    color: '#fff',
    fontSize: '13px',
    fontWeight: 600,
    border: '2px solid rgba(255,255,255,0.6)'
  };
}

const isAdmin = computed(() => currentUser.value.role === 'admin');

// 修改密码 dialog
const showPasswordDialog = ref(false);
const passwordForm = ref({ oldPassword: '', newPassword: '', confirmPassword: '' });
const passwordLoading = ref(false);

// 用户下拉菜单命令
async function handleUserCommand(command) {
  if (command === 'logout') {
    try {
      await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      });
      clearAuth();
      ElMessage.success('已退出登录');
      router.replace('/login');
    } catch {}
  } else if (command === 'password') {
    passwordForm.value = { oldPassword: '', newPassword: '', confirmPassword: '' };
    showPasswordDialog.value = true;
  } else if (command === 'profile') {
    ElMessage.info(`用户名：${currentUser.value.username}\n角色：${isAdmin.value ? '管理员' : '编辑'}`);
  }
}

// 提交修改密码
async function handleChangePassword() {
  const { oldPassword, newPassword, confirmPassword } = passwordForm.value;
  if (!oldPassword || !newPassword || !confirmPassword) {
    ElMessage.warning('请填写所有字段'); return;
  }
  if (newPassword.length < 6) {
    ElMessage.warning('新密码至少 6 个字符'); return;
  }
  if (newPassword !== confirmPassword) {
    ElMessage.warning('两次输入的新密码不一致'); return;
  }
  passwordLoading.value = true;
  try {
    await authAPI.changePassword(oldPassword, newPassword);
    ElMessage.success('密码修改成功，请用新密码重新登录');
    showPasswordDialog.value = false;
    clearAuth();
    router.replace('/login');
  } catch {} finally {
    passwordLoading.value = false;
  }
}

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
  document.documentElement.className = '';
  localStorage.removeItem('admin-theme');
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});

watch(() => route.path, () => {
  if (isMobile.value) drawerVisible.value = false;
});
</script>

<style scoped>
/* ========== 基础布局 ========== */
.dashboard-wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

/* ========== 顶部导航栏 ========== */
.top-nav {
  height: 64px;
  flex-shrink: 0;
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

/* 科技感装饰 */
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

.nav-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo svg {
  color: #fff;
  flex-shrink: 0;
}

.logo h1 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
}

.nav-right {
  flex-shrink: 0;
}

.user-info {
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 8px;
}

.user-info .username {
  color: #fff;
  font-weight: 500;
}

.user-info .role-tag {
  background: rgba(255,255,255,0.2);
  color: #fff;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
  line-height: 1.2;
}

.user-info .dropdown-icon {
  color: rgba(255,255,255,0.8);
  font-size: 14px;
  transition: transform 0.2s;
  cursor: pointer;
}

/* ========== 汉堡按钮（移动端） ========== */
.hamburger-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s;
  padding: 0;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.hamburger-btn:active {
  background: rgba(255, 255, 255, 0.3);
}

/* ========== 主容器 ========== */
.main-container {
  flex: 1;
  display: flex;
  min-height: calc(100vh - 64px - 40px);
  overflow: hidden;
}

/* ========== 侧边栏（桌面端固定） ========== */
.sidebar {
  width: 220px;
  flex-shrink: 0;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  border-right: 2px solid #34495e;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

/* ========== 内容区 ========== */
.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
  min-width: 0; /* 防止内容溢出把容器撑开 */
  overflow: hidden;
}

.content-header {
  height: 50px;
  flex-shrink: 0;
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

.content-main {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

/* ========== 页脚 ========== */
.footer {
  height: 40px;
  flex-shrink: 0;
  background-color: #fafafa;
  border-top: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: #606266;
}

/* ========== 侧边栏 / 抽屉 公共部分 ========== */
.drawer-inner {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
}

.nav-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  margin: 0;
  background: #34495e;
  border-bottom: 1px solid #1a2530;
  font-size: 16px;
  font-weight: bold;
  color: white;
  text-align: center;
  width: 100%;
  flex-shrink: 0;
}

.nav-menu {
  border-right: none !important;
  flex: 1;
  overflow-y: auto;
}

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

/* ========== 路由视图容器 ========== */
.router-view-container {
  background: white;
  border-radius: 8px;
  padding: 20px;
  min-height: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

body {
  font-family: 'Inter', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 400;
  background-color: #f5f7fa;
}

/* ========== 移动端抽屉内 el-menu 的高度 ========== */
.mobile-sidebar-drawer :deep(.el-drawer__body) {
  padding: 0;
  background: #2c3e50;
}

/* ============================================================
   移动端响应式（<= 768px）
   ============================================================ */
@media (max-width: 768px) {
  /* 顶部导航更紧凑 */
  .top-nav {
    height: 56px;
    padding: 0 12px;
  }

  .logo svg {
    width: 24px;
    height: 24px;
  }

  .logo h1 {
    font-size: 16px;
  }

  .user-info {
    gap: 4px;
  }

  /* 桌面端用户名隐藏（窄屏显示不下） */
  .user-info .username {
    display: none;
  }

  /* 主容器：不要用固定 calc，让它自然撑满 */
  .main-container {
    min-height: calc(100vh - 56px);
  }

  /* 内容头部简化 */
  .content-header {
    height: 44px;
    padding: 0 12px;
  }

  .welcome-message {
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* 内容区 padding 缩小 */
  .content-main {
    padding: 12px;
  }

  .router-view-container {
    padding: 16px;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
}

/* 超小屏（<= 480px）进一步优化 */
@media (max-width: 480px) {
  .top-nav {
    height: 52px;
    padding: 0 10px;
  }

  .hamburger-btn {
    width: 36px;
    height: 36px;
  }

  .logo h1 {
    font-size: 15px;
  }

  .content-main {
    padding: 8px;
  }

  .router-view-container {
    padding: 12px;
  }
}
</style>
