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
            <h3>公司Logo</h3>
            <div class="logo-uploader">
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                :on-change="handleLogoChange"
                :before-upload="beforeLogoUpload"
                style="display: block; margin-bottom: 20px;"
              >
                <img v-if="aboutConfigs.logo" :src="aboutConfigs.logo" class="logo-preview" alt="公司Logo" />
                <div v-else class="avatar-uploader-icon">
                  <span>+</span>
                </div>
              </el-upload>
              <el-button v-if="aboutConfigs.logo" type="danger" size="small" @click="removeLogo">
                移除Logo
              </el-button>
            </div>
          </div>

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
                <div class="team-info">
                  <el-input
                    v-model="member.name"
                    placeholder="姓名"
                    class="team-input"
                  />
                  <el-input
                    v-model="member.role"
                    placeholder="职位"
                    class="team-input"
                  />
                  <el-input
                    v-model="member.image"
                    placeholder="图片路径"
                    class="team-input"
                  />
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    @click="removeTeamMember(index)"
                    size="small"
                  >
                    删除
                  </el-button>
                </div>
              </el-card>
              
              <el-button
                type="primary"
                @click="addTeamMember"
                icon="el-icon-plus"
              >
                添加团队成员
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

<script>
import { configsAPI } from '../utils/api';
import { ElMessage } from 'element-plus';

export default {
  name: 'ConfigManagement',
  data() {
    return {
      activeTab: 'about',
      aboutConfigs: {
        companyIntro: '',
        companyDetail: '',
        mission: '',
        vision: '',
        values: '',
        teamMembers: [],
        logo: ''
      },
      configIds: {},
      lastUpdateTime: '',
      configCount: 0,
      loading: false
    };
  },
  mounted() {
    console.log('ConfigManagement mounted');
    this.loadConfigs();
  },
  methods: {
    async loadConfigs() {
      console.log('Loading configs...');
      this.loading = true;
      try {
        const response = await configsAPI.getList();
        console.log('Configs response:', response);
        // 处理API响应，兼容直接返回数组和包装在data字段中的情况
        const configs = Array.isArray(response) ? response : (response.data || []);
        this.configCount = configs.length;
        
        // 处理每个配置项
        configs.forEach(config => {
          if (config.updateTime) {
            if (!this.lastUpdateTime || new Date(config.updateTime) > new Date(this.lastUpdateTime)) {
              this.lastUpdateTime = config.updateTime;
            }
          }
          
          this.configIds[config.key] = config.id;
          
          switch (config.key) {
            case 'about_company':
              this.aboutConfigs.companyIntro = config.value || '';
              break;
            case 'about_company_detail':
              this.aboutConfigs.companyDetail = config.value || '';
              break;
            case 'company_mission':
              this.aboutConfigs.mission = config.value || '';
              break;
            case 'company_vision':
              this.aboutConfigs.vision = config.value || '';
              break;
            case 'company_values':
              this.aboutConfigs.values = config.value || '';
              break;
            case 'company_logo':
              this.aboutConfigs.logo = config.value || '';
              break;
            case 'team_members':
              try {
                this.aboutConfigs.teamMembers = config.value ? JSON.parse(config.value) : [];
              } catch (e) {
                this.aboutConfigs.teamMembers = [];
              }
              break;
          }
        });
      } catch (error) {
        console.error('加载配置失败:', error);
        ElMessage.error('加载配置失败，请稍后重试');
      } finally {
        this.loading = false;
      }
    },
    
    async saveAboutConfigs() {
      this.loading = true;
      const configUpdates = [
        { key: 'about_company', value: this.aboutConfigs.companyIntro },
        { key: 'about_company_detail', value: this.aboutConfigs.companyDetail },
        { key: 'company_mission', value: this.aboutConfigs.mission },
        { key: 'company_vision', value: this.aboutConfigs.vision },
        { key: 'company_values', value: this.aboutConfigs.values },
        { key: 'company_logo', value: this.aboutConfigs.logo },
        { key: 'team_members', value: JSON.stringify(this.aboutConfigs.teamMembers) }
      ];
      
      try {
        // 逐个更新配置项
        for (const config of configUpdates) {
          // 无论id是否存在，都尝试更新配置
          // 确保即使是新增的配置项也能被保存
          await configsAPI.update(this.configIds[config.key], {
            value: config.value
          });
        }
        
        ElMessage.success('配置保存成功');
        this.lastUpdateTime = new Date().toISOString();
      } catch (error) {
        ElMessage.error('配置保存失败，请稍后重试');
        console.error('保存配置失败:', error);
      } finally {
        this.loading = false;
      }
    },
    
    addTeamMember() {
      this.aboutConfigs.teamMembers.push({
        name: '',
        role: '',
        image: ''
      });
    },
    
    removeTeamMember(index) {
      this.aboutConfigs.teamMembers.splice(index, 1);
    },
    
    // 上传前检查
    beforeLogoUpload(file) {
      const isImage = /^image\//.test(file.type);
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isImage) {
        ElMessage.error('只允许上传图片文件!');
      }
      if (!isLt5M) {
        ElMessage.error('文件大小不能超过5MB!');
      }
      return isImage && isLt5M;
    },
    
    // 处理logo选择
    handleLogoChange(file) {
      // 添加标志位防止重复触发toast
      if (file.status === 'ready') {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.aboutConfigs.logo = e.target.result;
          ElMessage.success('Logo已加载，可以保存配置了');
        };
        reader.onerror = () => {
          ElMessage.error('图片加载失败');
        };
        reader.readAsDataURL(file.raw);
      }
    },
    
    // 移除logo
    removeLogo() {
      this.aboutConfigs.logo = '';
    }
  }
};
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
  max-width: 600px;
}

.team-info {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
}

.team-input {
  flex: 1;
  min-width: 200px;
}

.logo-uploader .avatar-uploader {
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.logo-preview {
  width: 150px;
  height: 150px;
  object-fit: contain;
  border-radius: 4px;
}

.avatar-uploader-icon {
  width: 150px;
  height: 150px;
  line-height: 150px;
  border: 2px dashed #409EFF;
  border-radius: 6px;
  text-align: center;
  color: #409EFF;
  font-size: 36px;
  background-color: #f5f7fa;
  transition: all 0.3s;
}

.avatar-uploader-icon:hover {
  border-color: #66b1ff;
  background-color: #ecf5ff;
  color: #66b1ff;
}

.action-buttons {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .team-info {
    flex-direction: column;
    align-items: stretch;
  }
  
  .team-input {
    width: 100%;
  }
}
</style>