// 测试头像显示功能的脚本
const fetch = require('node-fetch');

async function testAvatar() {
    console.log('测试头像显示功能...');
    
    // 1. 测试登录接口，获取包含头像信息的用户数据
    console.log('\n1. 测试登录接口...');
    const loginResponse = await fetch('http://localhost:3003/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: '123456' })
    });
    
    const loginData = await loginResponse.json();
    console.log('登录响应:', JSON.stringify(loginData, null, 2));
    
    if (loginData.code !== 200) {
        console.error('登录失败:', loginData.error);
        return;
    }
    
    // 检查用户信息是否包含头像字段
    if (loginData.data.user.avatar) {
        console.log('✓ 用户信息包含头像字段:', loginData.data.user.avatar);
    } else {
        console.error('✗ 用户信息缺少头像字段');
        return;
    }
    
    // 2. 测试获取当前用户信息接口
    console.log('\n2. 测试获取当前用户信息接口...');
    const currentResponse = await fetch('http://localhost:3003/api/auth/current', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${loginData.data.token}` }
    });
    
    const currentData = await currentResponse.json();
    console.log('获取当前用户信息响应:', JSON.stringify(currentData, null, 2));
    
    if (currentData.code !== 200) {
        console.error('获取当前用户信息失败:', currentData.error);
        return;
    }
    
    // 检查用户信息是否包含头像字段
    if (currentData.data.avatar) {
        console.log('✓ 当前用户信息包含头像字段:', currentData.data.avatar);
    } else {
        console.error('✗ 当前用户信息缺少头像字段');
        return;
    }
    
    // 3. 测试头像图片是否可以访问
    console.log('\n3. 测试头像图片是否可以访问...');
    const avatarResponse = await fetch('http://localhost:5174' + currentData.data.avatar);
    console.log('头像图片响应状态码:', avatarResponse.status);
    
    if (avatarResponse.status === 200) {
        console.log('✓ 头像图片可以正常访问');
    } else {
        console.error('✗ 头像图片访问失败');
        return;
    }
    
    console.log('\n🎉 所有测试通过！头像显示功能应该可以正常工作了。');
    console.log('\n注意事项：');
    console.log('1. 如果您已经登录，请先退出登录，然后重新登录，确保获取到最新的用户信息');
    console.log('2. 清除浏览器缓存，然后刷新页面');
    console.log('3. 检查浏览器开发者工具的控制台是否有错误信息');
}

testAvatar().catch(error => {
    console.error('测试过程中发生错误:', error);
});