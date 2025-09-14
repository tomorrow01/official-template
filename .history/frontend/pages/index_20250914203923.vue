<template>
  <div class="home-container">
    <Navbar />
    <Banner :banners="banners" />
    <!-- 新增调试：显示banners长度 -->
    <!-- <div v-if="banners.length === 0" style="color: red;">轮播数据为空！</div> -->
    
    <!-- 新增：核心服务模块 -->
    <section class="services-section">
      <div class="container">
        <h2 class="section-title">核心服务</h2>
        <div class="services-grid">
          <div v-for="service in services" :key="service.id" class="service-card">
            <el-icon :size="40" class="service-icon">
              <component :is="service.icon" />
            </el-icon>
            <h3 class="service-title">{{ service.title }}</h3>
            <p class="service-desc">{{ service.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 新增：客户案例模块（修改循环变量名） -->
    <section class="cases-section">
      <div class="container">
        <h2 class="section-title">客户案例</h2>
        <el-carousel indicator-position="outside">
          <!-- 将 v-for 变量从 "case" 改为 "caseItem"（非保留字） -->
          <el-carousel-item v-for="caseItem in cases" :key="caseItem.id">
            <div class="case-card">
              <!-- 同步修改变量引用 -->
              <img :src="caseItem.image" alt="客户logo" class="case-image">
              <p class="case-desc">{{ caseItem.description }}</p>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </section>

    <!-- <template> -->
      <section class="latest-articles">
        <h2 class="section-title">最新动态</h2>
        <div class="article-grid">
          <NuxtLink 
            v-for="article in latestArticles" 
            :key="article.id" 
            :to="`/articles/${article.id}`"
            class="article-card"
          >
            <!-- 新增图片区域 -->
            <div class="article-image">
              <img :src="article.image" alt="文章封面" />
            </div>
            <!-- 文字内容区域 -->
            <div class="article-info">
              <h3>{{ article.title }}</h3>
              <p class="excerpt">{{ article.excerpt }}</p>
              <span class="date">{{ article.createTime }}</span>
            </div>
          </NuxtLink>
        </div>
      </section>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getBannerList } from '@/api/banner'; // 使用Nuxt别名@引用api目录
import { getCaseList } from '@/api/cases';
import { getServiceList } from '@/api/services'; // 引入服务数据API

const banners = ref([]);
const cases = ref([]);
const services = ref([]);
const latestArticles = ref([]);
const loadingBanners = ref(true);
const loadingCases = ref(true);
const loadingServices = ref(true);
const loadingArticles = ref(true);
const error = ref(null);

const fetchBanners = async () => {
  try {
    const data = await getBannerList();
    banners.value = data;
    console.log('获取到banners数据:',data);

  } catch (err) {
    error.value = '获取Banner数据失败，请稍后重试';
  } finally {
    loadingBanners.value = false;
  }
};
// 获取客户案例数据的函数
const fetchCaseList = async () => {
  loadingCases.value = true;
  error.value = null;
  try {
    console.log('开始获取客户案例数据...');
    const res = await getCaseList();
    
    // 正确提取数据，确保数据格式一致
    cases.value = Array.isArray(res) ? res : (res.data || []).filter(item => item && item.isActive !== false);
    console.log('获取到的客户案例数据:', cases.value);
    
    // 如果没有数据，使用模拟数据
    if (!cases.value.length) {
      cases.value = [
        {
          id: '1',
          image: '/images/case1.png',
          description: 'XX教育使用我们的内容管理系统，内容发布效率提升60%'
        },
        {
          id: '2',
          image: '/images/case2.png',
          description: 'YY电商通过轮播图运营，首页点击率增长35%'
        }
      ];
    }
  } catch (err) {
    console.error('获取客户案例数据失败:', err);
    error.value = '获取客户案例数据失败，请稍后重试';
    // 出错时使用模拟数据
    cases.value = [
      {
        id: '1',
        image: '/images/case1.png',
        description: 'XX教育使用我们的内容管理系统，内容发布效率提升60%'
      },
      {
        id: '2',
        image: '/images/case2.png',
        description: 'YY电商通过轮播图运营，首页点击率增长35%'
      }
    ];
  } finally {
    loadingCases.value = false;
  }
};


// 获取服务数据的函数
const fetchServices = async () => {
  loadingServices.value = true;
  error.value = null;
  try {
    console.log('开始获取服务数据...');
    const res = await getServiceList();
    services.value = res;
    console.log('获取到的服务数据:', res);
  } catch (err) {
    error.value = '获取服务数据失败，请稍后重试';
  } finally {
    loadingServices.value = false;
  }
};

// 获取最新文章数据的函数
const fetchLatestArticles = async () => {
  loadingArticles.value = true;
  error.value = null;
  try {
    console.log('开始获取最新文章数据...');
    // 由于没有单独的获取最新文章API，这里我们调用通用的文章API并限制返回数量
    const request = (await import('@/api/request')).getRequestInstance();
    const response = await request.get('/api/articles?limit=4');
    const articles = response.data.data || [];
    
    // 格式化文章数据以匹配前端组件期望的格式
    latestArticles.value = articles.map(article => ({
      id: article._id || article.id,
      title: article.title,
      excerpt: article.content ? article.content.substring(0, 100) + '...' : '',
      createTime: article.createTime || article.createdAt,
      image: article.image || '/images/article-placeholder.jpg'
    }));
    
    console.log('获取到的最新文章数据:', latestArticles.value);
  } catch (err) {
    error.value = '获取文章数据失败，请稍后重试';
    // 出错时使用模拟数据
    latestArticles.value = [
      {
        id: '1',
        title: 'Vue 3新特性解读',
        excerpt: '深入解析Vue 3组合式API的优势，对比选项式API的性能提升与开发体验优化...',
        createTime: '2024-07-10',
        image: '/images/article1-placeholder.jpg'
      },
      {
        id: '2',
        title: '前端性能优化指南',
        excerpt: '从资源加载（懒加载/预加载）到渲染优化（虚拟列表/防抖节流）的全流程实践方案...',
        createTime: '2024-07-09',
        image: '/images/article2-placeholder.jpg'
      },
      {
        id: '3',
        title: 'Nuxt 3 SSR实战技巧',
        excerpt: '如何利用Nuxt 3的自动路由和组合式API实现高效服务端渲染，避免常见SEO陷阱...',
        createTime: '2024-07-08',
        image: '/images/article3-placeholder.jpg'
      },
      {
        id: '4',
        title: 'AI在前端开发中的应用',
        excerpt: '探索AI工具（如GitHub Copilot、Figma AI）如何辅助代码编写、设计稿生成与测试用例创建...',
        createTime: '2024-07-07',
        image: '/images/article4-placeholder.jpg'
      }
    ];
  } finally {
    loadingArticles.value = false;
  }
};
onMounted(() => {
  // 页面加载时获取所有数据
  fetchBanners();
  fetchCaseList();
  fetchServices();
  fetchLatestArticles();
});
</script>

<style scoped>
/* 最新动态模块样式调整 */
.latest-articles {
  padding: 60px 0;
  background: var(--bg-base);
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.article-card {
  display: flex;
  gap: 20px;
  padding: 20px;
  background: var(--bg-container);
  border-radius: 8px;
  box-shadow: var(--shadow-light);
  transition: transform 0.2s;
  text-decoration: none;
}

.article-card:hover {
  transform: translateY(-4px);
}

.article-image {
  flex: 0 0 160px;
  height: 120px;
  border-radius: 6px;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.article-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.article-info h3 {
  color: var(--text-primary);
  font-size: 18px;
  margin: 0;
}

.article-info .excerpt {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
  font-size: 14px;
}

.article-info .date {
  color: var(--text-tertiary);
  font-size: 12px;
  margin-top: auto;
}

/* 新增模块样式 */
.services-section, .cases-section {
  padding: 60px 0;
  background: var(--bg-container);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.service-card {
  text-align: center;
  padding: 30px 20px;
  background: var(--bg-base);
  border-radius: 8px;
  transition: transform 0.2s;
}

.service-card:hover {
  transform: translateY(-4px);
}

.service-icon {
  color: var(--primary-color);
  margin-bottom: 16px;
}

.service-title {
  font-size: 18px;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.service-desc {
  color: var(--text-secondary);
  line-height: 1.6;
}

.cases-section {
  background: var(--bg-base);
}

.case-card {
  margin: 0 auto;
  padding: 40px;
  background: var(--bg-container);
  border-radius: 8px;
  box-shadow: var(--shadow-light);
  text-align: center;
}

.case-image {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
  object-position: center;
  border-radius: 8px;
  margin-bottom: 20px;
}

.case-desc {
  color: var(--text-secondary);
  line-height: 1.8;
}

.home-container {
  background: linear-gradient(135deg, #0A192F 0%, #1F163A 100%);
  background-size: cover;
  background-attachment: fixed;
  min-height: 100vh;
  padding-bottom: 10px;
  animation: gradient 15s ease infinite;
}
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.quick-nav {
  position: fixed;
  right: 20px;
  bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 1000;
}

.quick-btn {
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 8px;
  background: var(--primary-color);  /* 使用主题色 */
  color: white;
  cursor: pointer;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quick-btn:hover {
  opacity: 0.8;
}

.quick-icon {
  font-size: 24px;
}
</style>
