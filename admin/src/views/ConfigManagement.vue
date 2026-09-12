<template>
  <div class="config-management">
    <div class="header">
      <h1>基础配置管理</h1>
      <p>管理网站的基础配置信息，包括关于我们页面的公司简介等内容</p>
    </div>

    <div class="config-tabs">
      <el-tabs v-model="activeTab" type="border-card">
        <el-tab-pane label="关于我们" name="about">
          <div class="config-section">
            <h3>公司简介</h3>
            <el-input
              v-model="aboutConfigs.companyIntro"
              type="textarea"
              :rows="4"
              placeholder="请输入公司简介"
              maxlength="500"
              show-word-limit
            />
          </div>

          <div class="config-section">
            <h3>公司详细介绍</h3>
            <el-input
              v-model="aboutConfigs.companyDetail"
              type="textarea"
              :rows="6"
              placeholder="请输入公司详细介绍"
              maxlength="1000"
              show-word-limit
            />
          </div>

          <div class="config-section">
            <h3>公司简介配图</h3>
            <CoverUploader
              v-model="aboutConfigs.companyImage"
              button-text="上传配图"
              tip="显示在关于我们页面公司简介右侧，建议横向图片（如 800×600），支持 jpg/png/gif/webp，不超过 5MB（选填）"
            />
          </div>

          <div class="config-section">
            <h3>企业使命</h3>
            <el-input
              v-model="aboutConfigs.mission"
              placeholder="请输入企业使命"
              maxlength="200"
              show-word-limit
            />
          </div>

          <div class="config-section">
            <h3>企业愿景</h3>
            <el-input
              v-model="aboutConfigs.vision"
              placeholder="请输入企业愿景"
              maxlength="200"
              show-word-limit
            />
          </div>

          <div class="config-section">
            <h3>企业价值观</h3>
            <el-input
              v-model="aboutConfigs.values"
              placeholder="请输入企业价值观"
              maxlength="200"
              show-word-limit
            />
          </div>

          <div class="config-section">
            <h3>团队成员管理</h3>
            <div class="team-members">
              <el-card
                v-for="(member, index) in aboutConfigs.teamMembers"
                :key="index"
                class="team-card"
                shadow="hover"
              >
                <div class="team-card-inner">
                  <!-- 左：图片上传 + 预览 -->
                  <div class="team-image-col">
                    <div class="team-image-box">
                      <img
                        v-if="member.image"
                        :src="normalizeImageUrl(member.image)"
                        class="team-image-preview"
                        alt="成员头像"
                      >
                      <div v-else class="team-image-placeholder" :style="{ background: adminAvatarBg(index) }">
                        <span class="placeholder-initial">{{ adminAvatarInitial(member.name) }}</span>
                      </div>
                    </div>
                    <input
                      type="file"
                      :ref="el => fileInputs[index] = el"
                      @change="(e) => handleTeamImageUpload(e, index)"
                      accept="image/*"
                      class="hidden"
                    >
                    <el-button
                      size="small"
                      @click="triggerTeamImageUpload(index)"
                    >
                      {{ member.image ? '更换图片' : '上传图片' }}
                    </el-button>
                    <el-button
                      v-if="member.image"
                      size="small"
                      type="danger"
                      plain
                      @click="member.image = ''"
                    >
                      移除
                    </el-button>
                  </div>
                  <!-- 右：姓名/职位 -->
                  <div class="team-info-col">
                    <el-input
                      v-model="member.name"
                      placeholder="姓名"
                      class="team-input"
                    />
                    <el-input
                      v-model="member.role"
                      placeholder="职位（如：总经理 / 技术总监）"
                      class="team-input"
                    />
                  </div>
                  <!-- 删除按钮：默认定位在 card 右上角（移动端好用），PC 端单独覆盖 -->
                  <el-button
                    type="danger"
                    size="small"
                    circle
                    :icon="Delete"
                    @click="removeTeamMember(index)"
                    class="team-delete-btn"
                  />
                </div>
              </el-card>
              
              <el-button
                type="primary"
                @click="addTeamMember"
              >
                + 添加团队成员
              </el-button>
            </div>
          </div>

          <div class="action-buttons">
            <el-button type="primary" @click="saveAboutConfigs">保存配置</el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane label="系统信息" name="system">
          <div class="config-section">
            <h3>系统配置信息</h3>
            <el-descriptions :column="1" border>
              <el-descriptions-item label="当前版本">1.0.0</el-descriptions-item>
              <el-descriptions-item label="最后更新时间">{{ lastUpdateTime || '暂无更新' }}</el-descriptions-item>
              <el-descriptions-item label="配置项数量">{{ configCount || 0 }}</el-descriptions-item>
            </el-descriptions>
          </div>
          
          <div class="config-section">
            <h3>配置使用说明</h3>
            <el-alert
              title="注意事项"
              type="info"
              show-icon
            >
              <ul>
                <li>修改配置后请点击保存按钮使配置生效</li>
                <li>公司简介等内容会实时更新到前端页面</li>
                <li>团队成员图片建议使用相同尺寸以保证页面美观</li>
              </ul>
            </el-alert>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { configsAPI, uploadAPI } from '../utils/api';
import { normalizeImageUrl } from '../utils/imageUrl';
import { ElMessage } from 'element-plus';
import { Delete } from '@element-plus/icons-vue';
import CoverUploader from '../components/CoverUploader.vue';

const activeTab = ref('about');
const fileInputs = reactive({});   // 存放每个成员的 file input ref

// ===== 默认头像渐变色（与前台 about.vue 保持一致）=====
const ADMIN_AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
];

function adminAvatarBg(index) {
  return ADMIN_AVATAR_GRADIENTS[index % ADMIN_AVATAR_GRADIENTS.length];
}

function adminAvatarInitial(name) {
  if (!name) return '+';  // 新增未填姓名时显示 +
  const first = name.trim().charAt(0);
  return first.toUpperCase();
}

const aboutConfigs = reactive({
  companyIntro: '',
  companyDetail: '',
  companyImage: '',
  mission: '',
  vision: '',
  values: '',
  teamMembers: []
});

const configIds = reactive({});
const lastUpdateTime = ref('');
const configCount = ref(0);
const loading = ref(false);

// ===== 团队成员图片上传 =====
function triggerTeamImageUpload(index) {
  if (fileInputs[index]) fileInputs[index].click();
}

async function handleTeamImageUpload(event, index) {
  const file = event.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    ElMessage.error('请选择图片文件');
    event.target.value = '';
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    ElMessage.error('图片大小不能超过 5MB');
    event.target.value = '';
    return;
  }
  try {
    // 走统一 api 实例：自动带 token，401 时统一提示并跳登录页
    const url = await uploadAPI.uploadImage(file);
    if (url) {
      aboutConfigs.teamMembers[index].image = url;
      ElMessage.success('图片上传成功');
    } else {
      ElMessage.error('上传失败：未获取到图片地址');
    }
  } catch (err) {
    // 错误提示（含 401 跳登录）已由统一拦截器处理，这里只记录日志
    console.error('图片上传失败:', err);
  } finally {
    // 清空 input，让同一个文件可以重复选择
    event.target.value = '';
  }
}

// ===== 加载配置 =====
async function loadConfigs() {
  loading.value = true;
  try {
    const response = await configsAPI.getList();
    // admin 拦截器已解包 response.data，所以 response 直接是后端返回的 JSON
    // configsAPI.getList() → api.get() → 拦截器返回 response.data → { code, data, message }
    // 实际上 admin 的拦截器 return response.data，所以 response = { code, data, message }
    const list = response?.data || response || [];
    const arr = Array.isArray(list) ? list : (list.data || []);
    configCount.value = arr.length;

    arr.forEach(config => {
      if (config.updateTime) {
        if (!lastUpdateTime.value || new Date(config.updateTime) > new Date(lastUpdateTime.value)) {
          lastUpdateTime.value = config.updateTime;
        }
      }
      configIds[config.key] = config.id;

      switch (config.key) {
        case 'about_company':
          aboutConfigs.companyIntro = config.value || '';
          break;
        case 'about_company_detail':
          aboutConfigs.companyDetail = config.value || '';
          break;
        case 'company_intro_image':
          aboutConfigs.companyImage = config.value || '';
          break;
        case 'company_mission':
          aboutConfigs.mission = config.value || '';
          break;
        case 'company_vision':
          aboutConfigs.vision = config.value || '';
          break;
        case 'company_values':
          aboutConfigs.values = config.value || '';
          break;
        case 'team_members':
          try {
            aboutConfigs.teamMembers = JSON.parse(config.value) || [];
          } catch (e) {
            aboutConfigs.teamMembers = [];
          }
          break;
      }
    });
  } catch (error) {
    ElMessage.error('加载配置失败，请稍后重试');
    console.error('加载配置失败:', error);
  } finally {
    loading.value = false;
  }
}

// ===== 保存配置 =====
async function saveAboutConfigs() {
  loading.value = true;
  const configUpdates = [
    { key: 'about_company', name: '公司简介', value: aboutConfigs.companyIntro },
    { key: 'about_company_detail', name: '公司详细介绍', value: aboutConfigs.companyDetail },
    { key: 'company_intro_image', name: '公司简介配图', value: aboutConfigs.companyImage },
    { key: 'company_mission', name: '企业使命', value: aboutConfigs.mission },
    { key: 'company_vision', name: '企业愿景', value: aboutConfigs.vision },
    { key: 'company_values', name: '企业价值观', value: aboutConfigs.values },
    { key: 'team_members', name: '团队成员', value: JSON.stringify(aboutConfigs.teamMembers) }
  ];

  try {
    for (const config of configUpdates) {
      if (configIds[config.key]) {
        await configsAPI.update(configIds[config.key], { value: config.value });
      } else {
        // 旧的 configs.json 中没有该 key（如公司简介配图），首次保存时自动补建
        const created = await configsAPI.create({
          key: config.key,
          name: config.name,
          value: config.value
        });
        // 拦截器返回完整响应体 { code, data }，新建配置在 data 中
        const createdId = created?.data?.id || created?.id;
        if (createdId) configIds[config.key] = createdId;
      }
    }
    ElMessage.success('配置保存成功');
    lastUpdateTime.value = new Date().toISOString();
  } catch (error) {
    ElMessage.error('配置保存失败，请稍后重试');
    console.error('保存配置失败:', error);
  } finally {
    loading.value = false;
  }
}

function addTeamMember() {
  aboutConfigs.teamMembers.push({ name: '', role: '', image: '' });
}

function removeTeamMember(index) {
  aboutConfigs.teamMembers.splice(index, 1);
}

loadConfigs();
</script>

<style scoped>
.config-management {
  padding: 20px;
}

.header {
  margin-bottom: 30px;
}

.header h1 {
  margin: 0 0 10px 0;
  color: var(--el-text-color-primary);
}

.header p {
  margin: 0;
  color: var(--el-text-color-secondary);
  font-size: 14px;
}

.config-tabs {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.config-section {
  margin-bottom: 30px;
}

.config-section h3 {
  margin: 0 0 15px 0;
  color: var(--el-text-color-primary);
  font-size: 16px;
  font-weight: 600;
}

.team-members {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 团队成员卡片 —— PC 端让它成为删除按钮的定位参照物 */
.team-card {
  width: 100%;
  position: relative;
}

.team-card-inner {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  position: relative;
}

/* 左：图片上传区 */
.team-image-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  position: relative;   /* 删除按钮 absolute 定位的参照物 */
}

.team-image-box {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #e0e0e0;
  background: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.team-image-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.team-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

.placeholder-initial {
  font-size: 40px;
  font-family: 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif;
  letter-spacing: 1px;
}

/* 右：输入框区 */
.team-info-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}

.team-input {
  width: 100%;
}

/* 删除按钮 —— 默认（移动端）定位在 card-inner 右上角 */
.team-delete-btn {
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 10;
}

/* 强制圆形（所有断点通用） */
:deep(.team-delete-btn.el-button) {
  width: 32px !important;
  height: 32px !important;
  min-width: 32px !important;
  min-height: 32px !important;
  max-width: 32px !important;
  max-height: 32px !important;
  padding: 0 !important;
  line-height: 32px !important;
  border-radius: 50% !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  box-sizing: border-box !important;
  flex-shrink: 0 !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
}

:deep(.team-delete-btn .el-icon) {
  font-size: 16px !important;
  width: 16px !important;
  height: 16px !important;
  line-height: 16px !important;
}

/* ========== 响应式 ========== */
@media (max-width: 768px) {
  .team-card-inner {
    flex-direction: column;
    align-items: center;
  }
  .team-info-col {
    width: 100%;
  }
  /* 移动端按钮保持原样，缩小一号 */
  .team-delete-btn {
    top: 4px;
    right: 4px;
  }
  :deep(.team-delete-btn.el-button) {
    width: 28px !important;
    height: 28px !important;
    min-width: 28px !important;
    min-height: 28px !important;
    max-width: 28px !important;
    max-height: 28px !important;
    line-height: 28px !important;
  }
  :deep(.team-delete-btn .el-icon) {
    font-size: 14px !important;
    width: 14px !important;
    height: 14px !important;
    line-height: 14px !important;
  }
}

/* ========== 仅 PC 端 (≥769px) ========== */
@media (min-width: 769px) {
  /* 让 el-card 不裁掉探出的删除按钮 */
  .team-card :deep(.el-card__body) {
    overflow: visible;
  }
  /* 核心修复：给右侧输入框区让出 42px 的右侧空间
     这样无论删除按钮在哪里都不会盖住输入框 */
  .team-info-col {
    padding-right: 42px;
  }
}
</style>