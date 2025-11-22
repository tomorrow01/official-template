import request from './request';

// 联系表单数据接口
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  content: string;
}

// 联系表单响应接口
export interface ContactResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  content: string;
  status: 'pending' | 'processing' | 'completed';
  createdAt: string;
  updatedAt: string;
}

// 后端API响应格式
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// 联系表单API服务类
class ContactService {
  /**
   * 提交联系表单
   * @param formData 表单数据
   * @returns 提交结果
   */
  async submitContactForm(formData: ContactFormData): Promise<ApiResponse<ContactResponse>> {
    try {
      const response = await request.post<ApiResponse<ContactResponse>>('/api/contacts', formData);
      return response.data;
    } catch (error) {
      console.error('提交联系表单失败:', error);
      throw error;
    }
  }
}

// 导出服务实例
export const contactService = new ContactService();