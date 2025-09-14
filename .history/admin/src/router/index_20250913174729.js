import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'  // 新增：导入后台主页
import Articles from '../views/Articles.vue'    // 新增：文章管理页
import Banners from '../views/Banners.vue'      // 新增：轮播图管理页
import Content from '../views/Content.vue'      // 新增：内容管理页

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  // 新增：后台主页及子路由
  { 
    path: '/dashboard', 
    component: Dashboard,
    children: [
      { path: 'articles', component: Articles },   // 文章管理
      { path: 'banners', component: Banners },     // 轮播图管理
      { path: 'content', component: Content },      // 内容管理
      { path: 'services', component: () => import('../views/Services.vue') },     // 服务管理
      { path: 'cases', component: () => import('../views/Cases.vue') }           // 案例管理
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router