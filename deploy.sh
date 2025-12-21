#!/bin/bash

# 官方模板项目 - 一键部署脚本
# 部署流程：构建项目 -> 上传到服务器 -> 配置服务器 -> 启动服务

echo "========================================"
echo "官方模板项目 - 一键部署脚本"
echo "========================================"

# 配置服务器信息
SERVER_USER="root"
SERVER_IP="your-server-ip"
SERVER_PORT="22"
SERVER_PATH="/opt/official-template"

# 检查是否安装了必要的工具
check_tool() {
    if ! command -v $1 &> /dev/null; then
        echo "错误：未安装$1，请先安装"
        exit 1
    fi
}

check_tool npm
check_tool node
check_tool ssh
check_tool scp

# 提示用户输入服务器信息
echo -e "\n请配置服务器信息："
read -p "服务器IP地址 [$SERVER_IP]: " input_ip
read -p "服务器端口 [$SERVER_PORT]: " input_port
read -p "服务器用户名 [$SERVER_USER]: " input_user
read -p "服务器部署路径 [$SERVER_PATH]: " input_path

# 使用用户输入的值，如果为空则使用默认值
SERVER_IP=${input_ip:-$SERVER_IP}
SERVER_PORT=${input_port:-$SERVER_PORT}
SERVER_USER=${input_user:-$SERVER_USER}
SERVER_PATH=${input_path:-$SERVER_PATH}

echo -e "\n部署配置："
echo "服务器IP：$SERVER_IP"
echo "服务器端口：$SERVER_PORT"
echo "服务器用户名：$SERVER_USER"
echo "服务器部署路径：$SERVER_PATH"
echo -e "\n========================================"

# 确认部署
read -p "是否确认部署？(y/n) " confirm
if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
    echo "部署已取消"
    exit 0
fi

# 构建所有项目
echo -e "\n1. 构建所有项目..."
./build-all.sh
if [ $? -ne 0 ]; then
    echo "项目构建失败，部署已取消"
    exit 1
fi

echo "所有项目构建完成！"

# 上传构建文件到服务器
echo -e "\n2. 上传构建文件到服务器..."

# 检查服务器目录是否存在
ssh -p $SERVER_PORT $SERVER_USER@$SERVER_IP "mkdir -p $SERVER_PATH"

# 上传后端服务
echo "上传后端服务..."
scp -P $SERVER_PORT -r dist/backend/* $SERVER_USER@$SERVER_IP:$SERVER_PATH/backend/
if [ $? -ne 0 ]; then
    echo "后端服务上传失败"
    exit 1
fi

# 上传管理后台
echo "上传管理后台..."
scp -P $SERVER_PORT -r dist/admin/* $SERVER_USER@$SERVER_IP:$SERVER_PATH/admin/
if [ $? -ne 0 ]; then
    echo "管理后台上传失败"
    exit 1
fi

# 上传前端项目
echo "上传前端项目..."
scp -P $SERVER_PORT -r dist/frontend/* $SERVER_USER@$SERVER_IP:$SERVER_PATH/frontend/
if [ $? -ne 0 ]; then
    echo "前端项目上传失败"
    exit 1
fi

echo "所有项目上传完成！"

# 配置服务器环境
echo -e "\n3. 配置服务器环境..."

# 安装后端依赖
echo "安装后端依赖..."
ssh -p $SERVER_PORT $SERVER_USER@$SERVER_IP "cd $SERVER_PATH/backend && npm install --production"
if [ $? -ne 0 ]; then
    echo "后端依赖安装失败"
    exit 1
fi

# 启动服务
echo -e "\n4. 启动服务..."

# 停止现有服务（如果存在）
echo "停止现有服务..."
ssh -p $SERVER_PORT $SERVER_USER@$SERVER_IP "pkill -f 'node src/index.js' 2>/dev/null || echo '没有正在运行的后端服务'"

# 启动后端服务
echo "启动后端服务..."
ssh -p $SERVER_PORT $SERVER_USER@$SERVER_IP "cd $SERVER_PATH/backend && nohup node src/index.js > $SERVER_PATH/backend.log 2>&1 &"
if [ $? -ne 0 ]; then
    echo "后端服务启动失败"
    exit 1
fi

echo -e "\n========================================"
echo "部署完成！"
echo "========================================"
echo "部署信息："
echo "服务器IP：$SERVER_IP"
echo "服务器部署路径：$SERVER_PATH"
echo "后端服务：http://$SERVER_IP:3000"
echo "管理后台：http://$SERVER_IP:5173"
echo "前端项目：http://$SERVER_IP:3001"
echo -e "\n查看后端日志："
echo "ssh -p $SERVER_PORT $SERVER_USER@$SERVER_IP 'tail -f $SERVER_PATH/backend.log'"
echo -e "\n停止后端服务："
echo "ssh -p $SERVER_PORT $SERVER_USER@$SERVER_IP 'pkill -f "node src/index.js"'"
echo -e "\n========================================"
