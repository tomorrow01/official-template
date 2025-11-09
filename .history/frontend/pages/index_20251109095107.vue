<template>
  <div class="home-container" style="margin-top: 0; padding-top: 0; position: relative;">
    <Navbar />
    
    <!-- 英雄区域 -->
    <section class="hero-section relative overflow-hidden" style="margin-top: -1px; padding-top: 0; top: 0; z-index: 0;">
      <div class="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/id/1071/1920/1080" 
          alt="技术创新背景" 
          class="w-full h-full object-cover"
        >
        <div class="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
      </div>
      <div class="container relative z-10 py-20 md:py-28">
        <div class="max-w-3xl">
          <h1 class="text-[clamp(2.5rem,5vw,4rem)] font-bold text-white leading-tight mb-6">
            创新技术<br>
            <span class="text-primary">引领数字化未来</span>
          </h1>
          <p class="text-[clamp(1rem,2vw,1.25rem)] text-white/90 mb-8 max-w-2xl">
            我们提供全方位的技术服务和解决方案，助力企业实现数字化转型，提升核心竞争力。
          </p>
          <div class="flex flex-wrap gap-4">
            <el-button type="primary" class="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full text-lg">
              了解我们的服务
            </el-button>
            <el-button type="default" class="bg-white/10 hover:bg-white/20 text-white border-white/30 px-8 py-3 rounded-full text-lg">
              查看成功案例
            </el-button>
          </div>
        </div>
      </div>
      <!-- 波浪装饰 -->
      <div class="absolute bottom-0 left-0 w-full overflow-hidden z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" class="w-full h-auto">
          <path fill="#ffffff" fill-opacity="1" d="M0,64L48,53.3C96,43,192,21,288,21.3C384,21,480,43,576,53.3C672,64,768,64,864,53.3C960,43,1056,21,1152,21.3C1248,21,1344,43,1392,53.3L1440,64L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"></path>
        </svg>
      </div>
    </section>

    <!-- 我们的优势 -->
    <section class="features-section py-6 bg-white" style="margin-bottom: 0;">
      <div class="container">
        <div class="section-header text-center mb-6 max-w-3xl mx-auto">
          <span class="section-tag text-primary font-medium">我们的优势</span>
          <h2 class="section-title text-3xl md:text-4xl font-bold mt-2 mb-4">为什么选择我们</h2>
          <p class="section-subtitle text-gray-600">多年行业经验，专业技术团队，为您提供定制化解决方案</p>
        </div>
        
        <div class="features-grid grid grid-cols-1 md:grid-cols-3 gap-10">
          <div class="feature-card group">
            <div class="feature-icon bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <el-icon :size="32"><CheckCircle /></el-icon>
            </div>
            <h3 class="feature-title text-xl font-semibold mb-3">专业团队</h3>
            <p class="feature-desc text-gray-600">
              拥有多年行业经验的专业技术团队，精通各类技术栈，为您提供高质量的解决方案。
            </p>
          </div>
          
          <div class="feature-card group">
            <div class="feature-icon bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <el-icon :size="32"><Customize /></el-icon>
            </div>
            <h3 class="feature-title text-xl font-semibold mb-3">定制服务</h3>
            <p class="feature-desc text-gray-600">
              根据企业实际需求，提供个性化定制服务，确保解决方案完美契合业务发展。
            </p>
          </div>
          
          <div class="feature-card group">
            <div class="feature-icon bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <el-icon :size="32"><Timer /></el-icon>
            </div>
            <h3 class="feature-title text-xl font-semibold mb-3">高效执行</h3>
            <p class="feature-desc text-gray-600">
              严格的项目管理流程，确保项目按时交付，为客户创造最大价值。
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 核心服务模块 -->
    <section class="services-section py-12 bg-gray-50" style="margin-top: 0; margin-bottom: 0;">
      <div class="container">
        <!-- 区块标题 -->
        <div class="section-header text-center mb-12 max-w-3xl mx-auto">
          <span class="section-tag text-primary font-medium">核心服务</span>
          <h2 class="section-title text-3xl md:text-4xl font-bold mt-2 mb-4">专业解决方案</h2>
          <p class="section-subtitle text-gray-600">我们提供全方位的技术服务，助力企业数字化转型</p>
        </div>
        
        <!-- 服务卡片网格 - 响应式布局：强制3列 -->
        <div class="grid grid-cols-3 gap-8 w-full">
          <!-- 每个服务项是一个独立卡片 -->
          <a 
            v-for="(service, index) in services" 
            :key="service.id" 
            href="/services" 
            class="flex flex-col bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
            <!-- 卡片内部：图片在上 -->
            <div class="h-52 overflow-hidden">
              <img :src="getServiceImage(index)" alt="服务图片" class="w-full h-full object-cover transition-transform duration-700 hover:scale-110">
            </div>
            
            <!-- 卡片内部：标题和详情在下 -->
            <div class="p-6">
              <!-- 标题 -->
              <h3 class="text-xl font-semibold mb-3">{{ service.title }}</h3>
              
              <!-- 详情 -->
              <p class="text-gray-600 mb-4 leading-relaxed">{{ service.desc || '为客户提供专业的技术解决方案，助力业务增长和数字化转型。' }}</p>
              
              <!-- 跳转到详情页面的链接 -->
              <div class="flex items-center text-primary font-medium">
                查看详情 <el-icon class="ml-2"><ArrowRight /></el-icon>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- 客户案例模块 -->
    <section class="cases-section py-8 bg-white">
      <div class="container">
        <!-- 区块标题 -->
        <div class="section-header text-center mb-10 max-w-3xl mx-auto">
          <span class="section-tag text-primary font-medium">客户案例</span>
          <h2 class="section-title text-3xl md:text-4xl font-bold mt-2 mb-4">成功合作案例</h2>
          <p class="section-subtitle text-gray-600">我们与众多行业领先企业建立了长期合作关系</p>
        </div>
        
        <!-- 案例展示 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(caseItem, index) in cases" 
            :key="caseItem.id" 
            class="case-card bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl group"
            :style="{animationDelay: `${index * 100}ms`}"
          >
            <div class="case-image-container h-56 overflow-hidden">
              <img 
                :src="caseItem.image || getCaseImage(index)" 
                alt="客户案例"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              >
            </div>
            <div class="p-6">
              <h3 class="case-title text-xl font-semibold mb-3">
                {{ getCaseTitle(index) }}
              </h3>
              <p class="case-desc text-gray-600 mb-6">
                {{ caseItem.description || '我们的解决方案帮助客户实现了业务增长和效率提升。' }}
              </p>
              <div class="case-cta flex justify-between items-center">
                <el-button type="primary" class="rounded-full bg-primary hover:bg-primary-dark">
                  查看详情 <el-icon class="ml-2"><ArrowRight /></el-icon>
                </el-button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 客户logo展示 -->
        <div class="clients-logos mt-10 py-6 border-t border-gray-200">
          <h3 class="text-center text-lg font-medium text-gray-500 mb-4">值得信赖的合作伙伴</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
            <div v-for="i in 6" :key="i" style="width: 200px;">
              <img 
                :src="`https://picsum.photos/seed/logo${i}/200/80`" 
                alt="合作伙伴" 
                class="max-h-12 grayscale hover:grayscale-0 transition-all w-auto opacity-60 hover:opacity-100"
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 数据统计 -->
    <section class="stats-section py-16 bg-gradient-to-r from-primary to-secondary text-white">
      <div class="container">
        <div style="display: flex; flex-wrap: wrap; gap: 2rem; justify-content: center;">
          <div style="flex: 0 0 auto; width: 220px; text-align: center;">
            <div style="font-size: 3.5rem; font-weight: bold; margin-bottom: 0.5rem;">100+</div>
            <div style="font-size: 1.25rem; opacity: 0.8;">成功案例</div>
          </div>
          <div style="flex: 0 0 auto; width: 220px; text-align: center;">
            <div style="font-size: 3.5rem; font-weight: bold; margin-bottom: 0.5rem;">50+</div>
            <div style="font-size: 1.25rem; opacity: 0.8;">企业客户</div>
          </div>
          <div style="flex: 0 0 auto; width: 220px; text-align: center;">
            <div style="font-size: 3.5rem; font-weight: bold; margin-bottom: 0.5rem;">150+</div>
            <div style="font-size: 1.25rem; opacity: 0.8;">项目完成</div>
          </div>
          <div style="flex: 0 0 auto; width: 220px; text-align: center;">
            <div style="font-size: 3.5rem; font-weight: bold; margin-bottom: 0.5rem;">98%</div>
            <div style="font-size: 1.25rem; opacity: 0.8;">客户满意度</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 最新动态 -->
    <section class="latest-articles py-8 bg-gray-50">
      <div class="container">
        <!-- 区块标题 -->
        <div class="section-header text-center mb-10 max-w-3xl mx-auto">
          <span class="section-tag text-primary font-medium">最新动态</span>
          <h2 class="section-title text-3xl md:text-4xl font-bold mt-2 mb-4">行业资讯与技术分享</h2>
          <p class="section-subtitle text-gray-600">定期发布最新行业动态、技术趋势和解决方案</p>
        </div>
        
        <!-- 文章网格 -->
        <div class="article-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink 
            v-for="(article, index) in latestArticles" 
            :key="article.id" 
            :to="`/articles/${article.id}`"
            class="article-card bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            :style="{animationDelay: `${index * 100}ms`}"
          >
            <!-- 图片区域 -->
            <div class="article-image-container overflow-hidden h-52">
              <img 
                :src="article.image || `https://picsum.photos/seed/article${index}/600/400`" 
                alt="文章封面" 
                class="article-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
        <div class="articles-cta text-center mt-8">
          <el-button type="primary" class="rounded-full bg-primary hover:bg-primary-dark px-8 py-3">
            查看所有文章
          </el-button>
        </div>
      </div>
    </section>

    <!-- 团队展示 -->
    <section class="team-section py-6 bg-white" style="margin-top: 0; margin-bottom: 0;">
      <div class="container">
        <div class="section-header text-center mb-10 max-w-3xl mx-auto">
          <span class="section-tag text-primary font-medium">核心团队</span>
          <h2 class="section-title text-3xl md:text-4xl font-bold mt-2 mb-4">专业的技术团队</h2>
          <p class="section-subtitle text-gray-600">汇聚行业精英，为您提供最专业的技术支持</p>
        </div>
        
        <div class="team-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
          <div 
            v-for="i in 3" 
            :key="i" 
            class="team-member group"
            :style="{animationDelay: `${i * 100}ms`}"
          >
            <div class="team-image-container overflow-hidden rounded-xl mb-4">
              <img 
                :src="`https://picsum.photos/seed/member${i}/400/400`" 
                alt="团队成员" 
                class="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110"
              >
            </div>
            <h3 class="team-name text-lg font-semibold text-center">{{ getTeamMemberName(i) }}</h3>
            <p class="team-position text-gray-500 text-center mb-3">{{ getTeamMemberPosition(i) }}</p>
            <div class="team-social flex justify-center space-x-3">
              <a href="#" class="text-gray-400 hover:text-primary transition-colors"><el-icon><Link /></el-icon></a>
              <a href="#" class="text-gray-400 hover:text-primary transition-colors"><el-icon><ChatLineRound /></el-icon></a>
              <a href="#" class="text-gray-400 hover:text-primary transition-colors"><el-icon><Share /></el-icon></a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA区域 -->
    <section class="cta-section py-10 relative overflow-hidden bg-gradient-to-r from-primary to-secondary">
      <!-- 背景装饰 -->
      <div class="cta-decor absolute top-0 left-0 w-full h-full opacity-10">
        <div class="decor-circle absolute top-10 left-10 w-40 h-40 rounded-full border-4 border-white"></div>
        <div class="decor-circle absolute bottom-10 right-10 w-60 h-60 rounded-full border-4 border-white"></div>
        <div class="decor-circle absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-2 border-white/30"></div>
      </div>
      
      <div class="container relative z-10">
        <div class="cta-content text-center max-w-3xl mx-auto">
          <h2 class="cta-title text-3xl md:text-4xl font-bold text-white mb-6">准备好开始您的项目了吗？</h2>
          <p class="cta-subtitle text-white/90 text-lg mb-10">联系我们，了解如何利用我们的解决方案帮助您的业务增长</p>
          <div class="cta-buttons flex flex-col sm:flex-row gap-4 justify-center">
            <el-button type="primary" class="cta-btn bg-white text-primary hover:bg-gray-100 rounded-full px-10 py-3 text-lg">
              立即咨询
            </el-button>
            <el-button type="default" class="cta-btn-outline border-2 border-white text-white hover:bg-white/10 rounded-full px-10 py-3 text-lg">
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
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { getBannerList } from '@/api/banner';
import { getCaseList } from '@/api/cases';
import { getServiceList } from '@/api/services';

const services = ref([]);
const cases = ref([]);
const latestArticles = ref([]);
const showBackToTop = ref(false);
const loadingCases = ref(true);
const loadingServices = ref(true);
const loadingArticles = ref(true);
const error = ref(null);

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
          title: '软件开发',
          desc: '为客户提供定制化的软件开发服务，包括Web应用、移动应用和企业级解决方案。'
        },
        {
          id: '2',
          icon: 'Monitor',
          title: '数字化转型',
          desc: '帮助企业实现数字化转型，优化业务流程，提升运营效率。'
        },
        {
          id: '3',
          icon: 'Cloud',
          title: '云服务',
          desc: '提供云计算解决方案，包括云迁移、云托管和云安全服务。'
        },
        {
          id: '4',
          icon: 'StarFilled',
          title: '人工智能',
          desc: '利用人工智能技术为企业提供智能决策支持和自动化解决方案。'
        },
        {
          id: '5',
          icon: 'Histogram',
          title: '大数据分析',
          desc: '通过大数据分析帮助企业挖掘数据价值，优化业务决策。'
        },
        {
          id: '6',
          icon: 'Briefcase',
          title: 'IT咨询',
          desc: '提供专业的IT战略咨询服务，帮助企业制定技术发展规划。'
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
        title: '软件开发',
        desc: '为客户提供定制化的软件开发服务，包括Web应用、移动应用和企业级解决方案。'
      },
      {
        id: '2',
        icon: 'Monitor',
        title: '数字化转型',
        desc: '帮助企业实现数字化转型，优化业务流程，提升运营效率。'
      },
      {
        id: '3',
        icon: 'Cloud',
        title: '云服务',
        desc: '提供云计算解决方案，包括云迁移、云托管和云安全服务。'
      },
      {
        id: '4',
        icon: 'StarFilled',
        title: '人工智能',
        desc: '利用人工智能技术为企业提供智能决策支持和自动化解决方案。'
      },
      {
        id: '5',
        icon: 'Histogram',
        title: '大数据分析',
        desc: '通过大数据分析帮助企业挖掘数据价值，优化业务决策。'
      },
      {
        id: '6',
        icon: 'Briefcase',
        title: 'IT咨询',
        desc: '提供专业的IT战略咨询服务，帮助企业制定技术发展规划。'
      }
    ];
  } finally {
    loadingServices.value = false;
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
          description: '通过实施智能制造解决方案，帮助企业提升生产效率30%，降低运营成本25%。'
        },
        {
          id: '2',
          description: '为金融机构打造安全可靠的交易平台，支持日均交易量超过10万笔。'
        },
        {
          id: '3',
          description: '对现有电商系统进行全面升级，提升用户体验和系统性能，销售额增长45%。'
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
        description: '通过实施智能制造解决方案，帮助企业提升生产效率30%，降低运营成本25%。'
      },
      {
        id: '2',
        description: '为金融机构打造安全可靠的交易平台，支持日均交易量超过10万笔。'
      },
      {
        id: '3',
        description: '对现有电商系统进行全面升级，提升用户体验和系统性能，销售额增长45%。'
      }
    ];
  } finally {
    loadingCases.value = false;
  }
};

// 获取最新文章数据
const fetchLatestArticles = async () => {
  loadingArticles.value = true;
  error.value = null;
  try {
    console.log('开始获取最新文章数据...');
    // 由于没有单独的获取最新文章API，这里我们调用通用的文章API并限制返回数量
    try {
      const request = (await import('@/api/request')).getRequestInstance();
      const response = await request.get('/api/articles?limit=3');
      const articles = response.data.data || [];
      
      // 格式化文章数据以匹配前端组件期望的格式
      latestArticles.value = articles.map(article => ({
        id: article._id || article.id,
        title: article.title,
        excerpt: article.content ? article.content.substring(0, 100) + '...' : '',
        createTime: article.createTime || article.createdAt,
        image: ''
      }));
    } catch (apiError) {
      console.warn('API调用失败，使用模拟数据');
      // 使用模拟数据
      latestArticles.value = [
        {
          id: '1',
          title: '2024年企业数字化转型趋势分析',
          excerpt: '随着技术的快速发展，企业数字化转型已成为必然趋势。本文深入分析了2024年数字化转型的主要方向和策略。',
          createTime: '2024-03-15',
          image: ''
        },
        {
          id: '2',
          title: '人工智能在企业决策中的应用',
          excerpt: '人工智能技术正在改变企业的决策方式，从数据中提取有价值的洞察，帮助企业做出更明智的决策。',
          createTime: '2024-03-10',
          image: ''
        },
        {
          id: '3',
          title: '云计算如何提升企业IT效率',
          excerpt: '云计算技术为企业带来了灵活性和可扩展性，本文介绍了如何利用云服务优化IT基础设施。',
          createTime: '2024-03-05',
          image: ''
        }
      ];
    }
    
    console.log('获取到的最新文章数据:', latestArticles.value);
  } catch (err) {
    console.error('获取文章数据失败:', err);
    error.value = '获取文章数据失败，请稍后重试';
    // 出错时使用模拟数据
    latestArticles.value = [
      {
        id: '1',
        title: '2024年企业数字化转型趋势分析',
        excerpt: '随着技术的快速发展，企业数字化转型已成为必然趋势。本文深入分析了2024年数字化转型的主要方向和策略。',
        createTime: '2024-03-15',
        image: ''
      },
      {
        id: '2',
        title: '人工智能在企业决策中的应用',
        excerpt: '人工智能技术正在改变企业的决策方式，从数据中提取有价值的洞察，帮助企业做出更明智的决策。',
        createTime: '2024-03-10',
        image: ''
      },
      {
        id: '3',
        title: '云计算如何提升企业IT效率',
        excerpt: '云计算技术为企业带来了灵活性和可扩展性，本文介绍了如何利用云服务优化IT基础设施。',
        createTime: '2024-03-05',
        image: ''
      }
    ];
  } finally {
    loadingArticles.value = false;
  }
};

// 获取服务图片
const getServiceImage = (index) => {
  const imageIds = [180, 239, 24, 119, 96, 101];
  return `https://picsum.photos/id/${imageIds[index % imageIds.length]}/600/400`;
};

// 获取案例图片
const getCaseImage = (index) => {
  const imageIds = [239, 24, 119];
  return `https://picsum.photos/id/${imageIds[index % imageIds.length]}/800/600`;
};

// 获取案例标题
const getCaseTitle = (index) => {
  const titles = [
    '某大型制造企业数字化转型项目',
    '金融科技平台开发项目',
    '电商系统升级改造项目'
  ];
  return titles[index % titles.length];
};

// 获取团队成员姓名
const getTeamMemberName = (index) => {
  const names = ['张明', '李华', '王芳', '赵强'];
  return names[index - 1];
};

// 获取团队成员职位
const getTeamMemberPosition = (index) => {
  const positions = ['技术总监', '产品经理', 'UI设计师', '前端工程师'];
  return positions[index - 1];
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
  const elements = document.querySelectorAll('.service-card, .case-card, .article-card, .team-member');
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (elementPosition < screenPosition) {
      element.classList.add('fade-in-up');
    }
  });
};

onMounted(() => {
  // 页面加载时获取所有数据
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
  font-size: 2.75rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--text-dark);
  position: relative;
  display: inline-block;
  text-align: center;
  width: 100%;
  margin-bottom: calc(var(--spacing-md) + 12px);
}

.section-title::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -12px;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  border-radius: 2px;
  transform: translateX(-50%);
}

.section-subtitle {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text-muted);
}

/* 模块分隔样式 */
.features-section,
.services-section,
.cases-section,
.latest-articles,
.team-section {
  padding: 6rem 0;
  position: relative;
}

.services-section,
.cases-section,
.latest-articles,
.team-section {
  border-top: 1px solid var(--border-light);
}

/* 优化英雄区域 */
.hero-section {
  padding: 8rem 0;
}

/* 数据统计区域优化 */
.stats-section {
  padding: 4rem 0;
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

/* 团队网格样式 */
.team-grid {
  display: grid !important;
  grid-template-columns: repeat(3, 1fr) !important;
  gap: 2rem !important;
  width: 100% !important;
}

/* 响应式团队网格 */
@media (max-width: 768px) {
  .team-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 480px) {
  .team-grid {
    grid-template-columns: 1fr !important;
  }
}

.articles-cta {
  margin-top: var(--spacing-lg);
  text-align: center;
}

/* CTA 区域样式 */
.cta-section {
  position: relative;
  overflow: hidden;
  margin-top: 2rem;
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
