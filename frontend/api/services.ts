import request from './request';

// 定义服务数据类型，与后端保持一致
export interface ServiceItem {
  _id?: string;
  id?: string;
  icon?: string;
  title: string;
  description: string;
  desc?: string; // 添加desc属性以支持前端模板
  image?: string;
  order?: number;
  isActive?: boolean;
}

// 通用响应数据类型
export interface ApiResponse<T> {
  code?: number;
  message?: string;
  data: T;
}

/**
 * 获取服务列表
 */
export const getServiceList = async (params?: any): Promise<ServiceItem[]> => {
  try {
    // 简化请求处理，使用any类型避免复杂的泛型问题
    const response: any = await request({
      url: '/api/services',
      method: 'GET',
      params
    });
    
    if (!response) {
      throw new Error('空响应');
    }
    
    // 处理可能的不同响应格式
    let serviceData: any[] = [];
    
    // 检查响应是否包含data字段且为数组
    if (Array.isArray(response.data)) {
      serviceData = response.data;
    } 
    // 检查是否为嵌套结构
    else if (response.data && Array.isArray(response.data.data)) {
      serviceData = response.data.data;
    }
    
    // 转换数据结构，确保字段一致性
    return serviceData.map((item: any) => {
      const serviceItem: ServiceItem = {
        _id: item._id,
        id: item.id || item._id,
        icon: item.icon,
        title: item.title,
        description: item.description,
        desc: item.description, // 确保desc字段存在
        image: item.image,
        order: item.order,
        isActive: item.isActive
      };
      return serviceItem;
    });
  } catch (error) {
    console.error('获取服务列表失败:', error);
  }
  
  // 返回模拟数据作为备用
  const mockData: ServiceItem[] = [
    {
      _id: '1',
      id: '1',
      icon: 'Management',
      title: '软件开发',
      description: '为客户提供定制化的软件开发服务，包括Web应用、移动应用和企业级解决方案。',
      desc: '为客户提供定制化的软件开发服务，包括Web应用、移动应用和企业级解决方案。'
    },
    {
      _id: '2',
      id: '2',
      icon: 'Monitor',
      title: '数字化转型',
      description: '帮助企业实现数字化转型，优化业务流程，提升运营效率。',
      desc: '帮助企业实现数字化转型，优化业务流程，提升运营效率。'
    },
    {
      _id: '3',
      id: '3',
      icon: 'Cloud',
      title: '云服务',
      description: '提供云计算解决方案，包括云迁移、云托管和云安全服务。',
      desc: '提供云计算解决方案，包括云迁移、云托管和云安全服务。'
    }
  ];
  
  return mockData;
};