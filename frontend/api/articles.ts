import request from './request';

// 文章数据类型定义
export interface Article {
  _id?: string;
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  image?: string;
  createTime: string;
  updateTime?: string;
  views?: number;
  tags?: string[];
}

// 获取单个文章详情
export const getArticleDetail = async (id: string): Promise<Article> => {
  try {
    console.log('开始获取文章详情:', id);
    const response = await request.get<Article>(`/articles/${id}`);
    console.log('文章详情API响应:', JSON.stringify(response));
    
    // 确保返回的是对象而不是其他类型
    if (!response || typeof response !== 'object' || Array.isArray(response)) {
      throw new Error('文章详情数据格式不正确');
    }
    
    return response;
  } catch (error) {
    console.error('获取文章详情失败:', error);
    throw error;
  }
};

// 获取文章列表
export const getArticleList = async (params?: {
  page?: number;
  limit?: number;
  keyword?: string;
  tag?: string;
}): Promise<Article[]> => {
  try {
    console.log('开始获取文章列表...');
    const response = await request.get<Article[]>('/articles', { params });
    console.log('文章列表API响应:', JSON.stringify(response));
    
    // 由于request.ts的响应拦截器已经处理了响应格式，直接返回数组即可
    if (Array.isArray(response)) {
      return response;
    }
    
    return [];
  } catch (error) {
    console.error('获取文章列表失败:', error);
    throw error;
  }
};