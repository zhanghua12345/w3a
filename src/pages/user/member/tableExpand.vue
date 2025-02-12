<template>
  <div>
    <template v-if="type === 'offer' || type === 'design'">
      <el-row class="expand-row">
        <el-col :span="6">
          <span class="expand-key">房屋面积：</span>
          <span class="expand-value">{{ row.area }}</span>
        </el-col>
        <el-col :span="6" v-if="type === 'offer'">
          <span class="expand-key">装修类型：</span>
          <span class="expand-value">{{ row.type }}</span>
        </el-col>
        <el-col :span="6">
          <span class="expand-key">装修档次：</span>
          <span class="expand-value">{{ row.grade }}</span>
        </el-col>
      </el-row>
    </template>
    <template v-else>
      <el-row class="expand-row">
        <el-col :span="6">
          <span class="expand-key">房屋位置：</span>
          <span class="expand-value">{{ `${row.province} ${row.area} ${row.city}` }}</span>
        </el-col>
        <el-col :span="6">
          <span class="expand-key">具体小区：</span>
          <span class="expand-value">{{ row.address }}</span>
        </el-col>
        <el-col :span="6">
          <span class="expand-key">装修类型：</span>
          <span class="expand-value">{{ row.type }}</span>
        </el-col>
        <el-col :span="6">
          <span class="expand-key">装修时间：</span>
          <span class="expand-value">{{ row.time }}</span>
        </el-col>
      </el-row>
    </template>

    <el-row class="expand-row">
      <el-col :span="6">
        <span class="expand-key">微信昵称：</span>
        <span class="expand-value">{{ row.user.nickname }}</span>
      </el-col>
      <el-col :span="6">
        <span class="expand-key">手机号：</span>
        <span class="expand-value">{{ row.user.phone }}</span>
      </el-col>
      <el-col :span="6">
        <span class="expand-key">真实姓名：</span>
        <span class="expand-value">{{ row.user.real_name || '--' }}</span>
      </el-col>
      <el-col :span="6">
        <span class="expand-key">用户ID：</span>
        <span class="expand-value">{{ row.user.uid }}</span>
      </el-col>
    </el-row>
    <el-row class="expand-row">
      <el-col :span="6">
        <span class="expand-key">创建时间：</span>
        <span class="expand-value"> {{ row.created_at }}</span>
      </el-col>
    </el-row>

    <el-row class="expand-row">
      <el-col :span="24">
        <span class="expand-key">备注：</span>
        <span class="expand-value text-main">{{ row.remarks }}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { formatDate } from '@/utils/validate';
export default {
  name: 'table-expand',
  filters: {
    formatDate(time) {
      if (time !== 0) {
        let date = new Date(time * 1000);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
  },
  props: {
    row: Object,
    type: String,
  },
};
</script>

<style scoped>
.expand-row {
  margin-bottom: 16px;
  /* margin-left: 20px; */
}
</style>
