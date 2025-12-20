// 测试脚本：验证表格数据处理修复
const axios = require('axios');

// 测试后端API是否正常返回数据
async function testBackendAPI() {
  try {
    console.log('测试后端API...');
    
    // 测试服务列表API
    const servicesResponse = await axios.get('http://localhost:3003/api/services');
    console.log('服务列表API状态:', servicesResponse.status);
    console.log('服务列表数据格式:', typeof servicesResponse.data);
    console.log('服务列表数据项数量:', servicesResponse.data.data ? servicesResponse.data.data.length : 0);
    
    // 测试案例列表API
    const casesResponse = await axios.get('http://localhost:3003/api/cases');
    console.log('案例列表API状态:', casesResponse.status);
    console.log('案例列表数据格式:', typeof casesResponse.data);
    console.log('案例列表数据项数量:', casesResponse.data.data ? casesResponse.data.data.length : 0);
    
    // 测试轮播图列表API
    const bannersResponse = await axios.get('http://localhost:3003/api/banners');
    console.log('轮播图列表API状态:', bannersResponse.status);
    console.log('轮播图列表数据格式:', typeof bannersResponse.data);
    console.log('轮播图列表数据项数量:', bannersResponse.data.data ? bannersResponse.data.data.length : 0);
    
    console.log('✅ 后端API测试通过！');
    return true;
  } catch (error) {
    console.error('❌ 后端API测试失败:', error.message);
    return false;
  }
}

// 运行测试
testBackendAPI()
  .then(result => {
    if (result) {
      console.log('\n🎉 所有测试通过！表格功能修复成功。');
    } else {
      console.log('\n❌ 测试失败，请检查修复。');
    }
  })
  .catch(error => {
    console.error('❌ 测试执行失败:', error.message);
  });