const express = require('express');
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { sendResponse } = require('../utils/response');

const router = express.Router();

// 尝试引入Case模型，如果失败则使用模拟数据
let Case;
let mongoose = null;
let useMockData = false;

try {
  mongoose = require('mongoose');
  Case = require('../models/Case'); // 引入Case模型
} catch (err) {
  console.warn('无法加载MongoDB模型，将使用模拟数据');
  useMockData = true;
}

// 文件路径作为备用数据源
const dataPath = path.join(__dirname, '../data/cases.json');

// 检查MongoDB连接状态
const isMongoConnected = () => {
  return !useMockData && mongoose && mongoose.connection.readyState === 1;
}

// 获取所有客户案例（GET /api/cases）
router.get('/', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const cases = await Case.find().sort({ order: 1 });
      sendResponse(res, 200, cases, '案例列表获取成功');
    } else {
      // 数据库连接失败，返回文件数据
      const data = await fs.readFile(dataPath, 'utf8');
      sendResponse(res, 200, JSON.parse(data), '案例列表获取成功（文件数据）');
      console.log("案例数据（文件）：", JSON.parse(data));
    }
  } catch (err) {
    console.error('获取案例失败:', err);
    // 双重失败时返回空数组
    sendResponse(res, 200, [], `获取案例失败，返回空数据：${err.message}`);
  }
});

// 获取单个客户案例（GET /api/cases/:id）
router.get('/:id', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const caseItem = await Case.findById(req.params.id);
      if (!caseItem) {
        return sendResponse(res, 404, null, '案例不存在');
      }
      sendResponse(res, 200, caseItem, '案例获取成功');
    } else {
      // 数据库连接失败，在文件数据中查找
      const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
      const caseItem = data.find(item => item.id === parseInt(req.params.id));
      if (!caseItem) {
        return sendResponse(res, 404, null, '案例不存在（文件数据）');
      }
      sendResponse(res, 200, caseItem, '案例获取成功（文件数据）');
    }
  } catch (err) {
    console.error('获取单个案例失败:', err);
    sendResponse(res, 500, null, `获取案例失败：${err.message}`);
  }
});

// 创建客户案例（POST /api/cases）
router.post('/', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const caseItem = new Case(req.body);
      const savedCase = await caseItem.save();
      sendResponse(res, 201, savedCase, '案例创建成功');
    } else {
      // 数据库连接失败，返回模拟创建成功的消息
      const newCase = {
        id: Date.now(),
        ...req.body,
        createTime: new Date()
      };
      sendResponse(res, 201, newCase, '案例创建成功（模拟数据）');
    }
  } catch (err) {
    console.error('创建案例失败:', err);
    sendResponse(res, 400, null, `创建失败：${err.message}`);
  }
});

// 更新客户案例（PUT /api/cases/:id）
router.put('/:id', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const caseItem = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!caseItem) {
        return sendResponse(res, 404, null, '案例不存在');
      }
      sendResponse(res, 200, caseItem, '案例更新成功');
    } else {
      // 数据库连接失败，返回模拟更新成功的消息
      const updatedCase = {
        id: req.params.id,
        ...req.body,
        createTime: new Date()
      };
      sendResponse(res, 200, updatedCase, '案例更新成功（模拟数据）');
    }
  } catch (err) {
    console.error('更新案例失败:', err);
    sendResponse(res, 500, null, `更新失败：${err.message}`);
  }
});

// 删除客户案例（DELETE /api/cases/:id）
router.delete('/:id', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const caseItem = await Case.findByIdAndDelete(req.params.id);
      if (!caseItem) {
        return sendResponse(res, 404, null, '案例不存在');
      }
      sendResponse(res, 200, null, '案例删除成功');
    } else {
      // 数据库连接失败，返回模拟删除成功的消息
      sendResponse(res, 200, null, '案例删除成功（模拟操作）');
    }
  } catch (err) {
    console.error('删除案例失败:', err);
    sendResponse(res, 500, null, `删除失败：${err.message}`);
  }
});

module.exports = router;