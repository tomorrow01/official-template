<template>
  <div class="article-detail-page">
    <Navbar />
    
    <!-- 渐变 header 条（与 cases/services 详情页统一风格） -->
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">最新动态详情</h1>
      </div>
    </div>
    
    <div class="container">
      <!-- 返回链接（和 cases/services 详情页统一写法） -->
      <NuxtLink to="/articles" class="back-link">
        &lt; 返回列表
      </NuxtLink>
      
      <!-- 加载状态 -->
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>正在加载文章...</p>
      </div>
      
      <!-- 错误/空状态 -->
      <div v-else-if="!article" class="loading-container">
        <p>文章不存在或已被删除</p>
        <NuxtLink to="/articles" class="back-link">返回文章列表</NuxtLink>
      </div>
      
      <!-- 文章详情内容（白色圆角卡片） -->
      <div v-else class="article-content">
        <!-- 标题区 -->
        <h2 class="article-title">{{ article.title }}</h2>
        <p v-if="article.subtitle" class="article-subtitle">{{ article.subtitle }}</p>
        
        <!-- 文章元信息 -->
        <div v-if="article.createTime || article.author" class="article-meta">
          <span v-if="article.createTime" class="meta-item">{{ formatDate(article.createTime) }}</span>
          <span v-if="article.author" class="meta-item">作者：{{ article.author }}</span>
        </div>
        
        <!-- 简介（左侧竖条，与 cases/services 的 intro 同款） -->
        <div v-if="article.intro" class="article-intro">
          {{ article.intro }}
        </div>
        
        <!-- 封面图 -->
        <div v-if="article.image" class="article-cover">
          <img :src="useImageUrl(article.image)" :alt="article.title" class="cover-image">
        </div>
        
        <!-- 文章内容（富文本） -->
        <div class="article-body">
          <div class="rich-text" v-html="article.content"></div>
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from '#app';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { getArticleDetail } from '@/api/articles';
import { useImageUrl } from '@/composables/useImageUrl';

definePageMeta({ ssr: false });

const route = useRoute();

const article = ref(null);
const loading = ref(true);

const formatDate = (dateString) => {
  if (!dateString) return '';
  const d = new Date(dateString);
  return `${d.getFullYear()}年${String(d.getMonth() + 1).padStart(2, '0')}月${String(d.getDate()).padStart(2, '0')}日`;
};

const fetchDetail = async () => {
  loading.value = true;
  article.value = null;
  const id = route.params.id;
  if (!id) { loading.value = false; return; }
  try {
    article.value = await getArticleDetail(String(id));
    
    if (article.value?.title) {
      document.title = `${article.value.title} - 最新动态`;
    }
  } catch (err) {
    console.error('获取文章详情失败:', err);
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
/* ===== 与 cases/services 详情页共用的视觉结构 ===== */
.article-detail-page {
  background: #f5f5f5;
  min-height: 100vh;
}

/* 渐变 header（60px 详情页高度，统一） */
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

/* ===== 白色圆角卡片 ===== */
.article-content {
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.article-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.article-subtitle {
  font-size: 16px;
  color: #909399;
  margin: 0 0 16px 0;
}

/* 元信息行 */
.article-meta {
  display: flex;
  gap: 24px;
  padding-bottom: 20px;
  margin-bottom: 24px;
  border-bottom: 1px solid #ebeef5;
}

.meta-item {
  font-size: 14px;
  color: #909399;
}

/* 简介块（与 cases/services 的 intro 完全同款） */
.article-intro {
  background: #f8f9fa;
  border-left: 4px solid #667eea;
  padding: 16px 20px;
  margin-bottom: 30px;
  font-size: 16px;
  color: #606266;
  line-height: 1.8;
  border-radius: 4px;
}

/* 封面图 */
.article-cover {
  margin-bottom: 30px;
  border-radius: 8px;
  overflow: hidden;
}

.cover-image {
  width: 100%;
  height: auto;
  display: block;
  max-height: 500px;
  object-fit: cover;
}

/* 富文本区 */
.article-body {
  /* 富文本详细样式见 assets/css/main.css 的 .rich-text */
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
  
  .article-content {
    padding: 24px;
  }
  
  .article-title {
    font-size: 24px;
  }
  
  .article-meta {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
