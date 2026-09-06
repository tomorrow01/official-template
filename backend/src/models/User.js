const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, '用户名不能为空'],
    unique: true,
    trim: true,
    minlength: [3, '用户名至少 3 个字符'],
    maxlength: [30, '用户名不能超过 30 个字符']
  },
  passwordHash: {
    type: String,
    required: [true, '密码哈希不能为空']
  },
  role: {
    type: String,
    enum: ['admin', 'editor'],
    default: 'editor'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLoginAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true,
  collection: 'users'
});

// 去掉 _id 和 __v 字段（可选）
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.passwordHash;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);
