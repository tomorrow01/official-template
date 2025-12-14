const mongoose = require('mongoose');

// 从环境变量获取数据库配置
// 使用127.0.0.1（IPv4）而不是localhost，解决某些环境下的连接问题
const dbUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/official-template';
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
    const Config = require('../models/Config');
    const fs = require('fs').promises;
    const path = require('path');
    
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
          title: '电商平台全栈开发',
          description: '为某大型零售企业开发的全渠道电商平台，采用Vue 3 + Node.js微服务架构，实现了高并发、高性能的购物体验。平台支持PC、移动端和小程序，包含商品管理、订单系统、支付集成、物流追踪等完整功能模块。上线后，企业销售额提升了45%，用户满意度达到92%。',
          image: '/images/cases/ecommerce-platform.jpg',
          order: 1,
          isActive: true
        },
        {
          title: '企业数字化转型方案',
          description: '帮助传统制造企业实现数字化转型，构建了基于大数据的生产管理系统和客户关系管理平台。通过物联网技术实时监控生产设备，使用人工智能算法优化生产流程，提高了生产效率30%，降低了运营成本20%。系统支持多终端访问，管理层可以实时掌握企业运营状况。',
          image: '/images/cases/digital-transformation.jpg',
          order: 2,
          isActive: true
        },
        {
          title: '智慧教育平台',
          description: '为教育机构开发的智慧教育平台，集成了在线课程、直播教学、作业管理、考试系统等功能。平台采用响应式设计，支持各种设备访问，同时具备强大的数据分析能力，可以跟踪学生学习进度和教师教学效果。平台已服务超过100所学校，注册用户突破50万。',
          image: '/images/cases/education-platform.jpg',
          order: 3,
          isActive: true
        },
        {
          title: '医疗健康管理系统',
          description: '为医疗机构开发的全流程医疗健康管理系统，涵盖了患者管理、电子病历、预约挂号、诊疗流程、药品管理等模块。系统符合医疗行业标准，具备严格的数据安全和隐私保护机制。上线后，医院的挂号效率提升了60%，患者等待时间减少了50%，医疗资源得到了更合理的配置。',
          image: '/images/cases/healthcare-system.jpg',
          order: 4,
          isActive: true
        },
        {
          title: '金融科技应用开发',
          description: '为金融机构开发的创新金融科技应用，包含移动银行、在线支付、投资管理等功能。应用采用多重安全认证机制，确保交易安全。系统具备高可用性和可扩展性，能够处理高峰期的大量并发请求。上线后，用户活跃度提升了80%，交易成功率达到99.99%。',
          image: '/images/cases/fintech-app.jpg',
          order: 5,
          isActive: true
        },
        {
          title: '智慧城市解决方案',
          description: '为城市管理部门开发的智慧城市综合管理平台，集成了交通监控、环境监测、公共安全、便民服务等多个子系统。通过大数据分析和人工智能技术，实现了城市资源的智能调度和优化配置。平台上线后，城市交通拥堵指数下降了25%，环境质量监测覆盖率达到100%，市民满意度显著提升。',
          image: '/images/cases/smart-city.jpg',
          order: 6,
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
          author: '系统管理员',
          image: '/images/case1.png',
          sort: 1,
          status: true
        },
        {
          title: 'React 性能优化实践',
          content: '分享 React 组件优化技巧...',
          author: '系统管理员',
          image: '/images/case2.png',
          sort: 2,
          status: true
        }
      ];
      await Article.insertMany(defaultArticles);
      console.log('默认文章数据插入成功');
    }
    
    // 同步配置数据到数据库
    const configCount = await Config.countDocuments();
    if (configCount === 0) {
      // 读取本地配置文件
      const configPath = path.join(__dirname, '../data/configs.json');
      const configData = JSON.parse(await fs.readFile(configPath, 'utf8'));
      
      // 转换数据格式并插入到数据库
      const configsToInsert = configData.map(config => ({
        key: config.key,
        name: config.name,
        value: config.value,
        description: config.description,
        createTime: new Date(config.createTime),
        updateTime: new Date(config.updateTime)
      }));
      
      await Config.insertMany(configsToInsert);
      console.log('配置数据同步到数据库成功');
    }
  } catch (err) {
    console.error('插入默认数据失败:', err.message);
    console.error('详细错误:', err);
  }
};

module.exports = { connectDB, insertDefaultData };