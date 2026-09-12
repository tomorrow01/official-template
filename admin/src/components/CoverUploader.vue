<template>
  <div class="cover-uploader">
    <!-- 已上传图片预览 -->
    <div v-if="modelValue" class="cover-preview">
      <img :src="normalizeImageUrl(modelValue)" :alt="alt">
    </div>
    <input
      ref="inputRef"
      type="file"
      accept="image/*"
      style="display: none;"
      @change="handleChange"
    >
    <el-button
      size="small"
      :loading="uploading"
      @click="triggerSelect"
    >
      {{ modelValue ? '更换图片' : buttonText }}
    </el-button>
    <el-button
      v-if="modelValue"
      size="small"
      type="danger"
      plain
      @click="handleRemove"
    >
      移除
    </el-button>
    <span v-if="tip" class="cover-tip">{{ tip }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { uploadAPI } from '../utils/api';
import { normalizeImageUrl } from '../utils/imageUrl';

const props = defineProps({
  // v-model 绑定的图片地址（后端返回相对路径，如 /uploads/xxx.jpg）
  modelValue: {
    type: String,
    default: ''
  },
  // 未上传时按钮文案
  buttonText: {
    type: String,
    default: '上传图片'
  },
  // 底部提示文案，传空字符串可隐藏
  tip: {
    type: String,
    default: '支持 jpg/png/gif/webp，大小不超过 5MB'
  },
  alt: {
    type: String,
    default: '图片预览'
  },
  // 大小上限（字节），默认 5MB
  maxSize: {
    type: Number,
    default: 5 * 1024 * 1024
  }
});

const emit = defineEmits(['update:modelValue']);

const inputRef = ref(null);
const uploading = ref(false);

const triggerSelect = () => {
  if (inputRef.value) inputRef.value.click();
};

const handleRemove = () => {
  emit('update:modelValue', '');
};

const handleChange = async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    ElMessage.error('请选择图片文件');
    event.target.value = '';
    return;
  }
  if (file.size > props.maxSize) {
    ElMessage.error('图片大小不能超过 5MB');
    event.target.value = '';
    return;
  }
  try {
    uploading.value = true;
    // 走统一 api 实例：自动带 token，401 时统一提示并跳登录页
    const url = await uploadAPI.uploadImage(file);
    if (url) {
      emit('update:modelValue', url);
      ElMessage.success('图片上传成功');
    } else {
      ElMessage.error('上传失败：未获取到图片地址');
    }
  } catch (err) {
    // 错误提示（含 401 跳登录）已由统一拦截器处理，这里只记录日志
    console.error('图片上传失败:', err);
  } finally {
    // 清空 input，让同一个文件可以重复选择
    event.target.value = '';
    uploading.value = false;
  }
};
</script>

<style scoped>
.cover-uploader {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.cover-preview {
  width: 160px;
  height: 100px;
  border: 1px solid var(--border-color, #dcdfe6);
  border-radius: 6px;
  overflow: hidden;
  background: #f5f7fa;
}

.cover-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.cover-tip {
  width: 100%;
  font-size: 12px;
  color: #909399;
  line-height: 1.4;
}
</style>
