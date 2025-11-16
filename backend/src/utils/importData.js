// 数据导入脚本
const mongoose = require('mongoose');
const Article = require('../models/Article');
const Banner = require('../models/Banner');
const Content = require('../models/Content');
const fs = require('fs');
const path = require('path');

// MongoDB连接配置
const mongoUri = 'mongodb://localhost:27017/official_website';

// 示例数据
const sampleArticles = [
  {
    title: '技术创新引领数字化未来',
    content: '随着科技的快速发展，数字化转型已成为企业发展的必然趋势。我们提供全方位的技术服务和解决方案，助力企业实现数字化转型，提升核心竞争力。\n\n我们的专业团队拥有多年行业经验，精通各类技术栈，能够为客户提供高质量、定制化的解决方案。从需求分析到系统设计，从开发测试到上线维护，我们全程参与，确保项目顺利实施。\n\n通过数字化转型，企业可以优化业务流程，提高运营效率，降低成本，提升客户体验，在激烈的市场竞争中保持优势地位。',
    author: '技术部',
    image: 'https://picsum.photos/id/1/800/450',
    sort: 1,
    status: true,
    createTime: new Date()
  },
  {
    title: '专业团队助力企业成功',
    content: '我们的团队由一群充满激情和创造力的专业人士组成，他们在各自的领域拥有丰富的经验和深厚的技术积累。\n\n团队成员来自知名企业和高校，具有良好的教育背景和实践经验。我们注重团队协作，不断学习和创新，以应对日益复杂的技术挑战。\n\n我们坚持客户至上的服务理念，深入了解客户需求，为客户提供最适合的解决方案。凭借专业的技术能力和优质的服务，我们赢得了众多客户的信赖和好评。',
    author: '人力资源部',
    image: 'https://picsum.photos/id/20/800/450',
    sort: 2,
    status: true,
    createTime: new Date(Date.now() - 86400000)
  },
  {
    title: '定制服务满足个性化需求',
    content: '每个企业都有其独特的业务模式和发展需求，标准化的解决方案往往难以满足企业的个性化需求。为此，我们提供定制化的服务，根据企业的实际情况，量身定制最适合的解决方案。\n\n我们的定制服务包括需求调研、方案设计、系统开发、测试上线、运维支持等全流程服务。通过深入了解企业的业务流程和发展战略，我们能够为企业提供真正有价值的解决方案，帮助企业实现业务目标。\n\n我们的定制服务具有灵活性高、针对性强、实施效果好等特点，能够满足不同行业、不同规模企业的多样化需求。',
    author: '产品部',
    image: 'https://picsum.photos/id/48/800/450',
    sort: 3,
    status: true,
    createTime: new Date(Date.now() - 172800000)
  }
];

const sampleBanners = [
  {
    title: '创新技术引领数字化未来',
    imageUrl: 'https://picsum.photos/id/1071/1920/1080',
    link: '/services',
    order: 1,
    isActive: true,
    createdAt: new Date()
  },
  {
    title: '专业解决方案助力企业成长',
    imageUrl: 'https://picsum.photos/id/201/1920/1080',
    link: '/cases',
    order: 2,
    isActive: true,
    createdAt: new Date(Date.now() - 86400000)
  },
  {
    title: '定制化服务满足您的需求',
    imageUrl: 'https://picsum.photos/id/180/1920/1080',
    link: '/about',
    order: 3,
    isActive: true,
    createdAt: new Date(Date.now() - 172800000)
  }
];

const sampleContents = [
  {
    title: '公司简介',
    type: '公告',
    status: '发布',
    content: '我们是一家专注于为企业提供数字化转型解决方案的技术服务公司。成立以来，我们始终坚持以客户为中心，以技术创新为驱动，致力于为客户创造最大价值。\n\n公司拥有一支专业的技术团队，他们在云计算、大数据、人工智能、物联网等领域拥有丰富的经验和深厚的技术积累。我们能够为客户提供从咨询、设计、开发到运维的全流程服务。\n\n我们的服务涵盖多个行业，包括制造、金融、零售、医疗、教育等。凭借专业的技术能力和优质的服务，我们赢得了众多客户的信赖和好评。\n\n未来，我们将继续秉承创新、专业、诚信、共赢的理念，不断提升服务质量和技术水平，为客户提供更加优质的解决方案，助力企业实现可持续发展。',
    sort: 1,
    updateTime: new Date()
  },
  {
    title: '服务条款',
    type: '规则',
    status: '发布',
    content: '欢迎您使用我们的服务。本服务条款规定了您使用我们服务的权利和义务，请您仔细阅读。\n\n1. 服务内容\n我们提供的服务包括但不限于技术咨询、系统设计、软件开发、测试、运维支持等。\n\n2. 用户义务\n用户应遵守相关法律法规，不得利用我们的服务从事任何违法违规的活动。\n用户应保护好自己的账号和密码，如因用户自身原因导致账号被盗用，我们不承担责任。\n\n3. 服务变更\n我们有权根据业务发展需要，对服务内容进行调整或变更，并提前通知用户。\n\n4. 免责声明\n对于因不可抗力因素导致的服务中断或数据丢失，我们不承担责任。\n\n5. 争议解决\n如发生争议，双方应友好协商解决；协商不成的，任何一方均可向有管辖权的人民法院提起诉讼。',
    sort: 2,
    updateTime: new Date(Date.now() - 86400000)
  },
  {
    title: '隐私政策',
    type: '规则',
    status: '发布',
    content: '我们高度重视用户隐私保护，本隐私政策说明了我们如何收集、使用和保护用户的个人信息。\n\n1. 信息收集\n我们可能收集的信息包括但不限于用户姓名、联系方式、公司名称、业务需求等。\n\n2. 信息使用\n我们收集的信息仅用于为用户提供服务、改进服务质量、开发新产品等目的。\n\n3. 信息保护\n我们采取严格的安全措施，保护用户信息不被未经授权的访问、使用或泄露。\n\n4. 信息共享\n未经用户明确同意，我们不会向第三方共享用户的个人信息。\n\n5. 政策更新\n我们可能会根据法律法规的变化或业务发展需要，更新本隐私政策。',
    sort: 3,
    updateTime: new Date(Date.now() - 172800000)
  },
  {
    title: '技术白皮书发布通知',
    type: '公告',
    status: '草稿',
    content: '我们将于近期发布《2024年企业数字化转型白皮书》，该白皮书深入分析了当前企业数字化转型的现状、挑战和趋势，并提供了实用的转型策略和最佳实践。\n\n白皮书涵盖以下内容：\n1. 企业数字化转型的定义和重要性\n2. 当前数字化转型的主要挑战\n3. 成功案例分析\n4. 转型策略和方法论\n5. 技术选型建议\n6. 实施路径和注意事项\n\n我们诚挚邀请您下载阅读，希望能够为您的企业数字化转型提供有益的参考。',
    sort: 4,
    updateTime: new Date(Date.now() - 86400000)
  }
];

// 连接数据库并导入数据
async function importData() {
  try {
    console.log('开始连接MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('MongoDB连接成功！');

    // 清空现有数据
    console.log('开始清空现有数据...');
    await Article.deleteMany({});
    await Banner.deleteMany({});
    await Content.deleteMany({});
    console.log('现有数据清空完成！');

    // 导入文章数据
    console.log('开始导入文章数据...');
    const importedArticles = await Article.insertMany(sampleArticles);
    console.log(`成功导入 ${importedArticles.length} 条文章数据！`);

    // 导入轮播图数据
    console.log('开始导入轮播图数据...');
    const importedBanners = await Banner.insertMany(sampleBanners);
    console.log(`成功导入 ${importedBanners.length} 条轮播图数据！`);

    // 导入内容数据
    console.log('开始导入内容数据...');
    const importedContents = await Content.insertMany(sampleContents);
    console.log(`成功导入 ${importedContents.length} 条内容数据！`);

    console.log('所有数据导入完成！');
    process.exit(0);
  } catch (error) {
    console.error('数据导入失败:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

// 执行导入
importData();