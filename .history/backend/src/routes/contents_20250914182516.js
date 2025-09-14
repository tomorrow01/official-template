const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { sendResponse } = require('../utils/response');

const router = express.Router();
const dataPath = path.join(__dirname, '../data/contents.json');

// 获取所有内容
router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(dataPath, 'utf8');
    // res.json(JSON.parse(data));
    sendResponse(res, 200, data, '读取内容数据成功');

  } catch (err) {
    sendResponse(res, 500, null, '读取内容数据失败');
  }
});

// 获取单个内容（根据 ID）
router.get('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
    const content = data.find(item => item.id === parseInt(req.params.id));
    if (!content) return sendResponse(res, 404, null, '内容不存在');
    sendResponse(res, 200,content, '读取内容数据成功');
  } catch (err) {
    sendResponse(res, 500,ontent, '读取内容数据失败');
  }
});

// 新增内容
router.post('/', async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
    const newContent = {
      id: Date.now(),
      ...req.body,
      createTime: new Date().toISOString()
    };
    data.push(newContent);
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
    // res.status(201).json(newContent);
    sendResponse(res, 200, newContent, '新增内容成功');
  } catch (err) {
    sendResponse(res, 500, null, '新增内容失败');
  }
});

// 更新内容（根据 ID）
router.put('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
    const index = data.findIndex(item => item.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: '内容不存在' });
    data[index] = { ...data[index], ...req.body };
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
    res.json(data[index]);
    sendResponse(res, 200, data[index], '新增内容成功');

  } catch (err) {
    sendResponse(res, 500, null, '更新内容失败');
  }
});

// 删除内容（根据 ID）
router.delete('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
    const newData = data.filter(item => item.id !== parseInt(req.params.id));
    await fs.writeFile(dataPath, JSON.stringify(newData, null, 2));
    sendResponse(res, 200, { message: '内容删除成功' }, '内容删除成功');
  } catch (err) {
    sendResponse(res, 500, null, '删除内容失败');
  }
});

module.exports = router;