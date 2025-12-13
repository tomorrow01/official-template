const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { connectDB, insertDefaultData } = require('./utils/db'); // 引入数据库连接函数
const articlesRouter = require('./routes/articles');
const contentsRouter = require('./routes/contents');
const bannersRouter = require('./routes/banners');
const casesRouter = require('./routes/cases'); // 引入 cases 路由
const servicesRouter = require('./routes/services'); // 引入 services 路由
const contactsRouter = require('./routes/contacts'); // 引入 contacts 路由
const configsRouter = require('./routes/configs'); // 引入 configs 路由
const authRouter = require('./routes/auth'); // 引入认证路由

const app = express();
// 修改默认端口为3001，避免与前端Nuxt服务器的3000端口冲突
const port = process.env.PORT || 3001;

// 确保上传目录存在
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 首先添加最基本的日志中间件，确保它在所有其他中间件之前
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] 收到请求: ${req.method} ${req.originalUrl}`);
  next();
});

// 基本中间件配置
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(uploadDir));

// 健康检查路由
app.get('/', (req, res) => {
  res.json({ success: true, message: '服务正常运行' });
});

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API服务正常运行' });
});

// 简单测试路由
app.get('/api/test', (req, res) => {
  console.log('测试路由收到请求');
  res.json({ success: true, message: '测试路由正常工作' });
});

// 直接实现认证路由
app.post('/api/auth/login', async (req, res) => {
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

// 配置 multer 用于文件上传
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|webp/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('只允许上传图片文件（jpeg, jpg, png, gif, webp）'));
    }
  }
});

// 文件上传接口
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: '没有文件上传' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({
      success: true,
      message: '文件上传成功',
      data: { fileUrl }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `上传失败：${error.message}`
    });
  }
});

// 使用统一的路由文件
console.log('开始挂载路由...');
const mainRouter = require('./routes/index');
app.use('/api', mainRouter);

// 添加不带/api前缀的路由用于处理表单提交
console.log('挂载 /contacts 路由');
app.use('/contacts', contactsRouter);

// 添加不带/api前缀的services路由用于处理前端代理请求
console.log('挂载 /services 路由');
app.use('/services', servicesRouter);

// 添加不带/api前缀的articles路由用于处理前端代理请求
console.log('挂载 /articles 路由');
app.use('/articles', articlesRouter);

console.log('所有路由挂载完成');

// 启动服务前连接数据库
connectDB().then(async (isConnected) => {
  if (isConnected) {
    console.log('MongoDB 连接成功');
    // 连接成功后，尝试插入默认数据
    try {
      await insertDefaultData();
    } catch (error) {
      console.warn('插入默认数据失败:', error.message);
    }
  } else {
    console.warn('MongoDB连接失败，但服务将继续运行（使用模拟数据）');
  }
  
  // 无论数据库是否连接成功，都启动HTTP服务
  app.listen(port, () => {
    console.log(`服务运行在 http://localhost:${port}`);
  });
}).catch(error => {
  console.error('数据库连接过程中发生错误:', error.message);
  // 即使数据库连接失败，也要启动服务
  app.listen(port, () => {
    console.log(`服务运行在 http://localhost:${port}（数据库连接失败）`);
  });
});

// 添加全局错误监听
process.on('uncaughtException', (err) => {
  console.error('未捕获的异常导致进程退出:', err.message);
  console.error('堆栈信息:', err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的 Promise 拒绝:', '原因:', reason);
});