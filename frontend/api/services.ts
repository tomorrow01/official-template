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
    return response.data.data || [];
  } catch (error) {
    console.error('获取服务列表失败:', error);
    // 返回模拟数据作为备用
    return [
      {
        id: '1',
        icon: 'el-icon-s-grid',
        title: '网站建设',
        desc: '专业的网站设计与开发，响应式布局，提升品牌形象'
      },
      {
        id: '2',
        icon: 'el-icon-mobile',
        title: 'APP开发',
        desc: '定制化移动应用开发，原生体验，满足企业需求'
      },
      {
        id: '3',
        icon: 'el-icon-pie-chart',
        title: '数据分析',
        desc: '专业的数据收集与分析服务，助力企业决策'
      }
    ];
  }
};

export type { ServiceItem };