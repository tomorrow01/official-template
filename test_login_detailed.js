// 更详细的登录功能测试脚本，模拟浏览器环境
const fs = require('fs');
const path = require('path');

// 模拟localStorage
const localStorage = {
  data: {},
  getItem: function(key) {
    return this.data[key] || null;
  },
  setItem: function(key, value) {
    this.data[key] = value;
  },
  removeItem: function(key) {
    delete this.data[key];
  },
  clear: function() {
    this.data = {};
  }
};

// 测试登录API
async function testLogin() {
  console.log('测试登录API...');
  
  try {
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
      // 保存token和用户信息到localStorage
      localStorage.setItem('admin-token', data.token);
      localStorage.setItem('admin-user', JSON.stringify(data.user));
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
    
    if (!response.ok) {
      console.error('获取配置请求状态错误:', response.status);
      const text = await response.text();
      console.error('响应内容:', text);
      return;
    }
    
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

// 测试解析localStorage数据
function testParseLocalStorage() {
  console.log('\n测试解析localStorage数据...');
  
  try {
    // 模拟Dashboard组件中的解析逻辑
    const userData = localStorage.getItem('admin-user');
    console.log('localStorage中的admin-user数据:', userData);
    
    // 模拟Dashboard组件中的解析方式
    const currentUser = userData ? JSON.parse(userData) : { username: '管理员' };
    console.log('解析后的用户数据:', currentUser);
    console.log('用户名:', currentUser.username);
    
    return currentUser;
  } catch (error) {
    console.error('解析localStorage数据失败:', error);
    return null;
  }
}

// 运行测试
async function runTests() {
  console.log('开始测试管理后台登录和API功能...');
  
  // 清除localStorage
  localStorage.clear();
  console.log('初始localStorage:', localStorage.data);
  
  const token = await testLogin();
  if (token) {
    await testGetConfigs(token);
    testParseLocalStorage();
  }
  
  // 测试不同情况下的localStorage解析
  console.log('\n测试不同情况下的localStorage解析:');
  
  // 测试null/undefined情况
  localStorage.removeItem('admin-user');
  testParseLocalStorage();
  
  // 测试空字符串情况
  localStorage.setItem('admin-user', '');
  testParseLocalStorage();
  
  // 测试无效JSON情况
  localStorage.setItem('admin-user', '{invalid_json}');
  testParseLocalStorage();
  
  console.log('\n测试完成！');
}

runTests();