<template>
  <div class="contacts-management">
    <div class="page-header">
      <h1 class="text-2xl font-bold mb-4">联系我们管理</h1>
      <p class="text-gray-500 mb-6">管理用户通过联系我们页面提交的表单数据</p>
    </div>

    <!-- 搜索和筛选 -->
    <div class="search-filter mb-6 p-4 bg-gray-50 rounded-lg">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            v-model="searchQuery"
            placeholder="搜索姓名、邮箱或主题"
            prefix-icon="el-icon-search"
            clearable
          />
        </el-col>
        <el-col :span="6">
          <el-select
            v-model="statusFilter"
            placeholder="选择状态"
            clearable
          >
            <el-option label="待处理" value="pending"></el-option>
            <el-option label="处理中" value="processing"></el-option>
            <el-option label="已完成" value="completed"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
          />
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" @click="deleteSelectedContacts" :disabled="multipleSelection.length === 0">批量删除</el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 数据表格 -->
    <el-card shadow="hover" class="mb-6">
      <el-table
        :data="contactsList"
        style="width: 100%"
        v-loading="loading"
        empty-text="暂无联系表单数据"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="姓名" min-width="120"></el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="180"></el-table-column>
        <el-table-column prop="phone" label="电话" min-width="150"></el-table-column>
        <el-table-column prop="subject" label="主题" min-width="180"></el-table-column>
        <el-table-column prop="status" label="状态" min-width="100">
          <template #default="scope">
            <el-tag
              :type="
                scope.row.status === 'pending' ? 'warning' :
                scope.row.status === 'processing' ? 'primary' : 'success'
              "
            >
              {{ statusMap[scope.row.status] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="提交时间" min-width="180">
          <template #default="scope">
            {{ formatDate(scope.row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="200" fixed="right">
          <template #default="scope">
            <el-button type="primary" size="small" @click="viewContact(scope.row)">查看详情</el-button>
            <el-dropdown @command="handleStatusChange(scope.row, $event)">
              <el-button type="text" size="small">
                修改状态
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="pending">待处理</el-dropdown-item>
                  <el-dropdown-item command="processing">处理中</el-dropdown-item>
                  <el-dropdown-item command="completed">已完成</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-button type="danger" size="small" @click="deleteContact(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分页 -->
    <div class="pagination-container flex justify-end">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 详情对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="联系表单详情"
      width="60%"
    >
      <div v-if="selectedContact" class="contact-detail">
        <el-descriptions :column="1" border>
          <el-descriptions-item label="姓名">{{ selectedContact.name }}</el-descriptions-item>
          <el-descriptions-item label="邮箱">{{ selectedContact.email }}</el-descriptions-item>
          <el-descriptions-item label="电话">{{ selectedContact.phone }}</el-descriptions-item>
          <el-descriptions-item label="主题">{{ selectedContact.subject }}</el-descriptions-item>
          <el-descriptions-item label="内容" :span="2">
            <div class="content-text whitespace-pre-wrap">{{ selectedContact.content }}</div>
          </el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag
              :type="
                selectedContact.status === 'pending' ? 'warning' :
                selectedContact.status === 'processing' ? 'primary' : 'success'
              "
            >
              {{ statusMap[selectedContact.status] }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="提交时间">{{ formatDate(selectedContact.createdAt) }}</el-descriptions-item>
          <el-descriptions-item label="更新时间">{{ formatDate(selectedContact.updatedAt) }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { contactsAPI } from '../utils/api';

// 状态映射
const statusMap = {
  pending: '待处理',
  processing: '处理中',
  completed: '已完成'
};

// 表格数据
const contactsList = ref([]);
const loading = ref(false);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

// 搜索和筛选
const searchQuery = ref('');
const statusFilter = ref('');
const dateRange = ref([]);

// 详情对话框
const dialogVisible = ref(false);
const selectedContact = ref(null);

// 选中的行
const multipleSelection = ref([]);

// 获取联系表单列表
const fetchContacts = async () => {
  loading.value = true;
  try {
    const params = {
      page: currentPage.value,
      pageSize: pageSize.value,
      query: searchQuery.value,
      status: statusFilter.value
    };
    
    if (dateRange.value && dateRange.value.length === 2) {
      params.startDate = dateRange.value[0];
      params.endDate = dateRange.value[1];
    }

    const response = await contactsAPI.getList(params);
    
    if (response.code === 200) {
      contactsList.value = response.data.list;
      total.value = response.data.total;
    } else {
      ElMessage.error(response.message || '获取联系表单数据失败');
    }
  } catch (error) {
    ElMessage.error('获取联系表单数据失败');
    console.error('获取联系表单数据失败:', error);
    console.error('错误详情:', JSON.stringify(error, null, 2));
    if (error.response) {
      console.error('响应状态:', error.response.status);
      console.error('响应数据:', error.response.data);
    }
  } finally {
    loading.value = false;
  }
};

// 搜索
const handleSearch = () => {
  currentPage.value = 1;
  fetchContacts();
};

// 分页处理
const handleSizeChange = (size) => {
  pageSize.value = size;
  fetchContacts();
};

const handleCurrentChange = (current) => {
  currentPage.value = current;
  fetchContacts();
};

// 查看详情
const viewContact = (row) => {
  selectedContact.value = { ...row };
  dialogVisible.value = true;
};

// 修改状态
const handleStatusChange = async (row, status) => {
  try {
    const response = await contactsAPI.update(row._id, {
      status
    });
    
    if (response.code === 200) {
      ElMessage.success('状态更新成功');
      row.status = status;
    } else {
      ElMessage.error(response.message || '状态更新失败');
    }
  } catch (error) {
    ElMessage.error('状态更新失败');
    console.error('状态更新失败:', error);
  }
};

// 处理选择变化
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};

// 删除单个联系表单
const deleteContact = async (row) => {
  try {
    await ElMessageBox.confirm('确定要删除这条联系表单吗？', '删除确认', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    });
    
    const response = await contactsAPI.delete(row._id);
    
    if (response.code === 200) {
      ElMessage.success('删除成功');
      // 重新获取数据
      fetchContacts();
    } else {
      ElMessage.error(response.message || '删除失败');
    }
  } catch (error) {
    if (error === 'cancel') {
      return;
    }
    ElMessage.error('删除失败');
    console.error('删除失败:', error);
  }
};

// 批量删除联系表单
const deleteSelectedContacts = async () => {
  if (multipleSelection.value.length === 0) {
    ElMessage.warning('请选择要删除的联系表单');
    return;
  }
  
  try {
    await ElMessageBox.confirm(`确定要删除选中的${multipleSelection.value.length}条联系表单吗？`, '批量删除确认', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    });
    
    // 批量删除，这里假设后端支持批量删除接口
    // 如果后端不支持，可以循环调用单个删除接口
    for (const contact of multipleSelection.value) {
      await contactsAPI.delete(contact._id);
    }
    
    ElMessage.success('批量删除成功');
    // 重新获取数据
    fetchContacts();
    // 清空选择
    multipleSelection.value = [];
  } catch (error) {
    if (error === 'cancel') {
      return;
    }
    ElMessage.error('批量删除失败');
    console.error('批量删除失败:', error);
  }
};

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
};

// 初始加载
onMounted(() => {
  fetchContacts();
});
</script>

<style scoped>
.contacts-management {
  padding: 20px;
}

.page-header h1 {
  margin-bottom: 8px;
  color: #303133;
}

.page-header p {
  color: #909399;
  margin-bottom: 24px;
}

.search-filter {
  margin-bottom: 24px;
  background-color: #f5f7fa;
  border-radius: 6px;
}

.contact-detail {
  padding: 10px 0;
}

.content-text {
  line-height: 1.8;
  font-size: 14px;
  color: #606266;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

/* 自定义样式 */
:deep(.el-table .el-table__row) {
  transition: background-color 0.2s;
}

:deep(.el-table .el-table__row:hover) {
  background-color: #fafafa;
}

:deep(.el-button--primary) {
  background-color: #409eff;
}

:deep(.el-tag) {
  padding: 0 8px;
  height: 22px;
  line-height: 22px;
}
</style>