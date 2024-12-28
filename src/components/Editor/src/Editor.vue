<script setup lang="ts">
import { onBeforeUnmount, computed, unref, nextTick, ref, watch, shallowRef } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { IDomEditor, IEditorConfig } from '@wangeditor/editor';
import { ElMessage } from 'element-plus';

const emit = defineEmits(['change', 'update:modelValue']);

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef<IDomEditor>();

const valueHtml = ref('');

// 监听
watch(
  () => valueHtml.value,
  (val: string) => {
    emit('update:modelValue', val);
  }
);

const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor;
};

// 编辑器配置
const editorConfig = computed((): IEditorConfig => {
  return Object.assign({
    readOnly: false,
    customAlert: (s: string, t: string) => {
      switch (t) {
        case 'success':
          ElMessage.success(s);
          break;
        case 'info':
          ElMessage.info(s);
          break;
        case 'warning':
          ElMessage.warning(s);
          break;
        case 'error':
          ElMessage.error(s);
          break;
        default:
          ElMessage.info(s);
          break;
      }
    },
    autoFocus: false,
    scroll: true,
    uploadImgShowBase64: true
  });
});

// 回调函数
const handleChange = (editor: IDomEditor) => {
  emit('change', editor);
};

// 组件销毁时，及时销毁编辑器
onBeforeUnmount(() => {
  const editor = unref(editorRef.value);

  // 销毁，并移除 editor
  editor?.destroy();
});

const getEditorRef = async (): Promise<IDomEditor> => {
  await nextTick();
  return unref(editorRef.value) as IDomEditor;
};

defineExpose({
  getEditorRef
});
</script>

<template>
  <div class="border-1 border-solid border-[var(--el-border-color)] z-10">
    <!-- 工具栏 -->
    <Toolbar
      :editor="editorRef"
      class="border-0 b-b-1 border-solid border-[var(--el-border-color)]"
    />
    <!-- 编辑器 -->
    <Editor
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      @on-change="handleChange"
      @on-created="handleCreated"
      style="height: 400px; overflow-y: hidden"
    />
  </div>
</template>

<style src="@wangeditor/editor/dist/css/style.css"></style>
