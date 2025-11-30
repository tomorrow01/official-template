<template>
  <div class="debug-nav">
    <h1>导航调试页面</h1>
    
    <div class="debug-info">
      <h3>当前路由信息：</h3>
      <p>路径: {{ currentRoute.path }}</p>
      <p>名称: {{ currentRoute.name }}</p>
      <p>参数: {{ JSON.stringify(currentRoute.params) }}</p>
    </div>
    
    <div class="test-section">
      <h3>测试1: 直接访问详情页</h3>
      <a href="/cases/1" class="test-link">案例1详情页 (点击此处)</a>
    </div>
    
    <div class="test-section">
      <h3>测试2: 使用编程式导航</h3>
      <button @click="navigateToDetail(1)" class="test-btn">使用router.push</button>
    </div>
    
    <div class="test-section">
      <h3>测试3: 使用整页刷新导航</h3>
      <a href="/cases/1" target="_self" class="test-link">整页刷新导航</a>
      <button @click="windowNav(1)" class="test-btn">使用window.location</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const currentRoute = ref({
  path: '',
  name: '',
  params: {}
});

onMounted(() => {
  // 更新当前路由信息
  currentRoute.value = {
    path: route.path,
    name: route.name,
    params: route.params
  };
  
  console.log('=== 调试页面加载 ===');
  console.log('当前路由:', currentRoute.value);
  console.log('路由配置:', router.getRoutes());
});

// 使用Vue Router编程式导航
const navigateToDetail = (id) => {
  console.log('=== 执行router.push导航 ===');
  console.log('目标路径:', `/cases/${id}`);
  
  try {
    router.push(`/cases/${id}`).then(() => {
      console.log('导航成功!');
    }).catch((error) => {
      console.error('导航失败:', error);
    });
  } catch (err) {
    console.error('导航执行错误:', err);
  }
};

// 使用window.location导航
const windowNav = (id) => {
  console.log('=== 执行window.location导航 ===');
  console.log('目标路径:', `/cases/${id}`);
  window.location.href = `/cases/${id}`;
};
</script>

<style scoped>
.debug-nav {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
  margin-bottom: 30px;
}

.debug-info {
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 30px;
}

h3 {
  color: #555;
  margin-top: 0;
  margin-bottom: 10px;
}

p {
  margin: 5px 0;
}

.test-section {
  margin-bottom: 25px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.test-link {
  display: inline-block;
  padding: 10px 15px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  margin-right: 10px;
  transition: background-color 0.3s;
}

.test-link:hover {
  background-color: #3aa876;
}

.test-btn {
  padding: 10px 15px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.test-btn:hover {
  background-color: #2980b9;
}
</style>