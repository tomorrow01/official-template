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

const app = express();
const port = process.env.PORT || 3000;

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

app.get('/api', (req, res) => {
  res.json({ success: true, message: 'API服务正常运行' });
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

// 添加详细的路由挂载日志（所有路由都使用/api前缀）
console.log('开始挂载路由...');
console.log('挂载 /api/articles 路由');
app.use('/api/articles', articlesRouter);
console.log('挂载 /api/contents 路由');
app.use('/api/contents', contentsRouter);
console.log('挂载 /api/banners 路由');
app.use('/api/banners', bannersRouter);
console.log('挂载 /api/cases 路由');
app.use('/api/cases', casesRouter);
console.log('挂载 /api/services 路由');
app.use('/api/services', servicesRouter);
console.log('挂载 /api/contacts 路由');
app.use('/api/contacts', contactsRouter);
console.log('挂载 /api/configs 路由');
app.use('/api/configs', configsRouter);
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