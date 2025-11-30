<template>
  <div style="padding: 50px;">
    <h1>导航测试页面</h1>
    
    <!-- 测试直接导航 -->
    <div style="margin-bottom: 20px;">
      <h2>直接使用a标签</h2>
      <a href="/cases/1" style="display: block; margin: 10px 0; padding: 10px; background: blue; color: white;">
        点击这里直接跳转到案例1详情页
      </a>
    </div>
    
    <!-- 测试JavaScript导航 -->
    <div style="margin-bottom: 20px;">
      <h2>使用JavaScript原生导航</h2>
      <button 
        @click="navigateToCase(1)"
        style="display: block; margin: 10px 0; padding: 10px; background: green; color: white; border: none; cursor: pointer;"
      >
        使用JS跳转到案例1详情页
      </button>
    </div>
    
    <!-- 测试返回首页 -->
    <div>
      <a href="/" style="display: block; margin: 10px 0; padding: 10px; background: gray; color: white;">
        返回首页
      </a>
    </div>
  </div>
</template>

<script setup>
// 原生JavaScript导航函数
function navigateToCase(id) {
  console.log('尝试导航到案例:', id);
  window.location.href = `/cases/${id}`;
}
</script>