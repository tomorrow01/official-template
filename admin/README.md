# admin — 后台管理系统

Vue 3 + Element Plus + Vite 构建的后台管理系统。

## 开发环境

```bash
npm install
npm run dev
```

启动后访问 http://localhost:5173/login

### 开发登录账号

| 项目 | 值 |
| --- | --- |
| 用户名 | `admin` |
| 密码 | `123456` |

> 前端 mock 认证，仅用于开发调试。

## 生产环境构建 & 部署

### 本地构建

```bash
npm run build
# 产物在 dist/ 目录
```

### 打包上传

```bash
tar --exclude='node_modules' --exclude='.git' --exclude='.vite' -czf official-admin.tar.gz dist/
# 上传到服务器 /www/wwwroot/official/admin/
```

### 服务器解压

```bash
cd /www/wwwroot/official/admin
tar -xzf official-admin.tar.gz
mv dist/* ./ && rm -rf dist official-admin.tar.gz
```

### nginx 配置（admin.meifu.site）

网站根目录设为 `/www/wwwroot/official/admin`，在 `access_log` 之前添加反代：

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

### 日常更新

```bash
# 1. 本地
npm run build
# 2. 上传 dist/* 到服务器 /www/wwwroot/official/admin/（覆盖即可）
# admin 是纯静态，不用 pm2，不用重启 nginx，浏览器刷新就生效
```

## API 配置说明

- **开发环境**：`vite.config.js` proxy 代理 `localhost:3002`
- **生产环境**：`api.js` 中 baseURL 为空字符串 `''`，走同源 nginx 反代到 backend

## 技术栈

- Vue 3 + Vite
- Element Plus
- Vue Router 4
- Axios
- wangEditor（富文本编辑器）
