const jwt = require('jsonwebtoken');

// JWT 密钥（生产环境应从环境变量读取）
const JWT_SECRET = process.env.JWT_SECRET || 'official-template-secret-key-change-in-production';
const JWT_EXPIRES_IN = '24h';

// 生成 token
function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// 解析 token（中间件）
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ code: 401, error: '未登录或 token 无效', data: null });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, username, role }
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ code: 401, error: '登录已过期，请重新登录', data: null });
    }
    return res.status(401).json({ code: 401, error: 'token 无效', data: null });
  }
}

// 管理员权限守卫（必须在 authMiddleware 之后使用）
function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ code: 403, error: '权限不足，仅管理员可执行此操作', data: null });
  }
  next();
}

module.exports = { signToken, authMiddleware, adminOnly };
