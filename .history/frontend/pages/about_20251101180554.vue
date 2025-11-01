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
            <p>我们是一家专注于前端开发和内容管理系统解决方案的高科技企业，致力于为客户提供高质量、高性能的Web应用和数字体验。</p>
            <p>自成立以来，我们始终坚持技术创新和客户至上的理念，不断提升服务质量和技术水平，已成功为数百个客户提供了专业的Web开发服务。</p>
          </div>
          <div class="intro-image">
            <img src="/images/case1.jpg" alt="公司办公环境" class="company-img">
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
          <p class="mission-desc">通过技术创新，赋能企业数字化转型，为客户创造更大价值。</p>
        </div>
        <div class="mission-card">
          <div class="mission-icon">
            <el-icon><Star /></el-icon>
          </div>
          <h3 class="mission-title">我们的愿景</h3>
          <p class="mission-desc">成为行业领先的Web应用解决方案提供商，引领技术发展潮流。</p>
        </div>
        <div class="mission-card">
          <div class="mission-icon">
            <el-icon><Star /></el-icon>
          </div>
          <h3 class="mission-title">我们的价值观</h3>
          <p class="mission-desc">诚信、创新、协作、卓越，始终以客户需求为中心。</p>
        </div>
      </div>
    </div>
    
    <!-- 团队介绍 -->
    <div class="team-section">
      <div class="container">
        <h2 class="section-title">专业团队</h2>
        <p class="section-subtitle">我们拥有一支经验丰富、技术精湛的专业团队</p>
        <div class="team-grid">
          <div class="team-member">
            <img src="/images/banner1.jpg" alt="团队成员" class="team-img">
            <h3 class="team-name">张三</h3>
            <p class="team-role">技术总监</p>
          </div>
          <div class="team-member">
            <img src="/images/banner2.jpg" alt="团队成员" class="team-img">
            <h3 class="team-name">李四</h3>
            <p class="team-role">产品经理</p>
          </div>
          <div class="team-member">
            <img src="/images/case2.jpg" alt="团队成员" class="team-img">
            <h3 class="team-name">王五</h3>
            <p class="team-role">UI设计师</p>
          </div>
          <div class="team-member">
            <img src="/images/logo.png" alt="团队成员" class="team-img">
            <h3 class="team-name">赵六</h3>
            <p class="team-role">前端开发工程师</p>
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
</script>

<style scoped>
.about-page {
  background: var(--bg-base);
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
}

.page-title {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 16px;
}

.page-subtitle {
  font-size: 18px;
  opacity: 0.9;
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
  text-align: center;
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
    font-size: 32px;
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