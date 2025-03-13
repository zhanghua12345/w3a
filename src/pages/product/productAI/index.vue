<template>
  <div>
    <el-card :bordered="false" shadow="never" class="ivu-mt">
      <el-button v-auth="['product-rule-save']" type="primary" @click="addAttr">添加AI问题</el-button>
      <el-table
        ref="table"
        :data="tableList"
        v-loading="loading"
        highlight-current-row
        :row-key="getRowKey"
        empty-text="暂无数据"
        class="mt14"
      >
        <el-table-column label="ID" min-width="60">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="AI问题" min-width="100">
          <template slot-scope="scope">
            {{ scope.row.problem }}
          </template>
        </el-table-column>
        <el-table-column label="AI问题描述" min-width="100">
          <template slot-scope="scope">
            {{ scope.row.description || '--' }}
          </template>
        </el-table-column>
        <el-table-column label="问题类型" min-width="100">
          <template slot-scope="scope">
            <span>{{ typeEnums[scope.row.type || 'no'] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="排序" min-width="70">
          <template slot-scope="scope">
            {{ scope.row.sort }}
          </template>
        </el-table-column>
        <el-table-column label="状态" min-width="70">
          <template slot-scope="scope">
            {{ scope.row.status ? '显示' : '不显示' }}
          </template>
        </el-table-column>
        <el-table-column label="必填" min-width="70">
          <template slot-scope="scope">
            {{ scope.row.required ? '必填' : '非必填' }}
          </template>
        </el-table-column>
        <el-table-column label="问题选项" min-width="130">
          <template slot-scope="scope">
            <template v-if="!scope.row.content">/</template>
            <template v-else>
              <div v-for="(item, index) in JSON.parse(scope.row.content || [])" :key="index">{{ item.value }}</div>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="问题排序" min-width="130">
          <template slot-scope="scope">
            <template v-if="!scope.row.content">/</template>
            <template v-else>
              <div v-for="(item, index) in JSON.parse(scope.row.content || [])" :key="index">{{ item.sort }}</div>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="120">
          <template slot-scope="scope">
            <a @click="edit(scope.row)">编辑</a>
            <el-divider direction="vertical"></el-divider>
            <a @click="del(scope.row, '删除该配置', scope.$index)">删除</a>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <add-attr ref="addattr" @getList="userSearchs"></add-attr>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import addAttr from './addAttr';
import { productListAi } from '@/api/product';
export default {
  name: 'productAttr',
  components: { addAttr },
  data() {
    return {
      loading: false,
      artFrom: {
        page: 1,
        limit: 20,
        rule_name: '',
      },
      typeEnums: {
        input: '输入框',
        number: '数字输入框',
        opt: '下拉框选择器',
        textarea: '长文本编辑器',
        radio: '单选框',
        no: '/',
      },
      tableList: [],
      total: 0,
      selectedIds: new Set(), //选中合并项的id
      ids: [],
      multipleSelection: [],
    };
  },
  computed: {
    ...mapState('admin/order', ['orderChartType']),
  },
  created() {
    this.getDataList();
  },
  methods: {
    getRowKey(row) {
      return row.id;
    },
    //全选和取消全选时触发
    handleSelectAll(selection) {
      if (selection.length === 0) {
        //获取table的数据；
        let data = this.$refs.table.data;
        data.forEach((item) => {
          if (this.selectedIds.has(item.id)) {
            this.selectedIds.delete(item.id);
          }
        });
      } else {
        selection.forEach((item) => {
          this.selectedIds.add(item.id);
        });
      }
      this.$nextTick(() => {
        //确保dom加载完毕
        this.setChecked();
      });
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
      this.selectedIds = ids;
      this.multipleSelection = uniqueArr;
      this.$nextTick((e) => {
        this.setChecked();
      });
    },
    setChecked() {
      //将new Set()转化为数组
      this.ids = [...this.selectedIds].join(',');
    },
    // 删除
    // delProblem({ id: row.id })
    //         .then((res) => {
    //           this.$message.success(res.msg);
    //           this.getDataList();
    //         })
    //         .catch((res) => {
    //           this.loading = false;
    //           this.$message.error(res.msg);
    //         });
    del(row, tit) {
      let delfromData = {
        title: tit,
        num: 0,
        url: `product/delProblem/${row.id}`,
        method: 'DELETE',
      };
      
      this.$modalSure(delfromData)
        .then((res) => {
          this.$message.success(res.msg);
          this.getDataList();
        })
        .catch((res) => {
          this.$message.error(res.msg);
        });
    },
    addAttr() {
      this.$refs.addattr.modal = true;
      this.$refs.addattr.getInfo(null);
    },
    // 编辑
    edit(row) {
      this.$refs.addattr.modal = true;
      this.$refs.addattr.getInfo(row);
    },
    // 列表
    getDataList() {
      this.loading = true;
      productListAi(this.artFrom)
        .then((res) => {
          let data = res.data;
          this.tableList = data.list;
          this.$nextTick(() => {
            //确保dom加载完毕
            this.setChecked();
          });
          this.total = res.data.count;
          this.loading = false;
        })
        .catch((res) => {
          this.loading = false;
          this.$message.error(res.msg);
        });
    },
    // 表格搜索
    userSearchs() {
      this.artFrom.page = 1;
      this.getDataList();
    },
  },
};
</script>

<style scoped></style>
