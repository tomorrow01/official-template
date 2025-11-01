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
  author: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  sort: {
    type: Number,
    default: 0,
    min: 0
  },
  status: {
    type: Boolean,
    default: true
  },
  createTime: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Article', articleSchema);