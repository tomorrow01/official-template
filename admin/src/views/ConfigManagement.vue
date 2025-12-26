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
              :before-upload="beforeLogoUpload"
              :on-change="handleLogoChange"
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
                  <div class="team-image-uploader">
                    <el-upload
                      class="team-image-uploader"
                      :show-file-list="false"
                      :before-upload="beforeLogoUpload"
                      :on-change="(file) => handleTeamImageChange(file, index)"
                    >
                      <img v-if="member.image" :src="member.image" class="team-image-preview" alt="团队成员图片" />
                      <div v-else class="team-avatar-uploader-icon">
                        <span>+</span>
                      </div>
                    </el-upload>
                    <el-button v-if="member.image" type="danger" size="small" @click="removeTeamImage(index)">
                      移除
                    </el-button>
                  </div>
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
          
          // 保存配置项的id，优先使用_id（MongoDB默认），兼容id字段
          this.configIds[config.key] = config._id || config.id;
          console.log(`保存配置项 ${config.key} 的id: ${this.configIds[config.key]}`);
          
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
              console.log(`加载公司logo: ${this.aboutConfigs.logo.substring(0, 50)}${this.aboutConfigs.logo.length > 50 ? '...' : ''}`);
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
        { key: 'about_company', value: this.aboutConfigs.companyIntro, name: '公司简介' },
        { key: 'about_company_detail', value: this.aboutConfigs.companyDetail, name: '公司详细介绍' },
        { key: 'company_mission', value: this.aboutConfigs.mission, name: '企业使命' },
        { key: 'company_vision', value: this.aboutConfigs.vision, name: '企业愿景' },
        { key: 'company_values', value: this.aboutConfigs.values, name: '企业价值观' },
        { key: 'company_logo', value: this.aboutConfigs.logo, name: '公司Logo' },
        { key: 'team_members', value: JSON.stringify(this.aboutConfigs.teamMembers), name: '团队成员' }
      ];
      
      try {
        console.log('开始保存配置，configUpdates:', configUpdates);
        console.log('当前configIds:', this.configIds);
        
        // 逐个处理配置项，添加更详细的错误处理
        for (const config of configUpdates) {
          console.log(`处理配置项: ${config.key}`);
          try {
            if (this.configIds[config.key]) {
              // 如果有id，更新配置
              console.log(`更新配置，id: ${this.configIds[config.key]}, value: ${config.value.substring(0, 50)}${config.value.length > 50 ? '...' : ''}`);
              const updateResponse = await configsAPI.update(this.configIds[config.key], {
                value: config.value
              });
              console.log(`更新成功，响应:`, updateResponse);
            } else {
              // 如果没有id，创建新配置
              console.log(`创建新配置，key: ${config.key}, name: ${config.name}, value: ${config.value.substring(0, 50)}${config.value.length > 50 ? '...' : ''}`);
              const newConfig = await configsAPI.create({
                key: config.key,
                name: config.name,
                value: config.value
              });
              console.log(`创建成功，新配置:`, newConfig);
              // 保存新配置的id，以便下次更新
              this.configIds[config.key] = newConfig.id || newConfig._id;
              console.log(`更新configIds:`, this.configIds);
            }
          } catch (itemError) {
            console.error(`处理配置项 ${config.key} 失败:`, itemError);
            // 继续处理其他配置项，而不是立即中断
          }
        }
        
        // 保存成功后重新加载配置，确保显示最新的logo
        console.log('保存成功，重新加载配置...');
        await this.loadConfigs();
        
        ElMessage.success('配置保存成功');
        this.lastUpdateTime = new Date().toISOString();
        console.log('配置保存完成，最后更新时间:', this.lastUpdateTime);
      } catch (error) {
        // 显示更详细的错误信息
        let errorMsg = '配置保存失败';
        if (error.response) {
          // 服务器返回了错误响应
          errorMsg = `配置保存失败: ${error.response.status} - ${error.response.data?.message || '未知错误'}`;
        } else if (error.request) {
          // 请求已发送但没有收到响应
          errorMsg = '配置保存失败: 服务器无响应，请检查网络连接';
        } else {
          // 请求配置时发生错误
          errorMsg = `配置保存失败: ${error.message}`;
        }
        ElMessage.error(errorMsg);
        console.error('保存配置失败:', error);
        console.error('错误详情:', error.response || error.message || error);
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
    
    // 处理logo选择，转换为base64
    handleLogoChange(file) {
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
    
    // 处理团队成员图片选择，转换为base64
    handleTeamImageChange(file, index) {
      if (file.status === 'ready') {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.aboutConfigs.teamMembers[index].image = e.target.result;
          ElMessage.success('团队成员图片已加载');
        };
        reader.onerror = () => {
          ElMessage.error('图片加载失败');
        };
        reader.readAsDataURL(file.raw);
      }
    },
    
    // 移除团队成员图片
    removeTeamImage(index) {
      this.aboutConfigs.teamMembers[index].image = '';
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

/* 团队成员图片上传样式 */
.team-image-uploader {
  display: flex;
  align-items: center;
  gap: 10px;
}

.team-image-preview {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}

.team-avatar-uploader-icon {
  width: 80px;
  height: 80px;
  line-height: 80px;
  border: 2px dashed #409EFF;
  border-radius: 6px;
  text-align: center;
  color: #409EFF;
  font-size: 24px;
  background-color: #f5f7fa;
  transition: all 0.3s;
  cursor: pointer;
}

.team-avatar-uploader-icon:hover {
  border-color: #66b1ff;
  background-color: #ecf5ff;
  color: #66b1ff;
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
  
  .team-image-uploader {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>