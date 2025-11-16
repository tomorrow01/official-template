const mongoose = require('mongoose');
const Banner = require('../models/Banner');

// MongoDB连接配置
const mongoURI = 'mongodb://localhost:27017/official-template';

// 轮播图数据 - 使用高质量的业务相关图片和文字
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
    link: '/services/ai-solutions',
    order: 2,
    isActive: true
  },
  {
    title: '企业云计算服务',
    imageUrl: 'https://picsum.photos/id/119/1920/1080', // 云/网络场景
    link: '/services/cloud-computing',
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

async function addBanners() {
  try {
    // 连接MongoDB
    await mongoose.connect(mongoURI);
    console.log('MongoDB连接成功');

    // 检查是否已存在轮播图数据
    const existingBanners = await Banner.find();
    if (existingBanners.length > 0) {
      console.log(`已存在${existingBanners.length}张轮播图，跳过添加`);
      await mongoose.disconnect();
      return;
    }

    // 添加轮播图数据
    const result = await Banner.insertMany(bannerData);
    console.log(`成功添加${result.length}张轮播图`);
    console.log('添加的轮播图数据:', result);

    // 断开连接
    await mongoose.disconnect();
  } catch (error) {
    console.error('添加轮播图失败:', error);
    await mongoose.disconnect();
  }
}

addBanners();