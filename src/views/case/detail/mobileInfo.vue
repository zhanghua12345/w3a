<template>
  <el-carousel indicator-position="none" :autoplay="false">
    <el-carousel-item v-for="item in 4" :key="item">
      <img
        class="w-full h-full"
        src="https://www.microsoft.com/en-us/research/uploads/prod/2024/01/MSR-Chat-Promo.png"
        alt=""
      />
    </el-carousel-item>
  </el-carousel>
  <view class="px-16px flex flex-col w-full mt-10px">
    <view class="text-24px text-[#000] font-600">轻奢1222三居室</view>
    <view class="flex flex-wrap items-center mt-6px">
      <i class="iconfont text-tip text-12px mr-3px">&#xe662;</i>浏览量{{
        Math.floor(Math.random() * 100)
      }}
      <view class="px-10px"> <up-line length="10" direction="col" /></view>

      <i class="iconfont text-tip text-12px mr-3px">&#xe66e;</i>
      收藏{{ Math.floor(Math.random() * 100) }}
    </view>
    <view class="mt-25px bg-000-04 p-16px rounded-10px flex flex-wrap justify-start">
      <view class="flex flex-wrap items-center w-1/2 h-25px" v-for="item in theme" :key="item.name">
        <i class="iconfont text-tip text-12px mr-3px">{{ item.icon }}</i
        >{{ item.label }}
        <span class="pl-20px">{{ item.name }}</span>
      </view>
    </view>
  </view>

  <view class="mt-25px px-16px flex flex-col">
    <Title title="" subTitle="" className="text-14px" classLine="bg-main ml-20" />
    <up-line />
    <view class="">设计效果</view>
    <view class="美好生活轻松实现">设计效果</view>
    <view class="" v-for="item in info" :key="item.name">
      <view class="text-18px font-600 w-full flex justify-center py-15px">{{ item.name }}</view>
      <view
        class="rounded-16px overflow-hidden mb-10px last:mb-0"
        v-for="e in item.images"
        :key="e"
      >
        <img class="w-full rounded-2 mb-2" :src="e" alt="" />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const theme = ref([
  { icon: '&#xe662;', label: '风格', name: '奶油风' },
  { icon: '&#xe662;', label: '面积', name: '150' },
  { icon: '&#xe662;', label: '系列', name: '帕马尔' },
  { icon: '&#xe662;', label: '小区', name: '绿地v岛' }
]);
const info = ref([
  {
    name: '客厅',
    images: [
      'https://q6.itc.cn/images01/20240801/8e8b611a60004c62b97895a9eaf31265.png',
      'https://q4.itc.cn/images01/20240817/8e56470b608145e0a79d2293f146a442.png',
      'https://ww4.sinaimg.cn/mw690/630584a6gy1hlhz3xt2cpj20u0140aft.jpg'
    ]
  },
  {
    name: '餐厅',
    images: [
      'https://q6.itc.cn/images01/20240801/8e8b611a60004c62b97895a9eaf31265.png',
      'https://q4.itc.cn/images01/20240817/8e56470b608145e0a79d2293f146a442.png',
      'https://ww4.sinaimg.cn/mw690/630584a6gy1hlhz3xt2cpj20u0140aft.jpg'
    ]
  }
]);
</script>
