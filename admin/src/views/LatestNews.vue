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
      <el-table-column prop="title" label="标题" min-width="300" />
      <el-table-column prop="createTime" label="发布时间" min-width="180" />
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
      width="50%"
    >
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入动态标题" />
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author" placeholder="请输入作者名称" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input 
            v-model="form.content" 
            type="textarea" 
            :rows="6"
            placeholder="请输入动态内容"
          />
        </el-form-item>
        <el-form-item label="图片上传" prop="image">
          <el-upload
            class="image-uploader"
            :before-upload="beforeUpload"
            :on-change="handleFileChange"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
            list-type="picture-card"
          >
            <el-icon class="el-icon--plus">Plus</el-icon>
            <template #tip>
              <div class="el-upload__tip">
                只能上传 JPG/PNG 格式，且不超过 5MB
              </div>
            </template>
          </el-upload>
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
import { Plus } from '@element-plus/icons-vue';
import { articlesAPI } from '../utils/api';

// 表格数据
const newsList = ref([]);
const loading = ref(false);

// 对话框状态管理
const showDialog = ref(false);
const form = ref({ 
  title: '', 
  author: '', 
  content: '',
  image: '',
  sort: 0,
  status: true
});
const currentId = ref(null); // 当前编辑的动态ID
const formRef = ref(null);

// 图片上传配置
const fileList = ref([]);

// 表单验证规则
const rules = ref({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
  image: [{ required: true, message: '请上传图片', trigger: 'change' }]
});

// 加载最新动态列表
const loadNewsList = async () => {
  try {
    loading.value = true;
    const response = await articlesAPI.getList();
    // 后端返回的数据结构是{code, data, error}，需要提取data字段
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
    // 表单验证
    await nextTick();
    if (!form.value.title || !form.value.content) {
      ElMessage.error('请填写完整信息');
      return;
    }

    console.log('准备提交动态数据:', form.value);
    
    if (currentId.value) {
      // 编辑：更新现有数据
      console.log('执行更新操作，ID:', currentId.value);
      const updateResponse = await articlesAPI.update(currentId.value, form.value);
      console.log('更新响应:', updateResponse);
      ElMessage.success('编辑成功');
    } else {
      // 新增：添加新数据
      console.log('执行新增操作');
      const createResponse = await articlesAPI.create(form.value);
      console.log('新增响应:', createResponse);
      ElMessage.success('新增成功');
    }

    // 重置对话框状态并重新加载列表
    resetForm();
    loadNewsList();
  } catch (error) {
    console.error('提交失败详情:', error);
    if (error.response) {
      console.error('响应状态:', error.response.status);
      console.error('响应数据:', error.response.data);
    }
    ElMessage.error('操作失败');
  }
};

// 编辑动态（填充表单数据）
const editNews = (row) => {
  showDialog.value = true;
  form.value = {
    title: row.title,
    author: row.author || '',
    content: row.content || '',
    image: row.image || '',
    sort: row.sort || 0,
    status: row.status !== undefined ? row.status : true
  };
  // MongoDB使用_id作为唯一标识，但也可能有id字段
  currentId.value = row._id || row.id;
  
  // 初始化图片列表
  if (row.image) {
    fileList.value = [{
      url: row.image,
      name: row.image.split('/').pop()
    }];
  } else {
    fileList.value = [];
  }
  
  console.log('编辑动态ID:', currentId.value);
};

// 删除动态（带确认对话框）
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定删除该动态？', '提示', { type: 'warning' });
    const deleteId = row._id || row.id;
    console.log('删除动态ID:', deleteId);
    await articlesAPI.delete(deleteId);
    ElMessage.success('删除成功');
    loadNewsList(); // 重新加载列表
  } catch (err) {
    if (err !== 'cancel') ElMessage.error('删除失败');
  }
};

// 切换动态状态
const toggleStatus = async (row) => {
  try {
    const updateId = row._id || row.id;
    console.log('更新状态ID:', updateId);
    await articlesAPI.update(updateId, { status: row.status });
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
    image: '',
    sort: 0,
    status: true
  };
  currentId.value = null;
  fileList.value = [];
};

// 上传前检查
const beforeUpload = (file) => {
  const isImage = /^image\//.test(file.type);
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isImage) {
    ElMessage.error('只能上传图片文件!');
    return false;
  }
  if (!isLt5M) {
    ElMessage.error('图片大小不能超过5MB!');
    return false;
  }
  return true;
};

// 文件选择处理，转换为base64
const handleFileChange = (file) => {
  if (file.status === 'ready') {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Data = e.target.result;
      form.value.image = base64Data;
      // 更新文件列表，显示预览
      fileList.value = [{ 
        url: base64Data, 
        name: file.name,
        status: 'success'
      }];
      ElMessage.success('图片加载成功');
    };
    reader.onerror = () => {
      ElMessage.error('图片加载失败');
    };
    reader.readAsDataURL(file.raw);
  }
};

// 移除图片处理
const handleRemove = (file, fileList) => {
  form.value.image = '';
};

// 初始加载
onMounted(() => {
  loadNewsList();
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