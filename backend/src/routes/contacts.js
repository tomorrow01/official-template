const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { sendResponse } = require('../utils/response');

console.log('Contacts router loaded successfully');

// 获取联系表单列表（管理员功能）
router.get('/', async (req, res) => {
  try {
    console.log('收到contacts GET请求！参数:', req.query);
    
    // 获取分页参数
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;
    
    // 构建查询条件
    const query = {};
    
    // 添加搜索条件
    if (req.query.query) {
      query.$or = [
        { name: { $regex: req.query.query, $options: 'i' } },
        { email: { $regex: req.query.query, $options: 'i' } },
        { subject: { $regex: req.query.query, $options: 'i' } }
      ];
    }
    
    // 添加状态过滤
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    // 添加日期范围过滤
    if (req.query.startDate && req.query.endDate) {
      query.createdAt = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(new Date(req.query.endDate).setHours(23, 59, 59, 999))
      };
    }
    
    // 查询数据
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);
    
    // 获取总数
    const total = await Contact.countDocuments(query);
    
    // 构建返回数据
    const result = {
      code: 200,
      data: {
        list: contacts,
        total,
        page,
        pageSize,
        pages: Math.ceil(total / pageSize)
      },
      message: '获取联系表单列表成功'
    };
    
    res.json(result);
  } catch (error) {
    console.error('获取联系表单列表失败:', error);
    sendResponse(res, 500, '服务器内部错误', null);
  }
});

// 获取单个联系表单详情（管理员功能）
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return sendResponse(res, 404, '联系表单不存在', null);
    }
    
    sendResponse(res, 200, contact, '获取联系表单详情成功');
  } catch (error) {
    console.error('获取联系表单详情失败:', error);
    sendResponse(res, 500, '服务器内部错误', null);
  }
});

// 前端提交联系表单
router.post('/', async (req, res) => {
  try {
    // 从请求体中获取数据，支持content字段（前端使用）
    const { name, email, phone, subject, content, message } = req.body;
    
    // 创建新的联系表单记录，优先使用content字段，兼容message字段
    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      message: content || message // 使用content字段的值赋给message字段
    });
    
    // 保存到数据库
    await contact.save();
    
    sendResponse(res, 200, contact, '表单提交成功，我们将尽快与您联系');
  } catch (error) {
    console.error('提交联系表单失败:', error);
    // 如果是验证错误，返回更具体的错误信息
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return sendResponse(res, 400, errors.join(', '), null);
    }
    sendResponse(res, 500, '服务器内部错误', null);
  }
});

// 更新联系表单状态（管理员功能）
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    
    // 验证状态值
    const validStatuses = ['pending', 'processing', 'completed'];
    if (!validStatuses.includes(status)) {
      return sendResponse(res, 400, '无效的状态值', null);
    }
    
    // 更新状态
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!contact) {
      return sendResponse(res, 404, '联系表单不存在', null);
    }
    
    sendResponse(res, 200, contact, '更新状态成功');
  } catch (error) {
    console.error('更新联系表单状态失败:', error);
    sendResponse(res, 500, '服务器内部错误', null);
  }
});

// 删除联系表单（管理员功能）
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return sendResponse(res, 404, '联系表单不存在', null);
    }
    
    sendResponse(res, 200, null, '删除联系表单成功');
  } catch (error) {
    console.error('删除联系表单失败:', error);
    sendResponse(res, 500, '服务器内部错误', null);
  }
});

module.exports = router;