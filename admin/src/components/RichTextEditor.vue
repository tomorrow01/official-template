<template>
  <div class="rich-text-editor">
    <!-- 工具栏 -->
    <Toolbar
      v-if="!mode"
      :editor="editorRef"
      :default-config="toolbarConfig"
      mode="default"
      style="border-bottom: 1px solid #ccc;"
    />
    <Toolbar
      v-else
      :editor="editorRef"
      :default-config="toolbarConfig"
      mode="simple"
      style="border-bottom: 1px solid #ccc;"
    />

    <!-- 编辑器 -->
    <Editor
      :value="modelValue"
      :default-config="editorConfig"
      mode="default"
      @onCreated="handleCreated"
      @onChange="handleChange"
      style="height: 300px; overflow-y: auto;"
    />
  </div>
</template>

<script setup>
import { ref, shallowRef, onBeforeUnmount, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import axios from 'axios';

// wangEditor 核心样式
import '@wangeditor/editor/dist/css/style.css';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  mode: {
    type: String,
    default: 'default',
  },
  placeholder: {
    type: String,
    default: '请输入内容...',
  },
});

const emit = defineEmits(['update:modelValue']);

const editorRef = shallowRef();

const toolbarConfig = {};

// 自定义上传函数
const customUpload = (file, insertFn) => {
  // 后端 upload 接口（开发 vite proxy / 生产 nginx proxy 都代理到 backend）
  const uploadUrl = '/api/upload';

  const formData = new FormData();
  formData.append('file', file);

  axios.post(uploadUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 15000,
  })
    .then((response) => {
      const res = response.data;
      if (res && res.errno === 0 && res.data && res.data[0]) {
        const url = res.data[0];
        // wangEditor 的 insertFn(url, alt, href)
        insertFn(url, file.name, url);
        ElMessage.success('图片上传成功');
      } else {
        ElMessage.error(res?.message || '图片上传失败');
      }
    })
    .catch((err) => {
      console.error('图片上传失败:', err);
      ElMessage.error('图片上传失败: ' + (err.message || '网络错误'));
    });
};

const editorConfig = {
  placeholder: props.placeholder,
  MENU_CONF: {
    uploadImage: {
      customUpload,
      maxFileSize: 5 * 1024 * 1024,
    },
  },
};

const handleCreated = (editor) => {
  editorRef.value = editor;
};

const handleChange = (editor) => {
  emit('update:modelValue', editor.getHtml());
};

watch(
  () => props.modelValue,
  (newVal) => {
    if (editorRef.value && newVal !== editorRef.value.getHtml()) {
      editorRef.value.setHtml(newVal || '');
    }
  }
);

onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor) {
    editor.destroy();
  }
});
</script>

<style scoped>
.rich-text-editor {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: #fff;
  z-index: 100;
}

.rich-text-editor :deep(.w-e-text-container) {
  background-color: #fff;
}
</style>
