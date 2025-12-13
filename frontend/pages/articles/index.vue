<template>
  <div class="articles-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="container">
        <h1>最新动态</h1>
        <p>了解我们的最新消息、技术分享和行业洞察</p>
      </div>
    </div>
    
    <!-- 文章列表 -->
    <div class="container">
      <div v-if="loading" class="loading-container">
        <el-loading v-loading="loading" element-loading-text="正在加载文章列表..." />
      </div>
      
      <div v-else-if="error" class="error-message">
        <el-alert :message="error" type="error" show-icon />
      </div>
      
      <div v-else-if="articles.length === 0" class="empty-message">
        <el-empty description="暂无文章" />
      </div>
      
      <div v-else class="articles-grid">
        <NuxtLink 
          v-for="article in articles" 
          :key="article.id" 
          :to="`/articles/${article.id}`"
          class="article-card"
        >
          <div class="article-image">
            <img :src="article.image" alt="文章封面" />
          </div>
          <div class="article-info">
            <h3>{{ article.title }}</h3>
            <p class="excerpt">{{ article.excerpt }}</p>
            <div class="article-meta">
              <span class="date">{{ formatDate(article.createTime) }}</span>
              <span class="view-count">浏览次数：{{ article.views || 0 }}</span>
            </div>
          </div>
        </NuxtLink>
      </div>
      
      <!-- 分页 -->
      <div v-if="total > 0" class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[8, 12, 24]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { getArticleList } from '@/api/articles';

const articles = ref([]);
const loading = ref(true);
const error = ref(null);
const currentPage = ref(1);
const pageSize = ref(8);
const total = ref(0);

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

// 获取文章列表
const fetchArticles = async () => {
  loading.value = true;
  error.value = null;
  try {
    console.log(`开始获取第${currentPage.value}页的文章列表...`);
    const res = await getArticleList({ page: currentPage.value, limit: pageSize.value });
    
    // 正确提取数据 - res已经是文章数组
    articles.value = Array.isArray(res) ? res : [];
    total.value = articles.value.length;
    
    // 格式化文章数据
    articles.value = articles.value.map(article => ({
      id: article._id || article.id,
      title: article.title,
      excerpt: article.content ? article.content.substring(0, 150) + '...' : '',
      createTime: article.createTime || article.createdAt,
      views: article.views || 0,
      image: article.image || '/images/article-placeholder.jpg'
    }));
    
    console.log('获取到的文章列表数据:', articles.value);
  } catch (err) {
    console.error('获取文章列表失败:', err);
    error.value = '获取文章列表失败，请稍后重试';
    
    // 出错时使用模拟数据
    articles.value = [
      {
        id: '1',
        title: 'Vue 3新特性解读',
        excerpt: '深入解析Vue 3组合式API的优势，对比选项式API的性能提升与开发体验优化...',
        createTime: '2024-07-10',
        views: 1253,
        image: '/images/article1-placeholder.jpg'
      },
      {
        id: '2',
        title: '前端性能优化指南',
        excerpt: '从资源加载（懒加载/预加载）到渲染优化（虚拟列表/防抖节流）的全流程实践方案...',
        createTime: '2024-07-09',
        views: 987,
        image: '/images/article2-placeholder.jpg'
      },
      {
        id: '3',
        title: 'Nuxt 3实战经验分享',
        excerpt: '使用Nuxt 3构建SEO友好的企业级应用，包含路由、状态管理、API集成等关键点...',
        createTime: '2024-07-05',
        views: 764,
        image: '/images/article3-placeholder.jpg'
      },
      {
        id: '4',
        title: 'Element Plus组件库使用技巧',
        excerpt: '如何灵活运用Element Plus组件库构建美观、响应式的企业级界面，包含自定义主题...',
        createTime: '2024-07-01',
        views: 892,
        image: '/images/article4-placeholder.jpg'
      }
    ];
    total.value = articles.value.length;
  } finally {
    loading.value = false;
  }
};

// 处理分页大小变化
const handleSizeChange = (size) => {
  pageSize.value = size;
  fetchArticles();
};

// 处理当前页变化
const handleCurrentChange = (current) => {
  currentPage.value = current;
  fetchArticles();
};

// 页面加载时获取文章列表
onMounted(() => {
  fetchArticles();
});
</script>

<style scoped>
.articles-page {
  min-height: 100vh;
  background-color: #f9f9f9;
}

/* 页面标题 Banner */
.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.page-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://picsum.photos/seed/articlebanner/1920/1080');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0.2;
  z-index: 1;
}

.page-header .container {
  position: relative;
  z-index: 2;
}

.page-header h1 {
  font-size: 2.8rem;
  margin-bottom: 15px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.page-header p {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
}

.loading-container,
.error-message,
.empty-message {
  padding: 60px 0;
  text-align: center;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin: 40px 0;
}

.article-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.article-image {
  height: 200px;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.article-card:hover .article-image img {
  transform: scale(1.05);
}

.article-info {
  padding: 20px;
}

.article-info h3 {
  font-size: 20px;
  margin-bottom: 12px;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.excerpt {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #999;
}

.pagination-container {
  text-align: center;
  padding: 20px 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-header {
    padding: 60px 0;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .page-header p {
    font-size: 1rem;
    padding: 0 20px;
  }
  
  .articles-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .article-image {
    height: 180px;
  }
}
</style>