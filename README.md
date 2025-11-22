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

## 部署指南

### 前端部署

```bash
cd frontend
npm run build
# 生成的静态文件在 dist 目录，可部署到 Nginx 或 CDN
```

### 后端部署

```bash
cd backend
npm run build  # 如果使用 TypeScript
npm install --production
# 使用 PM2 管理进程
npm install -g pm2
npm run start
```

### 管理后台部署

```bash
cd admin
npm run build
# 生成的静态文件在 dist 目录，可部署到 Nginx
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