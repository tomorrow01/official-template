const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { sendResponse } = require('../utils/response');

// 确保uploads目录存在
const fs = require('fs');
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// 配置multer存储
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// 创建上传实例
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB文件大小限制
  },
  fileFilter: function (req, file, cb) {
    // 只允许上传图片文件
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('只允许上传图片文件（jpeg, jpg, png, gif, webp）'));
    }
  }
});

// 单个文件上传路由
router.post('/single', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return sendResponse(res, 400, null, '请选择要上传的文件');
    }

    // 返回文件信息
    const fileInfo = {
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      url: `/uploads/${req.file.filename}` // 前端访问URL
    };

    sendResponse(res, 200, fileInfo, '文件上传成功');
  } catch (err) {
    console.error('文件上传失败:', err);
    sendResponse(res, 500, null, `文件上传失败：${err.message}`);
  }
});

// 多个文件上传路由
router.post('/multiple', upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return sendResponse(res, 400, null, '请选择要上传的文件');
    }

    // 返回多个文件信息
    const filesInfo = req.files.map(file => ({
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path,
      url: `/uploads/${file.filename}`
    }));

    sendResponse(res, 200, filesInfo, '文件上传成功');
  } catch (err) {
    console.error('文件上传失败:', err);
    sendResponse(res, 500, null, `文件上传失败：${err.message}`);
  }
});

module.exports = router;
