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
      { path: 'services', component: () => import('../views/Services.vue') },     // 服务管理
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

export default router