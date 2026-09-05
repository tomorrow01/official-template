<template>
  <div class="service-detail-page">
    <Navbar />
    
    <!-- 页面标题渐变条（与 cases 详情页统一风格） -->
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">核心服务详情</h1>
      </div>
    </div>
    
    <!-- 详情内容 -->
    <div class="container">
      <!-- 返回链接 -->
      <NuxtLink to="/services" class="back-link">
        &lt; 返回列表
      </NuxtLink>
      
      <!-- 加载状态 -->
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>加载中...</p>
      </div>
      
      <!-- 空状态 -->
      <div v-else-if="!serviceDetail" class="loading-container">
        <p>服务不存在</p>
        <NuxtLink to="/services" class="back-link">返回列表</NuxtLink>
      </div>
      
      <!-- 服务内容（白色圆角卡片，与 cases 统一） -->
      <div v-else class="service-content">
        <!-- 标题区 -->
        <div class="title-area">
          <span v-if="serviceDetail.icon" class="service-icon-badge" :class="`icon-${serviceDetail.icon}`"></span>
          <div class="title-text">
            <h2 class="service-title">{{ serviceDetail.title }}</h2>
            <p v-if="serviceDetail.subtitle" class="service-subtitle">{{ serviceDetail.subtitle }}</p>
          </div>
        </div>
        
        <!-- 简介（左侧竖条，与 cases 的 intro 块统一） -->
        <div v-if="serviceDetail.intro" class="service-intro">
          {{ serviceDetail.intro }}
        </div>
        
        <!-- 服务详情（富文本） -->
        <div class="service-description">
          <h3>服务详情</h3>
          <div class="rich-text" v-html="serviceDetail.description"></div>
        </div>
      </div>
      
      <!-- 相关服务推荐（保留，风格统一） -->
      <div v-if="recommendedServices.length > 0" class="recommended-section">
        <h3 class="section-title">相关服务</h3>
        <div class="recommended-grid">
          <NuxtLink
            v-for="service in recommendedServices"
            :key="service.id"
            :to="`/services/${service.id}`"
            class="recommended-card"
          >
            <span v-if="service.icon" class="recommended-icon" :class="`icon-${service.icon}`"></span>
            <h4 class="recommended-title">{{ service.title }}</h4>
            <p class="recommended-desc">{{ service.intro || stripHtml(service.description) }}</p>
          </NuxtLink>
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from '#app';
import { getServiceDetail, getServiceList } from '@/api/services';
import type { ServiceItem } from '@/api/services';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

definePageMeta({ ssr: false });

const route = useRoute();

const serviceDetail = ref<ServiceItem | null>(null);
const recommendedServices = ref<ServiceItem[]>([]);
const loading = ref(true);

// 从富文本中剥离 HTML 标签，取纯文本前 80 字
const stripHtml = (html: string | undefined): string => {
  if (!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return (tmp.textContent || tmp.innerText || '').slice(0, 80);
};

const fetchDetail = async () => {
  loading.value = true;
  serviceDetail.value = null;
  const id = route.params.id;
  if (!id) { loading.value = false; return; }
  try {
    const detail = await getServiceDetail(String(id));
    serviceDetail.value = detail || null;
    
    if (detail?.title) {
      document.title = `${detail.title} - 核心服务`;
    }
    
    // 获取相关服务（排除当前项）
    const allServices = await getServiceList();
    const list = Array.isArray(allServices) ? allServices : (allServices?.data || []);
    recommendedServices.value = list
      .filter((s: ServiceItem) => s.id && s.id !== String(id))
      .slice(0, 3);
  } catch (err) {
    console.error('获取服务详情失败:', err);
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
/* ===== 与 cases 详情页共用的视觉结构 ===== */
.service-detail-page {
  background: #f5f5f5;
  min-height: 100vh;
}

.page-header {
  /* 与 cases 详情页同一款渐变 */
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

/* ===== 加载/空状态 ===== */
.loading-container {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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

/* ===== 服务内容白色卡片 ===== */
.service-content {
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.title-area {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
}

.service-icon-badge {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
}

.title-text {
  flex: 1;
}

.service-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin: 0 0 6px 0;
}

.service-subtitle {
  font-size: 16px;
  color: #909399;
  margin: 0;
}

/* 简介块（与 cases 的 intro 完全同款） */
.service-intro {
  background: #f8f9fa;
  border-left: 4px solid #667eea;
  padding: 16px 20px;
  margin-bottom: 30px;
  font-size: 16px;
  color: #606266;
  line-height: 1.8;
  border-radius: 4px;
}

/* 富文本区 */
.service-description h3 {
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

/* ===== 相关服务推荐 ===== */
.recommended-section {
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin: 0 0 24px 0;
}

.recommended-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.recommended-card {
  display: block;
  padding: 24px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
  text-decoration: none;
  transition: all 0.3s ease;
  color: inherit;
}

.recommended-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.2);
  border-color: #667eea;
}

.recommended-icon {
  display: inline-block;
  font-size: 24px;
  color: #667eea;
  margin-bottom: 12px;
}

.recommended-title {
  font-size: 18px;
  color: #303133;
  margin: 0 0 8px 0;
  font-weight: 600;
}

.recommended-desc {
  font-size: 14px;
  color: #909399;
  margin: 0;
  line-height: 1.6;
}

/* ===== 响应式 ===== */
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
  
  .service-content,
  .recommended-section {
    padding: 24px;
  }
  
  .service-title {
    font-size: 24px;
  }
  
  .title-area {
    flex-direction: column;
    gap: 12px;
  }
  
  .recommended-grid {
    grid-template-columns: 1fr;
  }
}
</style>
