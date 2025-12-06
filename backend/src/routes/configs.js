const express = require('express');
const { sendResponse } = require('../utils/response');
const Config = require('../models/Config');

const router = express.Router();

// 配置路由已切换到MongoDB数据库
// 初始化数据将在数据库连接时自动同步（见db.js中的insertDefaultData函数）

// 获取所有配置
router.get('/', async (req, res) => {
  try {
    const configs = await Config.find().sort({ key: 1 });
    sendResponse(res, 200, configs, '读取配置数据成功');
  } catch (err) {
    console.error('读取配置数据失败:', err);
    sendResponse(res, 500, null, '读取配置数据失败');
  }
});

// 根据ID获取配置
router.get('/:id', async (req, res) => {
  try {
    const config = await Config.findById(req.params.id);
    if (!config) return sendResponse(res, 404, null, '配置不存在');
    sendResponse(res, 200, config, '读取配置数据成功');
  } catch (err) {
    console.error('读取配置数据失败:', err);
    sendResponse(res, 500, null, '读取配置数据失败');
  }
});

// 根据key获取配置
router.get('/key/:key', async (req, res) => {
  try {
    const config = await Config.findOne({ key: req.params.key });
    if (!config) return sendResponse(res, 404, null, '配置不存在');
    sendResponse(res, 200, config, '读取配置数据成功');
  } catch (err) {
    console.error('读取配置数据失败:', err);
    sendResponse(res, 500, null, '读取配置数据失败');
  }
});

// 更新配置
router.put('/:id', async (req, res) => {
  try {
    const config = await Config.findById(req.params.id);
    if (!config) return sendResponse(res, 404, null, '配置不存在');
    
    // 确保value字段不会被错误处理，特别是base64格式的logo数据
    config.value = req.body.value;
    config.updateTime = new Date();
    
    await config.save();
    sendResponse(res, 200, config, '更新配置成功');
  } catch (err) {
    console.error('更新配置失败:', err);
    sendResponse(res, 500, null, '更新配置失败');
  }
});

// 新增配置
router.post('/', async (req, res) => {
  try {
    const { key, name, value, description } = req.body;
    
    // 检查key是否已存在
    const existingConfig = await Config.findOne({ key });
    if (existingConfig) {
      return sendResponse(res, 400, null, '配置key已存在');
    }
    
    const newConfig = new Config({
      key,
      name,
      value,
      description
    });
    
    await newConfig.save();
    sendResponse(res, 201, newConfig, '新增配置成功');
  } catch (err) {
    console.error('新增配置失败:', err);
    sendResponse(res, 500, null, '新增配置失败');
  }
});

// 删除配置
router.delete('/:id', async (req, res) => {
  try {
    const config = await Config.findByIdAndDelete(req.params.id);
    if (!config) return sendResponse(res, 404, null, '配置不存在');
    sendResponse(res, 200, null, '删除配置成功');
  } catch (err) {
    console.error('删除配置失败:', err);
    sendResponse(res, 500, null, '删除配置失败');
  }
});

module.exports = router;