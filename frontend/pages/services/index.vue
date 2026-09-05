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
        <p>加载服务中...</p>
      </div>
      
      <!-- 错误状态 -->
      <div v-else-if="error" class="error-message">
        <p>{{ error }}</p>
      </div>
      
      <!-- 空状态 -->
      <div v-else-if="services.length === 0" class="empty-message">
        <p>暂无服务</p>
      </div>
      
      <!-- 服务卡片列表 -->
      <div v-else class="services-grid">
        <div 
          v-for="service in services" 
          :key="service.id" 
          class="service-card"
        >
          <div class="service-image">
            <img :src="service.image" :alt="service.title" class="card-image">
          </div>
          <div class="service-content">
            <h3>{{ service.title }}</h3>
            <p v-if="service.subtitle" class="service-subtitle">{{ service.subtitle }}</p>
            <p>{{ service.intro || stripHtml(service.description) || '暂无简介' }}</p>
            <NuxtLink :to="`/services/${service.id || service._id}`" class="service-btn">
              查看详情 →
            </NuxtLink>
          </div>
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

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'
import { getServiceList } from '@/api/services'

// 服务数据
const services = ref([])
const loading = ref(true)
const error = ref('')

const fetchServices = async () => {
  loading.value = true
  error.value = ''
  try {
    const list = await getServiceList()
    services.value = list.map(item => ({
      ...item,
      image: item.image || `https://picsum.photos/seed/${item.title || item._id}/600/400`,
    }))
  } catch (err) {
    console.error('获取服务列表失败:', err)
    error.value = '获取服务列表失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

// 把 HTML 标签去掉，取纯文本（列表页展示富文本的 fallback）
const stripHtml = (html) => {
  if (!html) return ''
  return html.replace(/<[^>]+>/g, '').trim().slice(0, 120)
}

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
  height: 100%;
  min-height: 350px;
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
  display: flex;
  flex-direction: column;
}

.service-content h3 {
  margin-top: 0;
  margin-bottom: 6px;
  font-size: 1.5rem;
  color: #333;
}

.service-subtitle {
  font-size: 0.9rem;
  color: #999;
  margin-bottom: 10px;
}

.service-content p {
  color: #666;
  margin-bottom: 15px;
  flex: 1;
}

.service-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
  display: inline-block;
  text-decoration: none;
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

/* 加载和错误状态 */
.loading-container,
.error-message,
.empty-message {
  text-align: center;
  padding: 60px 20px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  color: #e74c3c;
}

.empty-message {
  color: #999;
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