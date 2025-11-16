const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '内容标题为必填项'],
    trim: true
  },
  type: {
    type: String,
    required: [true, '内容类型为必填项'],
    trim: true
  },
  status: {
    type: String,
    required: [true, '内容状态为必填项'],
    trim: true
  },
  content: {
    type: String,
    required: [true, '内容详情为必填项'],
    trim: true
  },
  sort: {
    type: Number,
    default: 0,
    min: 0
  },
  updateTime: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Content', contentSchema);