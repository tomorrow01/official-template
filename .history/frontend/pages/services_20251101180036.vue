<template>
  <div class="services-page">
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
            <div class="service-icon">
              <el-icon><Message /></el-icon>
            </div>
            <h3 class="service-title">{{ service.name || '服务名称' }}</h3>
            <p class="service-desc">{{ service.description || '服务描述内容' }}</p>
            <el-button type="primary" size="small" @click="viewServiceDetail(service.id)">
              了解更多
            </el-button>
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
              <el-icon><Message /></el-icon>
            </div>
            <h3 class="advantage-title">专业团队</h3>
            <p class="advantage-desc">拥有多年行业经验的技术专家团队，为您提供专业的解决方案</p>
          </div>
          <div class="advantage-item">
            <div class="advantage-icon">
              <el-icon><Message /></el-icon>
            </div>
            <h3 class="advantage-title">技术创新</h3>
            <p class="advantage-desc">紧跟技术前沿，持续创新，为客户提供最先进的技术解决方案</p>
          </div>
          <div class="advantage-item">
            <div class="advantage-icon">
              <el-icon><Message /></el-icon>
            </div>
            <h3 class="advantage-title">高效响应</h3>
            <p class="advantage-desc">快速响应客户需求，提供及时、高效的技术支持和服务</p>
          </div>
          <div class="advantage-item">
            <div class="advantage-icon">
              <el-icon><Message /></el-icon>
            </div>
            <h3 class="advantage-title">质量保障</h3>
            <p class="advantage-desc">严格的质量控制流程，确保每一个项目都达到最高标准</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Message } from '@element-plus/icons-vue';
import { getServiceList } from '@/api/services';
import Footer from '@/components/Footer.vue';

const Service = {
  id: String,
  name: String,
  description: String,
  icon: String
}

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
          name: 'Web应用开发',
          description: '基于Vue.js和Nuxt.js构建高性能、响应式的Web应用，提供卓越的用户体验',
          icon: 'Code'
        },
        {
          id: '2',
          name: '内容管理系统',
          description: '定制化的内容管理解决方案，帮助企业轻松管理和发布内容',
          icon: 'Document'
        },
        {
          id: '3',
          name: '前端优化',
          description: '通过性能优化、代码分割和懒加载等技术，提升网站加载速度和用户体验',
          icon: 'Speed'
        },
        {
          id: '4',
          name: 'UI/UX设计',
          description: '专业的用户界面和用户体验设计，打造美观、易用的产品界面',
          icon: 'Edit'
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
        name: 'Web应用开发',
        description: '基于Vue.js和Nuxt.js构建高性能、响应式的Web应用，提供卓越的用户体验',
        icon: 'Code'
      },
      {
        id: '2',
        name: '内容管理系统',
        description: '定制化的内容管理解决方案，帮助企业轻松管理和发布内容',
        icon: 'Document'
      },
      {
        id: '3',
        name: '前端优化',
        description: '通过性能优化、代码分割和懒加载等技术，提升网站加载速度和用户体验',
        icon: 'Speed'
      },
      {
        id: '4',
        name: 'UI/UX设计',
        description: '专业的用户界面和用户体验设计，打造美观、易用的产品界面',
        icon: 'Edit'
      }
    ];
  } finally {
    loading.value = false;
  }
};

// 查看服务详情（暂时返回首页，后续可以实现服务详情页面）
const viewServiceDetail = (id) => {
  router.push('/');
};

// 页面加载时获取服务列表
onMounted(() => {
  fetchServices();
});
</script>

<style scoped>
.services-page {
  background: var(--bg-base);
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
}

.page-title {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 16px;
}

.page-subtitle {
  font-size: 18px;
  opacity: 0.9;
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
  padding: 30px;
  text-align: center;
  box-shadow: var(--shadow-light);
  transition: transform 0.3s, box-shadow 0.3s;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-medium);
}

.service-icon {
  font-size: 48px;
  color: #667eea;
  margin-bottom: 20px;
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
  
  .page-title {
    font-size: 32px;
  }
  
  .services-grid,
  .advantages-grid {
    grid-template-columns: 1fr;
  }
}
</style>