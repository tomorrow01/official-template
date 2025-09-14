const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '文章标题为必填项'],
    trim: true
  },
  content: {
    type: String,
    required: [true, '文章内容为必填项'],
    trim: true
  },
  image: {
    type: String,
    required: [true, '文章图片为必填项'],
    trim: true
  },
  order: {
    type: Number,
    default: 0,
    min: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createTime: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Article', articleSchema);