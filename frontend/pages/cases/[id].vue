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
      <!-- 返回按钮 - 使用简单的a标签 -->
      <a href="/cases" class="back-link">
        &lt; 返回列表
      </a>
      
      <!-- 案例内容 -->
      <div class="case-content">
        <h2 class="case-title">{{ currentCase.description }}</h2>
        <p class="case-date">{{ currentCase.publishTime }}</p>
        
        <!-- 案例图片 -->
        <div class="case-image-wrapper">
          <img :src="currentCase.image" :alt="currentCase.description" class="case-image">
        </div>
        
        <!-- 案例描述 -->
        <div class="case-description">
          <h3>案例详情</h3>
          <p>这是ID为 {{ route.params.id }} 的客户案例详细信息。通过我们的解决方案，客户实现了显著的业务增长和效率提升。</p>
          <p>我们的专业团队为客户提供了全方位的技术支持和咨询服务，帮助客户成功应对业务挑战，实现数字化转型。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

// 获取路由参数
const route = useRoute();

// 模拟案例数据，使用与列表页相同的图片URL
const mockCases = {
  '1': {
    id: '1',
    description: 'XX教育使用我们的内容管理系统，内容发布效率提升60%',
    image: 'https://picsum.photos/seed/case1/400/300',
    publishTime: '2024年01月15日'
  },
  '2': {
    id: '2',
    description: 'YY电商通过轮播图运营，首页点击率增长35%',
    image: 'https://picsum.photos/seed/case2/400/300',
    publishTime: '2024年01月10日'
  },
  '3': {
    id: '3',
    description: 'ZZ金融平台使用我们的解决方案，转化率提升28%',
    image: 'https://picsum.photos/seed/case3/400/300',
    publishTime: '2024年01月05日'
  },
  '4': {
    id: '4',
    description: 'AA医疗系统部署我们的应用，用户满意度提高42%',
    image: 'https://picsum.photos/seed/case4/400/300',
    publishTime: '2024年01月01日'
  }
};

// 计算当前案例数据
const currentCase = computed(() => {
  const caseId = route.params.id;
  return mockCases[caseId] || {
    id: caseId,
    description: `案例 ${caseId} 详情`,
    image: '/images/case1.png',
    publishTime: '2024年01月01日'
  };
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
  
  .case-content {
    padding: 20px;
  }
  
  .case-title {
    font-size: 24px;
  }
}
</style>