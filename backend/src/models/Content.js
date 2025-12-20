const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '内容标题为必填项'],
    trim: true
  },
  content: {
    type: String,
    required: [true, '内容正文为必填项'],
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
    trim: true,
    enum: ['发布', '草稿']
  },
  sort: {
    type: Number,
    default: 0,
    min: 0
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
});

module.exports = mongoose.model('Content', contentSchema);