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
      v-model="innerHtml"
      :default-config="editorConfig"
      mode="default"
      @onCreated="handleCreated"
      style="height: 300px; overflow-y: auto;"
    />
  </div>
</template>

<script setup>
import { shallowRef, computed, onBeforeUnmount } from 'vue';
import { ElMessage } from 'element-plus';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { uploadAPI } from '../utils/api';

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

// wangEditor 的 Editor 组件通过 modelValue 双向绑定：
// 1. 创建编辑器时用 modelValue 作为初始 HTML（编辑回显的关键）
// 2. 内容变化时组件内部 emit update:modelValue
// 注意：必须传 modelValue（v-model），传 :value 组件不认，会导致打开编辑时内容空白
const innerHtml = computed({
  get: () => props.modelValue || '',
  set: (val) => emit('update:modelValue', val),
});

// 自定义上传函数
const customUpload = async (file, insertFn) => {
  try {
    // 走统一 api 实例：自动带 token，401 时统一提示并跳登录页
    const url = await uploadAPI.uploadImage(file);
    if (url) {
      // wangEditor 的 insertFn(url, alt, href)
      insertFn(url, file.name, url);
      ElMessage.success('图片上传成功');
    } else {
      ElMessage.error('图片上传失败');
    }
  } catch (err) {
    // 错误提示（含 401 跳登录）已由统一拦截器处理，这里只记录日志
    console.error('图片上传失败:', err);
  }
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
