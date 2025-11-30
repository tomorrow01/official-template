<template>
  <div id="service-detail-container">
    <!-- 这个容器将完全由客户端JavaScript控制 -->
    <div id="loading-indicator">加载中...</div>
  </div>
</template>

<script setup>
// 完全禁用SSR
const route = useRoute();
const serviceId = route.params.id;

// 在客户端执行所有渲染逻辑
if (process.client) {
  // 延迟执行以确保DOM已准备好
  setTimeout(async () => {
    try {
      // 直接使用fetch获取数据
      const response = await fetch(`http://localhost:3000/api/services/${serviceId}`);
      if (!response.ok) throw new Error('服务获取失败');
      const service = await response.json();
      
      // 手动构建DOM
      buildPageContent(service);
    } catch (error) {
      console.error('加载服务详情失败:', error);
      document.getElementById('loading-indicator').textContent = '加载失败，请重试';
    }
  }, 0);
}

// 纯JavaScript DOM构建函数
function buildPageContent(service) {
  const container = document.getElementById('service-detail-container');
  
  // 清空现有内容
  container.innerHTML = '';
  
  // 创建返回按钮
  const backButton = document.createElement('button');
  backButton.textContent = '返回列表';
  backButton.className = 'back-button';
  backButton.onclick = () => {
    window.history.back();
  };
  container.appendChild(backButton);
  
  // 创建服务标题
  const title = document.createElement('h1');
  title.textContent = service.title;
  container.appendChild(title);
  
  // 创建服务描述
  const description = document.createElement('p');
  description.textContent = service.description;
  container.appendChild(description);
  
  // 创建服务价格
  const price = document.createElement('div');
  price.className = 'price';
  price.textContent = `价格: ¥${service.price}`;
  container.appendChild(price);
  
  // 创建服务标签
  if (service.tags && service.tags.length > 0) {
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'tags';
    
    service.tags.forEach(tag => {
      const tagElement = document.createElement('span');
      tagElement.className = 'tag';
      tagElement.textContent = tag;
      tagsContainer.appendChild(tagElement);
    });
    
    container.appendChild(tagsContainer);
  }
}
</script>

<script>
export default {
  // 完全禁用SSR
  ssr: false
}
</script>

<style scoped>
#service-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.back-button {
  background: #f0f0f0;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 14px;
}

.back-button:hover {
  background: #e0e0e0;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

p {
  line-height: 1.6;
  color: #666;
  margin-bottom: 20px;
}

.price {
  font-size: 24px;
  font-weight: bold;
  color: #ff6b00;
  margin-bottom: 20px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  background: #f0f0f0;
  padding: 5px 10px;
  border-radius: 16px;
  font-size: 12px;
  color: #666;
}
</style>