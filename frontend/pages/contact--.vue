<template>
  <div class="contact-page">
    <Navbar />
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">联系我们</h1>
        <p class="page-subtitle">无论您有任何问题或需求，都可以通过以下方式与我们联系</p>
      </div>
    </div>
    
    <!-- 联系信息和表单 -->
    <div class="contact-section">
      <div class="container">
        <div class="contact-content">
          <!-- 联系信息 -->
          <div class="contact-info">
            <h2 class="section-title">联系方式</h2>
            <div class="contact-items">
              <div class="contact-item">
                <div class="contact-icon">
                  <el-icon><Location /></el-icon>
                </div>
                <div class="contact-text">
                  <h3>公司地址</h3>
                  <p>上海市浦东新区张江高科技园区科苑路88号</p>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon">
                  <el-icon><Phone /></el-icon>
                </div>
                <div class="contact-text">
                  <h3>联系电话</h3>
                  <p>400-123-4567</p>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon">
                  <el-icon><Message /></el-icon>
                </div>
                <div class="contact-text">
                  <h3>电子邮箱</h3>
                  <p>contact@example.com</p>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon">
                  <el-icon><Clock /></el-icon>
                </div>
                <div class="contact-text">
                  <h3>工作时间</h3>
                  <p>周一至周五 9:00-18:00</p>
                </div>
              </div>
            </div>
            
            <!-- 社交媒体 -->
            <div class="social-media">
              <h3>关注我们</h3>
              <div class="social-icons">
                <el-button type="default" icon="ElIcon" circle>
                  <el-icon><Message /></el-icon>
                </el-button>
                <el-button type="default" icon="ElIcon" circle>
                  <el-icon><Message /></el-icon>
                </el-button>
                <el-button type="default" icon="ElIcon" circle>
                  <el-icon><Message /></el-icon>
                </el-button>
                <el-button type="default" icon="ElIcon" circle>
                  <el-icon><Message /></el-icon>
                </el-button>
              </div>
            </div>
          </div>
          
          <!-- 联系表单 -->
          <div class="contact-form">
            <h2 class="section-title">发送消息</h2>
            <el-form ref="formRef" :model="formData" :rules="formRules" label-width="80px">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="formData.name" placeholder="请输入您的姓名" />
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="formData.email" placeholder="请输入您的邮箱" />
              </el-form-item>
              <el-form-item label="电话" prop="phone">
                <el-input v-model="formData.phone" placeholder="请输入您的联系电话" />
              </el-form-item>
              <el-form-item label="主题" prop="subject">
                <el-input v-model="formData.subject" placeholder="请输入消息主题" />
              </el-form-item>
              <el-form-item label="内容" prop="content">
                <el-input
                  v-model="formData.content"
                  type="textarea"
                  placeholder="请输入您的消息内容"
                  :rows="5"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm" :loading="submitting">
                  提交
                </el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 地图 -->
    <div class="map-section">
      <div class="map-container">
        <!-- 这里可以嵌入实际的地图组件，目前使用占位图 -->
        <img src="/images/banner1.jpg" alt="公司位置地图" class="map-image">
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { Location, Phone, Message, Clock } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import Footer from '@/components/Footer.vue';
import Navbar from '@/components/Navbar.vue';
import contactService from '@/api/contacts';

// 表单数据
const formData = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  content: ''
});

// 表单验证规则
const formRules = {
  name: [
    { required: true, message: '请输入您的姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '姓名长度在 2 到 20 个字符之间', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入您的邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入您的联系电话', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码', trigger: 'blur' }
  ],
  subject: [
    { required: true, message: '请输入消息主题', trigger: 'blur' },
    { min: 2, max: 50, message: '主题长度在 2 到 50 个字符之间', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入消息内容', trigger: 'blur' },
    { min: 10, max: 500, message: '内容长度在 10 到 500 个字符之间', trigger: 'blur' }
  ]
};

const formRef = ref();
const submitting = ref(false);

// 提交表单
  const submitForm = async () => {
    if (!formRef.value) return;
    
    try {
      await formRef.value.validate();
      submitting.value = true;
      
      // 调用API提交表单
      await contactService.submitContactForm(formData);
      
      // 成功提示
      ElMessage.success('消息提交成功，我们会尽快与您联系！');
      
      // 移除自动重置表单的逻辑，保留表单数据
    } catch (error) {
      // 失败提示
      ElMessage.error('消息提交失败，请稍后重试');
      console.error('表单提交错误:', error);
    } finally {
      submitting.value = false;
    }
  };

// 重置表单
const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields();
  }
};
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-header {
  background: linear-gradient(135deg, #3a86ff 0%, #8338ec 100%);
  color: white;
  padding: 60px 0;
  text-align: center;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 10px;
  font-weight: 700;
}

.page-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.contact-section {
  padding: 60px 0;
  background-color: #f8f9fa;
}

.contact-content {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}

.contact-info {
  flex: 1;
  min-width: 300px;
}

.contact-form {
  flex: 1;
  min-width: 300px;
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
  font-weight: 600;
}

.contact-items {
  margin-bottom: 30px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.contact-icon {
  background: #3a86ff;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  flex-shrink: 0;
}

.contact-text h3 {
  font-size: 1.1rem;
  margin-bottom: 5px;
  color: #333;
}

.contact-text p {
  color: #666;
  margin: 0;
}

.social-media {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.social-media h3 {
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: #333;
}

.social-icons {
  display: flex;
  gap: 10px;
}

.el-form {
  width: 100%;
}

.el-form-item {
  margin-bottom: 20px;
}

.map-section {
  background-color: #e9ecef;
  padding: 40px 0;
}

.map-container {
  max-width: 1200px;
  margin: 0 auto;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.map-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .contact-content {
    flex-direction: column;
  }
  
  .contact-info,
  .contact-form {
    width: 100%;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .page-subtitle {
    font-size: 1rem;
  }
  
  .map-container {
    height: 300px;
  }
}
</style>