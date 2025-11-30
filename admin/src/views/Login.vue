<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="login-title">管理后台登录</h2>
      <el-form 
        ref="loginForm" 
        :model="form" 
        :rules="rules" 
        label-width="80px"
        @submit="handleSubmit"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" class="login-btn">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

// 修复：初始化 form 对象，包含 username 和 password 字段（空字符串）
const form = ref({
  username: '',  // 新增：确保 username 初始化为空字符串
  password: ''   // 新增：确保 password 初始化为空字符串
});

const rules = ref({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
});

const router = useRouter();

const handleSubmit = () => {
  // 模拟登录成功后跳转（实际需调用接口验证）
  if (form.value.username === 'admin' && form.value.password === '123456') {
    // 保存用户信息到localStorage
    const userInfo = {
      username: form.value.username,
      loginTime: new Date().toLocaleString()
    };
    localStorage.setItem('admin-user', JSON.stringify(userInfo));
    
    ElMessage.success('登录成功');
    router.push('/dashboard');  // 跳转到dashboard根路径，会触发默认重定向到配置管理页
  } else {
    ElMessage.error('用户名或密码错误');
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #1e90ff, #9370db);
  padding: 10px; 
}

.login-card {
  width: 100%;
  max-width: 600px; /* 增大 PC 端卡片最大宽度（原 500px） */
  padding: 40px 30px; /* 增大内边距（原 35px 25px） */
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.login-title {
  text-align: center;
  margin-bottom: 30px; /* 增大标题底部间距 */
  font-size: 24px; /* 增大标题字号（原 22px） */
  color: #1890ff;
  font-weight: 600;
}

/* 输入框样式调整 */
.el-input {
  height: 48px; /* 增大输入框高度 */
  font-size: 16px; /* 增大输入框字体 */
}

.el-input__wrapper {
  padding: 0 16px; /* 增大输入框内边距 */
}

/* 登录按钮样式调整 */
.login-btn {
  height: 48px; /* 增大按钮高度 */
  font-size: 16px; /* 增大按钮字体 */
}

/* 小屏幕适配（小于 480px，如手机竖屏） */
@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px; 
    max-width: 95%; 
  }
  
  .login-title {
    font-size: 22px; 
  }
  
  .el-form-item {
    label-width: 70px !important; /* 适当调大标签宽度 */
  }
  
  .el-input {
    width: calc(100% - 70px); /* 适配标签宽度 */
    height: 44px; /* 小屏幕输入框稍小 */
  }
}

/* 中等屏幕适配（480px-768px，如平板/手机横屏） */
@media (min-width: 480px) and (max-width: 768px) {
  .login-card {
    max-width: 85%; 
    padding: 35px 25px;
  }
  
  .login-title {
    font-size: 24px;
  }
}
</style>