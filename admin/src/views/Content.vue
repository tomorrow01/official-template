<template>
  <div>
    <h2 class="text-xl font-bold mb-4">内容管理</h2>
    <el-button 
      type="primary" 
      @click="showDialog = true" 
      class="mb-4"
    >
      新增内容
    </el-button>
    <el-table :data="contents" border>
      <el-table-column prop="title" label="内容标题" width="200" />
      <el-table-column prop="type" label="内容类型" width="120" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <!-- 动态绑定状态类，区分发布/草稿颜色 -->
          <el-tag 
            :class="scope.row.status === '发布' ? 'primary-tag' : 'secondary-tag'"
          >
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="180" />
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <el-button link class="edit-btn" @click="editContent(scope.row)">编辑</el-button>  <!-- 新增edit-btn类 -->
          <el-button link class="delete-btn" @click="handleDelete(scope.row)">删除</el-button>  <!-- 新增delete-btn类 -->
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/编辑对话框 -->
    <el-dialog 
      v-model="showDialog" 
      :title="currentId ? '编辑内容' : '新增内容'" 
      width="50%"
    >
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option label="公告" value="公告" />
            <el-option label="规则" value="规则" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="发布" value="发布" />
            <el-option label="草稿" value="草稿" />
          </el-select>
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
const contents = ref([
  { 
    id: 1, 
    title: '首页公告', 
    type: '公告', 
    status: '发布', 
    updateTime: '2024-07-03 14:30' 
  },
  { 
    id: 2, 
    title: '活动规则', 
    type: '规则', 
    status: '草稿', 
    updateTime: '2024-07-04 10:15' 
  }
]);

// 对话框状态管理
const showDialog = ref(false);
const form = ref({ title: '', type: '', status: '' });
const currentId = ref(null); // 当前编辑的内容ID

// 表单验证规则
const rules = ref({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  type: [{ required: true, message: '请选择类型', trigger: 'change' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }]
});

// 新增/编辑提交逻辑
const handleSubmit = () => {
  // 表单验证
  if (!form.value.title || !form.value.type || !form.value.status) {
    ElMessage.error('请填写完整信息');
    return;
  }

  if (currentId.value) {
    // 编辑：更新现有数据（自动生成更新时间）
    const index = contents.value.findIndex(item => item.id === currentId.value);
    contents.value[index] = { 
      ...contents.value[index], 
      ...form.value, 
      updateTime: new Date().toLocaleString() 
    };
    ElMessage.success('编辑成功');
  } else {
    // 新增：生成唯一ID并添加数据（自动生成更新时间）
    const newId = Date.now();
    contents.value.push({ 
      id: newId, 
      ...form.value, 
      updateTime: new Date().toLocaleString() 
    });
    ElMessage.success('新增成功');
  }

  // 重置对话框状态
  showDialog.value = false;
  form.value = { title: '', type: '', status: '' };
  currentId.value = null;
};

// 编辑内容（填充表单数据）
const editContent = (row) => {
  showDialog.value = true;
  form.value = { title: row.title, type: row.type, status: row.status };
  currentId.value = row.id;
};

// 删除内容（带确认对话框）
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定删除该内容？', '提示', { type: 'warning' });
    contents.value = contents.value.filter(item => item.id !== row.id);
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
  color: var(--text-primary); /* 使用全局变量 */
}

.el-table {
  border: 1px solid var(--border-color); /* 使用全局变量 */
  border-radius: 8px;
  overflow: hidden;
}

/* 发布状态标签样式（使用主题主色） */
.primary-tag {
  background-color: var(--primary-light);
  color: var(--primary-color);
  border: none;
}

/* 草稿状态标签样式（使用次文字色） */
.secondary-tag {
  background-color: var(--bg-base);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}

/* 编辑按钮（绿色） */
.edit-btn {
  color: var(--success-color);
}

/* 删除按钮（红色） */
.delete-btn {
  color: var(--danger-color);
}

/* 发布状态标签（成功绿色） */
.primary-tag {
  background-color: var(--success-light);
  color: var(--success-color);
  border: none;
}

/* 草稿状态标签（危险红色） */
.secondary-tag {
  background-color: var(--danger-light);
  color: var(--danger-color);
  border: 1px solid var(--danger-light);
}
</style>