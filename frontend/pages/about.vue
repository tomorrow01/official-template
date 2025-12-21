<template>
  <div class="about-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">关于我们</h1>
        <p class="page-subtitle">了解我们的使命、愿景和价值观</p>
      </div>
    </div>
    
    <!-- 公司简介 -->
    <div class="company-intro">
      <div class="container">
        <div class="intro-content">
          <div class="intro-text">
            <h2 class="section-title">公司简介</h2>
            <p>{{ configs.companyIntro }}</p>
            <p>{{ configs.companyDetail }}</p>
          </div>
          <div class="intro-image">
            <img src="/images/about-banner.jpg" alt="公司办公环境" class="company-img">
          </div>
        </div>

      </div>
    </div>
    
    <!-- 使命愿景 -->
    <div class="mission-vision">
      <div class="container">
        <div class="mission-card">
          <div class="mission-icon">
            <el-icon><Star /></el-icon>
          </div>
          <h3 class="mission-title">我们的使命</h3>
          <p class="mission-desc">{{ configs.mission }}</p>
        </div>
        <div class="mission-card">
          <div class="mission-icon">
            <el-icon><Star /></el-icon>
          </div>
          <h3 class="mission-title">我们的愿景</h3>
          <p class="mission-desc">{{ configs.vision }}</p>
        </div>
        <div class="mission-card">
          <div class="mission-icon">
            <el-icon><Star /></el-icon>
          </div>
          <h3 class="mission-title">我们的价值观</h3>
          <p class="mission-desc">{{ configs.values }}</p>
        </div>
      </div>
    </div>
    
    <!-- 团队介绍 -->
    <div class="team-section">
      <div class="container">
        <h2 class="section-title">专业团队</h2>
        <p class="section-subtitle">我们拥有一支经验丰富、技术精湛的专业团队</p>
        <div class="team-grid">
          <div v-for="(member, index) in configs.teamMembers" :key="member.name || index" class="team-member">
            <img :src="member.image" alt="团队成员" class="team-img">
            <h3 class="team-name">{{ member.name }}</h3>
            <p class="team-role">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { Star } from '@element-plus/icons-vue';
import Footer from '@/components/Footer.vue';
import Navbar from '@/components/Navbar.vue';
import { ref, onMounted } from 'vue';
import request from '@/api/request';

// 配置数据
const configs = ref({
  companyIntro: '我们是一家专注于前端开发和内容管理系统解决方案的高科技企业，致力于为客户提供高质量、高性能的Web应用和数字体验。',
  companyDetail: '自成立以来，我们始终坚持技术创新和客户至上的理念，不断提升服务质量和技术水平，已成功为数百个客户提供了专业的Web开发服务。',
  mission: '通过技术创新，赋能企业数字化转型，为客户创造更大价值。',
  vision: '成为行业领先的Web应用解决方案提供商，引领技术发展潮流。',
  values: '诚信、创新、协作、卓越，始终以客户需求为中心。',
  companyLogo: '',
  teamMembers: [
    { name: '张三', role: '技术总监', image: '/images/banner1.jpg' },
    { name: '李四', role: '产品经理', image: '/images/banner2.jpg' },
    { name: '王五', role: 'UI设计师', image: '/images/case2.jpg' },
    { name: '赵六', role: '前端开发工程师', image: '/images/logo.png' }
  ]
});

// 获取配置数据
async function fetchConfigs() {
  try {
    // 获取所有配置
    const response = await request.get('/configs');
    
    // 响应拦截器已经处理了code检查，这里直接使用response
    if (response && Array.isArray(response)) {
      response.forEach(config => {
        // 确保config对象有效
        if (!config || !config.key) return;
        
        switch (config.key) {
          case 'about_company':
            configs.value.companyIntro = config.value || configs.value.companyIntro;
            break;
          case 'about_company_detail':
            configs.value.companyDetail = config.value || configs.value.companyDetail;
            break;
          case 'company_logo':
            configs.value.companyLogo = config.value || configs.value.companyLogo;
            break;
          case 'company_mission':
            configs.value.mission = config.value || configs.value.mission;
            break;
          case 'company_vision':
            configs.value.vision = config.value || configs.value.vision;
            break;
          case 'company_values':
            configs.value.values = config.value || configs.value.values;
            break;
          case 'team_members':
            try {
              // 检查config.value是否已经是对象，如果是则直接使用，否则尝试解析
              let members = config.value;
              if (typeof members === 'string') {
                members = JSON.parse(members);
              }
              if (Array.isArray(members)) {
                // 确保每个成员对象都有必要的属性，避免渲染错误
                configs.value.teamMembers = members.map(member => ({
                  name: member.name || '未知',
                  role: member.role || '未知职位',
                  // 检查图片路径，如果是以/team/开头的，使用默认图片，否则使用提供的路径
                  image: (member.image && member.image.startsWith('/team/')) ? '/images/logo.png' : (member.image || '/images/logo.png')
                }));
              }
            } catch (e) {
              console.error('解析团队成员数据失败:', e);
            }
            break;
        }
      });
    }
  } catch (error) {
    console.error('获取配置数据失败:', error);
    // 失败时使用默认数据，确保不会出现undefined错误
  }
}

// 页面加载时获取配置
onMounted(() => {
  fetchConfigs();
});
</script>

<style scoped>
:root {
  --text-primary: #333;
  --text-secondary: #666;
  --text-tertiary: #999;
  --bg-container: #fff;
  --shadow-light: 0 4px 12px rgba(0,0,0,0.1);
  --border-color: #eee;
}

.about-page {
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
  background-image: url('https://picsum.photos/seed/aboutbanner/1920/1080');
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
  margin-bottom: 20px;
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
}

.company-intro {
  padding: 60px 0;
}

.intro-content {
  display: flex;
  gap: 40px;
  align-items: center;
}

.intro-text {
  flex: 1;
}

.intro-image {
  flex: 1;
}

.section-title {
  font-size: 28px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 20px;
}

.section-subtitle {
  font-size: 22px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.company-logo {
  margin-top: 40px;
  text-align: center;
}

.logo-img {
  max-width: 300px;
  max-height: 200px;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: var(--shadow-light);
}

.intro-text p {
  font-size: 16px;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 16px;
}

.company-img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: var(--shadow-light);
}

.mission-vision {
  background: var(--bg-container);
  padding: 60px 0;
}

.mission-vision .container {
  display: flex;
  gap: 30px;
  justify-content: space-between;
}

.mission-card {
  flex: 1;
  text-align: center;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: var(--shadow-light);
  transition: transform 0.3s;
}

.mission-card:hover {
  transform: translateY(-5px);
}

.mission-icon {
  font-size: 32px;
  color: #667eea;
  margin-bottom: 20px;
}

.mission-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--text-primary);
}

.mission-desc {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.team-section {
  padding: 60px 0;
  text-align: center;
}

.section-subtitle {
  font-size: 18px;
  color: var(--text-tertiary);
  margin-bottom: 40px;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
}

.team-member {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 300px;
}

.team-img {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
  border: 4px solid var(--border-color);
}

.team-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.team-role {
  font-size: 14px;
  color: var(--text-tertiary);
}

@media (max-width: 768px) {
  .page-header {
    padding: 60px 0;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .page-subtitle {
    font-size: 1rem;
    padding: 0 20px;
  }
  
  .intro-content {
    flex-direction: column;
  }
  
  .mission-vision .container {
    flex-direction: column;
  }
  
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .team-grid {
    grid-template-columns: 1fr;
  }
}
</style>