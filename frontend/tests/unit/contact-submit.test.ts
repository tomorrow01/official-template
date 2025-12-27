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

describe('Contact Form Submission', () => {
  let wrapper: any;

  beforeEach(() => {
    // 重置模拟函数状态
    vi.clearAllMocks();
    wrapper = mount(ContactPage);
  });

  it('should submit form successfully when all fields are valid', async () => {
    // 模拟 API 成功响应
    (contactService.submitContactForm as any).mockResolvedValue({ success: true });

    // 填写有效表单数据
    await wrapper.find('input[placeholder="请输入您的姓名"]').setValue('测试用户');
    await wrapper.find('input[placeholder="请输入您的邮箱"]').setValue('test@example.com');
    await wrapper.find('input[placeholder="请输入您的联系电话"]').setValue('13800138000');
    await wrapper.find('input[placeholder="请输入消息主题"]').setValue('测试主题');
    await wrapper.find('textarea[placeholder="请输入您的留言内容"]').setValue('这是一个测试留言内容，长度足够长。');
    
    // 触发提交
    await wrapper.find('#contact-form').trigger('submit.prevent');
    
    // 验证 API 被调用
    expect(contactService.submitContactForm).toHaveBeenCalled();
    expect(contactService.submitContactForm).toHaveBeenCalledWith({
      name: '测试用户',
      email: 'test@example.com',
      phone: '13800138000',
      subject: '测试主题',
      content: '这是一个测试留言内容，长度足够长。'
    });
    
    // 验证提交状态
    expect(wrapper.vm.submitting).toBe(false);
    
    // 验证成功消息
    expect(ElMessage.success).toHaveBeenCalledWith('提交成功');
  });

  it('should handle form submission failure', async () => {
    // 模拟 API 失败响应
    (contactService.submitContactForm as any).mockRejectedValue(new Error('API Error'));

    // 填写有效表单数据
    await wrapper.find('input[placeholder="请输入您的姓名"]').setValue('测试用户');
    await wrapper.find('input[placeholder="请输入您的邮箱"]').setValue('test@example.com');
    await wrapper.find('input[placeholder="请输入您的联系电话"]').setValue('13800138000');
    await wrapper.find('input[placeholder="请输入消息主题"]').setValue('测试主题');
    await wrapper.find('textarea[placeholder="请输入您的留言内容"]').setValue('这是一个测试留言内容，长度足够长。');
    
    // 触发提交
    await wrapper.find('#contact-form').trigger('submit.prevent');
    
    // 验证 API 被调用
    expect(contactService.submitContactForm).toHaveBeenCalled();
    
    // 验证提交状态
    expect(wrapper.vm.submitting).toBe(false);
    
    // 验证错误消息
    expect(ElMessage.error).toHaveBeenCalledWith('提交失败，请稍后重试');
  });

  it('should show warning message when submitting empty form', async () => {
    // 直接提交空表单
    await wrapper.find('#contact-form').trigger('submit.prevent');
    
    // 验证 API 未被调用
    expect(contactService.submitContactForm).not.toHaveBeenCalled();
    
    // 验证警告消息
    expect(ElMessage.warning).toHaveBeenCalledWith('请检查表单中的错误信息');
  });

  it('should reset form after successful submission', async () => {
    // 模拟 API 成功响应
    (contactService.submitContactForm as any).mockResolvedValue({ success: true });

    // 填写有效表单数据
    await wrapper.find('input[placeholder="请输入您的姓名"]').setValue('测试用户');
    await wrapper.find('input[placeholder="请输入您的邮箱"]').setValue('test@example.com');
    await wrapper.find('input[placeholder="请输入您的联系电话"]').setValue('13800138000');
    await wrapper.find('input[placeholder="请输入消息主题"]').setValue('测试主题');
    await wrapper.find('textarea[placeholder="请输入您的留言内容"]').setValue('这是一个测试留言内容，长度足够长。');
    
    // 触发提交
    await wrapper.find('#contact-form').trigger('submit.prevent');
    
    // 验证表单数据被重置
    expect(wrapper.vm.formData.name).toBe('');
    expect(wrapper.vm.formData.email).toBe('');
    expect(wrapper.vm.formData.phone).toBe('');
    expect(wrapper.vm.formData.subject).toBe('');
    expect(wrapper.vm.formData.content).toBe('');
  });

  it('should reset form when reset button is clicked', async () => {
    // 填写表单数据
    await wrapper.find('input[placeholder="请输入您的姓名"]').setValue('测试用户');
    await wrapper.find('input[placeholder="请输入您的邮箱"]').setValue('test@example.com');
    await wrapper.find('input[placeholder="请输入您的联系电话"]').setValue('13800138000');
    await wrapper.find('input[placeholder="请输入消息主题"]').setValue('测试主题');
    await wrapper.find('textarea[placeholder="请输入您的留言内容"]').setValue('这是一个测试留言内容，长度足够长。');
    
    // 点击重置按钮
    await wrapper.find('.reset-btn').trigger('click');
    
    // 验证表单数据被重置
    expect(wrapper.vm.formData.name).toBe('');
    expect(wrapper.vm.formData.email).toBe('');
    expect(wrapper.vm.formData.phone).toBe('');
    expect(wrapper.vm.formData.subject).toBe('');
    expect(wrapper.vm.formData.content).toBe('');
  });
});
