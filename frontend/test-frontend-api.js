import axios from 'axios';

// 创建axios实例，模拟前端的API配置
const request = axios.create({
  baseURL: 'http://localhost:3002/api', // 前端服务的API代理地址
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 响应拦截器，模拟前端的响应处理
request.interceptors.response.use(
  (response) => {
    console.log('Response interceptor - 响应状态:', response.status);
    
    // 直接使用response.data作为响应数据
    const res = response.data;
    console.log('Response interceptor - 处理后响应类型:', typeof res);
    
    // 检查是否有data字段（后端实际返回格式）
    if (res && typeof res === 'object' && 'data' in res) {
      console.log('Response interceptor - 发现data字段，类型:', typeof res.data);
      // 直接返回data字段
      return res.data;
    }
    
    // 如果没有data字段，直接返回数据
    console.log('Response interceptor - 无data字段，直接返回');
    return res;
  },
  (error) => {
    console.error('Response interceptor - 错误响应:', error.message);
    return Promise.reject(error);
  }
);

// 测试服务列表API
async function testServiceList() {
  try {
    console.log('\n=== 测试服务列表API ===');
    const response = await request.get('/services');
    
    console.log('API响应:', JSON.stringify(response));
    console.log('响应类型:', typeof response);
    
    if (Array.isArray(response)) {
      console.log('响应是数组，长度:', response.length);
      console.log('数组元素示例:', JSON.stringify(response[0]));
      console.log('测试成功！服务列表获取成功，返回了', response.length, '个服务项');
    } else {
      console.log('响应不是数组，可能存在问题');
      console.log('测试失败！');
    }
    
    return response;
  } catch (error) {
    console.error('API请求失败:', error.message);
    console.error('测试失败！');
    return null;
  }
}

// 运行测试
async function runTests() {
  console.log('开始测试前端API...');
  await testServiceList();
  console.log('\n测试完成！');
}

runTests();