const express = require('express');
const router = express.Router();
const { sendResponse } = require('../utils/response');

// 示例路由
router.get('/example', (req, res) => {
  const data = { message: '示例数据' };
  sendResponse(res, 200, data, '请求成功');
});

module.exports = router;