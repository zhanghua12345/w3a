<template>
  <div>
    <el-row class="expand-row">
      <el-col :span="6" class="mr20">
        <span class="expand-key">案例分类：</span>
        <span class="expand-value">{{ row.cate_name }}</span>
      </el-col>
      <el-col :span="6">
        <span class="expand-key">是否热门：</span>
        <span class="expand-value">{{ row.ot_price }}</span>
      </el-col>
      <el-col :span="6">
        <span class="expand-key">是否最新：</span>
        <span class="expand-value">{{ row.cost }}</span>
      </el-col>
    </el-row>
    <el-row class="expand-row">
      <el-col :span="6" class="mr20">
        <span class="expand-key">是否推荐：</span>
        <span class="expand-value">{{ row.collect }}</span>
      </el-col>
      <el-col :span="6">
        <span class="expand-key">状态：</span>
        <span class="expand-value">{{ row.ficti }}</span>
      </el-col>
    </el-row>
    <el-col :span="6">
        <span class="expand-key">VR链接：</span>
        <span class="expand-value">{{ row.ficti }}</span>
      </el-col>
  </div>
</template>
<style scoped>
.expand-row {
  margin-bottom: 16px;
}
</style>
<script>
export default {
  props: {
    row: Object,
  },
};
</script>
