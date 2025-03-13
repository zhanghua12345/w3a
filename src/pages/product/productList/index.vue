<template>
  <div class="article-manager">
    <el-card :bordered="false" shadow="never" class="ivu-mt" :body-style="{ padding: 0 }">
      <div class="padding-add">
        <el-form ref="artFrom" :model="artFrom" label-width="90px" label-position="right" inline @submit.native.prevent>
          <el-form-item label="案例名称：" label-for="name">
            <el-input clearable placeholder="请搜索案例名称" v-model="artFrom.name" />
          </el-form-item>
          <!-- <el-form-item label="作者：" label-for="author">
            <el-input clearable placeholder="请搜索作者" v-model="artFrom.author" />
          </el-form-item> -->
          <el-form-item label="ID：" label-for="id">
            <el-input clearable placeholder="请搜索案例ID" v-model="artFrom.id" />
          </el-form-item>
          <el-form-item label="分类：" label-for="pid">
            <el-cascader
              v-model="artFrom.cate_id"
              size="small"
              :options="treeSelect"
              :props="{ multiple: false, emitPath: false, checkStrictly: true }"
              clearable
            ></el-cascader>
          </el-form-item>
          <el-form-item label="状态" label-for="status">
            <el-select v-model.trim="artFrom.status">
              <el-option value="" label="全部"></el-option>
              <el-option :value="1" label="上架"></el-option>
              <el-option :value="0" label="下架"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否推荐：" label-for="isRecommend">
            <el-select v-model.trim="artFrom.isRecommend">
              <el-option value="" label="全部"></el-option>
              <el-option :value="1" label="显示"></el-option>
              <el-option :value="0" label="不显示"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否热门：" label-for="hot">
            <el-select v-model="artFrom.hot">
              <el-option value="" label="全部"></el-option>
              <el-option :value="1" label="显示"></el-option>
              <el-option :value="0" label="不显示"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否最新：" label-for="new">
            <el-select v-model="artFrom.new">
              <el-option value="" label="全部"></el-option>
              <el-option :value="1" label="显示"></el-option>
              <el-option :value="0" label="不显示"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="userSearchs">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card :bordered="false" shadow="never" class="ivu-mt mt16" :body-style="{ padding: '0 20px 20px' }">
      <el-tabs v-model="artFrom.type" @tab-click="onClickTab">
        <el-tab-pane
          :label="item.name + '(' + item.count + ')'"
          :name="item.type.toString()"
          v-for="(item, index) in headeNum"
          :key="index"
        />
      </el-tabs>
      <div class="Button">
        <router-link v-auth="['product-product-save']" :to="$routeProStr + '/product/add_product'"
          ><el-button type="primary" class="mr14">添加案例</el-button></router-link
        >
        <!-- <el-button v-auth="['product-product-product_show']" @click="onDismount" v-show="artFrom.type === '1'"
          >批量下架</el-button
        > -->
        <!-- <el-button v-auth="['export-storeProduct']" class="export" @click="exports">导出</el-button> -->
      </div>
      <el-table
        ref="table"
        :data="tableList"
        class="ivu-mt mt14"
        v-loading="loading"
        highlight-current-row
        :row-key="getRowKey"
        @selection-change="handleSelectRow"
        empty-text="暂无数据"
      >
        <el-table-column type="expand" width="50" v-if="['1', '2'].includes(artFrom.type)">
          <template slot-scope="scope">
            <expandRow :row="scope.row"></expandRow>
          </template>
        </el-table-column>
        <!-- <el-table-column type="selection" width="60" :reserve-selection="true"> </el-table-column> -->
        <el-table-column label="ID" width="50">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="封面图" min-width="50">
          <template slot-scope="scope">
            <div class="tabBox_img" v-viewer>
              <img v-lazy="scope.row.coverImg" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="案例名称" min-width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="作者" min-width="60">
          <template slot-scope="scope">
            <el-tooltip placement="top-start" :content="scope.row.author || '--'">
              <div class="line2">{{ scope.row.author || '--' }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="是否推荐" min-width="60">
          <template slot-scope="scope">
            <span>{{ scope.row.isRecommend == 0 ? '否' : '是' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总浏览量" width="100">
          <template slot-scope="scope">
            <span class="mr-10">{{ scope.row.realBrowse }}</span>
          </template>
        </el-table-column>
        <el-table-column label="浏览量真实值" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.realBrowse - scope.row.browse }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总点赞量" width="100">
          <template slot-scope="scope">
            <span class="mr-10">{{ scope.row.realPraise }}</span>
          </template>
        </el-table-column>
        <el-table-column label="点赞量真实值" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.realPraise - scope.row.praise }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" min-width="100">
          <template slot-scope="scope">
            <el-switch
              class="defineSwitch"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status"
              :value="scope.row.status"
              @change="changeSwitch(scope.row)"
              size="large"
              active-text="上架"
              inactive-text="下架"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" minWidth="100">
          <template slot-scope="scope">
            <!-- <a @click="look(scope.row)">查看</a>
            <el-divider direction="vertical"></el-divider> -->
            <a @click="edit(scope.row)">编辑</a>
            <el-divider direction="vertical"></el-divider>
            <a @click="AIClick(scope.row)">AI配置</a>
            <el-divider direction="vertical"></el-divider>
            <a v-if="artFrom.type === '4'" @click="del(scope.row, '恢复案例', scope.$index)">恢复案例</a>
            <a v-else @click="del(scope.row, '移入失效案例', scope.$index)">刪除</a>
          </template>
        </el-table-column>
      </el-table>
      <div class="acea-row row-right page">
        <pagination
          v-if="total"
          :total="total"
          :page.sync="artFrom.page"
          :limit.sync="artFrom.limit"
          @pagination="getDataList"
        />
      </div>
      <attribute :attrTemplate="attrTemplate" v-on:changeTemplate="changeTemplate"></attribute>
    </el-card>
    <!-- 用户标签 -->
    <el-dialog
      :visible.sync="labelShow"
      title="请选择用户标签"
      width="540px"
      :show-close="true"
      :close-on-click-modal="false"
    >
      <userLabel ref="userLabel" @activeData="activeData" @close="labelClose"></userLabel>
    </el-dialog>
    <!-- 案例弹窗 -->
    <div v-if="isProductBox">
      <div class="bg" @click="isProductBox = false"></div>
      <goodsDetail :goodsId="goodsId"></goodsDetail>
    </div>
    <coupon-list ref="couponTemplates" @nameId="nameId" :couponids="batchFormData.coupon_ids"></coupon-list>
    <!-- AI配置 -->
    <el-dialog :visible.sync="showAI" title="AI配置" width="800px" :show-close="true" class="aiModule">
      <el-form ref="formInline" :model="formAI" label-width="100px" @submit.native.prevent label-position="top">
        <el-row :gutter="24" justify="left" align="middle">
          <el-col :span="12" v-for="(item, index) in AIData" :key="index">
            <el-form-item :label="item.problem">
              <template v-if="item.type === 'input' ||item.type === ''">
                <el-input v-model="formAI[item.id]" />
              </template>
              <template v-if="item.type === 'number'">
                <el-input v-model="formAI[item.id]" type="number" />
              </template>
              <template v-if="item.type === 'opt'">
                <el-select v-model="formAI[item.id]" placeholder="请选择AI类型" style="width: 100%">
                  <el-option :value="e.value" :label="e.value" v-for="(e, i) in JSON.parse(item.content).sort((a,b)=>Number(a)-Number(b))" :key="i" />
                </el-select>
              </template>
              <template v-if="item.type === 'radio'">
                <el-radio-group v-model="formAI[item.id]">
                  <el-radio :value="e.value" :label="e.value" v-for="(e, i) in (JSON.parse(item.content).sort((a,b)=>Number(a.sort)-Number(b.sort)))" :key="i" />
                </el-radio-group>
              </template>
              <template v-if="item.type === 'textarea'">
                <el-input v-model="formAI[item.id]" type="textarea" :rows="2" />
              </template>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div class="acea-row row-right mt20">
        <el-button @click="showAI = false">取消</el-button>
        <el-button type="primary" @click="AISubmit()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import expandRow from './tableExpand.vue';
import attribute from './attribute';
import toExcel from '../../../utils/Excel.js';
import { mapState } from 'vuex';
import taoBao from './taoBao';
import goodsDetail from './components/goodsDetail.vue';
import couponList from '@/components/couponList';
import { exportProductList } from '@/api/export';

import {
  getGoodHeade,
  getGoods,
  PostgoodsNewIsShow,
  cascaderListApi, // 分类列表
  productShowApi,
  productUnshowApi,
  storeProductApi,
  productListAi,
  caseAnswer,
  batchSetting,
  productGetTemplateApi,
  productNewList,
} from '@/api/product';
import userLabel from '@/components/labelList';
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
  name: 'product_productList',
  components: { expandRow, attribute, taoBao, goodsDetail, userLabel, couponList },
  computed: {
    ...mapState('userLevel', ['categoryId']),
  },
  data() {
    return {
      template: false,
      modals: false,
      batchModal: false,
      labelShow: false,
      batchType: 1, // 批量设置类型
      batchFormData: {
        cate_id: [],
        logistics: [],
        freight: 2,
        postage: 0,
        temp_id: null,
        give_integral: 0,
        label_id: [],
        coupon_ids: [],
        recommend: [],
      },
      ruleBatch: {},
      couponName: [], // 优惠券
      dataLabel: [], // 标签
      templateList: [], // 运费模版
      grid: {
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24,
      },
      artFrom: {
        page: 1,
        limit: 15,
        cate_id: '',
        type: '1',
        store_name: '',
      },
      list: [],
      tableList: [],
      headeNum: [],
      loading: false,
      data: [],
      total: 0,
      attrTemplate: false,
      ids: [],
      goodsId: '',
      isProductBox: false,
      treeSelect: [],
      multipleSelection: [],
      showAI: false,
      AIData: [],
      formAI: {},
      AIRules: ruleInit,
    };
  },
  watch: {
    $route() {
      if (this.$route.fullPath === this.$routeProStr + '/product/product_list?type=5') {
        this.getPath();
      }
    },
  },
  created() {},
  activated() {
    this.goodHeade();
    this.goodsCategory();
    if (this.$route.fullPath === this.$routeProStr + '/product/product_list?type=5') {
      this.getPath();
    } else {
      this.getDataList();
      this.getProductAIList();
    }
  },
  methods: {
    AIClick(row) {
      const formAI = { id: row.id };
      (row?.problem || []).forEach((e) => (formAI[e.perblem_id] = e.answer));
      this.formAI = formAI

      console.log(this.formAI )
      this.showAI = true;
    },
    AISubmit() {
      const answer = [];
      Object.keys(this.formAI).forEach((key) => {
        if (key !== 'id') {
          answer.push({ perblem_id: key, answer: this.formAI[key] });
        }
      });
      let formAI = { case_id: this.formAI.id, answer };
      console.log(formAI);
      caseAnswer(formAI)
        .then((res) => {
          this.$message.success(res.msg);
          this.showAI = false;
          this.goodHeade();
          this.getDataList();
        })
        .catch((res) => {
          this.$message.error(res.msg);
        });
    },

    batchSub() {
      let data = this.batchFormData;
      data.ids = this.ids;
      data.type = this.batchType;
      let activeIds = [];
      this.dataLabel.forEach((item) => {
        activeIds.push(item.id);
      });
      data.label_id = activeIds;
      if (this.batchType == 2 && !this.batchFormData.logistics.length) {
        return this.$message.warning('请选择物流方式');
      }
      batchSetting(data)
        .then((res) => {
          this.$message.success(res.msg);
          this.getDataList();
          this.clearBatchData(false);
          this.ids = [];
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
    },
    clearBatchData(status) {
      if (!status) {
        this.batchFormData = {
          cate_id: [],
          logistics: [],
          freight: 0,
          postage: null,
          temp_id: null,
          give_integral: null,
          label_id: [],
          coupon_ids: [],
          recommend: [],
        };
        this.dataLabel = [];
      }
      this.batchModal = false;
      this.$refs.table.clearSelection();
    },
    // 批量设置案例
    batchSelect(type) {
      if (!this.ids.length) {
        this.$message.warning('请选择要修改的案例');
      } else {
        this.batchType = type;
        this.batchModal = true;
        this.productGetTemplate();
      }
    },
    activeData(dataLabel) {
      this.labelShow = false;
      this.dataLabel = dataLabel;
    },
    nameId(id, names) {
      this.batchFormData.coupon_ids = id;
      this.couponName = this.unique(names);
    },
    handleClose(name) {
      let index = this.couponName.indexOf(name);
      this.couponName.splice(index, 1);
      this.formValidate.coupon_ids.splice(index, 1);
    },
    //对象数组去重；
    unique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
    },
    // 获取运费模板；
    productGetTemplate() {
      productGetTemplateApi().then((res) => {
        this.templateList = res.data;
      });
    },
    // 标签弹窗关闭
    labelClose() {
      this.labelShow = false;
    },
    look(row) {
      this.goodsId = row.id;
      this.isProductBox = true;
    },
    // 物流方式
    logisticsBtn(e) {
      this.batchFormData.logistics = e;
    },
    // 关联用户标签
    openLabel() {
      this.labelShow = true;
      // this.$refs.userLabel.setLabel(JSON.parse(JSON.stringify(this.dataLabel)));
    },
    closeLabel(label) {
      let index = this.dataLabel.indexOf(this.dataLabel.filter((d) => d.id == label.id)[0]);
      this.dataLabel.splice(index, 1);
    },
    // 添加优惠券
    addCoupon() {
      this.$refs.couponTemplates.isTemplate = true;
      this.$refs.couponTemplates.tableList();
    },
    getPath() {
      this.artFrom.page = 1;
      this.artFrom.type = this.$route.query.type.toString();
      this.getDataList();
    },
    // 导出
    async exports() {
      let [th, filekey, data, fileName] = [[], [], [], ''];
      let excelData = JSON.parse(JSON.stringify(this.artFrom));
      excelData.page = 1;
      excelData.limit = 50;
      excelData.ids = this.ids;
      for (let i = 0; i < excelData.page + 1; i++) {
        let lebData = await this.getExcelData(excelData);
        if (!fileName) fileName = lebData.filename;
        if (!filekey.length) {
          filekey = lebData.fileKey;
        }
        if (!th.length) th = lebData.header;
        if (lebData.export.length) {
          data = data.concat(lebData.export);
          excelData.page++;
        } else {
          this.$exportExcel(th, filekey, fileName, data);
          return;
        }
      }
    },
    getExcelData(excelData) {
      return new Promise((resolve, reject) => {
        exportProductList(excelData).then((res) => {
          resolve(res.data);
        });
      });
    },
    freight() {
      this.$refs.template.isTemplate = true;
    },
    // 批量上架
    onShelves() {
      if (this.ids.length === 0) {
        this.$message.warning('请选择要上架的案例');
      } else {
        let data = {
          ids: this.ids,
        };
        productShowApi(data)
          .then((res) => {
            this.$message.success(res.msg);
            this.goodHeade();
            this.getDataList();
          })
          .catch((res) => {
            this.$message.error(res.msg);
          });
      }
    },
    // 批量下架
    onDismount() {
      if (this.ids.length === 0) {
        this.$message.warning('请选择要下架的案例');
      } else {
        let data = {
          ids: this.ids,
        };
        productUnshowApi(data)
          .then((res) => {
            this.$message.success(res.msg);
            this.artFrom.page = 1;
            this.goodHeade();
            this.getDataList();
          })
          .catch((res) => {
            this.$message.error(res.msg);
          });
      }
    },

    // 全选
    // onSelectTab (selection) {
    //     let data = []
    //     selection.map((item) => {
    //         data.push(item.id)
    //     })
    //     this.ids = data
    // },
    getRowKey(row) {
      return row.id;
    },
    //  选中某一行
    handleSelectRow(selection) {
      const uniqueArr = [];
      const ids = [];
      for (let i = 0; i < selection.length; i++) {
        const item = selection[i];
        if (!ids.includes(item.id)) {
          uniqueArr.push(item);
          ids.push(item.id);
        }
      }
      this.ids = ids;
      this.multipleSelection = uniqueArr;
    },
    // 添加淘宝案例成功
    onClose() {
      this.modals = false;
    },
    // 复制淘宝
    onCopy() {
      this.$router.push({
        path: this.$routeProStr + '/product/add_product',
        query: { type: -1 },
      });
      // this.modals = true
    },
    // tab选择
    onClickTab() {
      this.artFrom.page = 1;
      this.multipleSelection = [];
      this.$refs.table.clearSelection();
      this.getDataList();
    },
    // 下拉树
    handleCheckChange(data) {
      let value = '';
      let title = '';
      this.list = [];
      this.artFrom.cate_id = 0;
      data.forEach((item, index) => {
        value += `${item.id},`;
        title += `${item.title},`;
      });
      value = value.substring(0, value.length - 1);
      title = title.substring(0, title.length - 1);
      this.list.push({
        value,
        title,
      });
      this.artFrom.cate_id = value;
      this.getDataList();
    },
    // 获取案例表单头数量
    goodHeade() {
      getGoodHeade({ cate_id: this.artFrom.cate_id, store_name: this.artFrom.store_name })
        .then((res) => {
          this.headeNum = res.data.list;
        })
        .catch((res) => {
          this.$message.error(res.msg);
        });
    },
    // 案例分类；
    goodsCategory() {
      cascaderListApi(1)
        .then((res) => {
          this.treeSelect = res.data;
        })
        .catch((res) => {
          this.$message.error(res.msg);
        });
    },
    // 案例列表；
    getDataList() {
      this.loading = true;
      this.artFrom.cate_id = this.artFrom.cate_id || '';
      console.log(this.artFrom);
      productNewList(this.artFrom)
        .then((res) => {
          let data = res.data;
          this.tableList = data.list;
          this.total = res.data.count;
          this.$nextTick(() => {
            //确保dom加载完毕
            // this.setChecked();
            this.showSelectData();
          });
          this.loading = false;
        })
        .catch((res) => {
          this.loading = false;
          this.$message.error(res.msg);
        });
    },
    getProductAIList() {
      productListAi({
        page: 1,
        limit: 100,
      })
        .then((res) => {
          let data = res.data.list.filter((e) => e.status === 1).sort((a, b) => a - b);
          this.AIData = data;
          console.log(this.AIData);
        })
        .catch((res) => {
          this.loading = false;
          this.$message.error(res.msg);
        });
    },
    showSelectData() {
      if (this.multipleSelection.length > 0) {
        // 判断是否存在勾选过的数据
        this.tableList.forEach((row) => {
          // 获取数据列表接口请求到的数据
          this.multipleSelection.forEach((item) => {
            // 勾选到的数据
            if (row.id === item.id) {
              this.$refs.table.toggleRowSelection(item, true); // 若有重合，则回显该条数据
            }
          });
        });
      }
    },
    // 表格搜索
    userSearchs() {
      this.artFrom.page = 1;
      this.goodHeade();
      this.getDataList();
    },
    // 上下架
    changeSwitch(row) {
      console.log(row);
      PostgoodsNewIsShow(row.id, row.status || 0)
        .then((res) => {
          this.$message.success(res.msg);
          this.goodHeade();
          this.getDataList();
        })
        .catch((res) => {
          row.status = !row.status ? 1 : 0;
          this.$message.error(res.msg);
        });
    },
    // 数据导出；
    exportData: function () {
      let th = ['案例名称', '案例简介', '案例分类', '价格', '库存', '销量', '收藏人数'];
      let filterVal = ['store_name', 'store_info', 'cate_name', 'price', 'stock', 'sales', 'collect'];
      this.where.page = 'nopage';
      getGoods(this.where).then((res) => {
        let data = res.data.map((v) => filterVal.map((k) => v[k]));
        let fileTime = Date.parse(new Date());
        let [fileName, fileType, sheetName] = ['商户数据_' + fileTime, 'xlsx', '商户数据'];
        toExcel({ th, data, fileName, fileType, sheetName });
      });
    },
    // 属性弹出；
    attrTap() {
      this.attrTemplate = true;
    },
    changeTemplate(msg) {
      this.attrTemplate = msg;
    },
    // 编辑
    edit(row) {
      this.$router.push({ path: this.$routeProStr + '/product/add_product/' + row.id });
    },
    // 确认
    del(row, tit, num) {
      let delfromData = {
        title: tit,
        num: num,
        url: `product/product_new/${row.id}`,
        method: 'DELETE',
        ids: '',
        un: 1,
      };
      this.$modalSure(delfromData)
        .then((res) => {
          this.$message.success(res.msg);
          this.tableList.splice(num, 1);
          this.goodHeade();
          this.getDataList();
        })
        .catch((res) => {
          this.$message.error(res.msg);
        });
    },
  },
};
</script>
<style scoped lang="scss">
::v-deep .el-tabs__item {
  height: 54px !important;
  line-height: 54px !important;
}

::v-deep.ivu-modal-mask {
  z-index: 999 !important;
}

::v-deep.ivu-modal-wrap {
  z-index: 999 !important;
}

.Box {
  ::v-deep .ivu-modal-body {
    height: 700px;
    overflow: auto;
  }
}

.batch-box {
  ::v-deep .ivu-modal-body {
    overflow: auto;
    min-height: 350px;
  }
}

.tabBox_img {
  width: 36px;
  height: 36px;
  border-radius: 4px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
}

.bg {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 11;
}

::v-deep.happy-scroll-content {
  width: 100%;

  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }

  @keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }

    50% {
      transform: rotate(180deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  .demo-spin-col {
    height: 100px;
    position: relative;
    border: 1px solid #eee;
  }
}

.labelInput {
  border: 1px solid #dcdee2;
  width: 100%;
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

.el-dropdown-link {
  cursor: pointer;
  color: var(--prev-color-primary);
  font-size: 12px;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.el-dropdown-menu__item {
  a {
    color: #606266;
  }
}

.label_width {
  width: 400px;
}
::v-deep .aiModule .el-form-item__label {
  padding: 0 !important;
}
</style>
