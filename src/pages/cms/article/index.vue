<template>
  <div>
    <el-card :bordered="false" shadow="never" class="ivu-mb-16" :body-style="{ padding: 0 }">
      <div class="padding-add">
        <el-form
          ref="artFrom"
          :model="artFrom"
          :label-width="labelWidth"
          label-position="right"
          @submit.native.prevent
          inline
        >
          <el-form-item label="文章：" label-for="title">
            <el-input clearable placeholder="请搜索文章标题" v-model="artFrom.title" />
          </el-form-item>
          <el-form-item label="作者：" label-for="author">
            <el-input clearable placeholder="请搜索作者" v-model="artFrom.author"  />
          </el-form-item>
          <el-form-item label="ID：" label-for="id">
            <el-input clearable placeholder="请搜索文章ID" v-model="artFrom.id" />
          </el-form-item>
          <el-form-item label="分类：" label-for="cid">
            <el-select v-model="artFrom.cid">
              <el-option v-for="(e, i) in treeData" :value="e.id" :key="i" :label="e.title"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否热门：" label-for="is_hot">
            <el-select v-model="artFrom.is_hot">
              <el-option value="" label="全部"></el-option>
              <el-option :value="1" label="是"></el-option>
              <el-option :value="0" label="否"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否推荐：" label-for="is_banner">
            <el-select v-model="artFrom.is_banner">
              <el-option value="" label="全部"></el-option>
              <el-option :value="1" label="是"></el-option>
              <el-option :value="0" label="否"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="userSearchs">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card :bordered="false" shadow="never" class="ivu-mt">
      <div class="h-[100%] flex items-center justify-left">
        <router-link style="float: right" :to="$routeProStr + '/cms/article/add_article'" v-auth="['cms-article-creat']"
          ><el-button type="primary" class="bnt">添加文章</el-button></router-link
        >
      </div>
      <el-table
        :data="cmsList"
        ref="table"
        class="mt14"
        v-loading="loading"
        highlight-current-row
        no-userFrom-text="暂无数据"
        no-filtered-userFrom-text="暂无筛选结果"
      >
        <el-table-column label="ID" width="50">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="图片" min-width="50">
          <template slot-scope="scope">
            <div v-if="scope.row.image_input.length !== 0" v-viewer>
              <div class="tabBox_img" v-for="(item, index) in scope.row.image_input" :key="index">
                <img v-lazy="item" />
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="名称" min-width="150">
          <template slot-scope="scope">
            <el-tooltip content="Top Left 提示文字" placement="top-start">
              <span class="line2">{{ scope.row.title }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="作者" min-width="100">
          <template slot-scope="scope">
            <div class="line2">{{ scope.row.author || '--' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="分类" min-width="100">
          <template slot-scope="scope">
            <span class="line2">{{ scope.row.catename }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总浏览量" width="100">
          <template slot-scope="scope">
            <span class="mr-10">{{ scope.row.realBrowse }}</span>
          </template>
        </el-table-column>
        <el-table-column label="浏览量真实值" width="100">
          <template slot-scope="scope">
            <span >{{ scope.row.realBrowse- scope.row.browse}}</span>
          </template>
        </el-table-column>
        <el-table-column label="总点赞量" width="100">
          <template slot-scope="scope">
            <span class="mr-10">{{ scope.row.realPraise }}</span>
          </template>
        </el-table-column>
        <el-table-column label="点赞量真实值" width="100">
          <template slot-scope="scope">
            <span >{{ scope.row.realPraise -  scope.row.praise }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否热门" width="80">
          <template slot-scope="scope">
            <el-tag :type="scope.row.is_hot == 0 ? 'info' : 'success'">{{
              scope.row.is_hot == 0 ? '否' : '是'
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否推荐" width="80">
          <template slot-scope="scope">
            <el-tag :type="scope.row.is_banner == 0 ? 'info' : 'success'">{{
              scope.row.is_hot == 0 ? '否' : '是'
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.add_time | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="100">
          <template slot-scope="scope">
            <a @click="edit(scope.row)">编辑</a>
            <el-divider direction="vertical"></el-divider>
            <a @click="del(scope.row, '删除文章', scope.$index)">删除</a>
          </template>
        </el-table-column>
      </el-table>
      <div class="acea-row row-right page">
        <pagination
          v-if="total"
          :total="total"
          :page.sync="artFrom.page"
          :limit.sync="artFrom.limit"
          @pagination="getList"
        />
      </div>
    </el-card>
    <!--关联-->
    <el-dialog :visible.sync="modals" title="商品列表" class="paymentFooter" width="1000px" @closed="cancel">
      <goods-list ref="goodslist" @getProductId="getProductId" v-if="modals"></goods-list>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { cmsListApi, categoryListApi, relationApi } from '@/api/cms';
import relationList from './relation';
import { formatDate } from '@/utils/validate';
import goodsList from '@/components/goodsList/index';
export default {
  name: 'cms_article',
  data() {
    return {
      modalTitleSs: '',
      loading: false,
      artFrom: {
        cid: 0,
        title: '',
        page: 1,
        limit: 20,
      },
      total: 0,
      cmsList: [],
      treeData: [],
      list: [],
      cid: 0, // 移动分类id
      cmsId: 0,
      formValidate: {
        type: 1,
      },
      rows: {},
      modal_loading: false,
      modals: false,
      props: {
        value: 'id',
        label: 'title',
        emitPath: false,
      },
    };
  },
  components: {
    relationList,
    goodsList,
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
  filters: {
    formatDate(time) {
      if (time !== 0) {
        let date = new Date(time * 1000);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
  },
  created() {},
  activated() {
    this.artFrom.cid = Number(this.$route.query.id || 0);
    this.getList();
    this.getClass();
  },
  methods: {
    // 关联成功
    getProductId(row) {
      let data = {
        product_id: row.id,
      };
      relationApi(data, this.rows.id)
        .then(async (res) => {
          this.$message.success(res.msg);
          row.id = 0;
          this.modal_loading = false;
          this.modals = false;
          setTimeout(() => {
            this.getList();
          }, 500);
        })
        .catch((res) => {
          this.modal_loading = false;
          this.loading = false;
          this.$message.error(res.msg);
        });
    },
    cancel() {
      this.modals = false;
    },
    // 等级列表
    getList() {
      this.loading = true;
      console.log(this.artFrom);
      cmsListApi(this.artFrom)
        .then(async (res) => {
          let data = res.data;
          this.cmsList = data.list;
          this.total = data.count;
          this.loading = false;
        })
        .catch((res) => {
          this.loading = false;
          this.$message.error(res.msg);
        });
    },
    // 分类
    getClass() {
      categoryListApi(this.formValidate)
        .then(async (res) => {
          let data = res.data;
          this.treeData = data;
          let obj = {
            id: 0,
            title: '全部',
          };
          this.treeData.unshift(obj);
        })
        .catch((res) => {
          this.$message.error(res.msg);
        });
    },
    // 下拉树
    handleCheckChange(data) {
      this.artFrom.cid = data ? data : 0;
      this.artFrom.page = 1;
      this.getList();
    },
    // 编辑
    edit(row) {
      this.$router.push({ path: this.$routeProStr + '/cms/article/add_article/' + row.id });
    },
    // 关联
    artRelation(row, tit, num) {
      this.rows = row;
      if (row.product_id === 0) {
        this.modals = true;
      } else {
        let delfromData = {
          title: tit,
          num: num,
          url: `/cms/cms/unrelation/${row.id}`,
          method: 'PUT',
          ids: '',
        };
        this.$modalSure(delfromData)
          .then((res) => {
            this.$message.success(res.msg);
            this.getList();
          })
          .catch((res) => {
            this.$message.error(res.msg);
          });
      }
    },
    // 删除
    del(row, tit, num) {
      let delfromData = {
        title: tit,
        num: num,
        url: `cms/cms/${row.id}`,
        method: 'DELETE',
        ids: '',
      };
      this.$modalSure(delfromData)
        .then((res) => {
          this.$message.success(res.msg);
          this.cmsList.splice(num, 1);
        })
        .catch((res) => {
          this.$message.error(res.msg);
        });
    },
    // 表格搜索
    userSearchs() {
      this.artFrom.page = 1;
      this.getList();
    },
  },
};
</script>

<style scoped lang="stylus">
.treeSel ::v-deep.ivu-select-dropdown-list {
  padding: 0 10px !important;
  box-sizing: border-box;
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
</style>
