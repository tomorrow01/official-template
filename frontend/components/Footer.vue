<template>
  <div class="footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-info">
          <h3>关于我们</h3>
          <p>专注于企业级内容管理解决方案，助力客户高效运营数字内容。</p>
        </div>
        <div class="footer-links">
          <h3>快速链接</h3>
          <NuxtLink to="/about" class="footer-link-text">公司介绍</NuxtLink>
          <NuxtLink to="/contact" class="footer-link-text">联系我们</NuxtLink>
          <NuxtLink to="/privacy" class="footer-link-text">隐私政策</NuxtLink>
        </div>
        <div class="footer-contact">
          <h3>联系信息</h3>
          <p><el-icon class="contact-icon"><Phone /></el-icon> 电话：010-12345678</p>
          <p><el-icon class="contact-icon"><Mail /></el-icon> 邮箱：service@example.com</p>
          <p><el-icon class="contact-icon"><Location /></el-icon> 地址：北京市朝阳区XX路XX号</p>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2024 官网名称. 所有权利保留</span>
        <span>备案号：京ICP备XXXXXXX号-1</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer {
  background: var(--bg-container);  /* 保持原有背景 */
  padding: 20px 20px 20px;
  /* margin-top: 100px; */
  /* border-top: 1px solid rgba(255,255,255,0.1);   */
}

.footer-top {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 50px;
  margin-bottom: 10px;
}

.footer-info, .footer-links, .footer-contact {
  color: #ffffff;  /* 主文字改为白色 */
  line-height: 1.8;
}

.footer-links NuxtLink {
  display: block;
  margin-bottom: 16px;
  color: #ffffff;  /* 链接默认白色 */
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  padding-left: 18px;
}
.footer-links .footer-link-text{
  color: #ffffff;
  padding: 10px;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
}

.footer-links NuxtLink::before {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--primary-color);  /* 保留主题色箭头 */
  opacity: 0;
  transition: opacity 0.3s ease;
}

.footer-links NuxtLink:hover {
  color: var(--primary-color);  /* 悬停时主题色 */
  transform: translateX(8px);
}

.contact-icon {
  color: var(--primary-color);  /* 图标保持主题色 */
  margin-right: 8px;
  font-size: 16px;
  vertical-align: middle;
}

.footer-bottom {
  /* border-top: 1px solid rgba(255,255,255,0.1);  */
  padding-top: 24px;
  text-align: center;
  color: rgba(255,255,255,0.7);  /* 底部文字半透明白色 */
  font-size: 14px;
}
.footer-bottom span {
  margin: 0 10px;
}
</style>