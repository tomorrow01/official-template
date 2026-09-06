import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '../utils/api'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Articles from '../views/Articles.vue'
import Banners from '../views/Banners.vue'
import Content from '../views/Content.vue'
import LatestNews from '../views/LatestNews.vue'
import CasesManagement from '../views/CasesManagement.vue'
import ConfigManagement from '../views/ConfigManagement.vue'
import AccountManage from '../views/AccountManage.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login, meta: { public: true } },
  { 
    path: '/dashboard', 
    component: Dashboard,
    redirect: '/dashboard/config',
    children: [
      { path: 'config', component: ConfigManagement },
      { path: 'articles', component: Articles },
      { path: 'banners', component: Banners },
      { path: 'content', component: Content },
      { path: 'services', name: 'ServicesManagement', component: () => import('../views/Services.vue'), meta: { title: '核心服务管理' } },
      { path: 'cases', name: 'CasesManagement', component: CasesManagement, meta: { title: '客户案例管理' } },
      { path: 'latest-news', component: LatestNews },
      { path: 'contacts', component: () => import('../views/Contacts.vue') },
      { path: 'account', component: AccountManage, meta: { adminOnly: true } }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ===== 全局路由守卫 =====
router.beforeEach((to, from, next) => {
  const token = getToken();

  // 公开路由（登录页）：已登录就跳 dashboard
  if (to.meta.public) {
    if (token) {
      next('/dashboard');
    } else {
      next();
    }
    return;
  }

  // 非公开路由：没 token 去登录
  if (!token) {
    next({ path: '/login', query: { redirect: to.fullPath } });
    return;
  }

  next();
})

export default router
