<template>
  <div class="service-detail-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="container">
        <h1>{{ service?.title || '服务详情' }}</h1>
        <p>专业的解决方案，助力企业发展</p>
      </div>
    </div>

    <!-- 服务详情内容 -->
    <div class="container">
      <div class="service-content">
        <!-- 服务介绍 -->
        <div class="service-intro">
          <img 
            :src="service?.image || 'https://picsum.photos/seed/service1/800/400'" 
            :alt="service?.title || '服务图片'"
            class="service-image"
          >
          <div class="service-description">
            <h2>{{ service?.title || '服务标题' }}</h2>
            <p>{{ service?.description || '这是一项专业服务，为客户提供全方位的解决方案...' }}</p>
          </div>
        </div>

        <!-- 服务特点 -->
        <div class="service-features">
          <h3>服务特点</h3>
          <ul>
            <li v-for="feature in service?.features || defaultFeatures" :key="feature" class="feature-item">
              <span class="feature-icon">✓</span>
              <span>{{ feature }}</span>
            </li>
          </ul>
        </div>

        <!-- 服务优势 -->
        <div class="service-advantages">
          <h3>我们的优势</h3>
          <div class="advantage-cards">
            <div class="advantage-card" v-for="(advantage, index) in advantages" :key="index">
              <div class="advantage-icon">{{ index + 1 }}</div>
              <h4>{{ advantage.title }}</h4>
              <p>{{ advantage.description }}</p>
            </div>
          </div>
        </div>

        <!-- 案例展示 -->
        <div class="service-cases">
          <h3>相关案例</h3>
          <div class="case-cards">
            <div class="case-card" v-for="(caseItem, index) in cases" :key="index">
              <img :src="`https://picsum.photos/seed/case${index + 1}/400/300`" :alt="caseItem.title">
              <h4>{{ caseItem.title }}</h4>
              <NuxtLink :to="'/cases'" class="view-case">查看案例</NuxtLink>
            </div>
          </div>
        </div>

        <!-- 联系咨询 -->
        <div class="contact-cta">
          <div class="cta-content">
            <h3>需要了解更多？</h3>
            <p>填写下方表单或直接联系我们，获取专业咨询服务</p>
            <NuxtLink to="/contact" class="contact-button">立即咨询</NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- 返回顶部按钮 -->
    <div class="back-to-top" @click="scrollToTop">返回顶部</div>
  </div>
</template>

<script>
export default {
  name: 'ServiceDetailPage',
  data() {
    return {
      service: null,
      advantages: [
        {
          title: '专业团队',
          description: '拥有丰富经验的专业团队，为您提供高质量服务'
        },
        {
          title: '定制方案',
          description: '根据企业需求定制专属解决方案，确保最佳效果'
        },
        {
          title: '全程支持',
          description: '从规划到实施，提供全程技术支持和咨询服务'
        }
      ],
      cases: [
        { title: '企业数字化转型案例' },
        { title: '电子商务平台开发案例' },
        { title: '数据智能分析系统案例' }
      ],
      defaultFeatures: [
        '专业的技术团队支持',
        '个性化定制解决方案',
        '完善的售后服务保障',
        '高效的项目实施流程'
      ]
    }
  },
  async fetch() {
    // 在实际项目中，这里应该根据ID从API获取服务详情
    // 现在我们模拟根据ID返回不同的服务数据
    const id = this.$route.params.id
    this.service = this.getMockServiceData(id)
  },
  methods: {
    getMockServiceData(id) {
      // 模拟服务数据
      const serviceMap = {
        '1': {
          id: '1',
          title: '企业数字化转型服务',
          description: '我们为传统企业提供全面的数字化转型解决方案，包括业务流程再造、IT系统升级、数字化营销策略等。通过引入智能制造系统、云计算、大数据分析等先进技术，帮助企业提升生产效率，降低运营成本，增强市场竞争力。我们的服务涵盖从需求分析、方案设计到实施落地的全流程，确保转型过程平稳高效。',
          image: 'https://picsum.photos/seed/service1/800/400',
          features: [
            '业务流程数字化重构',
            '智能工厂解决方案',
            '数字化营销体系建设',
            '数据分析平台搭建',
            '数字化人才培养'
          ]
        },
        '2': {
          id: '2',
          title: '软件开发与定制服务',
          description: '我们提供高质量的软件开发和定制服务，包括企业管理系统、电子商务平台、移动应用开发等。根据客户需求，我们采用敏捷开发方法，确保交付的软件产品符合预期，具有良好的用户体验和稳定性。我们的技术团队拥有丰富的开发经验，熟悉多种编程语言和框架，能够满足不同规模企业的软件需求。',
          image: 'https://picsum.photos/seed/service2/800/400',
          features: [
            '企业管理系统定制',
            '电子商务平台开发',
            '移动应用开发',
            '系统集成服务',
            '软件维护与升级'
          ]
        },
        '3': {
          id: '3',
          title: '数据分析与商业智能',
          description: '我们的数据分析与商业智能服务帮助企业挖掘数据价值，提升决策效率。通过建立数据分析模型、开发可视化报表和仪表盘，我们为企业提供清晰的数据洞察，支持业务决策。我们的服务包括数据仓库建设、ETL流程开发、数据可视化等，帮助企业充分利用数据资产，实现数据驱动的管理和创新。',
          image: 'https://picsum.photos/seed/service3/800/400',
          features: [
            '数据仓库建设',
            '商业智能报表开发',
            '数据可视化设计',
            '预测分析模型构建',
            '数据治理咨询'
          ]
        },
        '4': {
          id: '4',
          title: 'IT咨询与规划服务',
          description: '我们提供专业的IT咨询和规划服务，帮助企业制定合理的IT战略和技术路线图。通过深入了解企业业务需求和技术现状，我们为企业提供全面的IT解决方案，包括系统架构设计、技术选型、项目管理等。我们的咨询服务旨在帮助企业优化IT资源配置，降低技术风险，提升IT投资回报率。',
          image: 'https://picsum.photos/seed/service4/800/400',
          features: [
            'IT战略规划',
            '系统架构设计',
            '技术选型评估',
            'IT项目管理',
            'IT运维优化'
          ]
        },
        '5': {
          id: '5',
          title: '云服务与基础设施',
          description: '我们提供全方位的云服务和基础设施解决方案，帮助企业快速实现IT基础设施的现代化。我们的服务包括云迁移、云架构设计、云安全管理等，支持多种云平台如阿里云、腾讯云、AWS等。通过采用云技术，企业可以降低IT运维成本，提高系统弹性和可扩展性，加速业务创新和数字化转型。',
          image: 'https://picsum.photos/seed/service5/800/400',
          features: [
            '云迁移服务',
            '云架构设计',
            '云安全管理',
            '混合云解决方案',
            '容器化部署'
          ]
        },
        '6': {
          id: '6',
          title: '人工智能应用开发',
          description: '我们专注于人工智能应用开发，为企业提供智能解决方案，提升业务效率和竞争力。我们的服务包括机器学习模型开发、自然语言处理、计算机视觉应用等，帮助企业实现业务流程自动化、智能决策支持、客户服务升级等。我们的AI团队拥有深厚的技术积累，能够将前沿的AI技术转化为实际的业务价值。',
          image: 'https://picsum.photos/seed/service6/800/400',
          features: [
            '机器学习模型开发',
            '自然语言处理应用',
            '计算机视觉解决方案',
            '智能推荐系统',
            'AI系统集成'
          ]
        }
      }
      
      return serviceMap[id] || {
        id,
        title: '定制服务',
        description: '根据您的具体需求，我们可以提供定制化的解决方案。请联系我们了解更多详情。',
        image: 'https://picsum.photos/seed/service-default/800/400'
      }
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style scoped>
.service-detail-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.page-header {
  background: linear-gradient(135deg, #1677ff 0%, #0c56d0 100%);
  color: white;
  padding: 100px 0;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
}

.page-header p {
  font-size: 1.2em;
  opacity: 0.9;
}

.service-content {
  background: white;
  margin-top: -30px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 40px;
}

.service-intro {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 50px;
}

.service-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

.service-description h2 {
  font-size: 2em;
  color: #333;
  margin-bottom: 20px;
}

.service-description p {
  font-size: 1.1em;
  line-height: 1.8;
  color: #555;
}

.service-features {
  margin-bottom: 50px;
}

.service-features h3 {
  font-size: 1.5em;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #1677ff;
}

.feature-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 1.1em;
  color: #555;
}

.feature-icon {
  background: #1677ff;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 0.9em;
}

.service-advantages {
  margin-bottom: 50px;
}

.service-advantages h3 {
  font-size: 1.5em;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #1677ff;
}

.advantage-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.advantage-card {
  background: #f8f9fa;
  padding: 30px;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.advantage-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.advantage-icon {
  background: #1677ff;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  font-size: 1.3em;
  font-weight: bold;
}

.advantage-card h4 {
  font-size: 1.3em;
  color: #333;
  margin-bottom: 10px;
}

.advantage-card p {
  color: #555;
  line-height: 1.6;
}

.service-cases {
  margin-bottom: 50px;
}

.service-cases h3 {
  font-size: 1.5em;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #1677ff;
}

.case-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.case-card {
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.case-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.case-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.case-card h4 {
  padding: 20px;
  color: #333;
  margin: 0;
}

.view-case {
  display: block;
  background: #1677ff;
  color: white;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  transition: background 0.3s ease;
}

.view-case:hover {
  background: #0c56d0;
}

.contact-cta {
  background: linear-gradient(135deg, #1677ff 0%, #0c56d0 100%);
  color: white;
  padding: 40px;
  border-radius: 8px;
  text-align: center;
}

.cta-content h3 {
  font-size: 1.8em;
  margin-bottom: 15px;
}

.cta-content p {
  font-size: 1.1em;
  margin-bottom: 25px;
  opacity: 0.9;
}

.contact-button {
  display: inline-block;
  background: white;
  color: #1677ff;
  padding: 12px 30px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
}

.contact-button:hover {
  background: #f0f0f0;
  transform: scale(1.05);
}

.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: #1677ff;
  color: white;
  padding: 12px 20px;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(22, 119, 255, 0.3);
  transition: all 0.3s ease;
  z-index: 1000;
}

.back-to-top:hover {
  background: #0c56d0;
  transform: translateY(-3px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-header {
    padding: 0 0 40px 0;
  }
  
  .page-header h1 {
    font-size: 2em;
  }
  
  .service-content {
    padding: 20px;
  }
  
  .service-description h2 {
    font-size: 1.8em;
  }
  
  .advantage-cards,
  .case-cards {
    grid-template-columns: 1fr;
  }
  
  .back-to-top {
    bottom: 20px;
    right: 20px;
    padding: 10px 15px;
  }
}
</style>