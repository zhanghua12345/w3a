<template>
  <div>
    <el-form :model="form" label-width="100" ref="formRef" :rules="formRules" class="pt-10">
      <el-card shadow="never">
        <template #header>
          <div class="flex justify-between items-center">
            <span class="text-000 font-600">文章</span>
          </div>
        </template>
        <el-row justify="space-between">
          <el-col :span="12" :xs="24">
            <el-form-item label="标题" prop="title">
              <el-input
                v-model="form.title"
                placeholder="请输入菜单名称"
                clearable
                class="w-300px"
              />
            </el-form-item>

            <el-form-item label="文章分类" prop="pid">
              <el-select v-model="form.pid" placeholder="请选择案例风格" class="w-300px">
                <el-option label="现代简约" :value="1" />
                <el-option label="奶油风" :value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="封面图片" prop="pid">
              <el-upload
                class="avatar-uploader"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12" :xs="24">
            <el-form-item label="作者" prop="title">
              <el-input
                v-model="form.title"
                placeholder="请输入菜单名称"
                clearable
                class="w-300px"
              />
            </el-form-item>

            <el-form-item label="简介" prop="pid">
              <el-select v-model="form.pid" placeholder="请选择案例风格" class="w-300px">
                <el-option label="现代简约" :value="1" />
                <el-option label="奶油风" :value="2" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <div class="mt-3">
        <el-card shadow="never">
          <template #header>
            <div class="flex justify-between items-center">
              <span class="text-000 font-600">文章内容</span>
            </div>
          </template>
          <el-form-item label="文章内容" prop="pid">
            <Editor v-model="defaultHtml" ref="editorRef" @change="change" />
          </el-form-item>
        </el-card>
      </div>

      <div class="mt-3" :gutter="12">
        <el-card shadow="never">
          <template #header>
            <div class="flex justify-between items-center">
              <span class="text-000 font-600">其他</span>
            </div>
          </template>
          <el-col :span="24" :xs="24">
            <el-form-item label="标题" prop="title">
              <el-input
                v-model="form.title"
                placeholder="请输入菜单名称"
                clearable
                class="w-300px"
              />
            </el-form-item>

            <el-form-item label="文章分类" prop="pid">
              <el-select v-model="form.pid" placeholder="请选择案例风格" class="w-300px">
                <el-option label="现代简约" :value="1" />
                <el-option label="奶油风" :value="2" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-card>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, unref, reactive, onMounted } from 'vue';

import { Plus } from '@element-plus/icons-vue';

import { Editor } from '@/components/Editor';

const form = reactive({
  id: 0,
  pid: '',
  title: '',
  icon: '',
  path: '',
  component: '',
  iframeLink: '',
  permission: '',
  affix: 0,
  isHide: 0,
  isKeep: 0,
  sort: 0,
  type: 0
});
const formRules = ref(undefined);
const imageUrl = ref('');

const handleAvatarSuccess = (uploadFile: any) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw);
};
const beforeAvatarUpload = (rawFile: any) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!');
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!');
    return false;
  }
  return true;
};

const editorRef = ref();

const defaultHtml = ref('');

onMounted(async () => {
  const editor = await unref(editorRef)?.getEditorRef();
  console.log(editor);
});
setTimeout(() => {
  defaultHtml.value = '<p>hello <strong>world</strong></p>';
}, 3000);

const change = (editor: any) => {
  console.log(editor.getHtml());
};
</script>

<style lang="scss" scoped>
/* 设置滚动条的宽度和颜色 */
.info::-webkit-scrollbar {
  width: 8px;
}

/* 设置滚动条轨道的背景颜色 */
.info::-webkit-scrollbar-track {
  background-color: #e5e5e5;
}

/* 设置滚动条滑块的背景颜色 */
.info::-webkit-scrollbar-thumb {
  background-color: #ccc;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  border: 1px solid #e5e5e5;
}
</style>
