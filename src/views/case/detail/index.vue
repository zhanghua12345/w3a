<template>
  <div>
    <el-card shadow="never">
      <template #header>
        <div class="flex justify-between items-center">
          <span class="text-000 font-600">详情</span>
          <el-button type="primary" @click="onAddOrUpdate(0)">编辑</el-button>
        </div>
      </template>
      <el-row justify="space-between">
        <el-col :span="16" :xs="24">
          <div class="flex h-full py-2">
            <div class="bg-000-04 rounded-8px mr-10px h-120px overflow-hidden">
              <el-image
                class="w-full h-full"
                src="https://nice-short-pro.s3.ap-east-1.amazonaws.com/image/0ffa54e069ac2bf61c3d.jpg"
                fit="scale-down"
              />
            </div>
            <div>
              <h3 class="mb-2 font-600">轻奢1222三居室</h3>
              <p class="text-sm text-gray">上传时间：2024-12-11 15:02:10</p>
              <p class="text-sm text-gray">最近更新：2024-12-19 15:16:30</p>
            </div>
          </div>
        </el-col>
        <el-col :span="8" :xs="24">
          <div class="flex justify-around py-2">
            <div class="mr-7">
              <div class="text-gray mb-2">
                浏览量
                <el-tooltip content="浏览量 = 实际值 + 初始值" transition="slide-fade">
                  <el-icon style="vertical-align: middle">
                    <InfoFilled />
                  </el-icon>
                </el-tooltip>
              </div>
              <div class="text-16px">52</div>
              <div>22 + 30</div>
            </div>
            <div>
              <div class="text-gray mb-2">
                收藏<el-tooltip content="浏览量 = 实际值 + 初始值" transition="slide-fade">
                  <el-icon style="vertical-align: middle">
                    <InfoFilled />
                  </el-icon>
                </el-tooltip>
              </div>
              <div class="text-16px">52</div>
              <div>22 + 30</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-row class="mt-3" :gutter="12">
      <el-col :span="16" :xs="24">
        <el-card shadow="never">
          <template #header>
            <div class="flex justify-between items-center">
              <span class="text-000 font-600">详情</span>
              <el-button type="primary" @click="onAddOrUpdate(2)">编辑</el-button>
            </div>
          </template>
          <div class="flex flex-wrap">
            <div
              class="w-30% <sm:w-100% bg-000-04 rounded-8px px-14px py-8px mb-10px mx-5px"
              v-for="(item, index) in list"
              :key="index"
            >
              <div class="text-12px text-[#8b8b8b]">热度初始值{{ item.name }}</div>
              <div class="text-18px mt-4px font-600 leading-none text-000 text-main-1 text-main-2">
                多语言
              </div>
            </div>
          </div>
        </el-card>
        <el-card class="mt-3" shadow="never">
          <template #header>
            <div class="flex justify-between items-center">
              <span class="text-000 font-600">主图</span>
              <el-button type="primary" @click="onAddOrUpdate(1)">编辑</el-button>
            </div>
          </template>
          <div class="" v-for="(item, index) in 2" :key="index">
            <div class="w-full text-000 font-600">
              {{ index === 0 ? '封面图' + item : '详情图' }}
            </div>
            <div class="flex flex-wrap mt-10px">
              <div class="<sm:w-30% bg-000-04 rounded-8px px-14px py-8px mb-10px mx-5px h-120px">
                <el-image
                  class="w-full h-full"
                  src="https://nice-short-pro.s3.ap-east-1.amazonaws.com/image/0ffa54e069ac2bf61c3d.jpg"
                  fit="scale-down"
                />
              </div>
            </div>
          </div>
        </el-card>
        <el-card class="mt-3" shadow="never">
          <template #header>
            <div class="flex justify-between items-center">
              <span class="text-000 font-600">室内图</span>
              <el-button type="primary" @click="onAddOrUpdate(1)">编辑</el-button>
            </div>
          </template>
          <div class="flex flex-col">
            <div class="" v-for="(item, index) in 5" :key="index">
              <div class="w-full text-000 font-600">
                {{
                  index === 0
                    ? '主卧' + item
                    : index === 1
                    ? '次卧一'
                    : index === 2
                    ? '次卧二'
                    : index === 3
                    ? '客厅'
                    : index === 4
                    ? '餐厅'
                    : '厨房'
                }}
              </div>
              <div class="flex flex-wrap mt-10px">
                <div class="<sm:w-30% bg-000-04 rounded-8px px-14px py-8px mb-10px mx-5px h-120px">
                  <el-image
                    class="w-full h-full"
                    src="https://nice-short-pro.s3.ap-east-1.amazonaws.com/image/0ffa54e069ac2bf61c3d.jpg"
                    fit="scale-down"
                  />
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" :xs="24">
        <el-card shadow="never">
          <template #header>
            <div class="flex justify-between">
              <span>效果</span>
              <el-button type="primary" link>编辑</el-button>
            </div>
          </template>
          <div
            class="w-full h-670px overflow-auto info border-1 border-[#e5e5e5] rounded-1 bg-[#fff]"
          >
            <MobileInfo :data="activities" />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <AddOrUpdate ref="addOrUpdateRef" :tree-data="tableData" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { AddOrUpdate } from './components';
import MobileInfo from './mobileInfo.vue';

import { getMenuList } from '@/api/auth';
import { useTable } from '@/hooks/useTable';

const { tableData } = useTable({
  apiFn: getMenuList,
  isPageable: false
});

const addOrUpdateRef = ref();
const onAddOrUpdate = (index = 0) => {
  addOrUpdateRef.value.init(index, list);
};
const list = [
  {
    name: 'Vue3',
    desc: '渐进式 JavaScript 框架',
    img: 'https://cn.vuejs.org/logo.svg'
  },
  {
    name: 'Vite',
    desc: '下一代前端开发与构建工具',
    img: 'https://vitejs.dev/logo.svg'
  },
  {
    name: 'Pinia',
    desc: '新一代的状态管理库',
    img: 'https://pinia.web3doc.top/logo.svg'
  },
  {
    name: 'Unocss',
    desc: '原子化预设样式',
    img: 'https://unocss.dev/logo.svg'
  },
  {
    name: 'TypeScript',
    desc: 'js 超集语言',
    img: 'https://img0.baidu.com/it/u=648247815,3161686023&fm=253&fmt=auto&app=138&f=PNG'
  }
];
const activities = [
  {
    content: '每天写一点',
    timestamp: '2023-9-13'
  },
  {
    content: '完善权限角色菜单',
    timestamp: '2023-9-10'
  },
  {
    content: '封装表格hooks',
    timestamp: '2023-9-5'
  },
  {
    content: '改写菜单样式',
    timestamp: '2023-9-1'
  },
  {
    content: '多语言支持',
    timestamp: '2023-8-26'
  },
  {
    content: '工程化搭建',
    timestamp: '2023-8-14'
  },
  {
    content: '项目创建',
    timestamp: '2023-8-1'
  }
];
</script>

<style lang="scss" scoped>
/* 设置滚动条的宽度和颜色 */
.info::-webkit-scrollbar {
  width: 8px;
}

/* 设置滚动条轨道的背景颜色 */
.info::-webkit-scrollbar-track {
  background-color: #e5e5e5;
}

/* 设置滚动条滑块的背景颜色 */
.info::-webkit-scrollbar-thumb {
  background-color: #ccc;
}
</style>
