const mongoose = require('mongoose');
const Banner = require('../models/Banner');

// MongoDB连接配置
const mongoURI = 'mongodb://localhost:27017/official-template';

// 高质量响应式轮播图数据 - 使用适合Banner组件尺寸要求的图片
// 根据组件分析，轮播图使用object-cover，且高度在不同设备上为70vh-90vh
// 选择21:9宽高比的图片，适合各种屏幕尺寸的响应式显示
const bannerData = [
  {
    title: '数字化转型解决方案',
    imageUrl: 'https://picsum.photos/id/1/2100/900', // 21:9宽高比的技术场景图片
    link: '/services',
    order: 1,
    isActive: true,
    description: '为企业提供全方位的数字化转型策略与技术支持',
    ctaText: '了解更多'
  },
  {
    title: '人工智能技术应用',
    imageUrl: 'https://picsum.photos/id/180/2100/900', // 21:9宽高比的AI/数据场景图片
    link: '/services',
    order: 2,
    isActive: true,
    description: '利用先进AI技术提升业务效率，创造智能解决方案',
    ctaText: '探索AI服务'
  },
  {
    title: '企业云计算服务',
    imageUrl: 'https://picsum.photos/id/119/2100/900', // 21:9宽高比的云计算场景图片
    link: '/services',
    order: 3,
    isActive: true,
    description: '安全可靠的企业级云服务，助力业务灵活扩展',
    ctaText: '云服务方案'
  },
  {
    title: '成功客户案例展示',
    imageUrl: 'https://picsum.photos/id/169/2100/900', // 21:9宽高比的团队/合作场景图片
    link: '/cases',
    order: 4,
    isActive: true,
    description: '探索我们如何帮助各行业客户实现业务增长与创新',
    ctaText: '查看案例'
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

    // 更新现有轮播图或创建新轮播图
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
    console.log('更新后的轮播图数据:');
    results.forEach((banner, index) => {
      console.log(`${index + 1}. ${banner.title} - ${banner.imageUrl}`);
    });

    // 断开连接
    await mongoose.disconnect();
  } catch (error) {
    console.error('更新轮播图失败:', error);
    await mongoose.disconnect();
  }
}

updateBanners();