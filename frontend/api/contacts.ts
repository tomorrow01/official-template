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
      // 使用'/api/contacts'路径，确保通过代理转发到后端
      console.log('发送请求到: /api/contacts');
      const response = await request.post<ApiResponse<ContactResponse>>('/api/contacts', formData);
      console.log('收到响应:', response);
      return response;
    } catch (error) {
      console.error('提交联系表单失败:', error);
      if (error.response) {
        console.error('错误状态码:', error.response.status);
        console.error('错误响应数据:', error.response.data);
      }
      throw error;
    }
  }
}

// 导出服务实例
export const contactService = new ContactService();