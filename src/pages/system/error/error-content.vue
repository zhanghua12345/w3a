<template>
  <div>
    <el-row class="acea-row row-middle list">
      <el-col :xs="24" :sm="12" :md="12" :lg="12" class="acea-row row-right right">
        <img :src="src" :alt="code" class="pictrue" />
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" class="acea-row row-left left">
        <div>
          <h1 class="num">{{ code }}</h1>
          <div class="desc">{{ desc }}</div>
          <el-button type="primary" size="large" @click="backHome">返回首页</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped lang="scss">
.list {
  height: 80%;
  min-height: 500px;
}
.pictrue {
  width: 100%;
  max-width: 300px;
  height: 360px;
}
.right {
  padding-right: 75px;
}
.left {
  padding-left: 75px;
}
.num {
  margin-bottom: 24px;
  color: #515a6e;
  font-weight: 600;
  font-size: 72px;
  line-height: 72px;
}
.desc {
  margin-bottom: 16px;
  color: #808695;
  font-size: 20px;
  line-height: 28px;
}
</style>
<script>
export default {
  name: 'error_content',
  props: {
    code: String,
    desc: String,
    src: String,
  },
  methods: {
    backHome() {
      this.$router.replace({
        name: this.$config.homeName,
      });
    },
  },
};
</script>
