// 测试前端到后端的API调用
const http = require('http');

// 模拟前端API请求配置
const testApiCall = () => {
  console.log('开始测试API调用...');
  
  const options = {
    hostname: '127.0.0.1',
    port: 3000,
    path: '/api/services',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  const req = http.request(options, (res) => {
    let data = '';
    
    console.log('API请求成功!');
    console.log('响应状态码:', res.statusCode);
    console.log('响应头:', res.headers);
    
    // 接收数据
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    // 数据接收完毕
    res.on('end', () => {
      try {
        // 尝试解析JSON
        const parsedData = JSON.parse(data);
        console.log('响应数据类型:', typeof parsedData);
        console.log('响应数据结构:', JSON.stringify(parsedData, null, 2));
        
        // 检查数据是否为数组
        if (Array.isArray(parsedData)) {
          console.log('\n数据是数组，包含', parsedData.length, '个服务项目:');
          parsedData.forEach((item, index) => {
            console.log(`${index + 1}. ID: ${item._id || item.id}, 标题: ${item.title}`);
          });
        } else {
          console.log('\n数据不是数组形式');
        }
      } catch (parseError) {
        console.error('解析JSON失败:', parseError.message);
        console.log('原始响应数据:', data);
      }
    });
  });
  
  // 处理错误
  req.on('error', (error) => {
    console.error('API请求失败:', error.message);
  });
  
  // 结束请求
  req.end();
};

testApiCall();