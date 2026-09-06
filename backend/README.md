# backend — API 服务

Express + MongoDB 构建的官网后台 API，为 admin 管理系统和 frontend 前台提供数据接口。

## 开发环境

```bash
npm install
npm run dev
```

启动后监听 http://localhost:3002

### 环境要求

- Node.js 18+
- MongoDB 4+（本地运行时会自动连接 `mongodb://localhost:27017`）

## 生产环境部署

### 打包上传

```bash
# 在 backend 目录打包（排除 node_modules 和 uploads）
tar --exclude='node_modules' --exclude='uploads' --exclude='.git' -czf official-backend.tar.gz .
# 上传到服务器 /www/wwwroot/official/backend/
```

### 服务器安装 + pm2 启动

```bash
cd /www/wwwroot/official/backend

# 解压
tar -xzf official-backend.tar.gz && rm -f official-backend.tar.gz

# 生产依赖安装
npm install --production

# 启动（端口 3002 已在 index.js 写死默认值，无需 PORT 环境变量）
pm2 start "node src/index.js" --name official-backend

# 保存 + 开机自启
pm2 save && pm2 startup
```

### 目录结构说明

```
/www/wwwroot/official/backend/
├── src/index.js              ← 入口文件
├── src/routes/               ← API 路由
├── src/models/               ← Mongoose 数据模型
├── src/data/                 ← 默认 JSON 数据（MongoDB 初始化用）
├── src/utils/db.js           ← 数据库连接
├── uploads/                  ← 图片上传目录（首次运行自动创建）
└── node_modules/             ← 依赖
```

### nginx 反代（两个站点都要配）

admin.meifu.site 和 official.meifu.site 的 nginx 都需要加：

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:3002/api/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
location /uploads/ {
    proxy_pass http://127.0.0.1:3002/uploads/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## pm2 运维速查

```bash
pm2 list                          # 查看进程状态
pm2 restart official-backend      # 重启（改了代码后用这个）
pm2 stop official-backend         # 停止
pm2 start official-backend        # 启动
pm2 logs official-backend         # 实时日志
pm2 logs official-backend --lines 100  # 最近 100 行
pm2 delete official-backend       # 删除进程（不影响源码和 uploads）
pm2 save && pm2 startup           # 保存 + 开机自启
```

### 常见问题

```bash
# 端口被占？
lsof -i :3002

# uploads 目录权限？
chmod -R 755 /www/wwwroot/official/backend/uploads

# MongoDB 连不上？
pm2 logs official-backend | grep -i mongo
systemctl status mongod
```

## API 列表

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/api/articles` | 文章列表 |
| GET | `/api/articles/:id` | 文章详情 |
| GET | `/api/banners` | 轮播图列表 |
| GET | `/api/cases` | 案例列表 |
| GET | `/api/services` | 服务列表 |
| GET | `/api/configs` | 系统配置（关于我们、联系我们、团队成员等） |
| GET | `/api/contents` | 静态内容 |
| POST | `/api/contacts` | 提交联系表单 |
| POST | `/api/upload` | 图片上传 |

后台 CRUD 接口带 `/api/` 前缀，详见路由文件。

## 特殊说明

### 图片 URL 的 HTTPS 协议

上传接口返回的图片 URL 在生产环境自动使用 HTTPS：
- 通过 nginx 传递 `X-Forwarded-Proto` 头
- backend `index.js` 里优先读取这个头来拼接 URL

### CORS 已开启

开发和生产都可以跨域访问，生产环境同域反代不存在跨域问题。

## 技术栈

- Node.js + Express
- MongoDB + Mongoose
- Multer（文件上传）
- Cors
- Body-parser
