import request from './request';

// 定义服务数据类型，与后端保持一致
export interface ServiceItem {
  _id?: string;
  id?: string;
  icon?: string;
  title: string;
  description: string;
  desc?: string; // 添加desc属性以支持前端模板
  image?: string;
  order?: number;
  isActive?: boolean;
}

// 通用响应数据类型
export interface ApiResponse<T> {
  code?: number;
  message?: string;
  data: T;
}

/**
 * 获取服务列表
 */
export const getServiceList = async (params?: any): Promise<ServiceItem[]> => {
  try {
    // 使用通用请求方式调用服务列表接口
    console.log('开始调用getServiceList...');
    const response = await request.get('/services', { params });
    
    console.log('getServiceList - 原始响应:', JSON.stringify(response));
    console.log('getServiceList - 响应类型:', typeof response);
    console.log('getServiceList - 是否为数组:', Array.isArray(response));
    
    let serviceData: any[] = [];
    
    // 由于request.ts的响应拦截器已经处理了响应格式，直接使用response即可
    if (Array.isArray(response)) {
      serviceData = response;
      console.log('getServiceList - 响应是数组，长度:', serviceData.length);
    } else {
      // 提供一个空数组作为后备
      serviceData = [];
      console.log('getServiceList - 响应不是数组，使用空数组');
    }
    
    // 转换数据结构，确保每个服务项都符合ServiceItem接口
    const processedServices = serviceData.map((item: any) => {
      // 确保所有必要的属性都存在
      const safeItem = item || {};
      const description = safeItem.description || safeItem.content || '暂无描述';
      
      return {
        _id: safeItem._id || safeItem.id || `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        id: safeItem.id || safeItem._id || `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        icon: safeItem.icon || 'el-icon-s-grid',
        title: safeItem.title || '未命名服务',
        description: description,
        desc: safeItem.desc || description,
        // 如果image是相对路径或不存在，则使用默认图片
        image: safeItem.image && !safeItem.image.startsWith('/') ? safeItem.image : `https://picsum.photos/seed/service-${safeItem.id || safeItem._id || Math.random()}/600/400`,
        order: safeItem.order || 0,
        isActive: safeItem.isActive !== false // 默认激活
      };
    });
    
    return processedServices;
  } catch (error) {
    console.error('获取服务列表失败:', error);
    // 不再返回模拟数据，直接抛出错误让调用者处理
    throw error;
  }
};

/**
 * 获取单个服务详情
 * @param id 服务ID
 * @returns 服务详情对象
 */
export const getServiceDetail = async (id: string): Promise<ServiceItem> => {
  try {
    // 使用get方法简化请求
    const response: any = await request.get(`/services/${id}`);
    
    // 由于request.ts的响应拦截器已经处理了响应格式，直接使用response即可
    let serviceDetail: any = response;
    
    // 额外检查，确保我们得到的是对象
    if (!serviceDetail || typeof serviceDetail !== 'object' || Array.isArray(serviceDetail)) {
      throw new Error('未获取到有效服务详情数据');
    }
    
    // 如果获取到了有效数据，转换数据结构并返回
    // 将后端的content字段映射为前端的description字段
    const description = serviceDetail.description || serviceDetail.content;
    const serviceItem: ServiceItem = {
      _id: serviceDetail._id,
      id: serviceDetail.id || serviceDetail._id,
      icon: serviceDetail.icon,
      title: serviceDetail.title,
      description: description,
      desc: description, // 确保desc字段存在
      image: serviceDetail.image,
      order: serviceDetail.order,
      isActive: serviceDetail.isActive
    };
    return serviceItem;
  } catch (error) {
    console.error('获取服务详情失败:', error);
    // 不再返回模拟数据，直接抛出错误让调用者处理
    throw error;
  }
};