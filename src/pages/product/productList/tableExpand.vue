<template>
  <div>
    <el-row class="expand-row">
      <el-col :span="24">
        <span class="expand-key">标题：</span>
        <span class="expand-value">标题：{{ row.name }}</span>
      </el-col>
    </el-row>
    <el-row class="expand-row">
      <el-col :span="12">
        <span class="expand-key">描述：</span>
        <span class="expand-value">{{ row.description }}</span>
      </el-col>
      <el-col :span="6">
        <span class="expand-key">作者：</span>
        <span class="expand-value">{{ row.author }}</span>
      </el-col>
      <el-col :span="6">
        <span class="expand-key">创建时间：</span>
        <span class="expand-value">{{ row.created_at }}</span>
      </el-col>
      
    </el-row>
    <el-row class="expand-row">
      <el-col :span="6">
        <span class="expand-key">真实浏览量：</span>
        <span class="expand-value">{{ row.realBrowse - row.browse }}</span>
      </el-col>
      <el-col :span="6">
        <span class="expand-key">真实点赞量：</span>
        <span class="expand-value">{{ row.realPraise - row.praise }}</span>
      </el-col>
      <el-col :span="6">
        <span class="expand-key">是否推荐：</span>
        <span class="expand-value">{{ row.isRecommend ? '是' : '否' }}</span>
      </el-col>
      <el-col :span="6">
        <span class="expand-key">状态：</span>
        <span class="expand-value">{{ row.status ? '上架' : '下架' }}</span>
      </el-col>
    </el-row>
    <el-row class="expand-row">
      <el-col :span="12">
        <span class="expand-key">案例分类：</span>
        <span class="expand-value">{{ row.cate_name || '--' }}</span>
      </el-col>
      <el-col :span="6">
        <span class="expand-key">是否热门：</span>
        <span class="expand-value">{{ row.hot ? '是' : '否' }}</span>
      </el-col>
      <el-col :span="6">
        <span class="expand-key">是否最新：</span>
        <span class="expand-value">{{ row.new ? '是' : '否' }}</span>
      </el-col>
    </el-row>
    <el-col :span="24">
      <span class="expand-key">VR链接：</span>
      <span class="expand-value">{{ row.VR_link }}</span>
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
