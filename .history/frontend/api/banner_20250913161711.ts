import { getRequestInstance } from './request'; // 导入工厂函数

/**
 * 后端返回的Banner数据类型定义
 */
export interface BannerResponseItem {
  _id: string; // MongoDB使用_id作为主键
  title?: string;
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
}

/**
 * 获取Banner列表接口
 * @returns Promise<BannerItem[]> 转换后的前端可用的轮播图数据
 */
export const getBannerList = async (): Promise<BannerItem[]> => {
  try {
    const request = getRequestInstance(); // 在函数内部动态获取实例（此时处于Vue上下文）
    console.log('正在请求轮播图数据...');
    
    // 发送请求到后端API
    const response = await request<BannerResponseItem[]>({
      url: '/api/banners', // 通过代理配置转发到后端
      method: 'get'
    });
    
    console.log('获取到轮播图原始数据:', response);
    
    // 转换数据格式：将后端的imageUrl转换为前端组件需要的image
    // 并确保只返回激活状态的轮播图
    const banners: BannerItem[] = response
      .filter((item: BannerResponseItem) => item.isActive)
      .map((item: BannerResponseItem) => ({
        id: item._id,
        image: item.imageUrl, // 转换字段名
        link: item.link || '/', // 提供默认值
        title: item.title
      }))
      .sort((a, b) => a.order - b.order); // 按order字段排序
    
    console.log('转换后的轮播图数据:', banners);
    return banners;
  } catch (error) {
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