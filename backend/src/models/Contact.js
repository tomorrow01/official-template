const mongoose = require('mongoose');
const { Schema } = mongoose;

// 联系表单数据模型
const ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: /^1[3-9]\d{9}$/
  },
  subject: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 500
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// 更新时间戳的中间件
ContactSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// 导出模型
module.exports = mongoose.model('Contact', ContactSchema);