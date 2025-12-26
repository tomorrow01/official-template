<template>
  <footer class="footer">
    <!-- 背景 -->
    <div class="footer-bg"></div>
    
    <div class="footer-container">
      <!-- 主要内容区 - 参考IoT设计 -->
      <div class="footer-content">
        <div class="footer-main">
          <div class="footer-brand">
            <NuxtLink to="/" class="footer-logo flex items-center mb-6">
              <img 
                :src="companyLogo || '/images/logo.png'" 
                alt="官网logo" 
                class="h-12"
              >
              <!-- 移除文字，只保留logo图片 -->
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <!-- 导航链接区域 - 参考美的IoT的多列布局 -->
      <div class="footer-nav">
        <div class="nav-column">
          <h4 class="nav-title text-lg font-semibold mb-4 text-white">关于我们</h4>
          <ul class="nav-links space-y-3">
            <li><NuxtLink to="/about" class="nav-link text-white hover:text-gray-300">公司简介</NuxtLink></li>
            <li><a href="#" class="nav-link text-white hover:text-gray-300">发展历程</a></li>
            <li><a href="#" class="nav-link text-white hover:text-gray-300">企业文化</a></li>
            <li><a href="#" class="nav-link text-white hover:text-gray-300">团队介绍</a></li>
          </ul>
        </div>
        
        <div class="nav-column">
          <h4 class="nav-title text-lg font-semibold mb-4 text-white">产品服务</h4>
          <ul class="nav-links space-y-3">
            <li><NuxtLink to="/services" class="nav-link text-white hover:text-gray-300">服务项目</NuxtLink></li>
            <li><NuxtLink to="/cases" class="nav-link text-white hover:text-gray-300">成功案例</NuxtLink></li>
            <li><a href="#" class="nav-link text-white hover:text-gray-300">解决方案</a></li>
            <li><a href="#" class="nav-link text-white hover:text-gray-300">技术支持</a></li>
          </ul>
        </div>
        
        <div class="nav-column">
          <h4 class="nav-title text-lg font-semibold mb-4 text-white">新闻资讯</h4>
          <ul class="nav-links space-y-3">
            <li><NuxtLink to="/articles" class="nav-link text-white hover:text-gray-300">资讯中心</NuxtLink></li>
            <li><a href="#" class="nav-link text-white hover:text-gray-300">公司动态</a></li>
            <li><a href="#" class="nav-link text-white hover:text-gray-300">行业资讯</a></li>
            <li><a href="#" class="nav-link text-white hover:text-gray-300">活动公告</a></li>
          </ul>
        </div>
        
        <div class="nav-column">
          <h4 class="nav-title text-lg font-semibold mb-4 text-white">联系我们</h4>
          <ul class="nav-links space-y-3">
            <li><NuxtLink to="/contact" class="nav-link text-white hover:text-gray-300">联系方式</NuxtLink></li>
            <li><a href="#" class="nav-link text-white hover:text-gray-300">加入我们</a></li>
            <li><a href="#" class="nav-link text-white hover:text-gray-300">意见反馈</a></li>
            <li><a href="#" class="nav-link text-white hover:text-gray-300">常见问题</a></li>
          </ul>
        </div>
        
        <div class="nav-column">
          <h4 class="nav-title text-lg font-semibold mb-4 text-white">友情链接</h4>
          <ul class="nav-links space-y-3">
            <li><a href="#" class="nav-link text-white hover:text-gray-300">集团</a></li>
            <li><a href="#" class="nav-link text-white hover:text-gray-300">商城</a></li>
            <li><a href="#" class="nav-link text-white hover:text-gray-300">合作伙伴1</a></li>
            <li><a href="#" class="nav-link text-white hover:text-gray-300">合作伙伴2</a></li>
          </ul>
        </div>
      </div>
      
      <!-- 分隔线 -->
      <div class="footer-divider my-8 bg-white/20 h-[1px]"></div>
      
      <!-- 底部信息 - 参考美的IoT设计 -->
      <!-- 注意：此Footer组件中不包含登录模块 -->
      <div class="footer-bottom">
        <div class="footer-copyright text-center">
          <p class="mb-4 text-white">© 2024 明日科技. 保留所有权利.</p>
          <div class="footer-links flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href="#" class="footer-link text-white hover:text-gray-300">隐私政策</a>
            <a href="#" class="footer-link text-white hover:text-gray-300">服务条款</a>
            <a href="#" class="footer-link text-white hover:text-gray-300">网站地图</a>
          </div>
          <div class="footer-info mt-4">
            <span class="text-white mr-6">粤ICP备09215446号</span>
            <span class="text-white">粤公网安备 44060602000243号</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// 美的IoT风格的Footer组件
// 简化了脚本部分，移除了订阅功能，专注于导航和链接展示
import { ref, onMounted } from 'vue'
import request from '../api/request'

// 公司logo
const companyLogo = ref('')

// 获取公司logo
const fetchCompanyLogo = async () => {
  try {
    console.log('Footer - 开始获取公司logo...')
    const response = await request.get('/configs/key/company_logo')
    console.log('Footer - 获取公司logo响应:', response)
    console.log('Footer - 响应类型:', typeof response)
    
    // 简化响应处理逻辑，直接获取value属性
    if (response && response.value) {
      companyLogo.value = response.value
      console.log('Footer - 使用response.value作为logo:', response.value.substring(0, 50) + '...')
    } 
    // 处理响应拦截器可能返回的直接数据对象
    else if (response && typeof response === 'object') {
      console.log('Footer - 响应是对象，检查属性:', Object.keys(response))
      // 检查是否是配置对象
      if (response.key === 'company_logo') {
        companyLogo.value = response.value
        console.log('Footer - 使用配置对象的value作为logo:', response.value.substring(0, 50) + '...')
      } else {
        console.log('Footer - 响应不是配置对象，使用默认logo')
        companyLogo.value = ''
      }
    }
    
    console.log('Footer - 当前companyLogo:', companyLogo.value ? companyLogo.value.substring(0, 50) + '...' : '空')
  } catch (error) {
    console.error('Footer - 获取公司logo失败:', error)
    console.error('Footer - 错误详情:', error.response || error.message || error)
    // 使用默认logo
    companyLogo.value = ''
  }
}

// 组件挂载时获取logo
onMounted(() => {
  fetchCompanyLogo()
})
</script>

<style scoped>
  /* 容器样式，限制内容最大宽度但不限制背景 */
  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
    z-index: 1;
  }
.footer {
  position: relative;
  width: 100%;
  color: white;
  padding: 3rem 0 2rem;
  background-color: #0a0a0a;
  left: 0;
  right: 0;
}

.footer-bg {
  position: absolute;
  inset: 0;
  background-color: #0a0a0a;
  z-index: 0;
}

.footer-content {
  position: relative;
  z-index: 1;
  margin-bottom: 2rem;
}

.footer-logo img {
  /* 移除可能导致logo显示异常的滤镜效果，让logo显示本来的颜色 */
  filter: none;
  /* 确保logo在深色背景上可见 */
  max-height: 48px;
  object-fit: contain;
}

/* 导航链接区域样式 */
.footer-nav {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  gap: 1rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
  max-width: 100%;
}

.nav-column {
  margin-bottom: 1rem;
}

.nav-title {
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
}

.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-link {
  display: inline-block;
  padding: 0.5rem 0;
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.95rem;
}

.nav-link:hover {
  color: #cccccc;
}

/* 友情链接区域使用与导航列相同的样式 */

/* 分隔线样式 */
.footer-divider {
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 2rem 0;
  position: relative;
  z-index: 1;
}

/* 底部信息样式 */
.footer-bottom {
  position: relative;
  z-index: 1;
  text-align: center;
}

.footer-copyright p {
  margin-bottom: 1rem;
  color: white;
  font-size: 0.9rem;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.footer-link {
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #cccccc;
}

.footer-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: white;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer {
    padding: 2rem 0 1.5rem;
  }
  
  .footer-nav {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  .nav-title {
    font-size: 1.1rem;
  }
  
  .nav-link {
    font-size: 0.9rem;
  }
  
  .friendlinks-content {
    gap: 0.8rem;
  }
  
  .friendlink {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
  
  .footer-links {
    gap: 1rem;
  }
  
  .footer-info {
    flex-direction: column;
    gap: 0.8rem;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .footer-nav {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
  
  .nav-column {
    margin-bottom: 0.5rem;
  }
  
  .friendlinks-content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .friendlink {
    padding: 0.3rem 0;
  }
}
</style>