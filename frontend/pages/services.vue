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
        
      <!-- 服务卡片网格 - 与首页核心服务模块保持一致的样式 -->
      <div style="display: grid !important; grid-template-columns: 1fr 1fr 1fr !important; gap: 24px !important; width: 100% !important; max-width: none !important; min-width: 0 !important;">
        <!-- 每个服务项是一个独立卡片 -->
        <NuxtLink 
          v-for="(service, index) in services" 
          :key="service.id" 
          :to="`/services/${service.id}`" 
          style="display: block !important; width: auto !important; min-width: 0 !important; border: 1px solid #e0e0e0; box-shadow: 0 4px 12px rgba(0,0,0,0.1); transition: all 0.3s ease; transform: translateY(0);"
          onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 24px rgba(0,0,0,0.15)'"
          onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'"
          class="bg-white rounded-xl overflow-hidden"
        >
          <!-- 卡片内部：图片在上 -->
          <div class="h-52 overflow-hidden">
            <img 
              :src="getServiceImage(index)" 
              alt="服务图片" 
              style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s ease; transform: scale(1);" 
              onmouseover="this.style.transform='scale(1.1)'" 
              onmouseout="this.style.transform='scale(1)'"
            >
          </div>
          
          <!-- 卡片内部：标题和详情在下 -->
          <div style="padding: 24px !important; width: 100%; box-sizing: border-box;">
            <!-- 标题 -->
            <h3 style="font-size: 20px; font-weight: 600; margin: 0 0 15px 0 !important; padding: 0 !important; color: #333; width: 100%; box-sizing: border-box;">{{ service.title }}</h3>
            
            <!-- 详情 -->
            <p style="line-height: 1.6; margin: 0 0 20px 0 !important; padding: 0 !important; color: #666; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; width: 100%; box-sizing: border-box;">{{ service.description || service.desc || '为客户提供专业的技术解决方案，助力业务增长和数字化转型。' }}</p>
            
            <!-- 跳转到详情页面的按钮 -->
              <ClientOnly>
                <button style="background: #1677ff; color: white; border: none; margin: 0 !important; padding: 10px 20px !important; border-radius: 4px; cursor: pointer; box-shadow: 0 2px 8px rgba(22, 119, 255, 0.3); transition: all 0.3s ease; display: inline-flex; align-items: center; font-weight: 500;">
                  查看详情
                </button>
              </ClientOnly>
          </div>
        </NuxtLink>
      </div>
        
        <!-- 无数据状态 -->
          <div v-if="services.length === 0" class="empty-container">
            <div style="text-align: center; padding: 60px 20px;">
              <div style="width: 100px; height: 100px; margin: 0 auto 20px; background: #f5f7fa; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 48px; color: #dcdfe6;">📋</span>
              </div>
              <h3 style="font-size: 18px; color: #606266; margin-bottom: 10px;">暂无服务数据</h3>
              <p style="color: #909399;">服务正在加载中，请稍候再试</p>
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
            <h3 class="advantage-title">技术创新</h3>
            <p class="advantage-desc">紧跟技术前沿，持续创新，为客户提供最先进的技术解决方案</p>
          </div>
          <div class="advantage-item">
            <div class="advantage-icon">
              <div class="icon-placeholder"></div>
            </div>
            <h3 class="advantage-title">高效响应</h3>
            <p class="advantage-desc">快速响应客户需求，提供及时、高效的技术支持和服务</p>
          </div>
          <div class="advantage-item">
            <div class="advantage-icon">
              <div class="icon-placeholder"></div>
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
    // 使用API获取数据
    const res = await getServiceList();
    console.log('服务API返回结果:', res);
    
    // 精确处理后端返回的{code, data, error}格式，与首页保持一致
    if (typeof res === 'object' && res !== null && res.data && Array.isArray(res.data)) {
      console.log(`成功获取到${res.data.length}个服务数据`);
      services.value = res.data;
    } else {
      console.warn('服务数据格式不正确，使用空数组');
      services.value = [];
    }
    
    // 如果没有数据，使用模拟数据 - 确保与首页保持一致
    if (!services.value.length) {
      console.log('未获取到服务数据，使用模拟数据');
      services.value = [
        {
          _id: '1',
          id: '1',
          icon: 'Management',
          title: '软件开发',
          description: '为客户提供定制化的软件开发服务，包括Web应用、移动应用和企业级解决方案。',
          desc: '为客户提供定制化的软件开发服务，包括Web应用、移动应用和企业级解决方案。',
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
          order: 4,
          isActive: true
        },
        {
          _id: '5',
          id: '5',
          icon: 'Histogram',
          title: '大数据分析',
          description: '通过大数据分析帮助企业挖掘数据价值，优化业务决策。',
          desc: '通过大数据分析帮助企业挖掘数据价值，优化业务决策。',
          order: 5,
          isActive: true
        },
        {
          _id: '6',
          id: '6',
          icon: 'Briefcase',
          title: 'IT咨询',
          description: '提供专业的IT战略咨询服务，帮助企业制定技术发展规划。',
          desc: '提供专业的IT战略咨询服务，帮助企业制定技术发展规划。',
          order: 6,
          isActive: true
        }
      ];
      console.log('使用模拟服务数据，与首页保持一致:', services.value);
    }
  } catch (err) {
      console.error('获取服务数据失败:', err);
      error.value = '获取服务数据失败，请稍后重试';
      // 提供默认服务数据，确保与首页完全一致
      console.log('请求失败，使用模拟数据');
      services.value = [
        {
          _id: '1',
          id: '1',
          icon: 'Management',
          title: '软件开发',
          description: '为客户提供定制化的软件开发服务，包括Web应用、移动应用和企业级解决方案。',
          desc: '为客户提供定制化的软件开发服务，包括Web应用、移动应用和企业级解决方案。',
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
          order: 4,
          isActive: true
        },
        {
          _id: '5',
          id: '5',
          icon: 'Histogram',
          title: '大数据分析',
          description: '通过大数据分析帮助企业挖掘数据价值，优化业务决策。',
          desc: '通过大数据分析帮助企业挖掘数据价值，优化业务决策。',
          order: 5,
          isActive: true
        },
        {
          _id: '6',
          id: '6',
          icon: 'Briefcase',
          title: 'IT咨询',
          description: '提供专业的IT战略咨询服务，帮助企业制定技术发展规划。',
          desc: '提供专业的IT战略咨询服务，帮助企业制定技术发展规划。',
          order: 6,
          isActive: true
        }
      ];
      console.log('使用模拟服务数据，与首页完全一致:', services.value);
  } finally {
    loading.value = false;
  }
};

// 查看服务详情
// 获取服务图片 - 与首页核心服务模块使用相同的图片逻辑
const getServiceImage = (index) => {
  const imageIds = [180, 239, 24, 119, 96, 101];
  return `https://picsum.photos/id/${imageIds[index % imageIds.length]}/600/400`;
};
// 查看服务详情 - 现在使用NuxtLink直接导航，此函数保留作为备用 页面加载时获取服务列表
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
    margin-bottom: 20px;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
  }
  
  .icon-placeholder {
    width: 40px;
    height: 40px;
    background: white;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .icon-placeholder::before {
    content: '✓';
    color: #667eea;
    font-size: 24px;
    font-weight: bold;
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