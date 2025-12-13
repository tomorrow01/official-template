const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3002;

// 中间件配置
app.use(cors());
app.use(bodyParser.json());

// 基本路由
app.get('/', (req, res) => {
  res.json({ success: true, message: '服务正常运行' });
});

// 认证路由
app.post('/api/auth/login', (req, res) => {
  try {
    console.log('登录请求体:', req.body);
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ code: 400, data: null, error: '用户名和密码不能为空' });
    }

    // 使用模拟数据进行验证
    if (username === 'admin' && password === '123456') {
      const jwt = require('jsonwebtoken');
      const token = jwt.sign(
        { userId: 'mock_user_id', username: 'admin', role: 'admin' },
        'your_jwt_secret_key',
        { expiresIn: '24h' }
      );

      res.status(200).json({
        code: 200,
        data: {
          token,
          user: {
            _id: 'mock_user_id',
            username: 'admin',
            role: 'admin'
          }
        },
        error: '登录成功（模拟数据）'
      });
    } else {
      return res.status(401).json({ code: 401, data: null, error: '用户名或密码错误（模拟数据）' });
    }
  } catch (err) {
    console.error('登录失败:', err);
    res.status(500).json({ code: 500, data: null, error: `登录失败：${err.message}` });
  }
});

// 启动服务
app.listen(port, () => {
  console.log(`简化服务运行在 http://localhost:${port}`);
});