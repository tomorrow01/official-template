import axios from 'axios';
import { ElMessage } from 'element-plus';

// 创建axios实例
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:3001', // 后端服务地址
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器（合并日志和token添加）
api.interceptors.request.use(
  config => {
    console.log('请求URL:', config.baseURL + config.url);
    console.log('请求参数:', config.params || {});
    console.log('请求数据:', config.data || {});
    
    // 添加token认证信息
    const token = localStorage.getItem('admin-token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  response => {
    console.log('响应数据:', response.data);
    return response.data;
  },
  error => {
    console.error('响应错误:', error);
    console.error('错误状态:', error.response?.status);
    console.error('错误数据:', error.response?.data);
    
    let errorMessage = '请求失败，请稍后重试';
    if (error.response) {
      // 这里只处理网络错误和服务器错误，不处理业务错误
      // 业务错误（如401）由调用方自己处理
      if (error.response.status >= 500) {
        errorMessage = '服务器错误';
        ElMessage.error(errorMessage);
      } else if (error.response.status === 404) {
        errorMessage = '请求的资源不存在';
        ElMessage.error(errorMessage);
      }
    } else if (error.request) {
      errorMessage = '网络错误，请检查网络连接';
      ElMessage.error(errorMessage);
    }
    
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
  getList: (params) => api.get('/api/banners', { params }),
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

export const authAPI = {
  login: (data) => api.post('/api/auth/login', data),
  getCurrentUser: () => api.get('/api/auth/current')
};

export default api;