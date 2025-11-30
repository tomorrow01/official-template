const mongoose = require('mongoose');
const Contact = require('../models/Contact');

// 数据库连接配置
const mongoURI = 'mongodb://localhost:27017/official-template';

// 连接数据库并检查/导入联系我们数据
async function connectDB() {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB 连接成功');
    
    // 查询联系我们数据数量
    const count = await Contact.countDocuments();
    console.log(`数据库中联系我们数据数量: ${count}`);
    
    if (count === 0) {
      console.log('未发现联系我们数据，开始导入默认数据...');
      
      // 默认联系我们数据（模拟数据，用于展示功能）
      const defaultContacts = [
        {
          name: '张三',
          email: 'zhangsan@example.com',
          phone: '13800138000',
          subject: '网站建设咨询',
          message: '我想咨询一下贵公司的网站建设服务，我们公司是一家初创企业，需要一个专业的企业官网来提升品牌形象。希望能有机会详细沟通一下需求和报价。',
          status: 'pending',
          createdAt: new Date(Date.now() - 86400000 * 2), // 2天前
          updatedAt: new Date(Date.now() - 86400000 * 2)
        },
        {
          name: '李四',
          email: 'lisi@example.com',
          phone: '13900139000',
          subject: 'APP开发合作',
          message: '我们有一个移动应用的开发需求，主要功能是电商平台，需要原生开发。请问贵公司是否有相关的成功案例，以及大致的开发周期和预算范围？',
          status: 'processing',
          createdAt: new Date(Date.now() - 86400000 * 5), // 5天前
          updatedAt: new Date(Date.now() - 86400000 * 1) // 1天前
        },
        {
          name: '王五',
          email: 'wangwu@example.com',
          phone: '13700137000',
          subject: '数据分析服务',
          message: '我们公司需要对现有业务数据进行深入分析，以优化运营策略。希望了解贵公司的数据分析服务内容和收费标准。',
          status: 'completed',
          createdAt: new Date(Date.now() - 86400000 * 10), // 10天前
          updatedAt: new Date(Date.now() - 86400000 * 3) // 3天前
        }
      ];
      
      // 导入默认数据
      await Contact.insertMany(defaultContacts);
      console.log('成功导入3条默认联系我们数据');
    } else {
      // 如果已有数据，显示部分信息
      const contacts = await Contact.find({}).sort({ createdAt: -1 }).limit(3);
      console.log('\n最新的3条联系我们数据:');
      contacts.forEach((contact, index) => {
        console.log(`${index + 1}. ${contact.name} - ${contact.subject} (状态: ${contact.status})`);
      });
    }
    
  } catch (error) {
    console.error('连接数据库失败:', error.message);
  } finally {
    // 关闭连接
    await mongoose.connection.close();
    console.log('\n数据库连接已关闭');
  }
}

connectDB();