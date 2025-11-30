<template>
  <div class="services-page">
    <!-- 导航栏 -->
    <Navbar />
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">核心服务</h1>
        <p class="page-subtitle">我们提供专业的Web开发和内容管理解决方案</p>
      </div>
    </div>
    
    <!-- 服务列表 -->
    <div class="services-section">
      <div class="container">
        <!-- 加载状态 -->
        <div v-if="loading" class="loading-container">
          <el-loading v-loading="loading" element-loading-text="正在加载服务..." />
        </div>
        
        <!-- 服务卡片 -->
        <div v-else-if="services.length > 0" class="services-grid">
          <div v-for="service in services" :key="service.id" class="service-card">
            <!-- 服务图片 -->
            <div v-if="service.image" class="service-image-container">
              <img 
                :src="getServiceImageUrl(service.image)" 
                :alt="service.title || '服务名称'" 
                class="service-image"
                @error="handleImageError($event)"
              />
            </div>
            <div>
              <div class="service-icon">
                <el-icon><Message /></el-icon>
              </div>
              <h3 class="service-title">{{ service.title || '服务名称' }}</h3>
              <p class="service-desc">{{ service.description || '服务描述内容' }}</p>
              <el-button type="primary" size="small" @click="viewServiceDetail(service.id)">
                了解更多
              </el-button>
            </div>
          </div>
        </div>
        
        <!-- 无数据状态 -->
        <div v-else class="empty-container">
          <el-empty description="暂无服务数据" />
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
              <el-icon v-if="true"><Message /></el-icon>
            </div>
            <h3 class="advantage-title">专业团队</h3>
            <p class="advantage-desc">拥有多年行业经验的技术专家团队，为您提供专业的解决方案</p>
          </div>
          <div class="advantage-item">
            <div class="advantage-icon">
              <el-icon v-if="true"><Message /></el-icon>
            </div>
            <h3 class="advantage-title">技术创新</h3>
            <p class="advantage-desc">紧跟技术前沿，持续创新，为客户提供最先进的技术解决方案</p>
          </div>
          <div class="advantage-item">
            <div class="advantage-icon">
              <el-icon v-if="true"><Message /></el-icon>
            </div>
            <h3 class="advantage-title">高效响应</h3>
            <p class="advantage-desc">快速响应客户需求，提供及时、高效的技术支持和服务</p>
          </div>
          <div class="advantage-item">
            <div class="advantage-icon">
              <el-icon v-if="true"><Message /></el-icon>
            </div>
            <h3 class="advantage-title">质量保障</h3>
            <p class="advantage-desc">严格的质量控制流程，确保每一个项目都达到最高标准</p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Message } from '@element-plus/icons-vue';
import { getServiceList } from '~/api/services';
import Footer from '~/components/Footer.vue';
import Navbar from '~/components/Navbar.vue';

// 服务数据类型定义 - 使用类型断言方式

const router = useRouter();
const services = ref([]);
const loading = ref(true);
const error = ref(null);

// 获取服务列表
const fetchServices = async () => {
  loading.value = true;
  error.value = null;
  try {
    console.log('开始获取服务数据...');
    const res = await getServiceList();
    
    // 正确提取数据，确保数据格式一致
    services.value = Array.isArray(res) ? res : (res.data || []);
    console.log('获取到的服务数据:', services.value);
    
    // 如果没有数据，使用模拟数据
    if (!services.value.length) {
      services.value = [
        {
          id: '1',
          title: '企业数字化转型服务',
          description: '为传统企业提供全面的数字化转型解决方案，包括业务流程再造、IT系统升级、数字化营销策略等',
          icon: 'Code'
        },
        {
          id: '2',
          title: '软件开发与定制服务',
          description: '提供高质量的软件开发和定制服务，包括企业管理系统、电子商务平台、移动应用开发等',
          icon: 'Document'
        },
        {
          id: '3',
          title: '数据分析与商业智能',
          description: '帮助企业挖掘数据价值，提升决策效率，通过数据分析模型和可视化报表提供数据洞察',
          icon: 'Speed'
        },
        {
          id: '4',
          title: 'IT咨询与规划服务',
          description: '提供专业的IT咨询和规划服务，帮助企业制定合理的IT战略和技术路线图',
          icon: 'Edit'
        },
        {
          id: '5',
          title: '云服务与基础设施',
          description: '提供全方位的云服务和基础设施解决方案，帮助企业快速实现IT基础设施的现代化',
          icon: 'Cloud'
        },
        {
          id: '6',
          name: '人工智能应用开发',
          description: '专注于人工智能应用开发，为企业提供智能解决方案，提升业务效率和竞争力',
          icon: 'Star'
        }
      ];
    }
  } catch (err) {
    console.error('获取服务数据失败:', err);
    error.value = '获取服务数据失败，请稍后重试';
    // 出错时使用模拟数据
    services.value = [
      {
        id: '1',
        name: '企业数字化转型服务',
        description: '为传统企业提供全面的数字化转型解决方案，包括业务流程再造、IT系统升级、数字化营销策略等',
        icon: 'Code'
      },
      {
        id: '2',
        name: '软件开发与定制服务',
        description: '提供高质量的软件开发和定制服务，包括企业管理系统、电子商务平台、移动应用开发等',
        icon: 'Document'
      },
      {
        id: '3',
        name: '数据分析与商业智能',
        description: '帮助企业挖掘数据价值，提升决策效率，通过数据分析模型和可视化报表提供数据洞察',
        icon: 'Speed'
      },
      {
        id: '4',
        name: 'IT咨询与规划服务',
        description: '提供专业的IT咨询和规划服务，帮助企业制定合理的IT战略和技术路线图',
        icon: 'Edit'
      },
      {
        id: '5',
        name: '云服务与基础设施',
        description: '提供全方位的云服务和基础设施解决方案，帮助企业快速实现IT基础设施的现代化',
        icon: 'Cloud'
      },
      {
        id: '6',
        name: '人工智能应用开发',
        description: '专注于人工智能应用开发，为企业提供智能解决方案，提升业务效率和竞争力',
        icon: 'Star'
      }
    ];
  } finally {
    loading.value = false;
  }
};

// 查看服务详情
// 获取服务图片URL
const getServiceImageUrl = (imagePath) => {
  if (!imagePath) {
    return '/images/service-default.jpg'; // 默认图片
  }
  
  // 检查是否已经是完整URL
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // 如果是相对路径，根据路径格式处理
  if (imagePath.startsWith('/uploads/')) {
    // 从后端上传的图片
    return `http://localhost:3001${imagePath}`;
  } else if (imagePath.startsWith('/')) {
    // 前端静态图片
    return imagePath;
  } else {
    // 其他情况
    return `http://localhost:3001/uploads/${imagePath}`;
  }
};

// 图片加载错误处理
const handleImageError = (event) => {
  event.target.src = '/images/service-default.jpg';
};

const viewServiceDetail = (id) => {
  router.push(`/services/${id}`);
};

// 页面加载时获取服务列表
onMounted(() => {
  fetchServices();
});
</script>

<style scoped>
.services-page {
  min-height: 100vh;
  background-color: #f9f9f9;
}

/* 页面标题 Banner */
.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.page-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://picsum.photos/seed/servicebanner/1920/1080');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0.2;
  z-index: 1;
}

.page-header .container {
  position: relative;
  z-index: 2;
}

.page-title {
  font-size: 2.8rem;
  margin-bottom: 15px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.page-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.services-section {
  padding: 60px 0;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.service-card {
  background: var(--bg-container);
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
  box-shadow: var(--shadow-light);
  transition: transform 0.3s, box-shadow 0.3s;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-medium);
}

.service-image-container {
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.service-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.service-card:hover .service-image {
  transform: scale(1.05);
}

.service-icon {
  font-size: 48px;
  color: #667eea;
  margin: 20px 0;
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.page-header::before {
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

.page-header .container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header h1 {
  font-size: 2.8rem;
  margin-bottom: 20px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.page-header p {
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  opacity: 0.9;
}

/* 服务卡片内容区域 */
.service-card > div:last-child {
  padding: 0 30px 30px;
}

.service-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.service-desc {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 20px;
}

.advantages-section {
  background: var(--bg-container);
  padding: 60px 0;
}

.section-title {
  font-size: 28px;
  font-weight: 600;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 40px;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
}

.advantage-item {
  text-align: center;
  padding: 30px;
}

.advantage-icon {
  font-size: 36px;
  color: #667eea;
  margin-bottom: 20px;
}

.advantage-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.advantage-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.loading-container,
.empty-container {
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  .page-header {
    padding: 60px 0;
  }
  
  .page-header h1 {
  font-size: 2rem;
}

.page-header p {
  font-size: 1rem;
  padding: 0 20px;
}
  
  .services-grid,
  .advantages-grid {
    grid-template-columns: 1fr;
  }
}
</style>