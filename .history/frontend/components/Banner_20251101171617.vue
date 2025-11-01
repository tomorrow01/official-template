<template>
  <div class="banner-container relative overflow-hidden">
    <!-- 当没有轮播图数据时显示默认内容 -->
    <div v-if="!banners || banners.length === 0" class="no-banners">
      <div class="placeholder-banner bg-white/10 backdrop-blur-md rounded-xl p-8 text-center">
        <h3 class="text-white text-2xl font-bold mb-2">专业解决方案</h3>
        <p class="text-white/80">助力企业数字化转型</p>
      </div>
    </div>
    
    <!-- 正常轮播图组件 -->
    <el-carousel 
      v-else
      class="banner-carousel h-full"
      :height="bannerHeight"
      indicator-position="outside"
      arrow="hover"
      :autoplay="true"
      :interval="5000"
    >
      <el-carousel-item v-for="(item, index) in banners" :key="item.id || index">
        <NuxtLink :to="item.link || '#'" class="banner-link block w-full h-full relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10"></div>
          <img 
            :src="item.image" 
            :alt="item.title || '轮播图'" 
            class="banner-image w-full h-full object-cover transition-transform duration-7000 ease-in-out"
          >
          
          <!-- 轮播内容区 -->
          <div class="banner-content absolute inset-0 z-20 flex items-center">
            <div class="container" :class="{ 'animate-fadeIn': currentIndex === index }">
              <div class="max-w-xl" v-if="item.title">
                <h2 class="text-[clamp(2rem,5vw,4rem)] font-bold text-white leading-tight mb-4">{{ item.title }}</h2>
                <p v-if="item.description" class="text-[clamp(1rem,2vw,1.25rem)] text-white/90 mb-8 max-w-lg">
                  {{ item.description }}
                </p>
                <el-button 
                  v-if="item.ctaText" 
                  type="primary" 
                  :to="item.link || '#'"
                  class="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg transform hover:translate-y-[-2px] transition-all"
                >
                  {{ item.ctaText }}
                </el-button>
              </div>
            </div>
          </div>
        </NuxtLink>
      </el-carousel-item>
    </el-carousel>
    
    <!-- 装饰元素 -->
    <div class="decorative-elements">
      <div class="decor-circle-1 absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
      <div class="decor-circle-2 absolute bottom-10 left-40 w-80 h-80 rounded-full bg-secondary/10 blur-3xl"></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, computed, onMounted, onUnmounted } from 'vue';

// 定义接收的轮播数据 prop
const props = defineProps({
  banners: {
    type: Array,
    required: true,
    default: () => []
  }
});

const currentIndex = ref(0);

// 根据屏幕尺寸动态计算轮播图高度
const bannerHeight = computed(() => {
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
  
  if (isMobile) return '70vh';
  if (isTablet) return '80vh';
  return '90vh';
});

// 处理窗口大小变化
const handleResize = () => {
  // 强制重新计算高度
  currentIndex.value = currentIndex.value;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.banner-container {
  width: 100%;
  min-height: 600px;
  background-color: var(--bg-dark);
  position: relative;
}

/* 当没有轮播图数据时的占位样式 */
.no-banners {
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-gradient);
  position: relative;
  overflow: hidden;
}

.placeholder-banner {
  box-shadow: var(--shadow-heavy);
  transform: scale(1);
  transition: transform var(--transition-normal);
}

.placeholder-banner:hover {
  transform: scale(1.05);
}

/* 轮播图容器样式 */
.banner-carousel {
  width: 100%;
}

/* 轮播图链接样式 */
.banner-link {
  position: relative;
  overflow: hidden;
}

/* 轮播图图片样式 */
.banner-image {
  transform: scale(1.1);
}

.banner-link:hover .banner-image {
  transform: scale(1.15);
}

/* 轮播内容区样式 */
.banner-content {
  animation: fadeInUp 1s ease-out;
}

/* 自定义指示器样式 */
:deep(.el-carousel__indicators) {
  bottom: 30px;
}

:deep(.el-carousel__indicator)
  {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: 0 8px;
  transition: all var(--transition-normal);
  background-color: rgba(255, 255, 255, 0.3);
}

:deep(.el-carousel__indicator.is-active) {
  width: 36px;
  border-radius: 6px;
  background-color: var(--primary-color);
}

/* 自定义箭头样式 */
:deep(.el-carousel__arrow) {
  width: 50px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  color: white;
  font-size: 24px;
  opacity: 0;
  transition: all var(--transition-normal);
}

:deep(.el-carousel__arrow--left) {
  left: 20px;
}

:deep(.el-carousel__arrow--right) {
  right: 20px;
}

.banner-carousel:hover :deep(.el-carousel__arrow) {
  opacity: 1;
  transform: translateY(0);
}

:deep(.el-carousel__arrow:hover) {
  background-color: var(--primary-color);
  transform: scale(1.1);
}

/* 装饰元素 */
.decorative-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
}

.decor-circle-1, .decor-circle-2 {
  animation: float 15s ease-in-out infinite;
}

.decor-circle-2 {
  animation-delay: 5s;
}

/* 动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-20px, -20px) scale(1.1);
  }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .banner-container {
    min-height: 70vh;
  }
  
  :deep(.el-carousel__indicator) {
    width: 10px;
    height: 10px;
    margin: 0 6px;
  }
  
  :deep(.el-carousel__indicator.is-active) {
    width: 30px;
  }
}

@media (max-width: 768px) {
  .banner-container {
    min-height: 60vh;
  }
  
  .no-banners {
    height: 70vh;
  }
  
  .placeholder-banner {
    padding: 6px;
  }
  
  .placeholder-banner h3 {
    font-size: 1.5rem;
  }
  
  .banner-content {
    align-items: flex-end;
    padding-bottom: 60px;
  }
  
  .banner-content .container {
    text-align: center;
  }
  
  .banner-content h2 {
    font-size: 1.75rem !important;
  }
  
  :deep(.el-carousel__arrow) {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }
  
  :deep(.el-carousel__arrow--left) {
    left: 10px;
  }
  
  :deep(.el-carousel__arrow--right) {
    right: 10px;
  }
  
  .decorative-elements {
    display: none;
  }
}
</style>