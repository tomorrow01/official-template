// 测试前端API调用的脚本
const axios = require('axios');

// 测试API调用
async function testApiCalls() {
  try {
    console.log('测试服务列表API...');
    // 模拟前端API调用
    const response = await axios.get('http://localhost:3001/api/services', {
      headers: {
        'X-Request-Id': Math.random().toString(36).substring(2, 15)
      }
    });
    
    console.log('API响应:', JSON.stringify(response.data, null, 2));
    console.log('响应类型:', typeof response.data);
    console.log('是否包含code字段:', 'code' in response.data);
    console.log('是否包含data字段:', 'data' in response.data);
    
    if ('data' in response.data) {
      console.log('data字段类型:', typeof response.data.data);
      console.log('data是否为数组:', Array.isArray(response.data.data));
    }
    
    // 模拟前端响应拦截器逻辑
    console.log('\n模拟前端响应拦截器逻辑...');
    const res = response.data;
    let finalData;
    
    if (res && res.code !== undefined) {
      if (res.code >= 200 && res.code < 300) {
        finalData = res.data;
        console.log('拦截器返回:', JSON.stringify(finalData, null, 2));
      } else {
        console.error('拦截器处理错误响应');
      }
    } else if (res) {
      finalData = res;
      console.log('拦截器直接返回:', JSON.stringify(finalData, null, 2));
    }
    
    // 模拟getServiceList逻辑
    console.log('\n模拟getServiceList逻辑...');
    let serviceData = [];
    if (Array.isArray(finalData)) {
      serviceData = finalData;
      console.log('服务数据是数组，长度:', serviceData.length);
    } else {
      console.warn('服务数据格式不符合预期，期望数组但得到:', typeof finalData);
    }
    
    console.log('测试成功！');
  } catch (error) {
    console.error('API调用失败:', error.message);
    if (error.response) {
      console.error('响应状态:', error.response.status);
      console.error('响应数据:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error('请求没有收到响应:', error.request);
    }
  }
}

// 运行测试
testApiCalls();