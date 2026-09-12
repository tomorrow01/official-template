import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from '../router';

// 本地存储 token 的 key
const TOKEN_KEY = 'admin-token';
const USER_KEY = 'admin-user';

// 创建axios实例
const api = axios.create({
  baseURL: '',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器：注入 Bearer token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器：统一处理 401 + 错误提示
api.interceptors.response.use(
  response => {
    // 后端返回 { code, data, error } 结构
    const res = response.data;
    const isLoginEndpoint = response.config.url?.includes('/auth/login');
    if (res && typeof res === 'object' && 'code' in res) {
      if (res.code === 401) {
        handle401(res.error || '未授权', isLoginEndpoint);
        return Promise.reject(new Error(res.error || '未授权'));
      }
      if (res.code === 403) {
        ElMessage.error(res.error || '权限不足');
        return Promise.reject(new Error(res.error || '权限不足'));
      }
      if (res.code >= 400) {
        ElMessage.error(res.error || '请求失败');
        return Promise.reject(new Error(res.error || '请求失败'));
      }
    }
    return res;
  },
  error => {
    if (error.response) {
      const status = error.response.status;
      const msg = error.response.data?.error || error.response.data?.message || `请求失败 (${status})`;
      const isLoginEndpoint = error.config?.url?.includes('/auth/login');

      if (status === 401) {
        handle401(msg, isLoginEndpoint);
      } else if (status === 403) {
        ElMessage.error(msg || '权限不足');
      } else {
        ElMessage.error(msg);
      }
    } else if (error.request) {
      ElMessage.error('网络错误，请检查网络连接');
    } else {
      ElMessage.error('请求配置错误');
    }
    return Promise.reject(error);
  }
);

// 处理 401：toast 提示登录态失效 + 清 token + 跳登录页
// 用标记位防止多个并发请求同时 401 时重复弹 toast / 重复跳转
let isHandling401 = false;
function handle401(msg, isAuthEndpoint = false) {
  // 登录接口本身返回 401 说明用户名密码错，不该清 token 也不该跳页
  if (isAuthEndpoint) {
    ElMessage.error(msg || '用户名或密码错误');
    return;
  }
  // 其他接口的 401 才算登录态过期
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);

  const currentPath = router.currentRoute.value.path;
  if (currentPath === '/login') return;
  if (isHandling401) return;
  isHandling401 = true;

  ElMessage.warning('登录态已失效，请重新登录');
  router.push({
    path: '/login',
    query: { redirect: currentPath }
  }).finally(() => {
    // 跳转完成后解锁，保留短暂延迟避免极端情况下的并发重复提示
    setTimeout(() => { isHandling401 = false; }, 500);
  });
}

// ===== 通用方法 =====
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY)) || null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// ===== 文件上传 API =====
// 必须走统一的 api 实例（自动带 token + 统一 401 处理），
// 不要在组件里用裸 axios，否则登录态过期时上传只会报“上传失败”，不会提示并跳登录页
export const uploadAPI = {
  // 上传图片，成功后返回图片地址（如 /uploads/xxx.jpg）
  async uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    // 拦截器已解包，res 直接是后端返回体 { errno: 0, data: [url] }
    const res = await api.post('/api/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 15000
    });
    return res?.data?.[0] || '';
  }
};

// ===== 认证相关 API =====
export const authAPI = {
  login: (username, password) => api.post('/api/auth/login', { username, password }),
  me: () => api.get('/api/auth/me'),
  changePassword: (oldPassword, newPassword) =>
    api.post('/api/auth/change-password', { oldPassword, newPassword })
};

// ===== 用户管理 API (admin only) =====
export const usersAPI = {
  getList: () => api.get('/api/users'),
  create: (data) => api.post('/api/users', data),
  update: (id, data) => api.put(`/api/users/${id}`, data),
  delete: (id) => api.delete(`/api/users/${id}`),
  resetPassword: (id, newPassword) =>
    api.put(`/api/users/${id}/reset-password`, { newPassword })
};

// ===== 原有业务 API =====
export const articlesAPI = {
  getList: () => api.get('/api/articles'),
  getById: (id) => api.get(`/api/articles/${id}`),
  create: (data) => api.post('/api/articles', data),
  update: (id, data) => api.put(`/api/articles/${id}`, data),
  delete: (id) => api.delete(`/api/articles/${id}`)
};

export const bannersAPI = {
  getList: () => api.get('/api/banners'),
  getById: (id) => api.get(`/api/banners/${id}`),
  create: (data) => api.post('/api/banners', data),
  update: (id, data) => api.put(`/api/banners/${id}`, data),
  delete: (id) => api.delete(`/api/banners/${id}`)
};

export const casesAPI = {
  getList: () => api.get('/api/cases'),
  getById: (id) => api.get(`/api/cases/${id}`),
  create: (data) => api.post('/api/cases', data),
  update: (id, data) => api.put(`/api/cases/${id}`, data),
  delete: (id) => api.delete(`/api/cases/${id}`)
};

export const servicesAPI = {
  getList: () => api.get('/api/services'),
  getById: (id) => api.get(`/api/services/${id}`),
  create: (data) => api.post('/api/services', data),
  update: (id, data) => api.put(`/api/services/${id}`, data),
  delete: (id) => api.delete(`/api/services/${id}`)
};

export const contentsAPI = {
  getList: () => api.get('/api/contents'),
  getById: (id) => api.get(`/api/contents/${id}`),
  create: (data) => api.post('/api/contents', data),
  update: (id, data) => api.put(`/api/contents/${id}`, data),
  delete: (id) => api.delete(`/api/contents/${id}`)
};

export const contactsAPI = {
  getList: (params) => api.get('/api/contacts', { params }),
  update: (id, data) => api.put(`/api/contacts/${id}`, data),
  delete: (id) => api.delete(`/api/contacts/${id}`)
};

export const configsAPI = {
  getList: () => api.get('/api/configs'),
  getById: (id) => api.get(`/api/configs/${id}`),
  create: (data) => api.post('/api/configs', data),
  update: (id, data) => api.put(`/api/configs/${id}`, data),
  getByKey: (key) => api.get(`/api/configs/key/${key}`)
};

export default api;
