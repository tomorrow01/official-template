<template>
  <div class="router-test">
    <h1>Vue Router 编程式导航测试</h1>
    
    <div class="test-buttons">
      <h3>声明式导航（a标签）:</h3>
      <a href="/cases/1" class="btn">案例1详情（a标签）</a>
      
      <h3>编程式导航:</h3>
      <button @click="navigateToCase(1)" class="btn">案例1详情（$router.push）</button>
      <button @click="navigateToCaseFull(1)" class="btn">案例1详情（window.location）</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// 使用Vue Router编程式导航
const navigateToCase = (id) => {
  console.log(`使用$router.push导航到/cases/${id}`);
  router.push(`/cases/${id}`);
};

// 使用window.location导航（整页刷新）
const navigateToCaseFull = (id) => {
  console.log(`使用window.location导航到/cases/${id}`);
  window.location.href = `/cases/${id}`;
};
</script>

<style scoped>
.router-test {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  color: #333;
  margin-bottom: 30px;
}

h3 {
  color: #555;
  margin-top: 20px;
  margin-bottom: 10px;
}

.test-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.btn {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #3aa876;
}

.btn:first-of-type {
  background-color: #3498db;
}

.btn:first-of-type:hover {
  background-color: #2980b9;
}

.btn:last-of-type {
  background-color: #e74c3c;
}

.btn:last-of-type:hover {
  background-color: #c0392b;
}
</style>