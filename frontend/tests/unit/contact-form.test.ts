import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ContactPage from '@/pages/contact.vue';
import { contactService } from '@/api/contacts';
import { ElMessage } from 'element-plus';

// 模拟 API 服务
vi.mock('@/api/contacts', () => ({
  contactService: {
    submitContactForm: vi.fn()
  }
}));

// 模拟 Element Plus 消息
vi.mock('element-plus', () => ({
  ElMessage: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn()
  }
}));

// 模拟其他 API 调用
vi.mock('@/api/services', () => ({
  getServiceList: vi.fn().mockResolvedValue([])
}));

vi.mock('@/api/request', () => ({
  default: {
    get: vi.fn().mockRejectedValue(new Error('Mock API error'))
  }
}));

// 模拟子组件
vi.mock('@/components/Navbar.vue', () => ({
  default: {
    template: '<div class="mock-navbar"></div>'
  }
}));

vi.mock('@/components/Footer.vue', () => ({
  default: {
    template: '<div class="mock-footer"></div>'
  }
}));

describe('Contact Form Validation', () => {
  let wrapper: any;

  beforeEach(() => {
    // 重置模拟函数状态
    vi.clearAllMocks();
    wrapper = mount(ContactPage);
  });

  it('should render the contact form', () => {
    expect(wrapper.find('#contact-form').exists()).toBe(true);
  });

  it('should have all required form fields', () => {
    const requiredLabels = wrapper.findAll('.required');
    expect(requiredLabels.length).toBe(5); // 5个必填字段
  });

  it('should show error message when name is empty', async () => {
    const nameInput = wrapper.find('input[placeholder="请输入您的姓名"]');
    await nameInput.setValue('');
    await nameInput.trigger('blur');
    
    const errorMessages = wrapper.findAll('.error-message');
    const nameErrorMessage = errorMessages[0];
    expect(nameErrorMessage.exists()).toBe(true);
    expect(nameErrorMessage.text()).toBe('请输入您的姓名');
  });

  it('should show error message when name is too short', async () => {
    const nameInput = wrapper.find('input[placeholder="请输入您的姓名"]');
    await nameInput.setValue('a');
    await nameInput.trigger('blur');
    
    const errorMessages = wrapper.findAll('.error-message');
    const nameErrorMessage = errorMessages[0];
    expect(nameErrorMessage.text()).toBe('姓名长度至少为2个字符');
  });

  it('should show error message when name is too long', async () => {
    const nameInput = wrapper.find('input[placeholder="请输入您的姓名"]');
    await nameInput.setValue('a'.repeat(21));
    await nameInput.trigger('blur');
    
    const errorMessages = wrapper.findAll('.error-message');
    const nameErrorMessage = errorMessages[0];
    expect(nameErrorMessage.text()).toBe('姓名长度不能超过20个字符');
  });

  it('should show error message for invalid email', async () => {
    const emailInput = wrapper.find('input[placeholder="请输入您的邮箱"]');
    await emailInput.setValue('invalid-email');
    await emailInput.trigger('blur');
    
    // 查找包含邮箱错误信息的元素
    const errorMessages = wrapper.findAll('.error-message');
    const emailErrorMessage = errorMessages.find((msg: any) => msg.text().includes('邮箱'));
    expect(emailErrorMessage).toBeDefined();
    expect(emailErrorMessage.text()).toBe('请输入有效的邮箱地址');
  });

  it('should show error message for invalid phone number', async () => {
    const phoneInput = wrapper.find('input[placeholder="请输入您的联系电话"]');
    await phoneInput.setValue('1234567890');
    await phoneInput.trigger('blur');
    
    // 查找包含电话错误信息的元素
    const errorMessages = wrapper.findAll('.error-message');
    const phoneErrorMessage = errorMessages.find((msg: any) => msg.text().includes('手机'));
    expect(phoneErrorMessage).toBeDefined();
    expect(phoneErrorMessage.text()).toBe('请输入有效的手机号码');
  });

  it('should show error message when subject is too short', async () => {
    const subjectInput = wrapper.find('input[placeholder="请输入消息主题"]');
    await subjectInput.setValue('a');
    await subjectInput.trigger('blur');
    
    // 查找包含主题错误信息的元素
    const errorMessages = wrapper.findAll('.error-message');
    const subjectErrorMessage = errorMessages.find((msg: any) => msg.text().includes('主题'));
    expect(subjectErrorMessage).toBeDefined();
    expect(subjectErrorMessage.text()).toBe('主题长度至少为2个字符');
  });

  it('should show error message when content is too short', async () => {
    const contentInput = wrapper.find('textarea[placeholder="请输入您的留言内容"]');
    await contentInput.setValue('short');
    await contentInput.trigger('blur');
    
    // 查找包含内容错误信息的元素
    const errorMessages = wrapper.findAll('.error-message');
    const contentErrorMessage = errorMessages.find((msg: any) => msg.text().includes('留言内容'));
    expect(contentErrorMessage).toBeDefined();
    expect(contentErrorMessage.text()).toBe('留言内容至少为10个字符');
  });

  it('should pass validation with valid form data', async () => {
    // 填写有效表单数据
    await wrapper.find('input[placeholder="请输入您的姓名"]').setValue('测试用户');
    await wrapper.find('input[placeholder="请输入您的邮箱"]').setValue('test@example.com');
    await wrapper.find('input[placeholder="请输入您的联系电话"]').setValue('13800138000');
    await wrapper.find('input[placeholder="请输入消息主题"]').setValue('测试主题');
    await wrapper.find('textarea[placeholder="请输入您的留言内容"]').setValue('这是一个测试留言内容，长度足够长。');
    
    // 触发提交
    await wrapper.find('#contact-form').trigger('submit.prevent');
    
    // 验证没有错误消息
    const errorMessages = wrapper.findAll('.error-message');
    const visibleErrorMessages = errorMessages.filter((msg: any) => msg.text() !== '');
    expect(visibleErrorMessages.length).toBe(0);
  });
});
