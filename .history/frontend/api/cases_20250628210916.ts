import { getRequestInstance } from './request'; // 导入工厂函数
// 移除无法找到的模块导入，直接使用当前文件定义的类型
// import type { BannerItem } from './types'; 注释原导入语句，因为类型已在当前文件定义

// 获取Banner列表接口（修改后）
export const getCaseList = () => {
  const request = getRequestInstance(); // 在函数内部动态获取实例（此时处于Vue上下文）
  return request<BannerItem[]>({
    url: '/api/cases', // 假设后端接口为 /banners（已通过代理配置转发）
    method: 'get'
  });
};

// 补充：若未定义BannerItem类型，需添加以下定义（可选）
export interface BannerItem {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  link: string;
};
