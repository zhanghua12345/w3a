<template>
  <div class="table_box">
    <div class="padding-add">
      <el-form
        ref="orderData"
        :model="orderData"
        label-width="80px"
        label-position="right"
        inline
        @submit.native.prevent
      >
        <el-form-item label="订单状态：">
          <el-select
              v-model="orderData.status"
              clearable
              @change="selectChange2"
              placeholder="全部"
              class="form_content_width"
          >
            <el-option value="" label="全部"></el-option>
            <el-option value="0" label="未支付"></el-option>
            <el-option value="1" label="未发货"></el-option>
            <el-option value="2" label="待收货"></el-option>
            <el-option value="3" label="待评价"></el-option>
            <el-option value="4" label="已完成"></el-option>
            <el-option value="5" label="待核销"></el-option>
            <el-option value="6" label="已完成"></el-option>
            <el-option value="-2" label="已退款"></el-option>
            <el-option value="-4" label="已删除"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支付方式：">
          <el-select
              v-model="orderData.pay_type"
              clearable
              @change="userSearchs"
              placeholder="全部"
              class="form_content_width"
          >
            <el-option
                v-for="item in payList"
                :value="item.val"
                :label="item.label"
                :key="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间：">
          <el-date-picker
              clearable
              v-model="timeVal"
              type="daterange"
              @change="onchangeTime"
              format="yyyy/MM/dd"
              value-format="yyyy/MM/dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              style="width: 250px"
              class="mr20"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="搜索：" prop="real_name" label-for="real_name">
          <el-input
              clearable
              v-model="orderData.real_name"
              placeholder="请输入"
              class="form_content_width"
          >
            <el-select v-model="orderData.field_key" slot="prepend" style="width: 100px">
              <el-option value="all" label="全部"></el-option>
              <el-option value="order_id" label="订单号"></el-option>
              <el-option value="uid" label="UID"></el-option>
              <el-option value="real_name" label="用户姓名"></el-option>
              <el-option value="user_phone" label="用户电话"></el-option>
              <el-option value="title" label="商品名称"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="orderSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { putWrite } from '@/api/order';
import { exportOrderList } from '@/api/export';
import timeOptions from '@/libs/timeOptions';
export default {
  name: 'table_from',
  data() {
    return {
      fromList: {
        title: '选择时间',
        custom: true,
        fromTxt: [
          { text: '全部', val: '' },
          { text: '今天', val: 'today' },
          { text: '昨天', val: 'yesterday' },
          { text: '最近7天', val: 'lately7' },
          { text: '最近30天', val: 'lately30' },
          { text: '本月', val: 'month' },
          { text: '本年', val: 'year' },
        ],
      },
      currentTab: '',
      grid: {
        xl: 8,
        lg: 8,
        md: 8,
        sm: 24,
        xs: 24,
      },
      // 搜索条件
      orderData: {
        status: '',
        data: '',
        real_name: '',
        field_key: 'all',
        pay_type: '',
        type: '',
      },
      modalTitleSs: '',
      statusType: '',
      time: '',
      value2: [],
      modals2: false,
      timeVal: [],
      payList: [
        { label: '全部', val: '' },
        { label: '微信支付', val: '1' },
        { label: '支付宝支付', val: '4' },
        { label: '余额支付', val: '2' },
        { label: '线下支付', val: '3' },
      ],
      pickerOptions: timeOptions,
    };
  },
  computed: {
    ...mapState('order', ['orderChartType', 'isDels', 'delIdList', 'orderType']),

    today() {
      const end = new Date();
      const start = new Date();
      var datetimeStart = start.getFullYear() + '/' + (start.getMonth() + 1) + '/' + start.getDate();
      var datetimeEnd = end.getFullYear() + '/' + (end.getMonth() + 1) + '/' + end.getDate();
      return [datetimeStart, datetimeEnd];
    },
  },
  watch: {
    $route() {
      if (this.$route.fullPath === this.$routeProStr + '/order/list?status=1') {
        this.getPath();
      }
    },
    'orderData.field_key':function(val,oval){
      this.getfieldKey(val);
    }
  },
  created() {
    // this.timeVal = this.today;
    // this.orderData.data = this.timeVal ? this.timeVal.join('-') : '';
    if (this.$route.fullPath === this.$routeProStr + '/order/list?status=1') {
      this.getPath();
    }
  },
  methods: {
    ...mapMutations('order', ['getOrderStatus', 'getOrderType', 'getOrderTime', 'setOrderKeyword', 'getfieldKey']),
    getPath() {
      this.orderData.status = this.$route.query.status.toString();
      this.getOrderStatus(this.orderData.status);
      this.$emit('getList', 1);
    },
    // 导出
    async exportList() {
      this.orderData.type = this.orderType === 0 ? '' : this.orderType;
      let [th, filekey, data, fileName] = [[], [], [], ''];
      let excelData = JSON.parse(JSON.stringify(this.orderData));
      excelData.page = 1;
      excelData.limit = 200;
      excelData.ids = this.delIdList;
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
        exportOrderList(excelData).then((res) => {
          resolve(res.data);
        });
      });
    },
    // 具体日期
    onchangeTime(e) {
      this.timeVal = e || [];
      this.orderData.data = this.timeVal[0] ? (this.timeVal ? this.timeVal.join('-') : '') : '';
      this.$store.dispatch('order/getOrderTabs', { data: this.orderData.data });
      this.getOrderTime(this.orderData.data);
      this.$emit('getList', 1);
    },
    // 选择时间
    selectChange(tab) {
      this.$store.dispatch('order/getOrderTabs', { data: tab });
      this.orderData.data = tab;
      this.getOrderTime(this.orderData.data);
      this.timeVal = [];
      this.$emit('getList');
    },
    // 订单选择状态
    selectChange2(tab) {
      this.getOrderStatus(tab);
      this.$emit('getList', 1);
    },
    userSearchs(type) {
      this.getOrderType(type);
      this.$emit('getList', 1);
    },
    // 时间状态
    timeChange(time) {
      this.getOrderTime(time);
      this.$emit('getList');
    },
    // 订单号搜索
    orderSearch() {
      this.setOrderKeyword(this.orderData.real_name);
      this.getfieldKey(this.orderData.field_key);
      this.$emit('getList', 1);
    },
    // 点击订单类型
    onClickTab() {
      this.$emit('onChangeType', this.currentTab);
    },
    // 批量删除
    delAll() {
      if (this.delIdList.length === 0) {
        this.$message.error('请先选择删除的订单！');
      } else {
        if (this.isDels) {
          let idss = {
            ids: this.delIdList,
          };
          let delfromData = {
            title: '删除订单',
            url: `/order/dels`,
            method: 'post',
            ids: idss,
          };
          this.$modalSure(delfromData)
            .then((res) => {
              this.$message.success(res.msg);
              this.$emit('getList');
            })
            .catch((res) => {
              this.$message.error(res.msg);
            });
        } else {
          this.$message.error('您选择的的订单存在用户未删除的订单，无法删除用户未删除的订单！');
        }
      }
    },
    // 刷新
    Refresh() {
      this.$emit('getList');
    },
    //
    handleReset() {
      this.$refs.form.resetFields();
      this.$emit('on-reset');
    },
  },
};
</script>
