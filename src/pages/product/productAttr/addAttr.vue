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
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="模板名称：" prop="rule_name">
            <el-input
              placeholder="请输入模板名称"
              :maxlength="20"
              v-model.trim="formDynamic.rule_name"
              :disabled="isBtn"
            />
          </el-form-item>
        </el-col>

        <el-col :span="24" v-if="isBtn">
          <el-form-item label="详情菜单：">
            <div class="addCustom_content">
              <div v-for="(item, index) in formDynamic.spec" :key="index" class="custom_box">
                <el-input
                  v-model.trim="item.value"
                  placeholder="详情菜单名称"
                  style="width: 150px; margin-right: 10px"
                  :maxlength="10"
                />
                <el-input
                  v-model.trim="item.detail[0]"
                  type="number"
                  placeholder="排序"
                  style="width: 150px; margin-right: 10px"
                  :maxlength="10"
                />
                <el-checkbox v-model="item.status" true-label="1" false-label="">必填</el-checkbox>
                <div class="addfont" @click="removeCustom(index)" v-if="index > 0">删除</div>
              </div>
            </div>
            <div class="addCustomBox">
              <div class="btn" @click="addCustom">+ 添加表单</div>
              <div class="titTip">最多可设置10条</div>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button type="primary" @click="addBtn" v-if="!isBtn" class="add">添加类型</el-button>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" :loading="modal_loading" @click="handleSubmit('formDynamic')">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex';
import { ruleAddApi, ruleInfoApi } from '@/api/product';
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
      formDynamic: {
        rule_name: '',
        spec: [],
      },
      formDynamicNameData: [],
      isBtn: false,
      formDynamicName: [],
      results: [],
      result: [],
      ids: 0,
    };
  },
  computed: {},
  methods: {
    // 添加按钮
    addBtn() {
      if (!this.formDynamic.rule_name) {
        this.$message.warning('请输入模板名称');
      } else {
        this.isBtn = true;
        this.formDynamic.spec.push({ value: '', detail: [], status: '' });
      }
    },

    // 新增表单
    addCustom() {
      if (this.formDynamic.spec.length > 9) {
        this.$message.warning('最多添加10条');
      } else {
        this.formDynamic.spec.push({ value: '', detail: [], status: '' });
      }
    },

    // 删除
    removeCustom(index) {
      this.formDynamic.spec.splice(index, 1);
    },

    // 提交
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const isSpec = this.formDynamic.spec.every((e) => e.value && String(e.detail[0]));
          if (!isSpec) {
            return this.$message.warning('模板数据不能留空！');
          } else {
            this.modal_loading = true;
            setTimeout(() => {
              ruleAddApi(this.formDynamic, this.ids)
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
          }
        } else {
          return false;
        }
      });
    },

    onClose() {
      this.$refs['formDynamic'].resetFields();
      this.formDynamic.spec = [];
      this.isBtn = false;
      this.modal = false;
      this.ids = 0;
    },

    // 删除
    handleRemove(index) {
      this.formDynamic.spec.splice(index, 1);
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
