<template>
  <div class="case-detail-page">
    <Navbar />
    
    <div class="container">
      <!-- 返回按钮 -->
      <div class="back-button-container">
        <el-button @click="navigateBack" type="default" size="small">
          <el-icon><ArrowLeft /></el-icon>
          返回首页
        </el-button>
      </div>
      
      <!-- 案例详情卡片 -->
      <div v-if="!loading && caseDetail" class="case-detail-card">
        <!-- 案例标题 -->
        <h1 class="case-title">{{ caseDetail.title }}</h1>
        
        <!-- 案例元信息 -->
        <div class="case-meta">
          <span class="case-category">所属类别：{{ caseDetail.category || '综合案例' }}</span>
          <span class="case-year">完成年份：{{ caseDetail.year || '2024' }}</span>
        </div>
        
        <!-- 案例封面图 -->
        <div class="case-cover">
          <img :src="caseDetail.image" :alt="caseDetail.title" class="cover-image">
        </div>
        
        <!-- 案例概览 -->
        <div class="case-overview">
          <h2>项目概览</h2>
          <p>{{ caseDetail.overview }}</p>
        </div>
        
        <!-- 客户需求 -->
        <div class="client-needs">
          <h2>客户需求</h2>
          <p>{{ caseDetail.needs }}</p>
        </div>
        
        <!-- 解决方案 -->
        <div class="solution">
          <h2>解决方案</h2>
          <p>{{ caseDetail.solution }}</p>
          <ul v-if="caseDetail.solutionPoints && caseDetail.solutionPoints.length">
            <li v-for="(point, index) in caseDetail.solutionPoints" :key="index" class="solution-point">
              <span class="point-icon">✓</span>
              <span>{{ point }}</span>
            </li>
          </ul>
        </div>
        
        <!-- 项目成果 -->
        <div class="achievements">
          <h2>项目成果</h2>
          <p>{{ caseDetail.achievements }}</p>
          <div class="achievement-stats" v-if="caseDetail.stats && caseDetail.stats.length">
            <div v-for="(stat, index) in caseDetail.stats" :key="index" class="stat-item">
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
        
        <!-- 案例图片展示 -->
        <div class="case-gallery" v-if="caseDetail.gallery && caseDetail.gallery.length">
          <h2>案例展示</h2>
          <div class="gallery-grid">
            <div v-for="(image, index) in caseDetail.gallery" :key="index" class="gallery-item">
              <img :src="image" :alt="`${caseDetail.title} - 图片${index + 1}`" class="gallery-image">
            </div>
          </div>
        </div>
        
        <!-- 联系咨询 -->
        <div class="contact-cta">
          <div class="cta-content">
            <h3>需要类似的解决方案？</h3>
            <p>联系我们，了解如何为您的业务打造定制化解决方案</p>
            <NuxtLink to="/contact" class="contact-button">立即咨询</NuxtLink>
          </div>
        </div>
      </div>
      
      <!-- 加载状态 -->
      <div v-else-if="loading" class="loading-container">
        <el-loading v-loading="loading" element-loading-text="正在加载案例详情..." />
      </div>
      
      <!-- 错误状态 -->
      <div v-else class="error-container">
        <el-empty description="案例不存在或已被删除"></el-empty>
        <el-button @click="navigateBack" type="primary" style="margin-top: 20px;">
          返回首页
        </el-button>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ArrowLeft } from '@element-plus/icons-vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

const router = useRouter();
const route = useRoute();
const caseId = String(route.params.id);

const caseDetail = ref(null);
const loading = ref(true);
const error = ref(null);

// 获取案例详情
const fetchCaseDetail = async () => {
  loading.value = true;
  error.value = null;
  try {
    console.log(`开始获取案例ID为${caseId}的详情...`);
    
    // 模拟API调用失败，使用模拟数据
    caseDetail.value = getMockCaseData(caseId);
    console.log('获取到的案例详情:', caseDetail.value);
  } catch (err) {
    console.error('获取案例详情失败:', err);
    error.value = '获取案例详情失败，请稍后重试';
    // 使用默认的模拟数据
    caseDetail.value = getMockCaseData(caseId);
  } finally {
    loading.value = false;
  }
};

// 模拟案例数据
const getMockCaseData = (id) => {
  const caseMap = {
    '1': {
      id: '1',
      title: '企业数字化转型案例',
      category: '数字化转型',
      year: '2023',
      image: 'https://picsum.photos/seed/case1/800/400',
      overview: '我们帮助一家传统制造企业实现了全面的数字化转型，通过引入智能制造系统、物联网技术和大数据分析平台，重构了企业的核心业务流程。',
      needs: '客户面临生产效率低下、管理流程繁琐、数据孤岛严重等问题，需要一套完整的数字化解决方案来提升企业竞争力。具体需求包括：智能生产管理系统、供应链优化、客户关系管理升级以及数据分析平台建设。',
      solution: '我们为客户提供了端到端的数字化转型解决方案，涵盖了业务流程再造、IT系统升级和数据平台建设等多个方面。',
      solutionPoints: [
        '部署智能工厂管理系统，实现生产全过程可视化监控',
        '构建物联网基础设施，连接生产设备和传感器网络',
        '开发数据分析平台，支持实时生产数据监控和预测分析',
        '优化供应链管理流程，实现供应商协同和库存智能化管理',
        '升级客户关系管理系统，提升客户服务体验和满意度'
      ],
      achievements: '通过此次数字化转型，客户企业实现了显著的业务提升和运营改善。生产效率、产品质量和客户满意度均得到大幅提高。',
      stats: [
        { value: '40%', label: '生产效率提升' },
        { value: '25%', label: '运营成本降低' },
        { value: '35%', label: '产品质量提升' },
        { value: '30%', label: '客户满意度提升' }
      ],
      gallery: [
        'https://picsum.photos/seed/case1-1/600/400',
        'https://picsum.photos/seed/case1-2/600/400',
        'https://picsum.photos/seed/case1-3/600/400',
        'https://picsum.photos/seed/case1-4/600/400'
      ]
    },
    '2': {
      id: '2',
      title: '电子商务平台开发案例',
      category: '软件开发',
      year: '2024',
      image: 'https://picsum.photos/seed/case2/800/400',
      overview: '为一家连锁零售企业打造了全渠道电子商务平台，整合线上线下业务，实现了商品、订单、会员、库存的统一管理。',
      needs: '客户需要一个能够支持多渠道销售的电子商务平台，实现线上线下业务的深度融合。具体需求包括：全渠道订单管理、统一商品中心、会员体系整合、智能推荐系统以及数据分析能力。',
      solution: '我们基于微服务架构，为客户开发了可扩展的电子商务平台，集成了全渠道销售管理、智能推荐和数据分析功能。',
      solutionPoints: [
        '构建全渠道订单管理系统，支持线上线下订单一体化处理',
        '开发统一商品中心，实现商品信息和库存的实时同步',
        '设计会员体系整合方案，打通线上线下会员数据',
        '部署智能推荐系统，基于用户行为和偏好提供个性化商品推荐',
        '建立数据分析平台，支持销售趋势分析和预测'
      ],
      achievements: '平台上线后，客户的线上销售额和全渠道用户活跃度均实现了显著增长，会员粘性和复购率也得到大幅提升。',
      stats: [
        { value: '200%', label: '用户增长率' },
        { value: '35%', label: '销售额提升' },
        { value: '45%', label: '复购率增长' },
        { value: '25%', label: '运营效率提升' }
      ],
      gallery: [
        'https://picsum.photos/seed/case2-1/600/400',
        'https://picsum.photos/seed/case2-2/600/400',
        'https://picsum.photos/seed/case2-3/600/400',
        'https://picsum.photos/seed/case2-4/600/400'
      ]
    },
    '3': {
      id: '3',
      title: '数据智能分析系统案例',
      category: '数据分析',
      year: '2023',
      image: 'https://picsum.photos/seed/case3/800/400',
      overview: '为金融服务企业构建了先进的数据智能分析系统，通过大数据和人工智能技术，帮助客户提升风险管控能力和决策效率。',
      needs: '客户面临海量数据处理困难、风险预测准确率不高、决策缺乏数据支撑等挑战，需要一套强大的数据智能分析系统来提升业务水平。',
      solution: '我们为客户构建了端到端的数据智能分析系统，包括数据仓库、ETL流程、机器学习模型和可视化仪表盘。',
      solutionPoints: [
        '建立企业级数据仓库，整合多源异构数据',
        '开发自动化ETL流程，确保数据质量和时效性',
        '构建机器学习模型，用于风险预测和欺诈检测',
        '设计交互式数据可视化仪表盘，支持业务决策',
        '提供数据治理和安全保障方案'
      ],
      achievements: '系统上线后，客户的风险管理能力、决策效率和业务创新能力均得到显著提升，为业务增长提供了强有力的数据支撑。',
      stats: [
        { value: '30%', label: '风险预测准确率提高' },
        { value: '50%', label: '决策效率提升' },
        { value: '40%', label: '欺诈检测率提高' },
        { value: '35%', label: '数据处理效率提升' }
      ],
      gallery: [
        'https://picsum.photos/seed/case3-1/600/400',
        'https://picsum.photos/seed/case3-2/600/400',
        'https://picsum.photos/seed/case3-3/600/400',
        'https://picsum.photos/seed/case3-4/600/400'
      ]
    }
  };
  
  // 返回对应ID的案例或默认案例
  return caseMap[id] || {
    id: id,
    title: '案例标题示例',
    category: '综合案例',
    year: '2024',
    image: 'https://picsum.photos/seed/case-default/800/400',
    overview: '这是一个案例项目概览，介绍了项目的基本情况和目标。',
    needs: '客户的具体需求和面临的挑战，包括业务痛点和期望解决的问题。',
    solution: '我们提供的解决方案概述，包括采用的技术和实施的方法。',
    solutionPoints: [
      '解决方案要点一：详细描述解决方案的关键组成部分',
      '解决方案要点二：介绍具体的实施步骤和方法',
      '解决方案要点三：说明技术选型和架构设计'
    ],
    achievements: '项目实施后的成果和效益，包括业务指标的改善和客户的反馈。',
    stats: [
      { value: 'XX%', label: '效率提升' },
      { value: 'XX%', label: '成本降低' }
    ],
    gallery: [
      'https://picsum.photos/seed/case-default-1/600/400',
      'https://picsum.photos/seed/case-default-2/600/400'
    ]
  };
};

// 返回上一页
const navigateBack = () => {
  router.push('/');
};

// 页面加载时获取案例详情
onMounted(() => {
  fetchCaseDetail();
});
</script>

<style scoped>
.case-detail-page {
  padding: 40px 0;
  background: var(--bg-base, #f5f5f5);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.back-button-container {
  margin-bottom: 20px;
}

.case-detail-card {
  background: var(--bg-container, #ffffff);
  border-radius: 12px;
  padding: 40px;
  box-shadow: var(--shadow-light, 0 4px 12px rgba(0,0,0,0.1));
}

.case-title {
  font-size: 28px;
  font-weight: 600;
  color: var(--text-primary, #333333);
  margin-bottom: 20px;
  line-height: 1.4;
}

.case-meta {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color, #e0e0e0);
}

.case-category,
.case-year {
  font-size: 14px;
  color: var(--text-tertiary, #666666);
}

.case-cover {
  margin-bottom: 40px;
}

.cover-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

.case-overview,
.client-needs,
.solution,
.achievements,
.case-gallery {
  margin-bottom: 40px;
}

h2 {
  font-size: 22px;
  font-weight: 600;
  color: var(--text-primary, #333333);
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--border-color, #e0e0e0);
}

p {
  font-size: 16px;
  line-height: 1.7;
  color: var(--text-secondary, #444444);
  margin-bottom: 20px;
}

.solution-point {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
  font-size: 16px;
  line-height: 1.7;
  color: var(--text-secondary, #444444);
}

.point-icon {
  margin-right: 10px;
  color: var(--primary-color, #1677ff);
  font-weight: bold;
}

.achievement-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.stat-item {
  text-align: center;
  padding: 20px;
  background: var(--bg-elevated, #fafafa);
  border-radius: 8px;
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
  color: var(--primary-color, #1677ff);
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: var(--text-secondary, #444444);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.gallery-item {
  overflow: hidden;
  border-radius: 8px;
}

.gallery-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-image:hover {
  transform: scale(1.05);
}

.contact-cta {
  background: linear-gradient(to right, var(--primary-color, #1677ff), var(--secondary-color, #36cfc9));
  border-radius: 8px;
  padding: 40px;
  color: white;
  text-align: center;
  margin-top: 40px;
}

.cta-content h3 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
}

.cta-content p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 24px;
}

.contact-button {
  display: inline-block;
  padding: 12px 36px;
  background: white;
  color: var(--primary-color, #1677ff);
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.contact-button:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.loading-container,
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px;
}
</style>