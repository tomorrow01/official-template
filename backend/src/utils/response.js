// 统一响应格式工具函数
function sendResponse(res, statusCode, data, message) {
  // 直接使用原始数据，不尝试解析
  // 这样可以确保base64格式的图片数据不会被错误处理
  res.status(statusCode).json({
    code: statusCode,
    data: data || null,
    error: message || null
  });
}

module.exports = { sendResponse };