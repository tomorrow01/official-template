# SSL 证书与 HTTPS 部署指南

> 记录 2026-09-05 宝塔面板 + certbot 部署 HTTPS 的完整过程与踩坑教训。

## 目录

1. [服务器信息](#1-服务器信息)
2. [域名与端口规划](#2-域名与端口规划)
3. [部署架构图](#3-部署架构图)
4. [Nginx 配置说明](#4-nginx-配置说明)
5. [证书申请方法](#5-证书申请方法)
6. [证书续期配置](#6-证书续期配置)
7. [完整部署步骤](#7-完整部署步骤)
8. [踩坑记录（必看！）](#8-踩坑记录必看)
9. [运维速查](#9-运维速查)

---

## 1. 服务器信息

| 项目 | 信息 |
|---|---|
| IP | `1.12.230.228` |
| 系统 | OpenCloudOS（基于 CentOS） |
| Nginx | 宝塔面板管理，路径 `/www/server/nginx/sbin/nginx` |
| Nginx 配置 | `/www/server/nginx/conf/nginx.conf` |
| Vhost 配置 | `/www/server/panel/vhost/nginx/*.conf` |
| 证书目录（宝塔） | `/www/server/panel/vhost/cert/<domain>/` |
| 证书目录（certbot） | `/etc/letsencrypt/live/<domain>/` |
| Nginx init 脚本 | `/etc/init.d/nginx` |

## 2. 域名与端口规划

| 域名 | 用途 | 后端进程 | 监听端口 |
|---|---|---|---|
| `meifu.site` | 老项目 | Nginx 直接托管静态文件 | — |
| `admin.meifu.site` | 管理后台（Vue SPA） | Express API | 3002 |
| `official.meifu.site` | 官网前台（Nuxt SSR） | Nuxt SSR | 3001 |

## 3. 部署架构图

```
                    ┌──────────────┐
                    │  浏览器/客户端  │
                    └──────┬───────┘
                           │ HTTPS (443)
                           ▼
              ┌──────────────────────┐
              │  Nginx (宝塔管理)      │
              │  1.12.230.228:443    │
              └─────┬────────┬─────┘
                    │        │
         ┌──────────┘        └──────────┐
         │                               │
    SNI 匹配                         SNI 匹配
    admin.meifu.site              official.meifu.site
         │                               │
         ▼                               ▼
  ┌────────────┐                  ┌────────────┐
  │ /api/*     │                  │ /api/*     │──────┐
  │ /uploads/* │                  │ /uploads/* │      │
  │ /* (SPA)   │                  │ /* (SSR)   │      │
  └─────┬──────┘                  └─────┬──────┘      │
        │                               │              │
        ▼                               ▼              │
  ┌────────────┐  ┌────────────┐  ┌────────────┐      │
  │ backend    │  │ backend    │  │ frontend   │      │
  │ :3002      │  │ :3002      │  │ :3001      │      │
  │ (Express)  │  │ (Express)  │  │ (Nuxt SSR) │      │
  └─────┬──────┘  └─────┬──────┘  └────────────┘      │
        │               │                              │
        └───────┬───────┘                              │
                │                                      │
                ▼                                      │
         ┌──────────┐                                   │
         │ MongoDB  │◄──────────────────────────────────┘
         └──────────┘
```

## 4. Nginx 配置说明

### 配置文件位置

宝塔的 vhost 配置按字母序加载：

```
/www/server/panel/vhost/nginx/
├── 0.default.conf               # SNI 兜底（server_name _）
├── 0.site_total_log_format.conf # 日志格式
├── 0.websocket.conf             # WebSocket 配置
├── phpfpm_status.conf           # PHP-FPM 状态页
├── waf2monitor_data.conf        # WAF
├── html_admin.meifu.site.conf   # admin 后台配置
├── html_meifu.site.conf         # meifu 老项目配置
└── html_official.meifu.site.conf # official 官网配置
```

### 关键配置规则

```nginx
# ❌ 错误：用反引号括字符串（宝塔自动生成的垃圾）
rewrite ^(/.*)$ `https://$host$1`  permanent;
error_page 497  `https://$host$request_uri;`

# ✅ 正确：不用引号
rewrite ^(/.*)$ https://$host$1 permanent;
error_page 497  https://$host$request_uri;

# ❌ 错误：文件结尾缺换行（导致下一个 server 块被吞并）
# 文件最后一个字符是 "}" 没有 "\n"

# ✅ 正确：文件结尾必须有换行
# 每个 .conf 文件末尾确保有一个空行
```

## 5. 证书申请方法

### 方法一：宝塔面板（⚠️ 有坑）

宝塔 → SSL 证书 → Let's Encrypt → DNS 验证

**⚠️ 必须验证！** 宝塔申请完后立刻跑：
```bash
openssl x509 -in /www/server/panel/vhost/cert/<域名>/fullchain.pem -noout -subject
# 正确输出: subject=CN = 你申请的域名
# 错误输出: subject=CN = 别的域名（宝塔装错了证书！）
```

### 方法二：certbot（推荐 ✅）

```bash
# 1. 安装 certbot
pip3 install certbot

# 2. 停 nginx（standalone 模式需要 80 端口）
/etc/init.d/nginx stop
sleep 2

# 3. 申请证书（三个域名一起签）
certbot certonly --standalone \
    -d meifu.site \
    -d admin.meifu.site \
    -d official.meifu.site \
    --email admin@meifu.site \
    --agree-tos \
    --non-interactive

# 4. 启动 nginx
/etc/init.d/nginx start

# 5. 复制证书到宝塔目录（nginx 配置引用的是宝塔路径）
for domain in meifu.site admin.meifu.site official.meifu.site; do
    cp /etc/letsencrypt/live/$domain/fullchain.pem \
       /www/server/panel/vhost/cert/$domain/fullchain.pem
    cp /etc/letsencrypt/live/$domain/privkey.pem \
       /www/server/panel/vhost/cert/$domain/privkey.pem
done

# 6. 验证证书
for domain in meifu.site admin.meifu.site official.meifu.site; do
    echo -n "$domain: "
    openssl x509 -in /www/server/panel/vhost/cert/$domain/fullchain.pem -noout -subject 2>/dev/null | sed 's/.*CN = //'
done
```

### 证书位置对照

| 位置 | 路径 | 说明 |
|---|---|---|
| certbot 源目录 | `/etc/letsencrypt/live/<domain>/` | certbot 续期管理的源 |
| 宝塔目录 | `/www/server/panel/vhost/cert/<domain>/` | nginx 配置引用的路径 |

## 6. 证书续期配置

certbot 会自动续期（到期前 30 天），但续期后需要同步到宝塔目录。

### 自动同步脚本

```bash
# 创建 deploy-hook 脚本
cat > /etc/letsencrypt/renewal-hooks/deploy/sync-to-bt.sh << 'EOF'
#!/bin/bash
# certbot 续期完成后自动同步证书到宝塔目录 + reload/start nginx
# 维护域名：meifu.site、admin.meifu.site、official.meifu.site

for domain in meifu.site admin.meifu.site official.meifu.site; do
    src="/etc/letsencrypt/live/$domain"
    dst="/www/server/panel/vhost/cert/$domain"
    if [ -d "$src" ] && [ -d "$dst" ]; then
        cp "$src/fullchain.pem" "$dst/fullchain.pem"
        cp "$src/privkey.pem" "$dst/privkey.pem"
        echo "  ✅ Synced $domain certificate to BT panel"
    else
        echo "  ⚠️  Skip $domain (dir not found)"
    fi
done

# nginx 在跑就 reload，没跑就 start（兼容 standalone 模式停 nginx 的场景）
if pgrep -x nginx > /dev/null; then
    /etc/init.d/nginx reload && echo "  ✅ Nginx reloaded"
else
    /etc/init.d/nginx start && echo "  ✅ Nginx started"
fi
EOF

chmod +x /etc/letsencrypt/renewal-hooks/deploy/sync-to-bt.sh
```

### 手动续期（快到期时一键执行）

```bash
# 【推荐】certbot 自动判断要不要续期，续期了就触发 deploy-hook 同步
certbot renew

# 【模拟】只测试，不真的续期
certbot renew --dry-run

# 【手动强制续期】不管到没到期都续（仅测试用，别频繁跑）
# certbot renew --force-renewal

# 【仅同步】如果你手动签了新证书，只想同步到宝塔目录
/etc/letsencrypt/renewal-hooks/deploy/sync-to-bt.sh
```

## 7. 完整部署步骤

### 7.1 项目构建

```bash
# admin（管理后台，静态 SPA）
cd admin && npm install && npm run build
# 产物: admin/dist/ → 上传到 /www/wwwroot/official/admin/dist/

# frontend（官网前台，Nuxt SSR）
cd frontend && npm install && npm run build
# 产物: frontend/.output/ → 上传到 /www/wwwroot/official/frontend/

# backend（API 服务）
cd backend && npm install --production
# 直接上传源码 + node_modules 到 /www/wwwroot/official/backend/
```

### 7.2 PM2 启动后端

```bash
# backend
cd /www/wwwroot/official/backend
pm2 start src/index.js --name backend
pm2 save
pm2 startup  # 开机自启

# frontend（Nuxt SSR）
cd /www/wwwroot/official/frontend
pm2 start .output/server/index.mjs --name frontend
pm2 save
```

### 7.3 Nginx 配置（admin.meifu.site）

```nginx
server {
    listen 80;
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name admin.meifu.site;

    ssl_certificate /www/server/panel/vhost/cert/admin.meifu.site/fullchain.pem;
    ssl_certificate_key /www/server/panel/vhost/cert/admin.meifu.site/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    root /www/wwwroot/official/admin/dist;
    index index.html index.htm;

    # API 反代到 backend:3002
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

    # 上传文件反代
    location /uploads/ {
        proxy_pass http://127.0.0.1:3002/uploads/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # SPA 路由兜底
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 7.4 Nginx 配置（official.meifu.site）

```nginx
server {
    listen 80;
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name official.meifu.site;

    ssl_certificate /www/server/panel/vhost/cert/official.meifu.site/fullchain.pem;
    ssl_certificate_key /www/server/panel/vhost/cert/official.meifu.site/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    # API 反代到 backend:3002
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

    # 上传文件反代
    location /uploads/ {
        proxy_pass http://127.0.0.1:3002/uploads/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # SSR 全量反代到 frontend:3001
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
}
```

### 7.5 验证部署

```bash
# 1. 验证证书
echo | openssl s_client -connect 127.0.0.1:443 -servername admin.meifu.site 2>/dev/null | openssl x509 -noout -subject
echo | openssl s_client -connect 127.0.0.1:443 -servername official.meifu.site 2>/dev/null | openssl x509 -noout -subject
echo | openssl s_client -connect 127.0.0.1:443 -servername meifu.site 2>/dev/null | openssl x509 -noout -subject

# 2. 验证 HTTP 访问
curl -k https://admin.meifu.site/ -o /dev/null -w "admin: HTTP %{http_code}\n"
curl -k https://official.meifu.site/ -o /dev/null -w "official: HTTP %{http_code}\n"
curl -k https://meifu.site/ -o /dev/null -w "meifu: HTTP %{http_code}\n"

# 3. 验证 API 反代
curl -sk https://admin.meifu.site/api/articles
curl -sk https://official.meifu.site/api/articles

# 4. 验证 uploads 反代
curl -sk https://admin.meifu.site/uploads/
```

## 8. 踩坑记录（必看！）

### 坑 1：宝塔 SSL 证书静默装错

**现象**：宝塔 DNS 验证成功、Let's Encrypt 签发成功，但证书目录里装的是**别的域名**的证书。

**根因**：宝塔"下载证书"环节静默失败后，回退到复制旧证书。

**教训**：
- 宝塔申请完 **必须立刻验证** 证书内容：`openssl x509 -noout -subject`
- 不要依赖宝塔管理证书，用 certbot 命令行申请更靠谱

### 坑 2：Nginx 反引号破坏语法

**现象**：SNI 匹配错乱，`admin.meifu.site` 返回 `official.meifu.site` 的证书。

**根因**：宝塔自动生成的 rewrite/error_page 用了反引号 `` ` ``：
```nginx
rewrite ^(/.*)$ `https://$host$1` permanent;  # ❌ nginx 不认反引号
error_page 497 `https://$host$request_uri;`     # ❌ 分号在反引号里！
```

**教训**：
- Nginx 字符串**不用反引号**（shell 用的才是反引号）
- 反引号会让 nginx 解析错乱，server 块嵌套
- 清理宝塔生成的垃圾行，或者注释掉

### 坑 3：Nginx 配置文件结尾缺换行

**现象**：SNI 匹配错乱，新加的 server 块总是被前一个吞掉。

**根因**：宝塔导出的配置文件最后一个字符是 `}` 没有 `\n`，导致：
```html
}server {   ← nginx 看到的是一行，没识别出两个独立 server 块
```

**教训**：
- 每个 `.conf` 文件末尾必须有换行
- 批量修复：`for f in /www/server/panel/vhost/nginx/*.conf; do echo "" >> "$f"; done`

### 坑 4：killall -9 nginx 杀不干净

**现象**：改了 nginx 配置文件，重启后 SNI 结果没变。

**根因**：宝塔守护进程在后台偷偷重启 nginx 用旧配置。

**教训**：
- 用 `/etc/init.d/nginx stop` 停，`/etc/init.d/nginx start` 起
- 或者 `killall -9 nginx; sleep 2; killall -9 nginx` 连续杀两次
- 启动前确认：`ps aux | grep nginx | grep -v grep` 应该是空的

### 坑 5：Nginx 有两个二进制

**现象**：`which nginx` → `/usr/bin/nginx`，宝塔的在 `/www/server/nginx/sbin/nginx`。

**实际上**：它们是同一个文件（符号链接），但**启动时必须用 `/etc/init.d/nginx`**，不要直接 `nginx`，否则可能起错配置。

### 坑 6：meifu HTTPS server 块被注释掉

**现象**：meifu.site SNI 返回空证书（0.default 的）。

**根因**：排查时为了隔离问题注释了 meifu 的 HTTPS 块，恢复时忘了取消注释。

**教训**：做二分排查前先**备份原始文件**。

## 9. 运维速查

### 证书验证

```bash
# 查看所有证书的 CN
for d in meifu.site admin.meifu.site official.meifu.site; do
    echo -n "$d: "
    openssl x509 -in /www/server/panel/vhost/cert/$d/fullchain.pem -noout -subject 2>/dev/null | sed 's/.*CN = //'
done

# 查看证书有效期
for d in meifu.site admin.meifu.site official.meifu.site; do
    echo -n "$d: "
    openssl x509 -in /www/server/panel/vhost/cert/$d/fullchain.pem -noout -dates 2>/dev/null
done
```

### 进程管理

```bash
# nginx
/etc/init.d/nginx status
/etc/init.d/nginx stop
/etc/init.d/nginx start
/etc/init.d/nginx reload
nginx -t           # 测试配置
nginx -T 2>/dev/null | grep server_name  # 查看加载了哪些 server_name

# pm2（后端进程）
pm2 list
pm2 restart backend
pm2 restart frontend
pm2 logs backend
pm2 logs frontend
```

### 端口检查

```bash
ss -tlnp | grep -E ':80|:443|:3001|:3002'
```

### 日志位置

```
/www/wwwlogs/
├── nginx_error.log           # nginx 错误日志
├── admin.meifu.site.log      # admin 站点访问日志
├── admin.meifu.site.error.log # admin 站点错误日志
├── official.meifu.site.log   # official 站点访问日志
├── official.meifu.site.error.log # official 站点错误日志
└── meifu.site.log            # meifu 站点日志

/www/server/panel/vhost/cert/
├── 0.default/                # nginx 兜底 server 的证书（空的）
├── meifu.site/               # meifu 证书（来自 certbot）
├── admin.meifu.site/         # admin 证书（来自 certbot）
└── official.meifu.site/      # official 证书（来自 certbot）
```

### 文件权限

```bash
# nginx worker 进程以 www 用户运行，文件需要可读
chown -R www:www /www/wwwroot/official/
chmod -R 755 /www/wwwroot/official/admin/dist/
chmod -R 755 /www/wwwroot/official/frontend/.output/

# 证书权限（不要泄露私钥！）
chmod 644 /www/server/panel/vhost/cert/*/fullchain.pem
chmod 600 /www/server/panel/vhost/cert/*/privkey.pem
```

---

**文档版本**: v1.1  
**更新日期**: 2026-09-05  
**服务器**: 1.12.230.228  
**Nginx**: 1.28.1（宝塔管理）  
**证书管理**: 三个域名（meifu.site / admin.meifu.site / official.meifu.site）统一 certbot 管理 + deploy-hook 自动同步
