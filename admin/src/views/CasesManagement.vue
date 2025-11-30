<template>
  <div>
    <h2 class="text-xl font-bold mb-4">客户案例管理</h2>
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
      :data="casesList" 
      border
      width="100%"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="description" label="案例描述" min-width="300" />
      <el-table-column prop="publishTime" label="发布时间" min-width="180" />
      <el-table-column prop="order" label="排序" min-width="80">
        <template #default="scope">
          <el-input-number v-model="scope.row.order" :min="0" :step="1" @change="updateOrder(scope.row)" />
        </template>
      </el-table-column>
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
        <el-form-item label="案例描述" prop="description">
          <el-input v-model="form.description" placeholder="请输入案例描述" />
        </el-form-item>
        <el-form-item label="图片链接" prop="image">
          <el-input v-model="form.image" placeholder="请输入图片URL" />
        </el-form-item>
        <el-form-item label="发布时间" prop="publishTime">
          <el-date-picker 
            v-model="form.publishTime" 
            type="date" 
            placeholder="选择发布日期" 
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input v-model.number="form.order" placeholder="数值越小越靠前" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="resetForm">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { casesAPI } from '../utils/api';

// 表格数据
const casesList = ref([]);
const loading = ref(false);

// 对话框状态管理
const showDialog = ref(false);
const form = ref({ 
  description: '', 
  image: '',
  publishTime: new Date(),
  order: 0,
  isActive: true
});
const currentId = ref(null); // 当前编辑的案例ID
const formRef = ref(null);

// 表单验证规则
const rules = ref({
  description: [{ required: true, message: '请输入案例描述', trigger: 'blur' }],
  image: [{ required: true, message: '请输入图片URL', trigger: 'blur' }],
  publishTime: [{ required: true, message: '请选择发布时间', trigger: 'change' }]
});

// 加载客户案例列表
const loadCasesList = async () => {
  try {
    loading.value = true;
    const response = await casesAPI.getList();
    // 后端返回的数据结构是{code, data, error}，需要提取data字段
    casesList.value = response.data || [];
  } catch (error) {
    ElMessage.error('加载客户案例列表失败');
    console.error('Failed to load cases:', error);
  } finally {
    loading.value = false;
  }
};

// 新增/编辑提交逻辑
const handleSubmit = async () => {
  try {
    // 表单验证
    await nextTick();
    if (!form.value.description || !form.value.image) {
      ElMessage.error('请填写完整信息');
      return;
    }

    console.log('准备提交案例数据:', form.value);
    
    // 格式化发布时间为字符串
    const submitData = { ...form.value };
    if (typeof submitData.publishTime === 'object') {
      submitData.publishTime = submitData.publishTime.toISOString().split('T')[0];
    }
    
    if (currentId.value) {
      // 编辑：更新现有数据
      console.log('执行更新操作，ID:', currentId.value);
      const updateResponse = await casesAPI.update(currentId.value, submitData);
      console.log('更新响应:', updateResponse);
      ElMessage.success('编辑成功');
    } else {
      // 新增：添加新数据
      console.log('执行新增操作');
      const createResponse = await casesAPI.create(submitData);
      console.log('新增响应:', createResponse);
      ElMessage.success('新增成功');
    }

    // 重置对话框状态并重新加载列表
    resetForm();
    loadCasesList();
  } catch (error) {
    console.error('提交失败详情:', error);
    if (error.response) {
      console.error('响应状态:', error.response.status);
      console.error('响应数据:', error.response.data);
    }
    ElMessage.error('操作失败');
  }
};

// 编辑案例（填充表单数据）
const editCase = (row) => {
  showDialog.value = true;
  form.value = {
    description: row.description || '',
    image: row.image || '',
    publishTime: row.publishTime ? new Date(row.publishTime) : new Date(),
    order: row.order || 0,
    isActive: row.isActive !== undefined ? row.isActive : true
  };
  // MongoDB使用_id作为唯一标识，但也可能有id字段
  currentId.value = row._id || row.id;
  console.log('编辑案例ID:', currentId.value);
};

// 删除案例（带确认对话框）
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定删除该案例？', '提示', { type: 'warning' });
    const deleteId = row._id || row.id;
    console.log('删除案例ID:', deleteId);
    await casesAPI.delete(deleteId);
    ElMessage.success('删除成功');
    loadCasesList(); // 重新加载列表
  } catch (err) {
    if (err !== 'cancel') ElMessage.error('删除失败');
  }
};

// 切换案例状态
const toggleStatus = async (row) => {
  try {
    const updateId = row._id || row.id;
    console.log('更新状态ID:', updateId);
    await casesAPI.update(updateId, { isActive: row.isActive });
    ElMessage.success('状态更新成功');
  } catch (error) {
    ElMessage.error('状态更新失败');
    // 回滚状态
    row.isActive = !row.isActive;
  }
};

// 更新排序
const updateOrder = async (row) => {
  try {
    const updateId = row._id || row.id;
    console.log('更新排序ID:', updateId, '新排序:', row.order);
    await casesAPI.update(updateId, { order: row.order });
    ElMessage.success('排序更新成功');
  } catch (error) {
    ElMessage.error('排序更新失败');
  }
};

// 重置表单
const resetForm = () => {
  form.value = {
    description: '',
    image: '',
    publishTime: new Date(),
    order: 0,
    isActive: true
  };
  currentId.value = null;
  showDialog.value = false;
};

// 页面加载时获取数据
onMounted(() => {
  loadCasesList();
});
</script>

<style scoped>
.edit-btn {
  color: var(--primary-color);
}

.delete-btn {
  color: var(--danger-color);
}
</style>