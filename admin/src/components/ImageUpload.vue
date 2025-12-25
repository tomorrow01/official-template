<template>
  <div class="image-upload-container">
    <el-upload
      v-model:file-list="imageList"
      :before-upload="beforeUpload"
      :on-change="handleFileChange"
      :on-remove="handleImageRemove"
      :on-preview="handleImagePreview"
      list-type="picture-card"
      :auto-upload="false"
    >
      <el-icon><Plus /></el-icon>
      <template #file="{ file }">
        <img :src="file.url" alt="图片预览" class="w-full h-full object-cover" />
      </template>
      <template #tip>
        <div class="el-upload__tip text-sm text-gray-500">
          只能上传jpg/png/gif/webp文件，且不超过5MB
        </div>
      </template>
    </el-upload>
    
    <!-- 图片预览对话框 -->
    <el-dialog v-model="imagePreviewVisible" title="图片预览" width="80%">
      <img :src="imagePreviewUrl" alt="图片预览" class="w-full" />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';

// 定义props
const props = defineProps({
  // 初始图片URL
  modelValue: {
    type: String,
    default: ''
  },
  // 是否支持多选
  multiple: {
    type: Boolean,
    default: false
  },
  // 最大上传数量
  limit: {
    type: Number,
    default: 1
  }
});

// 定义事件
const emit = defineEmits(['update:modelValue', 'change']);

// 图片列表
const imageList = ref([]);
// 图片预览
const imagePreviewVisible = ref(false);
const imagePreviewUrl = ref('');

// 监听初始图片URL变化
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    imageList.value = [{
      url: newValue,
      name: '已上传图片',
      status: 'success'
    }];
  } else {
    imageList.value = [];
  }
}, { immediate: true });

// 上传前检查
const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    ElMessage.error('只能上传图片文件');
    return false;
  }
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    ElMessage.error('图片大小不能超过5MB');
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
      // 更新图片列表，显示预览
      imageList.value = [{
        url: base64Data,
        name: file.name,
        status: 'success'
      }];
      // 更新绑定值
      emit('update:modelValue', base64Data);
      emit('change', base64Data);
      ElMessage.success('图片加载成功');
    };
    reader.onerror = () => {
      ElMessage.error('图片加载失败');
    };
    reader.readAsDataURL(file.raw);
  }
};

// 图片移除处理
const handleImageRemove = () => {
  imageList.value = [];
  emit('update:modelValue', '');
  emit('change', '');
  ElMessage.success('图片已移除');
};

// 图片预览处理
const handleImagePreview = (file) => {
  imagePreviewUrl.value = file.url;
  imagePreviewVisible.value = true;
};
</script>

<style scoped>
.image-upload-container {
  width: 100%;
}

:deep(.el-upload--picture-card) {
  width: 100%;
  height: 200px;
}

:deep(.el-upload-list--picture-card) {
  width: 100%;
}

:deep(.el-upload-list__item) {
  width: 100%;
  height: 200px;
}
</style>