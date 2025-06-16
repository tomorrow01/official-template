<template>
  <el-carousel 
    class="banner-carousel"
    :height="height" 
    indicator-position="outside"
    arrow="always"
  >
    <el-carousel-item v-for="(item, index) in banners" :key="index">
      <NuxtLink :to="item.link" class="banner-link">
        <img 
          :src="item.image" 
          alt="轮播图" 
          class="banner-image"
        >
      </NuxtLink>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
import { defineProps } from 'vue';

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