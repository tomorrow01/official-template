const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
    trim: true
  },
  imageUrl: {
    type: String,
    required: [true, '轮播图图片URL为必填项'],
    trim: true
  },
  link: {
    type: String,
    required: false,
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

module.exports = mongoose.model('Banner', bannerSchema);