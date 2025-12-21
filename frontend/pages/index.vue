<template>
  <div class="home-container">
    <!-- 动态轮播图区域 -->
    <Banner :banners="banners" height="auto" />
    
    <!-- 波浪装饰 -->
    <div class="absolute bottom-0 left-0 w-full overflow-hidden z-10">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" class="w-full h-auto">
        <path fill="#ffffff" fill-opacity="1" d="M0,64L48,53.3C96,43,192,21,288,21.3C384,21,480,43,576,53.3C672,64,768,64,864,53.3C960,43,1056,21,1152,21.3C1248,21,1344,43,1392,53.3L1440,64L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"></path>
      </svg>
    </div>

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
        
        <!-- 服务卡片网格 - 响应式布局 -->
        <div class="services-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; width: 100%; max-width: none; min-width: 0;">
          <!-- 每个服务项是一个独立卡片 -->
          <NuxtLink 
            v-for="(service, index) in services" 
            :key="service.id" 
            :to="`/service-detail/${service.id}`" 
            style="display: block !important; width: auto !important; min-width: 0 !important; border: 1px solid #e0e0e0; box-shadow: 0 4px 12px rgba(0,0,0,0.1); transition: all 0.3s ease; transform: translateY(0);"
            onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 24px rgba(0,0,0,0.15)';"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)';"
            class="bg-white rounded-xl overflow-hidden">
            <!-- 卡片内部：图片在上 -->
            <div class="h-52 overflow-hidden">
              <img :src="service.image || getServiceImage(index)" alt="服务图片" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s ease; transform: scale(1);" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
            </div>
            
            <!-- 卡片内部：标题和详情在下 -->
            <div style="padding: 24px !important; width: 100%; box-sizing: border-box; height: 220px; position: relative; overflow: hidden;">
              <!-- 标题 -->
              <h3 style="font-size: 20px; font-weight: 600; margin: 0 0 15px 0 !important; padding: 0 !important; color: #333; width: 100%; box-sizing: border-box; height: 48px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">{{ service.title }}</h3>
              
              <!-- 详情 -->
              <div style="height: 60px; overflow: hidden; margin-bottom: 20px;">
                <p style="line-height: 1.6; margin: 0 !important; padding: 0 !important; color: #666; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; width: 100%; box-sizing: border-box;">{{ service.description || service.desc || '为客户提供专业的技术解决方案，助力业务增长和数字化转型。' }}</p>
              </div>
              
              <!-- 跳转到详情页面的按钮 -->
              <ClientOnly>
                <button style="background: #1677ff; color: white; border: none; margin: 0 !important; padding: 10px 20px !important; border-radius: 4px; cursor: pointer; box-shadow: 0 2px 8px rgba(22, 119, 255, 0.3); transition: all 0.3s ease; display: inline-flex; align-items: center; font-weight: 500; position: absolute; bottom: 24px; left: 24px; width: calc(100% - 48px); text-align: center; justify-content: center;">
                  查看详情
                </button>
              </ClientOnly>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 成功合作案例 -->
    <section class="cases-section py-12 bg-white">
      <div class="container">
        <!-- 区块标题 -->
        <div class="section-header text-center mb-12 max-w-3xl mx-auto">
          <span class="section-tag text-primary font-medium">成功案例</span>
          <h2 class="section-title text-3xl md:text-4xl font-bold mt-2 mb-4">成功合作案例</h2>
          <p class="section-subtitle text-gray-600">我们为众多企业提供了专业的技术解决方案，助力业务增长</p>
        </div>
        
        <div v-for="item in cases" :key="item.id" class="case-item" style="display: flex; border: 1px solid #e0e0e0; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); overflow: hidden; margin-bottom: 30px; flex-wrap: wrap;">
          <!-- 左侧图片 -->
          <div class="case-image" style="width: 350px; height: 250px; overflow: hidden; flex-shrink: 0;">
            <img :src="getCaseImage(item)" :alt="getCaseTitle(item)" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s ease; transform: scale(1);" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
          </div>
          <!-- 右侧内容 -->
          <div style="padding: 30px; flex: 1; background-color: white;">
            <h3 style="margin-bottom: 15px; font-size: 22px; font-weight: 600;">{{ getCaseTitle(item) }}</h3>
            <p style="line-height: 1.6; margin-bottom: 20px; color: #333; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">{{ item.description }}</p>
            <NuxtLink :to="`/cases/${item.id}`" style="text-decoration: none;">
              <button style="background: #1677ff; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; box-shadow: 0 2px 8px rgba(22, 119, 255, 0.3); transition: all 0.3s ease;">了解更多</button>
            </NuxtLink>
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
        <div class="article-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
          <NuxtLink 
            v-for="(article, index) in latestArticles" 
            :key="article.id" 
            :to="`/articles/${article.id}`"
            style="display: block; background: white; border: 1px solid #e0e0e0; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden; transition: all 0.3s ease; transform: translateY(0);"
            onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='0 8px 24px rgba(0,0,0,0.15)';"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)';"
            class="group"
          >
            <!-- 图片区域 -->
            <div style="height: 200px; overflow: hidden;">
              <img 
                :src="article.image || `https://picsum.photos/seed/article${index}/600/400`" 
                alt="文章封面" 
                style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s ease; transform: scale(1);" 
                onmouseover="this.style.transform='scale(1.1)'" 
                onmouseout="this.style.transform='scale(1)'"
              >
            </div>
            <!-- 文字内容区域 -->
            <div style="padding: 20px;">
              <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 12px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; color: #333;" class="group-hover:text-primary">
                {{ article.title || '文章标题' }}
              </h3>
              <p style="font-size: 14px; line-height: 1.6; color: #666; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                {{ article.excerpt || '这是一篇关于技术趋势和解决方案的文章，包含最新的行业动态和专业分析。' }}
              </p>
              <!-- 底部信息区域 -->
              <ClientOnly>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; color: #1677ff; font-size: 14px; font-weight: 500; transition: transform 0.3s ease;" class="group-hover:translate-x-2">
                      阅读全文 <el-icon style="margin-left: 8px;"><ArrowRight /></el-icon>
                    </div>
                    <div style="display: flex; align-items: center; color: #999; font-size: 13px;">
                      <el-icon style="margin-right: 4px; font-size: 12px;"><Calendar /></el-icon>
                      <span>{{ article.createTime || '2024-01-01' }}</span>
                    </div>
                  </div>
                </ClientOnly>
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
        
        <div class="team-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
          <div 
            v-for="i in 3" 
            :key="i" 
            class="team-member"
            :style="{animationDelay: `${i * 100}ms`, transition: 'all 0.3s ease'}"
            onmouseover="this.style.transform='translateY(-8px)';"
            onmouseout="this.style.transform='translateY(0)';"
          >
            <div class="team-image-container overflow-hidden rounded-xl mb-4">
              <img 
                :src="`https://picsum.photos/seed/member${i}/400/400`" 
                alt="团队成员" 
                style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s ease; transform: scale(1);" 
                onmouseover="this.style.transform='scale(1.1)'" 
                onmouseout="this.style.transform='scale(1)'"
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

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import Banner from '@/components/Banner.vue';
import { ArrowUp } from '@element-plus/icons-vue';
// 导入API模块
import { getBannerList } from '@/api/banner';
import { getCaseList } from '@/api/cases';
import type { CaseItem } from '@/api/cases';
import { getServiceList } from '@/api/services';
import type { ServiceItem } from '@/api/services';
import { getArticleList } from '@/api/articles';
import type { Article } from '@/api/articles';

const services = ref<ServiceItem[]>([]);
const banners = ref<any[]>([]);
// 添加调试信息
console.log('首页轮播图数据初始值:', banners.value);
// 页面加载时获取数据
onMounted(async () => {
  console.log('页面挂载，开始获取数据...');
  await Promise.all([fetchBanners(), fetchServices(), fetchCaseList(), fetchLatestArticles()]);
});
const cases = ref<CaseItem[]>([]);
const latestArticles = ref<Partial<Article>[]>([]);
const showBackToTop = ref(false);
const loadingCases = ref(true);
const loadingServices = ref(true);
const loadingArticles = ref(true);
const error = ref<string | null>(null);

// 获取轮播图数据
const fetchBanners = async () => {
  try {
    console.log('开始获取首页轮播图数据...');
    const res = await getBannerList('home');
    console.log('轮播图API返回结果:', res);
    banners.value = res;
  } catch (err) {
    console.error('获取轮播图数据失败:', err);
    banners.value = [];
  }
};



// 获取服务数据
const fetchServices = async () => {
  loadingServices.value = true;
  error.value = null;
  try {
    console.log('开始获取服务数据...');
    
    // 直接使用API获取数据，API层已经处理了格式转换
    const res = await getServiceList();
    console.log('服务API返回结果:', res);
    
    // 确保服务数据是数组
    if (Array.isArray(res)) {
      services.value = res;
      console.log(`成功获取到${res.length}个服务数据`);
    } else {
      console.warn('服务数据格式不正确，使用空数组');
      services.value = [];
    }
    
    // 确保至少有3条服务数据
    if (services.value.length < 3) {
      console.log('服务数据不足3条，使用模拟数据补充...');
      const mockServices = [
        {
          _id: '1',
          id: '1',
          icon: 'Management',
          title: '软件开发',
          description: '为客户提供定制化的软件开发服务，包括Web应用、移动应用和企业级解决方案。',
          desc: '为客户提供定制化的软件开发服务，包括Web应用、移动应用和企业级解决方案。',
          order: 1,
          isActive: true
        },
        {
          _id: '2',
          id: '2',
          icon: 'Monitor',
          title: '数字化转型',
          description: '帮助企业实现数字化转型，优化业务流程，提升运营效率。',
          desc: '帮助企业实现数字化转型，优化业务流程，提升运营效率。',
          order: 2,
          isActive: true
        },
        {
          _id: '3',
          id: '3',
          icon: 'Cloud',
          title: '云服务',
          description: '提供云计算解决方案，包括云迁移、云托管和云安全服务。',
          desc: '提供云计算解决方案，包括云迁移、云托管和云安全服务。',
          order: 3,
          isActive: true
        },
        {
          _id: '4',
          id: '4',
          icon: 'StarFilled',
          title: '人工智能',
          description: '利用人工智能技术为企业提供智能决策支持和自动化解决方案。',
          desc: '利用人工智能技术为企业提供智能决策支持和自动化解决方案。',
          order: 4,
          isActive: true
        },
        {
          _id: '5',
          id: '5',
          icon: 'Histogram',
          title: '大数据分析',
          description: '通过大数据分析帮助企业挖掘数据价值，优化业务决策。',
          desc: '通过大数据分析帮助企业挖掘数据价值，优化业务决策。',
          order: 5,
          isActive: true
        },
        {
          _id: '6',
          id: '6',
          icon: 'Briefcase',
          title: 'IT咨询',
          description: '提供专业的IT战略咨询服务，帮助企业制定技术发展规划。',
          desc: '提供专业的IT战略咨询服务，帮助企业制定技术发展规划。',
          order: 6,
          isActive: true
        }
      ];
      
      // 添加缺少的模拟数据
      const neededMockCount = 3 - services.value.length;
      services.value = [...services.value, ...mockServices.slice(0, neededMockCount)];
    }
  } catch (err) {
    console.error('获取服务数据失败:', err);
    error.value = err instanceof Error ? err.message : '获取服务数据失败，请稍后重试';
    
    // 使用模拟数据作为后备
    console.log('使用模拟服务数据作为后备...');
    services.value = [
      {
        _id: '1',
        id: '1',
        icon: 'Management',
        title: '软件开发',
        description: '为客户提供定制化的软件开发服务，包括Web应用、移动应用和企业级解决方案。',
        desc: '为客户提供定制化的软件开发服务，包括Web应用、移动应用和企业级解决方案。',
        order: 1,
        isActive: true
      },
      {
        _id: '2',
        id: '2',
        icon: 'Monitor',
        title: '数字化转型',
        description: '帮助企业实现数字化转型，优化业务流程，提升运营效率。',
        desc: '帮助企业实现数字化转型，优化业务流程，提升运营效率。',
        order: 2,
        isActive: true
      },
      {
        _id: '3',
        id: '3',
        icon: 'Cloud',
        title: '云服务',
        description: '提供云计算解决方案，包括云迁移、云托管和云安全服务。',
        desc: '提供云计算解决方案，包括云迁移、云托管和云安全服务。',
        order: 3,
        isActive: true
      },
      {
        _id: '4',
        id: '4',
        icon: 'StarFilled',
        title: '人工智能',
        description: '利用人工智能技术为企业提供智能决策支持和自动化解决方案。',
        desc: '利用人工智能技术为企业提供智能决策支持和自动化解决方案。',
        order: 4,
        isActive: true
      },
      {
        _id: '5',
        id: '5',
        icon: 'Histogram',
        title: '大数据分析',
        description: '通过大数据分析帮助企业挖掘数据价值，优化业务决策。',
        desc: '通过大数据分析帮助企业挖掘数据价值，优化业务决策。',
        order: 5,
        isActive: true
      },
      {
        _id: '6',
        id: '6',
        icon: 'Briefcase',
        title: 'IT咨询',
        description: '提供专业的IT战略咨询服务，帮助企业制定技术发展规划。',
        desc: '提供专业的IT战略咨询服务，帮助企业制定技术发展规划。',
        order: 6,
        isActive: true
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
    
    // 确保getCaseList函数存在
    if (typeof getCaseList !== 'function') {
      throw new Error('getCaseList函数未正确导入或定义');
    }
    
    // 使用API获取数据
    const res = await getCaseList();
    console.log('案例API返回结果:', res);
    
    // 处理可能的不同响应格式
    let caseData: CaseItem[] = [];
    
    if (Array.isArray(res)) {
      caseData = res as CaseItem[];
    } else if (typeof res === 'object' && res !== null) {
      if ('data' in res) {
        // 处理嵌套的数据格式
        const resData = res as any;
        caseData = Array.isArray(resData.data) ? (resData.data as CaseItem[]) : [];
      }
    }
    
    console.log(`成功获取到${caseData.length}个客户案例数据`);
    
    // 过滤激活的案例并确保数据格式一致
    cases.value = caseData
      .filter(item => item && typeof item === 'object' && item.isActive !== false) // 先过滤无效和非激活数据
      .map(item => {
        // 如果没有title，从description中提取前几个字作为标题
        let title = item.title;
        if (!title && item.description) {
          title = item.description.length > 20 ? item.description.substring(0, 20) + '...' : item.description;
        }
        
        return {
          ...item,
          _id: item._id || item.id || `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          id: item.id || item._id || `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: title || '客户案例',
          description: item.description || '暂无描述',
          image: item.image || `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/800/600`,
          publishTime: item.publishTime || new Date().toISOString(),
          order: item.order || 0,
          isActive: item.isActive !== false
        };
      });

    
    console.log(`成功获取到${cases.value.length}个客户案例数据`, cases.value);
    
    // 确保至少有3条案例数据
    if (cases.value.length < 3) {
      console.log('案例数据不足3条，使用模拟数据补充...');
      const mockCases = [
        {
          id: '1',
          title: '智能制造解决方案',
          description: '通过实施智能制造解决方案，帮助企业提升生产效率30%，降低运营成本25%。',
          image: 'https://picsum.photos/id/239/800/600',
          publishTime: '2024-01-15',
          order: 1,
          isActive: true
        },
        {
          id: '2',
          title: '金融交易平台开发',
          description: '为金融机构打造安全可靠的交易平台，支持日均交易量超过10万笔。',
          image: 'https://picsum.photos/id/24/800/600',
          publishTime: '2024-02-20',
          order: 2,
          isActive: true
        },
        {
          id: '3',
          title: '电商系统全面升级',
          description: '对现有电商系统进行全面升级，提升用户体验和系统性能，销售额增长45%。',
          image: 'https://picsum.photos/id/119/800/600',
          publishTime: '2024-03-10',
          order: 3,
          isActive: true
        }
      ];
      
      // 添加缺少的模拟数据
      const neededMockCount = 3 - cases.value.length;
      cases.value = [...cases.value, ...mockCases.slice(0, neededMockCount)];
    }
  } catch (err) {
    console.error('获取客户案例数据失败:', err);
    error.value = err instanceof Error ? err.message : '获取客户案例数据失败，请稍后重试';
    
    // 使用模拟数据作为后备
    console.log('使用模拟客户案例数据作为后备...');
    cases.value = [
      {
        id: '1',
        title: '智能制造解决方案',
        description: '通过实施智能制造解决方案，帮助企业提升生产效率30%，降低运营成本25%。',
        image: 'https://picsum.photos/id/239/800/600',
        publishTime: '2024-01-15',
        order: 1,
        isActive: true
      },
      {
        id: '2',
        title: '金融交易平台开发',
        description: '为金融机构打造安全可靠的交易平台，支持日均交易量超过10万笔。',
        image: 'https://picsum.photos/id/24/800/600',
        publishTime: '2024-02-20',
        order: 2,
        isActive: true
      },
      {
        id: '3',
        title: '电商系统全面升级',
        description: '对现有电商系统进行全面升级，提升用户体验和系统性能，销售额增长45%。',
        image: 'https://picsum.photos/id/119/800/600',
        publishTime: '2024-03-10',
        order: 3,
        isActive: true
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
    
    // 直接使用API获取最新文章数据，API层已经处理了格式转换
    const res = await getArticleList({ page: 1, limit: 3 });
    console.log('文章API返回结果:', res);
    
    // 格式化文章数据
    latestArticles.value = res
      .filter(article => article && typeof article === 'object' && (article._id || article.id)) // 先过滤无效数据，支持_id字段
      .map((article: any) => ({
        id: article._id || article.id || `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: article.title || '未命名文章',
        excerpt: article.excerpt || (article.content ? article.content.substring(0, 150) + '...' : '暂无摘要'),
        createTime: article.createTime || article.createdAt || new Date().toISOString().split('T')[0],
        image: article.image || `/images/article${Math.floor(Math.random() * 10)}-placeholder.jpg`
      }));
    
    // 确保至少有3条数据显示
    if (latestArticles.value.length < 3) {
      console.log('文章数据不足3条，使用模拟数据补充...');
      const mockArticles = [
        { id: '1', title: '2024年企业数字化转型趋势分析', excerpt: '随着技术的快速发展，企业数字化转型已成为必然趋势。本文深入分析了2024年数字化转型的主要方向和策略。', createTime: '2024-03-15', image: '' },
        { id: '2', title: '人工智能在企业决策中的应用', excerpt: '人工智能技术正在改变企业的决策方式，从数据中提取有价值的洞察，帮助企业做出更明智的决策。', createTime: '2024-03-10', image: '' },
        { id: '3', title: '云计算如何提升企业IT效率', excerpt: '云计算技术为企业带来了灵活性和可扩展性，本文介绍了如何利用云服务优化IT基础设施。', createTime: '2024-03-05', image: '' }
      ];
      
      // 添加缺少的模拟数据
      const neededMockCount = 3 - latestArticles.value.length;
      latestArticles.value = [...latestArticles.value, ...mockArticles.slice(0, neededMockCount)];
    }

    
    console.log('获取到的最新文章数据:', latestArticles.value);
  } catch (err) {
    console.error('获取最新文章数据失败:', err);
    error.value = err instanceof Error ? err.message : '获取文章数据失败，请稍后重试';
    latestArticles.value = []; // 确保错误时数组为空
  } finally {
    // 无论API返回什么结果，如果没有数据就使用模拟数据
    if (latestArticles.value.length === 0) {
      console.log('使用模拟数据填充文章列表...');
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
    loadingArticles.value = false;
  }
};

// 获取服务图片
const getServiceImage = (index: number) => {
  const imageIds = [180, 239, 24, 119, 96, 101];
  return `https://picsum.photos/id/${imageIds[index % imageIds.length]}/600/400`;
};

// 获取案例图片（优先使用案例数据中的图片，如果没有则使用默认图片）
const getCaseImage = (caseItem: CaseItem) => {
  return caseItem.image || `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/800/600`;
};

// 获取案例标题（优先使用案例数据中的标题，如果没有则从描述中提取）
const getCaseTitle = (caseItem: CaseItem) => {
  // 优先使用案例数据中的标题字段
  if (caseItem.title) {
    return caseItem.title;
  }
  // 从描述中提取前几个字作为标题，如果描述较长
  if (caseItem.description && caseItem.description.length > 20) {
    return caseItem.description.substring(0, 20) + '...';
  }
  return caseItem.description || '客户案例';
};

// 获取团队成员姓名
const getTeamMemberName = (index: number) => {
  const names = ['张明', '李华', '王芳', '赵强'];
  return names[index - 1];
};

// 获取团队成员职位
const getTeamMemberPosition = (index: number) => {
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
  /* 确保不影响内部flex布局 */
}

/* 移除可能影响布局的样式 */
.case-image-container {
  /* 移除可能干扰的flex属性 */
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
  
  /* 移动端响应式：核心服务卡片一行显示一个 */
  .services-grid {
    grid-template-columns: 1fr !important;
  }
  
  /* 移动端响应式：成功案例垂直排列 */
  .case-item {
    flex-direction: column !important;
  }
  
  .case-item .case-image {
    width: 100% !important;
    height: 200px !important;
  }
  
  /* 移动端响应式：最新动态卡片一行显示一个 */
  .article-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>
