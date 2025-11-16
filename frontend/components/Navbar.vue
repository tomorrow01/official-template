<template>
  <nav class="navbar fixed w-full top-0 z-50 transition-all duration-300" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="container">
      <NuxtLink to="/" class="logo" aria-label="官网首页">
        <img src="/images/mingri-tech-logo.svg" alt="明日科技logo" class="logo-img">
      </NuxtLink>
      
      <!-- 桌面导航 -->
      <div class="desktop-nav">
        <div class="nav-menu">
          <NuxtLink to="/" class="nav-item" active-class="nav-item-active">首页</NuxtLink>
          <NuxtLink to="/about" class="nav-item" active-class="nav-item-active">关于我们</NuxtLink>
          <NuxtLink to="/services" class="nav-item" active-class="nav-item-active">核心服务</NuxtLink>
          <NuxtLink to="/cases" class="nav-item" active-class="nav-item-active">客户案例</NuxtLink>
          <NuxtLink to="/articles" class="nav-item" active-class="nav-item-active">最新动态</NuxtLink>
          <NuxtLink to="/contact" class="nav-item" active-class="nav-item-active">联系我们</NuxtLink>
        </div>
      </div>
      
      <!-- 移动端菜单按钮 -->
      <div class="mobile-nav">
        <button 
          @click="toggleMenu" 
          class="mobile-menu-btn"
          aria-label="打开菜单"
          :aria-expanded="mobileMenuOpen"
        >
          <span class="menu-icon" :class="{ 'menu-icon-active': mobileMenuOpen }"></span>
        </button>
      </div>
    </div>
    
    <!-- 移动端导航菜单 -->
    <transition name="mobile-menu">
      <div v-if="mobileMenuOpen" class="mobile-menu-overlay" @click="toggleMenu">
        <div class="mobile-menu" @click.stop>
          <button 
            @click="toggleMenu" 
            class="mobile-close-btn"
            aria-label="关闭菜单"
          >
            <span class="close-icon"></span>
          </button>
          <div class="mobile-nav-menu">
            <NuxtLink to="/" class="mobile-nav-item" active-class="nav-item-active" @click="toggleMenu">首页</NuxtLink>
            <NuxtLink to="/about" class="mobile-nav-item" active-class="nav-item-active" @click="toggleMenu">关于我们</NuxtLink>
            <NuxtLink to="/services" class="mobile-nav-item" active-class="nav-item-active" @click="toggleMenu">核心服务</NuxtLink>
            <NuxtLink to="/cases" class="mobile-nav-item" active-class="nav-item-active" @click="toggleMenu">客户案例</NuxtLink>
            <NuxtLink to="/articles" class="mobile-nav-item" active-class="nav-item-active" @click="toggleMenu">最新动态</NuxtLink>
            <NuxtLink to="/contact" class="mobile-nav-item" active-class="nav-item-active" @click="toggleMenu">联系我们</NuxtLink>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
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
  if (typeof document !== 'undefined') {
    document.body.style.overflow = mobileMenuOpen.value ? 'hidden' : '';
    document.body.style.paddingRight = mobileMenuOpen.value ? '15px' : ''; // 防止内容跳动
    document.documentElement.style.overflow = mobileMenuOpen.value ? 'hidden' : '';
  }
};

// 监听路由变化，自动关闭移动端菜单
watch(() => router.currentRoute.value.path, () => {
  if (mobileMenuOpen.value) {
    mobileMenuOpen.value = false;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.documentElement.style.overflow = '';
    }
  }
});

// 监听窗口大小变化，在桌面端时自动关闭移动端菜单
const handleResize = () => {
  if (typeof window !== 'undefined' && window.innerWidth >= 768 && mobileMenuOpen.value) {
    mobileMenuOpen.value = false;
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    document.documentElement.style.overflow = '';
  }
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    // 初始化滚动状态
    handleScroll();
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleResize);
    // 清理样式
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    document.documentElement.style.overflow = '';
  }
});
</script>

<style scoped>
.navbar {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: var(--spacing-md) 0;
  box-shadow: var(--shadow-light);
  transition: all 0.3s ease-in-out;
  /* 确保在所有情况下都固定在顶部 */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
}

.navbar-scrolled {
  padding: var(--spacing-sm) 0;
  box-shadow: var(--shadow-medium);
  background-color: rgba(255, 255, 255, 0.98);
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
  padding: 0 var(--spacing-md);
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
  z-index: 10;
}

.logo:hover {
  transform: scale(1.05);
}

.logo-img {
  height: 40px;
  width: auto;
  transition: all 0.3s ease;
  max-width: 120px;
}

/* 桌面导航 */
.desktop-nav {
  display: block;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.nav-item {
  position: relative;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  padding: var(--spacing-sm) var(--spacing-xs);
  transition: all 0.3s ease;
  white-space: nowrap;
}

.nav-item:hover {
  color: var(--primary-color) !important;
}

/* 修复活动状态选择器 */
.nav-item-active {
  color: var(--primary-color) !important;
  font-weight: 600;
}

.nav-item-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 15%;
  width: 70%;
  height: 3px;
  background-color: var(--primary-color);
  border-radius: 9999px;
  transition: width 0.3s ease;
}

/* 移动端导航 */
.mobile-nav {
  display: none;
  z-index: 10;
}

/* 移动端菜单按钮样式 */
.mobile-menu-btn {
  background: none;
  border: none;
  width: 44px;
  height: 44px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0;
  transition: all 0.3s ease;
}

.mobile-menu-btn:hover {
  transform: scale(1.1);
}

/* 菜单图标样式 */
.menu-icon {
  display: block;
  width: 24px;
  height: 2px;
  background-color: #333;
  position: relative;
  transition: background-color 0.3s ease;
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background-color: #333;
  transition: all 0.3s ease;
  left: 0;
}

.menu-icon::before {
  top: -8px;
}

.menu-icon::after {
  bottom: -8px;
}

/* 菜单打开状态 */
.menu-icon-active {
  background-color: transparent;
}

.menu-icon-active::before {
  transform: rotate(45deg);
  top: 0;
}

.menu-icon-active::after {
  transform: rotate(-45deg);
  bottom: 0;
}

/* 移动端菜单样式 */
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
  backdrop-filter: blur(2px);
}

.mobile-menu {
  width: 80%;
  max-width: 300px;
  height: 100%;
  background-color: #fff;
  padding: var(--spacing-lg);
  position: relative;
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.mobile-close-btn {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  background: none;
  border: none;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: transform 0.3s ease;
}

.mobile-close-btn:hover {
  transform: scale(1.1);
}

/* 关闭图标样式 */
.close-icon {
  display: block;
  width: 24px;
  height: 2px;
  background-color: #333;
  transform: rotate(45deg);
  position: relative;
}

.close-icon::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background-color: #333;
  transform: rotate(-90deg);
  left: 0;
  top: 0;
}

.mobile-nav-menu {
  margin-top: var(--spacing-2xl);
  display: flex;
  flex-direction: column;
}

.mobile-nav-item {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  padding: var(--spacing-lg) var(--spacing-md);
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s ease;
}

.mobile-nav-item:hover {
  color: var(--primary-color) !important;
  background-color: #f8f9fa;
  padding-left: calc(var(--spacing-md) + 5px);
}

.mobile-nav-item.nav-item-active {
  color: var(--primary-color) !important;
  font-weight: 600;
  background-color: #f8f9fa;
}

/* Vue过渡动画 */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}

.mobile-menu-enter-from .mobile-menu,
.mobile-menu-leave-to .mobile-menu {
  transform: translateX(100%);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .container {
    padding: 0 var(--spacing-sm);
  }
  
  .nav-item {
    font-size: 15px;
  }
}

@media (max-width: 1024px) {
  .nav-menu {
    gap: var(--spacing-xs);
  }
  
  .nav-item {
    margin: 0;
    font-size: 14px;
    padding: var(--spacing-xs) 0;
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
  
  .container {
    padding: 0 var(--spacing-sm);
  }
  
  .navbar {
    padding: var(--spacing-sm) 0;
  }
  
  .mobile-menu {
    width: 90%;
    max-width: 320px;
  }
}

@media (max-width: 480px) {
  .mobile-menu {
    width: 100%;
  }
  
  .logo-img {
    height: 32px;
  }
}

/* 滚动条样式优化 */
.mobile-menu::-webkit-scrollbar {
  width: 4px;
}

.mobile-menu::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.mobile-menu::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 2px;
}

.mobile-menu::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>