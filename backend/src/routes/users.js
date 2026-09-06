const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { authMiddleware, adminOnly } = require('../middleware/auth');

// 所有用户管理接口都需要登录 + admin 权限
router.use(authMiddleware, adminOnly);

// GET /api/users —— 用户列表
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ code: 200, data: users, error: null });
  } catch (err) {
    console.error('获取用户列表错误:', err);
    res.status(500).json({ code: 500, error: '服务器内部错误', data: null });
  }
});

// POST /api/users —— 新增用户
router.post('/', async (req, res) => {
  try {
    const { username, password, role, isActive } = req.body;
    if (!username || !password) {
      return res.status(400).json({ code: 400, error: '用户名和密码不能为空', data: null });
    }
    if (password.length < 6) {
      return res.status(400).json({ code: 400, error: '密码至少 6 个字符', data: null });
    }

    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(400).json({ code: 400, error: '用户名已存在', data: null });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      passwordHash: hash,
      role: role === 'admin' ? 'admin' : 'editor',
      isActive: isActive !== false
    });

    res.status(201).json({ code: 200, data: user.toJSON(), error: null });
  } catch (err) {
    console.error('新增用户错误:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ code: 400, error: err.message, data: null });
    }
    res.status(500).json({ code: 500, error: '服务器内部错误', data: null });
  }
});

// PUT /api/users/:id —— 编辑用户（不能改密码，密码走单独接口）
router.put('/:id', async (req, res) => {
  try {
    const { role, isActive } = req.body;
    const updateData = {};
    if (role !== undefined) updateData.role = role === 'admin' ? 'admin' : 'editor';
    if (isActive !== undefined) updateData.isActive = !!isActive;

    // 防止停用/删除最后一个 admin
    if (updateData.isActive === false || updateData.role === 'editor') {
      const target = await User.findById(req.params.id);
      if (target && target.role === 'admin') {
        const adminCount = await User.countDocuments({ role: 'admin', isActive: true });
        if (adminCount <= 1) {
          return res.status(400).json({ code: 400, error: '不能停用或降级最后一个管理员', data: null });
        }
      }
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!user) {
      return res.status(404).json({ code: 404, error: '用户不存在', data: null });
    }
    res.json({ code: 200, data: user.toJSON(), error: null });
  } catch (err) {
    console.error('编辑用户错误:', err);
    res.status(500).json({ code: 500, error: '服务器内部错误', data: null });
  }
});

// DELETE /api/users/:id —— 删除用户
router.delete('/:id', async (req, res) => {
  try {
    // 不能删自己
    if (req.user.id === req.params.id) {
      return res.status(400).json({ code: 400, error: '不能删除自己的账号', data: null });
    }

    const target = await User.findById(req.params.id);
    if (!target) {
      return res.status(404).json({ code: 404, error: '用户不存在', data: null });
    }

    // 防止删最后一个 admin
    if (target.role === 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin' });
      if (adminCount <= 1) {
        return res.status(400).json({ code: 400, error: '不能删除最后一个管理员', data: null });
      }
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ code: 200, data: null, error: '用户已删除' });
  } catch (err) {
    console.error('删除用户错误:', err);
    res.status(500).json({ code: 500, error: '服务器内部错误', data: null });
  }
});

// PUT /api/users/:id/reset-password —— 重置用户密码
router.put('/:id/reset-password', async (req, res) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ code: 400, error: '新密码至少 6 个字符', data: null });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ code: 404, error: '用户不存在', data: null });
    }

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ code: 200, data: null, error: '密码重置成功' });
  } catch (err) {
    console.error('重置密码错误:', err);
    res.status(500).json({ code: 500, error: '服务器内部错误', data: null });
  }
});

module.exports = router;
