const mongoose = require('mongoose');

// 从环境变量获取数据库配置
// 使用127.0.0.1（IPv4）而不是localhost，解决某些环境下的连接问题
const dbUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/official_website';
console.log('MongoDB连接字符串:', dbUri);
console.log('提示：如果连接失败，请确保MongoDB服务已启动，或检查连接字符串配置');

// 连接数据库配置选项
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// 连接数据库
const connectDB = async () => {
  try {
    console.log('开始连接MongoDB...');
    // 先建立基础连接，不加载模型
    await mongoose.connect(dbUri, mongooseOptions);
    console.log('MongoDB 连接成功');
    return true;
  } catch (err) {
    console.error('MongoDB 连接失败:', err.message);
    console.error('详细错误信息:', err);
    // 连接失败时不要立即退出，让服务继续运行但返回错误状态
    return false;
  }
};

// 分离插入默认数据的逻辑，在确认连接成功后调用
const insertDefaultData = async () => {
  try {
    // 延迟引入Banner模型，确保在连接成功后加载
    const Banner = require('../models/Banner');
    
    // 检查是否已有轮播图数据
    const bannerCount = await Banner.countDocuments();
    if (bannerCount === 0) {
      // 插入默认轮播图数据
      const defaultBanners = [
        {
          title: '首页轮播1',
          imageUrl: '/images/banner1.jpg',
          link: '/home',
          order: 1,
          isActive: true
        },
        {
          title: '活动轮播2',
          imageUrl: '/images/banner2.jpg',
          link: '/activity',
          order: 2,
          isActive: true
        }
      ];
      await Banner.insertMany(defaultBanners);
      console.log('默认轮播图数据插入成功');
    }
  } catch (err) {
    console.error('插入默认数据失败:', err.message);
  }
};

module.exports = { connectDB, insertDefaultData };