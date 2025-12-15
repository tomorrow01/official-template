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
      <div v-else-if="cases.length > 0" class="cases-grid">
        <NuxtLink 
          v-for="caseItem in cases" 
          :key="caseItem.id" 
          :to="`/cases/${caseItem.id}`"
          class="case-card"
        >
          <!-- 案例图片 -->
          <div class="case-image-container">
            <img 
              :src="getCaseImage(caseItem)" 
              :alt="caseItem.description" 
              class="case-image"
            >
          </div>
          
          <!-- 案例描述 -->
          <div class="case-desc">
            <h3>{{ caseItem.title }}</h3>
            <p style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">{{ caseItem.description }}</p>
            <!-- 查看详情链接 -->
            <span class="view-detail-link">
              查看详情
              <span class="arrow">→</span>
            </span>
          </div>
        </NuxtLink>
      </div>
      
      <!-- 无数据状态 -->
      <div v-else class="no-data-message">
        <p>暂无案例数据</p>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Footer from '@/components/Footer.vue';
import type { CaseItem } from '~/api/cases';
import { getCaseList } from '~/api/cases';

// 状态管理
const cases = ref<CaseItem[]>([]);
const loadingCases = ref(true);
const error = ref('');

// 获取案例数据
const fetchCaseList = async () => {
  loadingCases.value = true;
  error.value = '';
  try {
    console.log('开始获取客户案例数据...');
    
    // 确保getCaseList函数存在
    if (typeof getCaseList !== 'function') {
      throw new Error('getCaseList函数未正确导入或定义');
    }
    
    // 使用API获取数据
    const res = await getCaseList();
    console.log('案例API返回结果:', res);
    
    // 处理可能的不同响应格式
    let caseData: CaseItem[] = [];
    
    if (Array.isArray(res)) {
      caseData = res as CaseItem[];
    } else if (res && typeof res === 'object' && 'data' in res) {
      // 处理嵌套的数据格式
      caseData = (res as any).data as CaseItem[];
    } else {
      throw new Error('获取的案例数据格式不正确');
    }
    
    // 过滤激活的案例并确保数据格式一致
    cases.value = caseData
      .filter(item => item && typeof item === 'object' && item.isActive !== false) // 先过滤无效和非激活数据
      .map(item => {
        // 如果没有title，从description中提取前几个字作为标题
        let title = item.title;
        if (!title && item.description) {
          title = item.description.length > 20 ? item.description.substring(0, 20) + '...' : item.description;
        }
        
        return {
          ...item,
          _id: item._id || item.id || `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          id: item.id || item._id || `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: title || '客户案例',
          description: item.description || '暂无描述',
          image: item.image || `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/800/600`,
          publishTime: item.publishTime || new Date().toISOString(),
          order: item.order || 0,
          isActive: item.isActive !== false
        };
      });
    
    console.log(`成功获取到${cases.value.length}个客户案例数据`, cases.value);
  } catch (err) {
    console.error('获取案例数据失败:', err);
    error.value = err instanceof Error ? err.message : '获取案例数据失败，请稍后重试';
    
    // 使用模拟数据作为后备
    console.log('使用模拟客户案例数据作为后备...');
    cases.value = [
      { 
        id: '1', 
        title: 'XX教育内容管理系统',
        description: 'XX教育使用我们的内容管理系统，内容发布效率提升60%',
        image: 'https://picsum.photos/id/237/800/600',
        publishTime: '2024-01-15',
        order: 1,
        isActive: true
      },
      { 
        id: '2', 
        title: 'YY电商轮播图运营',
        description: 'YY电商通过轮播图运营，首页点击率增长35%',
        image: 'https://picsum.photos/id/24/800/600',
        publishTime: '2024-02-20',
        order: 2,
        isActive: true
      },
      { 
        id: '3', 
        title: 'ZZ金融平台解决方案',
        description: 'ZZ金融平台使用我们的解决方案，转化率提升28%',
        image: 'https://picsum.photos/id/119/800/600',
        publishTime: '2024-03-10',
        order: 3,
        isActive: true
      },
      { 
        id: '4', 
        title: 'AA医疗系统应用部署',
        description: 'AA医疗系统部署我们的应用，用户满意度提高42%',
        image: 'https://picsum.photos/id/10/800/600',
        publishTime: '2024-04-05',
        order: 4,
        isActive: true
      }
    ];
  } finally {
    loadingCases.value = false;
  }
};

// 获取案例图片
const getCaseImage = (caseItem: CaseItem) => {
  return caseItem.image || `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/800/600`;
};

// 格式化日期（可选，用于后续扩展）
const formatDate = (dateStr?: string): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
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