<template>
  <div class="home-container">
    <Navbar />
    <Banner :banners="banners" />
    
    <!-- 核心服务模块 -->
    <section class="services-section py-20 bg-white">
      <div class="container">
        <!-- 区块标题 -->
        <div class="section-header text-center mb-16 max-w-3xl mx-auto">
          <span class="section-tag text-primary font-medium">核心服务</span>
          <h2 class="section-title text-3xl md:text-4xl font-bold mt-2 mb-4">专业解决方案</h2>
          <p class="section-subtitle text-gray-600">我们提供全方位的技术服务，助力企业数字化转型</p>
        </div>
        
        <!-- 服务卡片网格 -->
        <div class="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="service in services" 
            :key="service.id" 
            class="service-card bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div class="service-icon bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <el-icon :size="32">
                <component :is="service.icon" />
              </el-icon>
            </div>
            <h3 class="service-title text-xl font-semibold mb-3 text-center">{{ service.title }}</h3>
            <p class="service-desc text-gray-600 mb-6 text-center">
              {{ service.desc || '为客户提供专业的技术解决方案，助力业务增长和数字化转型。' }}
            </p>
            <div class="service-arrow w-full flex justify-center">
              <a href="#" class="inline-flex items-center text-primary group-hover:translate-x-2 transition-transform duration-300">
                了解更多 <el-icon class="ml-2"><ArrowRight /></el-icon>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 背景装饰 -->
      <div class="services-decoration pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-32 -left-32 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
    </section>

    <!-- 客户案例模块 -->
    <section class="cases-section py-24 bg-gray-50">
      <div class="container">
        <!-- 区块标题 -->
        <div class="section-header text-center mb-16 max-w-3xl mx-auto">
          <span class="section-tag text-primary font-medium">客户案例</span>
          <h2 class="section-title text-3xl md:text-4xl font-bold mt-2 mb-4">成功合作案例</h2>
          <p class="section-subtitle text-gray-600">我们与众多行业领先企业建立了长期合作关系</p>
        </div>
        
        <!-- 案例轮播 -->
        <el-carousel 
          indicator-position="outside" 
          :interval="5000"
          class="cases-carousel"
          arrow="hover"
        >
          <el-carousel-item v-for="caseItem in cases" :key="caseItem.id">
            <div class="case-card bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
              <div class="case-image-container mb-6 flex justify-center">
                <img 
                  :src="caseItem.image || '/images/placeholder.jpg'" 
                  alt="客户案例"
                  class="case-image max-h-64 object-contain transition-transform duration-700 hover:scale-105"
                >
              </div>
              <p class="case-desc text-gray-600 text-center text-lg italic">
                {{ caseItem.description || '我们的解决方案帮助客户实现了业务增长和效率提升。' }}
              </p>
              <div class="case-cta mt-8 text-center">
                <el-button type="primary" class="rounded-full bg-primary hover:bg-primary-dark">
                  查看详情 <el-icon class="ml-2"><ArrowRight /></el-icon>
                </el-button>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
        
        <!-- 客户logo展示 -->
        <div class="clients-logos mt-20 py-8 border-t border-gray-200">
          <h3 class="text-center text-lg font-medium text-gray-500 mb-8">值得信赖的合作伙伴</h3>
          <div class="logos-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            <div class="client-logo flex justify-center opacity-60 hover:opacity-100 transition-opacity">
              <el-icon class="text-4xl text-gray-400"><Company /></el-icon>
            </div>
            <div class="client-logo flex justify-center opacity-60 hover:opacity-100 transition-opacity">
              <el-icon class="text-4xl text-gray-400"><Company /></el-icon>
            </div>
            <div class="client-logo flex justify-center opacity-60 hover:opacity-100 transition-opacity">
              <el-icon class="text-4xl text-gray-400"><Company /></el-icon>
            </div>
            <div class="client-logo flex justify-center opacity-60 hover:opacity-100 transition-opacity">
              <el-icon class="text-4xl text-gray-400"><Company /></el-icon>
            </div>
            <div class="client-logo flex justify-center opacity-60 hover:opacity-100 transition-opacity">
              <el-icon class="text-4xl text-gray-400"><Company /></el-icon>
            </div>
            <div class="client-logo flex justify-center opacity-60 hover:opacity-100 transition-opacity">
              <el-icon class="text-4xl text-gray-400"><Company /></el-icon>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 最新动态 -->
    <section class="latest-articles py-20 bg-white">
      <div class="container">
        <!-- 区块标题 -->
        <div class="section-header text-center mb-16 max-w-3xl mx-auto">
          <span class="section-tag text-primary font-medium">最新动态</span>
          <h2 class="section-title text-3xl md:text-4xl font-bold mt-2 mb-4">行业资讯与技术分享</h2>
          <p class="section-subtitle text-gray-600">定期发布最新行业动态、技术趋势和解决方案</p>
        </div>
        
        <!-- 文章网格 -->
        <div class="article-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <NuxtLink 
            v-for="article in latestArticles" 
            :key="article.id" 
            :to="`/articles/${article.id}`"
            class="article-card bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300"
          >
            <!-- 图片区域 -->
            <div class="article-image-container overflow-hidden">
              <img 
                :src="article.image || '/images/article-placeholder.jpg'" 
                alt="文章封面" 
                class="article-image w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
              >
            </div>
            <!-- 文字内容区域 -->
            <div class="article-info p-6">
              <div class="article-meta flex items-center text-gray-500 text-sm mb-3">
                <el-icon class="mr-1"><Calendar /></el-icon>
                <span class="date">{{ article.createTime || '2024-01-01' }}</span>
              </div>
              <h3 class="article-title font-semibold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                {{ article.title || '文章标题' }}
              </h3>
              <p class="excerpt text-gray-600 text-sm line-clamp-3">
                {{ article.excerpt || '这是一篇关于技术趋势和解决方案的文章，包含最新的行业动态和专业分析。' }}
              </p>
              <div class="article-link mt-4 flex items-center text-primary text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
                阅读全文 <el-icon class="ml-2"><ArrowRight /></el-icon>
              </div>
            </div>
          </NuxtLink>
        </div>
        
        <!-- 查看更多按钮 -->
        <div class="articles-cta text-center mt-12">
          <el-button type="primary" class="rounded-full bg-primary hover:bg-primary-dark px-8 py-3">
            查看所有文章
          </el-button>
        </div>
      </div>
    </section>

    <!-- CTA区域 -->
    <section class="cta-section py-20 relative overflow-hidden bg-gradient-to-r from-primary to-secondary">
      <!-- 背景装饰 -->
      <div class="cta-decor absolute top-0 left-0 w-full h-full opacity-10">
        <div class="decor-circle absolute top-10 left-10 w-40 h-40 rounded-full border-4 border-white"></div>
        <div class="decor-circle absolute bottom-10 right-10 w-60 h-60 rounded-full border-4 border-white"></div>
      </div>
      
      <div class="container relative z-10">
        <div class="cta-content text-center max-w-3xl mx-auto">
          <h2 class="cta-title text-3xl md:text-4xl font-bold text-white mb-6">准备好开始您的项目了吗？</h2>
          <p class="cta-subtitle text-white/90 text-lg mb-8">联系我们，了解如何利用我们的解决方案帮助您的业务增长</p>
          <div class="cta-buttons flex flex-col sm:flex-row gap-4 justify-center">
            <el-button type="primary" class="cta-btn bg-white text-primary hover:bg-gray-100 rounded-full px-8 py-3">
              立即咨询
            </el-button>
            <el-button type="default" class="cta-btn-outline border-2 border-white text-white hover:bg-white/10 rounded-full px-8 py-3">
              了解服务
            </el-button>
          </div>
        </div>
      </div>
    </section>

    <Footer />
    
    <!-- 回到顶部按钮 -->
    <div class="quick-nav fixed bottom-6 right-6 z-50">
      <el-button 
        type="primary" 
        circle 
        class="back-to-top bg-primary hover:bg-primary-dark shadow-lg p-4 transition-all duration-300"
        @click="backToTop"
        :class="{ 'opacity-100': showBackToTop, 'opacity-0': !showBackToTop, 'pointer-events': showBackToTop ? 'auto' : 'none' }"
      >
        <el-icon class="text-lg"><ArrowUp /></el-icon>
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { getBannerList } from '@/api/banner';
import { getCaseList } from '@/api/cases';
import { getServiceList } from '@/api/services';
import Footer from '@/components/Footer.vue';

const banners = ref([]);
const cases = ref([]);
const services = ref([]);
const latestArticles = ref([]);
const showBackToTop = ref(false);
const loadingBanners = ref(true);
const loadingCases = ref(true);
const loadingServices = ref(true);
const loadingArticles = ref(true);
const error = ref(null);

// 获取Banner数据
const fetchBanners = async () => {
  try {
    const data = await getBannerList();
    banners.value = Array.isArray(data) ? data : [];
    console.log('获取到banners数据:', banners.value);
  } catch (err) {
    console.error('获取Banner数据失败:', err);
    error.value = '获取Banner数据失败，请稍后重试';
  } finally {
    loadingBanners.value = false;
  }
};

// 获取客户案例数据
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
        },
        {
          id: '3',
          image: '/images/case3.png',
          description: 'ZZ金融平台利用我们的解决方案，用户转化率提升40%'
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
      },
      {
        id: '3',
        image: '/images/case3.png',
        description: 'ZZ金融平台利用我们的解决方案，用户转化率提升40%'
      }
    ];
  } finally {
    loadingCases.value = false;
  }
};

// 获取服务数据
const fetchServices = async () => {
  loadingServices.value = true;
  error.value = null;
  try {
    console.log('开始获取服务数据...');
    const res = await getServiceList();
    services.value = Array.isArray(res) ? res : (res.data || []);
    console.log('获取到的服务数据:', services.value);
    
    // 如果没有数据，使用模拟数据
    if (!services.value.length) {
      services.value = [
        {
          id: '1',
          icon: 'Management',
          title: '内容管理系统',
          desc: '专业的企业级内容管理系统，帮助企业快速构建和管理网站内容。'
        },
        {
          id: '2',
          icon: 'Monitor',
          title: '响应式网站开发',
          desc: '定制化网站开发，响应式设计，为企业打造专业的线上形象。'
        },
        {
          id: '3',
          icon: 'ShoppingCart',
          title: '电商解决方案',
          desc: '完整的电商平台构建，包括产品管理、订单处理、支付集成等功能。'
        },
        {
          id: '4',
          icon: 'Setting',
          title: '技术支持服务',
          desc: '7x24小时技术支持服务，确保系统稳定运行，及时解决各种问题。'
        },
        {
          id: '5',
          icon: 'Link',
          title: 'API集成开发',
          desc: '企业系统与第三方平台的无缝对接，实现数据互通与业务协同。'
        },
        {
          id: '6',
          icon: 'DocumentCopy',
          title: '数据分析服务',
          desc: '基于大数据技术的商业智能分析，助力企业决策与业务增长。'
        }
      ];
    }
  } catch (err) {
    console.error('获取服务数据失败:', err);
    error.value = '获取服务数据失败，请稍后重试';
    // 提供默认服务数据
    services.value = [
      {
        id: '1',
        icon: 'Management',
        title: '内容管理系统',
        desc: '专业的企业级内容管理系统，帮助企业快速构建和管理网站内容。'
      },
      {
        id: '2',
        icon: 'Monitor',
        title: '响应式网站开发',
        desc: '定制化网站开发，响应式设计，为企业打造专业的线上形象。'
      },
      {
        id: '3',
        icon: 'ShoppingCart',
        title: '电商解决方案',
        desc: '完整的电商平台构建，包括产品管理、订单处理、支付集成等功能。'
      },
      {
        id: '4',
        icon: 'Setting',
        title: '技术支持服务',
        desc: '7x24小时技术支持服务，确保系统稳定运行，及时解决各种问题。'
      },
      {
        id: '5',
        icon: 'Link',
        title: 'API集成开发',
        desc: '企业系统与第三方平台的无缝对接，实现数据互通与业务协同。'
      },
      {
        id: '6',
        icon: 'DocumentCopy',
        title: '数据分析服务',
        desc: '基于大数据技术的商业智能分析，助力企业决策与业务增长。'
      }
    ];
  } finally {
    loadingServices.value = false;
  }
};

// 获取最新文章数据
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
    console.error('获取文章数据失败:', err);
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

// 返回顶部函数
const backToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// 监听滚动事件，显示/隐藏返回顶部按钮
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300;
  
  // 添加滚动动画效果
  const elements = document.querySelectorAll('.service-card, .case-card, .article-card');
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (elementPosition < screenPosition) {
      element.classList.add('animate-in');
    }
  });
};

onMounted(() => {
  // 页面加载时获取所有数据
  fetchBanners();
  fetchCaseList();
  fetchServices();
  fetchLatestArticles();
  
  // 添加滚动事件监听
  window.addEventListener('scroll', handleScroll);
  
  // 初始动画检查
  setTimeout(() => {
    handleScroll();
  }, 300);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* 全局容器样式 */
.home-container {
  background-color: var(--bg-light);
  min-height: 100vh;
  overflow-x: hidden;
}

/* 通用区块样式 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  position: relative;
}

.section-tag {
  font-size: 0.875rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  display: inline-block;
}

.section-title {
  font-weight: 800;
  line-height: 1.2;
  color: var(--text-dark);
}

.section-subtitle {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text-muted);
}

/* 服务区块样式 */
.services-section {
  position: relative;
  overflow: hidden;
}

.services-grid {
  position: relative;
  z-index: 1;
}

.service-card {
  padding: var(--spacing-xl);
  position: relative;
  transition: all var(--transition-normal);
}

.service-card:hover {
  transform: translateY(-8px);
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--transition-normal);
}

.service-card:hover::before {
  transform: scaleX(1);
}

.service-icon {
  color: var(--primary-color);
}

.service-title {
  color: var(--text-dark);
  line-height: 1.3;
}

.service-desc {
  color: var(--text-muted);
  line-height: 1.7;
}

.services-decoration {
  z-index: 0;
}

/* 案例展示样式 */
.cases-section {
  position: relative;
}

.cases-carousel {
  max-width: 900px;
  margin: 0 auto;
}

.el-carousel__item h3,
.el-carousel__item p {
  margin: 0;
  padding: 0;
}

.el-carousel__indicator {
  background-color: rgba(0, 0, 0, 0.2) !important;
  border-radius: 50% !important;
  width: 12px !important;
  height: 12px !important;
  margin: 0 6px !important;
  transition: all 0.3s ease;
}

.el-carousel__indicator.is-active {
  background-color: var(--primary-color) !important;
  width: 24px !important;
  border-radius: 6px !important;
}

.case-card {
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all var(--transition-normal);
}

.case-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.case-image {
  max-width: 100%;
  max-height: 280px;
  object-fit: contain;
}

.case-desc {
  font-size: 1.125rem;
  line-height: 1.8;
  font-style: italic;
}

.clients-logos {
  border-top: 1px solid var(--border-light);
  margin-top: 5rem;
}

.logos-grid {
  display: grid;
  gap: var(--spacing-lg);
}

.client-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.6;
  transition: opacity var(--transition-normal);
}

.client-logo:hover {
  opacity: 1;
}

/* 文章区域样式 */
.latest-articles {
  position: relative;
}

.article-grid {
  position: relative;
}

.article-card {
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all var(--transition-normal);
  text-decoration: none;
  color: inherit;
}

.article-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
}

.article-image-container {
  overflow: hidden;
  height: 180px;
}

.article-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.article-card:hover .article-image {
  transform: scale(1.1);
}

.article-info {
  padding: var(--spacing-lg);
}

.article-title {
  line-height: 1.3;
  color: var(--text-dark);
  margin-bottom: var(--spacing-sm);
  transition: color var(--transition-fast);
}

.article-card:hover .article-title {
  color: var(--primary-color);
}

.article-meta {
  display: flex;
  align-items: center;
  color: var(--text-muted);
  font-size: 0.875rem;
  margin-bottom: var(--spacing-sm);
}

.excerpt {
  line-height: 1.7;
  color: var(--text-muted);
  font-size: 0.875rem;
}

.article-link {
  display: inline-flex;
  align-items: center;
  color: var(--primary-color);
  font-weight: 500;
  margin-top: var(--spacing-md);
  transition: transform var(--transition-fast);
}

.article-card:hover .article-link {
  transform: translateX(4px);
}

.articles-cta {
  margin-top: var(--spacing-2xl);
  text-align: center;
}

/* CTA 区域样式 */
.cta-section {
  position: relative;
  overflow: hidden;
  margin-top: 4rem;
}

.cta-content {
  position: relative;
  z-index: 1;
}

.cta-title {
  line-height: 1.2;
  color: var(--text-light);
}

.cta-subtitle {
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.9);
}

.cta-buttons {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  align-items: center;
}

.cta-btn,
.cta-btn-outline {
  font-weight: 600;
  border: none;
  border-radius: var(--radius-full);
  padding: var(--spacing-md) var(--spacing-xl);
  transition: all var(--transition-normal);
  text-decoration: none;
}

.cta-btn-outline {
  background: transparent;
  border: 2px solid white;
  color: white;
}

/* 快速导航按钮样式 */
.quick-nav {
  position: fixed;
  bottom: var(--spacing-xl);
  right: var(--spacing-xl);
  z-index: 99;
}

.back-to-top {
  position: relative;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all var(--transition-normal);
  opacity: 0;
  visibility: hidden;
}

.back-to-top.opacity-100 {
  opacity: 1;
  visibility: visible;
}

.back-to-top:hover {
  transform: translateY(-6px);
}

/* 动画效果 */
.animate-in {
  animation: fadeInUp 0.8s ease forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .article-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .services-grid,
  .article-grid {
    gap: var(--spacing-lg);
  }
  
  .article-image-container {
    height: 160px;
  }
  
  .cta-title {
    font-size: 2rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .logos-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.75rem;
  }
  
  .service-card,
  .article-info {
    padding: var(--spacing-lg);
  }
  
  .article-image-container {
    height: 140px;
  }
  
  .cta-title {
    font-size: 1.75rem;
  }
  
  .logos-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .case-image {
    max-height: 200px;
  }
}
</style>
