<template>
  <div class="article-detail-page">
    <Navbar />
    
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
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ArrowLeft } from '@element-plus/icons-vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { getArticleDetail } from '@/api/articles';

const router = useRouter();
const route = useRoute();
const articleId = String(route.params.id);

const article = ref(null);
const loading = ref(true);
const error = ref(null);

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
    // 根据文章ID提供不同的模拟内容
    const mockArticles = {
      '1': {
        id: '1',
        title: 'Vue 3新特性解读',
        createTime: '2024-07-10',
        views: 1253,
        image: '/images/article1-placeholder.jpg',
        content: '<p>Vue 3带来了许多激动人心的新特性，其中最引人注目的是组合式API。这种新的API设计允许开发者更好地组织组件逻辑，提高代码复用性。</p><p>在本文中，我们将深入探讨Vue 3组合式API的优势，对比选项式API的性能提升与开发体验优化。通过实际案例，我们将展示如何利用这些新特性构建更强大、更易维护的Vue应用。</p><p>Vue 3还引入了更好的TypeScript支持、更小的打包体积和更快的渲染性能，使其成为构建现代Web应用的理想选择。</p>'
      },
      '2': {
        id: '2',
        title: '前端性能优化指南',
        createTime: '2024-07-09',
        views: 987,
        image: '/images/article2-placeholder.jpg',
        content: '<p>前端性能优化是构建用户友好应用的关键。本文将介绍从资源加载（懒加载/预加载）到渲染优化（虚拟列表/防抖节流）的全流程实践方案。</p><p>我们将探讨如何优化JavaScript执行效率、减少页面重排重绘、利用缓存策略和实现高效的数据获取。这些技术将帮助你显著提升应用的加载速度和交互体验。</p><p>通过具体的代码示例和性能测试结果，我们将展示如何识别性能瓶颈并实施有效的优化措施。</p>'
      },
      '3': {
        id: '3',
        title: 'Nuxt 3实战经验分享',
        createTime: '2024-07-05',
        views: 764,
        image: '/images/article3-placeholder.jpg',
        content: '<p>Nuxt 3是基于Vue 3的新一代全栈框架，它提供了优秀的服务端渲染和静态站点生成能力。本文将分享使用Nuxt 3构建SEO友好的企业级应用的实战经验。</p><p>我们将涵盖Nuxt 3的核心概念，包括文件系统路由、组合式API集成、状态管理、API集成等关键点。同时，我们还将分享一些最佳实践，如代码分割、性能优化和错误处理策略。</p><p>通过实际项目案例，我们将展示如何利用Nuxt 3的强大功能构建高性能、易维护的Web应用。</p>'
      }
    };
    // 使用对应ID的模拟文章或默认文章
    article.value = mockArticles[articleId] || {
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