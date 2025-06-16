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
    <el-table :data="articles" border>
      <el-table-column prop="title" label="标题" width="200" />
      <el-table-column prop="author" label="作者" width="120" />
      <el-table-column prop="createTime" label="发布时间" width="180" />
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <el-button link class="edit-btn" @click="editArticle(scope.row)">编辑</el-button>  <!-- 新增edit-btn类 -->
          <el-button link class="delete-btn" @click="handleDelete(scope.row)">删除</el-button>  <!-- 新增delete-btn类 -->
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
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author" />
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
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

// 保留2条模拟数据（刷新页面后重置）
const articles = ref([
  { id: 1, title: 'Vue3 入门指南', author: '管理员', createTime: '2024-07-01' },
  { id: 2, title: 'Element Plus 教程', author: '管理员', createTime: '2024-07-02' }
]);

// 对话框状态管理
const showDialog = ref(false);
const form = ref({ title: '', author: '' });
const currentId = ref(null); // 当前编辑的文章ID

// 表单验证规则
const rules = ref({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  author: [{ required: true, message: '请输入作者', trigger: 'blur' }]
});

// 新增/编辑提交逻辑
const handleSubmit = () => {
  // 表单验证
  if (!form.value.title || !form.value.author) {
    ElMessage.error('请填写完整信息');
    return;
  }

  if (currentId.value) {
    // 编辑：更新现有数据
    const index = articles.value.findIndex(item => item.id === currentId.value);
    articles.value[index] = { 
      ...articles.value[index], 
      ...form.value, 
      createTime: new Date().toLocaleDateString() // 更新发布时间
    };
    ElMessage.success('编辑成功');
  } else {
    // 新增：生成唯一ID并添加数据
    const newId = Date.now();
    articles.value.push({ 
      id: newId, 
      ...form.value, 
      createTime: new Date().toLocaleDateString() 
    });
    ElMessage.success('新增成功');
  }

  // 重置对话框状态
  showDialog.value = false;
  form.value = { title: '', author: '' };
  currentId.value = null;
};

// 编辑文章（填充表单数据）
const editArticle = (row) => {
  showDialog.value = true;
  form.value = { title: row.title, author: row.author };
  currentId.value = row.id;
};

// 删除文章（带确认对话框）
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定删除该文章？', '提示', { type: 'warning' });
    articles.value = articles.value.filter(item => item.id !== row.id);
    ElMessage.success('删除成功');
  } catch (err) {
    if (err !== 'cancel') ElMessage.error('删除失败');
  }
};
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