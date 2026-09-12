<template>
  <div>
    <h2 class="text-xl font-bold mb-4">最新动态管理</h2>
    <el-button 
      type="primary" 
      @click="showDialog = true" 
      class="mb-4"
    >
      新增动态
    </el-button>
    <el-table 
      v-loading="loading"
      element-loading-text="加载中..."
      :data="newsList" 
      border
      width="100%"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="title" label="标题" min-width="180" />
      <el-table-column prop="subtitle" label="副标题" min-width="150" />
      <el-table-column prop="intro" label="简介" min-width="200" show-overflow-tooltip />
      <el-table-column prop="author" label="作者" min-width="100" />
      <el-table-column prop="createTime" label="发布时间" min-width="170" />
      <el-table-column prop="status" label="状态" min-width="80">
        <template #default="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="var(--success-color)"
            inactive-color="var(--danger-color)"
            @change="toggleStatus(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template #default="scope">
          <el-button link class="edit-btn" @click="editNews(scope.row)">编辑</el-button>
          <el-button link class="delete-btn" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/编辑对话框 -->
    <el-dialog 
      v-model="showDialog" 
      :title="currentId ? '编辑动态' : '新增动态'" 
      width="70%"
      destroy-on-close
    >
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入动态主标题" />
        </el-form-item>
        <el-form-item label="副标题" prop="subtitle">
          <el-input v-model="form.subtitle" placeholder="请输入动态副标题（选填）" />
        </el-form-item>
        <el-form-item label="简介" prop="intro">
          <el-input v-model="form.intro" type="textarea" :rows="2" placeholder="请输入动态简介，用于列表页展示" />
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author" placeholder="请输入作者名称" />
        </el-form-item>
        <el-form-item label="封面图片" prop="image">
          <CoverUploader v-model="form.image" button-text="上传封面" />
        </el-form-item>
        <el-form-item label="动态内容" prop="content">
          <RichTextEditor v-model="form.content" placeholder="请输入动态详细内容" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model.number="form.sort" placeholder="数值越小越靠前" />
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
import { articlesAPI } from '../utils/api';
import RichTextEditor from '../components/RichTextEditor.vue';
import CoverUploader from '../components/CoverUploader.vue';

// 表格数据
const newsList = ref([]);
const loading = ref(false);

// 对话框状态管理
const showDialog = ref(false);
const form = ref({ 
  title: '', 
  subtitle: '',
  intro: '',
  author: '', 
  content: '',
  image: '',
  sort: 0,
  status: true
});
const currentId = ref(null);
const formRef = ref(null);

// 表单验证规则
const rules = ref({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
});

// 加载最新动态列表
const loadNewsList = async () => {
  try {
    loading.value = true;
    const response = await articlesAPI.getList();
    newsList.value = response.data || [];
  } catch (error) {
    ElMessage.error('加载最新动态列表失败');
    console.error('Failed to load news:', error);
  } finally {
    loading.value = false;
  }
};

// 新增/编辑提交逻辑
const handleSubmit = async () => {
  try {
    await nextTick();
    if (!form.value.title || !form.value.content) {
      ElMessage.error('请填写完整信息');
      return;
    }

    if (currentId.value) {
      await articlesAPI.update(currentId.value, form.value);
      ElMessage.success('编辑成功');
    } else {
      await articlesAPI.create(form.value);
      ElMessage.success('新增成功');
    }

    resetForm();
    loadNewsList();
  } catch (error) {
    console.error('提交失败:', error);
    ElMessage.error('操作失败');
  }
};

// 编辑动态
const editNews = (row) => {
  showDialog.value = true;
  form.value = {
    title: row.title || '',
    subtitle: row.subtitle || '',
    intro: row.intro || '',
    author: row.author || '',
    content: row.content || '',
    image: row.image || '',
    sort: row.sort || 0,
    status: row.status !== undefined ? row.status : true
  };
  currentId.value = row._id || row.id;
};

// 删除动态
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定删除该动态？', '提示', { type: 'warning' });
    const deleteId = row._id || row.id;
    await articlesAPI.delete(deleteId);
    ElMessage.success('删除成功');
    loadNewsList();
  } catch (err) {
    if (err !== 'cancel') ElMessage.error('删除失败');
  }
};

// 切换状态
const toggleStatus = async (row) => {
  try {
    const updateId = row._id || row.id;
    await articlesAPI.update(updateId, { status: row.status });
    ElMessage.success('状态更新成功');
  } catch (error) {
    row.status = !row.status;
    ElMessage.error('状态更新失败');
  }
};

// 重置表单
const resetForm = () => {
  showDialog.value = false;
  form.value = { 
    title: '', 
    subtitle: '',
    intro: '',
    author: '', 
    content: '',
    image: '',
    sort: 0,
    status: true
  };
  currentId.value = null;
};

// 页面加载
onMounted(() => {
  loadNewsList();
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

.edit-btn {
  color: var(--success-color);
}

.delete-btn {
  color: var(--danger-color);
}
</style>
