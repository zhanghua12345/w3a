<template>
  <div>
    <el-card :bordered="false" shadow="never" class="ivu-mt" :body-style="{ padding: 0 }">
      <div class="padding-add">
        <el-form
          ref="userFrom"
          :model="userFrom"
          label-width="80px"
          label-position="right"
          @submit.native.prevent
          inline
        >
          <div class="acea-row search-form">
            <div>
              <el-form-item label="会员搜索" label-for="nickname">
                <el-input v-model="userFrom.nickname" placeholder="请输入用户" clearable class="form_content_width">
                  <el-select v-model="field_key" slot="prepend" style="width: 100px">
                    <el-option value="all" label="全部"></el-option>
                    <el-option value="uid" label="用户ID"></el-option>
                    <el-option value="phone" label="手机号"></el-option>
                    <el-option value="nickname" label="用户昵称"></el-option>
                  </el-select>
                </el-input>
              </el-form-item>
              <el-form-item label="支付宝账号" label-for="nickname">
                <el-input
                  v-model="userFrom.nickname"
                  placeholder="请输入用户"
                  clearable
                  class="form_content_width"
                  style="width: 160px"
                />
              </el-form-item>
              <el-form-item label="联系方式" label-for="nickname">
                <el-input
                  v-model="userFrom.nickname"
                  placeholder="请输入用户"
                  clearable
                  class="form_content_width"
                  style="width: 160px"
                />
              </el-form-item>
              <el-form-item label="状态" label-for="nickname">
                <el-select v-model="field_key" style="width: 160px">
                  <el-option value="all" label="待付款"></el-option>
                  <el-option value="all" label="已转账"></el-option>
                  <el-option value="all" label="驳回"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <el-form-item class="search-form-sub">
              <el-button type="primary" @click="userSearchs">搜索</el-button>
              <el-button class="ResetSearch" @click="reset('userFrom')">重置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>
    <el-card :bordered="false" shadow="never" class="ivu-mt mt16" :body-style="{ padding: '0 20px 20px' }">
      <el-table
        :data="userLists"
        class="mt16"
        ref="table"
        highlight-current-row
        v-loading="loading"
        empty-text="暂无数据"
        no-filtered-userFrom-text="暂无筛选结果"
      >
        <el-table-column label="会员ID" min-width="60">
          <template slot-scope="scope">
            <span>{{ scope.row.user.uid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="头像" min-width="60">
          <template slot-scope="scope">
            <div class="tabBox_img" v-viewer>
              <img v-lazy="scope.row.user.avatar" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="会员信息(角色-昵称-名字-手机号)" min-width="180">
          <template slot-scope="scope">
            <div class="acea-row" style="align-items: center">
              <i class="el-icon-male" v-show="scope.row.user.sex === '男'" style="color: #2db7f5; font-size: 15px"></i>
              <i
                class="el-icon-female"
                v-show="scope.row.user.sex === '女'"
                style="color: #ed4014; font-size: 15px"
              ></i>
              <div
                v-text="
                  `员工 - ${scope.row.user.nickname}${
                    scope.row.user.real_name ? ' - ' + scope.row.user.real_name : ''
                  }${scope.row.user.phone ? ' - ' + scope.row.user.phone : ''}`
                "
                class="text-main"
              ></div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="提现信息(真实姓名-支付宝账号)" min-width="140">
          <template slot-scope="scope">
            <div style="font-weight: 600">张三 - 1587908160</div>
          </template>
        </el-table-column>
        <el-table-column label="联系方式" min-width="80">
          <template slot-scope="scope">
            <div>15879081640</div>
          </template>
        </el-table-column>

        <el-table-column label="提交时间" min-width="110">
          <template slot-scope="scope">
            <div>{{ scope.row.created_at }}</div>
          </template>
        </el-table-column>
        <el-table-column label="状态" min-width="60">
          <template slot-scope="scope">
            <div :style="{ color: scope.row.status === 0 ? '#f30' : scope.row.status === 1 ? '##67c23a' : '#888' }">
              {{ scope.row.status === 0 ? '待付款' : scope.row.status === 1 ? '已转账' : '驳回' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="备注" min-width="120">
          <template slot-scope="scope">
            <div style="color: #888">{{ scope.row.remarks }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="60">
          <template slot-scope="scope">
            <a @click="userReview(scope.row)">审核</a>
          </template>
        </el-table-column>
      </el-table>
      <div class="acea-row row-right page">
        <pagination
          v-if="total"
          :total="total"
          :page.sync="userFrom.page"
          :limit.sync="userFrom.limit"
          @pagination="pageChange"
        />
      </div>
    </el-card>

    <!-- 审核会员 -->
    <el-dialog :visible.sync="showReview" title="提现确认" width="540px" :show-close="true">
      <el-form ref="formInline" :model="reviewData" label-width="100px" @submit.native.prevent>
        <el-form-item label="姓名">
          <el-input v-model="reviewData.user.real_name" class="form_content_width" disabled />
        </el-form-item>
        <el-form-item label="支付宝账号">
          <el-input v-model="reviewData.user.phone" class="form_content_width" disabled />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="reviewData.user.phone" class="form_content_width" disabled />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="reviewData.state">
            <el-option label="已转账" :value="1" />
            <el-option label="驳回" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item :label="reviewData.state === 1 ? '转账时间' : '驳回理由'" prop="remarks" v-if="reviewData.state">
          <el-input
            v-model="reviewData.remarks"
            :placeholder="reviewData.state === 1 ? '' : '请输入驳回理由'"
            clearable
            class="form_content_width"
          />
        </el-form-item>
      </el-form>

      <div class="acea-row row-right mt20">
        <el-button @click="showReview = false">取消</el-button>
        <el-button type="primary" @click="reviewSubmit()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import expandRow from './tableExpand.vue';
import { offerList, setAddRemarks } from '@/api/data';

export default {
  name: 'baojia_list',
  components: {
    expandRow,
  },
  data() {
    return {
      field_key: '',
      loading: false,
      total: 0,
      userLists: [],
      userFrom: {
        page: 1,
        limit: 15,
      },
      reviewData: { user: {} },
      settingData: {
        id: '',
        type: 'offer',
        remarks: '',
      },
      showSetting: false,
      showReview: false,
    };
  },
  async created() {
    await this.getList();
  },

  methods: {
    // 会员列表
    getList() {
      this.loading = true;
      offerList(this.userFrom)
        .then(async (res) => {
          this.userLists = res.data.list;

          this.total = res.data.count;
          this.loading = false;
        })
        .catch((res) => {
          this.loading = false;
          this.$message.error(res.msg);
        });
    },
    userReview(data) {
      this.showReview = true;
      console.log(data);
      this.reviewData = data;
    },
    pageChange() {
      this.getList();
    },
    // 搜索
    userSearchs() {
      this.userFrom.page = 1;
      this.getList();
    },
    // 重置
    reset() {
      this.userFrom = {
        page: 1, // 当前页
        limit: 20, // 每页显示条数
      };
      this.field_key = '';
      this.getList();
    },
    userDetail(data) {
      this.showSetting = true;
      this.settingData = { ...this.settingData, id: data.id, remarks: data.remarks };
    },
    async submit() {
      this.showSetting = false;
      console.log(this.settingData);
      await setAddRemarks(this.settingData)
        .then(async (res) => {
          this.$message.success('修改成功');
        })
        .catch((res) => {
          this.$message.error(res.msg);
        });
      this.getList();
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-tabs__item {
  height: 54px !important;
  line-height: 54px !important;
}

.userFrom {
  ::v-deep .ivu-form-item-content {
    margin-left: 0px !important;
  }
}

img {
  height: 36px;
  display: block;
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

.search-form {
  display: flex;
  justify-content: space-between;
  .search-form-box {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
  }
}
.search-form-sub {
  display: flex;
}
</style>
