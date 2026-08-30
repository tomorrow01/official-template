import { getRequestInstance } from './request';

// 联系表单数据接口
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  content: string;
}

/**
 * 提交联系表单
 * request 拦截器会返回后端 { code, data, error } 中的 data 字段
 */
export const submitContactForm = async (formData: ContactFormData) => {
  try {
    const request = getRequestInstance();
    const response = await request.post('/api/contacts', formData);
    // 拦截器已返回 res.data
    return response;
  } catch (error) {
    console.error('提交联系表单失败:', error);
    throw error;
  }
};
