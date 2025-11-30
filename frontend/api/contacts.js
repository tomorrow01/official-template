import axios from 'axios';

// 创建axios实例
const apiClient = axios.create({
  baseURL: '',  // 使用相对路径，让请求通过代理发送到后端
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API请求错误:', error);
    throw error;
  }
);

// 联系表单服务
const contactService = {
  // 提交联系表单
  submitContactForm: async (formData) => {
    try {
      // 使用/api/contacts路径与后端保持一致
      const response = await apiClient.post('/api/contacts', formData);
      return response;
    } catch (error) {
      console.error('提交表单失败:', error);
      throw error;
    }
  }
};

export default contactService;