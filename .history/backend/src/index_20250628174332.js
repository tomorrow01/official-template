const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const articlesRouter = require('./routes/articles');
const contentsRouter = require('./routes/contents');
const bannersRouter = require('./routes/banners');

const app = express();
const port = process.env.PORT || 3001; // 修改为3001端口

// 中间件配置
app.use(cors()); // 允许跨域
app.use(bodyParser.json()); // 解析 JSON 请求体

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

// 启动服务
app.listen(port, () => {
  console.log(`服务运行在 http://localhost:${port}`);
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