<template>
  <div>
    
    <el-card :bordered="false" shadow="never" class="ivu-mt">
      <div style="color:#888">该部分展示用于「首页配置」模块配置路由的全部信息</div>
      <el-table
        :data="groupLists || []"
        class="mt14"
        highlight-current-row
      >
        <el-table-column label="ID" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="跳转名称" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="跳转路径" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.page }}</span>
          </template>
        </el-table-column>
        <el-table-column label="跳转方式" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.type }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { router } from '@/utils/routerWx';

export default {
  name: 'routerWx',
  data() {
    return {
      groupLists: [],
      
    };
  },
  created() {
    console.log(router)
    this.groupLists = router;

  },
};
</script>

<style scoped lang="stylus"></style>
