import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useApiConfig } from '~/composables/useApiConfig'; // 导入组合式函数

/**
 * 动态创建Axios实例（延迟到调用时创建）
 * @returns 配置好baseURL的Axios实例
 */
export const getRequestInstance = (): AxiosInstance => {
  // 在函数内部调用组合式函数（确保上下文正确）
  const { apiBase } = useApiConfig(); 

  // 创建Axios实例并配置baseURL
  const instance: AxiosInstance = axios.create({
    baseURL: '', // 从组合式函数获取动态配置, 这里apiBase赋值以后，代理会失效
    timeout: 10000, // 请求超时时间
    headers: { 'Content-Type': 'application/json' }, // 默认请求头
  });

  // 请求拦截器（示例：添加token）
  instance.interceptors.request.use(
    (config: import('axios').InternalAxiosRequestConfig) => {
      // 示例：从store获取token并添加到请求头
      // const { token } = useUserStore();
      // if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  // 响应拦截器（示例：处理错误状态码）
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // 示例：仅返回响应数据
      return response.data;
    },
    (error) => {
      // 示例：统一处理401未授权
      // if (error.response?.status === 401) {
      //   navigateTo('/login');
      // }
      return Promise.reject(error);
    }
  );

  return instance;
};