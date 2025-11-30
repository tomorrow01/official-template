const mongoose = require('mongoose');
const Service = require('../models/Service');

// 数据库连接配置
const mongoURI = 'mongodb://localhost:27017/official-template';

// 连接数据库
async function connectDB() {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB 连接成功');
    
    // 查询服务数量
    const count = await Service.countDocuments();
    console.log(`数据库中服务数量: ${count}`);
    
    // 查询所有服务的详细信息
    const services = await Service.find({});
    console.log('\n所有服务数据:');
    services.forEach((service, index) => {
      console.log(`${index + 1}. ${service.title} (激活状态: ${service.isActive})`);
    });
    
  } catch (error) {
    console.error('连接数据库失败:', error.message);
  } finally {
    // 关闭连接
    await mongoose.connection.close();
    console.log('\n数据库连接已关闭');
  }
}

connectDB();