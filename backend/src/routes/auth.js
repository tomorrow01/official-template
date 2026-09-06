const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { signToken, authMiddleware } = require('../middleware/auth');

// POST /api/auth/login —— 登录
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ code: 400, error: '用户名和密码不能为空', data: null });
    }

    const user = await User.findOne({ username }).select('+passwordHash');
    if (!user) {
      // 统一返回"用户名或密码错误"，避免探测用户名
      return res.status(401).json({ code: 401, error: '用户名或密码错误', data: null });
    }

    if (!user.isActive) {
      return res.status(403).json({ code: 403, error: '该账号已被停用，请联系管理员', data: null });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ code: 401, error: '用户名或密码错误', data: null });
    }

    // 更新最后登录时间
    user.lastLoginAt = new Date();
    await user.save();

    const token = signToken({ id: user._id, username: user.username, role: user.role });

    // toJSON 会自动去掉 passwordHash
    res.json({
      code: 200,
      data: {
        token,
        user: user.toJSON()
      },
      error: null
    });
  } catch (err) {
    console.error('登录错误:', err);
    res.status(500).json({ code: 500, error: '服务器内部错误', data: null });
  }
});

// GET /api/auth/me —— 验证 token 并返回当前用户信息
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ code: 404, error: '用户不存在', data: null });
    }
    res.json({ code: 200, data: user.toJSON(), error: null });
  } catch (err) {
    res.status(500).json({ code: 500, error: '服务器内部错误', data: null });
  }
});

// POST /api/auth/change-password —— 修改当前登录用户密码
router.post('/change-password', authMiddleware, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ code: 400, error: '旧密码和新密码不能为空', data: null });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ code: 400, error: '新密码至少 6 个字符', data: null });
    }

    const user = await User.findById(req.user.id).select('+passwordHash');
    if (!user) {
      return res.status(404).json({ code: 404, error: '用户不存在', data: null });
    }

    const match = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!match) {
      return res.status(400).json({ code: 400, error: '旧密码错误', data: null });
    }

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ code: 200, data: null, error: '密码修改成功' });
  } catch (err) {
    console.error('改密错误:', err);
    res.status(500).json({ code: 500, error: '服务器内部错误', data: null });
  }
});

module.exports = router;
