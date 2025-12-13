const axios = require('axios');

// 测试服务API调用
async function testServicesApi() {
  console.log('开始测试服务API...');
  
  try {
    // 测试前端代理的API
    const frontendResponse = await axios.get('http://localhost:3002/api/services', {
      headers: {
        'X-Request-Id': `test-${Date.now()}`
      },
      timeout: 10000
    });
    
    console.log('=== 前端API调用结果 ===');
    console.log('状态码:', frontendResponse.status);
    console.log('响应头:', JSON.stringify(frontendResponse.headers, null, 2));
    console.log('响应数据:', JSON.stringify(frontendResponse.data, null, 2));
    console.log('数据类型:', Array.isArray(frontendResponse.data) ? '数组' : typeof frontendResponse.data);
    
    // 测试后端直接API
    const backendResponse = await axios.get('http://localhost:3000/api/services', {
      headers: {
        'X-Request-Id': `test-${Date.now()}`
      },
      timeout: 10000
    });
    
    console.log('\n=== 后端API直接调用结果 ===');
    console.log('状态码:', backendResponse.status);
    console.log('响应头:', JSON.stringify(backendResponse.headers, null, 2));
    console.log('响应数据:', JSON.stringify(backendResponse.data, null, 2));
    console.log('数据类型:', Array.isArray(backendResponse.data) ? '数组' : typeof backendResponse.data);
    
    console.log('\n✅ 测试成功！API调用正常工作。');
    
  } catch (error) {
    console.error('\n❌ 测试失败！');
    if (error.response) {
      // 请求已发出，服务器返回状态码不在2xx范围内
      console.error('状态码:', error.response.status);
      console.error('响应数据:', JSON.stringify(error.response.data, null, 2));
      console.error('响应头:', JSON.stringify(error.response.headers, null, 2));
    } else if (error.request) {
      // 请求已发出，但未收到响应
      console.error('未收到响应:', error.request);
    } else {
      // 请求配置出错
      console.error('请求错误:', error.message);
    }
    console.error('错误堆栈:', error.stack);
    process.exit(1);
  }
}

// 运行测试
testServicesApi();