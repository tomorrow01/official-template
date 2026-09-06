# 官网项目

[![项目状态](https://img.shields.io/badge/status-开发中-blue.svg)](https://github.com/your-org/official-template)
[![技术栈](https://img.shields.io/badge/技术栈-Nuxt.js%20%7C%20Node.js%20%7C%20MongoDB-green.svg)](https://github.com/your-org/official-template)

## 项目概述

本项目是一个企业官网的完整解决方案，包含前端展示、后端API服务和管理后台三大部分。采用现代化技术栈构建，支持响应式设计，提供完整的内容管理功能。

### 核心功能

- **轮播图管理**：支持首页轮播图的上传、排序和状态控制
- **文章管理**：支持新闻、博客等文章的发布和管理
- **案例展示**：展示公司成功案例，支持多图片展示
- **服务介绍**：介绍公司提供的各类服务
- **内容管理**：管理网站静态内容如"关于我们"、"联系我们"等
- **文件上传**：支持图片等媒体文件的上传和管理

## 技术栈

### 前端
- **框架**：Nuxt.js 3.x
- **语言**：TypeScript
- **UI组件库**：Element Plus
- **构建工具**：Vite
- **HTTP客户端**：Axios
- **CSS预处理器**：Sass/Scss

### 后端
- **运行环境**：Node.js
- **Web框架**：Express
- **数据库**：MongoDB
- **ODM**：Mongoose
- **文件上传**：Multer
- **日志**：Winston

### 管理后台
- **框架**：Vue.js 3.x
- **构建工具**：Vite
- **UI组件库**：Element Plus
- **路由**：Vue Router 4.x
- **HTTP客户端**：Axios

## 快速开始

### 环境要求

- Node.js 16.x 或更高版本
- MongoDB 4.x 或更高版本
- npm 或 yarn 包管理器

### 项目结构

```
official-template/
├── frontend/          # 前端代码
├── backend/           # 后端代码
├── admin/             # 管理后台代码
├── docs/              # 项目文档
└── README.md          # 项目说明（当前文件）
```

### 开发环境设置

#### 1. 克隆项目

```bash
git clone https://github.com/your-org/official-template.git
cd official-template
```

#### 2. 启动后端服务

```bash
cd backend
npm install
# 复制环境变量模板并配置
cp .env.example .env
# 编辑 .env 文件，配置数据库连接等信息
npm run dev
```

#### 3. 启动管理后台

```bash
cd admin
npm install
npm run dev
```

#### 4. 启动前端项目

```bash
cd frontend
npm install
npm run dev
```

## 服务器部署架构

```
服务器 IP: 1.12.230.228  |  宝塔面板 + pm2 + nginx + MongoDB

域名规划：
├── admin.meifu.site     → admin 静态文件（nginx 直接托管）
├── official.meifu.site  → Nuxt SSR（nginx 反代到 Node:3001）
└── 两个域名的 /api/ /uploads/ → 反代到 backend:3002

服务器目录结构：
/www/wwwroot/official/
├── admin/               ← admin/dist 静态文件
├── backend/             ← backend 源码 + node_modules + uploads/
└── frontend/            ← frontend/.output/ SSR 产物
```

### 端口分配

| 服务 | 端口 | 说明 |
|---|---|---|
| backend (Express API) | **3002** | pm2 管理，nginx 反代 |
| frontend (Nuxt SSR) | **3001** | pm2 管理，nginx 反代 |
| admin (静态 SPA) | — | nginx 直接托管，无 Node 进程 |

---

## 开发环境启动

```bash
# 1. backend（终端 1）
cd backend && npm install && npm run dev

# 2. frontend（终端 2）
cd frontend && npm install && npm run dev
# 访问 http://localhost:3000

# 3. admin（终端 3）
cd admin && npm install && npm run dev
# 访问 http://localhost:5173/login  账号 admin / 123456
```

---

## 生产环境：首次部署

### 1. 本地产出构建包

```bash
# admin（静态）
cd admin && npm run build
tar --exclude='node_modules' --exclude='.git' --exclude='.vite' -czf official-admin.tar.gz dist/

# backend（源码 + 线上 install）
cd backend && tar --exclude='node_modules' --exclude='uploads' --exclude='.git' -czf official-backend.tar.gz .

# frontend（只传 .output SSR 产物）
cd frontend && npm run build
tar -czf official-frontend.tar.gz .output/
```

### 2. 上传到服务器 `/www/wwwroot/official/` 对应目录

```bash
# 服务器上创建目录
mkdir -p /www/wwwroot/official/{admin,backend,frontend}

# 解压 admin（摊平 dist 内容）
cd /www/wwwroot/official/admin
tar -xzf official-admin.tar.gz && mv dist/* ./ && rm -rf dist official-admin.tar.gz

# 解压 backend
cd /www/wwwroot/official/backend
tar -xzf official-backend.tar.gz && rm -f official-backend.tar.gz
npm install --production

# 解压 frontend
cd /www/wwwroot/official/frontend
tar -xzf official-frontend.tar.gz && rm -f official-frontend.tar.gz
# 确认 .output/server/index.mjs 存在
ls -la .output/server/index.mjs
```

### 3. pm2 启动服务

```bash
# backend（默认端口已写死 3002）
cd /www/wwwroot/official/backend
pm2 start "node src/index.js" --name official-backend

# frontend（默认端口已写死 3001）
cd /www/wwwroot/official/frontend
pm2 start "node .output/server/index.mjs" --name official-frontend

# 保存 + 开机自启
pm2 save && pm2 startup
```

### 4. nginx 配置（宝塔面板修改）

**admin.meifu.site**：root 设为 `/www/wwwroot/official/admin`，在 `access_log` 之前加：

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
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
location / {
    try_files $uri $uri/ /index.html;
}
```

**official.meifu.site**：root 设为 `/www/wwwroot/official/frontend`，在 `access_log` 之前加：

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
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
location / {
    proxy_pass http://127.0.0.1:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
```

验证 + 重载：
```bash
nginx -t && nginx -s reload
```

---

## 生产运维速查

```bash
# ===== pm2 进程管理 =====
pm2 list                          # 查看所有进程状态
pm2 restart official-backend      # 重启 backend
pm2 restart official-frontend     # 重启 frontend
pm2 stop official-backend         # 停 backend
pm2 start official-backend        # 启 backend
pm2 logs official-backend         # 看 backend 实时日志
pm2 logs official-frontend        # 看 frontend 实时日志
pm2 delete official-backend       # 删除进程（不影响源码）
pm2 save && pm2 startup           # 保存 + 开机自启

# ===== nginx =====
nginx -t                          # 检查配置语法
nginx -s reload                   # 重载配置（不中断服务）
nginx -s stop                     # 停止
nginx                             # 启动

# ===== 端口排查 =====
netstat -tlnp | grep -E '3001|3002'   # 确认端口是否在监听
lsof -i :3002                          # 谁占了 3002

# ===== 目录 =====
ls -la /www/wwwroot/official/           # 官网根目录
ls -la /www/wwwroot/official/backend/
ls -la /www/wwwroot/official/frontend/.output/
ls -la /www/wwwroot/official/admin/
```

---

## 更新部署（日常迭代）

每次代码改完后的更新流程：

```bash
# admin 静态更新
cd admin && npm run build
# 上传 dist/* 到 /www/wwwroot/official/admin/（覆盖即可，无需重启）

# frontend SSR 更新
cd frontend && npm run build
# 上传 .output/ 到 /www/wwwroot/official/frontend/
pm2 restart official-frontend

# backend 更新
cd backend
# 上传源码（排除 node_modules）到 /www/wwwroot/official/backend/
npm install --production          # 如果有新增依赖
pm2 restart official-backend
```

## 文档

项目详细文档位于 `docs` 目录：

- [技术架构文档](docs/技术架构文档.md)：详细介绍项目架构和技术选型
- [前端开发和部署指南](docs/前端开发和部署指南.md)：前端开发流程和部署说明
- [后端开发和部署指南](docs/后端开发和部署指南.md)：后端开发流程和部署说明
- [管理后台开发和部署指南](docs/管理后台开发和部署指南.md)：管理后台开发流程和部署说明
- [API接口文档](docs/API接口文档.md)：API接口详细规范
- [项目最终指南](docs/项目最终指南.md)：项目综合指南

## 开发规范

### 前端开发规范
- 遵循 TypeScript 编码规范
- 组件化开发，提高代码复用性
- 优先使用 Composition API
- 实现响应式设计，适配不同设备

### 后端开发规范
- 遵循 RESTful API 设计规范
- 使用中间件处理通用逻辑
- 实现统一的错误处理和日志记录
- 数据库操作使用 Mongoose ODM

### 管理后台开发规范
- 遵循 Vue 3 最佳实践
- 实现统一的表单验证
- 提供友好的用户交互和操作反馈

## 常见问题

### 问题：后端服务无法启动
**解决方案**：检查 MongoDB 连接配置和端口占用情况

### 问题：图片上传失败
**解决方案**：确认 uploads 目录权限设置和文件大小限制

### 问题：前端无法访问后端 API
**解决方案**：检查跨域配置和 API 地址设置

## 贡献指南

欢迎提交 Issues 和 Pull Requests 来改进项目。提交代码前请确保通过所有测试。

## 许可

[MIT](LICENSE)

## 联系方式

如有问题或建议，请联系项目维护团队：
- 邮箱：team@example.com
- 项目讨论：[GitHub Issues](https://github.com/your-org/official-template/issues)

---

最后更新时间：2023年1月