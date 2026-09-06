# frontend — 官网前台

Nuxt 3 SSR 构建的企业官网前台，支持服务介绍、案例展示、文章列表等模块。

## 开发环境

```bash
npm install
npm run dev
```

启动后访问 http://localhost:3000

## 生产环境构建 & 部署

### 本地构建

```bash
npm run build
# 产物在 .output/ 目录（Nuxt 3 SSR 运行时 + 静态资源）
# ⚠️ .output 是隐藏目录，Mac Finder 默认不显示
```

### 打包上传

```bash
tar -czf official-frontend.tar.gz .output/
# 上传到服务器 /www/wwwroot/official/frontend/
```

### 服务器解压 + pm2 启动

```bash
cd /www/wwwroot/official/frontend
tar -xzf official-frontend.tar.gz && rm -f official-frontend.tar.gz

# 确认产物存在
ls -la .output/server/index.mjs

# 启动（端口 3001 已在 nuxt.config.ts 写死，无需 PORT 环境变量）
pm2 start "node .output/server/index.mjs" --name official-frontend

# 保存 + 开机自启
pm2 save && pm2 startup
```

### nginx 配置（official.meifu.site）

网站根目录设为 `/www/wwwroot/official/frontend`，在 `access_log` 之前添加反代：

```nginx
# API 反代到 backend
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

# 上传文件反代到 backend
location /uploads/ {
    proxy_pass http://127.0.0.1:3002/uploads/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

# Nuxt SSR 全量反代
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

### 日常更新

```bash
# 1. 本地重新构建
npm run build

# 2. 上传 .output/ 覆盖服务器 /www/wwwroot/official/frontend/

# 3. 重启 pm2
pm2 restart official-frontend
```

## pm2 运维速查

```bash
pm2 list                          # 查看进程状态
pm2 restart official-frontend     # 重启
pm2 stop official-frontend         # 停止
pm2 start official-frontend        # 启动
pm2 logs official-frontend         # 实时日志
pm2 save && pm2 startup           # 保存 + 开机自启
```

## API 配置说明

- **开发环境**：`nuxt.config.ts` 中 `nitro.devProxy` 代理到 `127.0.0.1:3002`
- **生产环境**：`api/request.ts` 中 production baseURL 为空字符串 `''`，走同源 nginx 反代

## 技术栈

- Nuxt 3（SSR）
- TypeScript
- Axios
- Tailwind CSS / 原生 CSS
