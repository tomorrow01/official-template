import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getServiceList, getServiceDetail } from '@/api/services';
import type { ServiceItem } from '@/api/services';

// 模拟整个request模块
vi.mock('@/api/request', () => {
  return {
    default: {
      get: vi.fn()
    }
  };
});

// 导入模拟后的request
import request from '@/api/request';

describe('API Services', () => {
  beforeEach(() => {
    // 重置所有模拟
    vi.clearAllMocks();
    // 清除控制台输出
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should get service list successfully', async () => {
    // 模拟API响应
    const mockServices: ServiceItem[] = [
      {
        id: '1',
        title: '测试服务1',
        description: '测试服务1的描述',
        icon: 'service-icon-1',
        image: 'service-image-1.jpg'
      },
      {
        id: '2',
        title: '测试服务2',
        description: '测试服务2的描述',
        icon: 'service-icon-2',
        image: 'service-image-2.jpg'
      }
    ];

    // 模拟GET请求
    (request.get as any).mockResolvedValue(mockServices);

    // 调用API函数
    const services = await getServiceList();

    // 验证结果
    expect(services).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: '1',
        title: '测试服务1',
        description: '测试服务1的描述'
      }),
      expect.objectContaining({
        id: '2',
        title: '测试服务2',
        description: '测试服务2的描述'
      })
    ]));
    expect(services.length).toBe(2);
  });

  it('should return empty array when API returns empty data', async () => {
    // 模拟API返回空数组
    (request.get as any).mockResolvedValue([]);

    const services = await getServiceList();

    expect(services).toEqual([]);
    expect(services.length).toBe(0);
  });

  it('should handle API errors when getting service list', async () => {
    // 模拟API错误
    (request.get as any).mockRejectedValue(new Error('Network Error'));

    // 验证函数抛出错误
    await expect(getServiceList()).rejects.toThrow();
  });

  it('should get service detail successfully', async () => {
    // 模拟API响应
    const mockServiceDetail: ServiceItem = {
      id: '1',
      title: '测试服务1',
      description: '测试服务1的详细描述',
      icon: 'service-icon-1',
      image: 'service-image-1.jpg'
    };

    // 模拟GET请求
    (request.get as any).mockResolvedValue(mockServiceDetail);

    // 调用API函数
    const service = await getServiceDetail('1');

    // 验证结果
    expect(service).toEqual(expect.objectContaining({
      id: '1',
      title: '测试服务1',
      description: '测试服务1的详细描述'
    }));
  });

  it('should handle API errors when getting service detail', async () => {
    // 模拟API错误
    (request.get as any).mockRejectedValue(new Error('Network Error'));

    // 验证函数抛出错误
    await expect(getServiceDetail('1')).rejects.toThrow();
  });

  it('should throw error when service detail is invalid', async () => {
    // 模拟API返回无效数据（数组而不是对象）
    (request.get as any).mockResolvedValue([]);

    // 验证函数抛出错误
    await expect(getServiceDetail('1')).rejects.toThrow('未获取到有效服务详情数据');
  });
});
