// 简单的 API 测试脚本
import axios from 'axios';

// 创建 axios 实例，模拟前端的 request.ts 配置
const request = axios.create({
  baseURL: 'http://localhost:3002/api', // 前端开发服务器地址
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

// 测试获取服务列表
async function testServiceList() {
  try {
    console.log('测试获取服务列表...');
    const response = await request.get('/services');
    console.log('API 响应:', response.data);
    console.log('响应类型:', typeof response.data);
    console.log('是否为数组:', Array.isArray(response.data));
    if (Array.isArray(response.data)) {
      console.log('数组长度:', response.data.length);
    }
    return true;
  } catch (error) {
    console.error('测试失败:', error.message);
    console.error('错误详情:', error.response ? error.response.data : error);
    return false;
  }
}

// 运行测试
testServiceList().then(success => {
  if (success) {
    console.log('\n测试成功！');
  } else {
    console.log('\n测试失败！');
  }
  process.exit(0);
});