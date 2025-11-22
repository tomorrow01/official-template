<template>
  <div>
    <NuxtRouteAnnouncer />  <!-- 保留路由提示组件（辅助功能） -->
    <Navbar />  <!-- 添加全局导航条组件 -->
    <div class="page-content">
      <NuxtPage />  <!-- 替换为路由页面组件，自动加载 pages/index.vue 作为首页 -->
    </div>
    <!-- <NuxtWelcome /> -->
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
