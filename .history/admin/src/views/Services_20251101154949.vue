<template>
  <div>
    <h2 class="text-xl font-bold mb-4">服务管理</h2>
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
  border>
      <el-table-column prop="title" label="服务名称" width="180" />
      <el-table-column prop="description" label="服务描述" width="400" />
      <el-table-column prop="icon" label="图标名称" width="150" />
      <el-table-column prop="order" label="排序" width="100" />
      <el-table-column prop="isActive" label="是否启用" width="100">
        <template #default="scope">
          <el-switch 
            v-model="scope.row.isActive" 
            active-color="#13ce66" 
            inactive-color="#ff4949"
            @change="handleStatusChange(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
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
        <el-form-item label="服务描述" prop="description">
          <el-input v-model="form.description" type="textarea" placeholder="请输入服务描述" :rows="3" />
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

// 服务数据列表
const services = ref([]);
const loading = ref(false);

// 对话框状态管理
const showDialog = ref(false);
const form = ref({ title: '', description: '', icon: '', order: 1, isActive: true });
const currentId = ref(null); // 当前编辑的服务ID

// 表单验证规则
const rules = ref({
  title: [{ required: true, message: '请输入服务名称', trigger: 'blur' }],
  description: [{ required: true, message: '请输入服务描述', trigger: 'blur' }],
  icon: [{ required: true, message: '请输入图标名称', trigger: 'blur' }],
  order: [{ required: true, message: '请输入排序值', trigger: 'blur' }]
});

// 初始化加载服务数据
const loadServices = async () => {
  try {
    loading.value = true;
    const response = await servicesAPI.getList();
    // 后端返回的数据结构是{code, data, error}，需要提取data字段
    services.value = response.data || [];
  } catch (error) {
    console.error('加载服务数据失败:', error);
    ElMessage.error('加载服务数据失败');
    // 使用模拟数据作为备用
    services.value = [
      {
        _id: '1',
        title: '网站建设',
        description: '专业的网站设计与开发，响应式布局，提升品牌形象',
        icon: 'el-icon-s-grid',
        order: 1,
        isActive: true
      },
      {
        _id: '2',
        title: 'APP开发',
        description: '定制化移动应用开发，原生体验，满足企业需求',
        icon: 'el-icon-mobile',
        order: 2,
        isActive: true
      },
      {
        _id: '3',
        title: '数据分析',
        description: '专业的数据收集与分析服务，助力企业决策',
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
  if (!form.value.title || !form.value.description || !form.value.icon || !form.value.order) {
    ElMessage.error('请填写完整信息');
    return;
  }

  try {
    if (currentId.value) {
      // 编辑：更新现有数据
      await servicesAPI.update(currentId.value, form.value);
      const index = services.value.findIndex(item => item._id === currentId.value);
      services.value[index] = { ...services.value[index], ...form.value };
      ElMessage.success('编辑成功');
    } else {
      // 新增：生成唯一ID并添加数据
      const newService = await servicesAPI.create(form.value);
      services.value.push(newService);
      ElMessage.success('新增成功');
    }

    // 重置对话框状态
    showDialog.value = false;
    form.value = { title: '', description: '', icon: '', order: 1, isActive: true };
    currentId.value = null;
  } catch (error) {
    console.error('提交服务数据失败:', error);
    ElMessage.error('提交失败，请稍后重试');
  }
};

// 编辑服务（填充表单数据）
const editService = (row) => {
  showDialog.value = true;
  form.value = {
    title: row.title,
    description: row.description,
    icon: row.icon,
    order: row.order,
    isActive: row.isActive || true
  };
  // MongoDB使用_id作为唯一标识，但也可能有id字段
  currentId.value = row._id || row.id;
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
    // 修复过滤逻辑：使用或运算符而不是与运算符
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