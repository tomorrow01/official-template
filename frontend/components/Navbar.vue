<template>
  <nav class="navbar">
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
          class="mobile-menu-btn"
          @click="toggleMenu"
          aria-label="打开菜单"
        >
          <span class="menu-icon"></span>
        </button>
      </div>
    </div>
    <!-- 移动端菜单 -->
    <div class="mobile-menu" :class="{ 'menu-open': mobileMenuOpen }">
      <div class="mobile-menu-content">
        <NuxtLink to="/" class="mobile-nav-item" @click="toggleMenu">首页</NuxtLink>
        <NuxtLink to="/about" class="mobile-nav-item" @click="toggleMenu">关于我们</NuxtLink>
        <NuxtLink to="/services" class="mobile-nav-item" @click="toggleMenu">核心服务</NuxtLink>
        <NuxtLink to="/cases" class="mobile-nav-item" @click="toggleMenu">客户案例</NuxtLink>
        <NuxtLink to="/articles" class="mobile-nav-item" @click="toggleMenu">最新动态</NuxtLink>
        <NuxtLink to="/contact" class="mobile-nav-item" @click="toggleMenu">联系我们</NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

const toggleMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<style scoped>
/* 基础导航栏样式 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 9999;
  padding: 1rem 0;
  background-color: #1a1a1a;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
}

.logo {
  display: flex;
  align-items: center;
  z-index: 1001;
  height: 40px;
}

.logo-img {
  height: 40px;
  width: auto;
  display: block;
}

/* 桌面导航样式 - 默认显示 */
.desktop-nav {
  display: flex;
  align-items: center;
  z-index: 1000;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  cursor: pointer;
  display: block;
  transition: color 0.3s ease;
}

.nav-item:hover {
  color: #ccc;
}

.nav-item-active {
  color: #4CAF50;
}

/* 移动端导航 - 默认隐藏 */
.mobile-nav {
  z-index: 1001;
  display: none;
}

.mobile-menu-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-icon {
  display: block;
  width: 24px;
  height: 20px;
  position: relative;
}

.menu-icon::before,
.menu-icon::after,
.menu-icon span {
  content: '';
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: white;
}

.menu-icon span {
  top: 9px;
}

.menu-icon::before {
  top: 0;
}

.menu-icon::after {
  bottom: 0;
}

/* 移动端菜单样式 - 默认隐藏 */
.mobile-menu {
  position: fixed;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100vh;
  background-color: rgba(26, 26, 26, 0.95);
  z-index: 9998;
  transition: left 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 移动端菜单打开状态 */
.mobile-menu.menu-open {
  left: 0;
}

/* 移动端菜单内容 */
.mobile-menu-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
}

/* 移动端导航项样式 */
.mobile-nav-item {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

/* 移动端导航项悬停效果 */
.mobile-nav-item:hover {
  color: #4CAF50;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .container {
    padding: 0 1.5rem;
  }
  
  .nav-menu {
    gap: 1.5rem;
  }
}

@media (max-width: 1024px) {
  .nav-menu {
    gap: 1rem;
  }
  
  .nav-item {
    font-size: 0.95rem;
  }
}

@media (max-width: 768px) {
  /* 显示移动端导航按钮 */
  .mobile-nav {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 隐藏桌面导航 */
  .desktop-nav {
    display: none;
  }

  /* 移动端导航栏样式调整 */
  .navbar {
    padding: 0.5rem 1rem;
  }
  
  .container {
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 0.5rem 0;
  }
  
  .logo-img {
    height: 30px;
  }
  
  .container {
    padding: 0 0.75rem;
  }
}
</style>