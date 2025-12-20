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
  section: string;
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
  description?: string;
  ctaText?: string;
  order?: number; // 排序字段，用于内部排序使用
}

/**
 * 获取Banner列表接口
 * @param section 可选的板块参数，用于筛选特定板块的轮播图
 * @returns Promise<BannerItem[]> 转换后的前端可用的轮播图数据
 */
export const getBannerList = async (section?: string): Promise<BannerItem[]> => {
  try {
    const request = getRequestInstance(); // 在函数内部动态获取实例（此时处于Vue上下文）
    console.log(`获取轮播图数据 - 板块: ${section || '全部'}`);
    
    // 发送请求到后端API，支持按板块筛选
    const params = section ? { section } : {};
    const response = await request.get<BannerResponseItem[]>('/banners', { params });
    
    console.log(`轮播图API返回结果:`, response);
    
    // 转换数据格式：将后端的imageUrl转换为前端组件需要的image
    // 并确保只返回激活状态的轮播图
    // 注意：根据request.ts的响应拦截器，response已经是res.data了，不需要再访问.data
    const banners: BannerItem[] = response
      .filter((item: BannerResponseItem) => item.isActive)
      .map((item: BannerResponseItem) => ({
        id: item._id,
        image: item.imageUrl, // 转换字段名
        link: item.link || '/', // 提供默认值
        title: item.title,
        description: item.description,
        ctaText: item.ctaText,
        // 保留order字段以便排序使用
        order: item.order
      }));
      
    // 过滤激活状态的轮播图并按顺序排序
    const activeBanners = banners.sort((a: BannerItem, b: BannerItem) => (a.order || 0) - (b.order || 0));
    
    console.log(`处理后的轮播图数据:`, activeBanners);
    return activeBanners;
  } catch (error) {
    console.error('轮播图API请求失败:', error);
    // 返回模拟数据作为兜底
    const mockData = [
      {
        id: 'mock-1',
        image: '/images/banner1.jpg',
        link: '/',
        title: '首页轮播1',
        description: '专业的网站设计与开发服务，助力企业数字化转型',
        ctaText: '了解更多'
      },
      {
        id: 'mock-2',
        image: '/images/banner2.jpg',
        link: '/activity',
        title: '活动轮播2',
        description: '限时优惠活动，专业开发服务低至8折',
        ctaText: '立即参与'
      },
      {
        id: 'mock-3',
        image: '/images/service-banner1.jpg',
        link: '/services',
        title: '服务页轮播1',
        description: '全方位的技术服务解决方案，满足企业各种需求',
        ctaText: '查看服务'
      }
    ];
    
    const filteredMockData = mockData.filter(item => !section || 
      (section === 'home' && ['mock-1', 'mock-2'].includes(item.id)) ||
      (section === 'services' && item.id === 'mock-3')
    ); // 如果指定了板块，只返回匹配的模拟数据
    
    console.log(`使用模拟轮播图数据:`, filteredMockData);
    return filteredMockData;
  }
};