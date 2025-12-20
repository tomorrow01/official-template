const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({  username: {    type: String,    required: [true, '用户名为必填项'],    unique: true,    trim: true  },  password: {    type: String,    required: [true, '密码为必填项'],    minlength: [6, '密码长度不能少于6位']  },  role: {    type: String,    default: 'admin',    enum: ['admin', 'editor']  },  avatar: {    type: String,    default: '',    trim: true  },  createTime: {    type: Date,    default: Date.now  },  updateTime: {    type: Date,    default: Date.now  }});

// 密码加密中间件
userSchema.pre('save', async function(next) {
  // 只有当密码被修改或新用户创建时才加密
  if (!this.isModified('password')) return next();
  
  try {
    // 生成10位盐值
    const salt = await bcrypt.genSalt(10);
    // 加密密码
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// 验证密码方法
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

module.exports = mongoose.model('User', userSchema);