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
      <el-table-column prop="title" label="案例标题" min-width="180" />
      <el-table-column prop="subtitle" label="副标题" min-width="150" />
      <el-table-column prop="intro" label="简介" min-width="200" show-overflow-tooltip />
      <el-table-column prop="image" label="案例图片" min-width="120">
        <template #default="scope">
          <el-image 
            v-if="scope.row.image"
            :src="normalizeImageUrl(scope.row.image)" 
            :preview-src-list="[normalizeImageUrl(scope.row.image)]" 
            style="width: 100px; height: 60px; object-fit: cover"
          />
          <span v-else style="color: #999;">无</span>
        </template>
      </el-table-column>
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
      width="70%"
      destroy-on-close
    >
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item label="案例标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入案例主标题" />
        </el-form-item>
        <el-form-item label="副标题" prop="subtitle">
          <el-input v-model="form.subtitle" placeholder="请输入案例副标题（选填）" />
        </el-form-item>
        <el-form-item label="简介" prop="intro">
          <el-input v-model="form.intro" type="textarea" :rows="2" placeholder="请输入案例简介，用于列表页展示" />
        </el-form-item>
        <el-form-item label="案例图片" prop="image">
          <CoverUploader v-model="form.image" button-text="上传案例图片" />
        </el-form-item>
        <el-form-item label="案例详情" prop="description">
          <RichTextEditor v-model="form.description" placeholder="请输入案例详细描述" />
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input-number v-model="form.order" :min="0" :step="1" />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="form.isActive" active-color="#13ce66" inactive-color="#ff4949" />
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
import { normalizeImageUrl } from '../utils/imageUrl';
import RichTextEditor from '../components/RichTextEditor.vue';
import CoverUploader from '../components/CoverUploader.vue';

// 表格数据
const casesList = ref([]);
const loading = ref(false);

// 对话框状态管理
const showDialog = ref(false);
const form = ref({ 
  title: '', 
  subtitle: '',
  intro: '',
  description: '', 
  image: '',
  order: 0,
  isActive: true
});
const currentId = ref(null);
const formRef = ref(null);

// 表单验证规则
const rules = ref({
  title: [{ required: true, message: '请输入案例标题', trigger: 'blur' }],
  description: [{ required: true, message: '请输入案例详情', trigger: 'blur' }]
});

// 加载客户案例列表
const loadCasesList = async () => {
  try {
    loading.value = true;
    const response = await casesAPI.getList();
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
    await nextTick();
    if (!form.value.title || !form.value.description) {
      ElMessage.error('请填写完整信息');
      return;
    }

    if (currentId.value) {
      await casesAPI.update(currentId.value, form.value);
      ElMessage.success('编辑成功');
    } else {
      await casesAPI.create(form.value);
      ElMessage.success('新增成功');
    }

    resetForm();
    loadCasesList();
  } catch (error) {
    console.error('提交失败:', error);
    ElMessage.error('操作失败');
  }
};

// 编辑案例（填充表单数据）
const editCase = (row) => {
  showDialog.value = true;
  form.value = {
    title: row.title || '',
    subtitle: row.subtitle || '',
    intro: row.intro || '',
    description: row.description || '',
    image: row.image || '',
    order: row.order || 0,
    isActive: row.isActive !== undefined ? row.isActive : true
  };
  currentId.value = row._id || row.id;
};

// 删除案例
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定删除该案例？', '提示', { type: 'warning' });
    const deleteId = row._id || row.id;
    await casesAPI.delete(deleteId);
    ElMessage.success('删除成功');
    loadCasesList();
  } catch (err) {
    if (err !== 'cancel') ElMessage.error('删除失败');
  }
};

// 切换状态
const toggleStatus = async (row) => {
  try {
    const updateId = row._id || row.id;
    await casesAPI.update(updateId, { isActive: row.isActive });
    ElMessage.success('状态更新成功');
  } catch (error) {
    row.isActive = !row.isActive;
    ElMessage.error('状态更新失败');
  }
};

// 更新排序
const updateOrder = async (row) => {
  try {
    const updateId = row._id || row.id;
    await casesAPI.update(updateId, { order: row.order });
    ElMessage.success('排序更新成功');
  } catch (error) {
    ElMessage.error('排序更新失败');
  }
};

// 重置表单
const resetForm = () => {
  showDialog.value = false;
  form.value = {
    title: '',
    subtitle: '',
    intro: '',
    description: '',
    image: '',
    order: 0,
    isActive: true
  };
  currentId.value = null;
};

// 页面加载
onMounted(() => {
  loadCasesList();
});
</script>

<style scoped>
.edit-btn {
  color: var(--success-color);
}

.delete-btn {
  color: var(--danger-color);
}
</style>
