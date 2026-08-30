import { getRequestInstance } from './request';

// 文章数据类型
export interface Article {
  id: string;
  _id?: string;
  title: string;
  content: string;
  image?: string;
  createTime?: string;
  createdAt?: string;
  views?: number;
  tags?: string[];
  author?: string;
}

/**
 * 获取文章列表
 * request 拦截器已将后端 { code, data, error } 中的 data 字段解包返回
 */
export const getArticleList = async (params?: {
  page?: number;
  limit?: number;
  keyword?: string;
  tag?: string;
}): Promise<Article[]> => {
  try {
    const request = getRequestInstance();
    const response = await request.get('/api/articles', { params });
    const list: any[] = Array.isArray(response) ? response : (response?.data ?? []);
    return list.map((item: any) => ({
      ...item,
      id: item.id || item._id,
    }));
  } catch (error) {
    console.error('获取文章列表失败:', error);
    return [];
  }
};

/**
 * 获取单个文章详情
 */
export const getArticleDetail = async (id: string): Promise<Article | null> => {
  try {
    const request = getRequestInstance();
    const response = await request.get(`/api/articles/${id}`);
    const detail: any = response?.data ?? response;
    if (!detail || typeof detail !== 'object') return null;
    return {
      ...detail,
      id: detail.id || detail._id,
    };
  } catch (error) {
    console.error('获取文章详情失败:', error);
    return null;
  }
};
