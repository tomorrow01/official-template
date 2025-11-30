<template>
  <div class="test-dynamic-list">
    <h1>动态路由测试 - 列表页</h1>
    
    <div class="items">
      <div class="item" v-for="item in items" :key="item.id">
        <h2>{{ item.title }}</h2>
        <p>{{ item.description }}</p>
        <!-- 使用标准的Nuxt链接 -->
        <a :href="`/test-dynamic/${item.id}`" class="link">查看详情</a>
      </div>
    </div>
  </div>
</template>

<script setup>
// 简单的测试数据
const items = [
  { id: '1', title: '测试项目 1', description: '这是第一个测试项目' },
  { id: '2', title: '测试项目 2', description: '这是第二个测试项目' },
  { id: '3', title: '测试项目 3', description: '这是第三个测试项目' }
];
</script>

<style scoped>
.test-dynamic-list {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: #333;
  margin-bottom: 30px;
}

.items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.item {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-top: 0;
  color: #2c3e50;
}

p {
  color: #666;
}

.link {
  display: inline-block;
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.link:hover {
  background-color: #2980b9;
}
</style>