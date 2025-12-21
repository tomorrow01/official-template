#!/bin/bash

# 官方模板项目 - 一键启动开发环境脚本
# 启动顺序：后端服务 -> 管理后台 -> 前端项目

echo "========================================"
echo "官方模板项目 - 一键启动开发环境"
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

# 创建日志目录
mkdir -p logs

echo "1. 启动后端服务..."
cd backend
npm install > ../logs/backend-install.log 2>&1
if [ $? -ne 0 ]; then
    echo "后端依赖安装失败，请查看 logs/backend-install.log"
    exit 1
fi
npm run dev > ../logs/backend-dev.log 2>&1 &
BACKEND_PID=$!
echo "后端服务已启动，PID: $BACKEND_PID，日志: logs/backend-dev.log"

# 等待后端服务启动
sleep 3

# 启动管理后台
echo -e "\n2. 启动管理后台..."
cd ../admin
npm install > ../logs/admin-install.log 2>&1
if [ $? -ne 0 ]; then
    echo "管理后台依赖安装失败，请查看 logs/admin-install.log"
    kill $BACKEND_PID
    exit 1
fi
npm run dev > ../logs/admin-dev.log 2>&1 &
ADMIN_PID=$!
echo "管理后台已启动，PID: $ADMIN_PID，日志: logs/admin-dev.log"

# 等待管理后台启动
sleep 3

# 启动前端项目
echo -e "\n3. 启动前端项目..."
cd ../frontend
npm install > ../logs/frontend-install.log 2>&1
if [ $? -ne 0 ]; then
    echo "前端项目依赖安装失败，请查看 logs/frontend-install.log"
    kill $BACKEND_PID
    kill $ADMIN_PID
    exit 1
fi
npm run dev > ../logs/frontend-dev.log 2>&1 &
FRONTEND_PID=$!
echo "前端项目已启动，PID: $FRONTEND_PID，日志: logs/frontend-dev.log"

# 等待前端项目启动
sleep 5

echo -e "\n========================================"
echo "开发环境启动完成！"
echo "========================================"
echo "后端服务：http://localhost:3000"
echo "管理后台：http://localhost:5173"
echo "前端项目：http://localhost:3001"
echo -e "\n服务状态："
echo "- 后端服务：运行中 (PID: $BACKEND_PID)"
echo "- 管理后台：运行中 (PID: $ADMIN_PID)"
echo "- 前端项目：运行中 (PID: $FRONTEND_PID)"
echo -e "\n查看日志："
echo "tail -f logs/backend-dev.log"
echo "tail -f logs/admin-dev.log"
echo "tail -f logs/frontend-dev.log"
echo -e "\n停止服务："
echo "kill $BACKEND_PID $ADMIN_PID $FRONTEND_PID"
echo -e "\n========================================"
