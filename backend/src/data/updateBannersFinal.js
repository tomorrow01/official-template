const mongoose = require('mongoose');
const Banner = require('../models/Banner');

// MongoDB连接配置
const mongoURI = 'mongodb://localhost:27017/official_template';

// 高质量轮播图数据
const bannersData = [
  {
    title: '数字化转型解决方案',
    description: '助力企业实现全面数字化，提升运营效率与市场竞争力',
    ctaText: '了解详情',
    imageUrl: 'https://picsum.photos/id/1/2100/900', // 21:9比例高质量图片
    link: '/services/digital-transformation',
    order: 1,
    isActive: true
  },
  {
    title: '人工智能技术应用',
    description: '利用AI技术赋能业务创新，实现智能化决策与自动化运营',
    ctaText: '探索AI服务',
    imageUrl: 'https://picsum.photos/id/20/2100/900', // 21:9比例高质量图片
    link: '/services/ai-solutions',
    order: 2,
    isActive: true
  },
  {
    title: '企业云计算服务',
    description: '安全可靠的云服务解决方案，灵活扩展，降低IT成本',
    ctaText: '云服务咨询',
    imageUrl: 'https://picsum.photos/id/3/2100/900', // 21:9比例高质量图片
    link: '/services/cloud-computing',
    order: 3,
    isActive: true
  },
  {
    title: '成功客户案例展示',
    description: '探索我们如何帮助不同行业的客户实现业务增长与技术创新',
    ctaText: '查看案例',
    imageUrl: 'https://picsum.photos/id/48/2100/900', // 21:9比例高质量图片
    link: '/cases',
    order: 4,
    isActive: true
  }
];

// 连接MongoDB并更新轮播图数据
async function updateBanners() {
  try {
    // 连接数据库
    await mongoose.connect(mongoURI);
    console.log('MongoDB连接成功！');

    // 1. 将所有现有轮播图设置为非激活状态
    const disabledCount = await Banner.updateMany({}, { $set: { isActive: false } });
    console.log(`已禁用 ${disabledCount.modifiedCount} 张现有轮播图`);

    // 2. 更新或插入新的轮播图数据
    let updatedCount = 0;
    let createdCount = 0;

    for (const bannerData of bannersData) {
      // 查找是否存在相同order的轮播图
      const existingBanner = await Banner.findOne({ order: bannerData.order });

      if (existingBanner) {
        // 更新现有轮播图
        await Banner.findByIdAndUpdate(existingBanner._id, { 
          $set: { ...bannerData, isActive: true } 
        });
        updatedCount++;
      } else {
        // 创建新轮播图
        await Banner.create(bannerData);
        createdCount++;
      }
    }

    console.log(`成功更新 ${updatedCount} 张轮播图，创建 ${createdCount} 张新轮播图`);
    console.log('轮播图数据已全部更新完成！');

  } catch (error) {
    console.error('更新轮播图数据时出错:', error);
  } finally {
    // 关闭数据库连接
    await mongoose.connection.close();
    console.log('MongoDB连接已关闭');
  }
}

// 执行更新操作
updateBanners();