const express = require('express');
const { sendResponse } = require('../utils/response');
const Content = require('../models/Content');
const mongoose = require('mongoose');
const router = express.Router();

// 获取所有内容
router.get('/', async (req, res) => {
  try {
    const contents = await Content.find({}).sort({ sort: 1, updateTime: -1 });
    sendResponse(res, 200, contents, '读取内容数据成功');
  } catch (err) {
    console.error('读取内容数据失败:', err);
    sendResponse(res, 500, null, '读取内容数据失败');
  }
});

// 获取单个内容（根据 ID）
router.get('/:id', async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return sendResponse(res, 404, null, '内容不存在');
    sendResponse(res, 200, content, '读取内容数据成功');
  } catch (err) {
    console.error('读取内容数据失败:', err);
    sendResponse(res, 500, null, '读取内容数据失败');
  }
});

// 新增内容
router.post('/', async (req, res) => {
  try {
    const newContent = new Content({
      ...req.body,
      updateTime: new Date()
    });
    await newContent.save();
    sendResponse(res, 201, newContent, '新增内容成功');
  } catch (err) {
    console.error('新增内容失败:', err);
    sendResponse(res, 500, null, '新增内容失败');
  }
});

// 更新内容（根据 ID）
router.put('/:id', async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updateTime: new Date() },
      { new: true, runValidators: true }
    );
    if (!content) return sendResponse(res, 404, null, '内容不存在');
    sendResponse(res, 200, content, '更新内容成功');
  } catch (err) {
    console.error('更新内容失败:', err);
    sendResponse(res, 500, null, '更新内容失败');
  }
});

// 删除内容（根据 ID）
router.delete('/:id', async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);
    if (!content) return sendResponse(res, 404, null, '内容不存在');
    sendResponse(res, 200, { message: '内容删除成功' }, '内容删除成功');
  } catch (err) {
    console.error('删除内容失败:', err);
    sendResponse(res, 500, null, '删除内容失败');
  }
});

module.exports = router;