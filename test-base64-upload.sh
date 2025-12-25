#!/bin/bash

# 测试base64图片上传

# 生成一个简单的base64图片（1x1像素的红色图片）
BASE64_IMAGE="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="

# 准备测试数据
TEST_DATA=$(cat <<EOF
{
  "title": "测试案例",
  "description": "这是一个测试案例，用于测试base64图片上传",
  "image": "$BASE64_IMAGE",
  "order": 0,
  "isActive": true
}
EOF
)

# 发送POST请求
echo "发送测试请求..."
echo "请求数据大小: $(echo $TEST_DATA | wc -c) 字节"
echo "图片字段开头: $(echo $BASE64_IMAGE | cut -c 1-100)"
echo ""

curl -v -X POST -H "Content-Type: application/json" -d "$TEST_DATA" http://localhost:3000/api/cases
