import { getRequestInstance } from './request';

// 定义服务数据类型，与后端保持一致
export interface ServiceItem {
  _id?: string;
  id?: string;
  icon?: string;
  title: string;
  description: string;
  desc?: string;
  image?: string;
  order?: number;
  isActive?: boolean;
}

/**
 * 获取服务列表
 * request 拦截器已将后端 { code, data, error } 中的 data 字段解包返回
 * 所以这里直接返回数组即可
 */
export const getServiceList = async (): Promise<ServiceItem[]> => {
  try {
    const request = getRequestInstance();
    const response = await request.get('/api/services');
    // request 拦截器已返回 res.data（数组），直接用
    const list: any[] = Array.isArray(response) ? response : (response?.data ?? []);
    return list.map((item: any) => ({
      ...item,
      id: item.id || item._id,
      desc: item.description,
    }));
  } catch (error) {
    console.error('获取服务列表失败:', error);
    return [];
  }
};

/**
 * 获取单个服务详情
 * @param id 服务ID（MongoDB ObjectId 字符串）
 */
export const getServiceDetail = async (id: string): Promise<ServiceItem | null> => {
  try {
    const request = getRequestInstance();
    const response = await request.get(`/api/services/${id}`);
    // request 拦截器已返回 res.data（单个对象），直接用
    const detail: any = response?.data ?? response;
    if (!detail || typeof detail !== 'object') return null;
    return {
      ...detail,
      id: detail.id || detail._id,
      desc: detail.description,
    };
  } catch (error) {
    console.error('获取服务详情失败:', error);
    return null;
  }
};
