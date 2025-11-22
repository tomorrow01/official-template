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
      width="100%"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="imageUrl" label="轮播图" min-width="180">
        <template #default="scope">
          <el-image 
            :src="scope.row.imageUrl || scope.row.image" 
            :preview-src-list="[scope.row.imageUrl || scope.row.image]"
            fit="cover" 
            style="width: 100px; height: 60px; cursor: pointer;"
          />
        </template>
      </el-table-column>
      <el-table-column prop="link" label="链接地址" min-width="250" />
      <el-table-column prop="order" label="排序" min-width="80" />
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
        <el-form-item label="轮播图" prop="imageUrl">
          <el-input v-model="form.imageUrl" placeholder="请输入图片URL" />
        </el-form-item>
        <el-form-item label="链接地址" prop="link">
          <el-input v-model="form.link" placeholder="请输入跳转链接" />
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input-number v-model="form.order" :min="0" :precision="0" />
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
import { bannersAPI } from '../utils/api';

// 表格数据
const banners = ref([]);
const loading = ref(false);

// 对话框状态管理
const showDialog = ref(false);
const form = ref({ 
  imageUrl: '', 
  link: '', 
  order: 0,
  isActive: true
});
const currentId = ref(null); // 当前编辑的轮播图ID
const formRef = ref(null);

// 表单验证规则
const rules = ref({
  imageUrl: [{ required: true, message: '请输入图片URL', trigger: 'blur' }],
  link: [{ required: true, message: '请输入跳转链接', trigger: 'blur' }]
});

// 加载轮播图列表
const loadBanners = async () => {
  try {
    loading.value = true;
    const response = await bannersAPI.getList();
    // 后端返回的数据结构是{code, data, error}，需要提取data字段
    banners.value = response.data || [];
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
    if (!form.value.imageUrl || !form.value.link) {
      ElMessage.error('请填写完整信息');
      return;
    }

    if (currentId.value) {
      // 编辑：更新现有数据
      console.log('编辑轮播图数据:', form.value);
      await bannersAPI.update(currentId.value, form.value);
      // 更新本地列表中的数据
      const index = banners.value.findIndex(item => item._id === currentId.value || item.id === currentId.value);
      if (index !== -1) {
        banners.value[index] = { ...banners.value[index], ...form.value };
      }
      ElMessage.success('编辑成功');
    } else {
      // 新增：添加新数据
      console.log('新增轮播图数据:', form.value);
      const newBanner = await bannersAPI.create(form.value);
      console.log('新增轮播图返回:', newBanner);
      // 将新数据添加到列表中
      banners.value.push(newBanner);
      ElMessage.success('新增成功');
    }

    // 重置对话框状态并重新加载列表确保数据一致性
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
    imageUrl: row.imageUrl || row.image,
    link: row.link,
    order: row.order || row.sort || 0,
    isActive: row.isActive !== undefined ? row.isActive : (row.status !== undefined ? row.status : true)
  };
  // MongoDB使用_id作为唯一标识，但也可能有id字段
  currentId.value = row._id || row.id;
  console.log('编辑轮播图ID:', currentId.value);
};

// 删除轮播图（带确认对话框）
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定删除该轮播图？', '提示', { type: 'warning' });
    const deleteId = row._id || row.id;
    console.log('删除轮播图ID:', deleteId);
    await bannersAPI.delete(deleteId);
    ElMessage.success('删除成功');
    loadBanners(); // 重新加载列表
  } catch (err) {
    if (err !== 'cancel') ElMessage.error('删除失败');
  }
};

// 切换轮播图状态
const toggleStatus = async (row) => {
  try {
    const updateId = row._id || row.id;
    console.log('更新状态ID:', updateId);
    await bannersAPI.update(updateId, { isActive: row.isActive });
    ElMessage.success('状态更新成功');
  } catch (error) {
    ElMessage.error('状态更新失败');
    // 回滚状态
    row.isActive = !row.isActive;
  }
};

// 重置表单
const resetForm = () => {
  showDialog.value = false;
  form.value = { 
    imageUrl: '', 
    link: '', 
    order: 0,
    isActive: true
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