<template>
  <footer class="footer bg-dark text-white">
    <div class="container">
      <!-- 上部分：主要内容 -->
      <div class="footer-top py-16">
        <div class="footer-brand mb-12 md:mb-0">
          <NuxtLink to="/" class="footer-logo flex items-center mb-6">
            <img src="/images/logo.png" alt="官网logo" class="h-10">
            <span class="ml-3 text-xl font-bold">品牌名称</span>
          </NuxtLink>
          <p class="text-gray-400 max-w-xs mb-6">
            专注于企业级内容管理解决方案，助力客户高效运营数字内容，
            提升品牌影响力和用户体验。
          </p>
          <div class="social-links flex space-x-4">
            <a href="#" class="social-link w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-all" aria-label="微信">
              <el-icon><ChatLineSquare /></el-icon>
            </a>
            <a href="#" class="social-link w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-all" aria-label="微博">
              <el-icon><Document /></el-icon>
            </a>
            <a href="#" class="social-link w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-all" aria-label="LinkedIn">
              <el-icon><Link /></el-icon>
            </a>
          </div>
        </div>
        
        <div class="footer-links">
          <h4 class="footer-heading text-lg font-semibold mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-12 after:h-1 after:bg-primary">
            快速链接
          </h4>
          <ul class="space-y-4">
            <li><NuxtLink to="/" class="text-gray-400 hover:text-primary transition-colors">首页</NuxtLink></li>
            <li><NuxtLink to="/about" class="text-gray-400 hover:text-primary transition-colors">关于我们</NuxtLink></li>
            <li><NuxtLink to="/services" class="text-gray-400 hover:text-primary transition-colors">核心服务</NuxtLink></li>
            <li><NuxtLink to="/cases" class="text-gray-400 hover:text-primary transition-colors">客户案例</NuxtLink></li>
            <li><NuxtLink to="/articles" class="text-gray-400 hover:text-primary transition-colors">最新动态</NuxtLink></li>
            <li><NuxtLink to="/contact" class="text-gray-400 hover:text-primary transition-colors">联系我们</NuxtLink></li>
          </ul>
        </div>
        
        <div class="footer-contact">
          <h4 class="footer-heading text-lg font-semibold mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-12 after:h-1 after:bg-primary">
            联系我们
          </h4>
          <ul class="space-y-6">
            <li class="flex items-start">
              <el-icon class="text-primary mr-4 mt-1"><Location /></el-icon>
              <span class="text-gray-400">北京市朝阳区建国路88号<br>现代国际大厦A座25层</span>
            </li>
            <li class="flex items-center">
              <el-icon class="text-primary mr-4"><Phone /></el-icon>
              <span class="text-gray-400">400-123-4567</span>
            </li>
            <li class="flex items-center">
              <el-icon class="text-primary mr-4"><Mail /></el-icon>
              <span class="text-gray-400">contact@example.com</span>
            </li>
          </ul>
        </div>
        
        <div class="footer-newsletter">
          <h4 class="footer-heading text-lg font-semibold mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-12 after:h-1 after:bg-primary">
            订阅通讯
          </h4>
          <p class="text-gray-400 mb-4">订阅我们的通讯，获取最新动态和行业资讯</p>
          <div class="newsletter-form flex flex-col sm:flex-row gap-3">
            <el-input 
              v-model="email" 
              placeholder="您的邮箱地址" 
              class="bg-white/10 border-white/20 text-white rounded-full"
              prefix-icon="el-icon-mail"
            />
            <el-button type="primary" class="rounded-full bg-primary hover:bg-primary-dark">
              订阅
            </el-button>
          </div>
        </div>
      </div>
      
      <!-- 下部分：版权信息 -->
      <div class="footer-bottom border-t border-white/10 pt-8 pb-4">
        <div class="footer-copyright text-gray-500 text-center text-sm">
          <p>© 2024 品牌名称. 保留所有权利.</p>
          <p class="mt-2">
            <a href="#" class="hover:text-primary transition-colors mx-2">隐私政策</a>
            <span>|</span>
            <a href="#" class="hover:text-primary transition-colors mx-2">服务条款</a>
            <span>|</span>
            <a href="#" class="hover:text-primary transition-colors mx-2">网站地图</a>
          </p>
          <p class="mt-2">备案号：京ICP备XXXXXXX号-1</p>
        </div>
      </div>
    </div>
    
    <!-- 装饰元素 -->
    <div class="decorative-elements pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div class="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
</script>

<style scoped>
.footer {
  position: relative;
  background-color: var(--bg-dark);
  color: var(--text-light);
  padding-top: var(--spacing-2xl);
  padding-bottom: var(--spacing-lg);
  overflow: hidden;
}

.footer-top {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-2xl);
  position: relative;
  z-index: 1;
}

.footer-brand {
  text-align: center;
}

.footer-logo img {
  height: 40px;
  filter: brightness(0) invert(1); /* 确保logo在深色背景下可见 */
}

.footer-heading {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-light);
  margin-bottom: var(--spacing-lg);
}

.footer-links ul,
.footer-contact ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links a,
.footer-contact span {
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer-links a:hover {
  color: var(--primary-color);
}

.social-link {
  color: var(--text-light);
  transition: all var(--transition-normal);
}

.social-link:hover {
  background-color: var(--primary-color);
  transform: translateY(-3px);
}

.newsletter-form {
  width: 100%;
}

.newsletter-form .el-input__inner {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  color: white;
}

.newsletter-form .el-input__inner::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.newsletter-form .el-button {
  min-width: 100px;
  border-radius: var(--radius-full);
}

.footer-bottom {
  margin-top: var(--spacing-xl);
  position: relative;
  z-index: 1;
}

.decorative-elements {
  z-index: 0;
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