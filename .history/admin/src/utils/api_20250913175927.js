import axios from 'axios';
import { ElMessage } from 'element-plus';

// 创建axios实例
const api = axios.create({
  baseURL: 'http://localhost:3001', // 后端服务地址
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
api.interceptors.request.use(
  config => {
    // 可以在这里添加token等认证信息
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    let errorMessage = '请求失败，请稍后重试';
    if (error.response) {
      switch (error.response.status) {
        case 401:
          errorMessage = '未授权，请重新登录';
          // 可以在这里添加跳转到登录页的逻辑
          break;
        case 404:
          errorMessage = '请求的资源不存在';
          break;
        case 500:
          errorMessage = '服务器错误';
          break;
        default:
          errorMessage = error.response.data?.message || errorMessage;
      }
    } else if (error.request) {
      errorMessage = '网络错误，请检查网络连接';
    }
    
    ElMessage.error(errorMessage);
    return Promise.reject(error);
  }
);

// 导出API方法
export const articlesAPI = {
  getList: () => api.get('/articles'),
  getById: (id) => api.get(`/articles/${id}`),
  create: (data) => api.post('/articles', data),
  update: (id, data) => api.put(`/articles/${id}`, data),
  delete: (id) => api.delete(`/articles/${id}`)
};

export const bannersAPI = {
  getList: () => api.get('/banners'),
  getById: (id) => api.get(`/banners/${id}`),
  create: (data) => api.post('/banners', data),
  update: (id, data) => api.put(`/banners/${id}`, data),
  delete: (id) => api.delete(`/banners/${id}`)
};

export const casesAPI = {
  getList: () => api.get('/cases'),
  getById: (id) => api.get(`/cases/${id}`),
  create: (data) => api.post('/cases', data),
  update: (id, data) => api.put(`/cases/${id}`, data),
  delete: (id) => api.delete(`/cases/${id}`)
};

export const servicesAPI = {
  getList: () => api.get('/services'),
  getById: (id) => api.get(`/services/${id}`),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`)
};

export const contentsAPI = {
  getList: () => api.get('/contents'),
  getById: (id) => api.get(`/contents/${id}`),
  create: (data) => api.post('/contents', data),
  update: (id, data) => api.put(`/contents/${id}`, data),
  delete: (id) => api.delete(`/contents/${id}`)
};

export default api;