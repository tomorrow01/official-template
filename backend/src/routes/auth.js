const express = require('express');
const jwt = require('jsonwebtoken');
const { sendResponse } = require('../utils/response');

const router = express.Router();

// 添加调试日志中间件
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] auth路由收到请求: ${req.method} ${req.originalUrl}`);
  console.log('请求体:', req.body);
  next();
});

// 简单测试路由
router.get('/test', (req, res) => {
  console.log('测试路由被调用');
  res.json({ success: true, message: 'auth路由测试成功' });
});

// 登录接口
router.post('/login', async (req, res) => {
  try {
    console.log('登录请求体:', req.body);
    const { username, password } = req.body;

    if (!username || !password) {
      return sendResponse(res, 400, null, '用户名和密码不能为空');
    }

    // 使用模拟数据进行验证（仅用于开发环境）
      if (username === 'admin' && password === '123456') {
      const token = jwt.sign(
        { userId: 'mock_user_id', username: 'admin', role: 'admin', avatar: '/images/admin-avatar.png' },
        'your_jwt_secret_key',
        { expiresIn: '24h' }
      );

      sendResponse(res, 200, {
        token,
        user: {
          _id: 'mock_user_id',
          username: 'admin',
          role: 'admin',
          avatar: '/images/admin-avatar.png'
        }
      }, '登录成功（模拟数据）');
    } else {
      return sendResponse(res, 401, null, '用户名或密码错误（模拟数据）');
    }
  } catch (err) {
    console.error('登录失败:', err);
    sendResponse(res, 500, null, `登录失败：${err.message}`);
  }
});

// 获取当前用户信息接口
router.get('/current', async (req, res) => {
  try {
    // 从请求头获取token
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return sendResponse(res, 401, null, '未授权，请先登录');
    }

    // 验证token
    const decoded = jwt.verify(token, 'your_jwt_secret_key');

    // 返回模拟用户信息
    sendResponse(res, 200, {
      _id: decoded.userId,
      username: decoded.username,
      role: decoded.role,
      avatar: decoded.avatar || '/images/admin-avatar.png'
    }, '获取用户信息成功（模拟数据）');
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return sendResponse(res, 401, null, 'token无效或已过期');
    }
    console.error('获取用户信息失败:', err);
    sendResponse(res, 500, null, `获取用户信息失败：${err.message}`);
  }
});

// 初始化管理员用户（仅用于开发环境）
router.post('/init', async (req, res) => {
  try {
    // 返回模拟初始化成功
    sendResponse(res, 201, null, '默认管理员用户创建成功（模拟数据）');
  } catch (err) {
    console.error('初始化管理员用户失败:', err);
    sendResponse(res, 500, null, `初始化失败：${err.message}`);
  }
});

module.exports = router;