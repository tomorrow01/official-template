// 测试登录功能的脚本
const fs = require('fs');
const path = require('path');
// 使用Node.js内置的fetch API

// 测试登录API
async function testLogin() {
  console.log('测试登录API...');
  
  try {
    // 使用正确的登录接口路径
    const response = await fetch('http://localhost:3003/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        password: '123456'
      })
    });
    
    // 先检查响应状态
    if (!response.ok) {
      console.error('登录请求状态错误:', response.status);
      const text = await response.text();
      console.error('响应内容:', text);
      return null;
    }
    
    const data = await response.json();
    console.log('登录响应:', data);
    
    if (data.token && data.user) {
      console.log('登录成功！');
      // 保存token以便后续测试
      const testData = {
        token: data.token,
        user: data.user
      };
      fs.writeFileSync(path.join(__dirname, 'test_auth_data.json'), JSON.stringify(testData));
      return data.token;
    } else {
      console.error('登录失败：缺少token或用户信息');
      return null;
    }
  } catch (error) {
    console.error('登录请求失败:', error);
    return null;
  }
}

// 测试获取配置API
async function testGetConfigs(token) {
  if (!token) {
    console.error('没有token，无法测试配置API');
    return;
  }
  
  console.log('\n测试获取配置API...');
  
  try {
    const response = await fetch('http://localhost:3003/api/configs', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    console.log('配置响应:', data);
    
    if (Array.isArray(data) || (data.data && Array.isArray(data.data))) {
      console.log('配置获取成功！');
    } else {
      console.error('配置获取失败：返回数据格式不正确');
    }
  } catch (error) {
    console.error('配置请求失败:', error);
  }
}

// 运行测试
async function runTests() {
  console.log('开始测试管理后台登录和API功能...');
  
  const token = await testLogin();
  if (token) {
    await testGetConfigs(token);
  }
  
  console.log('\n测试完成！');
}

runTests();