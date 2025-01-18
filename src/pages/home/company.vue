<template>
  <div class="article-manager">
    <el-card :bordered="false" shadow="never" class="mt16">
      <el-tabs v-model="currentTab" @tab-click="changeTab('formValidate')">
        <el-tab-pane
          :label="item.label"
          :name="item.value.toString()"
          v-for="(item, index) in headerList"
          :key="index"
        />
      </el-tabs>
      <el-form
        class="form"
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="labelWidth"
        :label-position="labelPosition"
        @submit.native.prevent
      >
        <div class="goodsTitle acea-row">
          <div class="title">文章信息</div>
        </div>
        <div class="grid_box">
          <el-form-item label="id：" prop="id">
            <div class="text-main">{{ formValidate.id || '--' }}</div>
          </el-form-item>
          <el-form-item label="标题：" prop="title">
            <el-input v-model="formValidate.title" placeholder="请输入" class="content_width" />
          </el-form-item>
          <el-form-item label="排序：" prop="sort">
            <el-input v-model="formValidate.sort" placeholder="请输入" type="number" class="content_width" />
          </el-form-item>
          <el-form-item label="图文封面：" prop="image_input">
            <div class="picBox" @click="modalPicTap('单选')">
              <div class="pictrue" v-if="formValidate.image_input">
                <img :src="formValidate.image_input" />
              </div>
              <div class="upLoad acea-row row-center-wrapper" v-else>
                <i class="el-icon-plus" style="font-size: 24px"></i>
              </div>
            </div>
            <div class="tip">建议尺寸：500 x 312 px</div>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-switch
              class="defineSwitch"
              :active-value="1"
              :inactive-value="0"
              v-model="formValidate.status"
              size="large"
              active-text="显示"
              inactive-text="隐藏"
            >
            </el-switch>
          </el-form-item>
        </div>
        <div class="goodsTitle acea-row">
          <div class="title">文章内容</div>
        </div>
        <el-row class="content">
          <el-col :span="16">
            <el-form-item label="" prop="content" label-width="0">
              <WangEditor :content="formValidate.content" @editorContent="getEditorContent"></WangEditor>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="width: 33%">
            <div class="ifam">
              <div class="content" v-html="content"></div>
            </div>
          </el-col>
        </el-row>
        <el-button type="primary" class="submission" @click="onsubmit('formValidate')">提交</el-button>
      </el-form>
      <el-dialog :visible.sync="modalPic" width="950px" title="上传商品图" :close-on-click-modal="false">
        <uploadPictures
          :isChoice="isChoice"
          @getPic="getPic"
          :gridBtn="gridBtn"
          :gridPic="gridPic"
          v-if="modalPic"
        ></uploadPictures>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import uploadPictures from '@/components/uploadPictures';
import WangEditor from '@/components/wangEditor/index.vue';
import { getAgreements, setAgreements } from '@/api/system';
export default {
  name: 'company',
  components: { uploadPictures, WangEditor },
  data() {
    const validateUpload = (rule, value, callback) => {
      console.log(1);
      if (this.formValidate.image_input) {
        callback();
      } else {
        callback(new Error('请上传图文封面'));
      }
    };
    return {
      currentTab: '1',
      headerList: [
        { label: '模块一', value: '1' },
        { label: '模块二', value: '2' },
        { label: '模块三', value: '3' },
        { label: '模块四', value: '4' },
        { label: '模块五', value: '5' },
        { label: '模块六', value: '6' },
        { label: '模块七', value: '7' },
        { label: '模块八', value: '8' },
      ],
      dialog: {},
      isChoice: '单选',
      grid: {
        xl: 8,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24,
      },
      gridPic: {
        xl: 6,
        lg: 8,
        md: 12,
        sm: 12,
        xs: 12,
      },
      gridBtn: {
        xl: 4,
        lg: 8,
        md: 8,
        sm: 8,
        xs: 8,
      },
      loading: false,
      formValidate: {
        id: 0,
        title: '',
        image_input: '',
        content: '',
        status: false,
        visit: 0,
      },
      content: '',
      ruleValidate: {
        title: [{ required: true, message: '请输入标题', trigger: 'change' }],
        sort: [{ required: true, message: '请输入排序', trigger: 'change' }],
        image_input: [{ required: true, validator: validateUpload, trigger: 'change' }],
        content: [{ required: true, message: '请输入文章内容', trigger: 'change' }],
      },
      value: '',
      modalPic: false,
      template: false,
      treeData: [],
      myConfig: {
        autoHeightEnabled: false, // 编辑器不自动被内容撑高
        initialFrameHeight: 500, // 初始容器高度
        initialFrameWidth: '100%', // 初始容器宽度
        UEDITOR_HOME_URL: '/UEditor/',
        serverUrl: '',
      },
    };
  },
  computed: {
    ...mapState('media', ['isMobile']),
    labelWidth() {
      return this.isMobile ? undefined : '90px';
    },
    labelPosition() {
      return this.isMobile ? 'top' : 'right';
    },
  },
  methods: {
    getEditorContent(data) {
      this.content = data;
    },
    // 选择图片
    modalPicTap() {
      this.modalPic = true;
    },
    // 选中图片
    getPic(pc) {
      this.formValidate.image_input = pc.att_dir;
      this.modalPic = false;
    },

    // 提交数据
    onsubmit(name) {
      this.formValidate.content = this.content;
      this.formValidate.id = this.currentTab;
      this.$refs[name].validate((valid) => {
        if (valid) {
          setAgreements(this.formValidate)
            .then(async (res) => {
              this.$message.success(res.msg);
            })
            .catch((res) => {
              this.$message.error(res.msg);
            });
        } else {
          return false;
        }
      });
    },
    // 文章详情
    getDetails() {
      getAgreements(this.currentTab).then((res) => {
        this.formValidate = { ...res.data };
        this.content = res.data.content;
      });
    },
    changeTab(name) {
      this.formValidate.content = '';
      this.getDetails();
    },
  },
  created() {
    this.changeTab(this.currentTab);
    this.getDetails();
  },
};
</script>
<style scoped lang="scss">
.grid_box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-gap: 0;
}
.content_width {
  width: 300px;
}
::v-deep.ivu-form-item-content {
  line-height: unset !important;
}
.picBox {
  display: inline-block;
  cursor: pointer;
}

.form .goodsTitle {
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  margin-bottom: 25px;
}

.form .goodsTitle ~ .goodsTitle {
  margin-top: 20px;
}

.form .goodsTitle .title {
  border-bottom: 2px solid var(--prev-color-primary);
  padding: 0 8px 12px 5px;
  color: #000;
  font-size: 14px;
}

.form .goodsTitle .icons {
  font-size: 15px;
  margin-right: 8px;
  color: #999;
}

.form .add {
  font-size: 12px;
  color: var(--prev-color-primary);
  padding: 0 12px;
  cursor: pointer;
}

.form .radio {
  margin-right: 20px;
}

.form .submission {
  width: 10%;
  margin-left: 27px;
}

.form .upLoad {
  width: 58px;
  height: 58px;
  line-height: 58px;
  border: 1px dotted rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.02);
}

.form .iconfont {
  color: #898989;
}

.form .pictrue {
  width: 60px;
  height: 60px;
  border: 1px dotted rgba(0, 0, 0, 0.1);
  margin-right: 10px;
}

.form .pictrue img {
  width: 100%;
  height: 100%;
}

.Modals .address {
  width: 90%;
}

.Modals .address .iconfont {
  font-size: 20px;
}
.tip {
  margin-top: 10px;
  color: #bbb;
  font-size: 12px;
}

.ifam {
  width: 344px;
  height: 644px;
  background: url('../../assets/images/ag-phone.png') no-repeat center top;
  background-size: 344px 644px;
  padding: 40px 20px;
  padding-top: 50px;
  margin: 0 auto 0 20px;

  .content {
    height: 560px;
    overflow: hidden;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    overflow-x: hidden;
    overflow-y: auto;
  }

  .content::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}
</style>
