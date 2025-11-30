<template>
  <div class="test-dynamic-detail">
    <h1>动态路由测试 - 详情页</h1>
    
    <!-- 返回按钮 -->
    <a href="/test-dynamic" class="back-link">返回列表</a>
    
    <!-- 详情内容 -->
    <div class="detail-content">
      <h2>{{ currentItem.title }}</h2>
      <p><strong>ID:</strong> {{ currentItem.id }}</p>
      <p><strong>描述:</strong> {{ currentItem.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

// 获取路由参数
const route = useRoute();

// 简单的测试数据
const items = [
  { id: '1', title: '测试项目 1', description: '这是第一个测试项目的详细内容' },
  { id: '2', title: '测试项目 2', description: '这是第二个测试项目的详细内容' },
  { id: '3', title: '测试项目 3', description: '这是第三个测试项目的详细内容' }
];

// 获取当前项目数据
const currentItem = items.find(item => item.id === route.params.id) || {
  id: route.params.id,
  title: '未知项目',
  description: '找不到该项目的详细信息'
};

// 打印调试信息
console.log('动态路由详情页加载:', {
  routeParams: route.params,
  currentItem: currentItem
});
</script>

<style scoped>
.test-dynamic-detail {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: #333;
  margin-bottom: 30px;
}

.back-link {
  display: inline-block;
  margin-bottom: 20px;
  padding: 8px 16px;
  background-color: #95a5a6;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.back-link:hover {
  background-color: #7f8c8d;
}

.detail-content {
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
  margin: 10px 0;
  color: #666;
}
</style>