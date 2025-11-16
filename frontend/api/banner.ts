import { getRequestInstance } from './request'; // 导入工厂函数

/**
 * 后端返回的Banner数据类型定义
 */
export interface BannerResponseItem {
  _id: string; // MongoDB使用_id作为主键
  title?: string;
  description?: string;
  ctaText?: string;
  imageUrl: string;
  link?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

/**
 * 前端组件需要的Banner数据类型
 */
export interface BannerItem {
  id: string;
  image: string; // 注意：前端组件使用image而不是imageUrl
  link: string;
  title?: string;
  description?: string; // 描述文本
  ctaText?: string; // CTA按钮文本
  order?: number; // 排序字段，用于内部排序使用
}

/**
 * Axios响应数据类型
 */
interface ApiResponse<T> {
  data: T;
}

/**
 * 获取Banner列表接口
 * @returns Promise<BannerItem[]> 转换后的前端可用的轮播图数据
 */
export const getBannerList = async (): Promise<BannerItem[]> => {
  try {
    const request = getRequestInstance(); // 在函数内部动态获取实例（此时处于Vue上下文）
    console.log('正在请求轮播图数据...');
    
    // 发送请求到后端API，使用正确的响应类型定义
    const response = await request<ApiResponse<BannerResponseItem[]>>({
      url: '/banners', // 直接使用正确的后端路由路径
      method: 'get'
    });
    
    console.log('获取到轮播图原始数据:', response);
    
    // 转换数据格式：将后端的imageUrl转换为前端组件需要的image
    // 并确保只返回激活状态的轮播图
    const banners: BannerItem[] = response.data
      .filter((item: BannerResponseItem): boolean => item.isActive)
      .map((item: BannerResponseItem): BannerItem => ({
        id: item._id,
        image: item.imageUrl, // 转换字段名
        link: item.link || '/', // 提供默认值
        title: item.title,
        description: item.description || '', // 添加描述字段
        ctaText: item.ctaText || '', // 添加CTA按钮文本字段
        order: item.order // 保留order字段以便排序使用
      }))
      .sort((a: BannerItem, b: BannerItem): number => (a.order || 0) - (b.order || 0)); // 使用安全的排序，处理可能的undefined
    
    console.log('转换后的轮播图数据:', banners);
    return banners;
  } catch (error: unknown) {
    console.error('获取轮播图数据失败:', error);
    // 返回模拟数据作为兜底
    return [
      {
        id: 'mock-1',
        image: '/images/banner1.jpg',
        link: '/',
        title: '首页轮播1'
      },
      {
        id: 'mock-2',
        image: '/images/banner2.jpg',
        link: '/',
        title: '活动轮播2'
      }
    ];
  }
};