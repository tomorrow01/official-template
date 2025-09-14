const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { sendResponse } = require('../utils/response');

const router = express.Router();

// 尝试引入Service模型，如果失败则使用模拟数据
let Service;
let mongoose = null;
let useMockData = false;

try {
  mongoose = require('mongoose');
  Service = require('../models/Service'); // 引入Service模型
} catch (err) {
  console.warn('无法加载MongoDB模型，将使用模拟数据');
  useMockData = true;
}

// 检查MongoDB连接状态
const isMongoConnected = () => {
  return !useMockData && mongoose && mongoose.connection.readyState === 1;
}

// 模拟数据（当数据库连接失败且无文件数据时使用）
const mockServices = [
  {
    _id: 'mock-1',
    title: '网站建设',
    description: '专业的网站设计与开发，响应式布局，提升品牌形象',
    icon: 'el-icon-s-grid',
    order: 1,
    isActive: true,
    createdAt: new Date()
  },
  {
    _id: 'mock-2',
    title: 'APP开发',
    description: '定制化移动应用开发，原生体验，满足企业需求',
    icon: 'el-icon-mobile',
    order: 2,
    isActive: true,
    createdAt: new Date()
  },
  {
    _id: 'mock-3',
    title: '数据分析',
    description: '专业的数据收集与分析服务，助力企业决策',
    icon: 'el-icon-pie-chart',
    order: 3,
    isActive: true,
    createdAt: new Date()
  }
];

// 获取所有服务（GET /api/services）
router.get('/', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const services = await Service.find().sort({ order: 1 });
      sendResponse(res, 200, services, '服务列表获取成功');
    } else {
      // 数据库连接失败，返回模拟数据
      sendResponse(res, 200, mockServices, '服务列表获取成功（模拟数据）');
    }
  } catch (err) {
    console.error('获取服务失败:', err);
    // 出错时返回模拟数据作为备用
    sendResponse(res, 200, mockServices, `获取服务失败，返回模拟数据：${err.message}`);
  }
});

// 获取单个服务（GET /api/services/:id）
router.get('/:id', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const service = await Service.findById(req.params.id);
      if (!service) {
        return sendResponse(res, 404, null, '服务不存在');
      }
      sendResponse(res, 200, service, '服务获取成功');
    } else {
      // 数据库连接失败，在模拟数据中查找
      const service = mockServices.find(item => item._id === req.params.id);
      if (!service) {
        return sendResponse(res, 404, null, '服务不存在（模拟数据）');
      }
      sendResponse(res, 200, service, '服务获取成功（模拟数据）');
    }
  } catch (err) {
    console.error('获取单个服务失败:', err);
    sendResponse(res, 500, null, `获取服务失败：${err.message}`);
  }
});

// 创建服务（POST /api/services）
router.post('/', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const service = new Service(req.body);
      const savedService = await service.save();
      sendResponse(res, 201, savedService, '服务创建成功');
    } else {
      // 数据库连接失败，返回模拟创建成功的消息
      const newService = {
        _id: `mock-${Date.now()}`,
        ...req.body,
        createdAt: new Date()
      };
      sendResponse(res, 201, newService, '服务创建成功（模拟数据）');
    }
  } catch (err) {
    console.error('创建服务失败:', err);
    sendResponse(res, 400, null, `创建失败：${err.message}`);
  }
});

// 更新服务（PUT /api/services/:id）
router.put('/:id', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!service) {
        return sendResponse(res, 404, null, '服务不存在');
      }
      sendResponse(res, 200, service, '服务更新成功');
    } else {
      // 数据库连接失败，返回模拟更新成功的消息
      const updatedService = {
        _id: req.params.id,
        ...req.body,
        createdAt: new Date()
      };
      sendResponse(res, 200, updatedService, '服务更新成功（模拟数据）');
    }
  } catch (err) {
    console.error('更新服务失败:', err);
    sendResponse(res, 500, null, `更新失败：${err.message}`);
  }
});

// 删除服务（DELETE /api/services/:id）
router.delete('/:id', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const service = await Service.findByIdAndDelete(req.params.id);
      if (!service) {
        return sendResponse(res, 404, null, '服务不存在');
      }
      sendResponse(res, 200, null, '服务删除成功');
    } else {
      // 数据库连接失败，返回模拟删除成功的消息
      sendResponse(res, 200, null, '服务删除成功（模拟操作）');
    }
  } catch (err) {
    console.error('删除服务失败:', err);
    sendResponse(res, 500, null, `删除失败：${err.message}`);
  }
});

module.exports = router;