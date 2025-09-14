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
    <el-table 
      v-loading="loading"
      element-loading-text="加载中..."
      :data="banners" 
      border
    >
      <el-table-column prop="image" label="轮播图" width="180">
        <template #default="scope">
          <el-image 
            :src="scope.row.image" 
            :preview-src-list="[scope.row.image]"
            fit="cover" 
            style="width: 100px; height: 60px; cursor: pointer;"
          />
        </template>
      </el-table-column>
      <el-table-column prop="link" label="链接地址" width="250" />
      <el-table-column prop="sort" label="排序" width="80" />
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
          <el-button link class="edit-btn" @click="editBanner(scope.row)">编辑</el-button>
          <el-button link class="delete-btn" @click="handleDelete(scope.row)">删除</el-button>
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
        <el-form-item label="轮播图" prop="image">
          <el-input v-model="form.image" placeholder="请输入图片URL" />
        </el-form-item>
        <el-form-item label="链接地址" prop="link">
          <el-input v-model="form.link" placeholder="请输入跳转链接" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="form.sort" :min="0" :precision="0" />
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
import axios from 'axios';

// 表格数据
const banners = ref([]);
const loading = ref(false);

// 对话框状态管理
const showDialog = ref(false);
const form = ref({ 
  image: '', 
  link: '', 
  sort: 0,
  status: true
});
const currentId = ref(null); // 当前编辑的轮播图ID
const formRef = ref(null);

// 表单验证规则
const rules = ref({
  image: [{ required: true, message: '请输入图片URL', trigger: 'blur' }],
  link: [{ required: true, message: '请输入跳转链接', trigger: 'blur' }]
});

// 加载轮播图列表
const loadBanners = async () => {
  try {
    loading.value = true;
    const response = await axios.get('/api/banners');
    banners.value = response.data;
  } catch (error) {
    ElMessage.error('加载轮播图列表失败');
    console.error('Failed to load banners:', error);
  } finally {
    loading.value = false;
  }
};

// 新增/编辑提交逻辑
const handleSubmit = async () => {
  try {
    // 表单验证
    await nextTick();
    if (!form.value.image || !form.value.link) {
      ElMessage.error('请填写完整信息');
      return;
    }

    if (currentId.value) {
      // 编辑：更新现有数据
      await axios.put(`/api/banners/${currentId.value}`, form.value);
      ElMessage.success('编辑成功');
    } else {
      // 新增：添加新数据
      await axios.post('/api/banners', form.value);
      ElMessage.success('新增成功');
    }

    // 重置对话框状态并重新加载列表
    resetForm();
    loadBanners();
  } catch (error) {
    ElMessage.error('操作失败');
    console.error('Failed to submit banner:', error);
  }
};

// 编辑轮播图（填充表单数据）
const editBanner = (row) => {
  showDialog.value = true;
  form.value = {
    image: row.image,
    link: row.link,
    sort: row.sort || 0,
    status: row.status !== undefined ? row.status : true
  };
  currentId.value = row.id;
};

// 删除轮播图（带确认对话框）
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定删除该轮播图？', '提示', { type: 'warning' });
    await axios.delete(`/api/banners/${row.id}`);
    ElMessage.success('删除成功');
    loadBanners(); // 重新加载列表
  } catch (err) {
    if (err !== 'cancel') ElMessage.error('删除失败');
  }
};

// 切换轮播图状态
const toggleStatus = async (row) => {
  try {
    await axios.put(`/api/banners/${row.id}`, { status: row.status });
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
    image: '', 
    link: '', 
    sort: 0,
    status: true
  };
  currentId.value = null;
};

// 初始加载
onMounted(() => {
  loadBanners();
});
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

/* 编辑按钮（绿色） */
.edit-btn {
  color: var(--success-color);
}

/* 删除按钮（红色） */
.delete-btn {
  color: var(--danger-color);
}

/* 轮播图预览样式 */
.el-image {
  border-radius: 4px;
}
</style>