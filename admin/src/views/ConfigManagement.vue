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
                        :src="member.image"
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
                  <!-- 删除按钮 -->
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
import { configsAPI } from '../utils/api';
import { ElMessage } from 'element-plus';
import { Delete } from '@element-plus/icons-vue';
import axios from 'axios';

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
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    ElMessage.error('图片大小不能超过 5MB');
    return;
  }
  try {
    const formData = new FormData();
    formData.append('file', file);
    const res = await axios.post('http://localhost:3000/api/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    // 后端返回: { errno: 0, data: ["完整URL"] }
    const url = res?.data?.data?.[0];
    if (url) {
      aboutConfigs.teamMembers[index].image = url;
      ElMessage.success('图片上传成功');
    } else {
      ElMessage.error('上传失败：未获取到图片地址');
    }
  } catch (err) {
    console.error('图片上传失败:', err);
    ElMessage.error('图片上传失败，请稍后重试');
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
    { key: 'about_company', value: aboutConfigs.companyIntro },
    { key: 'about_company_detail', value: aboutConfigs.companyDetail },
    { key: 'company_mission', value: aboutConfigs.mission },
    { key: 'company_vision', value: aboutConfigs.vision },
    { key: 'company_values', value: aboutConfigs.values },
    { key: 'team_members', value: JSON.stringify(aboutConfigs.teamMembers) }
  ];

  try {
    for (const config of configUpdates) {
      if (configIds[config.key]) {
        await configsAPI.update(configIds[config.key], { value: config.value });
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

.team-card {
  width: 100%;
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

/* 删除按钮 */
.team-delete-btn {
  position: absolute;
  top: 0;
  right: 0;
}

/* 隐藏 file input */
.hidden {
  display: none;
}

.action-buttons {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

/* 响应式 */
@media (max-width: 768px) {
  .team-card-inner {
    flex-direction: column;
    align-items: center;
  }
  .team-info-col {
    width: 100%;
  }
}
</style>