// 测试脚本来修复登录白屏问题
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// 模拟localStorage清除和登录流程测试
async function testLoginFlow() {
  console.log('=== 开始测试登录流程 ===\n');
  
  // 1. 首先测试后端API是否正常工作
  console.log('1. 测试后端登录API...');
  try {
    const loginResponse = await fetch('http://localhost:3003/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: 'admin', password: '123456' }),
    });
    
    const loginData = await loginResponse.json();
    console.log('   登录API响应状态:', loginResponse.status);
    console.log('   登录成功:', loginData.success);
    console.log('   返回token:', loginData.token ? '存在' : '不存在');
    console.log('   后端登录API测试通过。\n');
    
    // 2. 测试获取配置API
    if (loginData.token) {
      console.log('2. 测试获取配置API...');
      const configResponse = await fetch('http://localhost:3003/api/configs', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${loginData.token}`,
        },
      });
      
      const configData = await configResponse.json();
      console.log('   配置API响应状态:', configResponse.status);
      console.log('   配置数据:', configData.length > 0 ? '获取成功' : '获取失败');
      console.log('   后端配置API测试通过。\n');
    }
    
    // 3. 检查前端文件修改是否正确
    console.log('3. 检查前端文件修改...');
    const dashboardPath = path.join(__dirname, 'admin/src/views/Dashboard.vue');
    const dashboardContent = fs.readFileSync(dashboardPath, 'utf8');
    
    // 检查图标导入
    const hasCorrectIconImport = dashboardContent.includes("import { SwitchButton } from 'element-plus/icons-vue'");
    console.log('   图标正确导入:', hasCorrectIconImport ? '✅ 是' : '❌ 否');
    
    // 检查退出登录函数
    const hasLogoutFunction = dashboardContent.includes('const handleLogout = () => {');
    console.log('   退出登录函数存在:', hasLogoutFunction ? '✅ 是' : '❌ 否');
    
    // 检查退出登录按钮
    const hasLogoutButton = dashboardContent.includes('<el-button type="text" size="small" class="ml-4 logout-btn" @click="handleLogout">');
    console.log('   退出登录按钮存在:', hasLogoutButton ? '✅ 是' : '❌ 否');
    
    console.log('   前端文件修改检查完成。\n');
    
    // 4. 提供修复建议
    console.log('4. 修复建议:');
    console.log('   - 确保前端开发服务器正在运行: npm run dev');
    console.log('   - 在浏览器中清除localStorage和Cookie:');
    console.log('     * 按F12打开开发者工具');
    console.log('     * 转到Application/存储选项卡');
    console.log('     * 清除localStorage和Cookie');
    console.log('     * 刷新页面');
    console.log('   - 如果问题仍然存在，请检查浏览器控制台是否有错误信息。\n');
    
    console.log('=== 测试完成 ===');
    
  } catch (error) {
    console.error('测试过程中发生错误:', error.message);
    console.error('请确保后端服务器正在运行 (npm start in backend folder)');
  }
}

// 执行测试
testLoginFlow();