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
    
    const responseData = response.data;
    console.log('API响应原始数据:', JSON.stringify(responseData));
    
    // 处理可能的不同响应格式
    let serviceData: any[] = [];
    
    // 情况1: 响应是 { code, data, error } 格式（后端实际返回格式）
    if (typeof responseData === 'object' && responseData !== null) {
      // 检查是否有data字段
      if (responseData.data) {
        // 如果data字段本身就是数组
        if (Array.isArray(responseData.data)) {
          serviceData = responseData.data;
        }
        // 如果data字段是对象，可能包含数组数据
        else if (typeof responseData.data === 'object' && Array.isArray(responseData.data.data)) {
          serviceData = responseData.data.data;
        }
      }
    }
    // 情况2: 响应本身就是数组（兼容性处理）
    else if (Array.isArray(responseData)) {
      serviceData = responseData;
    }
    
    // 如果没有获取到数据，使用模拟数据
    if (!Array.isArray(serviceData) || serviceData.length === 0) {
      console.warn('未获取到服务数据，使用模拟数据');
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
    // 在catch中返回模拟数据
    return [
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
  }
};