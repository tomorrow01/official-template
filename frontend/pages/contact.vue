<template>
  <div class="contact-page">
    <!-- 导航栏 -->
    <Navbar />
    <!-- 页面标题 Banner -->
    <div class="page-header">
      <div class="container">
        <h1>联系我们</h1>
        <p>无论您有任何问题或需求，我们都期待与您沟通</p>
      </div>
    </div>
    
    <!-- 联系信息和表单容器 -->
    <div class="contact-content">
      <!-- 联系信息部分 -->
      <div class="contact-info">
        <h2>联系方式</h2>
        <ul>
          <li>
            <i class="icon-location">📍</i>
            <span>公司地址：北京市朝阳区建国路88号</span>
          </li>
          <li>
            <i class="icon-phone">📞</i>
            <span>联系电话：010-12345678</span>
          </li>
          <li>
            <i class="icon-email">✉️</i>
            <span>电子邮箱：contact@example.com</span>
          </li>
          <li>
            <i class="icon-time">⏰</i>
            <span>工作时间：周一至周五 9:00-18:00</span>
          </li>
        </ul>
        
        <!-- 社交媒体 -->
        <div class="social-media">
          <h3>关注我们</h3>
          <a href="#" class="social-icon" style="background-color: #1890ff;">微博</a>
          <a href="#" class="social-icon" style="background-color: #52c41a;">微信</a>
          <a href="#" class="social-icon" style="background-color: #fa8c16;">抖音</a>
          <a href="#" class="social-icon" style="background-color: #eb2f96;">小红书</a>
        </div>
      </div>
      
      <!-- 联系表单部分 - 极简结构 -->
      <div id="contact-form-container">
        <h2>发送消息</h2>
        <form id="contact-form" @submit.prevent="submitForm">
          <div class="form-group">
            <label>姓名 <span class="required">*</span></label>
            <input 
              v-model="formData.name" 
              type="text" 
              placeholder="请输入您的姓名"
              :class="{ 'error': formErrors.name }"
            >
            <span v-if="formErrors.name" class="error-message">{{ formErrors.name }}</span>
          </div>
          
          <div class="form-group">
            <label>邮箱 <span class="required">*</span></label>
            <input 
              v-model="formData.email" 
              type="email" 
              placeholder="请输入您的邮箱"
              :class="{ 'error': formErrors.email }"
            >
            <span v-if="formErrors.email" class="error-message">{{ formErrors.email }}</span>
          </div>
          
          <div class="form-group">
            <label>电话</label>
            <input 
              v-model="formData.phone" 
              type="tel" 
              placeholder="请输入您的联系电话"
              :class="{ 'error': formErrors.phone }"
            >
            <span v-if="formErrors.phone" class="error-message">{{ formErrors.phone }}</span>
          </div>
          
          <div class="form-group">
            <label>主题</label>
            <input 
              v-model="formData.subject" 
              type="text" 
              placeholder="请输入消息主题"
              :class="{ 'error': formErrors.subject }"
            >
            <span v-if="formErrors.subject" class="error-message">{{ formErrors.subject }}</span>
          </div>
          
          <div class="form-group">
            <label>内容 <span class="required">*</span></label>
            <textarea 
              v-model="formData.content" 
              placeholder="请输入您的留言内容"
              rows="5"
              :class="{ 'error': formErrors.content }"
            ></textarea>
            <span v-if="formErrors.content" class="error-message">{{ formErrors.content }}</span>
          </div>
          
          <div class="form-actions">
            <button 
              type="submit" 
              :disabled="submitting"
              class="submit-btn"
            >
              {{ submitting ? '提交中...' : '提交' }}
            </button>
            <button 
              type="button" 
              @click="resetForm"
              class="reset-btn"
            >
              重置
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <!-- 地图区域 -->
    <div class="map-section">
      <h2>我们的位置</h2>
      <div class="map-placeholder">
        <p>地图加载中...</p>
      </div>
    </div>
    
    <!-- 页脚 -->
    <Footer />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import Footer from '@/components/Footer.vue'
import Navbar from '@/components/Navbar.vue'
import contactService from '@/api/contacts'

// 表单数据
const formData = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  content: ''
})

// 表单错误信息
const formErrors = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  content: ''
})

// 提交状态
const submitting = ref(false)

// 表单验证函数
const validateForm = () => {
  let isValid = true
  
  // 清空之前的错误信息
  Object.keys(formErrors).forEach(key => {
    formErrors[key] = ''
  })
  
  // 姓名验证
  if (!formData.name.trim()) {
    formErrors.name = '请输入您的姓名'
    isValid = false
  } else if (formData.name.trim().length < 2) {
    formErrors.name = '姓名长度至少为2个字符'
    isValid = false
  }
  
  // 邮箱验证
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.email.trim()) {
    formErrors.email = '请输入您的邮箱'
    isValid = false
  } else if (!emailRegex.test(formData.email.trim())) {
    formErrors.email = '请输入有效的邮箱地址'
    isValid = false
  }
  
  // 电话验证（可选字段，但如果填写了则验证格式）
  if (formData.phone.trim()) {
    const phoneRegex = /^1[3-9]\d{9}$/
    if (!phoneRegex.test(formData.phone.trim())) {
      formErrors.phone = '请输入有效的手机号码'
      isValid = false
    }
  }
  
  // 主题验证（可选字段，但如果填写了则验证长度）
  if (formData.subject.trim() && formData.subject.trim().length > 50) {
    formErrors.subject = '主题长度不能超过50个字符'
    isValid = false
  }
  
  // 内容验证
  if (!formData.content.trim()) {
    formErrors.content = '请输入您的留言内容'
    isValid = false
  } else if (formData.content.trim().length < 10) {
    formErrors.content = '留言内容至少为10个字符'
    isValid = false
  } else if (formData.content.trim().length > 500) {
    formErrors.content = '留言内容不能超过500个字符'
    isValid = false
  }
  
  return isValid
}

// 提交表单函数
const submitForm = async () => {
  // 表单验证
  if (!validateForm()) {
    ElMessage.warning('请检查表单中的错误信息')
    return
  }
  
  submitting.value = true
  
  try {
    console.log('开始提交表单数据:', {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      subject: formData.subject.trim(),
      content: formData.content.trim()
    })
    
    // 调用API提交表单数据
    const response = await contactService.submitContactForm({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      subject: formData.subject.trim(),
      content: formData.content.trim()
    })
    
    console.log('表单提交成功，响应数据:', response)
    
    // 检查响应状态
    if (response.code === 200) {
      ElMessage.success('提交成功！我们会尽快与您联系。')
      resetForm()
    } else {
      ElMessage.error(response.message || '提交失败，请稍后重试')
    }
  } catch (error) {
    console.error('提交表单失败:', error)
    // 添加更详细的错误信息
    if (error.response) {
      console.error('错误响应数据:', error.response.data)
      console.error('错误状态码:', error.response.status)
    } else if (error.request) {
      console.error('没有收到响应:', error.request)
    } else {
      console.error('请求配置错误:', error.message)
    }
    ElMessage.error('提交失败，请稍后重试')
  } finally {
    submitting.value = false
  }
}

// 重置表单函数
const resetForm = () => {
  formData.name = ''
  formData.email = ''
  formData.phone = ''
  formData.subject = ''
  formData.content = ''
  
  // 清空错误信息
  Object.keys(formErrors).forEach(key => {
    formErrors[key] = ''
  })
}
</script>

<style>
/* 全局样式重置 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* 页面容器 */
.contact-page {
  width: 100%;
}

/* 页面标题 Banner */
.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  margin-bottom: 40px;
}

.page-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://picsum.photos/seed/contactbanner/1920/1080') center/cover no-repeat;
  opacity: 0.2;
  z-index: 1;
}

.page-header .container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header h1 {
  font-size: 2.8rem;
  margin: 0 0 20px 0;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.page-header p {
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  opacity: 0.9;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-header {
    padding: 60px 0;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
}

/* 内容容器 */
.contact-content,
.map-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 联系内容容器 */
.contact-content {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
}

/* 联系信息样式 */
.contact-info {
  flex: 1;
  background-color: #f9f9f9;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.contact-info h2 {
  margin-bottom: 20px;
  color: #333;
}

.contact-info ul {
  list-style: none;
  margin-bottom: 30px;
}

.contact-info li {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.contact-info li i {
  margin-right: 15px;
  font-size: 20px;
}

/* 社交媒体样式 */
.social-media h3 {
  margin-bottom: 15px;
  color: #333;
}

.social-media a,
.social-media .social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  text-decoration: none;
  margin-right: 10px;
  transition: transform 0.3s ease;
  font-size: 12px;
  text-align: center;
  padding: 0;
  flex-shrink: 0;
}

.social-media a:hover {
  transform: translateY(-3px);
}

/* 表单容器样式 - 确保表单显示 */
#contact-form-container {
  flex: 1;
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  /* 确保表单始终可见 */
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  height: auto !important;
  min-height: 500px;
  position: relative;
  z-index: 10;
}

#contact-form-container h2 {
  margin-bottom: 20px;
  color: #333;
}

/* 表单样式 */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

/* 必填项标记 */
.required {
  color: #f56c6c;
  margin-left: 4px;
}

/* 错误状态样式 */
.form-group input.error,
.form-group textarea.error {
  border-color: #f56c6c;
}

/* 错误信息样式 */
.error-message {
  display: block;
  color: #f56c6c;
  font-size: 12px;
  margin-top: 4px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.form-group textarea {
  resize: vertical;
}

/* 表单按钮样式 */
.form-actions {
  margin-top: 30px;
}

.submit-btn {
  padding: 10px 20px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #66b1ff;
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.reset-btn {
  padding: 10px 20px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.reset-btn:hover {
  background-color: #e6e6e6;
}

/* 地图区域 */
.map-section {
  margin-bottom: 40px;
}

.map-section h2 {
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.map-placeholder {
  height: 300px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #666;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .contact-content {
    flex-direction: column;
  }
  
  .contact-info,
  #contact-form-container {
    width: 100%;
  }
}
</style>