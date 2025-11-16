<template>
  <div>
    <NuxtRouteAnnouncer />  <!-- 保留路由提示组件（辅助功能） -->
    <NuxtPage />  <!-- 替换为路由页面组件，自动加载 pages/index.vue 作为首页 -->
    <!-- <NuxtWelcome /> -->
  </div>
</template>

<style>
/* 全局样式，为所有页面添加上边距，避免内容被固定导航条覆盖 */
:root {
  --navbar-height: 80px;
}

/* 为所有页面的主要容器添加上边距 */
.home-container,
.about-page,
.services-page,
.cases-page,
.articles-page,
.contact-page {
  padding-top: var(--navbar-height) !important;
  margin-top: 0 !important;
}

/* 特别处理首页英雄区域 */
.home-container .hero-section {
  margin-top: calc(-1 * var(--navbar-height)) !important;
  padding-top: var(--navbar-height) !important;
}
</style>
