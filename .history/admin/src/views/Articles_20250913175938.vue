<template>
  <div>
    <h2 class="text-xl font-bold mb-4">文章管理</h2>
    <el-button 
      type="primary" 
      @click="showDialog = true" 
      class="mb-4"
    >
      新增文章
    </el-button>
    <el-table 
      v-loading="loading"
      element-loading-text="加载中..."
      :data="articles" 
      border
    >
      <el-table-column prop="title" label="标题" width="300" />
      <el-table-column prop="author" label="作者" width="120" />
      <el-table-column prop="createTime" label="发布时间" width="180" />
      <el-table-column prop="status" label="状态" width="80">
        <template #default="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="var(--success-color)"
            inactive-color="var(--danger-color)"
            @change="toggleStatus(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <el-button link class="edit-btn" @click="editArticle(scope.row)">编辑</el-button>
          <el-button link class="delete-btn" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/编辑对话框 -->
    <el-dialog 
      v-model="showDialog" 
      :title="currentId ? '编辑文章' : '新增文章'" 
      width="50%"
    >
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入文章标题" />
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author" placeholder="请输入作者名称" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input 
            v-model="form.content" 
            type="textarea" 
            :rows="6"
            placeholder="请输入文章内容"
          />
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

// 表格数据
const articles = ref([]);
const loading = ref(false);

// 对话框状态管理
const showDialog = ref(false);
const form = ref({ 
  title: '', 
  author: '', 
  content: '',
  sort: 0,
  status: true
});
const currentId = ref(null); // 当前编辑的文章ID
const formRef = ref(null);

// 表单验证规则
const rules = ref({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  author: [{ required: true, message: '请输入作者', trigger: 'blur' }],
  content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
});

// 加载文章列表
const loadArticles = async () => {
  try {
    loading.value = true;
    const response = await axios.get('/api/articles');
    articles.value = response.data;
  } catch (error) {
    ElMessage.error('加载文章列表失败');
    console.error('Failed to load articles:', error);
  } finally {
    loading.value = false;
  }
};

// 新增/编辑提交逻辑
const handleSubmit = async () => {
  try {
    // 表单验证
    await nextTick();
    if (!form.value.title || !form.value.author || !form.value.content) {
      ElMessage.error('请填写完整信息');
      return;
    }

    if (currentId.value) {
      // 编辑：更新现有数据
      await axios.put(`/api/articles/${currentId.value}`, form.value);
      ElMessage.success('编辑成功');
    } else {
      // 新增：添加新数据
      await axios.post('/api/articles', form.value);
      ElMessage.success('新增成功');
    }

    // 重置对话框状态并重新加载列表
    resetForm();
    loadArticles();
  } catch (error) {
    ElMessage.error('操作失败');
    console.error('Failed to submit article:', error);
  }
};

// 编辑文章（填充表单数据）
const editArticle = (row) => {
  showDialog.value = true;
  form.value = {
    title: row.title,
    author: row.author,
    content: row.content || '',
    sort: row.sort || 0,
    status: row.status !== undefined ? row.status : true
  };
  currentId.value = row.id;
};

// 删除文章（带确认对话框）
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定删除该文章？', '提示', { type: 'warning' });
    await axios.delete(`/api/articles/${row.id}`);
    ElMessage.success('删除成功');
    loadArticles(); // 重新加载列表
  } catch (err) {
    if (err !== 'cancel') ElMessage.error('删除失败');
  }
};

// 切换文章状态
const toggleStatus = async (row) => {
  try {
    await axios.put(`/api/articles/${row.id}`, { status: row.status });
    ElMessage.success('状态更新成功');
  } catch (error) {
    ElMessage.error('状态更新失败');
    // 回滚状态
    row.status = !row.status;
  }
};

// 重置表单
const resetForm = () => {
  showDialog.value = false;
  form.value = { 
    title: '', 
    author: '', 
    content: '',
    sort: 0,
    status: true
  };
  currentId.value = null;
};

// 初始加载
onMounted(() => {
  loadArticles();
});
</script>

<style scoped>
.text-xl {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-primary); /* 同步主题色 */
}

.el-table {
  border: 1px solid var(--border-color); /* 同步主题边框色 */
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