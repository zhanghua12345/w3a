<template>
  <el-dialog
    v-model="visible"
    :title="form.id ? '编辑' : '添加'"
    width="650px"
    @closed="onReset"
    append-to-body
  >
    <el-form :model="form" inline label-width="100px" ref="formRef">
      <el-row>
        <el-col :span="20">
          <el-form-item label="预览码" prop="status">
            <el-button
              type="primary"
              @click="
                form.qrCode =
                  'https://majiajiang.oss-cn-beijing.aliyuncs.com/image/20210822/cf8fd7024c5a0918684cb569923016c5.png'
              "
            >
              生成小程序码
            </el-button>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label=" " prop="status" v-if="form.qrCode">
            <el-image style="width: 100px; height: 100px" :src="form.qrCode" fit="fill" />
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="审核" prop="status">
            <el-select v-model="form.status" clearable placeholder="请选择">
              <el-option label="通过" :value="1" />
              <el-option label="驳回" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="20" v-if="form.status === 1">
          <el-form-item label="状态" prop="status">
            <el-select v-model="form.pid" clearable placeholder="请选择">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="20" v-if="form.status === 0">
          <el-form-item label="驳回理由" prop="role">
            <el-input v-model="form.role" clearable placeholder="请输入" type="textarea" rows="5" />
          </el-form-item>
        </el-col>
      </el-row>
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
import { ref, reactive } from 'vue';
import type { IUserItem } from '@/api/user/type';

const visible = ref(false);
const formRef = ref();
const form = reactive({
  id: '',
  qrCode: '',
  pid: undefined,
  status: undefined,
  role: ''
});

const init = (data?: IUserItem) => {
  visible.value = true;
  if (data) Object.assign(form, data);
};

const onReset = () => {
  if (!formRef.value) return;
  formRef.value.resetFields();
};

defineExpose({ init });
</script>

<style lang="scss" scoped></style>
