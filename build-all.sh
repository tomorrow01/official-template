#!/bin/bash

# 官方模板项目 - 一键构建所有项目脚本
# 构建顺序：后端服务 -> 管理后台 -> 前端项目

echo "========================================"
echo "官方模板项目 - 一键构建所有项目"
echo "========================================"

# 检查是否安装了npm
if ! command -v npm &> /dev/null; then
    echo "错误：未安装npm，请先安装Node.js和npm"
    exit 1
fi

# 检查是否安装了node
if ! command -v node &> /dev/null; then
    echo "错误：未安装node，请先安装Node.js"
    exit 1
fi

# 创建日志目录和dist目录
mkdir -p logs
echo "创建dist目录..."
mkdir -p dist
mkdir -p dist/backend
mkdir -p dist/admin
mkdir -p dist/frontend

echo "1. 构建后端服务..."
cd backend
npm install > ../logs/backend-install-build.log 2>&1
if [ $? -ne 0 ]; then
    echo "后端依赖安装失败，请查看 logs/backend-install-build.log"
    exit 1
fi

# 复制后端源码到dist目录（Node.js后端无需构建，直接复制源码）
echo "复制后端源码到dist目录..."
cp -r src dist/
cp package.json dist/
cp package-lock.json dist/
cp -r uploads dist/ 2>/dev/null || echo "uploads目录不存在，跳过复制"
cp check-db.js dist/ 2>/dev/null || echo "check-db.js不存在，跳过复制"

echo "后端服务构建完成！"

# 构建管理后台
echo -e "\n2. 构建管理后台..."
cd ../admin
npm install > ../logs/admin-install-build.log 2>&1
if [ $? -ne 0 ]; then
    echo "管理后台依赖安装失败，请查看 logs/admin-install-build.log"
    exit 1
fi

npm run build:prod > ../logs/admin-build.log 2>&1
if [ $? -ne 0 ]; then
    echo "管理后台构建失败，请查看 logs/admin-build.log"
    exit 1
fi

# 复制管理后台构建文件到dist目录
echo "复制管理后台构建文件到dist目录..."
cp -r dist/* ../dist/admin/

echo "管理后台构建完成！"

# 构建前端项目
echo -e "\n3. 构建前端项目..."
cd ../frontend
npm install > ../logs/frontend-install-build.log 2>&1
if [ $? -ne 0 ]; then
    echo "前端项目依赖安装失败，请查看 logs/frontend-install-build.log"
    exit 1
fi

npm run build:prod > ../logs/frontend-build.log 2>&1
if [ $? -ne 0 ]; then
    echo "前端项目构建失败，请查看 logs/frontend-build.log"
    exit 1
fi

# 复制前端构建文件到dist目录
echo "复制前端构建文件到dist目录..."
cp -r .output/* ../dist/frontend/

echo "前端项目构建完成！"

echo -e "\n========================================"
echo "所有项目构建完成！"
echo "========================================"
echo "构建文件位置："
echo "- 后端服务：dist/backend"
echo "- 管理后台：dist/admin"
echo "- 前端项目：dist/frontend"
echo -e "\n构建日志："
echo "- 后端：logs/backend-install-build.log"
echo "- 管理后台：logs/admin-build.log"
echo "- 前端项目：logs/frontend-build.log"
echo -e "\n部署说明："
echo "1. 将dist目录上传到服务器"
echo "2. 配置Nginx或其他Web服务器指向对应目录"
echo "3. 启动后端服务：cd dist/backend && npm install && npm run dev"
echo -e "\n========================================"
