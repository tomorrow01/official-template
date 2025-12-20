const express = require('express');
const { sendResponse } = require('../utils/response');

const router = express.Router();

// 尝试引入Banner模型，如果失败则使用模拟数据
let Banner;
let mongoose = null;
let useMockData = false;

try {
  mongoose = require('mongoose');
  Banner = require('../models/Banner'); // 引入Banner模型
} catch (err) {
  console.warn('无法加载MongoDB模型，将使用模拟数据');
  useMockData = true;
}

// 模拟轮播图数据
const mockBanners = [
  {
    _id: 'mock-1',
    title: '企业数字化转型解决方案',
    description: '专业的网站设计与开发服务，响应式布局，提升品牌形象，助力企业数字化转型',
    ctaText: '了解更多',
    section: 'home',
    imageUrl: '/images/banner1.jpg',
    link: '/home',
    order: 1,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'mock-2',
    title: '限时优惠活动',
    description: '新年特惠活动，专业开发服务低至8折，立即预约咨询',
    ctaText: '立即参与',
    section: 'home',
    imageUrl: '/images/banner2.jpg',
    link: '/activity',
    order: 2,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'mock-3',
    title: '全方位技术服务',
    description: '涵盖网站建设、APP开发、数据分析等全方位技术服务，满足企业各种需求',
    ctaText: '查看服务',
    section: 'services',
    imageUrl: '/images/service-banner1.jpg',
    link: '/services',
    order: 1,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'mock-4',
    title: '专业技术支持',
    description: '24/7专业技术支持，确保您的项目顺利运行',
    ctaText: '联系我们',
    section: 'services',
    imageUrl: '/images/service-banner2.jpg',
    link: '/contact',
    order: 2,
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

// 检查MongoDB连接状态
const isMongoConnected = () => {
  return !useMockData && mongoose && mongoose.connection.readyState === 1;
}

// 获取所有轮播图（按order排序）
router.get('/', async (req, res) => {
  try {
    const { section } = req.query;
    const query = section ? { section } : {};
    
    if (isMongoConnected()) {
      const banners = await Banner.find(query).sort({ order: 1 });
      sendResponse(res, 200, banners, '轮播图列表获取成功');
    } else {
      // 数据库连接失败，返回模拟数据
      const filteredBanners = section ? mockBanners.filter(banner => banner.section === section) : mockBanners;
      sendResponse(res, 200, filteredBanners, '轮播图列表获取成功（模拟数据）');
    }
  } catch (err) {
    console.error('获取轮播图失败:', err);
    // 出错时返回模拟数据作为备用
    sendResponse(res, 200, mockBanners, `获取轮播图失败，返回模拟数据：${err.message}`);
  }
});

// 获取单个轮播图（根据 ID）
router.get('/:id', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const banner = await Banner.findById(req.params.id);
      if (!banner) {
        return sendResponse(res, 404, null, '轮播图不存在');
      }
      sendResponse(res, 200, banner, '轮播图获取成功');
    } else {
      // 数据库连接失败，在模拟数据中查找
      const banner = mockBanners.find(item => item._id === req.params.id);
      if (!banner) {
        return sendResponse(res, 404, null, '轮播图不存在（模拟数据）');
      }
      sendResponse(res, 200, banner, '轮播图获取成功（模拟数据）');
    }
  } catch (err) {
    console.error('获取单个轮播图失败:', err);
    sendResponse(res, 500, null, `获取轮播图失败：${err.message}`);
  }
});

// 新增轮播图
router.post('/', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const banner = new Banner(req.body);
      const savedBanner = await banner.save();
      sendResponse(res, 201, savedBanner, '轮播图创建成功');
    } else {
      // 数据库连接失败，返回模拟创建成功的消息
      const newBanner = {
        _id: `mock-${Date.now()}`,
        ...req.body,
        createdAt: new Date()
      };
      sendResponse(res, 201, newBanner, '轮播图创建成功（模拟数据）');
    }
  } catch (err) {
    console.error('创建轮播图失败:', err);
    sendResponse(res, 400, null, `创建失败：${err.message}`);
  }
});

// 更新轮播图（根据 ID）
router.put('/:id', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!banner) {
        return sendResponse(res, 404, null, '轮播图不存在');
      }
      sendResponse(res, 200, banner, '轮播图更新成功');
    } else {
      // 数据库连接失败，返回模拟更新成功的消息
      const updatedBanner = {
        _id: req.params.id,
        ...req.body,
        createdAt: new Date()
      };
      sendResponse(res, 200, updatedBanner, '轮播图更新成功（模拟数据）');
    }
  } catch (err) {
    console.error('更新轮播图失败:', err);
    sendResponse(res, 500, null, `更新失败：${err.message}`);
  }
});

// 删除轮播图（根据 ID）
router.delete('/:id', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const banner = await Banner.findByIdAndDelete(req.params.id);
      if (!banner) {
        return sendResponse(res, 404, null, '轮播图不存在');
      }
      sendResponse(res, 200, null, '轮播图删除成功');
    } else {
      // 数据库连接失败，返回模拟删除成功的消息
      sendResponse(res, 200, null, '轮播图删除成功（模拟操作）');
    }
  } catch (err) {
    console.error('删除轮播图失败:', err);
    sendResponse(res, 500, null, `删除失败：${err.message}`);
  }
});

module.exports = router;