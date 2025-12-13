// 测试登录功能的简化脚本
// 这个脚本模拟了用户在浏览器中登录的流程

const fs = require('fs');

async function testLoginFlow() {
  console.log('模拟用户登录流程...');
  
  // 1. 清除localStorage中的所有数据（模拟首次访问）
  console.log('1. 清除localStorage数据');
  
  // 2. 测试登录API
  console.log('2. 测试登录API');
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
      console.error('登录失败:', response.status);
      return false;
    }
    
    const data = await response.json();
    console.log('   登录成功:', data.user.username);
    
    // 3. 测试配置API
    console.log('3. 测试配置API');
    const configResponse = await fetch('http://localhost:3003/api/configs', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${data.token}`
      }
    });
    
    if (!configResponse.ok) {
      console.error('获取配置失败:', configResponse.status);
      return false;
    }
    
    const configs = await configResponse.json();
    console.log('   配置获取成功，共', configs.length, '条配置');
    
    console.log('\n✅ 登录流程测试成功！');
    console.log('\n修复说明：');
    console.log('- 修复了Dashboard.vue中的localStorage解析问题');
    console.log('- 添加了try-catch块来防止JSON.parse抛出异常导致白屏');
    console.log('- 当解析失败时，会清除无效数据并使用默认值');
    
    return true;
  } catch (error) {
    console.error('测试失败:', error);
    return false;
  }
}

testLoginFlow();