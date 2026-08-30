<template>
  <div class="article-detail-page">
    <Navbar />
    
    <div class="container">
      <!-- 返回按钮 -->
      <div class="back-button-container">
        <NuxtLink to="/articles" class="back-link">
          <ArrowLeft style="vertical-align: middle; margin-right: 4px;" />
          返回文章列表
        </NuxtLink>
      </div>
      
      <!-- 文章详情卡片 -->
      <div v-if="!loading && article" class="article-detail-card">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        
        <!-- 文章元信息 -->
        <div class="article-meta">
          <span v-if="article.createTime" class="publish-date">发布时间：{{ formatDate(article.createTime) }}</span>
          <span class="author" v-if="article.author">作者：{{ article.author }}</span>
        </div>
        
        <!-- 文章封面图 -->
        <div v-if="article.image" class="article-cover">
          <img :src="article.image" :alt="article.title" class="cover-image">
        </div>
        
        <!-- 文章内容 -->
        <div class="article-content" v-html="article.content"></div>
      </div>
      
      <!-- 加载状态 -->
      <div v-else-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>正在加载文章...</p>
      </div>
      
      <!-- 错误状态 -->
      <div v-else class="error-container">
        <p>文章不存在或已被删除</p>
        <NuxtLink to="/articles" class="back-link" style="margin-top: 16px; display: inline-block;">
          返回文章列表
        </NuxtLink>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from '#app';
import { ArrowLeft } from '@element-plus/icons-vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { getArticleDetail } from '@/api/articles';

definePageMeta({ ssr: false });

const route = useRoute();
const articleId = computed(() => String(route.params.id));

const article = ref(null);
const loading = ref(true);

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

// 获取文章详情
const fetchArticleDetail = async () => {
  loading.value = true;
  article.value = null;
  try {
    const detail = await getArticleDetail(articleId.value);
    article.value = detail;
  } catch (err) {
    console.error('获取文章详情失败:', err);
  } finally {
    loading.value = false;
  }
};

// 监听路由参数变化
watch(() => route.params.id, () => fetchArticleDetail());

// 页面加载时获取数据
onMounted(() => {
  fetchArticleDetail();
});
</script>

<style scoped>
.article-detail-page {
  padding: 40px 0;
  background: var(--bg-base);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.back-button-container {
  margin-bottom: 20px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  color: #409eff;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.back-link:hover {
  color: #66b1ff;
}

.article-detail-card {
  background: var(--bg-container);
  border-radius: 12px;
  padding: 40px;
  box-shadow: var(--shadow-light);
}

.article-title {
  font-size: 28px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 20px;
  line-height: 1.4;
}

.article-meta {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
}

.publish-date,
.author {
  font-size: 14px;
  color: var(--text-tertiary);
}

.article-cover {
  margin-bottom: 30px;
  border-radius: 8px;
  overflow: hidden;
}

.cover-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  max-height: 500px;
  border-radius: 8px;
}

.article-content {
  font-size: 16px;
  line-height: 1.8;
  color: var(--text-secondary);
}

.article-content p {
  margin-bottom: 20px;
}

.article-content img {
  max-width: 100%;
  height: auto;
  margin: 20px 0;
  border-radius: 4px;
}

.loading-container,
.error-container {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--bg-container);
  border-radius: 12px;
  padding: 40px;
  text-align: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #409eff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .article-detail-card {
    padding: 20px;
  }
  
  .article-title {
    font-size: 24px;
  }
  
  .article-meta {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
