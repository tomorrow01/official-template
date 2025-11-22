<template>
  <div>
    <h2 class="text-xl font-bold mb-4">案例管理</h2>
    <el-button 
      type="primary" 
      @click="showDialog = true" 
      class="mb-4"
    >
      新增案例
    </el-button>
    <el-table 
      v-loading="loading"
      element-loading-text="加载中..."
      :data="cases" 
      border
      width="100%"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="image" label="案例图片" min-width="200">
        <template #default="scope">
          <el-image 
            :src="scope.row.image" 
            :preview-src-list="[scope.row.image]" 
            style="width: 150px; height: 100px; object-fit: cover"
          />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="案例标题" min-width="200" />
      <el-table-column prop="description" label="案例描述" min-width="300" />
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
          <el-button link class="edit-btn" @click="editCase(scope.row)">编辑</el-button>
          <el-button link class="delete-btn" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/编辑对话框 -->
    <el-dialog 
      v-model="showDialog" 
      :title="currentId ? '编辑案例' : '新增案例'" 
      width="50%"
    >
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item label="案例标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入案例标题" />
        </el-form-item>
        <el-form-item label="案例图片" prop="image">
          <el-input v-model="form.image" placeholder="请输入案例图片URL" />
        </el-form-item>
        <el-form-item label="案例描述" prop="description">
          <el-input v-model="form.description" type="textarea" placeholder="请输入案例描述" :rows="3" />
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
import { casesAPI } from '../utils/api';

// 案例数据列表
const cases = ref([]);
const loading = ref(false);

// 对话框状态管理
const showDialog = ref(false);
const form = ref({ title: '', image: '', description: '', order: 1, isActive: true });
const currentId = ref(null); // 当前编辑的案例ID

// 表单验证规则
const rules = ref({
  title: [{ required: true, message: '请输入案例标题', trigger: 'blur' }],
  image: [{ required: true, message: '请输入案例图片URL', trigger: 'blur' }],
  description: [{ required: true, message: '请输入案例描述', trigger: 'blur' }],
  order: [{ required: true, message: '请输入排序值', trigger: 'blur' }]
});

// 初始化加载案例数据
const loadCases = async () => {
  try {
    const response = await casesAPI.getList();
    console.log('加载案例列表响应:', response);
    
    // 处理不同的数据结构格式
    let casesData = [];
    if (response && response.data) {
      // 格式1: {data: [...]}
      casesData = response.data;
    } else if (Array.isArray(response)) {
      // 格式2: [...]直接数组
      casesData = response;
    } else {
      // 格式3: 其他格式
      casesData = [];
    }
    
    // 确保每个案例对象都有必要的字段，添加默认值
    cases.value = casesData.map(item => ({
      ...item,
      _id: item._id || item.id,
      title: item.title || '未命名案例',
      image: item.image || '',
      description: item.description || '',
      order: item.order || 0,
      isActive: item.isActive !== undefined ? item.isActive : true
    }));
    
    console.log('处理后的案例数据:', cases.value);
  } catch (error) {
    console.error('加载案例数据失败:', error);
    ElMessage.error('加载案例数据失败');
    // 使用模拟数据作为备用
    cases.value = [
      {
        _id: '1',
        title: '教育行业案例',
        image: '/images/case1.png',
        description: 'XX教育使用我们的内容管理系统，内容发布效率提升60%',
        order: 1,
        isActive: true
      },
      {
        _id: '2',
        title: '电商行业案例',
        image: '/images/case2.png',
        description: 'YY电商通过轮播图运营，首页点击率增长35%',
        order: 2,
        isActive: true
      }
    ];
  }
};

// 新增/编辑提交逻辑
const handleSubmit = async () => {
  // 表单验证
  if (!form.value.image || !form.value.description || !form.value.order) {
    ElMessage.error('请填写完整信息');
    return;
  }

  try {
    // 打印表单数据用于调试
    console.log('提交的案例数据:', form.value);
    
    if (currentId.value) {
      // 编辑：更新现有数据
      await casesAPI.update(currentId.value, form.value);
      const index = cases.value.findIndex(item => item._id === currentId.value || item.id === currentId.value);
      cases.value[index] = { ...cases.value[index], ...form.value };
      ElMessage.success('编辑成功');
    } else {
      // 新增：生成唯一ID并添加数据
      const newCase = await casesAPI.create(form.value);
      console.log('返回的新案例数据:', newCase);
      // 检查返回数据结构，确保添加到列表中
      cases.value.push(newCase);
      // 重新加载列表确保数据一致性
      await loadCases();
      ElMessage.success('新增成功');
    }

    // 重置对话框状态
    showDialog.value = false;
    form.value = { title: '', image: '', description: '', order: 1, isActive: true };
    currentId.value = null;
  } catch (error) {
    console.error('提交案例数据失败:', error);
    ElMessage.error('提交失败，请稍后重试');
  }
};

// 编辑案例（填充表单数据）
const editCase = (row) => {
  showDialog.value = true;
  form.value = {
    title: row.title || '',
    image: row.image,
    description: row.description,
    order: row.order,
    isActive: row.isActive || true
  };
  // MongoDB使用_id作为唯一标识，但也可能有id字段
  currentId.value = row._id || row.id;
  console.log('编辑案例ID:', currentId.value);
};

// 删除案例（带确认对话框）
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定删除该案例？', '提示', { type: 'warning' });
    
    // 调用API删除
    const deleteId = row._id || row.id;
    console.log('删除案例ID:', deleteId);
    await casesAPI.delete(deleteId);
    cases.value = cases.value.filter(item => item._id !== row._id && item.id !== row.id);
    ElMessage.success('删除成功');
    loadCases(); // 重新加载列表
  } catch (err) {
    if (err !== 'cancel') {
      console.error('删除案例失败:', err);
      ElMessage.error('删除失败，请稍后重试');
    }
  }
};

// 处理状态开关变化
const handleStatusChange = async (row) => {
  try {
    const updateId = row._id || row.id;
    console.log('更新案例状态ID:', updateId);
    await casesAPI.update(updateId, {
      isActive: row.isActive
    });
    ElMessage.success('状态更新成功');
  } catch (error) {
    console.error('更新案例状态失败:', error);
    // 回滚状态
    row.isActive = !row.isActive;
    ElMessage.error('更新状态失败，请稍后重试');
  }
};

// 组件挂载时加载数据
onMounted(() => {
  loadCases();
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

.el-image {
  border-radius: 4px;
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