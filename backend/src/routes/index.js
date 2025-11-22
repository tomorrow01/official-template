const express = require('express');
const router = express.Router();
const { sendResponse } = require('../utils/response');

// 导入所有路由模块
const articles = require('./articles');
const banners = require('./banners');
const cases = require('./cases');
const contents = require('./contents');
const services = require('./services');
const contacts = require('./contacts'); // 新增联系表单路由

// 使用各模块路由
router.use('/articles', articles);
router.use('/banners', banners);
router.use('/cases', cases);
router.use('/contents', contents);
router.use('/services', services);
router.use('/contacts', contacts); // 新增联系表单路由

// 示例路由
router.get('/example', (req, res) => {
  const data = { message: '示例数据' };
  sendResponse(res, 200, '请求成功', data);
});

module.exports = router;