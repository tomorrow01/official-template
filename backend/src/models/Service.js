const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '服务标题为必填项'],
    trim: true
  },
  description: {
    type: String,
    required: [true, '服务描述为必填项'],
    trim: true
  },
  icon: {
    type: String,
    required: [true, '服务图标为必填项'],
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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Service', serviceSchema);