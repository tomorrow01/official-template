<template>
  <div class="simple-case-detail">
    <!-- 页面标题 -->
  <div class="page-header case-detail-header">
      <div class="container">
        <h1>客户案例详情</h1>
        <p>探索我们如何帮助各行各业的客户实现业务增长和数字化转型</p>
      </div>
    </div>
    
    <!-- 案例详情内容 -->
    <div class="container">
      <!-- 返回按钮 - 使用NuxtLink -->
      <NuxtLink to="/cases" class="back-link">
        &lt; 返回列表
      </NuxtLink>
      
      <!-- 加载状态 -->
      <div v-if="loading" class="loading-container">
        <p>正在加载案例详情...</p>
      </div>
      
      <!-- 错误状态 -->
      <div v-else-if="error" class="error-message">
        <p>{{ error }}</p>
      </div>
      
      <!-- 案例内容 -->
      <div v-else class="case-content">
        <!-- 使用title字段作为标题 -->
        <h2 class="case-title">{{ currentCase.title }}</h2>
        <p class="case-date">{{ formatDate(currentCase.createTime || currentCase.publishTime) }}</p>
        
        <!-- 案例图片 -->
        <div class="case-image-wrapper">
          <img :src="currentCase.image" :alt="currentCase.description" class="case-image">
        </div>
        
        <!-- 案例描述 -->
        <div class="case-description">
          <h3>案例详情</h3>
          <p>{{ currentCase.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { CaseItem } from '~/api/cases';
import { getCaseDetail } from '~/api/cases';

// 获取路由参数
const route = useRoute();

// 状态管理
const currentCase = ref<CaseItem>({
  id: '',
  _id: '',
  title: '',
  description: '',
  image: '',
  publishTime: '',
  order: 0,
  isActive: true
});

const loading = ref(true);
const error = ref('');

// 格式化日期
const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

// 获取案例详情
const fetchCaseDetail = async () => {
  loading.value = true;
  error.value = '';
  try {
    const caseId = route.params.id as string;
    console.log('开始获取案例详情，ID:', caseId);
    
    // 确保getCaseDetail函数存在
    if (typeof getCaseDetail !== 'function') {
      throw new Error('getCaseDetail函数未正确导入或定义');
    }
    
    // 使用API获取数据
    const res = await getCaseDetail(caseId);
    console.log('案例详情API返回结果:', res);
    
    // 处理可能的不同响应格式
    let caseData: CaseItem;
    
    if (res && typeof res === 'object') {
      // 如果响应是一个对象，直接使用
      caseData = res as CaseItem;
    } else if (res && typeof res === 'object' && 'data' in res) {
      // 处理嵌套的数据格式
      caseData = (res as any).data as CaseItem;
    } else {
      throw new Error('获取的案例详情数据格式不正确');
    }
    
    // 确保数据格式符合CaseItem接口
    currentCase.value = {
      ...caseData,
      id: caseData._id || caseData.id || '',
      _id: caseData._id || caseData.id || '',
      description: caseData.description || '',
      image: caseData.image || 'https://picsum.photos/id/237/800/600',
      publishTime: caseData.publishTime || '',
      order: caseData.order || 0,
      isActive: caseData.isActive !== false
    };
    
    console.log('成功获取到案例详情数据:', currentCase.value);
  } catch (err) {
    console.error('获取案例详情失败:', err);
    error.value = err instanceof Error ? err.message : '获取案例详情失败，请稍后重试';
    
    // 设置默认数据
    currentCase.value = {
      id: route.params.id as string,
      _id: route.params.id as string,
      title: `案例 ${route.params.id} 详情`, // 添加默认标题
      description: `案例 ${route.params.id} 详情`,
      image: 'https://picsum.photos/id/237/800/600',
      createTime: '',
      order: 0,
      isActive: true
    };
  } finally {
    loading.value = false;
  }
};

// 组件挂载时获取数据
onMounted(() => {
  fetchCaseDetail();
});



// 页面加载时的日志
console.log('案例详情页加载，ID:', route.params.id);
</script>

<style scoped>
.simple-case-detail {
  background: #f5f5f5;
  min-height: 100vh;
}

.page-header, .case-detail-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  padding: 80px 0 !important;
  text-align: center !important;
  position: relative !important;
  overflow: hidden !important;
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

.back-link {
  display: inline-block;
  margin-bottom: 30px;
  color: #409eff;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s;
}

.back-link:hover {
  color: #66b1ff;
}

/* 加载状态样式 */
.loading-container {
  background: white;
  border-radius: 12px;
  padding: 60px 40px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 18px;
  color: #606266;
}

/* 错误状态样式 */
.error-message {
  background: white;
  border-radius: 12px;
  padding: 60px 40px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 18px;
  color: #f56c6c;
}

.case-content {
  background: white;
  border-radius: 12px;
  padding: 60px 40px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.case-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.case-date {
  font-size: 16px;
  color: #909399;
  margin-bottom: 30px;
}

.case-image-wrapper {
  width: 100%;
  margin-bottom: 40px;
  border-radius: 8px;
  overflow: hidden;
}

.case-image {
  width: 100%;
  height: auto;
  display: block;
}

.case-description h3 {
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.case-description p {
  font-size: 16px;
  line-height: 1.8;
  color: #606266;
  margin-bottom: 15px;
}

@media (max-width: 768px) {
  .page-header, .case-detail-header {
    padding: 60px 0 !important;
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
  
  .case-content, .loading-container, .error-message {
    padding: 20px;
  }
  
  .case-title {
    font-size: 24px;
  }
}
</style>