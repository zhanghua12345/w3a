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
              <el-form-item label="会员搜索：" label-for="nickname">
                <el-input v-model="userFrom.nickname" placeholder="请输入用户" clearable class="form_content_width">
                  <el-select v-model="userFrom.field_key" slot="prepend" style="width: 100px">
                    <el-option value="all" label="全部"></el-option>
                    <el-option value="uid" label="用户ID"></el-option>
                    <el-option value="phone" label="手机号"></el-option>
                    <el-option value="nickname" label="用户昵称"></el-option>
                  </el-select>
                </el-input>
              </el-form-item>
              <el-form-item label="邀请人手机" label-for="phone">
                <el-input
                  v-model="userFrom.phone"
                  placeholder="请输入邀请人手机"
                  clearable
                  class="form_content_width"
                  style="width: 160px"
                />
              </el-form-item>
              <el-form-item label="状态" label-for="status">
                <el-select v-model="userFrom.status" style="width: 160px">
                  <el-option :value="0" label="待审核"></el-option>
                  <el-option :value="1" label="通过"></el-option>
                  <el-option :value="2" label="驳回"></el-option>
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
        <el-table-column label="会员信息(角色-昵称-名字-手机号)" min-width="200">
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
                  `${scope.row.group_name} - ${scope.row.user.nickname}${
                    scope.row.user.real_name ? ' - ' + scope.row.user.real_name : ''
                  }${scope.row.user.phone ? ' - ' + scope.row.user.phone : ''}`
                "
                class="text-main"
              ></div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="邀请人信息" min-width="200">
          <template slot-scope="scope">
            <div
              style="font-weight: 600"
              v-text="
                `${scope.row.name}${scope.row.wechat_name ? ' - ' + scope.row.wechat_name : ''}${
                  scope.row.phone ? ' - ' + scope.row.phone : ''
                }`
              "
            ></div>
            <div>{{ scope.row.area }}</div>
          </template>
        </el-table-column>
        <el-table-column label="审核" min-width="60">
          <template slot-scope="scope">
            <div :style="{ color: scope.row.status === 0 ? '#f30' : scope.row.status === 1 ? '#67c23a' : '#888' }">
              {{ scope.row.status === 0 ? '待审核' : scope.row.status === 1 ? '已通过' : '驳回' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="审核结果" min-width="120">
          <template slot-scope="scope">
            <div style="color: #888">{{ scope.row.remakes }}</div>
          </template>
        </el-table-column>

        <el-table-column label="提交时间" min-width="140">
          <template slot-scope="scope">
            <div>{{ scope.row.updated_at || scope.row.created_at }}</div>
          </template>
        </el-table-column>
        <el-table-column label="总收益" min-width="80">
          <template slot-scope="scope">
            <div>{{ scope.row.user?.all_money || '0.00' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="余额" min-width="80">
          <template slot-scope="scope">
            <div>{{ scope.row.user?.money || '0.00' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="赠送现金" min-width="80">
          <template slot-scope="scope">
            <div>{{ scope.row.money || '--' }}</div>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" width="120">
          <template slot-scope="scope">
            <a @click="userReview(scope.row)"
            :style="{
                cursor: Number(scope.row.money) ? 'not-allowed' : 'pointer',
                color:  Number(scope.row.money) ? '#888' : '#409eff',
              }"
            >审核</a>
            <el-divider direction="vertical" />
            <a
              @click="useMoney(scope.row)"
              :style="{
                cursor: scope.row.status !== 1 || Number(scope.row.money) ? 'not-allowed' : 'pointer',
                color: scope.row.status !== 1 || Number(scope.row.money) ? '#888' : '#409eff',
              }"
            >
              赠送现金
            </a>
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

    <!-- 审核邀请人 -->
    <el-dialog :visible.sync="showReview" title="审核会员" width="540px" :show-close="true">
      <el-form ref="formInline" :model="reviewData" label-width="100px" @submit.native.prevent :rules="rules">
        <el-form-item label="邀请人姓名">
          <el-input v-model="reviewData.name" class="form_content_width" disabled />
        </el-form-item>
        <el-form-item label="微信昵称">
          <el-input v-model="reviewData.wechat_name" class="form_content_width" disabled />
        </el-form-item>
        <el-form-item label="邀请人手机">
          <el-input v-model="reviewData.phone" class="form_content_width" disabled />
        </el-form-item>
        <el-form-item label="邀请人地址">
          <el-input v-model="reviewData.area" class="form_content_width" disabled />
        </el-form-item>
        <el-divider />
        <el-form-item label="操作" prop="status">
          <el-select v-model="reviewData.status">
            <el-option label="待审核" :value="0" />
            <el-option label="通过" :value="1" />
            <el-option label="驳回" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item :label="reviewData.status === 1 || reviewData.status === 0 ? '备注' : '操作结果'" prop="remakes">
          <el-input
            v-model="reviewData.remakes"
            :placeholder="reviewData.status === 1 || reviewData.status === 0 ? '' : '请输入操作结果'"
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

    <!-- 赠送现金 -->
    <el-dialog :visible.sync="showMoney" title="赠送现金" width="540px" :show-close="true">
      <el-form ref="formInline" :model="moneyData" label-width="100px" @submit.native.prevent :rules="rules">
        <el-form-item label="会员真实姓名">
          <el-input v-model="moneyData.userRegister.rename" class="form_content_width" disabled />
        </el-form-item>
        <el-form-item label="会员昵称">
          <el-input v-model="moneyData.user.nickname" class="form_content_width" disabled />
        </el-form-item>
        <el-form-item label="会员分组">
          <el-input v-model="moneyData.group_name" class="form_content_width" disabled />
        </el-form-item>
        <el-form-item label="邀请人姓名">
          <el-input v-model="moneyData.name" class="form_content_width" disabled />
        </el-form-item>
        <el-form-item label="邀请人手机号">
          <el-input v-model="moneyData.phone" class="form_content_width" disabled />
        </el-form-item>
        <el-divider />
        <el-form-item prop="money" label="赠送现金">
          <el-input
            v-model="moneyData.money"
            placeholder=" 请谨慎操作"
            clearable
            type="number"
            class="form_content_width"
          />
          <span style="color: #f30">该操作无法撤回，请确认后再操作</span>
        </el-form-item>
      </el-form>

      <div class="acea-row row-right mt20">
        <el-button @click="showMoney = false">取消</el-button>
        <el-button type="primary" @click="moneySubmit()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import expandRow from './tableExpand.vue';
import { inviteList, inviteProcess, addMoney } from '@/api/data';

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
      rules: {
        status: [{ required: true, message: '请选择状态', trigger: 'change' }],
        money: [{ required: true, message: '请输入金额', trigger: 'change' }],
      },

      settingData: {
        id: '',
        type: 'offer',
        remarks: '',
      },
      showReview: false,
      reviewData: {},
      showMoney: false,
      moneyData: { user: {},userRegister:{} },
    };
  },
  async created() {
    await this.getList();
  },

  methods: {
    // 会员列表
    getList() {
      this.loading = true;
      inviteList(this.userFrom)
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
      if ( Number(data?.money)) return false;
      this.showReview = true;
      this.reviewData = { ...data };
    },
    useMoney(data) {
      if (data.status !== 1 || Number(data?.money)) return false;
      this.showMoney = true;
      this.moneyData = { ...data };
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
    async reviewSubmit() {
      this.showReview = false;
      console.log(this.settingData);
      await inviteProcess({ id: this.reviewData.id, status: this.reviewData.status, remakes: this.reviewData.remakes })
        .then(async (res) => {
          this.$message.success('修改成功');
        })
        .catch((res) => {
          this.$message.error(res.msg);
        });
      this.getList();
    },
    async moneySubmit() {
      this.showMoney = false;
      if (Number(this.moneyData.money) && this.moneyData.status === 1) {
        await addMoney({ id: this.moneyData.id, money: this.moneyData.money })
          .then(async (res) => {
            this.$message.success('赠送成功');
          })
          .catch((res) => {
            this.$message.error(res.msg);
          });
        this.getList();
      }
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
