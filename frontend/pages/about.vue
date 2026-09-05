<template>
  <div class="about-page">
    <Navbar />
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
          <div v-for="(member, index) in configs.teamMembers" :key="index" class="team-member">
            <!-- 有有效图片 → 渲染 img；没图片或路径无效 → 渐变色占位 + 首字母 -->
            <img v-if="hasValidImage(member.image, index)" :src="member.image" :alt="member.name" class="team-img" @error="onImgError($event, index)">
            <div v-else class="team-placeholder" :style="{ background: avatarBg(index) }">
              {{ avatarInitial(member.name) }}
            </div>
            <h3 class="team-name">{{ member.name || '未知' }}</h3>
            <p class="team-role">{{ member.role || '未知职位' }}</p>
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

// 默认兜底数据（API 失败时显示）
const configs = ref({
  companyIntro: '我们是一家专注于前端开发和内容管理系统解决方案的高科技企业，致力于为客户提供高质量、高性能的Web应用和数字体验。',
  companyDetail: '自成立以来，我们始终坚持技术创新和客户至上的理念，不断提升服务质量和技术水平，已成功为数百个客户提供了专业的Web开发服务。',
  mission: '通过技术创新，赋能企业数字化转型，为客户创造更大价值。',
  vision: '成为行业领先的Web应用解决方案提供商，引领技术发展潮流。',
  values: '诚信、创新、协作、卓越，始终以客户需求为中心。',
  teamMembers: []
});

// 获取配置数据（后端 JSON 文件存储的 key-value 配置）
async function fetchConfigs() {
  try {
    // request 拦截器已解包，response 直接是后端返回的数组
    const list = await request.get('/api/configs');
    if (!Array.isArray(list)) return;

    list.forEach(config => {
      if (!config || !config.key) return;
      switch (config.key) {
        case 'about_company':
          if (config.value) configs.value.companyIntro = config.value;
          break;
        case 'about_company_detail':
          if (config.value) configs.value.companyDetail = config.value;
          break;
        case 'company_mission':
          if (config.value) configs.value.mission = config.value;
          break;
        case 'company_vision':
          if (config.value) configs.value.vision = config.value;
          break;
        case 'company_values':
          if (config.value) configs.value.values = config.value;
          break;
        case 'team_members':
          try {
            const members = config.value ? JSON.parse(config.value) : null;
            if (Array.isArray(members)) configs.value.teamMembers = members;
          } catch (e) {
            console.error('解析团队成员数据失败:', e);
          }
          break;
      }
    });
  } catch (error) {
    console.error('获取配置数据失败:', error);
    // API 失败时保留默认数据，不让页面空白
  }
}

// ===== 团队成员默认头像 =====
// 6 种预设渐变色，按成员 index 循环分配
const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',  // 紫
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',  // 粉
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',  // 蓝青
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',  // 绿
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',  // 粉橙
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',  // 浅粉青
];

function avatarBg(index) {
  return AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];
}

function avatarInitial(name) {
  if (!name) return '?';
  // 中文取第一个字，英文取首字母大写
  const first = name.trim().charAt(0);
  return first.toUpperCase();
}

// 记录哪些成员的图片加载失败了 → fallback 到占位头像
const brokenImgIndexes = ref(new Set());

// 判断图片路径是否有效（非空 + http 开头的完整 URL + 没加载失败过）
function hasValidImage(url, index) {
  if (!url || typeof url !== 'string') return false;
  if (!/^https?:\/\//i.test(url)) return false;
  if (index !== undefined && brokenImgIndexes.value.has(index)) return false;
  return true;
}

// 图片加载失败 → 标记该索引，自动切换到占位头像
function onImgError(_e, index) {
  brokenImgIndexes.value.add(index);
  // 强制刷新（Set 本身不是 reactive 的，用新 Set 触发 Vue 响应）
  brokenImgIndexes.value = new Set(brokenImgIndexes.value);
}

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
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

/* 默认头像占位 —— 渐变色圆形 + 首字母 */
.team-placeholder {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 64px;
  font-weight: 600;
  font-family: 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif;
  letter-spacing: 2px;
  margin-bottom: 20px;
  border: 4px solid var(--border-color);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.team-member:hover .team-img,
.team-member:hover .team-placeholder {
  transform: translateY(-4px) scale(1.03);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.25);
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