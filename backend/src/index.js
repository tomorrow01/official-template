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

const app = express();
const port = process.env.PORT || 3001; // 修改为3001端口

// 确保上传目录存在
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

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
    fileSize: 5 * 1024 * 1024, // 5MB 限制
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

// 中间件配置
app.use(cors()); // 允许跨域
app.use(bodyParser.json()); // 解析 JSON 请求体
app.use('/uploads', express.static(uploadDir)); // 静态文件服务，用于访问上传的图片

// 添加全局请求日志中间件（关键修改）
app.use((req, res, next) => {
  console.log('收到请求 - 时间:', new Date().toISOString());
  console.log('请求方法:', req.method);
  console.log('请求路径:', req.originalUrl);
  console.log('请求来源IP:', req.ip);
  next(); // 传递请求到下一个中间件/路由
});
// 挂载路由
app.use('/articles', articlesRouter);
app.use('/contents', contentsRouter);
app.use('/banners', bannersRouter);
app.use('/cases', casesRouter); // 挂载 cases 路由
app.use('/services', servicesRouter); // 挂载 services 路由

// 通用文件上传接口
app.post('/upload', upload.single('file'), (req, res) => {
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

// 启动服务前连接数据库
connectDB().then(async (isConnected) => {
  if (isConnected) {
    // 连接成功后，尝试插入默认数据
    await insertDefaultData();
  } else {
    console.warn('MongoDB连接失败，但服务将继续运行（使用模拟数据）');
    // 可以在这里添加模拟数据加载逻辑，确保API接口仍能返回数据
  }
  
  // 无论数据库是否连接成功，都启动HTTP服务
  app.listen(port, () => {
    console.log(`服务运行在 http://localhost:${port}`);
  });
});
// 添加全局错误监听（关键新增）
process.on('uncaughtException', (err) => {
  console.error('未捕获的异常导致进程退出:', err.message);
  console.error('堆栈信息:', err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的 Promise 拒绝:', '在', promise, '原因:', reason);
});

// 文章列表：`http://localhost:3000/api/articles`
// 内容列表：`http://localhost:3000/api/contents`
// 轮播图列表：`http://localhost:3000/api/banners`
// 案例列表：`http://localhost:3000/api/cases`
// 服务列表：`http://localhost:3000/api/services`