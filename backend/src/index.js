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

// 挂载路由
app.use('/api/articles', articlesRouter);
app.use('/api/contents', contentsRouter);
app.use('/api/banners', bannersRouter);

// 启动服务
app.listen(port, () => {
  console.log(`服务运行在 http://localhost:${port}`);
});

// 文章列表：`http://localhost:3000/api/articles`
// 内容列表：`http://localhost:3000/api/contents`
// 轮播图列表：`http://localhost:3000/api/banners`