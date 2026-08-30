import { getRequestInstance } from './request';

// 案例数据类型
export interface CaseItem {
  _id?: string;
  id?: string;
  title?: string;
  description: string;
  image?: string;
  order?: number;
  isActive?: boolean;
  createTime?: string;
}

/**
 * 获取客户案例列表
 * request 拦截器已将后端 { code, data, error } 中的 data 字段解包返回
 */
export const getCaseList = async (): Promise<CaseItem[]> => {
  try {
    const request = getRequestInstance();
    const response = await request.get('/api/cases');
    const list: any[] = Array.isArray(response) ? response : (response?.data ?? []);
    return list.map((item: any) => ({
      ...item,
      id: item.id || item._id,
    }));
  } catch (error) {
    console.error('获取案例列表失败:', error);
    return [];
  }
};

/**
 * 获取单个案例详情
 */
export const getCaseDetail = async (caseId: string): Promise<CaseItem | null> => {
  try {
    const request = getRequestInstance();
    const response = await request.get(`/api/cases/${caseId}`);
    const detail: any = response?.data ?? response;
    if (!detail || typeof detail !== 'object') return null;
    return {
      ...detail,
      id: detail.id || detail._id,
    };
  } catch (error) {
    console.error('获取案例详情失败:', error);
    return null;
  }
};
