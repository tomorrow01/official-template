const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3003;

// 模拟配置数据
let configs = [
  { id: '1', key: 'about_company', value: '这是一家专注于提供高质量服务的公司', updateTime: new Date().toISOString() },
  { id: '2', key: 'about_company_detail', value: '我们致力于为客户提供最好的产品和服务', updateTime: new Date().toISOString() },
  { id: '3', key: 'company_mission', value: '让科技改变生活', updateTime: new Date().toISOString() },
  { id: '4', key: 'company_vision', value: '成为行业领导者', updateTime: new Date().toISOString() },
  { id: '5', key: 'company_values', value: '诚信、创新、合作、共赢', updateTime: new Date().toISOString() },
  { id: '6', key: 'company_logo', value: '', updateTime: new Date().toISOString() },
  { id: '7', key: 'team_members', value: JSON.stringify([{ name: '张三', position: 'CEO' }, { name: '李四', position: 'CTO' }]), updateTime: new Date().toISOString() }
];

// 生成新的ID
function generateId() {
  return Math.max(...configs.map(c => parseInt(c.id)), 0) + 1 + '';
}

// 基本中间件
// 配置CORS，允许所有来源的请求
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 处理OPTIONS请求
app.options('*', cors());

app.use(express.json()); // 使用Express内置的JSON解析中间件

// 添加请求日志
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.log('请求来源:', req.headers.origin);
  console.log('请求头:', req.headers);
  console.log('请求体:', req.body);
  next();
});

// 健康检查路由
app.get('/', (req, res) => {
  res.json({ success: true, message: '服务正常运行' });
});

// 登录路由
app.post('/api/auth/login', (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('登录请求:', username, password);
    
    if (username === 'admin' && password === '123456') {
      const token = jwt.sign(
        { userId: 'mock_user_id', username: 'admin', role: 'admin' },
        'your_jwt_secret_key',
        { expiresIn: '24h' }
      );
      
      res.json({
        token,
        user: { _id: 'mock_user_id', username: 'admin', role: 'admin' },
        message: '登录成功'
      });
    } else {
      res.status(401).json({ error: '用户名或密码错误' });
    }
  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 配置管理路由

// 获取所有配置
app.get('/api/configs', (req, res) => {
  try {
    res.json(configs);
  } catch (error) {
    console.error('获取配置列表错误:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 根据ID获取配置
app.get('/api/configs/:id', (req, res) => {
  try {
    const { id } = req.params;
    const config = configs.find(c => c.id === id);
    if (!config) {
      return res.status(404).json({ error: '配置不存在' });
    }
    res.json(config);
  } catch (error) {
    console.error('获取配置错误:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 根据key获取配置
app.get('/api/configs/key/:key', (req, res) => {
  try {
    const { key } = req.params;
    const config = configs.find(c => c.key === key);
    if (!config) {
      return res.status(404).json({ error: '配置不存在' });
    }
    res.json(config);
  } catch (error) {
    console.error('获取配置错误:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 更新配置
app.put('/api/configs', (req, res) => {
  try {
    const updatedConfig = req.body;
    if (!updatedConfig.id || !updatedConfig.key) {
      return res.status(400).json({ error: '缺少必要参数' });
    }
    
    const index = configs.findIndex(c => c.id === updatedConfig.id);
    if (index === -1) {
      // 如果不存在，创建新配置
      const newConfig = {
        ...updatedConfig,
        id: updatedConfig.id || generateId(),
        updateTime: new Date().toISOString()
      };
      configs.push(newConfig);
      res.json(newConfig);
    } else {
      // 如果存在，更新配置
      const config = {
        ...configs[index],
        ...updatedConfig,
        updateTime: new Date().toISOString()
      };
      configs[index] = config;
      res.json(config);
    }
  } catch (error) {
    console.error('更新配置错误:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 根据ID更新配置（RESTful API风格支持）
app.put('/api/configs/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updatedConfig = req.body;
    
    const index = configs.findIndex(c => c.id === id);
    if (index === -1) {
      return res.status(404).json({ error: '配置不存在' });
    }
    
    // 更新配置
    const config = {
      ...configs[index],
      ...updatedConfig,
      updateTime: new Date().toISOString()
    };
    configs[index] = config;
    res.json(config);
  } catch (error) {
    console.error('更新配置错误:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 启动服务
app.listen(port, () => {
  console.log(`简单认证服务运行在 http://localhost:${port}`);
});