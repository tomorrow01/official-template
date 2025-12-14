<template>
  <div class="services-page">
    <!-- 引入公共导航 -->
    <Navbar />
    
    <!-- 顶部Banner -->
  <div class="services-banner">
    <div class="container">
      <h1>核心服务</h1>
      <p>提供专业、高效的解决方案，满足您的多样化需求</p>
    </div>
  </div>
    
    <div class="container">
      
      <!-- 加载状态 -->
      <div v-if="loadingServices" class="loading-state">
        <div class="loading-spinner"></div>
        <p>加载中...</p>
      </div>
      
      <!-- 错误状态 -->
      <div v-else-if="error" class="error-state">
        <p>{{ error }}</p>
        <button class="retry-btn" @click="fetchServices">重试</button>
      </div>
      
      <!-- 服务列表 -->
      <div v-else class="services-grid">
        <div 
          v-for="service in services" 
          :key="service._id || service.id" 
          class="service-card"
        >
          <div class="service-image">
            <img 
              :src="service.image || `https://picsum.photos/seed/service${service.id || service._id}/400/300`" 
              :alt="service.title" 
              class="card-image"
              @error="handleImageError"
            >
          </div>
          <div class="service-content">
            <h3>{{ service.title }}</h3>
            <p style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">{{ service.desc || service.description || '服务描述' }}</p>
            <NuxtLink 
            :to="`/service-detail/${service._id || service.id}`" class="service-btn">
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
              <img src="https://picsum.photos/seed/team/100/100" alt="专业团队" class="advantage-image">
            </div>
            <h3 class="advantage-title">专业团队</h3>
            <p class="advantage-desc">拥有多年行业经验的技术专家团队，为您提供专业的解决方案</p>
          </div>
          <div class="advantage-item">
            <div class="advantage-icon">
              <img src="https://picsum.photos/seed/delivery/100/100" alt="高效交付" class="advantage-image">
            </div>
            <h3 class="advantage-title">高效交付</h3>
            <p class="advantage-desc">采用敏捷开发方法，确保项目按时交付，满足客户需求</p>
          </div>
          <div class="advantage-item">
            <div class="advantage-icon">
              <img src="https://picsum.photos/seed/support/100/100" alt="持续支持" class="advantage-image">
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
import { ref, onMounted } from 'vue'
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'
import { getServiceList, type ServiceItem } from '~/api/services'

// 服务数据
const services = ref<ServiceItem[]>([])
const loadingServices = ref(false)
const error = ref<string | null>(null)

// 图片错误处理函数
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = `https://picsum.photos/seed/serviceDefault/400/300`;
};

const fetchServices = async () => {
  loadingServices.value = true
  error.value = null
  
  try {
    // 使用API获取服务数据
    const response = await getServiceList()
    
    if (response && Array.isArray(response)) {
      services.value = response as ServiceItem[]
    } else {
      // 如果API返回的数据不是预期格式，使用模拟数据
      console.warn('API返回数据格式异常，使用模拟数据')
      services.value = [
      {
        _id: '1',
        id: '1',
        title: '软件开发',
        description: '为客户提供定制化的软件开发服务',
        image: 'https://picsum.photos/seed/service1/400/300',
        order: 0,
        icon: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true
      },
      {
        _id: '2',
        id: '2',
        title: '数字化转型',
        description: '帮助企业实现数字化转型，优化业务流程',
        image: 'https://picsum.photos/seed/service2/400/300',
        order: 0,
        icon: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true
      },
      {
        _id: '3',
        id: '3',
        title: '云服务',
        description: '提供云计算解决方案，包括云迁移、云托管和云安全服务',
        image: 'https://picsum.photos/seed/service3/400/300',
        order: 0,
        icon: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true
      }
    ]
    }
  } catch (err) {
    console.error('获取服务数据失败:', err)
    error.value = '获取服务数据失败，请稍后重试'
    
    // 错误情况下使用模拟数据
    services.value = [
      {
        _id: '1',
        id: '1',
        title: '软件开发',
        description: '为客户提供定制化的软件开发服务',
        image: 'https://picsum.photos/seed/service1/400/300',
        order: 0,
        icon: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true
      },
      {
        _id: '2',
        id: '2',
        title: '数字化转型',
        description: '帮助企业实现数字化转型，优化业务流程',
        image: 'https://picsum.photos/seed/service2/400/300',
        order: 0,
        icon: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true
      },
      {
        _id: '3',
        id: '3',
        title: '云服务',
        description: '提供云计算解决方案，包括云迁移、云托管和云安全服务',
        image: 'https://picsum.photos/seed/service3/400/300',
        order: 0,
        icon: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true
      }
    ]
  } finally {
    loadingServices.value = false
  }
}

// 页面加载时获取数据
onMounted(() => {
  fetchServices()
})
</script>

<style scoped>
.services-page {
  background-color: #f5f7fa;
  min-height: 100vh;
}

/* 顶部Banner */
.services-banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  margin-bottom: 40px;
}

.services-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://picsum.photos/seed/servicesbanner/1920/1080') center/cover no-repeat;
  opacity: 0.2;
  z-index: 1;
}

.services-banner .container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.services-banner h1 {
  font-size: 2.8rem;
  margin: 0 0 20px 0;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.services-banner p {
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  opacity: 0.9;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .services-banner {
    padding: 60px 0;
  }
  
  .services-banner h1 {
    font-size: 2rem;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-title {
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 40px;
}

/* 加载状态 */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 错误状态 */
.error-state {
  text-align: center;
  padding: 40px;
  color: #e74c3c;
}

.retry-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 16px;
}

.retry-btn:hover {
  background-color: #2980b9;
}

/* 服务网格 */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

/* 服务卡片 */
.service-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  transform: translateY(0);
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.service-image {
  height: 220px;
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
  transform: scale(1.08);
}

.service-content {
  padding: 25px;
  position: relative;
}

.service-content h3 {
  font-size: 1.6rem;
  margin-bottom: 15px;
  color: #333;
  font-weight: 600;
  position: relative;
  z-index: 1;
}

.service-content p {
  color: #666;
  line-height: 1.7;
  margin-bottom: 25px;
  font-size: 16px;
  position: relative;
  z-index: 1;
}

.service-btn {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.service-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.service-btn::before {
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

.service-btn:hover::before {
  opacity: 1;
}

/* 优势部分 */
.advantages-section {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 100px 0;
  position: relative;
  overflow: hidden;
}

.advantages-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  z-index: 1;
}

.section-title {
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 60px;
  font-weight: 700;
  position: relative;
  z-index: 2;
}

.section-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  margin: 20px auto 0;
  border-radius: 2px;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  position: relative;
  z-index: 2;
}

.advantage-item {
  background: white;
  border-radius: 16px;
  padding: 40px 30px;
  text-align: center;
  transition: all 0.4s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.advantage-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
}

.advantage-item:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.advantage-icon {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
}

.advantage-item:hover .advantage-icon {
  transform: scale(1.1);
  box-shadow: 0 15px 30px rgba(102, 126, 234, 0.6);
}

.icon-placeholder {
  width: 70px;
  height: 70px;
  background-color: white;
  border-radius: 50%;
  opacity: 0.9;
}

.advantage-image {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 50%;
  background-color: white;
  padding: 5px;
}

.advantage-title {
  font-size: 1.6rem;
  color: #333;
  margin-bottom: 16px;
  font-weight: 600;
}

.advantage-desc {
  color: #666;
  line-height: 1.8;
  font-size: 16px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .services-grid,
  .advantages-grid {
    grid-template-columns: 1fr;
  }
}
</style>