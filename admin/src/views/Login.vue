<template>
  <div class="login-container">
    <!-- 3D背景容器 -->
    <div class="login-bg">
      <div class="bg-3d-container">
        <div class="bg-3d-grid"></div>
        <div class="bg-3d-particles"></div>
        <div class="bg-3d-lights"></div>
      </div>
    </div>
    <el-card class="login-card fade-in">
      <div class="login-header">
        <div class="login-logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#409eff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        </div>
        <h2 class="login-title">管理后台登录</h2>
      </div>
      <el-form 
        ref="loginFormRef" 
        :model="form" 
        :rules="rules" 
        label-width="70px"
        class="login-form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input 
            v-model="form.username" 
            placeholder="请输入用户名" 
            :prefix-icon="User"
            size="large"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input 
            v-model="form.password" 
            type="password" 
            placeholder="请输入密码" 
            :prefix-icon="Lock"
            show-password
            size="large"
          />
        </el-form-item>
        <el-form-item>
          <el-button 
            type="primary" 
            class="login-btn" 
            @click="handleSubmit"
            size="large"
            block
          >登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue';
import { authAPI } from '../utils/api';

// 表单数据
const form = reactive({
  username: '',
  password: ''
});

// 表单引用
const loginFormRef = ref();

// 表单验证规则
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
};

// 路由
const router = useRouter();

// 登录提交函数
const handleSubmit = async () => {
  console.log('登录按钮点击，开始提交');
  console.log('表单数据:', form);
  
  // 表单验证
  if (!loginFormRef.value) {
    console.error('表单引用未找到');
    ElMessage.error('表单初始化失败');
    return;
  }
  
  try {
    const valid = await loginFormRef.value.validate();
    console.log('表单验证结果:', valid);
    
    if (valid) {
      // 调用登录API
      console.log('调用登录API:', form.username, form.password);
      const response = await authAPI.login({
        username: form.username,
        password: form.password
      });
      
      console.log('登录响应:', response);
      
      // 保存token和用户信息
      localStorage.setItem('admin-token', response.token);
      localStorage.setItem('admin-user', JSON.stringify(response.user));
      
      ElMessage.success('登录成功');
      router.push('/dashboard');
    }
  } catch (error) {
    console.error('登录过程中发生错误:', error);
    
    if (error.name === 'Error' && error.message.includes('validate')) {
      ElMessage.error('请填写完整的登录信息');
    } else if (error.response?.status === 401) {
      ElMessage.error('用户名或密码错误');
    } else {
      ElMessage.error('登录失败，请稍后重试');
    }
  }
};

// 生成3D粒子效果
onMounted(() => {
  const particlesContainer = document.querySelector('.bg-3d-particles');
  if (particlesContainer) {
    // 清除现有的::before和::after伪元素
    particlesContainer.innerHTML = '';
    
    // 创建更多粒子（30个）
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // 随机位置
      const top = Math.random() * 80 + 10; // 10% - 90%
      const left = Math.random() * 80 + 10; // 10% - 90%
      
      // 随机大小
      const size = Math.random() * 3 + 1; // 1px - 4px
      
      // 随机动画持续时间
      const duration = Math.random() * 8 + 12; // 12s - 20s
      
      // 随机延迟
      const delay = Math.random() * 10; // 0s - 10s
      
      // 随机Z轴位置
      const zIndex = Math.random() * 150 - 50; // -50px - 100px
      
      // 随机颜色（蓝色系）
      const hue = Math.random() * 30 + 180; // 180° - 210° (蓝绿色系)
      const saturation = Math.random() * 30 + 70; // 70% - 100%
      const lightness = Math.random() * 30 + 60; // 60% - 90%
      
      // 设置样式
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: hsla(${hue}, ${saturation}%, ${lightness}%, 0.9);
        box-shadow: 
          0 0 15px hsla(${hue}, ${saturation}%, ${lightness}%, 0.6),
          0 0 30px hsla(${hue}, ${saturation}%, ${lightness}%, 0.3);
        top: ${top}%;
        left: ${left}%;
        animation: particle-float ${duration}s linear infinite;
        animation-delay: ${delay}s;
        opacity: 0;
        transform: translateZ(${zIndex}px);
      `;
      
      particlesContainer.appendChild(particle);
    }
  }
});
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #0a0e17;
  position: relative;
  overflow: hidden;
  font-family: 'Arial', sans-serif;
}

/* 科技感动态背景 */
.login-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  /* 添加一些亮色的点缀 */
  box-shadow: inset 0 0 200px rgba(64, 158, 255, 0.15);
}

/* 3D背景容器 */
.bg-3d-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  perspective: 1000px;
  overflow: hidden;
}

/* 3D网格背景 */
.bg-3d-grid {
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  background-image: 
    linear-gradient(rgba(64, 158, 255, 0.2) 1px, transparent 1px),
    linear-gradient(90deg, rgba(64, 158, 255, 0.2) 1px, transparent 1px),
    linear-gradient(rgba(64, 158, 255, 0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(64, 158, 255, 0.12) 1px, transparent 1px);
  background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
  transform: translateZ(-100px) rotateX(60deg);
  animation: grid-rotate 20s linear infinite;
  /* 添加发光效果 */
  box-shadow: inset 0 0 100px rgba(64, 158, 255, 0.08);
}

/* 3D粒子效果 */
.bg-3d-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  transform-style: preserve-3d;
}

.bg-3d-particles .particle {
  position: absolute;
  border-radius: 50%;
  background: rgba(64, 158, 255, 0.8);
  box-shadow: 
    0 0 10px rgba(64, 158, 255, 0.5),
    0 0 20px rgba(64, 158, 255, 0.3);
  animation: particle-float 15s linear infinite;
  opacity: 0;
}

/* 3D灯光效果 */
.bg-3d-lights {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  perspective: 500px;
}

.bg-3d-lights::before {
  content: '';
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(64, 158, 255, 0.3) 0%, rgba(103, 194, 58, 0.2) 70%, transparent 100%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotateX(70deg) translateZ(0);
  animation: light-pulse 6s ease-in-out infinite;
  /* 添加多层光晕效果 */
  box-shadow: 
    0 0 70px rgba(64, 158, 255, 0.4),
    0 0 140px rgba(64, 158, 255, 0.2),
    inset 0 0 70px rgba(103, 194, 58, 0.15);
}

/* 添加第二个灯光效果 */
.bg-3d-lights::after {
  content: '';
  position: absolute;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 100, 150, 0.3) 0%, transparent 70%);
  top: 20%;
  left: 20%;
  transform: translateZ(50px);
  animation: light-pulse 8s ease-in-out infinite reverse;
  animation-delay: 2s;
  box-shadow: 
    0 0 50px rgba(255, 100, 150, 0.4),
    0 0 100px rgba(255, 100, 150, 0.2);
}

/* 3D网格旋转动画 */
@keyframes grid-rotate {
  0% {
    transform: translateZ(-100px) rotateX(60deg) rotateZ(0deg);
  }
  100% {
    transform: translateZ(-100px) rotateX(60deg) rotateZ(360deg);
  }
}

/* 粒子漂浮动画 */
@keyframes particle-float {
  0% {
    transform: translate(0, 0) translateZ(0);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translate(calc(300px - 600px * 0.5), calc(300px - 600px * 0.5)) translateZ(150px);
    opacity: 0;
  }
}

/* 灯光脉冲动画 */
@keyframes light-pulse {
  0%, 100% {
    transform: translate(-50%, -50%) rotateX(70deg) translateZ(0) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translate(-50%, -50%) rotateX(70deg) translateZ(50px) scale(2);
    opacity: 1;
  }
}

/* 登录卡片 */
.login-card {
  width: 420px;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 
    0 0 30px rgba(64, 158, 255, 0.2),
    0 10px 40px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  background-color: rgba(20, 25, 35, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(64, 158, 255, 0.3);
  z-index: 1;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

/* 卡片悬浮效果 */
.login-card:hover {
  box-shadow: 
    0 0 50px rgba(64, 158, 255, 0.3),
    0 15px 50px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  transform: translateY(-5px);
}

/* 卡片头部装饰 */
.login-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #409eff 0%, #67c23a 100%);
}

/* 登录头部 */
.login-header {
  text-align: center;
  margin-bottom: 30px;
}

/* 登录Logo */
.login-logo {
  margin: 0 auto 20px;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.2) 0%, rgba(103, 194, 58, 0.2) 100%);
  box-shadow: 
    0 0 20px rgba(64, 158, 255, 0.3),
    inset 0 0 20px rgba(64, 158, 255, 0.1);
  animation: logo-pulse 2s ease-in-out infinite;
}

/* Logo脉冲动画 */
@keyframes logo-pulse {
  0%, 100% {
    box-shadow: 
      0 0 20px rgba(64, 158, 255, 0.3),
      inset 0 0 20px rgba(64, 158, 255, 0.1);
  }
  50% {
    box-shadow: 
      0 0 30px rgba(64, 158, 255, 0.5),
      inset 0 0 30px rgba(64, 158, 255, 0.2);
  }
}

/* 登录标题 */
.login-title {
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  text-shadow: 0 0 10px rgba(64, 158, 255, 0.5);
  letter-spacing: 1px;
}

/* 登录表单 */
.login-form {
  margin-top: 20px;
}

/* 表单标签 */
:deep(.el-form-item__label) {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

/* 输入框 */
:deep(.el-input) {
  margin-bottom: 5px;
}

:deep(.el-input__wrapper) {
  border-radius: 8px;
  height: 48px;
  background-color: rgba(25, 30, 40, 0.9) !important;
  border: 1px solid rgba(64, 158, 255, 0.3) !important;
  transition: all 0.3s ease;
  box-shadow: none !important;
  /* 覆盖Chrome默认的输入框样式 */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

:deep(.el-input__wrapper:hover) {
  border-color: rgba(64, 158, 255, 0.6) !important;
  box-shadow: 0 0 15px rgba(64, 158, 255, 0.2) !important;
}

:deep(.el-input__wrapper.is-focus) {
  border-color: rgba(64, 158, 255, 0.8) !important;
  box-shadow: 0 0 20px rgba(64, 158, 255, 0.4) !important;
}

:deep(.el-input__wrapper.is-filled) {
  background-color: rgba(25, 30, 40, 0.9) !important;
}

:deep(.el-input__inner) {
  height: 48px;
  line-height: 48px;
  font-size: 14px;
  color: #ffffff !important;
  background-color: transparent !important;
  box-shadow: none !important;
  /* 覆盖Chrome默认的输入框样式 */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

/* Chrome自动填充样式覆盖 */
:deep(.el-input__inner):-webkit-autofill,
:deep(.el-input__inner):-webkit-autofill:hover,
:deep(.el-input__inner):-webkit-autofill:focus,
:deep(.el-input__inner):-webkit-autofill:active {
  -webkit-background-clip: text;
  -webkit-text-fill-color: #ffffff !important;
  /* 透明背景 */
  -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
  background-color: transparent !important;
  background-image: none !important;
  transition: background-color 5000s ease-in-out 0s !important;
}

/* 确保填充状态下的输入框也保持透明背景 */
:deep(.el-input__inner).el-input__inner--autofilled {
  background-color: transparent !important;
}

/* 输入框占位符 */
:deep(.el-input__inner::placeholder) {
  color: rgba(255, 255, 255, 0.4) !important;
}

/* 确保所有状态下的输入框容器背景一致 */
:deep(.el-input__wrapper),
:deep(.el-input__wrapper *) {
  background-color: rgba(25, 30, 40, 0.9) !important;
}

/* 输入框前缀图标 */
:deep(.el-input__prefix-inner svg) {
  color: rgba(64, 158, 255, 0.7) !important;
}

/* 密码可见性切换按钮 */
:deep(.el-input__suffix-inner .el-input__password .el-icon) {
  color: rgba(255, 255, 255, 0.5) !important;
}

:deep(.el-input__suffix-inner .el-input__password:hover .el-icon) {
  color: rgba(64, 158, 255, 0.8) !important;
}

/* 登录按钮 */
.login-btn {
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  background: linear-gradient(135deg, #409eff 0%, #67c23a 100%);
  border: none;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  box-shadow: 
    0 4px 15px rgba(64, 158, 255, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.login-btn:hover {
  background: linear-gradient(135deg, #66b1ff 0%, #85ce61 100%);
  transform: translateY(-2px);
  box-shadow: 
    0 8px 25px rgba(64, 158, 255, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.login-btn:active {
  transform: translateY(0);
  box-shadow: 
    0 4px 12px rgba(64, 158, 255, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* 按钮加载动画 */
:deep(.el-button--loading) {
  background: linear-gradient(135deg, #409eff 0%, #67c23a 100%) !important;
  animation: button-loading 1s ease-in-out infinite;
}

@keyframes button-loading {
  0% {
    box-shadow: 
      0 4px 15px rgba(64, 158, 255, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
  50% {
    box-shadow: 
      0 4px 25px rgba(64, 158, 255, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
  100% {
    box-shadow: 
      0 4px 15px rgba(64, 158, 255, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
}

/* 动画效果 */
.fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 480px) {
  .login-card {
    width: 90%;
    padding: 30px 25px;
    margin: 0 10px;
    backdrop-filter: blur(5px); /* 减少模糊效果以提高性能 */
  }
  
  .login-title {
    font-size: 20px;
    letter-spacing: 0.5px;
  }
  
  .login-logo {
    width: 70px;
    height: 70px;
  }
  
  /* 简化移动设备上的背景效果以提高性能 */
  .login-bg::before {
    background-size: 30px 30px; /* 减小网格大小 */
  }
  
  .login-bg::after {
    display: none; /* 在移动设备上禁用光效动画以提高性能 */
  }
}
</style>