<template>
  <div class="simple-case-detail">
    <Navbar />
    
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">客户案例详情</h1>
      </div>
    </div>
    
    <!-- 案例详情内容 -->
    <div class="container">
      <!-- 返回链接 -->
      <NuxtLink to="/cases" class="back-link">
        &lt; 返回列表
      </NuxtLink>
      
      <!-- 加载状态 -->
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>加载中...</p>
      </div>
      
      <!-- 错误/空状态 -->
      <div v-else-if="!detail" class="loading-container">
        <p>案例不存在</p>
        <NuxtLink to="/cases" class="back-link">返回列表</NuxtLink>
      </div>
      
      <!-- 案例内容 -->
      <div v-else class="case-content">
        <h2 class="case-title">{{ detail.title || '客户案例' }}</h2>
        <p v-if="detail.subtitle" class="case-subtitle">{{ detail.subtitle }}</p>
        <p v-if="detail.createTime" class="case-date">{{ formatDate(detail.createTime) }}</p>
        
        <!-- 案例图片 -->
        <div v-if="detail.image" class="case-image-wrapper">
          <img :src="useImageUrl(detail.image)" :alt="detail.title || detail.description" class="case-image">
        </div>
        
        <!-- 案例简介 -->
        <div v-if="detail.intro" class="case-intro">
          {{ detail.intro }}
        </div>
        
        <!-- 案例详情（富文本） -->
        <div class="case-description">
          <h3>案例详情</h3>
          <div class="rich-text" v-html="detail.description"></div>
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from '#app';
import { getCaseDetail } from '@/api/cases';
import { useImageUrl } from '@/composables/useImageUrl';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

definePageMeta({ ssr: false });

const route = useRoute();

const detail = ref(null);
const loading = ref(true);

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return `${d.getFullYear()}年${String(d.getMonth() + 1).padStart(2, '0')}月${String(d.getDate()).padStart(2, '0')}日`;
};

const fetchDetail = async () => {
  loading.value = true;
  detail.value = null;
  const id = route.params.id;
  if (!id) { loading.value = false; return; }
  try {
    detail.value = await getCaseDetail(String(id));
  } catch (err) {
    console.error('获取案例详情失败:', err);
  } finally {
    loading.value = false;
  }
};

watch(() => route.params.id, () => fetchDetail());

onMounted(() => {
  fetchDetail();
});
</script>

<style scoped>
.simple-case-detail {
  background: #f5f5f5;
  min-height: 100vh;
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 0;
  text-align: center;
}

.page-title {
  font-size: 36px;
  font-weight: 700;
  margin: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
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

.loading-container {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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

.case-content {
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.case-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.case-subtitle {
  font-size: 16px;
  color: #909399;
  margin-bottom: 12px;
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

/* 富文本详细样式见 assets/css/main.css 的 .rich-text */

.case-intro {
  background: #f8f9fa;
  border-left: 4px solid #667eea;
  padding: 16px 20px;
  margin-bottom: 30px;
  font-size: 16px;
  color: #606266;
  line-height: 1.8;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .page-header {
    padding: 40px 0;
  }
  
  .page-title {
    font-size: 28px;
  }
  
  .container {
    padding: 20px;
  }
  
  .case-content {
    padding: 20px;
  }
  
  .case-title {
    font-size: 24px;
  }
}
</style>
