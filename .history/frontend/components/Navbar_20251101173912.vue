<template>
  <nav class="navbar fixed w-full top-0 z-50 transition-all duration-300" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="container">
      <NuxtLink to="/" class="logo" aria-label="官网首页">
        <img src="/images/logo.png" alt="官网logo" class="logo-img">
      </NuxtLink>
      
      <!-- 桌面导航 -->
      <div class="desktop-nav">
        <el-menu 
          mode="horizontal" 
          class="nav-menu"
          :default-active="currentRoute.path"
          router
        >
          <el-menu-item index="/" class="nav-item">首页</el-menu-item>
          <el-menu-item index="/about" class="nav-item">关于我们</el-menu-item>
          <el-menu-item index="/services" class="nav-item">核心服务</el-menu-item>
          <el-menu-item index="/cases" class="nav-item">客户案例</el-menu-item>
          <el-menu-item index="/articles" class="nav-item">最新动态</el-menu-item>
          <el-menu-item index="/contact" class="nav-item">联系我们</el-menu-item>
        </el-menu>
      </div>
      
      <!-- 移动端菜单按钮 -->
      <div class="mobile-nav">
        <el-button 
          icon="el-icon-menu" 
          circle 
          @click="toggleMenu" 
          class="mobile-menu-btn"
          aria-label="打开菜单"
        />
      </div>
    </div>
    
    <!-- 移动端导航菜单 -->
    <div v-if="mobileMenuOpen" class="mobile-menu-overlay" @click="toggleMenu">
      <div class="mobile-menu" @click.stop>
        <el-button 
          icon="el-icon-close" 
          circle 
          @click="toggleMenu" 
          class="mobile-close-btn"
          aria-label="关闭菜单"
        />
        <el-menu 
          mode="vertical" 
          class="mobile-nav-menu"
          :default-active="currentRoute.path"
          router
          @select="toggleMenu"
        >
          <el-menu-item index="/" class="mobile-nav-item">首页</el-menu-item>
          <el-menu-item index="/about" class="mobile-nav-item">关于我们</el-menu-item>
          <el-menu-item index="/services" class="mobile-nav-item">核心服务</el-menu-item>
          <el-menu-item index="/cases" class="mobile-nav-item">客户案例</el-menu-item>
          <el-menu-item index="/articles" class="mobile-nav-item">最新动态</el-menu-item>
          <el-menu-item index="/contact" class="mobile-nav-item">联系我们</el-menu-item>
        </el-menu>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { onMounted, onUnmounted, ref } from 'vue';
const currentRoute = useRoute();
const isScrolled = ref(false);
const mobileMenuOpen = ref(false);

// 处理滚动事件，改变导航栏样式
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

// 切换移动端菜单
const toggleMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  // 防止滚动穿透
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.navbar {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: var(--spacing-md) 0;
  box-shadow: var(--shadow-light);
}

.navbar-scrolled {
  padding: var(--spacing-sm) 0;
  box-shadow: var(--shadow-medium);
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
}

.logo {
  display: flex;
  align-items: center;
  transition: transform var(--transition-fast);
}

.logo:hover {
  transform: scale(1.05);
}

.logo-img {
  height: 40px;
  width: auto;
}

/* 桌面导航 */
.desktop-nav {
  display: block;
}

.nav-menu {
  border-bottom: none;
  background: transparent;
}

.nav-item {
  position: relative;
  font-size: 16px;
  font-weight: 500;
  transition: color var(--transition-fast);
  margin: 0 var(--spacing-sm);
}

.nav-item:hover {
  color: var(--primary-color) !important;
}

.nav-item.is-active {
  color: var(--primary-color) !important;
  font-weight: 600;
}

.nav-item.is-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 15%;
  width: 70%;
  height: 3px;
  background-color: var(--primary-color);
  border-radius: var(--radius-full);
}

/* 移动端导航 */
.mobile-nav {
  display: none;
}

.mobile-menu-btn {
  background-color: var(--primary-color);
  color: white;
}

.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 51;
  display: flex;
  justify-content: flex-end;
  animation: fadeIn var(--transition-fast);
}

.mobile-menu {
  width: 80%;
  max-width: 300px;
  height: 100%;
  background-color: var(--bg-container);
  padding: var(--spacing-lg);
  position: relative;
  animation: slideIn var(--transition-normal);
}

.mobile-close-btn {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
}

.mobile-nav-menu {
  margin-top: var(--spacing-2xl);
  border-right: none;
}

.mobile-nav-item {
  margin-bottom: var(--spacing-sm);
  font-size: 18px;
  padding: var(--spacing-lg) var(--spacing-md);
}

/* 动画 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .nav-item {
    margin: 0 var(--spacing-xs);
    font-size: 15px;
  }
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
  
  .mobile-nav {
    display: block;
  }
  
  .logo-img {
    height: 36px;
  }
}
</style>