<template>
  <footer class="footer">
    <!-- 背景渐变和装饰 -->
    <div class="footer-bg"></div>
    
    <div class="container">
      <!-- 主要内容区 -->
      <div class="footer-content">
        <!-- 品牌信息 -->
        <div class="footer-brand">
          <NuxtLink to="/" class="footer-logo flex items-center mb-6 group">
            <img 
              src="/images/logo.png" 
              alt="官网logo" 
              class="h-12 transition-transform duration-300 group-hover:scale-105"
            >
            <span class="ml-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              明日科技
            </span>
          </NuxtLink>
          <p class="text-white mb-8 max-w-md leading-relaxed">
            专注于企业级内容管理解决方案，助力客户高效运营数字内容，
            提升品牌影响力和用户体验，为企业数字化转型提供全方位支持。
          </p>
          <div class="social-links flex space-x-5">
            <a 
              href="#" 
              class="social-link w-12 h-12 rounded-lg bg-white/5 backdrop-blur-sm flex items-center justify-center 
                     hover:bg-primary hover:scale-105 transition-all duration-300" 
              aria-label="微信"
            >
              <span class="text-white text-xl">📱</span>
            </a>
            <a 
              href="#" 
              class="social-link w-12 h-12 rounded-lg bg-white/5 backdrop-blur-sm flex items-center justify-center 
                     hover:bg-primary hover:scale-105 transition-all duration-300" 
              aria-label="微博"
            >
              <span class="text-white text-xl">📢</span>
            </a>
            <a 
              href="#" 
              class="social-link w-12 h-12 rounded-lg bg-white/5 backdrop-blur-sm flex items-center justify-center 
                     hover:bg-primary hover:scale-105 transition-all duration-300" 
              aria-label="LinkedIn"
            >
              <span class="text-white text-xl">🔗</span>
            </a>
          </div>
        </div>
        
        <!-- 快速链接 -->
        <div class="footer-section">
          <h4 class="footer-heading text-xl font-semibold mb-6 text-white">
            <span class="relative inline-block">
              快速链接
              <span class="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></span>
            </span>
          </h4>
          <ul class="space-y-4">
            <li><NuxtLink to="/" class="footer-link text-white hover:text-white group">
              首页
              <span class="inline-block w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></span>
            </NuxtLink></li>
            <li><NuxtLink to="/about" class="footer-link text-white hover:text-white group">
              公司简介
              <span class="inline-block w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></span>
            </NuxtLink></li>
            <li><NuxtLink to="/services" class="footer-link text-white hover:text-white group">
              服务项目
              <span class="inline-block w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></span>
            </NuxtLink></li>
            <li><NuxtLink to="/cases" class="footer-link text-white hover:text-white group">
              成功案例
              <span class="inline-block w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></span>
            </NuxtLink></li>
            <li><NuxtLink to="/articles" class="footer-link text-white hover:text-white group">
              资讯中心
              <span class="inline-block w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></span>
            </NuxtLink></li>
          </ul>
        </div>
        
        <!-- 联系我们 -->
        <div class="footer-section">
          <h4 class="footer-heading text-xl font-semibold mb-6 text-white">
            <span class="relative inline-block">
              联系我们
              <span class="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></span>
            </span>
          </h4>
          <ul class="space-y-5">
            <li class="flex items-start group">
              <span class="text-primary mr-4 mt-1">📍</span>
              <span class="text-white group-hover:text-white transition-colors">
                北京市朝阳区建国路88号<br>现代国际大厦A座25层
              </span>
            </li>
            <li class="flex items-center group">
              <span class="text-primary mr-4">📞</span>
              <a href="tel:4001234567" class="text-white hover:text-white transition-colors" style="color: white !important;">
                400-123-4567
              </a>
            </li>
            <li class="flex items-center group">
              <span class="text-primary mr-4">✉️</span>
              <a href="mailto:contact@example.com" class="text-white hover:text-white transition-colors" style="color: white !important;">
                contact@example.com
              </a>
            </li>
          </ul>
        </div>
        
        <!-- 订阅区域 -->
        <div class="footer-section">
          <h4 class="footer-heading text-xl font-semibold mb-6 text-white">
            <span class="relative inline-block">
              订阅通讯
              <span class="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></span>
            </span>
          </h4>
          <p class="text-white mb-5">
            订阅我们的通讯，获取最新动态和行业资讯，率先了解我们的新产品和服务。
          </p>
          <form class="newsletter-form" @submit.prevent="handleSubscribe">
            <div class="relative">
              <input 
                v-model="email" 
                type="email" 
                placeholder="您的邮箱地址" 
                class="w-full px-5 py-4 bg-white/10 backdrop-blur-sm border border-white/20 
                       text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                required
              />
              <button 
                type="submit" 
                class="absolute right-2 top-1/2 transform -translate-y-1/2 px-5 py-2 bg-primary hover:bg-primary-dark 
                       text-white rounded-lg transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
              >
                订阅
              </button>
            </div>
            <p class="text-gray-400 text-sm mt-3">
              我们尊重您的隐私，不会向第三方分享您的信息
            </p>
          </form>
        </div>
      </div>
      
      <!-- 分隔线 -->
      <div class="footer-divider my-10 bg-white/10 h-[1px]"></div>
      
      <!-- 底部信息 -->
      <div class="footer-bottom">
        <div class="footer-copyright text-center text-gray-400">
          <p class="text-lg mb-4">© 2024 明日科技. 保留所有权利.</p>
          <div class="footer-terms flex flex-wrap justify-center gap-x-6 gap-y-3">
            <a href="#" class="footer-term text-white hover:text-white transition-colors relative inline-block" style="color: white !important;">
              隐私政策
              <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 hover:w-full"></span>
            </a>
            <a href="#" class="footer-term text-white hover:text-white transition-colors relative inline-block" style="color: white !important;">
              服务条款
              <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 hover:w-full"></span>
            </a>
            <a href="#" class="footer-term text-white hover:text-white transition-colors relative inline-block" style="color: white !important;">
              网站地图
              <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 hover:w-full"></span>
            </a>
            <span class="text-gray-500">备案号：京ICP备XXXXXXX号-1</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 装饰元素 -->
    <div class="footer-decorations pointer-events-none">
      <!-- 左侧装饰 -->
      <div class="decoration-left absolute top-0 left-0 w-1/3 h-1/2 bg-primary/10 rounded-full blur-[100px]
           transform -translate-x-1/2 -translate-y-1/2"></div>
      <!-- 右侧装饰 -->
      <div class="decoration-right absolute bottom-0 right-0 w-1/3 h-1/2 bg-secondary/10 rounded-full blur-[100px]
           transform translate-x-1/2 translate-y-1/2"></div>
      <!-- 中央装饰 -->
      <div class="decoration-center absolute top-1/2 left-1/2 w-1/2 h-1/2 bg-tertiary/5 rounded-full blur-[120px]
           transform -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');

// 处理订阅逻辑
const handleSubscribe = () => {
  // 这里可以添加实际的订阅逻辑
  if (email.value) {
    console.log('订阅邮箱:', email.value);
    // 可以在这里添加API调用
    email.value = '';
    // 可以显示成功提示
  }
};
</script>

<style scoped>
.footer {
  position: relative;
  color: white;
  padding: 5rem 0 3rem;
  overflow: hidden;
}

.footer-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #121212 0%, #1a1a1a 100%);
  z-index: 0;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  position: relative;
  z-index: 1;
}

.footer-brand {
  display: flex;
  flex-direction: column;
}

.footer-logo img {
  filter: brightness(0) invert(1);
}

.footer-section h4 {
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.footer-link {
  display: inline-block;
  position: relative;
  padding-bottom: 0.25rem;
  font-size: 1rem;
  color: white !important;
  text-decoration: none !important;
}

.footer-link:hover {
  color: white !important;
}

.footer-term {
  color: white !important;
  text-decoration: none !important;
}

.footer-term:hover {
  color: white !important;
}

/* 确保所有链接都显示为白色 */
.footer a {
  color: white !important;
  text-decoration: none !important;
}

.footer a:hover {
  color: white !important;
  text-decoration: none !important;
}

.footer-link span {
  position: absolute;
  bottom: 0;
  left: 0;
  transition: width 0.3s ease;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.social-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px -5px rgba(255, 255, 255, 0.1);
}

.newsletter-form {
  width: 100%;
}

.newsletter-form input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.footer-divider {
  width: 100%;
  position: relative;
  z-index: 1;
}

.footer-bottom {
  position: relative;
  z-index: 1;
}

.footer-terms {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
}

.footer-term {
  font-size: 0.9rem;
  color: white;
}

.footer-decorations {
  position: absolute;
  inset: 0;
  z-index: 0;
}

/* 响应式设计 */
@media (min-width: 768px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .footer-content {
    grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
  }
}

@media (max-width: 767px) {
  .footer {
    padding: 3rem 0 2rem;
  }
  
  .footer-content {
    gap: 3rem;
  }
  
  .footer-heading {
    font-size: 1.25rem;
  }
  
  .footer-logo img {
    height: 10px;
  }
  
  .social-links {
    justify-content: center;
  }
}

/* 动画效果 */
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.decoration-left,
.decoration-right,
.decoration-center {
  animation: float 8s ease-in-out infinite;
}

.decoration-right {
  animation-delay: 2s;
}

.decoration-center {
  animation-delay: 4s;
}

/* 响应式设计 */
@media (min-width: 768px) {
  .footer-top {
    grid-template-columns: repeat(2, 1fr);
    text-align: left;
  }
  
  .footer-brand {
    text-align: left;
  }
}

@media (min-width: 1024px) {
  .footer-top {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 767px) {
  .footer-top {
    gap: var(--spacing-xl);
  }
  
  .footer-heading {
    text-align: center;
    font-size: 1.125rem;
  }
  
  .footer-heading::after {
    left: 50% !important;
    transform: translateX(-50%) !important;
  }
  
  .footer-links ul,
  .footer-contact ul {
    text-align: center;
  }
  
  .social-links {
    justify-content: center;
  }
  
  .newsletter-form {
    max-width: 300px;
    margin: 0 auto;
  }
}
</style>