const mongoose = require('mongoose');
const Banner = require('../models/Banner');

// MongoDB连接配置
const mongoURI = 'mongodb://localhost:27017/official-template';

// 高质量轮播图数据 - 使用业务相关的图片和文字
const bannerData = [
  {
    title: '数字化转型解决方案',
    imageUrl: 'https://picsum.photos/id/180/1920/1080', // 现代办公/技术场景
    link: '/services',
    order: 1,
    isActive: true
  },
  {
    title: '人工智能技术应用',
    imageUrl: 'https://picsum.photos/id/160/1920/1080', // 科技/数据场景
    link: '/services',
    order: 2,
    isActive: true
  },
  {
    title: '企业云计算服务',
    imageUrl: 'https://picsum.photos/id/119/1920/1080', // 云/网络场景
    link: '/services',
    order: 3,
    isActive: true
  },
  {
    title: '成功客户案例展示',
    imageUrl: 'https://picsum.photos/id/169/1920/1080', // 团队/合作场景
    link: '/cases',
    order: 4,
    isActive: true
  }
];

async function updateBanners() {
  try {
    // 连接MongoDB
    await mongoose.connect(mongoURI);
    console.log('MongoDB连接成功');

    // 获取现有轮播图
    const existingBanners = await Banner.find();
    console.log(`找到${existingBanners.length}张现有轮播图`);

    // 如果没有轮播图，直接插入新数据
    if (existingBanners.length === 0) {
      const result = await Banner.insertMany(bannerData);
      console.log(`成功添加${result.length}张轮播图`);
      console.log('添加的轮播图数据:', result);
    } else {
      // 更新现有轮播图
      const updatePromises = [];
      
      // 首先禁用所有现有轮播图
      await Banner.updateMany({}, { $set: { isActive: false } });
      console.log('已禁用所有现有轮播图');
      
      // 更新或创建轮播图
      for (let i = 0; i < bannerData.length; i++) {
        if (i < existingBanners.length) {
          // 更新现有轮播图
          const updatePromise = Banner.findByIdAndUpdate(
            existingBanners[i]._id,
            bannerData[i],
            { new: true }
          );
          updatePromises.push(updatePromise);
        } else {
          // 创建新轮播图
          const newBanner = new Banner(bannerData[i]);
          updatePromises.push(newBanner.save());
        }
      }
      
      const results = await Promise.all(updatePromises);
      console.log(`成功更新${results.length}张轮播图`);
      console.log('更新后的轮播图数据:', results);
    }

    // 断开连接
    await mongoose.disconnect();
  } catch (error) {
    console.error('更新轮播图失败:', error);
    await mongoose.disconnect();
  }
}

updateBanners();