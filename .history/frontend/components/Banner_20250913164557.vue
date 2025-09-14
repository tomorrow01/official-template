<template>
  <div class="banner-container">
    <!-- 轮播图数据调试信息 -->
    <div v-if="showDebugInfo" class="debug-info">
      轮播图数量: {{ banners.length }}
    </div>
    
    <!-- 当没有轮播图数据时显示默认内容 -->
    <div v-if="!banners || banners.length === 0" class="no-banners">
      <div class="placeholder-banner">
        <span>暂无轮播图数据</span>
      </div>
    </div>
    
    <!-- 正常轮播图组件 -->
    <el-carousel 
      v-else
      class="banner-carousel"
      :height="height" 
      indicator-position="outside"
      arrow="always"
    >
      <el-carousel-item v-for="(item, index) in banners" :key="item.id || index">
        <NuxtLink :to="item.link" class="banner-link">
          <img 
            :src="item.image" 
            :alt="item.title || '轮播图'" 
            class="banner-image"
          >
          <!-- 可选显示标题 -->
          <div v-if="item.title" class="banner-title">{{ item.title }}</div>
        </NuxtLink>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
import { defineProps, ref, watch, onMounted } from 'vue';

// 定义接收的轮播数据 prop
const props = defineProps({
  banners: {
    type: Array,
    required: true,
    default: () => []
  }
});

// 轮播图高度（可根据需求调整）
const height = ref('600px');

// 控制是否显示调试信息
const showDebugInfo = ref(false);

// 在组件挂载后（客户端环境）再判断是否显示调试信息
onMounted(() => {
  // 在开发环境显示调试信息
  if (import.meta.dev) {
    showDebugInfo.value = true;
  }
});

// 监听轮播数据变化，用于调试
watch(() => props.banners, (newBanners) => {
  console.log('Banner组件接收到的数据:', newBanners);
}, { immediate: true, deep: true });
</script>

<style scoped>
.banner-container {
  width: 100%;
  position: relative;
}

/* 调试信息样式 */
.debug-info {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  z-index: 100;
}

/* 无轮播图时的占位样式 */
.no-banners {
  width: 100%;
  height: 600px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.placeholder-banner {
  text-align: center;
  color: #999;
  font-size: 16px;
}

/* 轮播图容器样式 */
.banner-carousel {
  width: 100%;
  margin: 0 auto;
}

/* 轮播项链接样式 */
.banner-link {
  display: block;
  height: 100%;
  position: relative;
  overflow: hidden;
}

/* 轮播图图片样式 */
.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保持宽高比并铺满容器 */
  object-position: center; /* 图片居中显示 */
  transition: transform 0.5s ease;
}

/* 鼠标悬停效果 */
.banner-link:hover .banner-image {
  transform: scale(1.02);
}

/* 轮播图标题样式 */
.banner-title {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 18px;
  max-width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>