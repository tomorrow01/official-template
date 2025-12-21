<template>
  <div class="banner-container relative overflow-hidden w-full">
    <!-- 当没有轮播图数据或数据为空时显示默认内容 -->
    <div v-if="!banners || banners.length === 0" class="no-banners">
      <div class="placeholder-banner bg-white/10 backdrop-blur-md rounded-xl p-8 text-center">
        <h3 class="text-white text-2xl font-bold mb-2">专业解决方案</h3>
        <p class="text-white/80">助力企业数字化转型</p>
      </div>
    </div>
    
    <!-- 正常轮播图组件 -->
    <el-carousel 
      v-else
      class="banner-carousel w-full"
      :style="{ height: carouselHeight }"
      indicator-position="outside"
      arrow="hover"
      :autoplay="true"
      :interval="5000"
    >
      <el-carousel-item v-for="item in banners" :key="item.id || item._id">
        <div class="banner-item w-full h-full relative overflow-hidden">
          <!-- 背景图片 - 添加错误处理 -->
          <img 
            :src="item.image || '/images/default-banner.jpg'" 
            :alt="item.title || '轮播图'" 
            class="banner-image w-full h-full object-cover"
            @load="handleImageLoad"
            @error="handleImageError"
          >
          
          <!-- 黑色渐变遮罩 -->
          <div class="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10"></div>
          
          <!-- 轮播内容区 -->
          <div class="banner-content absolute inset-0 z-20 flex items-center">
            <div class="container">
              <div class="max-w-xl">
                <h2 class="text-[clamp(2rem,5vw,4rem)] font-bold text-white leading-tight mb-4">{{ item.title || '默认标题' }}</h2>
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
          
          <!-- 点击链接 -->
          <NuxtLink :to="item.link || '#'" class="banner-link absolute inset-0 z-30"></NuxtLink>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

// 定义组件属性
interface Props {
  banners?: any[];
  height?: string;
}

const props = withDefaults(defineProps<Props>(), {
  banners: () => [],
  height: undefined,
});

// 轮播图高度
const carouselHeight = ref<string>('60vh');

// 图片加载完成后设置轮播图高度
const handleImageLoad = (event: Event) => {
  const img = event.target as HTMLImageElement;
  if (img) {
    // 计算图片的宽高比
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    // 根据宽高比和容器宽度计算高度
    const containerWidth = document.querySelector('.banner-container')?.clientWidth || window.innerWidth;
    const calculatedHeight = `${containerWidth / aspectRatio}px`;
    carouselHeight.value = calculatedHeight;
  }
};

// 图片加载失败时的处理函数
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  if (img) {
    // 当图片加载失败时，使用默认图片
    img.src = '/images/default-banner.jpg';
    // 为默认图片设置一个合理的高度
    carouselHeight.value = '50vh';
  }
};

// 监听轮播图数据变化
watch(() => props.banners, () => {
  // 当轮播图数据变化时，重置高度为默认值
  carouselHeight.value = '60vh';
});

// 监听height属性变化
watch(() => props.height, (newHeight) => {
  if (newHeight) {
    carouselHeight.value = newHeight;
  }
});

onMounted(() => {
  // 组件挂载后，如果传入了height属性，使用传入的高度
  if (props.height) {
    carouselHeight.value = props.height;
  }
});
</script>

<style scoped>
.banner-container {
  width: 100%;
  background-color: var(--bg-dark);
  position: relative;
  overflow-x: hidden;
}

/* 当没有轮播图数据时的占位样式 */
.no-banners {
  width: 100%;
  height: 400px;
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

/* 轮播图容器样式 - 移除固定高度 */
.banner-carousel {
  width: 100%;
  overflow-x: hidden;
}

/* 轮播图链接样式 */
.banner-link {
  position: relative;
  overflow: hidden;
  display: block;
  width: 100%;
  height: 100%;
}

/* 轮播项样式 - 确保容器充满整个轮播区域 */
.banner-item {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 轮播图图片样式 - 确保图片居中并覆盖整个容器 */
.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}

/* 轮播内容区样式 */
.banner-content {
  /* 移除动画效果，确保内容直接显示 */
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
  .no-banners {
    height: 300px;
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

/* 确保轮播图容器高度由JavaScript控制 */
:deep(.el-carousel__container),
:deep(.el-carousel__item) {
  height: 100% !important;
}

:deep(.el-carousel__item img) {
  height: 100% !important;
  width: 100% !important;
  object-fit: cover !important;
  display: block !important;
}

/* 确保轮播图容器能正确显示 */
:deep(.el-carousel) {
  display: block;
}

/* 确保指示器和箭头位置正确 */
:deep(.el-carousel__indicators) {
  bottom: 20px;
  z-index: 100;
}

:deep(.el-carousel__arrow) {
  z-index: 100;
}
</style>