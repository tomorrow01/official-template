<template>
  <div class="home-container">
    <!-- 顶部轮播图：从后端获取，有数据时展示；无数据时兜底显示静态英雄区 -->
    <Banner v-if="banners.length" :banners="banners" />
    <!-- 英雄区域（兜底） -->
    <section v-else class="hero-section relative overflow-hidden" style="z-index: 0;">
      <div class="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://picsum.photos/id/1071/1920/1080" 
          alt="技术创新背景" 
          class="w-full h-full object-cover" 
          style="transition: transform 0.7s ease; transform: scale(1);" 
          onmouseover="this.style.transform='scale(1.1)'" 
          onmouseout="this.style.transform='scale(1)'"
        >
        <div class="hero-overlay absolute inset-0 z-10"></div>
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
          <ClientOnly>
            <div class="flex flex-wrap gap-4">
              <NuxtLink to="/services">
                <el-button type="primary" class="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full text-lg">
                  了解我们的服务
                </el-button>
              </NuxtLink>
              <NuxtLink to="/cases">
                <el-button type="default" class="bg-white/10 hover:bg-white/20 text-white border-white/30 px-8 py-3 rounded-full text-lg">
                  查看成功案例
                </el-button>
              </NuxtLink>
            </div>
          </ClientOnly>
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
    <section class="features-section py-12 bg-white" style="margin-bottom: 0;">
      <div class="container">
        <div class="section-header text-center mb-12 max-w-3xl mx-auto">
          <span class="section-tag text-primary font-medium">我们的优势</span>
          <h2 class="section-title text-3xl md:text-4xl font-bold mt-2 mb-4">为什么选择我们</h2>
          <p class="section-subtitle text-gray-600">多年行业经验，专业技术团队，为您提供定制化解决方案</p>
        </div>
        
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 40px;">
          <!-- 优势项1 -->
          <div style="flex: 0 0 100%; max-width: 300px; margin: 0 auto; text-align: center;">
            <!-- 上方图片 -->
              <NuxtLink to="/about">
                <div style="width: 120px; height: 120px; background-color: rgba(22, 119, 255, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 30px; cursor: pointer; transition: transform 0.7s ease; transform: scale(1);" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                  <img src="https://picsum.photos/seed/team/80/80" alt="专业团队" style="width: 80px; height: 80px; object-fit: contain;">
                </div>
              </NuxtLink>
            <!-- 下方文字 -->
            <div>
              <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 15px; color: #333;">专业团队</h3>
              <p style="line-height: 1.6; color: #666; margin: 0;">
                拥有多年行业经验的专业技术团队，精通各类技术栈，为您提供高质量的解决方案。
              </p>
            </div>
          </div>
          
          <!-- 优势项2 -->
          <div style="flex: 0 0 100%; max-width: 300px; margin: 0 auto; text-align: center;">
            <!-- 上方图片 -->
              <NuxtLink to="/services">
                <div style="width: 120px; height: 120px; background-color: rgba(22, 119, 255, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 30px; cursor: pointer; transition: transform 0.7s ease; transform: scale(1);" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                  <img src="https://picsum.photos/seed/custom/80/80" alt="定制服务" style="width: 80px; height: 80px; object-fit: contain;">
                </div>
              </NuxtLink>
            <!-- 下方文字 -->
            <div>
              <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 15px; color: #333;">定制服务</h3>
              <p style="line-height: 1.6; color: #666; margin: 0;">
                根据企业实际需求，提供个性化定制服务，确保解决方案完美契合业务发展。
              </p>
            </div>
          </div>
          
          <!-- 优势项3 -->
          <div style="flex: 0 0 100%; max-width: 300px; margin: 0 auto; text-align: center;">
            <!-- 上方图片 -->
              <NuxtLink to="/cases">
                <div style="width: 120px; height: 120px; background-color: rgba(22, 119, 255, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 30px; cursor: pointer; transition: transform 0.7s ease; transform: scale(1);" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                  <img src="https://picsum.photos/seed/timer/80/80" alt="高效执行" style="width: 80px; height: 80px; object-fit: contain;">
                </div>
              </NuxtLink>
            <!-- 下方文字 -->
            <div>
              <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 15px; color: #333;">高效执行</h3>
              <p style="line-height: 1.6; color: #666; margin: 0;">
                严格的项目管理流程，确保项目按时交付，为客户创造最大价值。
              </p>
            </div>
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
        
        <!-- 服务卡片网格 -->
        <div class="service-grid">
          <!-- 每个服务项是一个独立卡片 -->
          <NuxtLink 
            v-for="(service, index) in services" 
            :key="service.id" 
            :to="`/services/${service.id}`" 
            class="service-card-link">
            <!-- 卡片图片区（overflow-hidden 截断放大效果） -->
            <div class="service-card-image">
              <img :src="useImageUrl(service.image)" alt="服务图片" class="service-card-img">
            </div>
            
            <!-- 卡片内容区（flex 布局让按钮始终贴底） -->
            <div class="service-card-body">
              <h3 class="service-card-title">{{ service.title }}</h3>
              <p v-if="service.subtitle" class="service-card-subtitle">{{ service.subtitle }}</p>
              <p class="service-card-desc">{{ service.intro || stripHtml(service.description) || '为客户提供专业的技术解决方案，助力业务增长和数字化转型。' }}</p>
              <div class="service-card-footer">
                <span class="service-card-btn">查看详情 →</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 客户案例 - 动态渲染 -->
    <section class="cases-section py-12 bg-white" style="margin-top: 0; margin-bottom: 0;">
      <div class="container">
        <!-- 区块标题 -->
        <div class="section-header text-center mb-12 max-w-3xl mx-auto">
          <span class="section-tag text-primary font-medium">客户案例</span>
          <h2 class="section-title text-3xl md:text-4xl font-bold mt-2 mb-4">成功合作案例</h2>
          <p class="section-subtitle text-gray-600">我们为众多企业提供了优质的解决方案，赢得了客户的广泛认可</p>
        </div>

        <NuxtLink 
          v-for="caseItem in cases" 
          :key="caseItem.id" 
          :to="`/cases/${caseItem.id}`"
          class="case-card-link"
          style="display: flex; border: 1px solid #e0e0e0; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); overflow: hidden; margin-bottom: 30px; text-decoration: none; color: inherit; transition: all 0.3s ease;"
          onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 8px 24px rgba(0,0,0,0.15)';"
          onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)';"
        >
          <!-- 左侧图片 -->
          <div class="case-card-image" style="width: 350px; height: 250px; overflow: hidden; flex-shrink: 0;">
            <img :src="useImageUrl(caseItem.image)" :alt="caseItem.title || caseItem.description" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s ease; transform: scale(1);" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
          </div>
          <!-- 右侧内容 -->
          <div class="case-card-body" style="padding: 30px; flex: 1; background-color: white;">
            <h3 style="margin-bottom: 6px; font-size: 22px; font-weight: 600;">{{ caseItem.title || '客户案例' }}</h3>
            <p v-if="caseItem.subtitle" style="font-size: 13px; color: #999; margin-bottom: 12px;">{{ caseItem.subtitle }}</p>
            <p style="line-height: 1.6; margin-bottom: 20px; color: #333;">{{ caseItem.intro || stripHtml(caseItem.description) || '暂无简介' }}</p>
            <span style="display: inline-block; background: #1677ff; color: white; padding: 10px 20px; border-radius: 4px; font-weight: 500;">了解更多 →</span>
          </div>
        </NuxtLink>
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
        <div class="article-grid">
          <NuxtLink 
            v-for="(article, index) in latestArticles" 
            :key="article.id" 
            :to="`/articles/${article.id}`"
            class="article-card-link">
            <!-- 图片区域（overflow:hidden 截断 scale 放大） -->
            <div class="article-card-image">
              <img 
                :src="useImageUrl(article.image) || `https://picsum.photos/seed/article${index}/600/400`" 
                alt="文章封面" 
                class="article-card-img"
              >
            </div>
            <!-- 文字内容区（flex-column + 底部 meta margin-top:auto 贴底） -->
            <div class="article-card-body">
              <h3 class="article-card-title">{{ article.title || '文章标题' }}</h3>
              <p v-if="article.subtitle" class="article-card-subtitle">{{ article.subtitle }}</p>
              <p class="article-card-desc">{{ article.intro || stripHtml(article.content).slice(0, 100) || '这是一篇关于技术趋势和解决方案的文章...' }}</p>
              <div class="article-card-meta">
                <span class="article-card-link-text">阅读全文 →</span>
                <span class="article-card-date">{{ formatDate(article.createTime) }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>
        
        <!-- 查看更多按钮 -->
        <div class="articles-cta text-center mt-8">
          <NuxtLink to="/articles">
            <ClientOnly>
              <el-button type="primary" class="rounded-full bg-primary hover:bg-primary-dark px-8 py-3">
                查看所有文章
              </el-button>
            </ClientOnly>
          </NuxtLink>
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
        
        <div class="team-grid">
          <div 
            v-for="i in 3" 
            :key="i" 
            class="team-member">
            <div class="team-image-container">
              <img 
                :src="`https://picsum.photos/seed/member${i}/400/400`" 
                alt="团队成员" 
                class="team-image"
              >
            </div>
            <h3 class="team-name text-lg font-semibold text-center">{{ getTeamMemberName(i) }}</h3>
            <p class="team-position text-gray-500 text-center mb-3">{{ getTeamMemberPosition(i) }}</p>
            <div class="team-social flex justify-center space-x-3">
              <ClientOnly>
                <a href="#" class="text-gray-400 hover:text-primary transition-colors"><el-icon><Link /></el-icon></a>
                <a href="#" class="text-gray-400 hover:text-primary transition-colors"><el-icon><ChatLineRound /></el-icon></a>
                <a href="#" class="text-gray-400 hover:text-primary transition-colors"><el-icon><Share /></el-icon></a>
              </ClientOnly>
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
            <ClientOnly>
              <NuxtLink to="/contact">
                <el-button type="primary" class="cta-btn bg-white text-primary hover:bg-gray-100 rounded-full px-10 py-3 text-lg">
                  立即咨询
                </el-button>
              </NuxtLink>
              <NuxtLink to="/services">
                <el-button type="default" class="cta-btn-outline border-2 border-white text-white hover:bg-white/10 rounded-full px-10 py-3 text-lg">
                  了解服务
                </el-button>
              </NuxtLink>
            </ClientOnly>
          </div>
        </div>
      </div>
    </section>

    <Footer />
    
    <!-- 回到顶部按钮 -->
    <div class="quick-nav fixed bottom-6 right-6 z-50">
      <ClientOnly>
        <el-button 
          type="primary" 
          circle 
          class="back-to-top bg-primary hover:bg-primary-dark shadow-lg p-4 transition-all duration-300"
          @click="backToTop"
          :class="{ 'opacity-100': showBackToTop, 'opacity-0': !showBackToTop, 'pointer-events': showBackToTop ? 'auto' : 'none' }"
        >
          <el-icon class="text-lg"><ArrowUp /></el-icon>
        </el-button>
      </ClientOnly>
    </div>
  </div>
</template>

<!-- 移除可能冲突的自定义样式 -->

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import Banner from '@/components/Banner.vue';
import { ArrowUp } from '@element-plus/icons-vue';
import { getBannerList } from '@/api/banner';
import { getServiceList } from '@/api/services';
import { getCaseList } from '@/api/cases';
import { getArticleList } from '@/api/articles';
import { useImageUrl } from '@/composables/useImageUrl';

// 数据状态
const banners = ref([]);
const services = ref([]);
const cases = ref([]);
const latestArticles = ref([]);
const showBackToTop = ref(false);

// 获取轮播图数据（后端真实数据，仅取启用项并按排序值升序）
const fetchBanners = async () => {
  try {
    banners.value = await getBannerList();
  } catch (err) {
    console.error('获取轮播图数据失败:', err);
  }
};

// 获取服务数据（后端真实数据）
const fetchServices = async () => {
  try {
    const list = await getServiceList();
    services.value = list.map(item => ({
      ...item,
      image: item.image || `https://picsum.photos/seed/${item.title || item._id}/600/400`,
    }));
  } catch (err) {
    console.error('获取服务数据失败:', err);
  }
};

// 获取客户案例数据（后端真实数据）
const fetchCaseList = async () => {
  try {
    const list = await getCaseList();
    cases.value = list.map(item => ({
      ...item,
      image: item.image || `https://picsum.photos/seed/${item.title || item._id}/350/250`,
    }));
  } catch (err) {
    console.error('获取客户案例数据失败:', err);
  }
};

// 把 HTML 标签去掉，取纯文本
const stripHtml = (html) => {
  if (!html) return ''
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
}

// 格式化日期
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// 首页文章卡片（flex 布局 + 图片截断 + 按钮贴底）
// .article-card-link / .article-card-image / .article-card-body 等样式已在 <style scoped> 中定义

// 获取最新文章数据（后端真实数据，取前3条）
const fetchLatestArticles = async () => {
  try {
    const list = await getArticleList();
    latestArticles.value = list.slice(0, 3).map(item => ({
      ...item,
      image: item.image || `https://picsum.photos/seed/${item.title || item._id}/600/400`,
      excerpt: stripHtml(item.content).slice(0, 100) + '...',
    }));
  } catch (err) {
    console.error('获取文章数据失败:', err);
  }
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
};

onMounted(() => {
  fetchBanners();
  fetchServices();
  fetchCaseList();
  fetchLatestArticles();
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style>
/* 强制服务卡片3列布局 */
.service-card-wrapper {
  display: flex !important;
  flex-wrap: wrap !important;
  margin: 0 -12px !important;
  width: 100% !important;
}
.service-card-item {
  width: 33.3333% !important;
  padding: 0 12px !important;
  margin-bottom: 24px !important;
  box-sizing: border-box !important;
  display: block !important;
  float: left !important;
}
/* 响应式断点 */
@media (max-width: 768px) {
  .service-card-item {
    width: 50% !important;
  }
}
@media (max-width: 640px) {
  .service-card-item {
    width: 100% !important;
  }
}
</style>

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
  padding: 4rem 0; /* 减少默认padding以缩小缝隙 */
  position: relative;
}

/* 区块背景（模板里的 Tailwind 类 bg-white / bg-gray-50 不生效，这里显式补上，
   保持 白→灰→白→蓝→灰→白→蓝 的交替节奏） */
.features-section {
  background: #ffffff;
}
.services-section {
  background: #f7f8fa;
}
.cases-section {
  background: #ffffff;
}
.latest-articles {
  background: #f7f8fa;
}
.team-section {
  background: #ffffff;
}

/* Hero 图片上的深色渐变遮罩（保证白色标题可读） */
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4));
  pointer-events: none;
}

/* 移除顶部边框以消除视觉缝隙 */
.services-section,
.cases-section,
.latest-articles,
.team-section {
  border-top: none;
}

/* 响应式优化 - 进一步减少移动端的padding */
@media (max-width: 768px) {
  .features-section,
  .services-section,
  .cases-section,
  .latest-articles,
  .team-section {
    padding: 3rem 0;
  }
}

/* 优化英雄区域 */
.hero-section {
  padding: 0 0 8rem 0;
}

/* 数据统计区域优化 */
.stats-section {
  padding: 4rem 0;
  /* 模板的 bg-gradient-to-r from-primary to-secondary 类不生效，显式补渐变背景 */
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: #ffffff;
}

/* 服务区块样式 */
.services-section {
  position: relative;
  overflow: hidden;
}

/* ===== 首页服务卡片（新版） ===== */
.service-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
  width: 100%;
}

.service-card-link {
  display: flex;          /* flex 纵向布局 */
  flex-direction: column;
  min-width: 0;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: white;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
}

.service-card-link:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

/* 图片容器 — overflow:hidden 保证放大不溢出 */
.service-card-image {
  width: 100%;
  height: 208px;         /* h-52 = 208px，固定高度 */
  overflow: hidden;      /* 关键：截断 scale 放大的图片 */
  flex-shrink: 0;        /* 图片区不被压缩 */
}

.service-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.7s ease;
}

.service-card-link:hover .service-card-img {
  transform: scale(1.1);
}

/* 内容区 — flex:1 撑满剩余空间，让按钮贴底 */
.service-card-body {
  flex: 1;                /* 关键：内容区撑满 */
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.service-card-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 0 6px 0;
  line-height: 1.4;
}

.service-card-subtitle {
  font-size: 13px;
  color: #999;
  margin: 0 0 10px 0;
}

/* 简介 — 固定 2 行，超出截断，保持稳定高度 */
.service-card-desc {
  font-size: 14px;
  line-height: 1.6;
  color: #666;
  margin: 0;
  /* 关键：固定 2 行，防止高度漂移 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 44px;       /* 2 行 × 22px 行高 ≈ 44px，保证占位 */
  margin-bottom: 20px;
}

/* 按钮区 — mt-auto 自动贴底 */
.service-card-footer {
  margin-top: auto;       /* 关键：把按钮推到卡片底部 */
}

.service-card-btn {
  display: inline-flex;
  align-items: center;
  background: #1677ff;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(22, 119, 255, 0.3);
  transition: all 0.3s ease;
}

.service-card-link:hover .service-card-btn {
  background: #0958d9;
  box-shadow: 0 4px 12px rgba(22, 119, 255, 0.4);
}

/* 响应式：平板 2 列，手机 1 列 */
@media (max-width: 1024px) {
  .service-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
  .service-grid { grid-template-columns: 1fr; }
}

/* ===== 旧的 .service-card 样式（保留兼容，可能其他地方引用） ===== */
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

/* 首页案例卡片：移动端改为上下堆叠，避免固定 350px 图片挤压文字 */
@media (max-width: 768px) {
  .case-card-link {
    flex-direction: column !important;
  }
  .case-card-image {
    width: 100% !important;
    height: 200px !important;
  }
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
  /* 确保不影响内部flex布局 */
}

/* 更新图片样式以适应我们的布局 */
.case-image {
  max-width: 100%;
  height: auto;
  /* 使用object-cover确保图片填充容器 */
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

/* ===== 首页文章卡片（新版 - flex 布局 + 图片截断 + meta 贴底） ===== */
.article-card-link {
  display: flex;
  flex-direction: column;
  min-width: 0;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: white;
  overflow: hidden;           /* 双层截断：和 .article-card-image 一起保证图片不溢出 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
}
.article-card-link:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}
/* 图片容器 — overflow:hidden 截断 scale 放大 */
.article-card-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  flex-shrink: 0;
  border-radius: 0;
}
.article-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.7s ease;
}
.article-card-link:hover .article-card-img {
  transform: scale(1.1);
}
/* 内容区 — flex:1 + flex-col，meta 用 margin-top:auto 贴底 */
.article-card-body {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.article-card-title {
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
.article-card-link:hover .article-card-title {
  color: #1677ff;
}
.article-card-subtitle {
  font-size: 13px;
  color: #999;
  margin: 0 0 10px 0;
}
/* 简介 — 固定 2 行，min-height 保证占位稳定 */
.article-card-desc {
  font-size: 14px;
  line-height: 1.6;
  color: #666;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 44px;
  margin-bottom: 16px;
}
/* meta 区 — margin-top:auto 贴底，所有卡片按钮对齐 */
.article-card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}
.article-card-link-text {
  font-size: 14px;
  color: #1677ff;
  font-weight: 500;
  transition: transform 0.3s ease;
}
.article-card-link:hover .article-card-link-text {
  transform: translateX(4px);
}
.article-card-date {
  font-size: 13px;
  color: #999;
}

/* 团队网格样式 */
.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  width: 100%;
}

.team-member {
  transition: transform 0.3s ease;
  cursor: pointer;
}

.team-member:hover {
  transform: translateY(-8px);
}

/* 团队成员图片容器 — overflow:hidden + border-radius 截断 scale 放大效果 */
.team-image-container {
  width: 100%;
  aspect-ratio: 1 / 1;      /* 正方形 */
  overflow: hidden;         /* 关键：截断 scale 放大的图片 */
  border-radius: 12px;
  margin-bottom: 1rem;
}

.team-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.7s ease;
}

.team-member:hover .team-image {
  transform: scale(1.1);    /* 放大被父级 overflow:hidden 截断，不溢出 */
}

/* 响应式团队网格 */
@media (max-width: 768px) {
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
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
  /* 模板的 bg-gradient-to-r from-primary to-secondary 类不生效，显式补渐变背景 */
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
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

/* 主按钮：白底蓝字（模板 bg-white text-primary 类不生效，显式补上，避免蓝按钮压蓝底看不清） */
.cta-btn {
  background: #ffffff;
  color: var(--primary-color);
}
.cta-btn:hover {
  background: #f0f3ff;
  color: var(--primary-dark);
}

.cta-btn-outline {
  background: transparent;
  border: 2px solid white;
  color: white;
}
.cta-btn-outline:hover {
  background: rgba(255, 255, 255, 0.15);
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

/* ===== 响应式设计 ===== */
/* 基础：桌面 3 列 */
.article-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

/* 平板：自动适配 */
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
