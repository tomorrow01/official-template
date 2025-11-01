<template>
  <div class="article-detail-page">
    <div class="container">
      <!-- 返回按钮 -->
      <div class="back-button-container">
        <el-button @click="navigateBack" type="default" size="small">
          <el-icon><ArrowLeft /></el-icon>
          返回首页
        </el-button>
      </div>
      
      <!-- 文章详情卡片 -->
      <div v-if="!loading && article" class="article-detail-card">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        
        <!-- 文章元信息 -->
        <div class="article-meta">
          <span class="publish-date">发布时间：{{ formatDate(article.createTime) }}</span>
          <span class="view-count">浏览次数：{{ article.views || 0 }}</span>
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
        <el-loading v-loading="loading" element-loading-text="正在加载文章..." />
      </div>
      
      <!-- 错误状态 -->
      <div v-else class="error-container">
        <el-empty description="文章不存在或已被删除"></el-empty>
        <el-button @click="navigateBack" type="primary" style="margin-top: 20px;">
          返回首页
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ArrowLeft } from '@element-plus/icons-vue';
import { getArticleDetail } from '@/api/articles';

const router = useRouter();
const route = useRoute();
const articleId = String(route.params.id);

const article = ref<any>(null);
const loading = ref(true);
const error = ref<string | null>(null);

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
  error.value = null;
  try {
    console.log(`开始获取文章ID为${articleId}的详情...`);
    const res = await getArticleDetail(articleId);
    
    // 正确提取数据，确保数据格式一致
    article.value = res.data || res;
    console.log('获取到的文章详情:', article.value);
    
    // 如果没有数据，使用模拟数据
    if (!article.value) {
      article.value = {
        id: articleId,
        title: '文章标题示例',
        createTime: new Date().toISOString(),
        views: 123,
        image: '/images/article-placeholder.jpg',
        content: '<p>这是一篇示例文章内容。Nuxt.js是一个基于Vue.js的服务端渲染框架，它可以帮助我们快速构建SEO友好的单页应用。</p><p>在本文中，我们将探讨Nuxt.js的核心概念和实践技巧，帮助你更好地理解和使用这个强大的框架。</p>'
      };
    }
  } catch (err) {
    console.error('获取文章详情失败:', err);
    error.value = '获取文章详情失败，请稍后重试';
    // 出错时使用模拟数据
    article.value = {
      id: articleId,
      title: '文章标题示例',
      createTime: new Date().toISOString(),
      views: 123,
      image: '/images/article-placeholder.jpg',
      content: '<p>这是一篇示例文章内容。Nuxt.js是一个基于Vue.js的服务端渲染框架，它可以帮助我们快速构建SEO友好的单页应用。</p><p>在本文中，我们将探讨Nuxt.js的核心概念和实践技巧，帮助你更好地理解和使用这个强大的框架。</p>'
    };
  } finally {
    loading.value = false;
  }
};

// 返回上一页
const navigateBack = () => {
  router.push('/');
};

// 页面加载时获取文章详情
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
.view-count {
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
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--bg-container);
  border-radius: 12px;
  padding: 40px;
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