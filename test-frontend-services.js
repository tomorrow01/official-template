const http = require('http');

// 测试后端API是否正常返回服务数据
console.log('开始测试后端服务API...');
http.get('http://127.0.0.1:3000/api/services', (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('后端API响应状态码:', res.statusCode);
    
    try {
      const parsedData = JSON.parse(data);
      console.log('后端返回数据格式:');
      console.log('  - 类型:', typeof parsedData);
      console.log('  - 是否为对象:', typeof parsedData === 'object' && parsedData !== null);
      
      if (typeof parsedData === 'object' && parsedData !== null) {
        console.log('  - 对象键:', Object.keys(parsedData));
        
        if (parsedData.data) {
          console.log('  - data字段类型:', typeof parsedData.data);
          console.log('  - data是否为数组:', Array.isArray(parsedData.data));
          
          if (Array.isArray(parsedData.data)) {
            console.log('  - 服务数据数量:', parsedData.data.length);
            console.log('  - 前3个服务数据示例:');
            parsedData.data.slice(0, 3).forEach((service, index) => {
              console.log(`    服务${index + 1}:`, {
                id: service.id || service._id,
                title: service.title,
                description: service.description || service.desc,
                image: service.image
              });
            });
          }
        }
      }
      
      console.log('\n前端处理逻辑建议:');
      console.log('1. 检查返回是否为对象');
      console.log('2. 访问对象的data字段');
      console.log('3. 确保data是数组后使用');
      console.log('4. 使用service.title, service.description, service.image等字段');
    } catch (error) {
      console.error('JSON解析错误:', error);
      console.log('原始响应数据:', data);
    }
  });
}).on('error', (error) => {
  console.error('请求错误:', error);
});