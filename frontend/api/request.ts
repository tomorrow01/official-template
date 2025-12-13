import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';

// 定义API响应接口
interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// 扩展AxiosInstance类型，使TypeScript知道我们的响应拦截器会直接返回数据部分
declare module 'axios' {
  export interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<T>;
    request<T = any>(config: AxiosRequestConfig): Promise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  }
}

// 创建默认的Axios实例
const request = axios.create({
  baseURL: '/api', // 使用相对路径，通过vite代理访问后端
  timeout: 10000, // 请求超时时间
  headers: { 'Content-Type': 'application/json' }, // 默认请求头
  validateStatus: (status) => status >= 200 && status < 500, // 仅将5xx错误视为网络错误
});

// 请求拦截器：统一处理请求头
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
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
request.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('Response interceptor - 原始响应:', JSON.stringify(response));
    
    // 直接使用response.data作为响应数据
    const res = response.data;
    console.log('Response interceptor - 处理后响应:', JSON.stringify(res));
    console.log('Response interceptor - 响应类型:', typeof res);
    
    // 检查是否有data字段（后端实际返回格式）
    if (res && typeof res === 'object' && 'data' in res) {
      console.log('Response interceptor - 发现data字段:', JSON.stringify(res.data));
      console.log('Response interceptor - data类型:', typeof res.data);
      // 直接返回data字段
      return res.data;
    }
    
    // 如果没有data字段，直接返回数据
    console.log('Response interceptor - 无data字段，直接返回:', JSON.stringify(res));
    return res;
  },
  (error) => {
    // 处理HTTP状态码错误
    console.error('Response interceptor - HTTP错误:', JSON.stringify(error));
    const status = error.response?.status;
    const errorData = error.response?.data;
    const errorMessage = errorData?.message || errorData?.error || error.message || '网络请求失败';
    
    switch (status) {
      case 401:
        ElMessage.error('登录过期，请重新登录');
        break;
      case 403:
        ElMessage.error('无访问权限');
        break;
      case 500:
        ElMessage.error('服务器内部错误');
        break;
      default:
        ElMessage.error(errorMessage);
    }
    return Promise.reject(error);
  }
);

/**
 * 获取Axios实例
 * @returns 配置好的Axios实例
 */
export const getRequestInstance = (): AxiosInstance => {
  return request;
};

// 默认导出
export default request;