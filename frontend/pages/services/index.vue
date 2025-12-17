<template>
  <div class="services-page">
    <!-- 导航栏 -->
    <Navbar />
    
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="container">
        <h1>核心服务</h1>
        <p>我们提供专业的Web开发和内容管理解决方案</p>
      </div>
    </div>
    
    <!-- 服务列表 -->
    <div class="container">
      <!-- 加载状态 -->
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>加载服务数据中...</p>
      </div>
      
      <!-- 错误提示 -->
      <div v-else-if="error" class="error-container">
        <p class="error-message">{{ error }}</p>
        <button class="retry-btn" @click="fetchServices">重试</button>
      </div>
      
      <!-- 服务列表 -->
      <div v-else class="services-grid">
        <div 
          v-for="serviceItem in activeServices" 
          :key="serviceItem.id || serviceItem._id" 
          class="service-card"
        >
          <div class="service-image">
            <img :src="serviceItem.image" :alt="serviceItem.title" class="card-image">
          </div>
          <div class="service-content">
            <div class="service-content-wrapper">
                <h3>{{ serviceItem.title }}</h3>
                <div class="service-description-wrapper">
                  <p class="service-description">{{ serviceItem.desc || serviceItem.description || '服务描述' }}</p>
                </div>
              </div>
            <NuxtLink :to="`/services/${serviceItem.id || serviceItem._id}`" class="service-btn">
              查看详情 →
            </NuxtLink>
          </div>
        </div>
        
        <!-- 空数据提示 -->
        <div v-if="servicesList.length === 0" class="empty-container">
          <p>暂无服务数据</p>
        </div>
      </div>
    </div>
    
    <!-- 服务优势 -->
    <div class="advantages-section">
      <div class="container">
        <h2 class="section-title">我们的优势</h2>
        <div class="advantages-grid">
          <div class="advantage-item">
            <div class="advantage-icon">
              <div class="icon-placeholder"></div>
            </div>
            <h3 class="advantage-title">专业团队</h3>
            <p class="advantage-desc">拥有多年行业经验的技术专家团队，为您提供专业的解决方案</p>
          </div>
          <div class="advantage-item">
            <div class="advantage-icon">
              <div class="icon-placeholder"></div>
            </div>
            <h3 class="advantage-title">高效交付</h3>
            <p class="advantage-desc">采用敏捷开发方法，确保项目按时交付，满足客户需求</p>
          </div>
          <div class="advantage-item">
            <div class="advantage-icon">
              <div class="icon-placeholder"></div>
            </div>
            <h3 class="advantage-title">持续支持</h3>
            <p class="advantage-desc">提供7×24小时技术支持，确保系统稳定运行</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 页脚 -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Ref } from 'vue'
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'
import { getServiceList } from '~/api/services'
import type { ServiceItem } from '~/api/services'

// 服务数据
const servicesList: Ref<ServiceItem[]> = ref([])
const loading = ref(false)
const error = ref<string | null>(null)

// 活跃服务列表
const activeServices = computed(() => {
  return servicesList.value.filter(item => item.isActive !== false)
})

// 获取服务列表
const fetchServices = async () => {
  loading.value = true
  error.value = null
  try {
    // 调用API获取服务数据
    const serviceItems = await getServiceList()
    console.log('服务API返回结果:', JSON.stringify(serviceItems, null, 2));
    
    // 确保我们得到的是数组格式的数据
    let processedItems = [];
    
    if (Array.isArray(serviceItems)) {
      console.log(`成功获取到${serviceItems.length}个服务数据`);
      processedItems = serviceItems;
    } else {
      console.warn('服务数据格式不正确，尝试使用模拟数据');
      // 使用模拟数据
      processedItems = [
        {
          id: '1',
          _id: '1',
          title: '软件开发',
          description: '为客户提供定制化的软件开发服务，包括Web应用、移动应用和企业级解决方案。',
          desc: '为客户提供定制化的软件开发服务，包括Web应用、移动应用和企业级解决方案。',
          order: 1,
          isActive: true,
          image: 'https://picsum.photos/seed/software/600/400'
        },
        {
          id: '2',
          _id: '2',
          title: '数字化转型',
          description: '帮助企业实现数字化转型，优化业务流程，提升运营效率。',
          desc: '帮助企业实现数字化转型，优化业务流程，提升运营效率。',
          order: 2,
          isActive: true,
          image: 'https://picsum.photos/seed/webdev/600/400'
        },
        {
          id: '3',
          _id: '3',
          title: '云服务',
          description: '提供云计算解决方案，包括云迁移、云托管和云安全服务。',
          desc: '提供云计算解决方案，包括云迁移、云托管和云安全服务。',
          order: 3,
          isActive: true,
          image: 'https://picsum.photos/seed/cloud/600/400'
        }
      ];
    }
    
    // 确保每个服务项都有必要的属性
    servicesList.value = processedItems.map(service => ({
      ...service,
      desc: service.desc || service.description || '',
      isActive: service.isActive !== false, // 默认激活
      image: service.image || 'https://picsum.photos/seed/service/' + (service.id || service._id || Math.random())
    }))
    
    console.log('最终服务数据:', JSON.stringify(servicesList.value, null, 2));
  } catch (err) {
    console.error('获取服务数据失败:', err);
    error.value = '获取服务数据失败，请稍后重试';
    
    // 提供默认服务数据，确保符合ServiceItem接口
    servicesList.value = [
      {
        id: '1',
        _id: '1',
        title: '软件开发',
        description: '为客户提供定制化的软件开发服务，包括Web应用、移动应用和企业级解决方案。',
        desc: '为客户提供定制化的软件开发服务，包括Web应用、移动应用和企业级解决方案。',
        order: 1,
        isActive: true,
        image: 'https://picsum.photos/seed/software/600/400'
      },
      {
        id: '2',
        _id: '2',
        title: '数字化转型',
        description: '帮助企业实现数字化转型，优化业务流程，提升运营效率。',
        desc: '帮助企业实现数字化转型，优化业务流程，提升运营效率。',
        order: 2,
        isActive: true,
        image: 'https://picsum.photos/seed/webdev/600/400'
      },
      {
        id: '3',
        _id: '3',
        title: '云服务',
        description: '提供云计算解决方案，包括云迁移、云托管和云安全服务。',
        desc: '提供云计算解决方案，包括云迁移、云托管和云安全服务。',
        order: 3,
        isActive: true,
        image: 'https://picsum.photos/seed/cloud/600/400'
      }
    ] as ServiceItem[];
  } finally {
    loading.value = false;
  }
}

// 页面加载时获取服务数据
onMounted(() => {
  fetchServices()
})
</script>

<style scoped>
.services-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-header {
  background: #667eea;
  color: white;
  padding: 80px 0;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.service-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  color: #333;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  height: 530px; /* 使用固定高度而不是最小高度 */
  display: flex;
  flex-direction: column;
}

.service-image {
  width: 100%;
  height: 180px;
  overflow: hidden;
  background: #f0f0f0;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.service-card:hover .card-image {
  transform: scale(1.05);
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.service-content {
  padding: 20px;
  flex: 1;
  height: 350px;
  position: relative; /* 设置为相对定位，作为按钮绝对定位的参照 */
  overflow: hidden;
}

.service-content-wrapper {
  width: 100%;
}

.service-content h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.5rem;
  color: #333;
  height: 48px; /* 固定标题区域高度 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.service-description-wrapper {
  height: 60px; /* 固定描述区域高度 */
  overflow: hidden;
}

.service-description {
  color: #666;
  margin-bottom: 15px;
  line-height: 1.5; /* 确保文本行高一致 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.service-btn {
  padding: 10px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
  text-decoration: none;
  width: calc(100% - 40px); /* 确保按钮宽度一致 */
  text-align: center;
  position: absolute; /* 使用绝对定位 */
  bottom: 20px; /* 固定到底部 */
  left: 20px; /* 固定到左侧 */
}

.service-btn:hover {
  background: #5a67d8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.advantages-section {
  background-color: #f8f9fa;
  padding: 60px 0;
  margin-top: 60px;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 40px;
  color: #333;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.advantage-item {
  text-align: center;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: transform 0.3s ease;
}

.advantage-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.advantage-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  border-radius: 50%;
  background-color: #667eea;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-placeholder {
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
}

.advantage-title {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #333;
}

.advantage-desc {
  color: #666;
  line-height: 1.6;
}

/* 加载状态样式 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-container p {
  font-size: 1.1rem;
  color: #666;
  margin: 0;
}

/* 错误提示样式 */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.error-message {
  font-size: 1.1rem;
  color: #e74c3c;
  margin-bottom: 20px;
  max-width: 600px;
}

.retry-btn {
  padding: 10px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  background: #5a67d8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* 空数据提示样式 */
.empty-container {
  text-align: center;
  padding: 60px 20px;
  color: #666;
  font-size: 1.1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .advantages-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .page-header {
    padding: 60px 0;
  }
  
  .container {
    padding: 15px;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .loading-container,
  .error-container,
  .empty-container {
    padding: 40px 15px;
  }
  
  .loading-spinner {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .service-card {
    min-height: 300px;
  }
  
  .service-image {
    height: 150px;
  }
  
  .advantage-item {
    padding: 20px;
  }
}
</style>