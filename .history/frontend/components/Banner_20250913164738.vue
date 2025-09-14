<template>
  <div class="banner-container">
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
import { defineProps, ref } from 'vue';

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
</script>

<style scoped>
.banner-container {
  width: 100%;
  position: relative;
}

/* 当没有轮播图数据时的占位样式 */
.no-banners {
  width: 100%;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f2f5;
}

.placeholder-banner {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 轮播图容器样式 */
.banner-carousel {
  width: 100%;
}

/* 轮播图链接样式 */
.banner-link {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

/* 轮播图图片样式 */
.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

/* 图片悬停效果 */
.banner-link:hover .banner-image {
  transform: scale(1.05);
}

/* 轮播图标题样式 */
.banner-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  font-size: 18px;
  font-weight: 600;
}
</style>