<template>
  <div class="login-container">
    <!-- 背景水波层 -->
    <div class="waves-wrapper" aria-hidden="true">
      <svg class="wave wave-1" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path d="M0,192L48,181.3C96,171,192,149,288,144C384,139,480,149,576,165.3C672,181,768,203,864,208C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L0,320Z" fill="rgba(255,255,255,0.18)"></path>
      </svg>
      <svg class="wave wave-2" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path d="M0,256L60,240C120,224,240,192,360,186.7C480,181,600,203,720,218.7C840,235,960,245,1080,234.7C1200,224,1320,192,1380,176L1440,160L1440,320L0,320Z" fill="rgba(255,255,255,0.12)"></path>
      </svg>
      <svg class="wave wave-3" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path d="M0,224L80,213.3C160,203,320,181,480,186.7C640,192,800,224,960,234.7C1120,245,1280,235,1360,229.3L1440,224L1440,320L0,320Z" fill="rgba(255,255,255,0.07)"></path>
      </svg>
    </div>

    <!-- 装饰小圆点 -->
    <div class="bg-deco" aria-hidden="true">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>

    <!-- 登录卡片 -->
    <el-card class="login-card">
      <h2 class="login-title">管理后台登录</h2>
      <el-form 
        ref="loginForm" 
        :model="form" 
        :rules="rules" 
        label-width="80px"
        @submit.prevent="handleSubmit"
      >
        <el-form-item label="用户名" prop="username">
          <el-input 
            v-model="form.username" 
            placeholder="请输入用户名" 
            :disabled="loading"
            @keyup.enter="handleSubmit"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input 
            v-model="form.password" 
            type="password" 
            placeholder="请输入密码" 
            show-password
            :disabled="loading"
            @keyup.enter="handleSubmit"
          />
        </el-form-item>
        <el-form-item>
          <el-button 
            type="primary" 
            native-type="submit" 
            class="login-btn"
            :loading="loading"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import { authAPI, setToken, setCurrentUser } from '../utils/api';

const router = useRouter();
const route = useRoute();

const form = ref({
  username: '',
  password: ''
});

const rules = ref({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少 6 个字符', trigger: 'blur' }
  ]
});

const loginForm = ref(null);
const loading = ref(false);

const handleSubmit = async () => {
  if (!loginForm.value) return;
  await loginForm.value.validate(async (valid) => {
    if (!valid) return;

    loading.value = true;
    try {
      const res = await authAPI.login(form.value.username, form.value.password);
      setToken(res.data.token);
      setCurrentUser(res.data.user);
      ElMessage.success('登录成功');
      const redirect = route.query.redirect || '/dashboard';
      router.replace(redirect);
    } catch (err) {
      // 错误已经在 axios 拦截器里处理并弹 ElMessage 了
    } finally {
      loading.value = false;
    }
  });
};
</script>

<style scoped>
/* ========== 容器 ========== */
.login-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  background: linear-gradient(135deg, #0f2027 0%, #203a43 30%, #2c5364 60%, #1e90ff 100%);
  padding: 10px;
}

/* ========== 装饰 blob ========== */
.bg-deco {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.45;
}

.blob-1 {
  width: 340px;
  height: 340px;
  background: #00d2ff;
  top: -80px;
  left: -80px;
  animation: blob-float 12s ease-in-out infinite;
}

.blob-2 {
  width: 280px;
  height: 280px;
  background: #9370db;
  bottom: 120px;
  right: -60px;
  animation: blob-float 14s ease-in-out infinite reverse;
}

.blob-3 {
  width: 200px;
  height: 200px;
  background: #3a7bd5;
  top: 45%;
  left: 35%;
  animation: blob-float 10s ease-in-out infinite;
}

@keyframes blob-float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%      { transform: translate(40px, -30px) scale(1.08); }
  66%      { transform: translate(-30px, 40px) scale(0.95); }
}

/* ========== 水波层 ========== */
.waves-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 45%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.wave {
  position: absolute;
  bottom: 0;
  left: -10%;
  width: 120%;
  height: 100%;
  will-change: transform;
}

.wave-1 {
  animation: wave-move 12s linear infinite;
}

.wave-2 {
  animation: wave-move 18s linear infinite reverse;
}

.wave-3 {
  animation: wave-move 24s linear infinite;
}

@keyframes wave-move {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-8.3333%); }
}

/* ========== 登录卡片 ========== */
.login-card {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 440px;
  padding: 44px 30px 36px;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 16px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.25),
    0 2px 10px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.login-title {
  text-align: center;
  margin-bottom: 32px;
  font-size: 24px;
  color: #1890ff;
  font-weight: 700;
  letter-spacing: 1px;
}

.login-title::before {
  content: '';
  display: inline-block;
  width: 32px;
  height: 32px;
  margin-right: 10px;
  vertical-align: middle;
  background: linear-gradient(135deg, #1e90ff, #00d2ff);
  border-radius: 8px;
  transform: translateY(-2px);
}

.el-input {
  height: 44px;
  font-size: 15px;
}

.login-btn {
  width: 100%;
  height: 44px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 2px;
  background: linear-gradient(135deg, #1e90ff, #00bfff);
  border: none;
  border-radius: 22px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.login-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(30, 144, 255, 0.45);
}

/* ========== 小屏适配 ========== */
@media (max-width: 480px) {
  .login-card {
    padding: 32px 20px 28px;
    border-radius: 14px;
  }
  .login-title {
    font-size: 20px;
    margin-bottom: 26px;
  }
  .blob { filter: blur(60px); }
  .waves-wrapper { height: 35%; }
}

/* ========== 无障碍：尊重用户的减弱动画偏好 ========== */
@media (prefers-reduced-motion: reduce) {
  .wave-1, .wave-2, .wave-3,
  .blob-1, .blob-2, .blob-3 {
    animation: none !important;
  }
}
</style>
