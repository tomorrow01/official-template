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
    // 延迟引入所有模型，确保在连接成功后加载
    const Banner = require('../models/Banner');
    const Service = require('../models/Service');
    const Case = require('../models/Case');
    const Article = require('../models/Article');
    
    // 插入默认轮播图数据
    const bannerCount = await Banner.countDocuments();
    if (bannerCount === 0) {
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
    
    // 插入默认服务数据
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      const defaultServices = [
        {
          title: '网站建设',
          description: '专业的网站设计与开发，响应式布局，提升品牌形象',
          icon: 'el-icon-s-grid',
          order: 1,
          isActive: true
        },
        {
          title: 'APP开发',
          description: '定制化移动应用开发，原生体验，满足企业需求',
          icon: 'el-icon-mobile',
          order: 2,
          isActive: true
        },
        {
          title: '数据分析',
          description: '专业的数据收集与分析服务，助力企业决策',
          icon: 'el-icon-pie-chart',
          order: 3,
          isActive: true
        }
      ];
      await Service.insertMany(defaultServices);
      console.log('默认服务数据插入成功');
    }
    
    // 插入默认案例数据
    const caseCount = await Case.countDocuments();
    if (caseCount === 0) {
      const defaultCases = [
        {
          title: 'Vue 3 新特性解读',
          description: '深入解析组合式 API...',
          image: '/images/case-bg-1.png',
          order: 1,
          isActive: true
        },
        {
          title: 'React 性能优化实践',
          description: '分享 React 组件优化技巧...',
          image: '/images/case-bg-2.png',
          order: 2,
          isActive: true
        },
        {
          title: 'Node.js 微服务架构',
          description: '构建高性能可扩展的微服务系统...',
          image: '/images/case-bg-3.png',
          order: 3,
          isActive: true
        }
      ];
      await Case.insertMany(defaultCases);
      console.log('默认案例数据插入成功');
    }
    
    // 插入默认文章数据
    const articleCount = await Article.countDocuments();
    if (articleCount === 0) {
      const defaultArticles = [
        {
          title: 'Vue 3 新特性解读',
          content: '深入解析组合式 API...',
          image: '/images/case1.png',
          order: 1,
          isActive: true
        },
        {
          title: 'React 性能优化实践',
          content: '分享 React 组件优化技巧...',
          image: '/images/case2.png',
          order: 2,
          isActive: true
        }
      ];
      await Article.insertMany(defaultArticles);
      console.log('默认文章数据插入成功');
    }
  } catch (err) {
    console.error('插入默认数据失败:', err.message);
    console.error('详细错误:', err);
  }
};

module.exports = { connectDB, insertDefaultData };