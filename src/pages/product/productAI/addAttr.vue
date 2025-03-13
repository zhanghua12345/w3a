<template>
  <el-dialog
    :visible.sync="modal"
    @closed="onClose"
    title="详情模板"
    width="1000px"
    v-loading="spinShow"
    :close-on-click-modal="false"
  >
    <el-form
      ref="formDynamic"
      :model="formDynamic"
      :rules="rules"
      class="attrFrom"
      label-width="110px"
      label-position="right"
      @submit.native.prevent
    >
      <el-row :gutter="24" :style="{ maxHeight: '600px', overflowY: 'auto' }">
        <el-col :span="16">
          <el-form-item label="AI问题" prop="problem">
            <el-input placeholder="请输入AI问题" :maxlength="20" v-model.trim="formDynamic.problem" />
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="AI描述" prop="description">
            <el-input placeholder="请输入AI描述" :maxlength="20" v-model.trim="formDynamic.description" />
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="AI类型" prop="type">
            <el-select v-model="formDynamic.type" placeholder="请选择AI类型" style="width: 100%">
              <el-option value="input" label="输入框" />
              <el-option value="number" label="数字输入框" />
              <el-option value="opt" label="下拉框选择器" />
              <el-option value="textarea" label="长文本编辑器" />
              <el-option value="radio" label="单选框" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="24" v-if="['opt', 'radio'].includes(formDynamic.type)">
          <el-form-item label="选项：" prop="content">
            <div class="addCustom_content">
              <div v-for="(item, index) in formDynamic.content" :key="index" class="custom_box">
                <el-input
                  v-model.trim="item.value"
                  placeholder="选项名称"
                  style="width: 150px; margin-right: 10px"
                  :maxlength="10"
                />
                <el-input
                  v-model.trim="item.sort"
                  type="number"
                  placeholder="排序"
                  style="width: 150px; margin-right: 10px"
                  :maxlength="10"
                />
                <div class="addfont" @click="removeCustom(index)" v-if="index > 0">删除</div>
              </div>
            </div>
            <div class="addCustomBox">
              <div class="btn" @click="addCustom">+ 添加表单</div>
              <div class="titTip">最多可设置10条</div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="排序" prop="sort">
            <el-input
              v-model.trim="formDynamic.sort"
              type="number"
              placeholder="请输入排序 - 越大越靠前"
              :maxlength="10"
            />
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="formDynamic.status">
              <el-radio :label="1">显示</el-radio>
              <el-radio :label="0">不显示</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="必填" prop="required">
            <el-radio-group v-model="formDynamic.required">
              <el-radio :label="1">必填</el-radio>
              <el-radio :label="0">非必填</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" :loading="modal_loading" @click="handleSubmit('formDynamic')">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addProblemAi } from '@/api/product';
export default {
  name: 'addAttr',
  data() {
    return {
      spinShow: false,
      modal_loading: false,
      modal: false,
      index: 1,
      rules: {
        rule_name: [{ required: true, message: '请输入模板名称', trigger: 'blur' }],
      },
      formDynamic: {},
      formDynamicNameData: [],
      isBtn: false,
      formDynamicName: [],
      results: [],
      result: [],
      id: 0,
    };
  },
  computed: {},
  methods: {
    // 添加按钮
    getInfo(row) {
      if (!row) {
        this.formDynamic = {
          problem: '',
          description: '',
          type: null,
          content: [{ value: '', sort: null }],
          sort: null,
          status: 0,
          required: 0,
        };
      } else {
        this.formDynamic = { ...row, content: row.content ? JSON.parse(row.content) : [{ value: '', sort: null }] };
      }
      this.isBtn = true;
      this.id = row?.id || '';
      console.log(row);
    },
    // 新增表单
    addCustom() {
      if (this.formDynamic.content.length > 9) {
        this.$message.warning('最多添加10条');
      } else {
        this.formDynamic.content.push({ value: '', sort: null });
      }
    },

    // 删除
    removeCustom(index) {
      this.formDynamic.content.splice(index, 1);
    },

    // 提交
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (!['input', 'number', 'textarea'].includes(this.formDynamic.type)) {
            const isContent = this.formDynamic.content.every((e) => e.value && String(e.sort));
            if (!isContent) return this.$message.warning('必填数据不能留空！');
          } else {
            this.formDynamic.content = null;
          }
          this.formDynamic.sort = Number(this.formDynamic.sort);
          this.modal_loading = true;
          setTimeout(() => {
            addProblemAi(this.formDynamic, this.id)
              .then((res) => {
                this.$message.success(res.msg);
                setTimeout(() => {
                  this.modal = false;
                  this.modal_loading = false;
                }, 500);
                setTimeout(() => {
                  this.$emit('getList');
                  this.clear();
                }, 600);
              })
              .catch((res) => {
                this.modal_loading = false;
                this.$message.error(res.msg);
              });
          }, 1200);
        } else {
          return false;
        }
      });
    },

    onClose() {
      this.$refs['formDynamic'].resetFields();
      this.formDynamic = {
        problem: '',
        description: '',
        type: null,
        content: [],
        sort: null,
        status: 0,
        required: 0,
      };
      this.isBtn = false;
      this.modal = false;
      this.id = 0;
    },

    // 删除
    handleRemove(index) {
      this.formDynamic.content.splice(index, 1);
    },
    // 删除属性
    handleRemove2(item, index) {
      item.splice(index, 1);
    },
  },
};
</script>

<style scoped lang="stylus">
.rulesBox {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.attrFrom {
  ::v-deep .ivu-form-item {
    margin-bottom: 0px !important;
  }
}

.add {
  margin-left: 110px;
}

.addCustom_content {

  .custom_box {
    margin-bottom: 10px;
  }
}

.addCustomBox {
  margin-top: 12px;
  font-size: 13px;
  font-weight: 400;
  color: var(--prev-color-primary);

  .btn {
    cursor: pointer;
    width: max-content;
  }
}

.addfont {
  display: inline-block;
  font-size: 12px;
  font-weight: 400;
  color: var(--prev-color-primary);
  margin-left: 14px;
  cursor: pointer;
}

.titTip {
  display: inline-bolck;
  font-size: 12px;
  line-height: 24px;
  font-weight: 400;
  color: #999999;
}
</style>
