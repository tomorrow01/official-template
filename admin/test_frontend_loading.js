import fetch from 'node-fetch';

// 测试前端页面加载情况
async function testFrontendLoading() {
  console.log('开始测试前端页面加载情况...');

  try {
    // 1. 检查登录页面是否能正常加载
    console.log('\n1. 测试登录页面加载...');
    const loginResponse = await fetch('http://localhost:5173/login');
    console.log('登录页面状态码:', loginResponse.status);
    if (loginResponse.ok) {
      console.log('✅ 登录页面加载成功');
    } else {
      console.error('❌ 登录页面加载失败');
    }

    // 2. 登录获取token
    console.log('\n2. 测试登录功能...');
    const loginDataResponse = await fetch('http://localhost:3003/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: 'admin', password: '123456' })
    });

    if (!loginDataResponse.ok) {
      throw new Error(`登录失败: ${loginDataResponse.status}`);
    }

    const loginData = await loginDataResponse.json();
    console.log('✅ 登录成功，获取到token:', loginData.token);

    // 3. 测试带token访问配置管理页面
    console.log('\n3. 测试带token访问配置管理页面...');
    const configPageResponse = await fetch('http://localhost:5173/dashboard/config', {
      headers: {
        'Cookie': `admin-token=${loginData.token}; admin-user=${encodeURIComponent(JSON.stringify(loginData.user))}`
      }
    });

    console.log('配置管理页面状态码:', configPageResponse.status);
    if (configPageResponse.ok) {
      const pageContent = await configPageResponse.text();
      console.log('页面内容长度:', pageContent.length);
      // 检查页面是否包含关键内容
      if (pageContent.includes('基础配置管理')) {
        console.log('✅ 配置管理页面包含关键内容');
      } else {
        console.error('❌ 配置管理页面不包含关键内容');
        console.log('页面内容预览:', pageContent.substring(0, 200) + '...');
      }
    } else {
      console.error('❌ 配置管理页面加载失败');
    }

    // 4. 检查配置管理接口
    console.log('\n4. 测试配置管理接口...');
    const configsResponse = await fetch('http://localhost:3003/api/configs', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${loginData.token}`
      }
    });

    if (!configsResponse.ok) {
      throw new Error(`获取配置失败: ${configsResponse.status}`);
    }

    const configsData = await configsResponse.json();
    console.log('✅ 配置管理接口正常工作，共', configsData.length, '条配置');

    console.log('\n✅ 前端页面加载测试完成！');
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    console.error('详细错误:', error);
  }
}

testFrontendLoading();