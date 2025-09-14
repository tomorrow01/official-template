<template>
  <div class="banner-container">
    <!-- 轮播图数据调试信息 -->
    <div v-if="process.env.NODE_ENV !== 'production'" class="debug-info">
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
import { defineProps, ref, watch } from 'vue';

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

// 监听轮播数据变化，用于调试
watch(() => props.banners, (newBanners) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Banner组件接收到的数据:', newBanners);
  }
}, { immediate: true, deep: true });
</script>

<style scoped>
.banner-carousel {
  width: 100%;
  margin: 0 auto;
}

.banner-link {
  display: block;
  height: 100%;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保持宽高比并铺满容器 */
  object-position: center; /* 图片居中显示 */
}
</style>