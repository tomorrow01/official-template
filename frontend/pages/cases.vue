<template>
  <div class="cases-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">客户案例</h1>
        <p class="page-subtitle">探索我们如何帮助不同行业的客户实现业务目标</p>
      </div>
    </div>
    
    <!-- 案例列表 -->
    <div class="cases-section">
      <div class="container">
        <!-- 加载状态 -->
        <div v-if="loading" class="loading-container">
          <el-loading v-loading="loading" element-loading-text="正在加载案例..." />
        </div>
        
        <!-- 案例网格 -->
        <div v-else-if="cases.length > 0" class="cases-grid">
          <div v-for="caseItem in cases" :key="caseItem.id" class="case-card">
            <div class="case-image-container">
              <img :src="caseItem.image" :alt="caseItem.description" class="case-image">
            </div>
            <div class="case-info">
              <h3 class="case-title">{{ caseItem.description || '客户案例' }}</h3>
              <el-button type="primary" size="small" @click="viewCaseDetail(caseItem.id)">
                查看详情
              </el-button>
            </div>
          </div>
        </div>
        
        <!-- 无数据状态 -->
        <div v-else class="empty-container">
          <el-empty description="暂无客户案例数据" />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getCaseList } from '@/api/cases';
import Footer from '@/components/Footer.vue';
import Navbar from '@/components/Navbar.vue';

const CaseItem = {
  id: String,
  image: String,
  description: String,
  isActive: Boolean
}

const router = useRouter();
const cases = ref([]);
const loading = ref(true);
const error = ref(null);

// 获取客户案例列表
const fetchCaseList = async () => {
  loading.value = true;
  error.value = null;
  try {
    console.log('开始获取客户案例列表...');
    const res = await getCaseList();
    
    // 正确提取数据，确保数据格式一致
    cases.value = Array.isArray(res) ? res : (res.data || []).filter(item => item && item.isActive !== false);
    console.log('获取到的客户案例列表:', cases.value);
    
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
          description: 'ZZ金融平台使用我们的解决方案，转化率提升28%'
        },
        {
          id: '4',
          image: '/images/case4.png',
          description: 'AA医疗系统部署我们的应用，用户满意度提高42%'
        }
      ];
    }
  } catch (err) {
    console.error('获取客户案例列表失败:', err);
    error.value = '获取客户案例列表失败，请稍后重试';
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
        description: 'ZZ金融平台使用我们的解决方案，转化率提升28%'
      },
      {
        id: '4',
        image: '/images/case4.png',
        description: 'AA医疗系统部署我们的应用，用户满意度提高42%'
      }
    ];
  } finally {
    loading.value = false;
  }
};

// 查看案例详情（暂时返回首页，后续可以实现案例详情页面）
const viewCaseDetail = (id) => {
  router.push('/');
};

// 页面加载时获取案例列表
onMounted(() => {
  fetchCaseList();
});
</script>

<style scoped>
.cases-page {
  background: var(--bg-base);
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 100px 0;
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

.cases-section {
  padding: 60px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.case-card {
  background: var(--bg-container);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-light);
  transition: transform 0.3s, box-shadow 0.3s;
}

.case-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-medium);
}

.case-image-container {
  height: 200px;
  overflow: hidden;
}

.case-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.case-card:hover .case-image {
  transform: scale(1.05);
}

.case-info {
  padding: 20px;
  text-align: center;
}

.case-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
  line-height: 1.4;
}

.loading-container,
.empty-container {
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  .page-header {
    padding: 60px 0;
  }
  
  .page-title {
    font-size: 32px;
  }
  
  .cases-grid {
    grid-template-columns: 1fr;
  }
}
</style>