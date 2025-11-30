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
      <div v-if="loadingServices" class="loading-state">
        <div class="loading-spinner"></div>
        <p>正在加载服务数据...</p>
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
            <img :src="service.image" :alt="service.title" class="card-image">
          </div>
          <div class="service-content">
            <h3>{{ service.title }}</h3>
            <p>{{ service.desc || service.description || '服务描述' }}</p>
            <NuxtLink 
            :to="`/services/${service._id || service.id}`" class="service-btn">
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
import { getServiceList } from '~/api/services'

// 服务数据
const services = ref([])
const loadingServices = ref(false)
const error = ref(null)

// 获取服务数据
const fetchServices = async () => {
  loadingServices.value = true
  error.value = null
  try {
    console.log('开始获取服务数据...')
    // 使用API获取数据
    const res = await getServiceList()
    console.log('服务API返回结果:', res)
    
    // 精确处理后端返回的{code, data, error}格式
    if (typeof res === 'object' && res !== null && res.data && Array.isArray(res.data)) {
      console.log(`成功获取到${res.data.length}个服务数据`)
      services.value = res.data.map(service => ({
        ...service,
        // 确保有必要的字段，使用默认值
        image: service.image || `https://picsum.photos/seed/service${service.id}/600/400`
      }))
    } else {
      console.warn('服务数据格式不正确，使用空数组')
      services.value = []
    }
    
    // 如果没有数据，使用模拟数据
    if (!services.value.length) {
      services.value = [
        {
          _id: '1',
          id: '1',
          icon: 'Management',
          title: '软件开发',
          description: '为客户提供定制化的软件开发服务，包括Web应用、移动应用和企业级解决方案。',
          desc: '为客户提供定制化的软件开发服务，包括Web应用、移动应用和企业级解决方案。',
          image: 'https://picsum.photos/seed/software/600/400',
          order: 1,
          isActive: true
        },
        {
          _id: '2',
          id: '2',
          icon: 'Monitor',
          title: '数字化转型',
          description: '帮助企业实现数字化转型，优化业务流程，提升运营效率。',
          desc: '帮助企业实现数字化转型，优化业务流程，提升运营效率。',
          image: 'https://picsum.photos/seed/digital/600/400',
          order: 2,
          isActive: true
        },
        {
          _id: '3',
          id: '3',
          icon: 'Cloud',
          title: '云服务',
          description: '提供云计算解决方案，包括云迁移、云托管和云安全服务。',
          desc: '提供云计算解决方案，包括云迁移、云托管和云安全服务。',
          image: 'https://picsum.photos/seed/cloud/600/400',
          order: 3,
          isActive: true
        },
        {
          _id: '4',
          id: '4',
          icon: 'StarFilled',
          title: '人工智能',
          description: '利用人工智能技术为企业提供智能决策支持和自动化解决方案。',
          desc: '利用人工智能技术为企业提供智能决策支持和自动化解决方案。',
          image: 'https://picsum.photos/seed/ai/600/400',
          order: 4,
          isActive: true
        },
        {
          _id: '5',
          id: '5',
          icon: 'Code',
          title: 'UI/UX设计',
          description: '提供专业的用户界面和用户体验设计服务，打造直观易用的产品。',
          desc: '提供专业的用户界面和用户体验设计服务，打造直观易用的产品。',
          image: 'https://picsum.photos/seed/design/600/400',
          order: 5,
          isActive: true
        },
        {
          _id: '6',
          id: '6',
          icon: 'Database',
          title: '数据分析',
          description: '专业的数据分析和可视化服务，帮助企业挖掘数据价值。',
          desc: '专业的数据分析和可视化服务，帮助企业挖掘数据价值。',
          image: 'https://picsum.photos/seed/data/600/400',
          order: 6,
          isActive: true
        }
      ]
    }
  } catch (err) {
    console.error('获取服务数据失败:', err)
    error.value = '获取服务数据失败，请稍后重试'
    // 发生错误时使用模拟数据
    services.value = [
      {
        id: '1',
        title: '软件开发',
        desc: '为客户提供定制化的软件开发服务，包括Web应用、移动应用和企业级解决方案。',
        image: 'https://picsum.photos/seed/software/600/400'
      },
      {
        id: '2',
        title: '数字化转型',
        desc: '帮助企业实现数字化转型，优化业务流程，提升运营效率。',
        image: 'https://picsum.photos/seed/digital/600/400'
      },
      {
        id: '3',
        title: '云服务',
        desc: '提供云计算解决方案，包括云迁移、云托管和云安全服务。',
        image: 'https://picsum.photos/seed/cloud/600/400'
      },
      {
        id: '4',
        title: '人工智能',
        desc: '利用人工智能技术为企业提供智能决策支持和自动化解决方案。',
        image: 'https://picsum.photos/seed/ai/600/400'
      },
      {
        id: '5',
        title: 'UI/UX设计',
        desc: '提供专业的用户界面和用户体验设计服务，打造直观易用的产品。',
        image: 'https://picsum.photos/seed/design/600/400'
      },
      {
        id: '6',
        title: '数据分析',
        desc: '专业的数据分析和可视化服务，帮助企业挖掘数据价值。',
        image: 'https://picsum.photos/seed/data/600/400'
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

/* 加载状态样式 */
.loading-state {
  text-align: center;
  padding: 60px 20px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 20px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 错误状态样式 */
.error-state {
  text-align: center;
  padding: 60px 20px;
  color: #e53e3e;
}

.retry-btn {
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
}

.retry-btn:hover {
  background: #5a67d8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
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
  margin-bottom: 10px;
  font-size: 1.5rem;
  color: #333;
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