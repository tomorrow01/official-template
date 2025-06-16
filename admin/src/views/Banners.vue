<template>
  <div>
    <h2 class="text-xl font-bold mb-4">轮播图管理</h2>
    <el-button 
      type="primary" 
      @click="showDialog = true" 
      class="mb-4"
    >
      新增轮播图
    </el-button>
    <el-table :data="banners" border>
      <el-table-column prop="image" label="轮播图" width="200">
        <template #default="scope">
          <el-image 
            :src="scope.row.image" 
            :preview-src-list="[scope.row.image]" 
            style="width: 150px; height: 80px; object-fit: cover"
          />
        </template>
      </el-table-column>
      <el-table-column prop="link" label="跳转链接" width="250" />
      <el-table-column prop="sort" label="排序" width="100" />
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <el-button link class="edit-btn" @click="editBanner(scope.row)">编辑</el-button>  <!-- 新增edit-btn类 -->
          <el-button link class="delete-btn" @click="handleDelete(scope.row)">删除</el-button>  <!-- 新增delete-btn类 -->
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
        <el-form-item label="图片地址" prop="image">
          <el-input v-model="form.image" />
        </el-form-item>
        <el-form-item label="跳转链接" prop="link">
          <el-input v-model="form.link" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="form.sort" min="1" />
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
const banners = ref([
  { 
    id: 1, 
    image: 'https://example.com/banner1.jpg', 
    link: '/article/1', 
    sort: 1 
  },
  { 
    id: 2, 
    image: 'https://example.com/banner2.jpg', 
    link: '/article/2', 
    sort: 2 
  }
]);

// 对话框状态管理
const showDialog = ref(false);
const form = ref({ image: '', link: '', sort: 1 });
const currentId = ref(null); // 当前编辑的轮播图ID

// 表单验证规则
const rules = ref({
  image: [{ required: true, message: '请输入图片地址', trigger: 'blur' }],
  link: [{ required: true, message: '请输入跳转链接', trigger: 'blur' }],
  sort: [{ required: true, message: '请输入排序值', trigger: 'blur' }]
});

// 新增/编辑提交逻辑
const handleSubmit = () => {
  // 表单验证
  if (!form.value.image || !form.value.link || !form.value.sort) {
    ElMessage.error('请填写完整信息');
    return;
  }

  if (currentId.value) {
    // 编辑：更新现有数据
    const index = banners.value.findIndex(item => item.id === currentId.value);
    banners.value[index] = { ...banners.value[index], ...form.value };
    ElMessage.success('编辑成功');
  } else {
    // 新增：生成唯一ID并添加数据
    const newId = Date.now();
    banners.value.push({ id: newId, ...form.value });
    ElMessage.success('新增成功');
  }

  // 重置对话框状态
  showDialog.value = false;
  form.value = { image: '', link: '', sort: 1 };
  currentId.value = null;
};

// 编辑轮播图（填充表单数据）
const editBanner = (row) => {
  showDialog.value = true;
  form.value = { image: row.image, link: row.link, sort: row.sort };
  currentId.value = row.id;
};

// 删除轮播图（带确认对话框）
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定删除该轮播图？', '提示', { type: 'warning' });
    banners.value = banners.value.filter(item => item.id !== row.id);
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
  color: var(--text-primary); /* 补充主题色 */
}

.el-table {
  border: 1px solid var(--border-color); /* 同步主题边框色 */
  border-radius: 8px;
  overflow: hidden;
}

.el-image {
  border-radius: 4px; /* 保持与主题一致的圆角 */
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