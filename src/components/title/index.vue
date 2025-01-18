<template>
  <div
    class="pb-6 flex flex-wrap justify-between items-center"
  >
    <div class="flex flex-col">
      <div class="text-16 leading-1.4 flex items-center font-600" v-if="title">
        {{ title }}
        <div
          class="text-12 leading-1.2 pt-6 pl-main font-400 text-tip"
          v-if="subTitle"
        >
          {{ subTitle }}
        </div>
      </div>
      <div class="text-10 pt-6 text-tip" v-if="subTitleBottom">
        {{ subTitleBottom }}
      </div>
      <div
        class="mt-6 w-24 h-6 rounded-full bg-000-9"
        :class="classLine"
        v-if="!subTitleBottom"
      ></div>
    </div>
    <div class="flex items-center" v-if="isMore">
      {{ moreTitle }}
      <i class="iconfont text-12 ml-6 text-tip"  style="font-size: 12px;">&#xe671;</i>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    title: {
      type: String,
      default: '',
    },
    subTitle: {
      type: String,
      default: '',
    },
    subTitleBottom: {
      type: String,
      default: '',
    },
    className: {
      type: String,
    },
    classLine: {
      type: String,
    },
    isMore: {
      type: Boolean,
    },
    moreTitle: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
  methods: {
    stepActive() {
      this.$emit('click');
    },
  },
};
</script>

<style scoped></style>
