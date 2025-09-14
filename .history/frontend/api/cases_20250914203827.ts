import { getRequestInstance } from './request';

// 为案例数据定义正确的类型
export interface CaseItem {
  id: string;
  image: string;
  description: string;
  order: number;
  isActive: boolean;
}

// 获取客户案例列表接口
export const getCaseList = () => {
  const request = getRequestInstance();
  return request<CaseItem[]>({
    url: '/api/cases',
    method: 'get'
  });
};
