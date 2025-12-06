import axios from 'axios';
import { ElMessage } from 'element-plus';

// 创建axios实例
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:3000', // 后端服务地址
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 添加请求日志拦截器
api.interceptors.request.use(
  config => {
    console.log('请求URL:', config.baseURL + config.url);
    console.log('请求参数:', config.params || {});
    return config;
  },
  error => {
    console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

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
  getList: () => api.get('/api/articles'),
  getById: (id) => api.get(`/api/articles/${id}`),
  create: (data) => api.post('/api/articles', data),
  update: (id, data) => api.put(`/api/articles/${id}`, data),
  delete: (id) => api.delete(`/api/articles/${id}`)
};

export const bannersAPI = {
  getList: () => api.get('/api/banners'),
  getById: (id) => api.get(`/api/banners/${id}`),
  create: async (data) => {
    const response = await api.post('/api/banners', data);
    console.log('创建轮播图返回:', response);
    return response;
  },
  update: async (id, data) => {
    const response = await api.put(`/api/banners/${id}`, data);
    console.log('更新轮播图返回:', response);
    return response;
  },
  delete: (id) => api.delete(`/api/banners/${id}`)
};

export const casesAPI = {
  getList: () => api.get('/api/cases'),
  getById: (id) => api.get(`/api/cases/${id}`),
  create: async (data) => {
    const response = await api.post('/api/cases', data);
    console.log('创建案例返回:', response);
    return response;
  },
  update: async (id, data) => {
    const response = await api.put(`/api/cases/${id}`, data);
    console.log('更新案例返回:', response);
    return response;
  },
  delete: (id) => api.delete(`/api/cases/${id}`)
};

export const servicesAPI = {
  getList: () => api.get('/api/services'),
  getById: (id) => api.get(`/api/services/${id}`),
  create: async (data) => {
    const response = await api.post('/api/services', data);
    console.log('创建服务返回:', response);
    return response;
  },
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
  update: (id, data) => api.put(`/api/configs/${id}`, data),
  getByKey: (key) => api.get(`/api/configs/key/${key}`)
};

export default api;