import { getRequestInstance } from './request';

// 文章数据类型定义
export interface Article {
  id: string;
  title: string;
  content: string;
  image?: string;
  createTime: string;
  updateTime?: string;
  views?: number;
  tags?: string[];
}

// 获取单个文章详情
export const getArticleDetail = async (id: string): Promise<{ data: Article } | Article> => {
  try {
    const request = getRequestInstance();
    const response = await request.get(`/api/articles/${id}`);
    return response;
  } catch (error) {
    console.error('获取文章详情失败:', error);
    throw error;
  }
};

// 获取文章列表（可选，用于扩展功能）
export const getArticleList = async (params?: {
  page?: number;
  limit?: number;
  keyword?: string;
  tag?: string;
}): Promise<{ data: { list: Article[]; total: number } }> => {
  try {
    const request = getRequestInstance();
    const response = await request.get('/api/articles', { params });
    return response;
  } catch (error) {
    console.error('获取文章列表失败:', error);
    throw error;
  }
};