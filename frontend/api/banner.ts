import { getRequestInstance } from './request';

/**
 * 后端返回的Banner数据类型
 */
export interface BannerResponseItem {
  _id: string;
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
  image: string;
  link: string;
  title?: string;
  order?: number;
}

/**
 * 获取Banner列表
 * request 拦截器已将后端 { code, data, error } 中的 data 字段解包返回，
 * 所以 response 直接就是 Banner 数组，不需要再 .data
 */
export const getBannerList = async (): Promise<BannerItem[]> => {
  try {
    const request = getRequestInstance();
    const response = await request.get('/api/banners');
    // response 已是数组（拦截器解包过）
    const list: BannerResponseItem[] = Array.isArray(response) ? response : (response?.data ?? []);
    return list
      .filter((item) => item.isActive)
      .map((item) => ({
        id: item._id,
        image: item.imageUrl,
        link: item.link || '/',
        title: item.title,
        order: item.order,
      }))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  } catch (error) {
    console.error('获取轮播图数据失败:', error);
    return [];
  }
};
