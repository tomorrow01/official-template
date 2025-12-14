// 脚本用途：将frontend项目的客户案例数据插入到MongoDB数据库
// 运行方式：在backend目录下执行 node insert_frontend_cases.js

const mongoose = require('mongoose');
const Case = require('./src/models/Case');

// MongoDB连接配置
const MONGO_URL = 'mongodb://127.0.0.1:27017/official-template';

// frontend项目中的模拟案例数据（适配MongoDB Case模型）
const frontendCaseData = [
  {
    description: 'XX教育使用我们的内容管理系统，内容发布效率提升60%',
    image: 'https://picsum.photos/seed/case1/400/300',
    createTime: new Date(),
    order: 1,
    isActive: true,
    title: '企业数字化转型案例'
  },
  {
    description: 'YY电商通过轮播图运营，首页点击率增长35%',
    image: 'https://picsum.photos/seed/case2/400/300',
    createTime: new Date(),
    order: 2,
    isActive: true,
    title: '电子商务平台开发案例'
  },
  {
    description: 'ZZ金融平台使用我们的解决方案，转化率提升28%',
    image: 'https://picsum.photos/seed/case3/400/300',
    createTime: new Date(),
    order: 3,
    isActive: true,
    title: '数据智能分析系统案例'
  },
  {
    description: 'AA医疗系统部署我们的应用，用户满意度提高42%',
    image: 'https://picsum.photos/seed/case4/400/300',
    createTime: new Date(),
    order: 4,
    isActive: true,
    title: '医疗健康信息化解决方案'
  }
];

// 连接MongoDB数据库
async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ 成功连接到MongoDB数据库');
  } catch (error) {
    console.error('❌ 连接MongoDB数据库失败:', error.message);
    process.exit(1);
  }
}

// 插入案例数据到数据库
async function insertCaseData() {
  try {
    // 清除现有的案例数据
    await Case.deleteMany({});
    console.log('🗑️  已清除现有的案例数据');
    
    // 插入新的案例数据
    const result = await Case.insertMany(frontendCaseData);
    console.log(`✅ 成功插入了 ${result.length} 条案例数据`);
    
    // 显示插入的数据
    console.log('📋 插入的案例数据详情：');
    result.forEach(caseItem => {
      console.log(`- ${caseItem.title}: ${caseItem.description}`);
    });
  } catch (error) {
    console.error('❌ 插入案例数据失败:', error.message);
    throw error;
  }
}

// 主函数
async function main() {
  console.log('🚀 开始将frontend案例数据插入到数据库...');
  
  try {
    // 连接数据库
    await connectToMongoDB();
    
    // 插入数据
    await insertCaseData();
    
    console.log('🎉 所有操作完成！案例数据已成功插入数据库');
  } catch (error) {
    console.error('💥 操作失败:', error.message);
  } finally {
    // 断开数据库连接
    await mongoose.disconnect();
    console.log('🔌 已断开数据库连接');
  }
}

// 执行主函数
main();