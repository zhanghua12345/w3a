<template>
  <el-dialog v-model="visible" :title="form.id ? '编辑' : '添加'" width="550px" @closed="onReset">
    <el-form :model="form" label-width="100" ref="formRef" :rules="formRules">
      <el-form-item label="菜单类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio-button :label="0">标签</el-radio-button>
          <el-radio-button :label="1">选项</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="父级菜单" prop="pid" v-if="form.type">
        <el-select v-model="form.pid" placeholder="请选择父级菜单" class="w-220px">
          <el-option label="首页" :value="1" />
          <el-option label="系统管理" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="菜单名称" prop="title">
        <el-input v-model="form.title" placeholder="请输入菜单名称" clearable />
      </el-form-item>
      <el-form-item label="是否显示">
        <el-radio-group v-model="form.isHide" class="w-full">
          <el-radio :label="0">启用</el-radio>
          <el-radio :label="1">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model="form.sort" placeholder="请输入排序序号" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="visible = false">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue';
import type { IMenuItem } from '@/api/auth/type';
import { formRules } from '../helpers/rule';

const visible = ref(false);
const formRef = ref();

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

const init = async (data?: IMenuItem) => {
  visible.value = true;
  if (data) {
    await nextTick();
    Object.assign(form, data);
  }
};

const onReset = () => {
  if (!formRef.value) return;
  formRef.value.resetFields();
};

defineExpose({ init });
</script>

<style lang="scss" scoped></style>
