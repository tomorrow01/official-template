<template>
  <div class="cases-page">
    <!-- 页面标题 Banner -->
    <div class="page-header">
      <div class="container">
        <h1>客户成功案例</h1>
        <p>探索我们如何帮助各行各业的客户实现业务增长和数字化转型</p>
      </div>
    </div>
    
    <!-- 案例列表 -->
    <div class="container">
      <!-- 加载状态 -->
      <div v-if="loadingCases" class="loading-container">
        <div class="loading-spinner"></div>
        <p>加载案例中...</p>
      </div>
      
      <!-- 错误状态 -->
      <div v-if="error" class="error-message">
        <p>{{ error }}</p>
      </div>
      
      <!-- 案例卡片容器 -->
      <div v-else class="cases-grid">
        <NuxtLink 
          v-for="(caseItem, index) in cases" 
          :key="caseItem.id" 
          :to="`/cases/${caseItem.id}`"
          class="case-card"
        >
          <!-- 案例图片 -->
          <div class="case-image-container">
            <img 
              :src="getCaseImage(index)" 
              :alt="caseItem.description" 
              class="case-image"
            >
          </div>
          
          <!-- 案例描述 -->
          <div class="case-desc">
            <h3>{{ getCaseTitle(index) }}</h3>
            <p>{{ caseItem.description }}</p>
            <!-- 查看详情链接 -->
            <span class="view-detail-link">
              查看详情
              <span class="arrow">→</span>
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Footer from '@/components/Footer.vue';
import type { CaseItem } from '~/api/cases';

// 状态管理
const cases = ref<CaseItem[]>([]);
const loadingCases = ref(true);
const error = ref('');

// 模拟获取案例数据的函数
const fetchCaseList = async () => {
  loadingCases.value = true;
  try {
    // 这里应该是实际的API调用
    // const res = await getCaseList();
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // 使用模拟数据，确保符合CaseItem接口
    cases.value = [
      { 
        id: '1', 
        description: 'XX教育使用我们的内容管理系统，内容发布效率提升60%',
        image: '',
        publishTime: '',
        order: 1,
        isActive: true
      },
      { 
        id: '2', 
        description: 'YY电商通过轮播图运营，首页点击率增长35%',
        image: '',
        publishTime: '',
        order: 2,
        isActive: true
      },
      { 
        id: '3', 
        description: 'ZZ金融平台使用我们的解决方案，转化率提升28%',
        image: '',
        publishTime: '',
        order: 3,
        isActive: true
      },
      { 
        id: '4', 
        description: 'AA医疗系统部署我们的应用，用户满意度提高42%',
        image: '',
        publishTime: '',
        order: 4,
        isActive: true
      }
    ];
    
    console.log('案例列表页面加载，数据:', cases.value);
  } catch (err) {
    console.error('获取案例数据失败:', err);
    error.value = '获取案例数据失败，请稍后重试';
  } finally {
    loadingCases.value = false;
  }
};

// 获取案例图片
const getCaseImage = (index: number) => {
  const imageIds = ['case1', 'case2', 'case3', 'case4'];
  const imageIndex = index % imageIds.length;
  return `https://picsum.photos/seed/${imageIds[imageIndex]}/400/300`;
};

// 获取案例标题
const getCaseTitle = (index: number) => {
  const titles = [
    '企业数字化转型案例',
    '电子商务平台开发案例',
    '数据智能分析系统案例',
    '医疗健康信息化解决方案'
  ];
  const titleIndex = index % titles.length;
  return titles[titleIndex];
};

// 组件挂载时获取数据
onMounted(() => {
  fetchCaseList();
});
</script>

<style scoped>
/* 页面基础样式 */
.cases-page {
  background-color: #f9f9f9;
  min-height: 100vh;
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
  background: url('https://picsum.photos/seed/casebanner/1920/1080') center/cover no-repeat;
  opacity: 0.2;
  z-index: 1;
}

.page-header .container {
  position: relative;
  z-index: 2;
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

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 案例列表 */
.cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  padding: 60px 0;
}

.case-card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.case-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.case-image-container {
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.case-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
}

.case-card:hover .case-image {
  transform: scale(1.1);
}

.case-desc {
  padding: 25px;
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: white;
}

.case-desc h3 {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 15px;
  font-weight: 600;
}

.case-desc p {
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
}

.view-detail-link {
  display: inline-flex;
  align-items: center;
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.view-detail-link:hover {
  color: #2980b9;
  transform: translateX(5px);
}

.view-detail-link .arrow {
  margin-left: 5px;
  transition: transform 0.3s ease;
}

.view-detail-link:hover .arrow {
  transform: translateX(3px);
}

/* 加载和错误状态 */
.loading-container,
.error-message {
  text-align: center;
  padding: 60px 20px;
  background-color: white;
  margin: 60px 0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-state p {
  color: #e74c3c;
  font-size: 1.1rem;
}

/* 响应式设计 */
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
  
  .container {
    padding: 0 15px;
  }
  
  .cases-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 40px 0;
  }
  
  .case-image-container {
    height: 200px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .cases-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>