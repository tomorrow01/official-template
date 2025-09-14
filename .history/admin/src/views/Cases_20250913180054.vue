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
    <el-table :data="cases" border>
      <el-table-column prop="image" label="案例图片" width="200">
        <template #default="scope">
          <el-image 
            :src="scope.row.image" 
            :preview-src-list="[scope.row.image]" 
            style="width: 150px; height: 100px; object-fit: cover"
          />
        </template>
      </el-table-column>
      <el-table-column prop="description" label="案例描述" width="500" />
      <el-table-column prop="order" label="排序" width="100" />
      <el-table-column prop="isActive" label="是否启用" width="100">
        <template #default="scope">
          <el-switch 
            v-model="scope.row.isActive" 
            active-color="#13ce66" 
            inactive-color="#ff4949"
            @change="handleStatusChange(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
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

// 对话框状态管理
const showDialog = ref(false);
const form = ref({ image: '', description: '', order: 1, isActive: true });
const currentId = ref(null); // 当前编辑的案例ID

// 表单验证规则
const rules = ref({
  image: [{ required: true, message: '请输入案例图片URL', trigger: 'blur' }],
  description: [{ required: true, message: '请输入案例描述', trigger: 'blur' }],
  order: [{ required: true, message: '请输入排序值', trigger: 'blur' }]
});

// 初始化加载案例数据
const loadCases = async () => {
  try {
    const response = await axios.get('/api/cases');
    if (response.data.code === 200) {
      cases.value = response.data.data || [];
    } else {
      // 使用模拟数据作为备用
      cases.value = [
        {
          _id: '1',
          image: '/images/case1.png',
          description: 'XX教育使用我们的内容管理系统，内容发布效率提升60%',
          order: 1,
          isActive: true
        },
        {
          _id: '2',
          image: '/images/case2.png',
          description: 'YY电商通过轮播图运营，首页点击率增长35%',
          order: 2,
          isActive: true
        }
      ];
    }
  } catch (error) {
    console.error('加载案例数据失败:', error);
    ElMessage.error('加载案例数据失败');
    // 使用模拟数据作为备用
    cases.value = [
      {
        _id: '1',
        image: '/images/case1.png',
        description: 'XX教育使用我们的内容管理系统，内容发布效率提升60%',
        order: 1,
        isActive: true
      },
      {
        _id: '2',
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
    if (currentId.value) {
      // 编辑：更新现有数据
      const response = await axios.put(`/api/cases/${currentId.value}`, form.value);
      if (response.data.code === 200) {
        const index = cases.value.findIndex(item => item._id === currentId.value);
        cases.value[index] = { ...cases.value[index], ...form.value };
        ElMessage.success('编辑成功');
      } else {
        ElMessage.error('编辑失败: ' + response.data.message);
      }
    } else {
      // 新增：生成唯一ID并添加数据
      const response = await axios.post('/api/cases', form.value);
      if (response.data.code === 201) {
        cases.value.push(response.data.data);
        ElMessage.success('新增成功');
      } else {
        ElMessage.error('新增失败: ' + response.data.message);
      }
    }

    // 重置对话框状态
    showDialog.value = false;
    form.value = { image: '', description: '', order: 1, isActive: true };
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
    image: row.image,
    description: row.description,
    order: row.order,
    isActive: row.isActive || true
  };
  currentId.value = row._id || row.id;
};

// 删除案例（带确认对话框）
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定删除该案例？', '提示', { type: 'warning' });
    
    // 调用API删除
    const response = await axios.delete(`/api/cases/${row._id || row.id}`);
    if (response.data.code === 200) {
      cases.value = cases.value.filter(item => item._id !== row._id && item.id !== row.id);
      ElMessage.success('删除成功');
    } else {
      ElMessage.error('删除失败: ' + response.data.message);
    }
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
    const response = await axios.put(`/api/cases/${row._id || row.id}`, {
      isActive: row.isActive
    });
    if (response.data.code !== 200) {
      // 回滚状态
      row.isActive = !row.isActive;
      ElMessage.error('更新状态失败: ' + response.data.message);
    }
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