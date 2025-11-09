import { getRequestInstance } from './request';

// 定义服务数据类型
interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  desc: string;
  order?: number;
  isActive?: boolean;
  createdAt?: string;
}

/**
 * 获取服务列表
 * @returns Promise<ServiceItem[]>
 */
export const getServiceList = async (): Promise<ServiceItem[]> => {
  const request = getRequestInstance();
  try {
    const response = await request.get('/api/services');
    // 安全地访问响应数据
    if (response && response.data) {
      if (Array.isArray(response.data)) {
        return response.data;
      }
      return response.data.data || [];
    }
    return [];
  } catch (error) {
    console.error('获取服务列表失败:', error);
    // 返回模拟数据作为备用
    return [
      {
        id: '1',
        icon: 'Management',
        title: '软件开发',
        desc: '为客户提供定制化的软件开发服务，包括Web应用、移动应用和企业级解决方案。'
      },
      {
        id: '2',
        icon: 'Monitor',
        title: '数字化转型',
        desc: '帮助企业实现数字化转型，优化业务流程，提升运营效率。'
      },
      {
        id: '3',
        icon: 'Cloud',
        title: '云服务',
        desc: '提供云计算解决方案，包括云迁移、云托管和云安全服务。'
      }
    ];
  }
};

export type { ServiceItem };