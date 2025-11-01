import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useApiConfig } from '~/composables/useApiConfig'; // 导入组合式函数
import { ElMessage } from 'element-plus';
import { navigateTo } from '#app';

/**
 * 动态创建Axios实例（延迟到调用时创建）
 * @returns 配置好baseURL的Axios实例
 */
export const getRequestInstance = (): AxiosInstance => {
  // 在函数内部调用组合式函数（确保上下文正确）
  const { apiBase } = useApiConfig(); 
  console.log('API Base URL:', apiBase);

  // 创建Axios实例并配置baseURL
  const instance: AxiosInstance = axios.create({
    baseURL: apiBase || 'http://localhost:3001', // 从组合式函数获取动态baseURL，提供默认值
    timeout: 10000, // 请求超时时间
    headers: { 'Content-Type': 'application/json' }, // 默认请求头
    validateStatus: (status) => status >= 200 && status < 500, // 仅将5xx错误视为网络错误
  });

  // 请求拦截器：统一处理请求头
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // 目前项目中没有auth store，暂时不添加token验证
      // 后续如需添加认证，可以创建一个合适的auth store
      
      // 添加请求ID便于调试跟踪
      config.headers = config.headers || {};
      config.headers['X-Request-Id'] = Math.random().toString(36).substring(2, 15);
      console.log('API Request:', config.method?.toUpperCase(), config.url, config.params || config.data);
      
      return config;
    },
    (error) => {
      console.error('Request configuration error:', error);
      return Promise.reject(error);
    }
  );

  // 响应拦截器：统一处理业务错误码、HTTP状态码
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // 根据后端返回的数据结构进行处理
      // 我们的后端sendResponse函数返回的格式是 { code, message, data } 或直接返回数据
      const res = response.data;
      
      // 检查是否有code字段，如果有则按照业务逻辑处理
      if (res && res.code !== undefined) {
        if (res.code !== 200) {
          ElMessage.error(res.message || '请求失败');
          return Promise.reject(new Error(res.message || '请求失败'));
        }
        return res.data || res; // 优先返回res.data
      }
      
      // 如果没有code字段，直接返回数据（适用于旧接口兼容）
      return res;
    },
    (error) => {
      // 处理HTTP状态码错误
      const status = error.response?.status;
      switch (status) {
        case 401:
          ElMessage.error('登录过期，请重新登录');
          navigateTo('/login');
          break;
        case 403:
          ElMessage.error('无访问权限');
          break;
        case 500:
          ElMessage.error('服务器内部错误');
          break;
        default:
          ElMessage.error(error.message || '网络请求失败');
      }
      return Promise.reject(error);
    }
  );

  return instance;
};