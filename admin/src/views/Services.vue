<template>
  <div>
    <h2 class="text-xl font-bold mb-4">核心服务管理</h2>
    <el-button 
      type="primary" 
      @click="showDialog = true" 
      class="mb-4"
    >
      新增服务
    </el-button>
    <el-table 
      v-loading="loading"
      element-loading-text="加载中..."
      :data="services" 
      border
      width="100%"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="title" label="服务名称" min-width="180" />
      <el-table-column prop="image" label="服务图片" min-width="120">
        <template #default="scope">
          <el-image 
            v-if="scope.row.image" 
            :src="scope.row.image" 
            :preview-src-list="[scope.row.image]" 
            style="width: 80px; height: 80px; object-fit: cover"
          />
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容" min-width="400" />
      <el-table-column prop="icon" label="图标名称" min-width="150" />
      <el-table-column prop="order" label="排序" min-width="100" />
      <el-table-column prop="isActive" label="是否启用" min-width="100">
        <template #default="scope">
          <el-switch 
            v-model="scope.row.isActive" 
            active-color="#13ce66" 
            inactive-color="#ff4949"
            @change="handleStatusChange(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template #default="scope">
          <el-button link class="edit-btn" @click="editService(scope.row)">编辑</el-button>
          <el-button link class="delete-btn" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/编辑对话框 -->
    <el-dialog 
      v-model="showDialog" 
      :title="currentId ? '编辑服务' : '新增服务'" 
      width="50%"
    >
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item label="服务名称" prop="title">
          <el-input v-model="form.title" placeholder="请输入服务名称" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="form.content" type="textarea" placeholder="请输入内容" :rows="3" />
        </el-form-item>
        <el-form-item label="服务图片">
          <ImageUpload v-model="form.image" />
        </el-form-item>
        <el-form-item label="图标名称" prop="icon">
          <el-input v-model="form.icon" placeholder="请输入Element Plus图标名称，如：el-icon-s-grid" />
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input-number v-model="form.order" min="1" placeholder="请输入排序值" />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="form.isActive" active-color="#13ce66" inactive-color="#ff4949" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { servicesAPI } from '../utils/api';
import ImageUpload from '../components/ImageUpload.vue';

// 服务数据列表
const services = ref([]);
const loading = ref(false);

// 对话框状态管理
const showDialog = ref(false);
const form = ref({ title: '', content: '', image: '', icon: '', order: 1, isActive: true });
const currentId = ref(null); // 当前编辑的服务ID

// 表单验证规则
const rules = ref({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
  icon: [{ required: true, message: '请输入图标名称', trigger: 'blur' }],
  order: [{ required: true, message: '请输入排序值', trigger: 'blur' }]
});

// 初始化加载服务数据
const loadServices = async () => {
  try {
    loading.value = true;
    const response = await servicesAPI.getList();
    console.log('服务列表响应:', response);
    
    // 确保正确提取数据 - 检查response的结构
    let serviceData = [];
    if (response && response.data) {
      // 后端返回的标准格式 {code, data, error}
      serviceData = response.data;
    } else if (Array.isArray(response)) {
      // 如果直接返回数组
      serviceData = response;
    }
    
    // 确保每个服务对象都有必要的字段
    services.value = serviceData.map(service => ({
      _id: service._id || service.id || `temp-${Date.now()}-${Math.random()}`,
      title: service.title || '',
      content: service.content || service.description || '',
      image: service.image || '',
      icon: service.icon || '',
      order: service.order || 0,
      isActive: service.isActive !== undefined ? service.isActive : true
    }));
    
    console.log('处理后的服务列表:', services.value);
  } catch (error) {
    console.error('加载服务数据失败:', error);
    ElMessage.error('加载服务数据失败');
    // 使用模拟数据作为备用
    services.value = [
      {        
        _id: '1',
        title: '网站建设',
        content: '专业的网站设计与开发，响应式布局，提升品牌形象',
        icon: 'el-icon-s-grid',
        order: 1,
        isActive: true
      },
      {
        _id: '2',
        title: 'APP开发',
        content: '定制化移动应用开发，原生体验，满足企业需求',
        icon: 'el-icon-mobile',
        order: 2,
        isActive: true
      },
      {
        _id: '3',
        title: '数据分析',
        content: '专业的数据收集与分析服务，助力企业决策',
        icon: 'el-icon-pie-chart',
        order: 3,
        isActive: true
      }
    ];
  } finally {
    loading.value = false;
  }
};

// 新增/编辑提交逻辑
const handleSubmit = async () => {
  // 表单验证
  if (!form.value.title || !form.value.content || !form.value.icon || !form.value.order) {
    ElMessage.error('请填写完整信息');
    return;
  }

  try {
    // 将前端的content字段转换为后端期望的description字段
    const submitData = {
      ...form.value,
      description: form.value.content,
      content: undefined // 移除content字段，避免后端混淆
    };

    if (currentId.value) {
          // 编辑：更新现有数据
          await servicesAPI.update(currentId.value, submitData);
          const index = services.value.findIndex(item => item._id === currentId.value || item.id === currentId.value);
          if (index !== -1) {
            // 使用统一的数据处理逻辑更新服务项
            services.value[index] = {
              ...services.value[index],
              ...form.value,
              _id: services.value[index]._id || services.value[index].id,
              content: form.value.content,
              description: form.value.content,
              image: form.value.image
            };
          }
          ElMessage.success('编辑成功');
        } else {
          // 新增：添加新数据
          const newService = await servicesAPI.create(submitData);
          console.log('新增服务数据:', newService);
          // 确保返回的数据包含所有必要字段
          services.value.push({
            _id: newService._id || newService.id || `temp-${Date.now()}-${Math.random()}`,
            title: newService.title || '',
            content: newService.content || newService.description || '',
            image: newService.image || form.value.image || '',
            icon: newService.icon || '',
            order: newService.order || 0,
            isActive: newService.isActive !== undefined ? newService.isActive : true
          });
          ElMessage.success('新增成功');
        }

    // 重置对话框状态
    showDialog.value = false;
    form.value = { title: '', content: '', image: '', icon: '', order: 1, isActive: true };
    currentId.value = null;
    // 重新加载列表确保数据一致性
    loadServices();
  } catch (error) {
    console.error('提交服务数据失败:', error);
    ElMessage.error('提交失败，请稍后重试');
  }
}

// 编辑服务（填充表单数据）
const editService = (row) => {
  // MongoDB使用_id作为唯一标识，但也可能有id字段
  currentId.value = row._id || row.id;
  // 将后端的description字段映射到前端的content字段，并移除不必要的字段
  form.value = {
    title: row.title || '',
    content: row.description || row.content || '',
    image: row.image || '',
    icon: row.icon || '',
    order: row.order || 0,
    isActive: row.isActive !== undefined ? row.isActive : true
  };
  showDialog.value = true;
  console.log('编辑服务ID:', currentId.value);
};

// 删除服务（带确认对话框）
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定删除该服务？', '提示', { type: 'warning' });
    
    // 调用API删除
    const deleteId = row._id || row.id;
    console.log('删除服务ID:', deleteId);
    await servicesAPI.delete(deleteId);
    // 使用或运算符过滤掉要删除的项
    services.value = services.value.filter(item => item._id !== deleteId && item.id !== deleteId);
    ElMessage.success('删除成功');
    loadServices(); // 重新加载列表
  } catch (err) {
    if (err !== 'cancel') {
      console.error('删除服务失败:', err);
      ElMessage.error('删除失败，请稍后重试');
    }
  }
};

// 处理状态开关变化
const handleStatusChange = async (row) => {
  try {
    const updateId = row._id || row.id;
    console.log('更新服务状态ID:', updateId);
    await servicesAPI.update(updateId, {
      isActive: row.isActive
    });
    ElMessage.success('状态更新成功');
  } catch (error) {
    console.error('更新服务状态失败:', error);
    // 回滚状态
    row.isActive = !row.isActive;
    ElMessage.error('更新状态失败，请稍后重试');
  }
};

// 组件挂载时加载数据
onMounted(() => {
  loadServices();
});
</script>

<style scoped>
.text-xl {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.el-table {
  border: 1px solid var(--border-color);
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
</style>