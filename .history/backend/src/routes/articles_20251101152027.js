const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { sendResponse } = require('../utils/response');

const router = express.Router();

// 尝试引入Article模型，如果失败则使用模拟数据
let Article;
let mongoose = null;
let useMockData = false;

try {
  mongoose = require('mongoose');
  Article = require('../models/Article'); // 引入Article模型
} catch (err) {
  console.warn('无法加载MongoDB模型，将使用模拟数据');
  useMockData = true;
}

// 文件路径作为备用数据源
const dataPath = path.join(__dirname, '../data/articles.json');

// 检查MongoDB连接状态
const isMongoConnected = () => {
  return !useMockData && mongoose && mongoose.connection.readyState === 1;
}

// 获取所有文章
router.get('/', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const articles = await Article.find().sort({ order: 1 });
      sendResponse(res, 200, articles, '文章列表获取成功');
    } else {
      // 数据库连接失败，返回文件数据
      const data = await fs.readFile(dataPath, 'utf8');
      sendResponse(res, 200, JSON.parse(data), '文章列表获取成功（文件数据）');
    }
  } catch (err) {
    console.error('获取文章失败:', err);
    // 双重失败时返回空数组
    sendResponse(res, 200, [], `获取文章失败，返回空数据：${err.message}`);
  }
});

// 获取单个文章（根据 ID）
router.get('/:id', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const article = await Article.findById(req.params.id);
      if (!article) {
        return sendResponse(res, 404, null, '文章不存在');
      }
      sendResponse(res, 200, article, '文章获取成功');
    } else {
      // 数据库连接失败，在文件数据中查找
      const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
      const article = data.find(item => item.id === parseInt(req.params.id));
      if (!article) {
        return sendResponse(res, 404, null, '文章不存在（文件数据）');
      }
      sendResponse(res, 200, article, '文章获取成功（文件数据）');
    }
  } catch (err) {
    console.error('获取单个文章失败:', err);
    sendResponse(res, 500, null, `获取文章失败：${err.message}`);
  }
});

// 新增文章
router.post('/', async (req, res) => {
  try {
    console.log('收到新增文章请求，请求体:', req.body);
    if (isMongoConnected()) {
      console.log('使用MongoDB保存文章');
      const article = new Article(req.body);
      const savedArticle = await article.save();
      console.log('文章保存成功:', savedArticle._id);
      sendResponse(res, 201, savedArticle, '文章创建成功');
    } else {
      // 数据库连接失败，返回模拟创建成功的消息
      console.log('使用模拟数据模式');
      const newArticle = {
        id: Date.now(),
        ...req.body,
        createTime: new Date()
      };
      sendResponse(res, 201, newArticle, '文章创建成功（模拟数据）');
    }
  } catch (err) {
    console.error('创建文章失败:', err);
    console.error('错误详情:', JSON.stringify(err, Object.getOwnPropertyNames(err)));
    sendResponse(res, 400, null, `创建失败：${err.message}`);
  }
});

// 更新文章（根据 ID）
router.put('/:id', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!article) {
        return sendResponse(res, 404, null, '文章不存在');
      }
      sendResponse(res, 200, article, '文章更新成功');
    } else {
      // 数据库连接失败，返回模拟更新成功的消息
      const updatedArticle = {
        id: req.params.id,
        ...req.body,
        createTime: new Date()
      };
      sendResponse(res, 200, updatedArticle, '文章更新成功（模拟数据）');
    }
  } catch (err) {
    console.error('更新文章失败:', err);
    sendResponse(res, 500, null, `更新失败：${err.message}`);
  }
});

// 删除文章（根据 ID）
router.delete('/:id', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const article = await Article.findByIdAndDelete(req.params.id);
      if (!article) {
        return sendResponse(res, 404, null, '文章不存在');
      }
      sendResponse(res, 200, null, '文章删除成功');
    } else {
      // 数据库连接失败，返回模拟删除成功的消息
      sendResponse(res, 200, null, '文章删除成功（模拟操作）');
    }
  } catch (err) {
    console.error('删除文章失败:', err);
    sendResponse(res, 500, null, `删除失败：${err.message}`);
  }
});

module.exports = router;