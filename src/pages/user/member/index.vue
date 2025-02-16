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
              <el-form-item label="用户搜索：" label-for="nickname">
                <el-input v-model="userFrom.nickname" placeholder="请输入用户" clearable class="form_content_width">
                  <el-select v-model="field_key" slot="prepend" style="width: 100px">
                    <el-option value="all" label="全部"></el-option>
                    <el-option value="uid" label="用户ID"></el-option>
                    <el-option value="phone" label="手机号"></el-option>
                    <el-option value="nickname" label="用户昵称"></el-option>
                  </el-select>
                </el-input>
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
        <!-- <el-table-column type="expand">
          <template slot-scope="scope">
            <expandRow :row="scope.row" type="offer" />
          </template>
        </el-table-column> -->
        <el-table-column label="用户ID" min-width="80">
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
        <el-table-column label="昵称" min-width="150">
          <template slot-scope="scope">
            <div class="acea-row" style="align-items: center">
              <i class="el-icon-male" v-show="scope.row.user.sex === '男'" style="color: #2db7f5; font-size: 15px"></i>
              <i
                class="el-icon-female"
                v-show="scope.row.user.sex === '女'"
                style="color: #ed4014; font-size: 15px"
              ></i>
              {{ scope.row.user.nickname }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="真实姓名" min-width="100">
          <template slot-scope="scope">
            <div>{{ scope.row.user.real_name || '--' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="分组" min-width="100">
          <template slot-scope="scope">
            <div>{{ scope.row.group.group_name || '--' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="手机号" min-width="100">
          <template slot-scope="scope">
            <div>{{ scope.row.user.phone }}</div>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" min-width="140">
          <template slot-scope="scope">
            <div>{{ scope.row.user.created_at }}</div>
          </template>
        </el-table-column>
        <el-table-column label="审核备注" min-width="100">
          <template slot-scope="scope">
            <div class="text-main">
              {{ scope.row.status === 0 ? '待审核' : scope.row.status === 1 ? '审核成功' : '审核失败' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="审核备注" min-width="100">
          <template slot-scope="scope">
            <div class="text-main">{{ scope.row.remarks }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="80">
          <template slot-scope="scope">
            <!-- <a @click="userDetail(scope.row)">备注</a>
            <el-divider direction="vertical"></el-divider> -->
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

    <!-- 设置备注 -->
    <el-dialog :visible.sync="showSetting" title="设置用户信息" width="540px" :show-close="true">
      <el-form ref="formInline" :model="settingData" label-width="100px" @submit.native.prevent>
        <el-form-item label="备注：" prop="image">
          <el-input v-model="settingData.remarks" placeholder="请输入用户" clearable class="form_content_width" />
        </el-form-item>
      </el-form>
      <div class="acea-row row-right mt20">
        <el-button @click="showSetting = false">取消</el-button>
        <el-button type="primary" @click="submit">确认</el-button>
      </div>
    </el-dialog>
    <!-- 审核会员 -->
    <el-dialog :visible.sync="showReview" title="审核会员" width="540px" :show-close="true">
      <el-form ref="formInline" :model="reviewData" label-width="100px" @submit.native.prevent>
        <el-form-item label="昵称：">
          <el-input v-model="reviewData.user.nickname" class="form_content_width" disabled />
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="reviewData.user.phone" class="form_content_width" disabled />
        </el-form-item>
        <el-form-item label="真实姓名：">
          <el-input v-model="reviewData.user.real_name" class="form_content_width" disabled />
        </el-form-item>
        <el-form-item label="审核状态：" prop="state">
          <el-select v-model="reviewData.state">
            <el-option label="通过" :value="1" />
            <el-option label="驳回" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item :label="reviewData.state === 1 ? '备注：' : '驳回理由：'" prop="remarks" v-if="reviewData.state">
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
import { registerList, setRegisters } from '@/api/user';
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
      settingData: {
        id: '',
        type: 'offer',
        remarks: '',
      },
      reviewData: { user: {} },
      showSetting: false,
      showReview: false,
    };
  },
  async created() {
    await this.getList();
  },

  methods: {
    // 会员审核列表
    getList() {
      this.loading = true;
      console.log(4545);
      registerList(this.userFrom)
        .then(async (res) => {
          console.log(res);
          this.userLists = res.data.list;

          this.total = res.data.count;
          this.loading = false;
        })
        .catch((res) => {
          this.loading = false;
          this.$message.error(res.msg);
        });
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

    userReview(data) {
      this.showReview = true;
      console.log(data);
      this.reviewData = data;
    },

    async reviewSubmit() {
      this.showReview = false;
      const data = {
        id: this.reviewData.id,
        user_id: this.reviewData.user_id,
        status: this.reviewData.state,
        remarks: this.reviewData.remarks,
      };
      console.log(this.reviewData);
      await setRegisters(data)
        .then(async (res) => {
          this.$message.success('提交成功');
        })
        .catch((res) => {
          this.$message.error(res.msg);
        });
      this.getList();
    },

    userDetail(data) {
      this.showSetting = true;
      this.settingData = { ...this.settingData, id: data.id, remarks: data.remarks };
    },

    async submit() {
      this.showSetting = false;
      console.log(this.settingData);
      await setRegisters(this.settingData)
        .then(async (res) => {
          this.$message.success('提交成功');
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
