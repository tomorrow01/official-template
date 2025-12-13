import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'  // 新增：导入后台主页
import Articles from '../views/Articles.vue'    // 新增：文章管理页
import Banners from '../views/Banners.vue'      // 新增：轮播图管理页
import Content from '../views/Content.vue'      // 新增：内容管理页
import LatestNews from '../views/LatestNews.vue' // 新增：最新动态管理页
import CasesManagement from '../views/CasesManagement.vue' // 新增：客户案例管理页
import ConfigManagement from '../views/ConfigManagement.vue'  // 新增：配置管理页

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  // 新增：后台主页及子路由
  { 
    path: '/dashboard', 
    component: Dashboard,
    redirect: '/dashboard/config', // 默认重定向到配置管理
    children: [
      { path: 'config', component: ConfigManagement },  // 新增：配置管理路由
      { path: 'articles', component: Articles },   // 文章管理
      { path: 'banners', component: Banners },     // 轮播图管理
      { path: 'content', component: Content },     // 内容管理
      { path: 'services', name: 'ServicesManagement', component: () => import('../views/Services.vue'), meta: { title: '核心服务管理' } },     // 核心服务管理
      { path: 'cases', name: 'CasesManagement', component: CasesManagement, meta: { title: '客户案例管理' } },           // 客户案例管理
      { path: 'latest-news', component: LatestNews },                             // 最新动态管理
      { path: 'contacts', component: () => import('../views/Contacts.vue') }      // 联系表单管理
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫：验证登录状态
router.beforeEach((to, from, next) => {
  // 不需要登录的页面（白名单）
  const whiteList = ['/login', '/'];
  
  try {
    // 获取token
    const token = localStorage.getItem('admin-token');
    
    // 如果用户已登录
    if (token) {
      if (to.path === '/login' || to.path === '/') {
        // 已登录的用户访问登录页或根路径，重定向到后台首页
        next('/dashboard');
      } else {
        // 已登录的用户访问后台页面，直接通过
        next();
      }
    } else {
      // 未登录的用户
      if (whiteList.includes(to.path)) {
        // 访问白名单页面，直接通过
        next();
      } else {
        // 访问需要登录的页面，重定向到登录页
        next('/login');
      }
    }
  } catch (error) {
    console.error('路由守卫错误:', error);
    // 如果出现错误，重定向到登录页
    next('/login');
  }
});

export default router