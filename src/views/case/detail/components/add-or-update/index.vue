<template>
  <el-dialog
    v-model="visible"
    :title="form.id ? '编辑' : '添加'"
    width="800px"
    modal-class="case-detail-dialog"
    @closed="onReset"
    :close-on-click-modal="false"
  >
    <div class="dialog-content">
      <el-steps :active="steps" finish-status="success">
        <el-step title="第一步" />
        <el-step title="第二步" />
        <el-step title="第三步" />
      </el-steps>
      <el-form
        :model="form"
        label-width="100"
        ref="formRef"
        :rules="formRules"
        class="pt-10"
        v-show="steps === 0"
      >
        <el-form-item label="案例名称" prop="title">
          <el-input v-model="form.title" placeholder="请输入菜单名称" clearable class="w-300px" />
        </el-form-item>

        <el-form-item label="案例风格" prop="pid">
          <el-select v-model="form.pid" placeholder="请选择案例风格" class="w-300px">
            <el-option label="现代简约" :value="1" />
            <el-option label="奶油风" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="户型" prop="pid">
          <el-select v-model="form.pid" placeholder="请选择案例户型" class="w-300px">
            <el-option label="一居室" :value="2" />
            <el-option label="复试" :value="1" />
            <el-option label="公寓" :value="1" />
            <el-option label="别墅" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="面积" prop="pid">
          <el-select v-model="form.pid" placeholder="请选择面积区间" class="w-300px">
            <el-option label="复试" :value="1" />
            <el-option label="别墅" :value="2" />
            <el-option label="一居室" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="系列" prop="pid">
          <el-select v-model="form.pid" placeholder="请选择系列" class="w-300px">
            <el-option label="西格拉低" :value="1" />
            <el-option label="城市徽章" :value="2" />
            <el-option label="一居室" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="主颜色" prop="pid">
          <el-select v-model="form.pid" placeholder="请选择主颜色" class="w-300px">
            <el-option label="白色" :value="1" />
            <el-option label="黑色" :value="2" />
            <el-option label="灰色" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="案例简介" prop="title">
          <el-input
            v-model="form.title"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 10 }"
            placeholder="请输入菜单名称"
            clearable
            class="w-300px"
          />
        </el-form-item>
      </el-form>
      <el-form
        :model="form"
        label-width="100"
        ref="formRef"
        :rules="formRules"
        class="pt-10"
        v-show="steps === 1"
      >
        <el-form-item label="封面图" prop="title">
          <Upload />
        </el-form-item>
        <el-form-item label="主图" prop="title">
          <Upload />
        </el-form-item>
        <el-form-item label="客厅" prop="title">
          <Upload />
        </el-form-item>
        <el-form-item label="餐厅" prop="title">
          <Upload />
        </el-form-item>
        <el-form-item label="厨房" prop="title">
          <Upload />
        </el-form-item>
        <el-form-item label="主卧" prop="title">
          <Upload />
        </el-form-item>
        <el-form-item label="主卧二" prop="title">
          <Upload />
        </el-form-item>
        <el-form-item label="儿童房" prop="title">
          <Upload />
        </el-form-item>
        <el-form-item label="老人房" prop="title">
          <Upload />
        </el-form-item>
        <el-form-item label="书房" prop="title">
          <Upload />
        </el-form-item>
        <el-form-item label="功能房" prop="title">
          <Upload />
        </el-form-item>
        <el-form-item label="电竞房" prop="title">
          <Upload />
        </el-form-item>
        <el-form-item label="次卧1" prop="title">
          <Upload />
        </el-form-item>
        <el-form-item label="次卧2" prop="title">
          <Upload />
        </el-form-item>
        <el-form-item label="次卧3" prop="title">
          <Upload />
        </el-form-item>
      </el-form>
      <el-form
        :model="form"
        label-width="120"
        ref="formRef"
        :rules="formRules"
        class="pt-10"
        v-show="steps === 2"
      >
        <el-form-item label="效果图链接" prop="title">
          <el-input v-model="form.title" placeholder="请输入案例效果图" clearable />
        </el-form-item>
        <el-form-item label="浏览量初始值" prop="title">
          <el-input
            v-model="form.title"
            placeholder="请输入"
            type="number"
            clearable
            class="w-300px"
          />
        </el-form-item>
        <el-form-item label="收藏初始值" prop="title">
          <el-input
            v-model="form.title"
            placeholder="请输入"
            type="number"
            clearable
            class="w-300px"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.isHide" class="w-full">
            <el-radio-button :label="0">显示</el-radio-button>
            <el-radio-button :label="1">隐藏</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否添加到首页">
          <el-switch v-model="form.isHide" />
        </el-form-item>
        <el-form-item label="添加到案例顶部">
          <el-switch v-model="form.isHide" />
        </el-form-item>
        <el-form-item label="热度标签">
          <el-radio-group v-model="form.isHide" class="w-full">
            <el-radio-button :label="0">显示</el-radio-button>
            <el-radio-button :label="1">不显示</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="最新标签">
          <el-radio-group v-model="form.isHide" class="w-full">
            <el-radio-button :label="0">显示</el-radio-button>
            <el-radio-button :label="1">不显示</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="preStep">上一步</el-button>
        <el-button type="primary" @click="nextStep">下一步</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue';
import type { IMenuItem } from '@/api/auth/type';
import { formRules } from '../helpers/rule';
import Upload from './upload.vue';

const visible = ref(false);
const formRef = ref();
const steps = ref(0);
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

const init = async (index: number, data?: IMenuItem) => {
  visible.value = true;
  steps.value = index;
  if (data) {
    await nextTick();
    Object.assign(form, data);
  }
};
const preStep = () => {
  if (steps.value) {
    steps.value--;
    console.log(steps.value);
  }
};
const nextStep = () => {
  if (steps.value < 2) {
    steps.value++;
  }
};

const onReset = () => {
  if (!formRef.value) return;
  formRef.value.resetFields();
};

defineExpose({ init });
</script>

<style lang="scss">
.case-detail-dialog {
  .el-dialog__body {
    padding: 0;
    overflow-y: auto;
    height: 600px;
  }
  /* 设置滚动条的宽度和颜色 */
  .el-dialog__body::-webkit-scrollbar {
    width: 8px;
  }

  /* 设置滚动条轨道的背景颜色 */
  .el-dialog__body::-webkit-scrollbar-track {
    background-color: #e5e5e5;
  }

  /* 设置滚动条滑块的背景颜色 */
  .el-dialog__body::-webkit-scrollbar-thumb {
    background-color: #ccc;
  }
  .dialog-content {
    padding: calc(var(--el-dialog-padding-primary) + 10px) var(--el-dialog-padding-primary);
  }
}
</style>
