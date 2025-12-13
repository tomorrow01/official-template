<template>
  <div class="service-detail-page">
    <!-- 引入公共导航 -->
    <Navbar />
    
    <!-- 页面标题 -->
    <div class="hero-header">
      <div class="container">
        <h1 class="hero-title">{{ serviceDetail?.title || '服务详情' }}</h1>
      </div>
    </div>
    
    <div class="container">
      <!-- 返回按钮 -->
      <button type="button" class="back-link" @click="$router.push('/services')">
        <span class="back-icon">&lt;</span> 返回服务列表
      </button>
      
      <!-- 加载状态 -->
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>加载中...</p>
      </div>
      
      <!-- 错误状态 -->
      <div v-else-if="error" class="error-container">
        <p>{{ error }}</p>
        <button type="button" @click="fetchServiceDetail" class="retry-btn">重试</button>
      </div>
      
      <!-- 服务详情内容 -->
      <div v-else-if="serviceDetail" class="service-detail-content">
        <!-- 主内容卡片 -->
        <div class="main-content-card">
          <h2 class="service-title">{{ serviceDetail.title || '服务标题' }}</h2>
          
          <!-- 服务图片 -->
          <div class="service-image-wrapper">
            <img :src="`https://picsum.photos/seed/service${serviceDetail.id}/800/400`" :alt="serviceDetail.title" class="service-image">
          </div>
          
          <!-- 服务描述 -->
          <div class="service-description-section">
            <h3 class="section-title">服务详情</h3>
            <div class="description-content">
              <p>{{ serviceDetail.description || serviceDetail.desc || '暂无服务详细描述' }}</p>
            </div>
          </div>
        
        <!-- 推荐服务 -->
          <div class="recommended-services">
            <h3 class="section-title">相关服务</h3>
            <div class="related-services-grid">
              <div 
                v-for="service in recommendedServices" 
                :key="service.id || service._id"
                class="related-service-card"
                @click="$router.push(`/service-detail/${service.id || service._id}`)"
              >
                <div class="related-service-image">
                  <img :src="`https://picsum.photos/seed/service${service.id}/400/300`" :alt="service.title" class="related-image">
                </div>
                <h4 class="related-service-title">{{ service.title }}</h4>
                <p class="related-service-desc">{{ service.desc || service.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 未找到状态 -->
      <div v-else class="not-found">
        <p>未找到服务详情</p>
        <button type="button" @click="$router.back()" class="back-btn">返回</button>
      </div>
    </div>
    
    <!-- 引入公共页脚 -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getServiceDetail, getServiceList } from '~/api/services';
import type { ServiceItem } from '~/api/services';
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';

// 路由和状态
const route = useRoute();
const router = useRouter();

// 获取并验证路由参数
const serviceId = computed(() => {
  const id = route.params.id as string;
  return id;
});

// 监听路由参数变化
watch(() => route.params.id, (newId) => {
  if (newId) {
    fetchServiceDetail();
  }
});

// 数据状态
const serviceDetail = ref<ServiceItem | null>(null);
const recommendedServices = ref<ServiceItem[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

// 不需要单独的错误处理，使用picsum服务会自动返回图片

// 获取服务详情数据
const fetchServiceDetail = async () => {
  try {
    loading.value = true;
    error.value = null;
    
    // 调用API获取实际的服务详情
    console.log('获取服务详情，ID:', serviceId.value);
    const detail = await getServiceDetail(serviceId.value);
    
    // 设置服务详情数据
    serviceDetail.value = detail || {
      _id: serviceId.value,
      id: serviceId.value,
      icon: 'Default',
      title: '未知服务',
      description: '未找到此服务的详细信息。',
      desc: '未找到此服务的详细信息。'
    };
    
    // 设置页面标题
    if (serviceDetail.value?.title) {
      document.title = `${serviceDetail.value.title} - 服务详情`;
    }
    
    // 获取推荐服务
    try {
      const services = await getServiceList();
      recommendedServices.value = services
        .filter((s) => s.id !== serviceId.value && s._id !== serviceId.value)
        .slice(0, 3);
    } catch (err) {
      console.error('获取推荐服务失败:', err);
      recommendedServices.value = [];
    }
    
  } catch (err) {
    console.error('获取服务详情失败:', err);
    // 出错时设置默认数据
    serviceDetail.value = {
      _id: serviceId.value,
      id: serviceId.value,
      icon: 'Default',
      title: '未知服务',
      description: '未找到此服务的详细信息。',
      desc: '未找到此服务的详细信息。'
    };
    
    recommendedServices.value = [];
  } finally {
    loading.value = false;
  }
};

// 页面加载时获取数据
onMounted(() => {
  fetchServiceDetail();
});
</script>

<script lang="ts">
export default {
  // 使用客户端渲染避免hydration问题
  ssr: false
}
</script>

<style scoped>
.service-detail-page {
  background: #f5f5f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 英雄头部 */
.hero-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  background-image: url('https://picsum.photos/seed/service-header/1920/600');
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-header {
    padding: 60px 0;
  }
}

.hero-title {
  font-size: 36px;
  font-weight: 700;
  margin: 0;
}

.container {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* 返回链接 */
.back-link {
  display: inline-block;
  margin-bottom: 30px;
  color: #409eff;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s;
  background: white;
  padding: 8px 16px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.back-link:hover {
  color: #66b1ff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 主内容卡片 */
.main-content-card {
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
}

/* 服务标题 */
.service-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
}

/* 服务图片 */
.service-image-wrapper {
  width: 100%;
  margin-bottom: 40px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.service-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.service-image-wrapper:hover .service-image {
  transform: scale(1.02);
}

/* 服务描述部分 */
.service-description-section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #667eea;
}

.description-content p {
  font-size: 16px;
  line-height: 1.8;
  color: #606266;
  margin-bottom: 0;
}

/* 推荐服务 */
.recommended-services {
  border-top: 1px solid #e0e0e0;
  padding-top: 30px;
}

.related-services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.related-service-card {
  background: #f8f9fa;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.related-service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  background: white;
}

.related-service-image {
  height: 180px;
  overflow: hidden;
  background: #f0f0f0;
}

.related-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.related-service-card:hover .related-image {
  transform: scale(1.05);
}

.related-service-card .related-service-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
  padding: 20px 20px 10px;
}

.related-service-card .related-service-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0;
  padding: 0 20px 20px;
}

/* 加载和错误状态 */
.loading-container,
.error-container,
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 返回按钮样式 */
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  margin: 20px 0;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.back-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.back-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.back-link:hover::before {
  opacity: 1;
}

.back-icon {
  font-size: 18px;
  font-weight: 700;
}

.error-container {
  color: #e74c3c;
}

.retry-btn {
  background-color: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.retry-btn:hover {
  background-color: #5a67d8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-header {
    padding: 40px 0;
  }
  
  .hero-title {
    font-size: 28px;
  }
  
  .container {
    padding: 20px;
  }
  
  .main-content-card {
    padding: 20px;
  }
  
  .service-title {
    font-size: 24px;
  }
  
  .related-services-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .related-service-image {
    height: 150px;
  }
}
</style>