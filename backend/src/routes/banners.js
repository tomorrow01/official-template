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

// 模拟数据（当数据库连接失败时使用）
const mockBanners = [
  {
    _id: 'mock-1',
    title: '数字化转型解决方案',
    description: '助力企业实现全面数字化，提升运营效率与市场竞争力',
    ctaText: '了解详情',
    imageUrl: 'https://picsum.photos/id/1/2100/900',
    link: '/services/digital-transformation',
    order: 1,
    isActive: true,
    createdAt: new Date()
  },
  {
    _id: 'mock-2',
    title: '人工智能技术应用',
    description: '利用AI技术赋能业务创新，实现智能化决策与自动化运营',
    ctaText: '探索AI服务',
    imageUrl: 'https://picsum.photos/id/20/2100/900',
    link: '/services/ai-solutions',
    order: 2,
    isActive: true,
    createdAt: new Date()
  },
  {
    _id: 'mock-3',
    title: '企业云计算服务',
    description: '安全可靠的云服务解决方案，灵活扩展，降低IT成本',
    ctaText: '云服务咨询',
    imageUrl: 'https://picsum.photos/id/3/2100/900',
    link: '/services/cloud-computing',
    order: 3,
    isActive: true,
    createdAt: new Date()
  },
  {
    _id: 'mock-4',
    title: '成功客户案例展示',
    description: '探索我们如何帮助不同行业的客户实现业务增长与技术创新',
    ctaText: '查看案例',
    imageUrl: 'https://picsum.photos/id/48/2100/900',
    link: '/cases',
    order: 4,
    isActive: true,
    createdAt: new Date()
  }
];

// 检查MongoDB连接状态
const isMongoConnected = () => {
  return !useMockData && mongoose && mongoose.connection.readyState === 1;
}

// 获取所有轮播图（只返回激活状态的，按order排序）
router.get('/', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const banners = await Banner.find({ isActive: true }).sort({ order: 1 });
      sendResponse(res, 200, banners, '轮播图列表获取成功');
    } else {
      // 数据库连接失败，返回模拟数据（只返回激活状态的）
      const activeBanners = mockBanners.filter(banner => banner.isActive);
      sendResponse(res, 200, activeBanners, '轮播图列表获取成功（模拟数据）');
    }
  } catch (err) {
    console.error('获取轮播图失败:', err);
    // 出错时返回模拟数据作为备用
    const activeBanners = mockBanners.filter(banner => banner.isActive);
    sendResponse(res, 200, activeBanners, `获取轮播图失败，返回模拟数据：${err.message}`);
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