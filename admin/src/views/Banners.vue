<template>
  <div class="banners-container">
    <h2 class="text-xl font-bold mb-4">{{ isSectionsOnly ? '轮播图板块列表' : '轮播图列表' }}</h2>
    
    <!-- 板块管理页面 -->
    <div v-if="isSectionsOnly" class="section-management">
      <div class="flex justify-end items-center mb-4">
        <el-button type="primary" @click="showSectionDialog = true">
          新增板块
        </el-button>
      </div>
      
      <el-table :data="sections" stripe border style="width: 100%">
        <el-table-column prop="label" label="板块名称" width="200" />
        <el-table-column prop="value" label="板块标识" width="200" />
        <el-table-column prop="bannerCount" label="关联轮播图数量" width="150" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="scope">
            <el-button
              type="danger"
              size="small"
              @click="handleDeleteSection(scope.row)"
              :disabled="scope.row.value === 'home' || scope.row.bannerCount > 0"
            >
              删除
            </el-button>
            <el-tooltip
              v-if="scope.row.value === 'home'"
              content="首页板块为默认板块，不可删除"
              placement="top"
            >
              <el-button type="text" size="small" disabled class="ml-2">
                默认板块
              </el-button>
            </el-tooltip>
            <el-tooltip
              v-else-if="scope.row.bannerCount > 0"
              content="该板块下有关联轮播图，不可删除"
              placement="top"
            >
              <el-button type="text" size="small" disabled class="ml-2">
                有关联轮播图
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      
      <el-dialog
        v-model="showSectionDialog"
        title="新增板块"
        width="500px"
        :close-on-click-modal="false"
      >
        <el-form :model="newSectionForm" :rules="sectionFormRules" label-width="80px">
          <el-form-item label="板块名称" prop="label">
            <el-input v-model="newSectionForm.label" placeholder="请输入板块名称" />
          </el-form-item>
          <el-form-item label="板块标识" prop="value">
            <el-input v-model="newSectionForm.value" placeholder="请输入板块标识(英文、数字、下划线)" />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="showSectionDialog = false">取消</el-button>
          <el-button type="primary" @click="submitSectionForm">确定</el-button>
        </template>
      </el-dialog>
    </div>
    
    <!-- 轮播图列表页面 -->
    <div v-else>
      <div class="flex justify-between items-center mb-4">
        <el-select v-model="selectedSection" placeholder="选择或输入板块" @change="loadBanners" clearable filterable allow-create>
          <el-option label="全部" value="" />
          <el-option 
            v-for="section in sections" 
            :key="section.value" 
            :label="section.label" 
            :value="section.value" 
          />
        </el-select>
        <el-button type="primary" @click="showDialog = true" class="mb-4">
          新增轮播图
        </el-button>
      </div>
      <div class="mb-2 text-sm text-gray-500">
        共 {{ banners.length }} 条记录
      </div>
      <el-table 
        v-loading="loading"
        element-loading-text="加载中..."
        :data="banners" 
        border
        width="100%"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="section" label="板块" min-width="120" />
        <el-table-column prop="title" label="标题" min-width="200" />
        <el-table-column prop="description" label="描述" min-width="250" show-overflow-tooltip />
        <el-table-column prop="imageUrl" label="轮播图" min-width="180">
          <template #default="scope">
            <el-image 
              :src="scope.row.imageUrl || scope.row.image" 
              :preview-src-list="[scope.row.imageUrl || scope.row.image]"
              fit="cover" 
              style="width: 100px; height: 60px; cursor: pointer;"
            />
          </template>
        </el-table-column>
        <el-table-column prop="link" label="链接地址" min-width="250" />
        <el-table-column prop="ctaText" label="按钮文本" min-width="120" />
        <el-table-column prop="order" label="排序" min-width="80" />
        <el-table-column prop="isActive" label="状态" min-width="80">
          <template #default="scope">
            <el-switch
              v-model="scope.row.isActive"
              active-color="var(--success-color)"
              inactive-color="var(--danger-color)"
              @change="toggleStatus(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="scope">
            <el-button link class="edit-btn" @click="editBanner(scope.row)">编辑</el-button>
            <el-button link class="delete-btn" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 新增/编辑对话框 -->
      <el-dialog 
        v-model="showDialog" 
        :title="currentId ? '编辑轮播图' : '新增轮播图'" 
        width="50%"
      >
        <el-form :model="form" :rules="rules" ref="formRef">
          <el-form-item label="板块" prop="section">
            <el-select v-model="form.section" placeholder="请选择或输入板块" filterable allow-create>
              <el-option label="首页" value="home" />
              <el-option label="服务页" value="services" />
              <el-option label="案例页" value="cases" />
              <el-option label="关于页" value="about" />
            </el-select>
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入轮播图标题" />
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="form.description" type="textarea" rows="3" placeholder="请输入轮播图描述" />
          </el-form-item>
          <el-form-item label="轮播图" prop="imageUrl">
            <ImageUpload v-model="form.imageUrl" />
          </el-form-item>
          <el-form-item label="链接地址" prop="link">
            <el-input v-model="form.link" placeholder="请输入跳转链接" />
          </el-form-item>
          <el-form-item label="按钮文本" prop="ctaText">
            <el-input v-model="form.ctaText" placeholder="请输入按钮文本" />
          </el-form-item>
          <el-form-item label="排序" prop="order">
            <el-input-number v-model="form.order" :min="0" :precision="0" />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="resetForm">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
// 导入必要的库
import { ref, onMounted, nextTick, watch, computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { bannersAPI } from '../utils/api';
import { useRoute } from 'vue-router';
import ImageUpload from '../components/ImageUpload.vue';

// 表格数据
const banners = ref([]);
const loading = ref(false);
const selectedSection = ref(''); // 当前选择的板块

// 获取当前路由信息
const route = useRoute();

// 计算属性：判断当前是否为板块管理页面
const isSectionsOnly = computed(() => route.meta.sectionsOnly || false);

// 对话框状态管理
const showDialog = ref(false);
const form = ref({ 
  section: selectedSection.value || route.meta.section || 'home',
  title: '',
  description: '',
  ctaText: '',
  imageUrl: '', 
  link: '', 
  order: 0,
  isActive: true
});
const currentId = ref(null); // 当前编辑的轮播图ID

// 板块数据
const sections = ref([
  { label: '首页', value: 'home', bannerCount: 0 },
  { label: '服务页', value: 'services', bannerCount: 0 },
  { label: '案例页', value: 'cases', bannerCount: 0 },
  { label: '关于页', value: 'about', bannerCount: 0 }
]);

// 新增板块对话框
const showSectionDialog = ref(false);
const newSectionForm = ref({ label: '', value: '' });

// 验证板块标识是否已存在
const validateSectionId = (_, value, callback) => {
  if (sections.value.some(section => section.value === value)) {
    callback(new Error('该板块标识已存在'));
  } else {
    callback();
  }
};

// 板块表单验证规则
const sectionFormRules = ref({
  label: [{ required: true, message: '请输入板块名称', trigger: 'blur' }],
  value: [
    { required: true, message: '请输入板块标识', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '板块标识只能包含字母、数字和下划线', trigger: 'blur' },
    { validator: validateSectionId, trigger: 'blur' }
  ]
});

// 更新各板块的轮播图数量
const updateSectionBannerCounts = () => {
  // 重置所有板块的计数
  sections.value.forEach(section => {
    section.bannerCount = 0;
  });
  
  // 统计各板块的轮播图数量
  banners.value.forEach(banner => {
    const section = sections.value.find(s => s.value === banner.section);
    if (section) {
      section.bannerCount++;
    } else {
      // 如果发现未定义的板块，自动添加到板块列表
      sections.value.push({
        label: banner.section,
        value: banner.section,
        bannerCount: 1
      });
    }
  });
};

// 提交新增板块表单
const submitSectionForm = async () => {
  try {
    // 表单验证
    if (!newSectionForm.value.label || !newSectionForm.value.value) {
      ElMessage.error('请填写完整的板块信息');
      return;
    }
    
    // 检查板块标识是否已存在
    if (sections.value.some(section => section.value === newSectionForm.value.value)) {
      ElMessage.error('该板块标识已存在');
      return;
    }
    
    // 添加新板块
    sections.value.push({
      ...newSectionForm.value,
      bannerCount: 0
    });
    
    ElMessage.success('板块添加成功');
    showSectionDialog.value = false;
    newSectionForm.value = { label: '', value: '' };
  } catch (error) {
    ElMessage.error('添加板块失败');
    console.error('Failed to add section:', error);
  }
};

// 加载轮播图列表
const loadBanners = async () => {
  try {
    loading.value = true;
    const params = selectedSection.value ? { section: selectedSection.value } : {};
    
    // 显示筛选状态
    const filterText = selectedSection.value ? `板块: ${getSectionLabel(selectedSection.value)}` : '全部板块';
    console.log(`加载轮播图列表 - ${filterText}`);
    
    const response = await bannersAPI.getList(params);
    
    // 检查响应格式，确保正确提取数据
    let bannerData = [];
    if (response && response.data) {
      // 如果响应是包装在data字段中的结构
      bannerData = response.data;
    } else if (Array.isArray(response)) {
      // 如果直接返回数组
      bannerData = response;
    }
    
    // 确保每个轮播图对象都有必要的字段
    const processedBanners = bannerData.map(banner => ({
      _id: banner._id || banner.id || `temp-${Date.now()}-${Math.random()}`,
      section: banner.section || 'home',
      title: banner.title || '',
      description: banner.description || '',
      ctaText: banner.ctaText || banner.buttonText || '',
      imageUrl: banner.imageUrl || banner.image || '',
      link: banner.link || '',
      order: banner.order || banner.sort || 0,
      isActive: banner.isActive !== undefined ? banner.isActive : (banner.status !== undefined ? banner.status : true)
    }));
    
    // 如果API没有正确筛选，在前端进行二次筛选
    if (selectedSection.value) {
      banners.value = processedBanners.filter(banner => banner.section === selectedSection.value);
      console.log(`前端二次筛选后，${getSectionLabel(selectedSection.value)}板块共有${banners.value.length}条记录`);
    } else {
      banners.value = processedBanners;
    }
    
    // 显示筛选结果
    if (selectedSection.value) {
      ElMessage.success(`已筛选出${banners.value.length}条${getSectionLabel(selectedSection.value)}的轮播图`);
    } else {
      ElMessage.success(`已加载全部${banners.value.length}条轮播图`);
    }
    
  } catch (error) {
    ElMessage.error('加载轮播图列表失败');
    console.error('Failed to load banners:', error);
    // 使用模拟数据作为备用
    banners.value = [
      {
        _id: '1',
        section: 'home',
        title: '欢迎来到我们的网站',
        description: '专业的网站设计与开发服务',
        ctaText: '了解更多',
        imageUrl: 'https://picsum.photos/id/237/800/400',
        link: '/about',
        order: 1,
        isActive: true
      }
    ];
  } finally {
    loading.value = false;
    // 更新各板块的轮播图数量
    updateSectionBannerCounts();
  }
};



// 删除板块
const handleDeleteSection = async (section) => {
  try {
    // 首页板块不能删除
    if (section.value === 'home') {
      ElMessage.warning('首页板块为默认板块，不可删除');
      return;
    }
    
    // 有轮播图关联的板块不能删除
    if (section.bannerCount > 0) {
      ElMessage.warning(`该板块下有${section.bannerCount}个轮播图，请先删除这些轮播图`);
      return;
    }
    
    await ElMessageBox.confirm(`确定删除板块"${section.label}"？`, '提示', { type: 'warning' });
    
    // 删除板块
    const index = sections.value.findIndex(s => s.value === section.value);
    if (index !== -1) {
      sections.value.splice(index, 1);
    }
    
    // 如果当前筛选的是被删除的板块，重置筛选
    if (selectedSection.value === section.value) {
      selectedSection.value = '';
      loadBanners();
    }
    
    ElMessage.success('板块删除成功');
    
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除板块失败');
      console.error('Failed to delete section:', error);
    }
  }
};



// 获取板块标签
const getSectionLabel = (value) => {
  const labels = {
    home: '首页',
    services: '服务页',
    cases: '案例页',
    about: '关于页'
  };
  return labels[value] || value;
};

// 监听路由变化，更新当前板块
watch(() => route.meta.section, (newSection) => {
  if (newSection && !selectedSection.value) {
    selectedSection.value = newSection;
    loadBanners();
  }
}, { immediate: true });

// 表单验证规则
const rules = ref({
  section: [{ required: true, message: '请选择板块', trigger: 'change' }],
  title: [{ required: true, message: '请输入轮播图标题', trigger: 'blur' }],
  imageUrl: [{ required: true, message: '请上传图片', trigger: 'change' }],
  link: [{ required: true, message: '请输入跳转链接', trigger: 'blur' }]
});

// 新增/编辑提交逻辑
const handleSubmit = async () => {
  try {
    // 表单验证
    await nextTick();
    
    // 检查必填字段
    if (!form.value.imageUrl || !form.value.link) {
      ElMessage.error('请填写完整信息');
      return;
    }

    // 准备提交的数据，只包含服务器需要的字段
    const submitData = {
      section: form.value.section,
      title: form.value.title,
      description: form.value.description,
      ctaText: form.value.ctaText,
      imageUrl: form.value.imageUrl,
      link: form.value.link,
      order: form.value.order,
      isActive: form.value.isActive
    };

    // 添加详细日志
    console.log('准备提交轮播图数据:', submitData);
    console.log('提交数据大小:', JSON.stringify(submitData).length, '字节');
    console.log('图片URL字段类型:', typeof submitData.imageUrl);
    console.log('图片URL开头:', submitData.imageUrl.substring(0, 100));
    console.log('图片URL是否为base64:', submitData.imageUrl.startsWith('data:image/'));
    console.log('section字段:', submitData.section);
    console.log('title字段:', submitData.title);
    console.log('description字段:', submitData.description);
    console.log('ctaText字段:', submitData.ctaText);
    console.log('link字段:', submitData.link);
    console.log('order字段:', submitData.order);
    console.log('isActive字段:', submitData.isActive);

    let response;
    if (currentId.value) {
      // 编辑：更新现有数据
      console.log('执行更新操作，ID:', currentId.value);
      console.log('更新API地址:', `/api/banners/${currentId.value}`);
      response = await bannersAPI.update(currentId.value, submitData);
      console.log('更新响应:', response);
      // 更新本地列表中的数据
      const index = banners.value.findIndex(item => item._id === currentId.value || item.id === currentId.value);
      if (index !== -1) {
        banners.value[index] = {
          ...banners.value[index],
          ...submitData,
          _id: banners.value[index]._id // 保留原有ID
        };
      }
      ElMessage.success('编辑成功');
    } else {
      // 新增：添加新数据
      console.log('执行新增操作');
      response = await bannersAPI.create(submitData);
      console.log('新增响应:', response);
      // 将新数据添加到列表中，确保字段一致性
      banners.value.push({
        _id: response._id || response.id || `temp-${Date.now()}-${Math.random()}`,
        section: response.section || submitData.section || 'home',
        title: response.title || submitData.title || '',
        description: response.description || submitData.description || '',
        ctaText: response.ctaText || response.buttonText || submitData.ctaText || '',
        imageUrl: response.imageUrl || response.image || submitData.imageUrl || '',
        link: response.link || submitData.link || '',
        order: response.order || response.sort || submitData.order || 0,
        isActive: response.isActive !== undefined ? response.isActive : (response.status !== undefined ? response.status : submitData.isActive)
      });
      ElMessage.success('新增成功');
    }

    // 重置对话框状态并重新加载列表确保数据一致性
    resetForm();
    loadBanners();
  } catch (error) {
    console.error('提交失败详情:', error);
    if (error.response) {
      console.error('响应状态:', error.response.status);
      console.error('响应数据:', error.response.data);
      console.error('响应头:', error.response.headers);
      ElMessage.error('操作失败: ' + (error.response.data?.error || error.response.data?.message || '服务器错误'));
    } else if (error.request) {
      console.error('请求已发送但没有收到响应:', error.request);
      ElMessage.error('操作失败: 服务器无响应，请检查服务器状态');
    } else {
      console.error('请求配置错误:', error.message);
      ElMessage.error('操作失败: 请求配置错误');
    }
    console.error('错误堆栈:', error.stack);
  }
};

// 编辑轮播图（填充表单数据）
const editBanner = (row) => {
  showDialog.value = true;
  
  // 提取图片URL，优先使用imageUrl字段
  const imageUrl = row.imageUrl || row.image || '';
  
  form.value = {
    section: row.section || selectedSection.value,
    title: row.title || '',
    description: row.description || '',
    ctaText: row.ctaText || '',
    imageUrl: imageUrl,
    link: row.link,
    order: row.order || row.sort || 0,
    isActive: row.isActive !== undefined ? row.isActive : (row.status !== undefined ? row.status : true)
  };
  // MongoDB使用_id作为唯一标识，但也可能有id字段
  currentId.value = row._id || row.id;
  console.log('编辑轮播图ID:', currentId.value);
  console.log('编辑轮播图原始数据:', row);
  console.log('编辑轮播图图片URL:', imageUrl);
  console.log('图片URL是否为base64:', imageUrl.startsWith('data:image/'));
};

// 删除轮播图（带确认对话框）
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定删除该轮播图？', '提示', { type: 'warning' });
    const deleteId = row._id || row.id;
    console.log('删除轮播图ID:', deleteId);
    await bannersAPI.delete(deleteId);
    ElMessage.success('删除成功');
    loadBanners(); // 重新加载列表
  } catch (err) {
    if (err !== 'cancel') ElMessage.error('删除失败');
  }
};

// 切换轮播图状态
const toggleStatus = async (row) => {
  try {
    const updateId = row._id || row.id;
    console.log('更新状态ID:', updateId);
    await bannersAPI.update(updateId, { isActive: row.isActive });
    ElMessage.success('状态更新成功');
  } catch (error) {
    ElMessage.error('状态更新失败');
    // 回滚状态
    row.isActive = !row.isActive;
  }
};

// 重置表单
const resetForm = () => {
  showDialog.value = false;
  form.value = { 
    section: selectedSection.value || route.meta.section || 'home',
    title: '',
    description: '',
    ctaText: '',
    imageUrl: '', 
    link: '', 
    order: 0,
    isActive: true
  };
  currentId.value = null;
};

// 初始加载
onMounted(() => {
  loadBanners();
});
</script>

<style scoped>
.text-xl {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-primary); /* 使用全局变量 */
}

.el-table {
  border: 1px solid var(--border-color); /* 使用全局变量 */
  border-radius: 8px;
  overflow: hidden;
}

/* 编辑按钮（绿色） */
.edit-btn {
  color: var(--success-color);
}

/* 删除按钮（红色） */
.delete-btn {
  color: var(--danger-color);
}

/* 轮播图预览样式 */
.el-image {
  border-radius: 4px;
}

.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.items-center {
  align-items: center;
}
</style>