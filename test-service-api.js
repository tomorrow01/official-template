const http = require('http');

// 发送请求到后端API
http.get('http://127.0.0.1:3000/api/services', (res) => {
  let data = '';
  
  // 接收数据
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  // 数据接收完成
  res.on('end', () => {
    console.log('API响应状态码:', res.statusCode);
    console.log('API响应原始数据:', data);
    
    try {
      // 解析JSON
      const parsedData = JSON.parse(data);
      console.log('解析后的响应数据类型:', typeof parsedData);
      console.log('是否为数组:', Array.isArray(parsedData));
      
      if (typeof parsedData === 'object') {
        console.log('对象的键:', Object.keys(parsedData));
        if (parsedData.data) {
          console.log('data字段类型:', typeof parsedData.data);
          console.log('data是否为数组:', Array.isArray(parsedData.data));
        }
      }
    } catch (error) {
      console.error('JSON解析错误:', error);
    }
  });
}).on('error', (error) => {
  console.error('请求错误:', error);
});