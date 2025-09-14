// 统一响应格式工具函数
function sendResponse(res, statusCode, data, message) {
  // 只有当data是字符串时才尝试解析
  let parsedData = data;
  if (typeof data === 'string' && data) {
    try {
      parsedData = JSON.parse(data);
    } catch (e) {
      // 如果解析失败，保持原始字符串
      parsedData = data;
    }
  }
  
  res.status(statusCode).json({
    code: statusCode,
    data: parsedData || null,
    error: message || null
  });
}

module.exports = { sendResponse };