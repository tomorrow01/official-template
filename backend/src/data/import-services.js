const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs').promises;

// 导入Service模型
const Service = require('../models/Service');

// 数据库连接配置
const mongoURI = 'mongodb://localhost:27017/official-template';

// 核心服务数据（从前端模拟数据中提取）
const servicesData = [
  {
    title: '软件开发',
    description: '为客户提供定制化的软件开发服务，包括Web应用、移动应用和企业级解决方案。',
    icon: 'Management',
    order: 1,
    isActive: true,
    image: '/images/services/software-development.jpg'
  },
  {
    title: '数字化转型',
    description: '帮助企业实现数字化转型，优化业务流程，提升运营效率。',
    icon: 'Monitor',
    order: 2,
    isActive: true,
    image: '/images/services/digital-transformation.jpg'
  },
  {
    title: '云服务',
    description: '提供云计算解决方案，包括云迁移、云托管和云安全服务。',
    icon: 'Cloud',
    order: 3,
    isActive: true,
    image: '/images/services/cloud-services.jpg'
  },
  {
    title: '人工智能',
    description: '利用人工智能技术为企业提供智能决策支持和自动化解决方案。',
    icon: 'StarFilled',
    order: 4,
    isActive: true,
    image: '/images/services/ai.jpg'
  },
  {
    title: '大数据分析',
    description: '通过大数据分析帮助企业挖掘数据价值，优化业务决策。',
    icon: 'Histogram',
    order: 5,
    isActive: true,
    image: '/images/services/big-data.jpg'
  },
  {
    title: 'IT咨询',
    description: '提供专业的IT战略咨询服务，帮助企业制定技术发展规划。',
    icon: 'Briefcase',
    order: 6,
    isActive: true,
    image: '/images/services/it-consulting.jpg'
  }
];

// 连接数据库
async function connectDB() {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB数据库连接成功');
  } catch (error) {
    console.error('MongoDB数据库连接失败:', error.message);
    process.exit(1);
  }
}

// 导入数据
async function importData() {
  try {
    console.log('开始导入核心服务数据...');
    
    // 先清空现有数据
    await Service.deleteMany({});
    console.log('已清空现有服务数据');
    
    // 导入新数据
    const importedServices = await Service.insertMany(servicesData);
    console.log(`成功导入 ${importedServices.length} 条服务数据`);
    
    // 显示导入的数据详情
    importedServices.forEach(service => {
      console.log(`- ${service.title} (ID: ${service._id})`);
    });
    
    console.log('数据导入完成！');
  } catch (error) {
    console.error('数据导入失败:', error.message);
  } finally {
    // 关闭数据库连接
    mongoose.connection.close();
    console.log('数据库连接已关闭');
  }
}

// 执行导入
async function run() {
  try {
    await connectDB();
    await importData();
  } catch (error) {
    console.error('执行导入脚本时出错:', error.message);
    process.exit(1);
  }
}

// 运行脚本
if (require.main === module) {
  run();
}

module.exports = { run, importData }; // 导出函数以便在其他地方调用