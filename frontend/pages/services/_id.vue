<template>
  <div class="service-detail-page">
    <!-- 引入公共导航 -->
    <Navbar />
    
    <div class="container">
      <!-- 加载状态 -->
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>加载中...</p>
      </div>
      
      <!-- 错误状态 -->
      <div v-else-if="error" class="error-container">
        <p>{{ error }}</p>
        <el-button type="primary" @click="fetchServiceDetail">重试</el-button>
      </div>
      
      <!-- 服务详情内容 -->
      <div v-else-if="serviceDetail" class="service-detail-content">
        <div class="page-header">
          <el-button type="text" icon="el-icon-arrow-left" @click="$router.back()" class="back-btn">
            返回
          </el-button>
          <h1 class="page-title">{{ serviceDetail.title }}</h1>
        </div>
        
        <div class="service-card">
          <div class="service-icon" v-if="serviceDetail.icon">
            <i :class="['iconfont', `icon-${serviceDetail.icon}`]"></i>
          </div>
          <div class="service-info">
            <h2 class="service-title">{{ serviceDetail.title }}</h2>
            <div class="service-description">
              {{ serviceDetail.description }}
            </div>
            
            <!-- 服务附加信息 -->
            <div class="service-meta">
              <div class="meta-item" v-if="serviceDetail.order !== undefined">
                排序: {{ serviceDetail.order }}
              </div>
              <div class="meta-item" v-if="serviceDetail.isActive !== undefined">
                状态: {{ serviceDetail.isActive ? '激活' : '未激活' }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- 服务详情补充内容 -->
        <div class="service-detail-section">
          <h3 class="section-title">服务详情</h3>
          <div class="detail-content">
            <p>{{ serviceDetail.description }}</p>
          </div>
        </div>
        
        <!-- 推荐服务 -->
        <div class="recommended-services">
          <h3 class="section-title">相关服务</h3>
          <div class="services-grid">
            <div 
              v-for="service in recommendedServices" 
              :key="service.id"
              class="recommended-service-card"
              @click="$router.push(`/services/${service.id}`)"
            >
              <div class="recommended-service-icon">
                <i :class="['iconfont', `icon-${service.icon}`]"></i>
              </div>
              <h4 class="recommended-service-title">{{ service.title }}</h4>
              <p class="recommended-service-desc">{{ service.desc || service.description }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 未找到状态 -->
      <div v-else class="not-found">
        <p>未找到服务详情</p>
        <el-button type="primary" @click="$router.back()">返回</el-button>
      </div>
    </div>
    
    <!-- 引入公共页脚 -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage, ElButton } from 'element-plus';
import { getServiceDetail, getServiceList } from '@/api/services';
import type { ServiceItem } from '@/api/services';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

// 路由和状态
const route = useRoute();
const router = useRouter();
// 获取并验证路由参数
const serviceId = computed(() => {
  console.log('计算serviceId，当前route.params:', route.params);
  const id = route.params.id as string;
  console.log('当前路由参数ID:', id, '类型:', typeof id);
  return id;
});

// 监听路由参数变化
watch(() => route.params.id, (newId, oldId) => {
  console.log('路由参数变化:', {
    oldId,
    newId
  });
  // 如果参数变化，重新获取数据
  if (newId) {
    fetchServiceDetail();
  }
});

console.log('详情页组件初始化，初始路由参数:', route.params);

// 数据状态
const serviceDetail = ref<ServiceItem | null>(null);
const recommendedServices = ref<ServiceItem[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

// 获取服务详情数据
const fetchServiceDetail = async () => {
  try {
    loading.value = true;
    error.value = null;
    
    // 使用新添加的API获取服务详情
    const detail = await getServiceDetail(serviceId.value);
    serviceDetail.value = detail;
    
    // 设置页面标题
    if (detail.title) {
      document.title = `${detail.title} - 服务详情`;
    }
    
    // 获取推荐服务（排除当前服务）
    const allServices = await getServiceList();
    recommendedServices.value = allServices.filter(
      service => service.id !== serviceId.value && service.id !== undefined
    ).slice(0, 3); // 最多显示3个推荐服务
    
  } catch (err) {
    console.error('获取服务详情失败:', err);
    error.value = '获取服务详情失败，请稍后重试';
    ElMessage.error('获取服务详情失败');
  } finally {
    loading.value = false;
  }
};

// 页面加载时获取数据
onMounted(() => {
  fetchServiceDetail();
});
</script>

<script lang="ts">
export default {
  // 使用客户端渲染避免hydration问题
  ssr: false
}
</script>

<style scoped>
.service-detail-page {
  min-height: 100vh;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
}

.container {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
}

/* 加载状态 */
.loading-container,
.error-container,
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #409eff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 页面头部 */
.page-header {
  margin-bottom: 30px;
}

.back-btn {
  margin-bottom: 10px;
}

.page-title {
  font-size: 32px;
  color: #303133;
  margin: 0;
  font-weight: 600;
}

/* 服务卡片 */
.service-card {
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.service-icon {
  font-size: 48px;
  color: #409eff;
  flex-shrink: 0;
}

.service-info {
  flex: 1;
}

.service-title {
  font-size: 24px;
  color: #303133;
  margin: 0 0 15px 0;
  font-weight: 600;
}

.service-description {
  line-height: 1.8;
  color: #606266;
  font-size: 16px;
  margin-bottom: 15px;
}

/* 服务元信息 */
.service-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 15px;
}

.meta-item {
  background: #f0f0f0;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  color: #666;
  border-left: 3px solid #409eff;
}

/* 详情部分 */
.service-detail-section,
.recommended-services {
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.section-title {
  font-size: 20px;
  color: #303133;
  margin: 0 0 20px 0;
  font-weight: 600;
  border-left: 4px solid #409eff;
  padding-left: 15px;
}

.detail-content {
  line-height: 1.8;
  color: #606266;
  font-size: 16px;
}

/* 推荐服务 */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.recommended-service-card {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e4e7ed;
}

.recommended-service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: #409eff;
}

.recommended-service-icon {
  font-size: 32px;
  color: #409eff;
  margin-bottom: 15px;
}

.recommended-service-title {
  font-size: 18px;
  color: #303133;
  margin: 0 0 10px 0;
  font-weight: 500;
}

.recommended-service-desc {
  line-height: 1.6;
  color: #606266;
  font-size: 14px;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    padding: 15px;
  }
  
  .service-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px;
  }
  
  .page-title {
    font-size: 24px;
  }
  
  .service-title {
    font-size: 20px;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>