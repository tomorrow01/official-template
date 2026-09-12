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
            <img :src="useImageUrl(article.image)" alt="文章封面" />
          </div>
          <div class="article-info">
            <h3>{{ article.title }}</h3>
            <p v-if="article.subtitle" class="subtitle">{{ article.subtitle }}</p>
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
import { useImageUrl } from '@/composables/useImageUrl';

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
    // getArticleList 已返回数组，且已把 _id 归一化为 id
    const list = await getArticleList({ page: currentPage.value, limit: pageSize.value });
    total.value = list.length;
    
    articles.value = list.map(article => ({
      ...article,
      id: article.id || article._id,
      // 优先用 intro，没有就从 content 里剥离 HTML 标签取纯文本
      excerpt: article.intro || stripHtml(article.content).slice(0, 150) || '暂无简介',
      image: article.image || `https://picsum.photos/seed/${article.title || article._id}/600/400`,
    }));
  } catch (err) {
    console.error('获取文章列表失败:', err);
    error.value = '获取文章列表失败，请稍后重试';
  } finally {
    loading.value = false;
  }
};

// 把 HTML 标签去掉，取纯文本
const stripHtml = (html) => {
  if (!html) return ''
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
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

/* 列表页文章卡片 — flex 布局，meta 贴底，图片截断不溢出 */
.article-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;           /* 双层截断图片 scale 放大 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

/* 图片容器 — overflow:hidden 截断 scale(1.1) */
.article-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  flex-shrink: 0;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.7s ease;
}

.article-card:hover .article-image img {
  transform: scale(1.1);
}

/* 内容区 — flex:1 + flex-col，meta 用 margin-top:auto 贴底 */
.article-info {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.article-info h3 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 6px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-card:hover h3 {
  color: #1677ff;
}

.subtitle {
  font-size: 13px;
  color: #999;
  margin: 0 0 10px 0;
}

/* 简介 — 固定 2 行 + min-height 保证占位 */
.excerpt {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 44px;
  margin-bottom: 16px;
}

/* meta 区 — margin-top:auto 推到底部，所有卡片对齐 */
.article-meta {
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #999;
}

/* 相关：列表页文章卡片也给首页用（但首页已有独立类名，不冲突） */

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