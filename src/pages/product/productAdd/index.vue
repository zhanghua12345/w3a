<template>
  <div class="" id="shopp-manager" v-loading="spinShow">
    <pages-header
      ref="pageHeader"
      :title="$route.params.id ? '编辑案例' : '添加案例'"
      :backUrl="$routeProStr + '/product/product_list'"
    ></pages-header>
    <el-card :bordered="false" shadow="never" class="mt16" :body-style="{ padding: '0 20px 20px', minHeight: '400px' }">
      <el-tabs v-model="currentTab">
        <el-tab-pane v-for="(item, index) in headTab" :key="index" :label="item.tit" :name="item.name"></el-tab-pane>
      </el-tabs>
      <el-form
        class="formValidate mt20"
        ref="formValidate"
        :rules="ruleValidate"
        :model="formValidate"
        :label-width="labelWidth"
        :label-position="labelPosition"
        @submit.native.prevent
      >
        <!-- 基础信息-->
        <el-row :gutter="24" v-show="currentTab === '1'">
          <el-col :span="24">
            <el-form-item label="案例名称：" prop="name">
              <el-input class="content_width" v-model.trim="formValidate.name" placeholder="请输入案例名称" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="案例简介：">
              <el-input
                class="content_width"
                v-model.trim="formValidate.description"
                type="textarea"
                :rows="3"
                placeholder="请输入案例简介"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="案例作者：">
              <el-input class="content_width" v-model.trim="formValidate.author" placeholder="请输入作者" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="VR链接：" prop="VR_link">
              <el-input class="content_width" v-model="formValidate.VR_link" placeholder="请添加VR链接" />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="24" v-for="(item, index) in formValidate.treeSelect" Key="item">
            <el-form-item :label="item.label + '：'" prop="required">
              <el-select v-model.trim="formValidate.treeSelect[index].select" class="content_width mr14">
                <el-option v-for="(e, i) in item.children" :value="e.id" :key="i" :label="e.label"></el-option>
              </el-select>
            </el-form-item> 
          </el-col> -->
          <el-col :span="24">
            <el-form-item label="案例分类：" prop="cate_id">
              <el-cascader
                class="content_width"
                v-model="formValidate.cate_id"
                size="small"
                :options="formValidate.treeSelect"
                :props="{ multiple: true, checkStrictly: true, emitPath: false }"
                clearable
              ></el-cascader>
              <span class="addfont" @click="addCate">新增分类</span>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="列表页封面图：" prop="coverImg">
              <div class="pictrueBox" @click="modalPicTap('dan', 'coverImg')">
                <div class="pictrue" v-if="formValidate.coverImg">
                  <img v-lazy="formValidate.coverImg" />
                  <el-input v-model.trim="formValidate.coverImg" style="display: none"></el-input>
                </div>
                <div class="upLoad acea-row row-center-wrapper" v-else>
                  <el-input v-model.trim="formValidate.coverImg" style="display: none"></el-input>
                  <i class="el-icon-picture-outline" style="font-size: 24px"></i>
                </div>
                <div class="titTip">建议尺寸：700 * 320px</div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="详情页轮播图：" prop="banner">
              <div class="acea-row">
                <div
                  class="pictrue"
                  v-for="(item, index) in formValidate.banner"
                  :key="index"
                  draggable="true"
                  @dragstart="handleDragStart($event, item)"
                  @dragover.prevent="handleDragOver($event, item)"
                  @dragenter="handleDragEnter($event, item, 'banner')"
                  @dragend="handleDragEnd($event, item)"
                >
                  <img v-lazy="item" />
                  <i class="el-icon-error btndel" @click="handleRemove(index, 'banner')"></i>
                </div>
                <div
                  v-if="formValidate.banner.length < 10"
                  class="upLoad acea-row row-center-wrapper"
                  @click="modalPicTap('duo', 'banner')"
                >
                  <el-input v-model.trim="formValidate.banner[0]" style="display: none"></el-input>
                  <i class="el-icon-picture-outline" style="font-size: 24px"></i>
                </div>
              </div>
              <div class="titTip">建议尺寸：700 * 700，可拖拽改变图片顺序，最多上传10张</div>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="案例状态：" prop="status">
              <el-radio-group v-model="formValidate.status">
                <el-radio :label="1" class="radio">上架</el-radio>
                <el-radio :label="0">下架</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 详情设置-->
        <el-row :gutter="24" v-show="currentTab === '2'" style="min-height: 300px">
          <el-col :span="24" class="noForm">
            <el-form-item label="详情设置：" prop="selectRule">
              <div class="acea-row row-middle">
                <el-select v-model="formValidate.selectRule" class="mr14" style="width: 200px">
                  <el-option
                    v-for="(item, index) in ruleList"
                    :value="item.id"
                    :key="index"
                    :label="item.rule_name"
                  ></el-option>
                </el-select>
                <el-button type="primary" @click="confirm">确认</el-button>
                <el-button @click="addRule">添加详情模板</el-button>
              </div>
            </el-form-item>
            <template v-if="isSelectRule">
              <el-form-item label="详情菜单：">
                <div v-for="(item, index) in formValidate.attrs" :key="index" class="custom_box">
                  <el-input
                    v-model.trim="item.value"
                    placeholder="详情菜单名称"
                    style="width: 150px; margin-right: 10px"
                    :maxlength="10"
                  />
                  <el-input
                    v-model.trim="item.detail[0]"
                    placeholder="排序"
                    type="number"
                    style="width: 150px; margin-right: 10px"
                    :maxlength="10"
                  />
                  <el-checkbox v-model="item.status" true-label="1" false-label="">必填</el-checkbox>
                  <div class="addfont" @click="delcustom()" v-if="index > 0">删除</div>
                </div>
                <div class="addCustomBox">
                  <div class="btn" @click="addcustom">+ 添加规格</div>
                  <div class="titTip">最多可设置10条</div>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button type="success" @click="generate">立即生成</el-button>
              </el-form-item>
            </template>

            <!-- 案例详情-->
            <el-col v-if="formValidate.attrsImages && formValidate.attrsImages.length">
              <el-col :span="24" v-for="(item, index) in formValidate.attrsImages" :key="index">
                <el-form-item :label="item.value" :prop="item.status ? 'required' : ''">
                  <div class="acea-row">
                    <div
                      class="pictrue"
                      v-for="(e, i) in item.images"
                      :key="i"
                      draggable="true"
                      @dragstart="handleDragStart($event, e)"
                      @dragover.prevent="handleDragOver($event, e)"
                      @dragenter="handleDragEnter($event, e, `attrsImages`, index)"
                      @dragend="handleDragEnd($event, e)"
                    >
                      <img v-lazy="e" />
                      <i class="el-icon-error btndel" @click="handleRemove(i, 'attrsImages', index)"></i>
                    </div>
                    <div
                      v-if="item.images.length < 10"
                      class="upLoad acea-row row-center-wrapper"
                      @click="modalPicTap('duo', `attrsImages`, index)"
                    >
                      <el-input
                        v-model.trim="formValidate.attrsImages[index].images[0]"
                        style="display: none"
                      ></el-input>
                      <i class="el-icon-picture-outline" style="font-size: 24px"></i>
                    </div>
                  </div>

                  <div class="titTip">建议尺寸：700 * 高度任意，可拖拽改变图片顺序，最多上传10张</div>
                </el-form-item>
              </el-col>
            </el-col>
          </el-col>
        </el-row>
        <!-- 案例详情-->
        <el-row v-show="currentTab === '3'" :gutter="24">
          <el-col :span="16">
            <el-form-item label="案例详情：">
              <WangEditor style="width: 100%" :content="contents" @editorContent="getEditorContent"></WangEditor>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="width: 33%">
            <div class="ifam">
              <div class="content" v-html="content"></div>
            </div>
          </el-col>
        </el-row>

        <!-- 其他设置-->
        <el-row justify="space-between" v-show="currentTab === '4'">
          <el-col :span="24">
            <el-form-item label="浏览量初始值：" prop="browse">
              <el-input
                class="content_width"
                type="number"
                v-model.trim="formValidate.browse"
                placeholder="请输入浏览量初始值"
              />
              <div style="color: #666" v-if="$route.params.id">
                浏览量
                <span class="text-main">{{
                  Number(formValidate.browse || 0) + Number(formValidate.realBrowse || 0)
                }}</span>
                = 初始值 <span class="text-main">{{ formValidate.browse }}</span> + 真实量
                <span class="text-main">{{ formValidate.realBrowse || 0 }}</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="点赞初始值：" prop="praise">
              <el-input
                class="content_width"
                type="number"
                v-model.trim="formValidate.praise"
                placeholder="请输入点赞量初始值"
              />
              <div style="color: #666" v-if="$route.params.id">
                点赞量
                <span class="text-main">{{
                  Number(formValidate.praise || 0) + Number(formValidate.realPraise || 0)
                }}</span>
                = 初始值 <span class="text-main">{{ formValidate.praise }}</span> + 真实量
                <span class="text-main">{{ formValidate.realPraise || 0 }}</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="是否推荐：" prop="isRecommend">
              <el-radio-group v-model="formValidate.isRecommend">
                <el-radio :label="1" class="radio">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="formValidate.isRecommend == '1'">
            <el-form-item label="案例推荐图：" prop="recommendImg">
              <div class="pictrueBox" @click="modalPicTap('dan', 'recommendImg')">
                <div class="pictrue" v-if="formValidate.recommendImg">
                  <img v-lazy="formValidate.recommendImg" />
                  <el-input v-model.trim="formValidate.recommendImg" style="display: none"></el-input>
                </div>
                <div class="upLoad acea-row row-center-wrapper" v-else>
                  <el-input v-model.trim="formValidate.recommendImg" style="display: none"></el-input>
                  <i class="el-icon-picture-outline" style="font-size: 24px"></i>
                </div>
                <div class="titTip">建议尺寸：700 * 700px</div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="热门案例：" prop="hot">
              <el-radio-group v-model="formValidate.hot" element-id="hot">
                <el-radio :label="1" class="radio">显示</el-radio>
                <el-radio :label="0">不显示</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="最新案例：" prop="new">
              <el-radio-group v-model="formValidate.new" element-id="new">
                <el-radio :label="1" class="radio">显示</el-radio>
                <el-radio :label="0">不显示</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button v-if="currentTab !== '1'" @click="upTab">上一步</el-button>
          <el-button type="primary" class="submission" v-if="currentTab !== '4'" @click="downTab">下一步</el-button>
          <el-button
            type="primary"
            :disabled="openSubimit"
            class="submission"
            @click="handleSubmit('formValidate')"
            v-if="$route.params.id || currentTab === '4'"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
      <el-dialog :visible.sync="modalPic" width="950px" scrollable title="上传案例图" :close-on-click-modal="false">
        <uploadPictures
          :isChoice="isChoice"
          @getPic="getPic"
          @getPicD="getPicD"
          :gridBtn="gridBtn"
          :gridPic="gridPic"
          v-if="modalPic"
        ></uploadPictures>
      </el-dialog>
    </el-card>
    <add-attr ref="addattr" @getList="productGetRule"></add-attr>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import vuedraggable from 'vuedraggable';
import uploadPictures from '@/components/uploadPictures';
import addAttr from '../productAttr/addAttr';
import WangEditor from '@/components/wangEditor/index.vue';
import {
  productInfoApi,
  cascaderListApi,
  productGetRuleApi,
  productCreateApi,
  productNewAdd,
  productNewData,
} from '@/api/product';
import { readonly } from 'vue';
const ruleInit = readonly({
  name: [{ required: true, message: '请输入案例名称', trigger: 'blur' }],
  VR_link: [{ required: true, message: '请填写案例效果图链接', trigger: 'blur' }],
  coverImg: [{ required: true, message: '请上传案例封面图', trigger: 'change' }],
  banner: [{ required: true, message: '请上传案例封面图', trigger: 'change', type: 'array' }],
  status: [{ required: true, message: '请选择案例状态', trigger: 'change' }],
  selectRule: [{ required: true, message: '请选择案例详情分类', trigger: 'change' }],
  attrs: [{ required: true, message: '案例详情菜单不能为空', trigger: 'change', type: 'array' }],
  attrsImages: [{ required: true, message: '案例详情图片不能为空', trigger: 'change', type: 'array' }],
  isRecommend: [{ required: true, message: '请选择案例推荐', trigger: 'change' }],
  recommendImg: [{ required: true, message: '请上传推荐图', trigger: 'change' }],
  // required: [{ required: true, message: '这是一个只加标头的数据', trigger: 'change' }],
});
export default {
  name: 'product_productAdd',
  components: {
    uploadPictures,
    addAttr,
    draggable: vuedraggable,
    WangEditor,
  },
  data() {
    return {
      spinShow: false, // 获取数据刷新按钮
      headTab: [
        { tit: '基础信息', name: '1' },
        { tit: '详情设置', name: '2' },
        { tit: '案例详情', name: '3' },
        { tit: '其他设置', name: '4' },
      ],
      currentTab: '1',

      ruleList: [], // 详情模板
      isSelectRule: false,

      content: '', // 案例详情
      contents: '', // 案例详情 - 初始化
      formValidate: {
        required: true,
        treeSelect: [], // 案例分类数据
        name: '', // 案例名称
        VR_link: '', // 案例效果图链接
        coverImg: '', // 封面图
        banner: [], // 轮播图
        status: 1, // 轮播图
        cate_id: [],
        selectRule: '', // 案例详情分类
        attrs: [], // 案例详情菜单分类
        attrsImages: [], // 案例详情图片分类

        description: '', // 简介
        isRecommend: 0, // 是否推荐列表
        recommendImg: '', // 推荐图片
        browse: '', // 浏览初始值
        recommendImg: '', // 点赞初始值
        hot: 0, // 是否hot
        new: 0, // 是否new
      },
      ruleValidate: ruleInit,
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
      openSubimit: false, // 提交按钮状态
      modalPic: false, // 案例图收否显示
      isChoice: '', // 图片上传规格

      picTit: '',
      tableIndex: null, // 多图上传所以位置 - 第二步
    };
  },

  computed: {
    ...mapState('media', ['isMobile']),
    labelWidth() {
      return this.isMobile ? undefined : '120px';
    },
    labelPosition() {
      return this.isMobile ? 'top' : 'right';
    },
  },

  beforeRouteUpdate(to, from, next) {
    this.bus.$emit('onTagsViewRefreshRouterView', this.$route.path);
    next();
  },
  mounted() {
    if (this.$route.params.id) {
      this.getInfo();
    }
    this.goodsCategory(); // 案例分类
    this.productGetRule(); // 案例详情分类
  },
  methods: {
    // 上一页；
    upTab() {
      this.currentTab = (Number(this.currentTab) - 1).toString();
    },
    // 下一页；
    downTab() {
      this.currentTab = (Number(this.currentTab) + 1).toString();
    },
    // 案例分类
    goodsCategory() {
      cascaderListApi(1)
        .then((res) => {
          const _list = res.data.map((e) => {
            return {
              ...e,
              ...(e.children || []),
            };
          });
          this.formValidate.treeSelect = _list;
        })
        .catch((res) => {
          this.$message.error(res.msg);
        });
    },

    // 新增 案例分类 - 第一步
    addCate() {
      this.$modalForm(productCreateApi()).then(() => this.goodsCategory());
    },
    // 新增 详情模板 - 第二步
    addcustom() {
      if (this.formValidate.attrs.length > 9) {
        this.$message.warning('最多添加10条');
      } else {
        this.formValidate.attrs.push({ value: '', detail: [], status: '' });
      }
    },
    // 删除详情模板 - 第二步
    delcustom(index) {
      this.formValidate.attrs.splice(index, 1);
    },

    // 立即生成 - 第二步
    generate() {
      const attrs = [...this.formValidate.attrs];
      let imagesRule = {};
      this.formValidate.attrsImages = attrs
        .sort((a, b) => a.detail[0] - b.detail[0])
        .filter((e) => e.value && e.detail[0])
        .map((e) => {
          if (e.status == 1) {
            imagesRule = {
              ...imagesRule,
              [e.value]: [{ required: false, message: `请上传${e.value}图`, trigger: 'change', type: 'array' }],
            };
          }
          const attrsImages = this.formValidate.attrsImages.find((event) => event.value === e.value);
          if (attrsImages) {
            return { ...attrsImages, ...e };
          } else {
            return { ...e, images: [] };
          }
        });
      this.ruleValidate = { ...ruleInit, ...imagesRule };
    },
    selectChange(formName) {
      this.$refs[formName].validate();
    },
    // 案例详情 - 第三步
    getEditorContent(data) {
      this.content = data;
    },
    // 初始化数据展示
    infoData(data) {
      this.isSelectRule = true;
      this.formValidate = data;
      this.contents = data.content;
    },
    // 添加详情规则-打开弹窗 - 第二步
    addRule() {
      this.$refs.addattr.modal = true;
    },
    // 添加详情模板 - 第二步
    confirm() {
      let that = this;
      that.isSelectRule = true;
      console.log(that.formValidate.selectRule);
      if (!that.formValidate.selectRule) {
        return that.$message.error('请选择属性');
      }
      that.ruleList.forEach(function (item, index) {
        if (item.id === that.formValidate.selectRule) {
          that.formValidate.attrs = item.rule_value;
        }
      });
    },
    // 获取/更新案例详情
    productGetRule() {
      productGetRuleApi().then((res) => {
        this.ruleList = res.data;
      });
    },
    // 获取详情
    getInfo() {
      let that = this;
      that.spinShow = true;
      productNewData(that.$route.params.id)
        .then(async (res) => {
          let data = res.data.detail;
          this.infoData(data);
          this.spinShow = false;
        })
        .catch((res) => {
          this.spinShow = false;
          this.$message.error(res.msg);
        });
    },
    // 删除图片
    handleRemove(i, type, index) {
      switch (type) {
        case 'banner':
          this.formValidate[type].splice(i, 1);
          break;
        case 'attrsImages':
          this.formValidate.attrsImages[index].images.splice(i, 1);
          break;
        default:
          '';
      }
    },

    // 点击案例图
    modalPicTap(tit, picTit, index) {
      this.modalPic = true;
      this.isChoice = tit === 'dan' ? '单选' : '多选';
      this.picTit = picTit;
      this.tableIndex = index === undefined ? null : index;
    },
    // 获取单张图片信息
    getPic(pc) {
      switch (this.picTit) {
        case 'coverImg':
          this.formValidate.coverImg = pc.att_dir;
          break;
        case 'recommendImg':
          this.formValidate.recommendImg = pc.att_dir;
          break;
        default:
          '';
      }
      this.modalPic = false;
    },
    // 获取多张图信息
    getPicD(pc) {
      pc.map((item) => {
        switch (this.picTit) {
          case 'banner':
            this.formValidate.banner.push(item.att_dir);
            this.formValidate.banner = this.formValidate.banner.splice(0, 10);
            console.log(this.formValidate.banner);
            break;
          case 'attrsImages':
            this.formValidate.attrsImages[this.tableIndex].images.push(item.att_dir);
            this.formValidate.attrsImages[this.tableIndex].images = this.formValidate.attrsImages[
              this.tableIndex
            ].images.splice(0, 10);
            break;
          default:
            '';
        }
      });
      this.modalPic = false;
    },
    // 图片移动模块
    handleDragStart(e, item) {
      this.dragging = item;
    },
    handleDragEnd() {
      this.dragging = null;
    },
    handleDragOver(e) {
      e.dataTransfer.dropEffect = 'move';
    },
    handleDragEnter(e, item, type, index) {
      e.dataTransfer.effectAllowed = 'move';
      if (item === this.dragging) {
        return;
      }
      if (type === 'banner') {
        const newItems = this.formValidate[type];
        const src = newItems.indexOf(this.dragging);
        const dst = newItems.indexOf(item);
        newItems.splice(dst, 0, ...newItems.splice(src, 1));
        this.formValidate[type] = newItems;
      } else if (type === 'attrsImages') {
        const newItems = this.formValidate[type][index].images;
        const src = newItems.indexOf(this.dragging);
        const dst = newItems.indexOf(item);
        newItems.splice(dst, 0, ...newItems.splice(src, 1));
        this.formValidate[type][index].images = newItems;
      }
    },
    // 提交
    handleSubmit(name) {
      console.log({ ...this.formValidate, content: this.content });
      this.$refs[name].validate((valid) => {
        console.log(JSON.stringify({ ...this.formValidate, content: this.content }));
        if (valid) {
          const form = { ...this.formValidate, content: this.content };
          if (!this.formValidate.attrs.length) return this.$message.warning('详情设置-请点击详情设置右边确定按钮！');
          if (!this.formValidate.attrsImages.length) return this.$message.warning('详情设置-请点击立即生成按钮！');
          form.attrsImages.forEach((e) => {
            if (e.status && !e.images?.length) {
              this.$message.warning('详情设置-必填图片不能为空！');
              throw Error();
            }
          });
          form.attrsImages.forEach((e) => {
            if (e.status && !e.images?.length) {
              this.$message.warning('详情设置-必填图片不能为空！');
              throw Error();
            }
          });
          form.treeSelect.forEach((e) => {
            e.children.forEach;
            if (e.status && !e.images?.length) {
              this.$message.warning('详情设置-必填图片不能为空！');
              throw Error();
            }
          });
          productNewAdd({ type: '1', ...this.formValidate, content: this.content })
            .then(async (res) => {
              this.openSubimit = false;
              this.$message.success(res.msg);
              if (this.$route.params.id === '0') {
                cacheDelete().catch((err) => {
                  this.$message.error(err.msg);
                });
              }
              setTimeout(() => {
                this.openSubimit = false;
                this.$router.push({ path: this.$routeProStr + '/product/product_list' });
              }, 500);
            })
            .catch((res) => {
              setTimeout((e) => {
                this.openSubimit = false;
              }, 1000);
              this.$message.error(res.msg);
            });
        } else {
          this.$message.warning('请检查您的表单');
        }
      });
    },
    // 表单验证
    validate(prop, status, error) {
      if (status === false) {
        this.$message.warning(error);
      }
    },

    // 过滤详情内容
    formatRichText(html) {
      let newContent = html.replace(/<img[^>]*>/gi, function (match, capture) {
        match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
        match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
        match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
        return match;
      });
      newContent = newContent.replace(/style="[^"]+"/gi, function (match, capture) {
        match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
        return match;
      });
      newContent = newContent.replace(/<br[^>]*\/>/gi, '');
      newContent = newContent.replace(
        /\<img/gi,
        '<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"',
      );
      return newContent;
    },
  },
};
</script>
<style scoped lang="stylus">
::v-deep .el-tabs__item {
  height: 54px !important;
  line-height: 54px !important;
}

.content_width {
  width: 380px;
}

.list-group {
  margin-left: -8px;
}

.borderStyle {
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
}

.drag {
  cursor: move;
  margin: 3px 0
}

.move-icon {
  width: 30px;
  cursor: move;
  margin-right: 10px;
}

.move-icon .icondrag2 {
  font-size: 26px;
  color: #d8d8d8;
}

.maxW ::v-deep.ivu-select-dropdown {
  max-width: 600px;
}

#shopp-manager .ivu-table-wrapper {
  border-left: 1px solid #dcdee2;
  border-top: 1px solid #dcdee2;
}

.noLeft {
  ::v-deep .ivu-form-item-content {
    margin-left: 0 !important;
  }
}

#shopp-manager .ivu-form-item {
  position: relative;
}

#shopp-manager .ivu-form-item .tips {
  position: absolute;
  color: #999;
  top: 29px;
  left: -77px;
  font-size: 12px;
}

.box-video-style {
  width: 40%;
  height: 180px;
  border-radius: 10px;
  background-color: #707070;
  margin-top: 10px;
  position: relative;
  overflow: hidden;
}

.box-video-style .iconv {
  color: #fff;
  line-height: 180px;
  width: 50px;
  height: 50px;
  display: inherit;
  font-size: 26px;
  position: absolute;
  top: -74px;
  left: 50%;
  margin-left: -25px;
}

.box-video-style .mark {
  position: absolute;
  width: 100%;
  height: 30px;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
}

.submission {
  margin-left: 10px;
}

.color-list .tip {
  color: #c9c9c9;
  font-size: 12px;
}

.color-list .color-item {
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  color: #fff;
  margin-right: 10px;
  font-size: 12px;

}

.color-list .color-item.blue {
  background-color: #1E9FFF;
}

.color-list .color-item.yellow {
  background-color: rgb(254, 185, 0);
}

.color-list .color-item.green {
  background-color: #009688;
}

.color-list .color-item.red {
  background-color: #ed4014;
}

.priceBox {
  width: 100%;
}

.rulesBox {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  .item{
    display:flex;
    flex-wrap: wrap;
  }
}

.pictrueBox {
  display: inline-block;
}

.pictrueTab {
  width: 40px !important;
  height: 40px !important;
}

.pictrue {
  width: 60px;
  height: 60px;
  border: 1px dotted rgba(0, 0, 0, 0.1);
  margin-right: 15px;
  display: inline-block;
  position: relative;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }

  .btndel {
    position: absolute;
    z-index: 1;
    width: 20px !important;
    height: 20px !important;
    left: 46px;
    top: -4px;
  }
}

.upLoad {
  width: 58px;
  height: 58px;
  line-height: 58px;
  border: 1px dotted rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.02);
  cursor: pointer;
}

.curs {
  cursor: pointer;
}

.inpWith {
  width: 60%;
}

.labeltop {
  ::v-deep .ivu-form-item-label {
    float: none !important;
    display: inline-block !important;
    margin-left: 120px !important;
    width: auto !important;
  }
}

.video-icon {
  background-image: url('https://cdn.oss.9gt.net/prov1.1/1/icons.png'); // cdn.oss.9gt.net/prov1.1/1/icons.png);
  background-color: #fff;
  background-position: -9999px;
  background-repeat: no-repeat;
}

.see {
  color: #2d8cf0;
  cursor: pointer;
}

.trip {
  color: #bbb;
  margin-bottom: 10px;
  font-size: 12px;
}

.footer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;

  .clear, .submit {
    padding: 10px 20px;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
  }

  .clear {
    background-color: #ccc;
    margin-right: 20px;
  }

  .submit {
    background-color: #2d8cf0;
  }
}

.picBox {
  display: flex;
}

.btndel {
  position: absolute;
  z-index: 9;
  width: 20px !important;
  height: 20px !important;
  left: 46px;
  top: -4px;
}

.ifam {
  width: 344px;
  height: 644px;
  background: url('../../../assets/images/phonebg.png') no-repeat center top;
  background-size: 344px 644px;
  padding: 40px 20px;
  padding-top: 50px;
  margin: 0 auto;

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
<style scoped lang="stylus">
::v-deep.ivu-date-picker {
  width: 300px;
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

.videbox {
  width: 60px;
  height: 60px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  border: 1px dashed #DDDDDD;
  line-height: 50px;
  text-align: center;
  color: #898989;
  font-size: 30px;
  font-weight: 400;
  cursor: pointer;
}


  .custom_box {
    margin-bottom: 10px;
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

.type-radio {
  margin-buttom: 10px;
}

.deteal-btn {
  color: #5179ea;
}

.line {
  border-bottom: 1px dashed #eee;
  margin-bottom: 20px;
}

.labelInput {
  border: 1px solid #dcdee2;
  width: 414px;
  padding: 0 15px;
  border-radius: 5px;
  min-height: 30px;
  cursor: pointer;
  font-size: 12px;

  .span {
    color: #c5c8ce;
  }

  .iconxiayi {
    font-size: 12px;
  }
}

#shopp-manager ::v-deep.ivu-form-item-content {
  line-height: 33px !important;
}

#selectvideo ::v-deep.ivu-form-item-content {
  line-height: 0px !important;
}

.progress {
  margin-top: 10px;
}
.labelInput ::v-deep .el-tag{
  color: #606266;
  background-color: #F0F2F5;
  border-color: #F0F2F5;
  margin-right: 6px;
}
.labelInput ::v-deep .el-tag .el-tag__close{
  color: #909399;
}
.labelInput ::v-deep.el-tag .el-tag__close:hover{
  color: #fff;
  background-color: #909399;
}
.brokerage{
  font-size: 12px;
}
</style>
