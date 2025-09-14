const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '案例标题为必填项'],
    trim: true
  },
  description: {
    type: String,
    required: [true, '案例描述为必填项'],
    trim: true
  },
  image: {
    type: String,
    required: [true, '案例图片为必填项'],
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

module.exports = mongoose.model('Case', caseSchema);