<template>
  <div>
    <h2 class="page-title">账号管理</h2>
    <p class="page-desc">管理后台登录账号，只有管理员可访问此页面</p>

    <!-- 新增按钮 -->
    <el-button type="primary" @click="openDialog()" :disabled="!isAdmin" class="mb-4">
      新增账号
    </el-button>

    <!-- 用户列表 -->
    <el-table v-loading="loading" :data="users" border width="100%">
      <el-table-column prop="username" label="用户名" min-width="160">
        <template #default="{ row }">
          <div class="user-cell">
            <el-avatar size="small" :style="avatarStyle(row.username)">
              {{ avatarText(row.username) }}
            </el-avatar>
            <span class="user-name">{{ row.username }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="角色" width="100">
        <template #default="{ row }">
          <el-tag :type="row.role === 'admin' ? 'danger' : 'info'" size="small">
            {{ row.role === 'admin' ? '管理员' : '编辑' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="isActive" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.isActive ? 'success' : 'danger'" size="small">
            {{ row.isActive ? '启用' : '停用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="lastLoginAt" label="最后登录" min-width="160">
        <template #default="{ row }">
          {{ row.lastLoginAt ? formatDate(row.lastLoginAt) : '从未登录' }}
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间" min-width="160">
        <template #default="{ row }">
          {{ formatDate(row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="260" fixed="right">
        <template #default="{ row }">
          <el-button link @click="openDialog(row)">编辑</el-button>
          <el-button link type="warning" @click="handleResetPassword(row)">重置密码</el-button>
          <el-button link type="danger" @click="handleToggleStatus(row)">
            {{ row.isActive ? '停用' : '启用' }}
          </el-button>
          <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/编辑 dialog -->
    <el-dialog 
      v-model="showDialog" 
      :title="editingId ? '编辑账号' : '新增账号'" 
      width="480px"
      destroy-on-close
    >
      <el-form :model="form" :rules="formRules" ref="formRef" label-width="90px">
        <el-form-item label="用户名" prop="username">
          <el-input 
            v-model="form.username" 
            placeholder="3-30 个字符" 
            :disabled="!!editingId"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!editingId">
          <el-input v-model="form.password" type="password" show-password placeholder="至少 6 个字符" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-radio-group v-model="form.role">
            <el-radio value="admin">管理员</el-radio>
            <el-radio value="editor">编辑</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch 
            v-model="form.isActive" 
            active-text="启用" 
            inactive-text="停用"
            active-color="#13ce66" 
            inactive-color="#ff4949"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" :loading="submitting" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>

    <!-- 重置密码 dialog -->
    <el-dialog v-model="resetDialogVisible" title="重置密码" width="420px" destroy-on-close>
      <p>即将为用户 <b>{{ resetTarget?.username }}</b> 重置密码</p>
      <el-form :model="resetForm" label-width="100px" class="mt-4">
        <el-form-item label="新密码">
          <el-input v-model="resetForm.newPassword" type="password" show-password placeholder="至少 6 个字符" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="resetDialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="resetting" @click="doResetPassword">确定重置</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { usersAPI, getCurrentUser } from '../utils/api';

const isAdmin = ref(getCurrentUser()?.role === 'admin');

// ===== 头像工具 =====
const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #1e90ff, #00bfff)',
  'linear-gradient(135deg, #9370db, #6a5acd)',
  'linear-gradient(135deg, #ff6b6b, #ee5a24)',
  'linear-gradient(135deg, #26de81, #20bf6b)',
  'linear-gradient(135deg, #fd9644, #fa8231)',
  'linear-gradient(135deg, #a55eea, #8854d0)'
];
function avatarText(username) {
  if (!username) return '+';
  const c = username.trim().charAt(0);
  return c ? c.toUpperCase() : '+';
}
function avatarStyle(username) {
  const idx = [...(username || '')].reduce((s, c) => s + c.charCodeAt(0), 0) % AVATAR_GRADIENTS.length;
  return {
    background: AVATAR_GRADIENTS[idx],
    color: '#fff',
    fontSize: '12px',
    fontWeight: 600,
    border: '2px solid #fff',
    boxShadow: '0 1px 4px rgba(0,0,0,0.15)'
  };
}

const loading = ref(false);
const submitting = ref(false);
const users = ref([]);
const showDialog = ref(false);
const editingId = ref(null);
const formRef = ref(null);

// 新增/编辑表单
const form = ref({
  username: '',
  password: '',
  role: 'editor',
  isActive: true
});

const formRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 30, message: '用户名 3-30 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少 6 个字符', trigger: 'blur' }
  ],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }]
};

// 重置密码
const resetDialogVisible = ref(false);
const resetting = ref(false);
const resetTarget = ref(null);
const resetForm = ref({ newPassword: '' });

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

async function loadUsers() {
  loading.value = true;
  try {
    const res = await usersAPI.getList();
    users.value = res.data || [];
  } catch {
    // 错误已拦截器弹了
  } finally {
    loading.value = false;
  }
}

function openDialog(row = null) {
  if (row) {
    editingId.value = row._id;
    form.value = {
      username: row.username,
      password: '',
      role: row.role,
      isActive: row.isActive
    };
  } else {
    editingId.value = null;
    form.value = { username: '', password: '', role: 'editor', isActive: true };
  }
  showDialog.value = true;
}

async function handleSubmit() {
  if (!formRef.value) return;
  await formRef.value.validate(async (valid) => {
    if (!valid) return;
    submitting.value = true;
    try {
      if (editingId.value) {
        await usersAPI.update(editingId.value, {
          role: form.value.role,
          isActive: form.value.isActive
        });
        ElMessage.success('更新成功');
      } else {
        await usersAPI.create({
          username: form.value.username,
          password: form.value.password,
          role: form.value.role,
          isActive: form.value.isActive
        });
        ElMessage.success('账号创建成功');
      }
      showDialog.value = false;
      await loadUsers();
    } catch {
      // 错误已拦截器处理
    } finally {
      submitting.value = false;
    }
  });
}

async function handleToggleStatus(row) {
  const action = row.isActive ? '停用' : '启用';
  try {
    await ElMessageBox.confirm(`确定要${action}账号 "${row.username}" 吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    });
    await usersAPI.update(row._id, { isActive: !row.isActive });
    ElMessage.success(`${action}成功`);
    await loadUsers();
  } catch (e) {
    if (e !== 'cancel') { /* 拦截器已弹错 */ }
  }
}

async function handleDelete(row) {
  if (row.username === getCurrentUser()?.username) {
    ElMessage.warning('不能删除自己的账号'); return;
  }
  try {
    await ElMessageBox.confirm(`确定要删除账号 "${row.username}" 吗？此操作不可恢复！`, '警告', {
      confirmButtonText: '确定删除',
      cancelButtonText: '取消',
      type: 'error'
    });
    await usersAPI.delete(row._id);
    ElMessage.success('删除成功');
    await loadUsers();
  } catch (e) {
    if (e !== 'cancel') { /* 拦截器已弹错 */ }
  }
}

function handleResetPassword(row) {
  resetTarget.value = row;
  resetForm.value.newPassword = '';
  resetDialogVisible.value = true;
}

async function doResetPassword() {
  if (!resetForm.value.newPassword || resetForm.value.newPassword.length < 6) {
    ElMessage.warning('新密码至少 6 个字符'); return;
  }
  resetting.value = true;
  try {
    await usersAPI.resetPassword(resetTarget.value._id, resetForm.value.newPassword);
    ElMessage.success('密码重置成功');
    resetDialogVisible.value = false;
  } catch { /* 拦截器已弹错 */ }
  finally { resetting.value = false; }
}

onMounted(() => {
  if (isAdmin.value) {
    loadUsers();
  }
});
</script>

<style scoped>
.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 6px 0;
}

.page-desc {
  font-size: 13px;
  color: #909399;
  margin: 0 0 16px 0;
}

.mb-4 { margin-bottom: 16px; }
.mt-4 { margin-top: 16px; }

/* 用户列表头像行 */
.user-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-name {
  font-weight: 500;
  color: #303133;
}
</style>
