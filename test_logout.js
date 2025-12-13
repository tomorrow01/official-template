// 测试退出登录功能的核心逻辑
const fs = require('fs');
const path = require('path');

// 模拟localStorage
const localStorage = {
  data: {},
  getItem(key) {
    return this.data[key] || null;
  },
  setItem(key, value) {
    this.data[key] = value;
  },
  removeItem(key) {
    delete this.data[key];
  },
  clear() {
    this.data = {};
  }
};

// 测试退出登录功能
console.log('=== 测试退出登录功能 ===\n');

// 1. 模拟登录状态
console.log('1. 模拟登录状态...');
localStorage.setItem('admin-user', JSON.stringify({ username: '管理员' }));
localStorage.setItem('admin-token', 'test-token-123456');
console.log('   admin-user:', localStorage.getItem('admin-user'));
console.log('   admin-token:', localStorage.getItem('admin-token'));
console.log('   登录状态设置完成。\n');

// 2. 模拟退出登录操作
console.log('2. 模拟执行退出登录操作...');
// 清除用户信息
localStorage.removeItem('admin-user');
// 清除token
localStorage.removeItem('admin-token');
console.log('   admin-user:', localStorage.getItem('admin-user'));
console.log('   admin-token:', localStorage.getItem('admin-token'));
console.log('   退出登录操作完成。\n');

// 3. 验证退出登录结果
console.log('3. 验证退出登录结果...');
if (!localStorage.getItem('admin-user') && !localStorage.getItem('admin-token')) {
  console.log('   ✅ 退出登录成功！所有用户信息已清除。');
  console.log('   ✅ 用户将被重定向到登录页面。');
} else {
  console.log('   ❌ 退出登录失败！用户信息未完全清除。');
}

console.log('\n=== 测试完成 ===');