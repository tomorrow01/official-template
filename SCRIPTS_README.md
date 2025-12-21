# 官方模板项目 - 一键运行和部署脚本

本项目提供了一套完整的一键运行和部署脚本，方便开发者快速启动开发环境和部署生产环境。

## 脚本列表

| 脚本名称 | 用途 | 执行方式 |
| --- | --- | --- |
| `run-dev.sh` | 一键启动所有开发环境服务 | `./run-dev.sh` |
| `build-all.sh` | 一键构建所有项目 | `./build-all.sh` |
| `deploy.sh` | 一键部署所有项目到服务器 | `./deploy.sh` |

## 脚本详细说明

### 1. `run-dev.sh` - 一键启动开发环境

该脚本用于快速启动所有开发环境服务，包括：
- 后端服务（端口：3000）
- 管理后台（端口：5173）
- 前端项目（端口：3001）

**执行步骤：**
1. 检查系统环境（Node.js、npm）
2. 安装所有项目依赖
3. 启动后端服务
4. 启动管理后台
5. 启动前端项目
6. 输出服务状态和访问地址

**执行方式：**
```bash
./run-dev.sh
```

**输出示例：**
```
========================================
官方模板项目 - 一键启动开发环境
========================================
1. 启动后端服务...
后端服务已启动，PID: 1234，日志: logs/backend-dev.log

2. 启动管理后台...
管理后台已启动，PID: 5678，日志: logs/admin-dev.log

3. 启动前端项目...
前端项目已启动，PID: 9012，日志: logs/frontend-dev.log

========================================
开发环境启动完成！
========================================
后端服务：http://localhost:3000
管理后台：http://localhost:5173
前端项目：http://localhost:3001

服务状态：
- 后端服务：运行中 (PID: 1234)
- 管理后台：运行中 (PID: 5678)
- 前端项目：运行中 (PID: 9012)

查看日志：
tail -f logs/backend-dev.log
tail -f logs/admin-dev.log
tail -f logs/frontend-dev.log

停止服务：
kill 1234 5678 9012
========================================
```

### 2. `build-all.sh` - 一键构建所有项目

该脚本用于构建所有项目的生产版本，包括：
- 后端服务（复制源码到dist目录）
- 管理后台（构建生产版本）
- 前端项目（构建生产版本）

**执行步骤：**
1. 检查系统环境（Node.js、npm）
2. 创建dist目录
3. 构建后端服务（复制源码）
4. 构建管理后台（生产版本）
5. 构建前端项目（生产版本）
6. 输出构建结果和部署说明

**执行方式：**
```bash
./build-all.sh
```

**输出示例：**
```
========================================
官方模板项目 - 一键构建所有项目
========================================
创建dist目录...
1. 构建后端服务...
复制后端源码到dist目录...
后端服务构建完成！

2. 构建管理后台...
管理后台构建完成！

3. 构建前端项目...
前端项目构建完成！

========================================
所有项目构建完成！
========================================
构建文件位置：
- 后端服务：dist/backend
- 管理后台：dist/admin
- 前端项目：dist/frontend

构建日志：
- 后端：logs/backend-install-build.log
- 管理后台：logs/admin-build.log
- 前端项目：logs/frontend-build.log

部署说明：
1. 将dist目录上传到服务器
2. 配置Nginx或其他Web服务器指向对应目录
3. 启动后端服务：cd dist/backend && npm install && npm run dev
========================================
```

### 3. `deploy.sh` - 一键部署所有项目

该脚本用于一键部署所有项目到服务器，包括：
- 构建所有项目
- 上传构建文件到服务器
- 配置服务器环境
- 启动服务

**执行步骤：**
1. 检查系统环境（Node.js、npm、ssh、scp）
2. 提示用户输入服务器信息
3. 确认部署配置
4. 执行构建脚本
5. 上传构建文件到服务器
6. 安装后端依赖
7. 启动后端服务
8. 输出部署结果和访问地址

**执行方式：**
```bash
./deploy.sh
```

**输出示例：**
```
========================================
官方模板项目 - 一键部署脚本
========================================

请配置服务器信息：
服务器IP地址 [your-server-ip]: 192.168.1.100
服务器端口 [22]: 
服务器用户名 [root]: 
服务器部署路径 [/opt/official-template]: 

部署配置：
服务器IP：192.168.1.100
服务器端口：22
服务器用户名：root
服务器部署路径：/opt/official-template

========================================
是否确认部署？(y/n) y

1. 构建所有项目...
所有项目构建完成！

2. 上传构建文件到服务器...
上传后端服务...
上传管理后台...
上传前端项目...
所有项目上传完成！

3. 配置服务器环境...
安装后端依赖...

4. 启动服务...
停止现有服务...
启动后端服务...

========================================
部署完成！
========================================
部署信息：
服务器IP：192.168.1.100
服务器部署路径：/opt/official-template
后端服务：http://192.168.1.100:3000
管理后台：http://192.168.1.100:5173
前端项目：http://192.168.1.100:3001

查看后端日志：
ssh -p 22 root@192.168.1.100 'tail -f /opt/official-template/backend.log'

停止后端服务：
ssh -p 22 root@192.168.1.100 'pkill -f "node src/index.js"'
========================================
```

## 服务器配置建议

### Nginx配置示例

以下是Nginx配置示例，用于部署官方模板项目：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 前端项目
    location / {
        root /opt/official-template/frontend;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # 管理后台
    location /admin {
        root /opt/official-template;
        index index.html;
        try_files $uri $uri/ /admin/index.html;
    }

    # 后端API
    location /api {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 注意事项

1. **环境要求**：
   - Node.js >= 16.x
   - npm >= 8.x
   - SSH客户端（用于部署）

2. **端口冲突**：
   - 确保开发环境中没有其他服务占用3000、5173、3001端口
   - 如果端口冲突，可以修改各项目的配置文件

3. **日志管理**：
   - 所有脚本执行日志保存在`logs`目录中
   - 可以使用`tail -f logs/xxx.log`命令查看实时日志

4. **部署安全**：
   - 生产环境建议使用HTTPS
   - 建议使用非root用户部署
   - 定期备份服务器数据

## 常见问题

### Q: 执行脚本时提示"Permission denied"？
A: 请确保脚本具有执行权限，执行以下命令添加权限：
```bash
chmod +x run-dev.sh build-all.sh deploy.sh
```

### Q: 启动开发环境时提示依赖安装失败？
A: 请检查网络连接，或手动执行`npm install`命令安装依赖。

### Q: 部署时提示SSH连接失败？
A: 请检查服务器IP、端口、用户名和密码是否正确，确保服务器允许SSH连接。

### Q: 部署后无法访问服务？
A: 请检查：
1. 服务器防火墙是否开放对应端口
2. 服务是否正常启动
3. Nginx配置是否正确

## 联系我们

如果您在使用过程中遇到问题，欢迎随时联系我们。

- 项目地址：https://github.com/your-username/official-template
- 文档地址：https://your-domain.com/docs
- 联系方式：your-email@example.com
