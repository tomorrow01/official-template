import { getRequestInstance } from './request';

// 为案例数据定义正确的类型
export interface CaseItem {
  _id?: string;
  id?: string;
  title: string; // 添加标题字段
  image: string;
  description: string;
  publishTime?: string; // 修改为可选字段，因为后端是createTime
  createTime?: string; // 添加后端使用的createTime字段
  order: number;
  isActive: boolean;
}

// 获取客户案例列表接口
export const getCaseList = () => {
  const request = getRequestInstance();
  return request<CaseItem[]>({
    url: '/cases',
    method: 'get'
  });
};

// 获取单个案例详情
export const getCaseDetail = async (caseId: string) => {
  try {
    const request = getRequestInstance();
    const response = await request.get(`/cases/${caseId}`);
    return response;
  } catch (error) {
    console.error(`获取案例详情失败 (ID: ${caseId}):`, error);
    throw error;
  }
};
