<script setup>
// 重新导入Navbar组件
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="app-container">
    <!-- 重新添加Navbar组件 -->
    <Navbar />
    <div class="page-content">
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </div>
  </div>
</template>

<style>
/* 全局内容容器样式，避免被导航条遮挡 */
.page-content {
  padding-top: 70px; /* 调整为与导航栏实际高度匹配 */
  min-height: 100vh;
  box-sizing: border-box;
}

/* 移动端响应式调整 */
@media (max-width: 768px) {
  .page-content {
    padding-top: 64px; /* 移动端调整为与导航栏实际高度匹配 */
  }
}
</style>
