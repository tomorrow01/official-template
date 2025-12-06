const mongoose = require('mongoose');

// 定义配置项的Schema
const configSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  value: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
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

// 创建模型
const Config = mongoose.model('Config', configSchema);

module.exports = Config;