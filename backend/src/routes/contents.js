const express = require('express');
const { sendResponse } = require('../utils/response');
const { isMongoConnected } = require('../utils/db');
const Content = require('../models/Content');

const router = express.Router();

// 获取所有内容
router.get('/', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const contents = await Content.find().sort({ sort: 1, createTime: -1 });
      sendResponse(res, 200, contents, '读取内容数据成功');
    } else {
      // 返回空数组作为降级处理
      sendResponse(res, 200, [], 'MongoDB未连接，返回空数据');
    }
  } catch (err) {
    console.error('获取内容列表失败:', err);
    sendResponse(res, 500, null, `读取内容数据失败：${err.message}`);
  }
});

// 获取单个内容（根据 ID）
router.get('/:id', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const content = await Content.findById(req.params.id);
      if (!content) return sendResponse(res, 404, null, '内容不存在');
      sendResponse(res, 200, content, '读取内容数据成功');
    } else {
      sendResponse(res, 503, null, 'MongoDB未连接，无法获取数据');
    }
  } catch (err) {
    console.error('获取单个内容失败:', err);
    sendResponse(res, 500, null, `读取内容数据失败：${err.message}`);
  }
});

// 新增内容
router.post('/', async (req, res) => {
  try {
    console.log('收到新增内容请求，请求体:', req.body);
    
    if (isMongoConnected()) {
      console.log('使用MongoDB保存内容');
      const content = new Content(req.body);
      const savedContent = await content.save();
      console.log('内容保存成功:', savedContent._id);
      sendResponse(res, 201, savedContent, '新增内容成功');
    } else {
      // MongoDB连接失败，返回模拟创建成功的消息
      console.log('MongoDB未连接，使用模拟数据');
      const newContent = {
        _id: Date.now().toString(),
        ...req.body,
        createTime: new Date().toISOString()
      };
      sendResponse(res, 201, newContent, '新增内容成功（模拟数据）');
    }
  } catch (err) {
    console.error('新增内容失败:', err);
    console.error('错误详情:', JSON.stringify(err, Object.getOwnPropertyNames(err)));
    sendResponse(res, 400, null, `新增内容失败：${err.message}`);
  }
});

// 更新内容（根据 ID）
router.put('/:id', async (req, res) => {
  try {
    console.log('收到更新内容请求，ID:', req.params.id);
    console.log('更新数据:', req.body);
    
    if (isMongoConnected()) {
      console.log('使用MongoDB更新内容');
      const content = await Content.findByIdAndUpdate(req.params.id, req.body, { new: true });
      
      if (!content) {
        return sendResponse(res, 404, null, '内容不存在');
      }
      
      sendResponse(res, 200, content, '更新内容成功');
    } else {
      // MongoDB连接失败，返回模拟更新成功的消息
      const updatedContent = {
        _id: req.params.id,
        ...req.body,
        updateTime: new Date().toISOString()
      };
      sendResponse(res, 200, updatedContent, '更新内容成功（模拟数据）');
    }
  } catch (err) {
    console.error('更新内容失败:', err);
    console.error('错误详情:', JSON.stringify(err, Object.getOwnPropertyNames(err)));
    sendResponse(res, 500, null, `更新内容失败：${err.message}`);
  }
});

// 删除内容（根据 ID）
router.delete('/:id', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const content = await Content.findByIdAndDelete(req.params.id);
      if (!content) {
        return sendResponse(res, 404, null, '内容不存在');
      }
      sendResponse(res, 200, null, '内容删除成功');
    } else {
      // MongoDB连接失败，返回模拟删除成功的消息
      sendResponse(res, 200, null, '内容删除成功（模拟操作）');
    }
  } catch (err) {
    console.error('删除内容失败:', err);
    sendResponse(res, 500, null, `删除内容失败：${err.message}`);
  }
});

module.exports = router;